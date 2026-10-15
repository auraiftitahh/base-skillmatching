# Perbaikan dua pengujian otorisasi (v1.1.2)

## Masalah dari hasil pengujian pengguna

Pada v1.1.1, `php artisan test` melaporkan **14 lulus / 2 gagal**:

- `AuthorizationTest::test_applicant_cannot_read_other_certificate` — mengharapkan HTTP `403` tetapi mendapat `302` ke login, dengan pesan “Akun tidak aktif.”
- `MatchingTest::test_role_is_restricted_on_server` — mengharapkan HTTP `403` tetapi mendapat `302` ke login, dengan pesan yang sama.

Semua 121 template Blade yang dikompilasi telah lulus pada komputer pengguna. Kegagalan spesifik tersebut **tidak membuktikan kebocoran hak akses**, karena request dicegat middleware `EnsureActive` sebelum mencapai pemeriksaan role/ownership.

## Penyebab

Migrasi tabel `users` menetapkan `is_active` dengan nilai awal `true` pada database. Tetapi saat `User::create()` dilakukan **tanpa mengirim atribut `is_active`**, objek Eloquent yang baru dibuat tidak mempunyai nilai atribut tersebut sampai dimuat ulang. Pada dua tes yang gagal, `actingAs($user)` langsung menggunakan objek baru itu. Middleware membaca `null` sebagai tidak aktif sehingga request memperoleh redirect `302`, bukan `403` yang dimaksud pengujian.

## Perubahan

- `app/Models/User.php`: tambahkan `protected $attributes = ['is_active' => true];` agar default model sama dengan default database. `is_active => false` yang eksplisit tetap dihormati.
- `tests/Feature/AccountStatusRegressionTest.php`: tambahkan empat regresi untuk model baru, role aktif, akun eksplisit nonaktif, dan akun yang dinonaktifkan setelah dibuat.
- **Tidak** mengubah middleware `EnsureActive`, `EnsureRole`, policy file sertifikat, migrasi, seeder, maupun `.env`.

## Verifikasi pengguna

Jalankan di root proyek (folder yang berisi `artisan`):

```powershell
php artisan optimize:clear
php artisan test --filter=AccountStatusRegressionTest
php artisan test --filter=AuthorizationTest
php artisan test --filter=MatchingTest
php artisan test
powershell -ExecutionPolicy Bypass -File scripts/VERIFY_ALL_WINDOWS.ps1
```

**Hasil yang diharapkan:** kedua pengujian lama kini menerima `403` untuk pengguna aktif yang tidak berhak, pengguna dengan `is_active=false` tetap diarahkan ke login, dan seluruh suite dapat diselesaikan tanpa kegagalan. Hasil ini belum bisa diklaim lulus sampai diuji pada runtime Laravel + database di komputer pengguna.

## Cara patch

Backup source dahulu. Ekstrak file dari ZIP patch ke root proyek yang sama dengan `artisan`, dengan mempertahankan hierarki folder. Jangan menimpa `.env`, `vendor`, `storage`, atau data MySQL. Tidak perlu menjalankan ulang `migrate` atau `db:seed` untuk perubahan ini.

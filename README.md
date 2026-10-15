> **Pembaruan v1.1.5:** perbaikan halaman Detail Jabatan (404), data terkait pada detail katalog, lookup akun lintas pagination, filter peserta dan tes regresi. Lihat `PERBAIKAN_HALAMAN_DETAIL_v1.1.5.md`.

> Pembaruan v1.1.4: lihat `PERBAIKAN_FILTER_TOGGLE_DROPDOWN_v1.1.4.md` untuk pencarian/filter, dropdown, proteksi Admin, dan toggle.

> **Pembaruan v1.1.3:** Pencarian/filter Taksonomi Skill, status nonaktif tetap tercatat, hapus aman, Riwayat Aktivitas dibaca dalam Bahasa Indonesia, dan input Evaluasi Profil Uji tanpa JSON. Lihat `PERBAIKAN_UI_DAN_TAKSONOMI_v1.1.3.md`.

# Skill Matching v1.1.5 — Aplikasi Laravel Dinamis

Aplikasi **Laravel 13 + Blade + MySQL** untuk Pelamar, Admin Platform, dan Badan Sertifikasi. Source Figma Make **hanya referensi desain** dan disimpan di folder `referensi/`. Data operasional berasal dari MySQL dan proses bisnis berjalan di server.

## Syarat

- PHP **8.3+** beserta `pdo_mysql`, `mbstring`, `openssl`, `fileinfo`, `ctype`, `tokenizer`, `xml`/`dom`, dan `curl`.
- Composer 2.x
- MySQL 8.x atau MariaDB versi kompatibel
- Browser modern
- Tidak diperlukan `npm` untuk frontend Blade. CSS lokal berada di `public/css/skill-matching.css`.

## Instalasi Windows (PowerShell)

Di folder proyek yang berisi `artisan` dan `composer.json`:

```powershell
composer install
if (!(Test-Path .env)) { Copy-Item .env.example .env }
php artisan key:generate
```

Buat database MySQL kosong, misalnya `skill_matching`. Isi `.env`:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=skill_matching
DB_USERNAME=root
DB_PASSWORD=
OWNER_EMAIL=admin@skillmatching.local
OWNER_PASSWORD=GantiDenganPasswordKuat123!
DEMO_SEED=true
DEMO_PASSWORD=PasswordDemoKuat123!
MAIL_MAILER=log
SESSION_DRIVER=file
CACHE_STORE=file
```

- **Wajib** ubah `OWNER_PASSWORD` sebelum `migrate --seed`; minimal 12 karakter.
- `DEMO_SEED=true` membuat data **sintetis** untuk latihan; jangan dianggap lowongan kerja asli.
- `MAIL_MAILER=log` menyimpan tautan verifikasi email di `storage/logs/laravel.log`. Untuk email nyata, atur SMTP.
- Jangan unggah `.env` ke repository.

```powershell
php artisan migrate --seed
php artisan optimize:clear
php artisan serve --host=127.0.0.1 --port=8000
```

Buka `http://127.0.0.1:8000`. Login sebagai admin menggunakan `OWNER_EMAIL` / `OWNER_PASSWORD`. Jika demo aktif, tersedia `raka@example.com` (Pelamar) dan `kontak@logistiknusantara.id` (Badan Sertifikasi) dengan `DEMO_PASSWORD`.

**Jika Anda punya database versi lama, backup dahulu sebelum menerapkan migrasi.** Jangan memakai `migrate:fresh` pada database yang ingin dipertahankan.

## Routing fungsional

Tidak ada lagi halaman produksi yang dipilih melalui variabel nomor screen Figma. Contoh:

- `/pelamar/dashboard`, `/pelamar/riwayat`, `/pelamar/lowongan`, `/pelamar/lowongan/skor`, `/pelamar/sertifikat`
- `/admin/dashboard`, `/admin/skill`, `/admin/lowongan`, `/admin/pelatihan`, `/admin/bobot`, `/admin/evaluasi`
- `/sertifikasi/dashboard`, `/sertifikasi/pelatihan/peserta`, `/sertifikasi/sertifikat`

URL screen lama seperti `/pelamar/13` hanya merupakan **redirect kompatibilitas** untuk bookmark, bukan mekanisme internal aplikasi.

## Skenario utama

1. Admin login, mengelola skill, jabatan, lowongan (wajib punya persyaratan skill), pelatihan (wajib punya skill capaian), bobot, dan akun lembaga.
2. Pelamar registrasi dan verifikasi email, mengisi profil/riwayat, memilih skill dan level, kemudian menghitung rekomendasi berdasarkan profilnya sendiri.
3. Rincian skor, gap skill, rekomendasi pelatihan, learning path, dan simulasi dihitung server berdasarkan MySQL.
4. Pelamar memilih pelatihan (proses belajar di luar aplikasi), menandai selesai. Jika ada lembaga terdaftar, penyelesaian menunggu konfirmasi lembaga.
5. Pelamar dapat mengunggah sertifikat privat untuk ditinjau lembaga berwenang. Lembaga menerima/menolak, Pelamar melihat hasilnya.
6. Pelamar mencatat lamaran yang dikirimkan **di luar aplikasi** dan mengirim feedback. Admin dapat mengevaluasi serta mengekspor CSV.

## Ngrok

Konfigurasi trusted proxy berada di `bootstrap/app.php`. Untuk localhost/development:

Terminal A:
```powershell
php artisan serve --host=127.0.0.1 --port=8000
```
Terminal B:
```powershell
ngrok http 8000
```

Jika ingin tautan verifikasi email memuat URL ngrok, salin URL HTTPS ngrok ke `APP_URL` di `.env`, kemudian `php artisan optimize:clear`. Untuk produksi gunakan HTTPS dan batasi `APP_PROXIES` pada IP proxy tepercaya, jangan biarkan wildcard.

## Pengujian

Setelah dependensi terpasang, jalankan:

```powershell
php artisan view:clear
php artisan view:cache
php artisan route:list
php artisan test
php scripts/verify_matching.php
```

Atau jalankan `powershell -ExecutionPolicy Bypass -File scripts/verify_windows.ps1` dari root. Tes PHPUnit memakai SQLite `:memory:` sehingga ekstensi `pdo_sqlite` diperlukan pada PHP CLI. Pengujian manual tetap diperlukan untuk responsive, tombol, file upload, email, MySQL, dan ngrok.

## Status pengujian pada paket ini

- LULUS: `php -l` seluruh PHP source.
- LULUS: pemeriksaan keseimbangan directive Blade dan sintaks 473 blok PHP/ekspresi Blade.
- LULUS: 4 skenario perhitungan di `scripts/verify_matching.php`.
- BELUM DIJALANKAN: Composer install, Laravel unit/feature tests, migration MySQL, browser end-to-end, dan ngrok. Lingkungan pembuat paket tidak memiliki Composer, ekstensi PDO database, maupun akses repo paket untuk memasang Laravel.

**Paket ini adalah source code aplikasi untuk pengujian di lingkungan Laravel Anda, bukan bukti bahwa seluruh alur sudah lolos QA end-to-end.**


## Audit perbaikan v1.1.1

Baca `AUDIT_DAN_PERBAIKAN_v1.1.1.md` dan `AUDIT_84_HALAMAN.csv`.
Jalankan `powershell -ExecutionPolicy Bypass -File scripts/VERIFY_ALL_WINDOWS.ps1` untuk memeriksa kompilasi Blade dan test pada Windows setelah `composer install`.

## Pembaruan v1.1.2

Perbaikan konsistensi status akun pada model dan pengujian regresi dua kasus otorisasi. Rincian: `PERBAIKAN_TEST_OTORISASI_v1.1.2.md`. Tidak perlu migrate ulang.

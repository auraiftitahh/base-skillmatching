# Audit dan Perbaikan Skill Matching v1.1.1

**Baseline:** `SkillMatching_v1.1.0_FullSource.zip` (arsip lengkap yang dipakai pengguna).  
**Jenis pembaruan:** bugfix + penyempurnaan navigasi + tes regresi.  
**Database:** tidak ada perubahan skema atau migrasi baru.

## 1. Keluhan dan perbaikan

| Temuan | Analisis penyebab | Perbaikan |
|---|---|---|
| Error 500 form Admin `/admin/skill/form?id=11` | Directive Blade `@csrf@if($record)` menempel; proses kompilasi menghasilkan PHP yang salah | Pisahkan semua directive Blade dan khususnya `@csrf` dan `@if`; tambah tes GET form edit skill |
| Error parsing pada template lain | Direktif kondisi/loop ditulis rapat dalam satu baris panjang | Normalisasi 60 template Blade supaya lebih mudah dikompilasi dan diaudit |
| Dua sidebar aktif pada `/pelamar/pelatihan/aktivitas` | Kondisi awalan `pelatihan/` mengaktifkan Pelatihan dan Aktivitas Pelatihan | Pemilihan menu terpanjang/terspesifik; pengecualian untuk aksi penyelesaian |
| Navbar tidak mempunyai ikon | Source lama memakai titik `●` sebagai pengganti ikon | SVG lokal untuk seluruh menu tiga role, tidak perlu dependensi CDN |
| Label Profil & Riwayat salah | Label `riwayat` ditulis dua kali pada associative array global | Label per-role |
| Drawer mobile tidak jelas | Tidak ada overlay, toggle dan label aksesibilitas | Overlay, tombol menu, Escape untuk menutup, dan `aria-expanded` |
| Pelatihan selesai dapat ditambahkan ulang | `updateOrInsert` selalu memaksa status `planned` | Penolakan tindakan untuk completed / waiting_confirmation |
| Pelatihan terikat lembaga nonaktif macet menunggu | Penyelesaian melihat FK lembaga, tidak memeriksa status aktif | Konfirmasi mandiri berstatus self-reported bila tidak ada lembaga aktif |
| Sertifikat level lebih rendah dapat menghapus verifikasi sebelumnya | Penentuan status tidak menjaga klaim tingkat lebih tinggi yang terverifikasi | Pertahankan level & verifikasi yang lebih tinggi |
| Prasyarat pelatihan bisa siklik | Hanya memeriksa self-reference | Menolak circular dependency tidak langsung |
| Gap dapat melibatkan lowongan yang kedaluwarsa | Query gap hanya memfilter `active` | Filter expiry konsisten dengan daftar rekomendasi |

## 2. Audit statis seluruh halaman

- Jumlah entri desain: **84 dari 84** memiliki rute tujuan dan template yang sesuai.
- Jumlah template Blade diperiksa: **60**; lulus kompilasi aproksimasi menjadi PHP kemudian `php -l`.
- Jumlah referensi named route dari Blade: **28**, semuanya memiliki deklarasi.
- Tautan internal statis yang tidak dikenali: **0**.
- PHP pada folder `app`, `bootstrap`, `config`, `database`, `routes`, `tests`, `scripts` lulus pemeriksaan sintaks.
- Perhitungan PHP mandiri (`scripts/verify_matching.php`) menghasilkan skor **55**, **85**, **100** dan contoh skill terkait **70** sesuai skenario pemeriksaan.
- Ikon navigasi disimpan di `public/icons` dan bisa digunakan offline.

**PENTING:** Angka di atas adalah hasil pemeriksaan kode statis dan bukan bukti bahwa seluruh halaman telah diuji lewat browser. Emulator pemeriksa Blade yang dipakai lokal bukan compiler resmi Laravel.

Lihat `AUDIT_84_HALAMAN.csv` untuk daftar semua ID halaman, nama, URL mockup, rute fungsional, serta nama template. Kolom status sengaja bertuliskan **runtime belum diuji**.

## 3. Tes regresi yang disiapkan (belum dieksekusi pada Laravel lokal)

- `tests/Feature/WorkspaceTest.php` (sebelumnya): semua halaman kanonis, role, pending certification body.
- `tests/Feature/NavigationRegressionTest.php` (baru): form edit skill Admin, menu aktif tunggal, label role, SVG, menu lembaga.
- `tests/Feature/DomainWorkflowRegressionTest.php` (baru): pelatihan selesai tidak mengulang, konfirmasi lembaga, status sertifikat yang lebih rendah.
- `tests/Feature/AuthorizationTest.php` (sebelumnya): privasi download sertifikat.
- `tests/Feature/MatchingTest.php` dan `tests/Unit/MatchingCalculatorTest.php` (sebelumnya): perhitungan.

Jalankan `scripts/VERIFY_ALL_WINDOWS.ps1` dari PowerShell root proyek. Script tersebut menjalankan `optimize:clear`, `view:cache`, `php -l` untuk semua view hasil compile, `route:list`, dan `php artisan test`. **Tidak otomatis menimpa database**.

## 4. Yang belum dapat dinyatakan lulus

- Kompilasi **Blade oleh framework Laravel yang sebenarnya** dan seluruh render HTTP.
- MySQL migration/CRUD, transaksi, upload dokumen dan proses lintas-role secara nyata.
- UI klik, responsive viewport tablet/HP, browser testing Chrome/Safari.
- HTTPS, trust proxies, mixed content dan asset pada tunnel ngrok secara nyata.
- Kesesuaian visual seluruh 111 hasil screenshot dengan source yang sedang berjalan.

Penyebab: runtime ini tidak memiliki Composer, `vendor/`, driver MySQL atau SQLite PHP, dan akses registry Composer. Pemeriksaan tersebut **harus dilakukan pada instalasi Windows pengguna** sebelum label DONE atau produksi diberikan.

## 5. Cara upgrade (dari full source v1.1.0)

1. Backup folder proyek dan database.
2. Jika menggunakan patch, ekstrak seluruh isi ZIP patch langsung ke root `SkillMatching` yang berisi `artisan`; timpa file yang sama. Jangan hapus `.env` atau `vendor`.
3. Atau gunakan ZIP Full Source v1.1.1; copy konfigurasi `.env` lama ke folder baru, jangan mengganti database tanpa backup.
4. Jalankan:

```powershell
php artisan optimize:clear
php artisan view:cache
php artisan test
powershell -ExecutionPolicy Bypass -File scripts/VERIFY_ALL_WINDOWS.ps1
php artisan serve
```

5. Verifikasi secara manual:
   - `/admin/skill/form?id=11` (gunakan ID skill yang memang ada pada database).
   - `/pelamar/pelatihan/aktivitas` (hanya Aktivitas Pelatihan aktif).
   - Sidebar dan tombol Menu mobile, seluruh role.
   - CRUD, alur matching, pelatihan, sertifikat dan tes otorisasi.
6. Jika command atau rute memunculkan error, salin stack trace Laravel dan hasil `php artisan test` supaya perbaikannya bisa diverifikasi.

Tidak perlu `migrate:fresh` karena **tidak ada migration baru** pada versi ini.

# Skill Matching v1.1.5 — Perbaikan Halaman Detail dan Pengujian

**Baseline:** Full Source v1.1.4. Patch ditujukan langsung untuk v1.1.4.

## Masalah yang diperbaiki

1. **Detail Jabatan 404** (`/admin/jabatan/detail?id=...`): tombol Detail pada daftar Jabatan menuju halaman yang belum terdaftar di pemetaan controller. Halaman tersebut sekarang mempunyai definisi view/judul dan menampilkan jabatan beserta keterampilan yang dipetakan.
2. **Detail katalog kurang informatif**: Detail Skill menampilkan pemetaan ke jabatan; Detail Lowongan menampilkan persyaratan skill, sumber dan masa berlaku; Detail Pelatihan menampilkan skill capaian, biaya, durasi, mode dan prasyarat. Data diambil dari database, bukan data contoh dalam tampilan.
3. **Detail Akun bergantung pada pagination**: sebelumnya pencarian akun detail dilakukan melalui daftar akun yang sedang ditampilkan. Sekarang pencarian detail langsung dibatasi menurut ID dan role di controller, sehingga data pada halaman lain tetap bisa dibuka dari tautan sah. Akun Admin tetap dilindungi.
4. **Detail Pelatihan dengan ID salah**: sebelumnya ID yang tidak ditemukan bisa menyebabkan halaman menampilkan pelatihan pertama. Sekarang ID eksplisit yang tidak ditemukan menampilkan kondisi data tidak tersedia.
5. **Filter peserta lembaga**: filter `training_id` dikonsolidasikan ke controller, setelah data terlebih dahulu dibatasi hanya pada pelatihan milik lembaga yang sedang login. Form filter mempertahankan `training_id` ketika pencarian/status diterapkan.
6. **Satu tes gagal pada v1.1.4**: tes sebelumnya menuntut `role="switch"` pada daftar akun kosong. Tes kini menambahkan akun uji yang nyata sebelum memastikan toggle ditampilkan; halaman kosong tetap tidak memunculkan aksi untuk baris yang tidak ada.

## Pengujian baru

- `tests/Feature/CatalogDetailRegressionTest.php`: akses detail keempat katalog dengan data tersimpan, relasi skill, ID tidak ditemukan, akses lintas role, detail akun yang tidak berada pada halaman pertama, dan ID pelatihan tidak valid.
- `tests/Feature/CertificationDetailNavigationTest.php`: daftar peserta sesuai pelatihan yang dipilih pada lembaga terkait.
- `tests/Feature/GlobalDataControlsTest.php`: tes switch pada akun uji yang benar-benar ada.

## Yang sudah diperiksa di lingkungan pembuatan patch

- Pemeriksaan sintaks PHP: lulus untuk 49 file PHP aplikasi/tes.
- Pemeriksaan statis 62 template Blade: tidak menemukan directive berpasangan yang terbuka.
- Pemeriksaan sintaks 605 blok/ekspresi PHP pada Blade: lulus.
- Pemeriksaan sintaks JavaScript `public/js/data-controls.js`: lulus.
- Semua pemetaan detail Admin (Skill, Jabatan, Lowongan, Pelatihan, Akun) tersedia pada controller.

**Belum terverifikasi di sini:** `php artisan test`, kompilasi Blade oleh Laravel, database MySQL, atau browser/ngrok yang sebenarnya. Lingkungan pembuatan patch tidak memiliki Composer/vendor dan driver database. Hasil tes di komputer Windows tetap menjadi acuan.

## Cara menerapkan ke Full Source v1.1.4

1. Cadangkan proyek dan database terlebih dahulu.
2. Ekstrak `SkillMatching_v1.1.5_Patch.zip` ke folder proyek yang berisi `artisan`, timpa file lama, jangan menimpa `.env`.
3. Jalankan perintah berikut di PowerShell:

```powershell
php artisan optimize:clear
php artisan view:cache
php artisan test --filter=GlobalDataControlsTest
php artisan test --filter=CatalogDetailRegressionTest
php artisan test --filter=CertificationDetailNavigationTest
php artisan test
```

4. Jalankan `php artisan serve`, lalu buka:

- `/admin/jabatan` → tombol Detail pada setiap jabatan;
- `/admin/jabatan/detail?id=2` → nama jabatan, status, skill terkait, tombol pengelolaan;
- `/admin/skill/detail?id=...`;
- `/admin/lowongan/detail?id=...`;
- `/admin/pelatihan/detail?id=...`;
- `/admin/akun/detail?id=...` (akun Pelamar/Badan Sertifikasi);
- `/sertifikasi/pelatihan` → pilih Lihat Peserta;
- `/pelamar/pelatihan/detail?training_id=999999` → tidak boleh menampilkan data pelatihan lain.

Tidak ada perubahan migration pada v1.1.5; **tidak perlu** `migrate:fresh` atau menghapus database. Database dan `.env` lama tetap digunakan.

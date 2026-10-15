## v1.1.5 — Perbaikan halaman detail dan regresi kontrol data

- Memperbaiki 404 halaman Detail Jabatan dan melengkapi data relasi pada detail katalog.
- Memperbaiki lookup Detail Akun agar tidak bergantung pada pagination daftar.
- Memperbaiki fallback pelatihan yang salah dan menyatukan filter peserta ke controller.
- Mengoreksi tes switch ketika daftar akun kosong dan menambah tes halaman detail.
- Tidak ada migration baru. Lihat `PERBAIKAN_HALAMAN_DETAIL_v1.1.5.md`.

## v1.1.4 — Filter global, dropdown cari, toggle, proteksi Admin

- Filter dan pencarian lintas halaman tiga role.
- Semua dropdown memiliki fungsi pencarian tanpa library eksternal.
- Toggle status skill/jabatan/lowongan/pelatihan/akun; validasi backend.
- Akun Admin tidak dapat diubah statusnya melalui menu pengelolaan akun.
- Teks antarmuka generik yang tidak perlu dihapus.
- Tes regresi baru untuk fitur admin dan kontrol data.

# v1.1.3 — Perbaikan Taksonomi Skill dan UI Administrasi

Lihat `PERBAIKAN_UI_DAN_TAKSONOMI_v1.1.3.md`.

# Changelog Skill Matching

## v1.1.2 — Konsistensi Status Akun dan Regresi Otorisasi

- Menyamakan default `User.is_active` pada Eloquent dengan default database (`true`).
- Memastikan akun yang secara eksplisit dinonaktifkan tetap ditolak middleware.
- Menambah empat pengujian regresi status akun.
- Menindaklanjuti dua tes gagal (`302` alih-alih `403`) pada laporan verifikasi Windows v1.1.1.
- Tidak mengubah database, rute, Blade, atau tampilan.
- Verifikasi runtime harus dijalankan di Windows; pada lingkungan pembuat patch tidak tersedia dependensi Composer dan driver database.

---

# Changelog Skill Matching

## v1.1.1 — Audit Blade, menu, alur data

- Memperbaiki directive Blade penyebab ParseError pada form Admin dan template sejenis.
- Memperbaiki menu aktif tunggal, label per role, ikon navigasi SVG, dan drawer mobile.
- Memperbaiki aturan ulang pelatihan yang selesai, lembaga nonaktif, verifikasi skill lebih tinggi, prasyarat siklik, dan lowongan kedaluwarsa.
- Menambahkan pemeriksaan 84 rute/60 template, test regresi, dan skrip verifikasi Windows.
- Tidak ada migration baru; `.env` dan database lama tetap dipertahankan.

# Changelog

## v1.1.0 — Restrukturisasi aplikasi dinamis

- Ganti routing berdasarkan nomor screen menjadi routing modul berdasarkan fungsi.
- Pisahkan tampilan Pelamar, Admin dan Badan Sertifikasi ke partial Blade per fungsi, tanpa `@elseif($screen)` berantai.
- Tambahkan antarmuka untuk data CRUD, persyaratan skill, prasyarat pelatihan, konfirmasi skill, skor, gap, training, simulasi, sertifikasi, evaluasi.
- Perbaiki penyimpanan array alias ke JSON MySQL.
- Pisahkan MatchingCalculator sebagai layanan domain murni dan tambahkan pengujian.
- Tambahkan aksi hapus relasi dan pengaturan status belajar.
- Perkuat pengaturan verifikasi skill ketika level meningkat.
- Jalur belajar memilih prasyarat secara berurutan.
- Tambahkan pengujian menyeluruh rute dan halaman dalam `tests/Feature/WorkspaceTest.php` (belum dapat dijalankan tanpa vendor/database).
- Pertahankan source Figma di folder referensi, bukan sebagai runtime atau login dummy.
- Perbarui README, panduan ngrok, checklist QA, dan skrip verifikasi Windows.

### Kompatibilitas

- Database migration awal tetap dipertahankan. Backup data sebelum menjalankan migrasi.
- Endpoint lama berbasis nomor screen tersedia hanya sebagai redirect lama.
- Tidak mengubah file `.env` pengguna dalam patch.

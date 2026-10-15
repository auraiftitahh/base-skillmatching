# Skill Matching v1.1.3 — Perbaikan Taksonomi Skill dan Teks Antarmuka

## Dasar pembaruan

Pembaruan ini berangkat dari **Full Source v1.1.2**, bukan dari patch versi lain.

## Perubahan utama

1. Daftar Taksonomi Skill menampilkan data **Aktif dan Nonaktif**. Menonaktifkan keterampilan hanya mengubah status `is_active` dan tidak menghapus data.
2. Admin dapat melakukan pencarian nama, kategori, dan alias, serta filter **Semua / Aktif / Nonaktif**. Tabel mendukung pagination 15 baris per halaman dengan parameter filter tetap terjaga.
3. Menambahkan tombol **Aktifkan / Nonaktifkan** langsung pada daftar dan detail keterampilan.
4. Menambahkan tombol **Hapus** dengan konfirmasi. Hapus permanen hanya jika keterampilan belum digunakan oleh profil Pelamar, lowongan, pelatihan, pemetaan, relasi, sertifikat, atau riwayat pencocokan/profil uji. Bila masih digunakan, sistem menolak penghapusan dan menyarankan *Nonaktifkan*; tidak ada cascade delete.
5. Memperbaiki pesan validasi nama skill duplikat dan menjaga status pilihan saat validasi form gagal.
6. Riwayat Aktivitas Admin menampilkan **nama pelaku, tindakan Bahasa Indonesia, nama data terkait, alasan/status, dan tanggal berformat manusia**. Log teknis tetap tersimpan untuk audit tetapi tidak ditampilkan sebagai JSON mentah.
7. Ringkasan aktivitas dashboard Admin diperbarui menggunakan format yang sama.
8. Halaman Evaluasi > Profil Uji menggunakan pemilihan keterampilan/tingkat, bukan isian JSON. Data tetap disimpan pada skema `skills_json` yang sama.
9. Tabel evaluasi, masukan Pelamar, catatan lamaran, sertifikat, dan riwayat rekomendasi memakai label status/tanggal yang lebih mudah dipahami.
10. Menambahkan tes regresi Taksonomi Skill, audit, dan formulir evaluasi.

## Ketentuan data

- **Tidak memerlukan migration baru, reseed, reset database, ataupun penggantian `.env`.**
- Data nonaktif yang telah ada tidak berubah; setelah patch dipasang data tersebut akan muncul kembali pada filter **Semua** atau **Nonaktif**.
- Jangan jalankan `migrate:fresh` karena akan menghapus database lokal.
- Detail audit lama dengan JSON kosong tetap tercatat; halaman menampilkan `—` bila tidak ada catatan yang relevan.
- Tanggal aktivitas tetap dicatat karena penting untuk audit, tetapi tidak lagi menggunakan format timestamp mentah.

## Instalasi patch

1. Backup folder proyek dan database.
2. Ekstrak isi ZIP Patch **langsung di folder proyek yang mengandung `artisan`**, timpa file yang sama.
3. Tidak perlu menyalin `.env` dari ZIP Full Source ke `.env` yang digunakan saat ini.
4. Pada PowerShell jalankan:

```powershell
php artisan optimize:clear
php artisan view:cache
php artisan test
php artisan serve
```

Jika menggunakan Full Source, pastikan dependensi Composer sudah terpasang; jalankan `composer install` bila perlu. Untuk pemeriksaan lengkap gunakan `powershell -ExecutionPolicy Bypass -File scripts/VERIFY_ALL_WINDOWS.ps1`.

## Checklist uji manual

- Admin > Taksonomi Skill: ubah sebuah keterampilan Aktif menjadi Nonaktif, simpan, kemudian pastikan tetap terlihat dalam **Semua** dan **Nonaktif**.
- Filter **Aktif** tidak menampilkan data nonaktif; pencarian nama/kategori/alias bekerja bersama filter.
- Aktifkan kembali skill nonaktif; status berubah di halaman detail dan daftar.
- Buat skill baru yang belum digunakan, kemudian hapus: skill hilang dari daftar dan tercatat pada audit.
- Coba hapus skill yang dipakai oleh lowongan/profil: sistem menolak dengan pesan jelas dan data terkait tidak hilang.
- Buka Admin > Riwayat Aktivitas: nama admin, tindakan, objek, alasan, dan waktu mudah dibaca; tidak ada kode `account.deactivate`, `users #2`, maupun JSON mentah.
- Coba daftar di layar ponsel: form filter dan tombol aksi tidak terpotong.
- Admin > Evaluasi > Profil Uji: pilih skill dan level, simpan; data terbaca kembali dalam bahasa manusia.

## Pengujian yang dilakukan pada paket ini

- PHP lint pada seluruh berkas PHP source dan test: **lulus**.
- Pemeriksaan keseimbangan directive Blade pada 60 berkas: **tidak ditemukan masalah**.
- Integritas ZIP dan ketepatan manifest patch: **diperiksa saat pengemasan**.
- **Belum** menjalankan `php artisan test`, `view:cache`, MySQL, browser UI, maupun ngrok dari lingkungan pengemasan karena dependensi Composer dan driver database tidak tersedia. Harap gunakan skrip pengujian di atas di Windows untuk verifikasi runtime.

# Checklist Pengujian Fungsional — Skill Matching

**Status**: belum dieksekusi melalui browser, silakan isi setelah mencoba aplikasi nyata. Jangan menyebut lulus berdasarkan sintaks PHP saja.

## Setup dan autentikasi
- [ ] `composer install` berhasil
- [ ] `php artisan migrate --seed` berhasil di MySQL
- [ ] `php artisan view:cache` dan PHP lint file kompilasi lulus
- [ ] User baru register dan memverifikasi email, lalu login
- [ ] Link reset password berfungsi dan kedaluwarsa sesuai batas
- [ ] Akses role lain melalui URL langsung ditolak 403
- [ ] Akun Badan Sertifikasi pending tidak melihat antrean
- [ ] Nonaktifkan akun saat sesi masih aktif, sesi terblokir

## Admin Platform
- [ ] Skill CRUD, alias dan kategori tersimpan dalam database
- [ ] Jabatan, pemetaan jabatan-skill dan relasi skill terkait
- [ ] Lowongan baru draft, atur persyaratan skill, lalu publish
- [ ] Lowongan tanpa required skill tidak boleh publish
- [ ] Lowongan kedaluwarsa hilang dari rekomendasi aktif
- [ ] Pelatihan baru draft, tambah capaian skill, publish
- [ ] Prasyarat pelatihan tidak boleh sendiri
- [ ] Impor CSV benar dan baris invalid dilaporkan
- [ ] Bobot baru wajib alasan, hasil snapshot lama tidak berubah
- [ ] Data evaluasi ahli 1–4, dan ekspor laporan CSV
- [ ] Admin tidak dapat melihat riwayat lamaran dan semua skill Pelamar

## Pelamar
- [ ] Profil dasar: status pekerjaan opsional
- [ ] Tambah/edit/hapus riwayat tanpa mengubah akun lain
- [ ] Skill dan level tersimpan / saran skill dari mapping jabatan
- [ ] Daftar lowongan dan penjelasan skor sesuai rumus
- [ ] Gap beberapa lowongan benar, tidak negatif
- [ ] Filter biaya/jam/mode pelatihan bekerja
- [ ] Learning path maksimal 3 dengan prasyarat benar
- [ ] Simulasi tidak mengubah data skill aktual
- [ ] Penyelesaian pelatihan tanpa lembaga berstatus self-reported
- [ ] Pelatihan dengan lembaga menunggu konfirmasi kelulusan
- [ ] Upload PDF/JPEG/PNG tersimpan privat; format ilegal ditolak
- [ ] Batalkan sertifikat hanya ketika pending
- [ ] Catatan lamaran dan timeline status bekerja
- [ ] Feedback tersimpan dan tidak mengubah bobot otomatis

## Badan Sertifikasi
- [ ] Konfirmasi kelulusan peserta hanya dari lembaganya
- [ ] File sertifikat lembaga lain tidak dapat dibuka
- [ ] Tolak sertifikat wajib alasan
- [ ] Terima sertifikat memengaruhi status kepercayaan skill, bukan rumus skor
- [ ] Keputusan lama tidak dapat diubah sembarangan

## Browser / responsive / ngrok
- [ ] Chrome Windows 1366px
- [ ] Chrome 768px tablet
- [ ] Chrome mobile 390px dan 360px
- [ ] Safari iOS
- [ ] Tidak ada konten/tombol terpotong, tabel dapat di-scroll
- [ ] Semua 3 role dapat diakses melalui ngrok HTTPS
- [ ] Form submit, session, CSRF, file upload bekerja melalui ngrok
- [ ] Aset CSS terbaca via ngrok pada seluruh route
- [ ] Regression test setelah semua temuan diperbaiki

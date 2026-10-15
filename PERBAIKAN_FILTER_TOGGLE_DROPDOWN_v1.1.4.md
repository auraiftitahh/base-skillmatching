# Skill Matching v1.1.4 — Filter Data, Dropdown Pencarian, dan Toggle Status

## Tujuan

Perbaikan ini berdasarkan pengujian UI Admin, termasuk tampilan Daftar Akun Platform. Basis update **Full Source v1.1.3**.

### Perubahan

1. **Proteksi akun Admin:** akun role `admin` tidak muncul di daftar akun yang dikelola; GET detail admin menghasilkan 404; POST aktivasi, nonaktivasi, verifikasi, dan penolakan atas akun role admin ditolak server (403). Akun Pelamar dan Badan Sertifikasi tetap dapat dikelola.
2. **Status menggunakan toggle:** pada daftar keterampilan, jabatan, lowongan, pelatihan, akun, serta formulir skill dan jabatan. Untuk akun biasa, dialog mewajibkan alasan sebelum permintaan perubahan status dikirim ke server. Toggle tidak langsung mengubah tampilan secara optimistis: status berubah setelah server menyimpan hasilnya.
3. **Validasi aktivasi:** lowongan hanya dapat diaktifkan bila ada persyaratan keterampilan dan belum kedaluwarsa; pelatihan hanya dapat diaktifkan bila mempunyai keterampilan capaian; semua penonaktifan mempertahankan data.
4. **Dropdown berpencarian:** seluruh tag `<select>` pada aplikasi secara otomatis memiliki pencarian, bahkan hanya dua opsi. Tanpa JavaScript, `<select>` asli tetap tersedia. Nama dan nilai field tidak berubah sehingga request Laravel tetap kompatibel.
5. **Pencarian dan filter di halaman daftar:** Admin (taksonomi skill, jabatan, lowongan, pelatihan, akun, aktivitas, evaluasi, feedback, riwayat bobot), Pelamar (riwayat, lowongan, rekomendasi pelatihan, aktivitas, rencana belajar, sertifikat, lamaran, riwayat rekomendasi), Badan Sertifikasi (pelatihan, peserta, sertifikat, riwayat). Filter mengikuti hak akses dan dataset masing-masing.
6. **UI:** menghilangkan teks generik seperti "Kelola data yang digunakan oleh fitur aplikasi." dari daftar katalog; menghilangkan deskripsi halaman generik di bagian atas workspace; memberi tata letak filter dan toggle konsisten di mobile/desktop.

### Catatan implementasi

- Filter daftar katalog utama serta akun menggunakan query server + pagination. Beberapa daftar lain yang memiliki data telah dimuat sebelumnya difilter pada kumpulan data milik role tersebut. Pengembangan berikutnya bisa memindahkannya ke pagination server jika volumenya bertambah.
- Beberapa status lowongan/pelatihan tetap memakai pilihan alur kerja (misalnya Draft, Ditutup, Kedaluwarsa), bukan disamakan dengan dua status aktif/nonaktif. Pengaktifan/penonaktifan cepat dilakukan dengan toggle pada daftar.
- Aksi mengelola akun admin diblokir lewat backend; perlindungan bukan hanya menyembunyikan tombol.
- Tidak ada migrasi database, perubahan `.env`, maupun perubahan password.

### Cara uji di Windows

```powershell
php artisan optimize:clear
php artisan view:cache
php artisan test --filter=GlobalDataControlsTest
php artisan test
php artisan serve
```

Coba daftar berikut melalui tiga role:

- `/admin/akun` → cari/filter Pelamar/Badan Sertifikasi; Admin tidak terlihat; toggle meminta alasan.
- `/admin/skill` → filter Aktif/Nonaktif, toggle status, hapus hanya bila aman.
- `/admin/jabatan`, `/admin/lowongan`, `/admin/pelatihan` → cari, filter status, toggle status, pastikan data nonaktif tetap terlihat.
- `/admin/aktivitas` dan `/admin/evaluasi/umpan-balik` → gunakan pencarian/filter.
- `/pelamar/riwayat`, `/pelamar/lamaran`, `/pelamar/sertifikat`, `/pelamar/pelatihan` → cari dan filter.
- `/sertifikasi/pelatihan`, `/sertifikasi/pelatihan/peserta`, `/sertifikasi/sertifikat` → cari/filter hanya milik lembaga.
- Buka tiap dropdown (termasuk pilihan level atau status yang pendek), ketik kata kunci, pilih, kirim formulir.
- Ukuran layar mobile: tombol filter dan panel pilihan tidak boleh melewati lebar layar.

### Batas verifikasi

Source ini sudah diperiksa sintaks PHP, pendekatan kompilasi Blade, dan sintaks JavaScript. **Tes Laravel pada MySQL nyata dan pengujian browser end-to-end belum berhasil dijalankan di lingkungan pembuatan**. Jalankan tes pada komputer tempat Laravel/Composer/MySQL sudah terpasang; laporkan hasil jika ada kegagalan.

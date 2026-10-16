# Keputusan implementasi

## Acuan

UI mengikuti token, tata letak shell, hierarki dashboard, kartu, ikon, form, tabel dan modal pada sumber Figma tersimpan. Sidebar/proses nyata dan data akun dipertahankan. Kontrol khusus demo, pemilih state dan tombol simulasi verifikasi email tidak diterapkan. Halaman yang sebelumnya digabung tetap boleh berbagi template selama tugas dan konteksnya lengkap; lihat matriks 84 layar.

## Rumus dan data

Rumus matching dan prioritas relasi skill dipertahankan. Bobot berbeda merupakan konfigurasi yang sah. Override memiliki alasan. Simulasi memakai satu objek konfigurasi untuk skor sebelum/sesudah, menerapkan maksimum level per skill dan tidak menyimpan profil. Cakupan gap dijelaskan terpisah dari tambahan poin matching. Snapshot lama tetap memakai data/versinya sendiri.

Ada konsekuensi aturan lama yang kini dijelaskan: bila skill langsung baru pada level rendah menggantikan kecocokan melalui relasi yang lebih kuat, skor simulasi dapat turun. Sistem tidak memalsukan hasil menjadi naik; UI menunjukkan perubahan bertanda negatif dan alasannya. Perubahan aturan memilih maksimum kecocokan langsung/relasi akan menjadi perubahan metode terpisah, bukan disisipkan dalam perbaikan UI.

## Keputusan dari pertanyaan PRD

- Prasyarat tetap antar pelatihan, sesuai model existing; tidak menambah prasyarat skill secara diam-diam. Memulai/menyelesaikan pelatihan memerlukan prasyarat selesai. Pelatihan dapat direncanakan untuk urutan berikutnya; simulasi tetap eksploratif.
- Pelatihan mandiri mencatat kemampuan self-reported setelah pernyataan penyelesaian. Pelatihan berlembaga menunggu konfirmasi; lembaga nonaktif tidak menyebabkan penyelesaian otomatis.
- Lama pengalaman membantu konteks saran; tidak otomatis menentukan level. Panduan Dasar–Ahli menggunakan kemampuan melakukan tugas dan kemandirian, bukan jumlah tahun.
- Domisili ditambah opsional; status ketenagakerjaan tetap opsional dan tidak memengaruhi skor. Tidak menambah data wajib baru untuk sekadar mengikuti mockup.
- Profil tanpa skill boleh melihat katalog umum. Persentase personal hanya muncul bila target jelas. Profil kosong dengan target tetap memiliki gap sehingga cakupan pelatihan bisa positif.
- Rencana aktif tetap maksimal tiga; simulasi maksimal 20 untuk membatasi ukuran request/hasil. Penggabungan tidak menjumlahkan level atau persentase cakupan.
- Impor tidak overwrite; duplikat judul + perusahaan/penyedia dilewati. Preview berlaku 30 menit, dibatasi 1.000 baris/3 MB, commit eksplisit dan pengiriman ulang ditolak.
- Pengubahan skill massal bersifat tambah/perbarui pilihan, bukan menghapus seluruh relasi yang tidak dicentang. Penghapusan memakai tindakan tersendiri agar tidak terjadi kehilangan data diam-diam.
- Peringkat evaluasi menggunakan competition ranking per profil dalam data yang ditampilkan (1,1,3). ID versi baru disimpan; histori tanpa versi tidak diberi nilai rekaan. Feedback tidak mengubah bobot otomatis.
- Tautan kembali menggunakan tujuan lokal yang aman, dengan parameter return untuk mempertahankan filter asal. Fallback kontekstual tetap tersedia ketika halaman dibuka langsung.
- Lembaga dan akun yang belum memenuhi syarat tetap terlihat kepada Admin/pemilik untuk peninjauan status; tidak muncul sebagai layanan publik yang layak dipilih.

Rincian semua batas terdapat pada ACCESS_AND_VISIBILITY.md. Tidak dilakukan deployment, perubahan SMTP, reset database hosting atau perubahan proposal Bab 4.5 ke atas dalam pekerjaan source ini.

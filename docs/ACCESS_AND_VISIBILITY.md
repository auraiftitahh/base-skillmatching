# Batas akses dan visibilitas

Aturan dijalankan pada backend. Mengetahui URL atau mengirim POST manual tidak memberi akses tambahan.

| Data/kondisi | Pelamar | Admin | Lembaga |
|---|---|---|---|
| Email akun belum diverifikasi | Tidak dapat masuk ruang kerja; halaman verifikasi/kirim ulang tersedia | Melihat status akun untuk administrasi | Tidak dapat mengakses tugas |
| Akun nonaktif | Login/ruang kerja ditolak | Dapat meninjau akun dan alasan tindakan | Login/ruang kerja ditolak |
| Lembaga pending/rejected/disabled | Tidak tampil sebagai pilihan pengajuan/pelatihan personal | Tetap terlihat untuk peninjauan dan status | Pemilik melihat halaman status; akses tugas/tindakan ditolak |
| Lembaga berstatus active tetapi email belum diverifikasi atau akun nonaktif | Tidak dianggap lembaga publik yang valid | Tetap dapat ditinjau | Tidak boleh memproses tugas |
| Lowongan draft/disabled/closed/expired/tanggal lewat | Tidak tampil di rekomendasi/pilihan target; akses detail ditolak | Tetap terlihat dan dapat dikelola | Tidak memiliki akses pengelolaan lowongan |
| Lowongan tanpa persyaratan | Tidak dipublikasikan dalam rekomendasi walau status lama active | Perlu melengkapi persyaratan | — |
| Pelatihan draft/nonaktif/tanpa capaian | Tidak tampil dalam katalog/simulasi atau rencana baru | Tetap terlihat dan dapat diperbaiki | Tetap dapat melihat miliknya dalam konteks pengelolaan |
| Pelatihan dari lembaga tidak memenuhi syarat publik | Tidak tampil di katalog/simulasi; POST tambah rencana ditolak | Terlihat; publikasi baru ditolak sampai syarat terpenuhi | Tidak dapat memproses bila lembaga tidak aktif |
| Pelatihan mandiri tanpa lembaga | Boleh tampil jika aktif dan mempunyai capaian | Dapat dikelola | Tidak berada dalam kewenangan lembaga |
| Skill aktif dan belum terverifikasi milik pelamar | Boleh digunakan dalam matching; jelas berstatus pernyataan sendiri | Tidak memberi admin akses mengubah profil skill pelamar | Verifikasi hanya melalui pengajuan dalam kewenangan |
| Skill katalog nonaktif | Tidak menjadi pilihan baru; data historis tidak dihapus | Terlihat untuk pemeliharaan | Data historis tetap dapat dirujuk |
| Riwayat/sertifikat/lamaran pribadi | Hanya pemilik | Tidak disediakan sebagai direktori publik | Hanya sertifikat/peserta dalam kewenangan lembaga |
| Peserta dengan akun nonaktif/email belum diverifikasi | Tidak menjadi direktori publik | Akun tetap dapat dikelola | Tidak tampil dalam antrean kerja baru |

Riwayat milik sendiri dan snapshot lama tetap disimpan meskipun objek katalog kemudian nonaktif. Ini berbeda dari menawarkan objek itu untuk tindakan baru. Status pending tetap terlihat kepada pemilik agar ia tahu alasan pembatasan dan langkah selanjutnya; menyembunyikannya dari Admin akan menghalangi peninjauan.

Rencana maksimal tiga pelatihan belum selesai tetap dipertahankan. Simulasi menerima satu sampai 20 pelatihan untuk eksplorasi; simulasi tidak menambah rencana atau skill otomatis. Sertifikat PDF/JPG/PNG maksimal 5 MB; impor CSV maksimal 3 MB dan 1.000 baris, pratinjau 30 menit. Verifikasi ulang email dibatasi tiga request per menit.

Penyelesaian pelatihan mandiri mencatat capaian sebagai self-reported. Pelatihan berlembaga menunggu kelulusan lembaga aktif. Jika lembaganya kemudian nonaktif, sistem tidak menganggapnya otomatis sebagai pelatihan mandiri. Verifikasi sertifikat tetap merupakan keputusan terpisah.

Penghapusan riwayat pekerjaan tidak menghapus skill yang pernah dikonfirmasi. Penghapusan riwayat hasil juga tidak menghapus profil atau daftar lowongan. Skor dan cakupan dihitung dari profil/target saat ini, bukan dari keberadaan riwayat hasil.

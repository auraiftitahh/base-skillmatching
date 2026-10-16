# Perubahan UI Alignment V2

## Pelamar

- Detail lowongan: nama posisi menjadi judul utama; informasi dan persyaratan di kiri, panel kecocokan serta aksi di kanan. Tanggal diformat dan status terpenuhi/gap dapat dipindai.
- Rincian skor: kebutuhan dan level menjadi isi utama. Penjelasan opsional tertutup secara default. Kolom w/c, kontribusi, substitusi rumus, serta konfigurasi global dihapus dari UI pelamar.
- Simulasi: satu kartu hasil sebelum/sesudah, perubahan keterampilan, alasan skor tetap, dan tindakan pelatihan. Tidak mengulang tabel perhitungan.
- Detail pelatihan: panel potensi skor untuk satu target, kartu ilustratif, serta alasan rekomendasi tanpa rincian perkalian cakupan gap.
- Skill: keterampilan tersimpan/saran riwayat ditampilkan dahulu, katalog tambahan dibuka saat diperlukan. Simpan eksplisit dan penjagaan perubahan belum disimpan dipertahankan.
- Lowongan: kartu berisi konteks posisi, lokasi, jenis kerja, skill, progres kecocokan, bookmark, dan pilihan analisis di kartu.
- Detail lamaran: satu kartu konteks dan timeline; tombol sumber hanya satu. Daftar lamaran/sertifikat lebih ringkas.
- Penyelesaian pelatihan: halaman konfirmasi khusus satu pelatihan, capaian dan ketentuan lembaga/mandiri. Membuka halaman tidak mengubah data.
- Form profil, riwayat, catatan, sertifikat, pengaturan, dan simulasi memakai pengelompokan field responsif. Istilah taksonomi pada input riwayat diganti dengan petunjuk yang lebih mudah dipahami.

## Admin

- Editor skill lowongan/pelatihan/pemetaan menjadi satu editor utama; item tersimpan terlihat lebih dahulu. Katalog tambahan dan bobot khusus dibuka seperlunya; hapus tetap tindakan eksplisit terpisah.
- Pengubahan kepentingan memakai bobot standar aktif secara otomatis pada form. Bobot khusus tetap memerlukan alasan dan validasi backend.
- Form katalog dan konfigurasi menggunakan grid; judul generik berulang diringkas. Tanggal input memakai format HTML date.
- Versi bobot disajikan dalam kartu parameter. Rumus/parameter operasional tetap berada pada konteks Admin yang memerlukannya.
- Daftar akun membedakan aktivasi akun, verifikasi email, dan persetujuan lembaga. Halaman detail, persetujuan, dan status mempunyai tindakan yang lebih terarah.
- Form tambah profil uji menjadi bagian opsional; judul penilaian ahli lebih spesifik. Form profil uji diperbaiki agar muat pada tablet.
- Import memakai area pilih file yang lebih jelas; preview/commit dan aturan validasi tetap dipertahankan. Penjelasan laporan teknis diringkas atau dibuat opsional.

## Lembaga

- Akun pending/nonaktif tidak memperoleh menu tugas operasional pada layar status. Pembatasan backend tetap berlaku.
- Pemeriksaan dokumen dipisahkan dari form keputusan verifikasi; detail peserta dipisahkan dari konfirmasi kelulusan.
- Dokumen privat diberi panel yang jelas dengan unduh dan preview opsional. Browser yang membatasi PDF tetap dapat memakai unduhan.
- Filter sertifikat memakai tab status; identitas lembaga memakai field baca-saja dan status berbahasa Indonesia. Judul peserta mengikuti pelatihan ketika target dipilih.
- Ringkasan dashboard menggunakan tugas menunggu, selesai, dan pengajuan ditolak; tanggal riwayat lebih mudah dibaca.

## Bersama

- Token, proporsi kartu, grid form, metadata, ilustrasi ikon, timeline, status, dan tampilan mobile diselaraskan dengan source Figma.
- Bantuan generik yang berulang dihapus. Label konfirmasi menjadi lebih spesifik, termasuk Keluar dan Hapus.
- Skip-link tidak lagi dimodifikasi dengan return URL; return tidak menumpuk pada navigasi berulang.
- Pengaturan pelamar dipindahkan ke area bawah sidebar.

Algoritme matching, penyimpanan historis, aturan publikasi, otorisasi, dan data seeder tidak diubah. Source terbaru tetap membawa skenario demo variatif rilis sebelumnya. Perubahan UI tidak membuktikan semua layanan eksternal/SMTP/hosting sudah diuji.

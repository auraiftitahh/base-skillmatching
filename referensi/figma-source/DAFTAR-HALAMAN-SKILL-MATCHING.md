# Daftar Halaman dan Popup — Skill Matching

Dokumen ini mencatat 84 layar utama pada mockup: 33 Pelamar, 37 Admin Platform, dan 14 Badan Sertifikasi.

## Cara membaca URL

URL dalam dokumen ini berupa path relatif. Tambahkan domain aplikasi atau preview di depannya.

Contoh: `https://domain-aplikasi-anda/pelamar/13`. Domain tersebut hanya contoh, bukan alamat publik aplikasi.

Alamat `/` mengarah ke `/pelamar/1`, yaitu login dummy. Role ditentukan berdasarkan akun yang digunakan, bukan melalui pengalih peran.

## Login dummy

| Role | Email | Kata sandi | Halaman setelah login |
|---|---|---|---|
| Pelamar | raka@example.com | demo12345 | `/pelamar/13` |
| Admin Platform | admin@skillmatching.id | demo12345 | `/admin/2` |
| Badan Sertifikasi | kontak@logistiknusantara.id | demo12345 | `/sertifikasi/5` jika aktif, atau `/sertifikasi/4` jika menunggu verifikasi |

Login ini hanya untuk demonstrasi, bukan autentikasi produksi.

## Pelamar — 33 halaman

| ID | Halaman | Path URL |
|---|---|---|
| P-01 | Login | `/pelamar/1` |
| P-02 | Registrasi | `/pelamar/2` |
| P-03 | Verifikasi Email | `/pelamar/3` |
| P-04 | Lupa Kata Sandi | `/pelamar/4` |
| P-05 | Reset Kata Sandi | `/pelamar/5` |
| P-06 | Selamat Datang | `/pelamar/6` |
| P-07 | Profil Dasar | `/pelamar/7` |
| P-08 | Profil & Riwayat | `/pelamar/8` |
| P-09 | Tambah / Edit Riwayat | `/pelamar/9` |
| P-10 | Saran Skill | `/pelamar/10` |
| P-11 | Konfirmasi Skill & Level | `/pelamar/11` |
| P-12 | Kesiapan Profil | `/pelamar/12` |
| P-13 | Beranda | `/pelamar/13` |
| P-14 | Rekomendasi Lowongan | `/pelamar/14` |
| P-15 | Detail Lowongan | `/pelamar/15` |
| P-16 | Rincian Skor | `/pelamar/16` |
| P-17 | Analisis Kesenjangan | `/pelamar/17` |
| P-18 | Riwayat Hasil Rekomendasi | `/pelamar/18` |
| P-19 | Rekomendasi Pelatihan | `/pelamar/19` |
| P-20 | Detail Pelatihan | `/pelamar/20` |
| P-21 | Rencana Belajar | `/pelamar/21` |
| P-22 | Simulasi | `/pelamar/22` |
| P-23 | Hasil Simulasi | `/pelamar/23` |
| P-24 | Aktivitas Pelatihan | `/pelamar/24` |
| P-25 | Konfirmasi Penyelesaian | `/pelamar/25` |
| P-26 | Sertifikat | `/pelamar/26` |
| P-27 | Unggah & Ajukan Verifikasi | `/pelamar/27` |
| P-28 | Detail Pengajuan | `/pelamar/28` |
| P-29 | Catatan Lamaran | `/pelamar/29` |
| P-30 | Tambah / Edit Catatan | `/pelamar/30` |
| P-31 | Detail Lamaran | `/pelamar/31` |
| P-32 | Umpan Balik | `/pelamar/32` |
| P-33 | Pengaturan Akun | `/pelamar/33` |

## Admin Platform — 37 halaman

| ID | Halaman | Path URL |
|---|---|---|
| A-01 | Login Admin | `/admin/1` |
| A-02 | Dashboard Admin | `/admin/2` |
| A-03 | Daftar Skill | `/admin/3` |
| A-04 | Tambah / Edit Skill | `/admin/4` |
| A-05 | Detail Skill | `/admin/5` |
| A-06 | Daftar Jabatan | `/admin/6` |
| A-07 | Tambah / Edit Jabatan | `/admin/7` |
| A-08 | Pemetaan Jabatan → Skill | `/admin/8` |
| A-09 | Daftar Lowongan | `/admin/9` |
| A-10 | Tambah / Edit Lowongan | `/admin/10` |
| A-11 | Persyaratan Skill | `/admin/11` |
| A-12 | Detail Lowongan & Riwayat | `/admin/12` |
| A-13 | Import CSV Lowongan | `/admin/13` |
| A-14 | Hasil Import Lowongan | `/admin/14` |
| A-15 | Daftar Pelatihan | `/admin/15` |
| A-16 | Tambah / Edit Pelatihan | `/admin/16` |
| A-17 | Skill yang Diajarkan | `/admin/17` |
| A-18 | Prasyarat Pelatihan | `/admin/18` |
| A-19 | Detail Pelatihan & Riwayat | `/admin/19` |
| A-20 | Import CSV Pelatihan | `/admin/20` |
| A-21 | Hasil Import Pelatihan | `/admin/21` |
| A-22 | Konfigurasi Bobot Aktif | `/admin/22` |
| A-23 | Versi Konfigurasi Baru | `/admin/23` |
| A-24 | Riwayat Versi | `/admin/24` |
| A-25 | Detail Versi | `/admin/25` |
| A-26 | Dashboard Evaluasi | `/admin/26` |
| A-27 | Profil Uji | `/admin/27` |
| A-28 | Pasangan Profil–Lowongan Uji | `/admin/28` |
| A-29 | Data Penilaian Ahli | `/admin/29` |
| A-30 | Feedback Pelamar | `/admin/30` |
| A-31 | Laporan Evaluasi | `/admin/31` |
| A-32 | Ekspor Laporan | `/admin/32` |
| A-33 | Akun Platform | `/admin/33` |
| A-34 | Detail Akun | `/admin/34` |
| A-35 | Verifikasi Badan Sertifikasi | `/admin/35` |
| A-36 | Status Akun | `/admin/36` |
| A-37 | Riwayat Aktivitas Admin | `/admin/37` |

## Badan Sertifikasi — 14 halaman

| ID | Halaman | Path URL |
|---|---|---|
| B-01 | Login Lembaga | `/sertifikasi/1` |
| B-02 | Registrasi Lembaga | `/sertifikasi/2` |
| B-03 | Verifikasi Email | `/sertifikasi/3` |
| B-04 | Menunggu Verifikasi Admin | `/sertifikasi/4` |
| B-05 | Dashboard Lembaga | `/sertifikasi/5` |
| B-06 | Pelatihan dalam Kewenangan | `/sertifikasi/6` |
| B-07 | Peserta Pelatihan | `/sertifikasi/7` |
| B-08 | Detail Peserta | `/sertifikasi/8` |
| B-09 | Konfirmasi Kelulusan | `/sertifikasi/9` |
| B-10 | Verifikasi Sertifikat | `/sertifikasi/10` |
| B-11 | Detail Permintaan | `/sertifikasi/11` |
| B-12 | Keputusan Verifikasi | `/sertifikasi/12` |
| B-13 | Riwayat Proses | `/sertifikasi/13` |
| B-14 | Akun & Informasi Lembaga | `/sertifikasi/14` |

## Variasi data melalui parameter URL

Variasi berikut menggunakan template halaman yang sama; bukan route halaman baru.

| Variasi | Path URL |
|---|---|
| Detail Staf Gudang | `/pelamar/15?lowongan=Staf%20Gudang` |
| Detail Admin Inventori | `/pelamar/15?lowongan=Admin%20Inventori` |
| Detail Operator Produksi | `/pelamar/15?lowongan=Operator%20Produksi` |
| Rincian skor Admin Inventori | `/pelamar/16?lowongan=Admin%20Inventori` |
| Kesenjangan Admin Inventori | `/pelamar/17?lowongan=Admin%20Inventori` |
| Detail catatan lamaran pertama | `/pelamar/31?lamaran=0` |

Parameter `lowongan` menggunakan nama lowongan dan diteruskan pada navigasi terkait di layar 15–23. Parameter `lamaran` menggunakan indeks data, dimulai dari 0; isi indeks bergantung pada data demo yang tersimpan di browser.

## Popup dan halaman induknya

Popup termasuk **state dari halaman induk**, bukan halaman dengan URL sendiri. Buka halaman induk lalu klik pemicunya.

| Role | Halaman induk | Path URL | Popup / variasi | Pemicu |
|---|---|---|---|---|
| Pelamar | P-15 — Detail Lowongan | `/pelamar/15` | Konfirmasi buka sumber eksternal | Buka Sumber Lowongan |
| Pelamar | P-19 — Rekomendasi Pelatihan | `/pelamar/19` | Detail Spreadsheet untuk Logistik | Lihat Detail pada kartu pelatihan tersebut |
| Pelamar | P-20 — Detail Pelatihan | `/pelamar/20` | Konfirmasi buka sumber eksternal | Buka Sumber Pelatihan |
| Pelamar | P-25 — Konfirmasi Penyelesaian | `/pelamar/25` | Konfirmasi tandai pelatihan selesai | Konfirmasi Penyelesaian |
| Pelamar | P-26 — Sertifikat | `/pelamar/26` | Detail sertifikat terdahulu dan alasan penolakan | Lihat Detail pada sertifikat arsip |
| Pelamar | P-27 — Unggah & Ajukan Verifikasi | `/pelamar/27` | Konfirmasi pengajuan sertifikat | Ajukan Verifikasi setelah file dipilih |
| Pelamar | P-28 — Detail Pengajuan | `/pelamar/28` | Konfirmasi pembatalan pengajuan | Batalkan Pengajuan jika masih Menunggu |
| Pelamar | P-31 — Detail Lamaran | `/pelamar/31` | Konfirmasi buka sumber eksternal | Buka Sumber Lowongan |
| Admin Platform | A-12 — Detail Lowongan | `/admin/12` | Konfirmasi terbitkan / nonaktifkan data | Terbitkan atau Nonaktifkan |
| Admin Platform | A-19 — Detail Pelatihan | `/admin/19` | Konfirmasi terbitkan / nonaktifkan data | Terbitkan atau Nonaktifkan |
| Admin Platform | A-23 — Versi Konfigurasi Baru | `/admin/23` | Konfirmasi penerbitan versi bobot | Review & Terbitkan setelah form valid |
| Admin Platform | A-24 — Riwayat Versi | `/admin/24` | Detail versi V3 hanya-baca | Lihat Detail pada V3 |
| Admin Platform | A-35 — Verifikasi Badan Sertifikasi | `/admin/35` | Konfirmasi verifikasi akun lembaga | Setujui Verifikasi |
| Admin Platform | A-36 — Status Akun | `/admin/36` | Konfirmasi aktifkan / nonaktifkan akun | Aktifkan Akun atau Nonaktifkan Akun |
| Badan Sertifikasi | B-07 — Peserta Pelatihan | `/sertifikasi/7` | Detail konfirmasi peserta terdahulu | Lihat Riwayat |
| Badan Sertifikasi | B-09 — Konfirmasi Kelulusan | `/sertifikasi/9` | Konfirmasi kelulusan peserta | Konfirmasi Kelulusan |
| Badan Sertifikasi | B-10 — Verifikasi Sertifikat | `/sertifikasi/10` | Detail keputusan sertifikat terdahulu | Lihat Detail pada pengajuan arsip |
| Badan Sertifikasi | B-12 — Keputusan Verifikasi | `/sertifikasi/12` | Konfirmasi penyimpanan keputusan | Simpan Keputusan setelah form valid |
| Semua role | Halaman dengan sidebar / pengaturan akun | Mengikuti halaman aktif | Konfirmasi keluar | Keluar |
| Semua role | Halaman dengan header | Mengikuti halaman aktif | Bantuan dan daftar screen map | Ikon tanda tanya |

### Syarat kemunculan popup

- Pembatalan pengajuan hanya tersedia ketika status masih **Menunggu**.
- Konfirmasi kelulusan tidak tersedia lagi setelah kelulusan peserta dikonfirmasi.
- Penyimpanan keputusan memerlukan keputusan yang dipilih; penolakan wajib memiliki alasan.
- Penerbitan versi konfigurasi memerlukan form valid dan alasan perubahan.
- Data demo tersimpan di browser. State halaman dapat berbeda setelah tindakan pengguna.

## Pengelompokan di Figma Design

Bisa menempatkan layar dan popup dalam **Page Figma yang sama**. Rekomendasi organisasi:

1. Page Figma **Pelamar**.
2. Page Figma **Admin Platform**.
3. Page Figma **Badan Sertifikasi**.

Pada setiap Page, kelompokkan frame berdasarkan layar induknya menggunakan Section.

Contoh:

```text
Page Figma: Pelamar
└── Section: P-15 — Detail Lowongan
    ├── Frame: Staf Gudang — Desktop
    ├── Frame: Admin Inventori — Desktop
    ├── Frame: Operator Produksi — Desktop
    ├── Frame: Staf Gudang — Mobile
    └── Frame: Popup Buka Sumber — Desktop
```

Popup tidak perlu menjadi Page Figma terpisah. Sebaiknya jadikan frame variasi di Section halaman induk; frame popup memuat halaman di belakangnya, overlay, dan dialog.

## Catatan pengambilan screenshot / impor

- Total **84 URL layar utama** tidak mencakup jumlah variasi desktop, mobile, data, popup, loading, error, atau empty state.
- Untuk mengambil popup, buka popup terlebih dahulu sebelum mengambil screenshot. URL halaman saja tidak otomatis membuka popup.
- Tidak semua tombol pada halaman membuka popup; sebagian melakukan navigasi, menyimpan data, menampilkan toast, atau mengunduh laporan.
- Screenshot adalah gambar, bukan kumpulan layer desain editable. Konversi menjadi layer editable memerlukan proses atau alat tambahan.
- Bagian bertanda **PERLU KEPUTUSAN** tetap dipertahankan sebagai anotasi, bukan keputusan bisnis final.


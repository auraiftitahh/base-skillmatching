# MOCKUP FIGMA MAKE — ROLE PELAMAR

> **Role:** Pelamar  
> **Aplikasi:** Skill Matching  
> **Prioritas layout:** Mobile-first, tetap lengkap di tablet dan desktop.  
> **Dokumen acuan:** `00-MASTER-MOCKUP-SPEC.md`

---

## 1. Tujuan Mockup

Buat seluruh pengalaman Pelamar dari:

```text
Registrasi
→ Verifikasi Email
→ Onboarding Profil
→ Riwayat
→ Konfirmasi Skill
→ Rekomendasi Lowongan
→ Detail Skor
→ Gap Analysis
→ Rekomendasi Pelatihan
→ Rencana Belajar
→ Simulasi
→ Penyelesaian Pelatihan
→ Sertifikat & Verifikasi
→ Riwayat Lamaran
→ Feedback
→ Pengaturan
```

Mockup harus berupa aplikasi yang terasa dapat diklik dan memiliki alur yang saling tersambung, bukan kumpulan halaman terpisah.

---

# 2. Hak Akses Pelamar

Pelamar hanya boleh mengakses data miliknya sendiri.

Boleh:

- registrasi;
- verifikasi email;
- login/logout;
- reset password;
- mengelola profil;
- mengelola status ketenagakerjaan;
- mengelola riwayat kerja, pendidikan, organisasi;
- mengonfirmasi skill dan level;
- melihat rekomendasi lowongan;
- melihat detail skor;
- melihat gap;
- melihat rekomendasi pelatihan;
- membuat/meninjau rencana belajar;
- menjalankan simulasi;
- mengelola sertifikat miliknya;
- melihat status verifikasi;
- mencatat status lamaran;
- memberi feedback;
- mengelola pengaturan akun.

Tidak boleh:

- melihat pengguna lain;
- mengubah taksonomi;
- mengubah bobot;
- membuat lowongan;
- membuat pelatihan;
- memproses verifikasi sertifikat sendiri;
- melamar langsung ke perusahaan melalui Skill Matching.

---

# 3. Navigasi Utama

Desktop:

```text
Logo Skill Matching

Beranda
Profil & Riwayat
Lowongan
Pelatihan
Rencana Belajar
Simulasi
Sertifikat
Lamaran

----------------
Pengaturan
Keluar
```

Mobile:

Gunakan salah satu:

- bottom navigation untuk 4–5 fungsi paling penting + menu lainnya; atau
- topbar + hamburger/drawer.

Jangan memaksa seluruh menu desktop masuk ke bottom navigation.

---

# 4. Screen Map

## AUTH

```text
P-01 Login
P-02 Registrasi
P-03 Verifikasi Email
P-04 Lupa Kata Sandi
P-05 Reset Kata Sandi
```

## ONBOARDING & PROFILE

```text
P-06 Welcome / Mulai Lengkapi Profil
P-07 Profil Dasar & Status Ketenagakerjaan
P-08 Daftar Riwayat
P-09 Tambah/Edit Riwayat
P-10 Saran Skill dari Riwayat
P-11 Konfirmasi Skill & Level
P-12 Ringkasan Kesiapan Profil
```

## CORE EXPERIENCE

```text
P-13 Beranda
P-14 Rekomendasi Lowongan
P-15 Detail Lowongan
P-16 Rincian Skor
P-17 Analisis Kesenjangan
P-18 Riwayat Hasil Rekomendasi
P-19 Rekomendasi Pelatihan
P-20 Detail Pelatihan
P-21 Rencana Belajar
P-22 Simulasi — Setup
P-23 Simulasi — Hasil
```

## TRAINING & CERTIFICATION

```text
P-24 Aktivitas / Status Pelatihan
P-25 Tandai/Konfirmasi Penyelesaian Pelatihan
P-26 Daftar Sertifikat
P-27 Upload & Ajukan Verifikasi Sertifikat
P-28 Detail Pengajuan Verifikasi
```

## APPLICATION TRACKING & FEEDBACK

```text
P-29 Daftar Lamaran
P-30 Tambah/Edit Catatan Lamaran
P-31 Detail Lamaran
P-32 Feedback Rekomendasi
P-33 Pengaturan Akun
```

---

# 5. AUTH FLOW

## P-01 — Login

### Tujuan

Memungkinkan Pelamar masuk ke akun yang sudah terdaftar dan terverifikasi.

### Komponen

- logo;
- heading `Masuk ke Skill Matching`;
- email;
- password;
- show/hide password;
- `Lupa kata sandi?`;
- tombol `Masuk`;
- link `Belum punya akun? Daftar`;
- error alert.

### State

#### Default

Form kosong.

#### Kredensial salah

```text
Email atau kata sandi tidak sesuai.
Periksa kembali data yang Anda masukkan.
```

#### Email belum terverifikasi

```text
Email Anda belum diverifikasi.
[ Kirim Ulang Email Verifikasi ]
```

#### Akun nonaktif

Tampilkan pesan umum bahwa akun tidak dapat digunakan. Jangan mengekspos detail administratif internal.

### Transition

```text
Masuk berhasil
→ P-13 Beranda
atau
→ P-06 Onboarding jika profil belum siap
```

---

## P-02 — Registrasi

### Form

Gunakan data minimum yang diperlukan untuk akun.

Proposal tidak merinci seluruh field registrasi. Jangan menambahkan NIK, data keluarga, atau dokumen identitas.

Minimal secara UI:

- Nama
- Email
- Password
- Konfirmasi Password
- Checkbox persetujuan yang relevan
- `Daftar`

### Validasi

- email tidak valid;
- email sudah digunakan;
- password tidak memenuhi ketentuan;
- konfirmasi password berbeda.

### Setelah berhasil

```text
Registrasi berhasil
→ P-03 Verifikasi Email
```

---

## P-03 — Verifikasi Email

Tampilkan:

```text
Periksa email Anda

Kami telah mengirim tautan verifikasi ke:
a***@email.com
```

Action:

- `Buka Email` bila relevan sebagai visual CTA;
- `Kirim Ulang`;
- `Ganti Email` hanya jika nanti diputuskan produk mendukungnya.

State:

- terkirim;
- cooldown resend;
- tautan kedaluwarsa;
- verifikasi berhasil.

Setelah berhasil:

```text
→ P-06 Welcome
```

---

## P-04 / P-05 — Lupa & Reset Password

Flow standar:

```text
Masukkan email
→ sistem mengirim instruksi
→ buka link
→ password baru
→ konfirmasi
→ berhasil
→ Login
```

---

# 6. ONBOARDING

## P-06 — Welcome / Mulai Lengkapi Profil

### Tujuan

Memberi konteks bahwa rekomendasi membutuhkan data profil dan skill.

### Konten

Hero sederhana:

```text
Mari siapkan profil Anda

Skill Matching membutuhkan riwayat dan keterampilan Anda
untuk menghitung kecocokan lowongan.
```

Checklist:

```text
1. Profil dasar
2. Riwayat pengalaman
3. Keterampilan
4. Siap melihat rekomendasi
```

CTA:

```text
[ Mulai Lengkapi Profil ]
```

Jangan membuat onboarding terlalu panjang.

---

## P-07 — Profil Dasar & Status Ketenagakerjaan

### Status ketenagakerjaan

Pilihan sesuai requirement:

- Bekerja
- Tidak bekerja karena PHK
- Lulusan baru
- Lainnya
- Tidak ingin mengisi / opsional

Tampilkan helper text:

> Status ini hanya menjadi konteks profil dan tidak memengaruhi skor kecocokan.

### Action

```text
[ Simpan & Lanjutkan ]
[ Lewati Status Ketenagakerjaan ]
```

Jika simpan gagal, data lama tetap tampil.

---

## P-08 — Daftar Riwayat

Segment/tab:

- Pekerjaan
- Pendidikan
- Organisasi

Tampilkan card per riwayat.

Contoh:

```text
PT Contoh Industri
Operator Produksi
Jan 2022 — Mar 2025

[ Edit ]
```

Empty state:

```text
Belum ada riwayat pekerjaan.
Tambahkan pengalaman agar sistem dapat menyarankan keterampilan yang relevan.
[ Tambah Riwayat ]
```

CTA:

```text
[ + Tambah Riwayat ]
[ Lanjut ke Keterampilan ]
```

---

## P-09 — Tambah/Edit Riwayat

Proposal tidak menetapkan daftar field detail. Jangan membuat field sensitif yang tidak diperlukan.

UI perlu mendukung:

- jenis riwayat;
- nama institusi/perusahaan/organisasi;
- jabatan/posisi/program;
- periode;
- informasi pendukung yang dibutuhkan untuk pemetaan skill.

Saat memilih jabatan dari taksonomi, berikan autocomplete/search.

### Setelah simpan

```text
→ Sistem menghasilkan kandidat saran skill
→ kembali P-08 atau lanjut P-10
```

---

## P-10 — Saran Skill dari Riwayat

### Tujuan

Menampilkan skill yang disarankan berdasarkan jabatan/riwayat.

Tampilkan per sumber:

```text
Dari: Operator Produksi — PT Contoh Industri

☑ Pencatatan Stok
☑ Keselamatan dan Kesehatan Kerja
☑ Pengoperasian Mesin
☐ Pengoperasian Forklift
```

Keterangan:

> Saran ini belum otomatis menjadi profil skill. Pilih keterampilan yang memang Anda miliki.

CTA:

```text
[ Lanjut Atur Level ]
```

---

## P-11 — Konfirmasi Skill & Level

Setiap baris:

```text
Pengoperasian Forklift

Level:
○ Dasar
○ Menengah
○ Mahir
○ Ahli

[Lihat panduan level]
```

Drawer/modal rubrik:

```text
Dasar      — contoh kemampuan ...
Menengah   — contoh kemampuan ...
Mahir      — contoh kemampuan ...
Ahli       — contoh kemampuan ...
```

Proposal menyebut saran level awal berdasarkan lama pengalaman:

- < 1 tahun → Dasar
- 1 sampai < 3 tahun → Menengah
- 3 sampai < 6 tahun → Mahir
- >= 6 tahun → Ahli

Saran tersebut harus tetap dapat diubah Pelamar.

Tampilkan badge:

```text
Saran sistem: Menengah
```

bukan:

```text
Level Anda pasti Menengah
```

### Status awal

Skill baru:

```text
Dilaporkan sendiri
```

---

## P-12 — Ringkasan Kesiapan Profil

Card:

```text
Profil dasar     ✓
Riwayat          ✓ 3 entri
Keterampilan     ✓ 12 skill
```

Jika minimum data untuk perhitungan tersedia:

```text
Profil Anda siap digunakan untuk rekomendasi.
[ Lihat Rekomendasi Lowongan ]
```

Jika belum:

```text
Masih ada data yang perlu dilengkapi.
[ Lengkapi ]
```

---

# 7. BERANDA

## P-13 — Beranda

### Dashboard mobile-first

Bagian:

1. sapaan;
2. kesiapan profil;
3. lowongan skor tertinggi;
4. gap prioritas;
5. progress/rencana pelatihan;
6. status verifikasi sertifikat;
7. ringkasan lamaran.

### Contoh struktur

```text
Selamat datang, Awi

Profil Anda siap digunakan
12 skill • 2 terverifikasi

Rekomendasi Teratas
Staf Gudang                         85
Admin Logistik                      78
Operator Inventory                  74
[ Lihat Semua ]

Gap Prioritas
Pengoperasian Forklift   Butuh +2 level
Spreadsheet              Butuh +1 level
[ Lihat Analisis ]

Rencana Belajar
1 dari 3 pelatihan selesai
[ Lihat Rencana ]

Sertifikat
1 menunggu verifikasi
[ Lihat Status ]

Lamaran
2 Diproses • 1 Wawancara
[ Lihat Lamaran ]
```

### Empty dashboard

Jika profil belum siap, dashboard tidak boleh menampilkan skor palsu.

Tampilkan checklist onboarding.

---

# 8. LOWONGAN

## P-14 — Rekomendasi Lowongan

### Header

```text
Rekomendasi Lowongan
Berdasarkan profil keterampilan Anda
```

### Controls

- Search;
- filter lokasi;
- jenis hubungan kerja bila datanya ada;
- filter lain yang memang tersimpan pada lowongan;
- toggle `Tampilkan semua`;
- sorting default `Kecocokan tertinggi`.

Catatan:

Lokasi, hubungan kerja, dan kesesuaian upah tidak dihitung ke skor menurut proposal, tetapi dapat menjadi penanda/filter.

### Card Lowongan

```text
Staf Gudang
PT Contoh
Surabaya

85  Cocok

3 skill terpenuhi
2 skill perlu ditingkatkan

[ Lihat Detail ]
```

Jika skor di bawah threshold dan `Tampilkan semua` aktif:

```text
32
Di bawah ambang rekomendasi utama
```

Jangan menyembunyikan alasan.

### State

- loading;
- no results;
- profile incomplete;
- only below-threshold results;
- expired job tidak masuk rekomendasi aktif.

---

## P-15 — Detail Lowongan

Bagian:

- posisi;
- sumber;
- tautan sumber;
- tanggal pengambilan;
- tanggal tutup/kedaluwarsa;
- lokasi;
- hubungan kerja;
- persyaratan skill;
- skor saat ini;
- CTA gap analysis;
- CTA external source.

Persyaratan:

```text
Pencatatan Stok
Wajib • Minimal Menengah
Anda: Mahir
Status: Terpenuhi

Pengoperasian Forklift
Wajib • Minimal Menengah
Anda: Belum memiliki
Status: Gap
```

CTA:

```text
[ Lihat Rincian Skor ]
[ Analisis Kesenjangan ]
[ Buka Sumber Lowongan ]
```

Saat klik sumber:

Modal:

```text
Anda akan membuka situs di luar Skill Matching.
Proses melamar dilakukan di luar aplikasi.

[ Batal ] [ Lanjut ke Sumber ]
```

---

## P-16 — Rincian Skor

### Tujuan

Menjelaskan kenapa Pelamar memperoleh skor.

Header:

```text
Skor Kecocokan
85 / 100
```

Breakdown table/card:

| Skill | Kepentingan | Dibutuhkan | Anda | Kontribusi |
|---|---|---:|---:|---|
| Pencatatan Stok | Wajib | Menengah | Mahir | Terpenuhi |
| Forklift | Wajib | Menengah | - | Belum terpenuhi |
| Spreadsheet | Wajib | Menengah | Dasar | Sebagian |
| K3 | Diutamakan | Dasar | Menengah | Terpenuhi |

Badge status skill:

- Dilaporkan sendiri
- Terverifikasi

Helper:

> Status verifikasi tidak menambah atau mengurangi skor.

Jika skill terkait dipakai:

```text
Kecocokan sebagian berasal dari skill terkait.
Faktor kedekatan konfigurasi saat hasil ini dihitung: 0,5
```

Jangan menampilkan formula teknis berlebihan pada UI utama. Sediakan `Bagaimana skor dihitung?`.

---

## P-17 — Analisis Kesenjangan

Mendukung:

- satu lowongan;
- beberapa lowongan yang dipilih Pelamar.

Header contoh:

```text
Kesenjangan Keterampilan
Berdasarkan 2 lowongan terpilih
```

Card:

```text
Pengoperasian Forklift
Prioritas Tinggi

Level Anda          Belum memiliki
Target tertinggi    Menengah
Selisih             2 level

Dibutuhkan oleh 2 lowongan
[ Cari Pelatihan ]
```

Jika tidak ada gap:

```text
Tidak ada kesenjangan utama untuk lowongan ini.
Semua keterampilan yang dihitung telah memenuhi tingkat minimum.
```

Jangan berarti Pelamar pasti diterima kerja.

---

## P-18 — Riwayat Hasil Rekomendasi

Proposal mewajibkan hasil tersimpan dan dapat ditelusuri.

List:

```text
18 Sep 2026, 10:24
Profil skill: snapshot
Versi konfigurasi: #V4
60 lowongan dihitung
[ Lihat Hasil ]

10 Sep 2026, 21:02
Versi konfigurasi: #V3
[ Lihat Hasil ]
```

Detail hasil lama harus mempunyai banner:

```text
Anda sedang melihat hasil tersimpan dari 18 Sep 2026.
Perubahan profil atau bobot setelah tanggal tersebut tidak mengubah hasil ini.
[ Hitung Ulang dengan Data Terbaru ]
```

---

# 9. PELATIHAN & RENCANA BELAJAR

## P-19 — Rekomendasi Pelatihan

Filter:

- anggaran maksimal;
- waktu belajar per minggu;
- mode belajar.

Card:

```text
Forklift Dasar

Cakupan gap: 66,7%
Target level: Menengah
Durasi: ...
Biaya: ...
Mode: ...
Prasyarat: Tidak ada

[ Lihat Detail ]
[ Tambahkan ke Rencana ]
```

Jika tidak ada pelatihan sesuai filter:

```text
Belum ada pelatihan yang sesuai seluruh preferensi.
Coba sesuaikan anggaran, waktu belajar, atau mode.
[ Atur Ulang Filter ]
```

Jangan otomatis mengubah preferensi tanpa izin.

---

## P-20 — Detail Pelatihan

Tampilkan:

- nama;
- penyedia/sumber;
- skill yang diajarkan;
- tingkat capaian;
- biaya;
- durasi;
- mode;
- prasyarat;
- sumber & link;
- apakah terkait Badan Sertifikasi terdaftar bila datanya tersedia;
- dampak potensial pada gap.

CTA:

```text
[ Simulasikan Dampak ]
[ Tambahkan ke Rencana Belajar ]
[ Buka Sumber Pelatihan ]
```

External modal:

> Pendaftaran dan proses belajar dilakukan di luar Skill Matching.

---

## P-21 — Rencana Belajar

Jalur otomatis maksimal 3 pelatihan.

Contoh:

```text
Rencana Belajar Anda

1
Forklift Dasar
Belum Dimulai

↓ prasyarat terpenuhi

2
Spreadsheet untuk Logistik
Belum Dimulai

3
K3 Gudang
Belum Dimulai
```

Tampilkan alasan singkat:

```text
Disusun untuk menutup gap prioritas terbesar dengan mempertimbangkan preferensi Anda.
```

Jangan membuat lebih dari 3 item pada jalur otomatis.

---

# 10. SIMULASI

## P-22 — Simulasi — Setup

Pilih:

- lowongan target;
- pelatihan;
- skill yang terdampak bila perlu ditampilkan.

Banner:

```text
Simulasi tidak mengubah profil Anda.
```

Summary:

```text
Skor saat ini: 55
Pelatihan dipilih: Forklift Dasar
Perkiraan capaian: Menengah
```

CTA:

```text
[ Hitung Simulasi ]
```

---

## P-23 — Simulasi — Hasil

Hero:

```text
SIMULASI

55 → 85
+30 poin
```

Breakdown perubahan:

```text
Pengoperasian Forklift
Sebelum: Belum memiliki
Simulasi: Menengah
```

Label jelas:

```text
Hasil ini hanya simulasi dan belum mengubah profil skill Anda.
```

CTA:

```text
[ Lihat Pelatihan ]
[ Tambahkan ke Rencana ]
[ Simulasikan Pilihan Lain ]
```

Jika pelatihan tidak memiliki tingkat capaian:

```text
Pelatihan ini belum dapat disimulasikan karena data tingkat capaian belum tersedia.
```

---

# 11. STATUS PELATIHAN

## P-24 — Aktivitas / Status Pelatihan

Proposal menyimpan pelatihan yang dipilih/statusnya dan pengaruh setelah penyelesaian dikonfirmasi.

List:

```text
Forklift Dasar
Sedang / Dipilih / Selesai / Menunggu Konfirmasi
```

Gunakan status yang diperlukan UI, tetapi jangan menganggap seluruh vocabulary final bila belum ditetapkan proposal.

CTA:

```text
[ Lihat ]
[ Tandai Selesai ]
```

---

## P-25 — Konfirmasi Penyelesaian

### PERLU KEPUTUSAN FINAL

Proposal memiliki dua penjelasan yang belum sepenuhnya sama tentang kapan skill diperbarui.

Mockup harus mendukung kondisi berikut secara fleksibel.

### Kondisi A — Ada Badan Sertifikasi terdaftar

```text
Anda menyelesaikan pelatihan ini?

Setelah dikirim, status dapat menunggu konfirmasi lembaga
sesuai aturan pelatihan.

[ Batal ]
[ Konfirmasi Selesai ]
```

Setelah kirim:

```text
Menunggu Konfirmasi Lembaga
```

### Kondisi B — Tidak ada Badan Sertifikasi terdaftar

Pelamar dapat melakukan konfirmasi sendiri menurut KF-10.

Tampilkan:

```text
Pelatihan ini tidak terhubung dengan lembaga terdaftar.
Skill yang diperbarui akan tetap berstatus "Dilaporkan sendiri".
```

Jangan menjadikan hasil self-confirmation sebagai `Terverifikasi`.

---

# 12. SERTIFIKAT

## P-26 — Daftar Sertifikat

Tab/filter:

- Semua
- Menunggu
- Terverifikasi
- Ditolak

Card:

```text
Sertifikat Forklift Dasar
Badan Sertifikasi XYZ
Diajukan 18 Sep 2026

Menunggu Verifikasi
[ Lihat Detail ]
```

Empty:

```text
Belum ada sertifikat.
Anda dapat mengunggah sertifikat sebagai bukti tambahan setelah mengikuti pelatihan.
[ Unggah Sertifikat ]
```

---

## P-27 — Upload & Ajukan Verifikasi Sertifikat

Form minimal berdasarkan use case:

- informasi sertifikat;
- pilih Badan Sertifikasi tujuan;
- upload file;
- skill yang diklaim/terkait sertifikat sesuai batas sistem.

Jangan mengizinkan Pelamar memilih skill/level melebihi apa yang diperbolehkan oleh data pelatihan.

File uploader:

- state empty;
- uploading;
- success;
- unsupported file;
- file too large jika nanti batas ditentukan;
- failed.

CTA:

```text
[ Simpan Draft ]   ← hanya jika implementasi memutuskan mendukung draft
[ Ajukan Verifikasi ]
```

Karena proposal tidak menyebut draft pengajuan, lebih aman mockup utama hanya menggunakan:

```text
[ Ajukan Verifikasi ]
```

Confirmation:

```text
Pastikan lembaga yang dipilih sesuai dengan sertifikat.
Pengajuan yang sudah diproses tidak dapat dibatalkan.
```

---

## P-28 — Detail Pengajuan Verifikasi

Header:

```text
Verifikasi Sertifikat
Menunggu
```

Timeline:

```text
18 Sep — Pengajuan dikirim
18 Sep — Menunggu pemeriksaan lembaga
```

Detail:

- file;
- lembaga;
- skill;
- tanggal;
- status;
- alasan bila ditolak.

Jika masih belum diproses:

```text
[ Batalkan Pengajuan ]
```

Proposal memperbolehkan pembatalan jika belum diproses.

Confirmation:

```text
Batalkan pengajuan verifikasi ini?
```

Jika ditolak:

```text
Ditolak
Alasan: ...
```

CTA:

```text
[ Unggah Ulang / Ajukan ke Lembaga yang Benar ]
```

Jangan menghapus riwayat keputusan lama.

---

# 13. LAMARAN

## P-29 — Daftar Lamaran

Penting:

> Skill Matching tidak mengirim lamaran ke perusahaan.

Header:

```text
Catatan Lamaran
Pantau lamaran yang Anda lakukan di luar Skill Matching.
```

Filters:

- status;
- search lowongan.

Card:

```text
Staf Gudang — PT Contoh
Dilamar 20 Sep 2026

Wawancara
[ Lihat ]
```

Empty:

```text
Belum ada catatan lamaran.
Setelah melamar melalui sumber lowongan, catat perkembangannya di sini.
[ Tambah Catatan Lamaran ]
```

---

## P-30 — Tambah/Edit Catatan Lamaran

Proposal tidak menetapkan vocabulary status lamaran secara rinci.

Mockup boleh menggunakan contoh status umum sebagai **REKOMENDASI DESAIN**, misalnya:

- Disimpan
- Sudah Dilamar
- Diproses
- Wawancara
- Diterima
- Tidak Lanjut

Tetapi beri annotation bahwa daftar final perlu dikunci saat implementasi.

Form:

- pilih lowongan;
- tanggal;
- status;
- catatan.

Jangan membuat upload CV wajib karena tidak disebut proposal.

---

## P-31 — Detail Lamaran

Tampilkan timeline:

```text
20 Sep — Sudah Dilamar
24 Sep — Diproses
28 Sep — Wawancara
```

Action:

```text
[ Perbarui Status ]
[ Buka Sumber Lowongan ]
```

---

# 14. FEEDBACK

## P-32 — Feedback Rekomendasi

Dapat dibuka dari hasil rekomendasi.

UI sederhana:

```text
Apakah rekomendasi ini relevan untuk Anda?

1  2  3  4   atau mekanisme rating yang diputuskan
```

PENTING:

Proposal hanya menyatakan Pelamar dapat menilai relevansi; skala spesifik untuk feedback Pelamar tidak ditetapkan. Skala 1–4 secara eksplisit disebut untuk penilai ahli, bukan Pelamar.

Maka untuk mockup:

- boleh memakai binary `Relevan / Tidak Relevan`; atau
- rating generik;

namun beri annotation `PERLU KEPUTUSAN`.

Tambahkan komentar opsional bila diperlukan.

Helper:

> Umpan balik membantu evaluasi kualitas dan tidak otomatis mengubah bobot sistem.

---

# 15. PENGATURAN

## P-33 — Pengaturan Akun

Minimal:

- informasi akun;
- email;
- password;
- logout.

Jangan menambahkan fitur hapus akun, 2FA, koneksi sosial, atau preferensi notifikasi sebagai requirement final jika belum dibahas.

Boleh divisualisasikan sebagai slot desain tambahan dengan label **future / not in current scope**, tetapi lebih baik tidak dibuat pada mockup utama.

---

# 16. Global States Pelamar

Figma harus memiliki contoh komponen/state:

### Loading

```text
Menghitung rekomendasi...
```

gunakan skeleton.

### Empty

Berikan CTA yang memperbaiki penyebab.

### Validation Error

Tandai field + pesan dekat field.

### Save Success

Toast:

```text
Perubahan berhasil disimpan.
```

### Network/Server Error

```text
Data belum berhasil dimuat.
[ Coba Lagi ]
```

### Unauthorized

Jangan tampilkan halaman role lain. Arahkan ke halaman yang sesuai.

---

# 17. Prototype Connections Minimum

Hubungkan prototipe setidaknya:

```text
P-01 → P-13
P-02 → P-03 → P-06
P-06 → P-07 → P-08 → P-10 → P-11 → P-12 → P-14
P-13 → P-14
P-14 → P-15 → P-16
P-15 → P-17
P-17 → P-19
P-19 → P-20 → P-22 → P-23
P-19 → P-21
P-20 → External Training Modal
P-24 → P-25
P-26 → P-27 → P-28
P-14/P-15 → External Job Modal → P-30 (setelah user kembali secara konseptual)
P-29 → P-30 → P-31
P-14/P-15/P-18 → P-32
P-14 → P-18
```

---

# 18. Data Dummy yang Konsisten untuk Mockup

Gunakan contoh berikut agar semua screen saling berkaitan.

## Pelamar

```text
Nama: Raka Pratama
Status: Tidak bekerja karena PHK
Riwayat: Operator Produksi, 3 tahun
```

## Skill

```text
Pencatatan Stok       Mahir      Dilaporkan sendiri
Spreadsheet           Dasar      Dilaporkan sendiri
K3                     Menengah   Terverifikasi
Forklift               Belum ada
```

## Lowongan

```text
Staf Gudang
Pencatatan Stok     Menengah  Wajib
Forklift             Menengah  Wajib
Spreadsheet          Menengah  Wajib
K3                    Dasar     Diutamakan
```

Gunakan contoh proposal:

```text
Skor awal: 55
Setelah simulasi Forklift Dasar: 85
Setelah Spreadsheet juga terpenuhi: 100
```

Jangan menjadikan angka simulasi sebagai skor profil aktual sebelum flow penyelesaian yang sah terjadi.

---

# 19. Prompt Figma Make — Pelamar

```text
Create the complete Pelamar experience for the responsive web application "Skill Matching".

Follow the MASTER MOCKUP SPEC and this Pelamar document exactly.

Language: Indonesian.
Primary UX target: mobile-first, but fully responsive to tablet and desktop.

Build all screens P-01 through P-33 that are applicable to the active scope.

Do not create admin controls.
Do not create certification-body controls.
Do not create company accounts or a direct job application submission flow.

The core journey must be clickable:
registration → email verification → profile onboarding → work/education/organization history → skill suggestions → skill level confirmation → job recommendations → job detail → score explanation → skill gap analysis → training recommendations → learning path → score simulation → training completion state → certificate upload → verification status → job application tracking → feedback.

Important:
- Direct job applications happen outside Skill Matching.
- Training enrollment and learning happen outside Skill Matching.
- Certificate authenticity is checked outside the system by the certification body.
- Unverified skills are still used in matching.
- Verification status never changes the score formula.
- Historical recommendations must remain traceable by date and configuration version.
- Simulation must never change the real profile.
- Show loading, empty, validation error, success, and permission states.
- Use clear mobile-friendly cards rather than large desktop tables on Pelamar screens.
```

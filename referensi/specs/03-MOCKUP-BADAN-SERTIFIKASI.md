# MOCKUP FIGMA MAKE — ROLE BADAN SERTIFIKASI

> **Role:** Badan Sertifikasi  
> **Aplikasi:** Skill Matching  
> **Prioritas layout:** Dashboard tugas yang ringkas, desktop nyaman, tetap responsive.  
> **Dokumen acuan:** `00-MASTER-MOCKUP-SPEC.md`

---

# 1. Tujuan Mockup

Portal Badan Sertifikasi harus fokus pada dua pekerjaan utama yang ada di proposal:

1. **mengonfirmasi kelulusan/penyelesaian peserta** pada pelatihan yang menjadi kewenangannya;
2. **memproses verifikasi sertifikat** yang ditujukan kepada lembaganya.

Portal ini **bukan** dashboard HR dan **bukan** sistem untuk mengelola katalog pelatihan.

---

# 2. Batas Hak Akses

Badan Sertifikasi boleh:

- mendaftar sebagai lembaga;
- menunggu verifikasi Admin;
- login setelah aktif;
- melihat daftar pelatihan yang menjadi kewenangannya untuk keperluan peserta;
- melihat peserta yang terkait dengan pelatihan tersebut;
- mengonfirmasi kelulusan/penyelesaian;
- melihat permintaan verifikasi sertifikat yang ditujukan kepada lembaganya;
- melihat file sertifikat dan data minimum terkait;
- menetapkan hasil verifikasi;
- menulis alasan bila ditolak;
- melihat riwayat keputusan lembaganya.

Tidak boleh:

- menambah pelatihan;
- mengedit pelatihan;
- mengubah bobot;
- melihat semua lowongan;
- melihat profil skill Pelamar secara penuh;
- melihat rekomendasi lowongan Pelamar;
- melihat skor Pelamar;
- melihat riwayat lamaran;
- melihat lembaga lain;
- memproses permintaan yang bukan kewenangannya.

---

# 3. Navigasi

```text
Dashboard
Peserta Pelatihan
Verifikasi Sertifikat
Riwayat

----------------
Akun & Lembaga
Keluar
```

Jika akun belum diverifikasi:

```text
Jangan tampilkan dashboard tugas.
Tampilkan halaman Menunggu Verifikasi.
```

---

# 4. Screen Map

## AUTH & REGISTRATION

```text
B-01 Login
B-02 Registrasi Lembaga
B-03 Verifikasi Email
B-04 Menunggu Verifikasi Admin
```

## DASHBOARD

```text
B-05 Dashboard
```

## TRAINING PARTICIPANTS

```text
B-06 Daftar Pelatihan yang Menjadi Kewenangan
B-07 Daftar Peserta Pelatihan
B-08 Detail Peserta untuk Konfirmasi Kelulusan
B-09 Konfirmasi Kelulusan
```

## CERTIFICATE VERIFICATION

```text
B-10 Daftar Permintaan Verifikasi
B-11 Detail Permintaan
B-12 Keputusan Verifikasi
```

## HISTORY & ACCOUNT

```text
B-13 Riwayat Proses
B-14 Akun & Informasi Lembaga
```

---

# 5. AUTH & REGISTRATION

## B-01 — Login

Form:

- email;
- password;
- login;
- forgot password bila shared auth mendukung.

State:

### Belum diverifikasi Admin

Jika kredensial valid tetapi status lembaga masih menunggu:

```text
Akun lembaga Anda belum aktif.
Verifikasi Admin masih diproses.
[ Lihat Status ]
```

→ B-04

### Nonaktif

```text
Akun lembaga tidak dapat digunakan.
```

### Aktif

→ B-05

---

## B-02 — Registrasi Lembaga

Proposal menyatakan Badan Sertifikasi mendaftarkan diri lalu diverifikasi Admin.

Form harus mengumpulkan data yang wajar untuk identifikasi lembaga dan kontak resmi.

Proposal tidak menentukan seluruh field final. Jangan mengarang terlalu banyak data legal sebagai requirement.

Struktur UI:

```text
Informasi Lembaga
- Nama lembaga
- Informasi kontak resmi
- Email akun

Informasi Verifikasi
- dokumen/keterangan yang diperlukan sesuai proses verifikasi
```

Tombol:

```text
[ Daftar ]
```

Setelah berhasil:

```text
→ B-03 Verifikasi Email
→ B-04 Menunggu Verifikasi Admin
```

---

## B-03 — Verifikasi Email

Shared pattern dengan Pelamar.

Setelah email verified, lembaga **belum otomatis aktif**.

Tampilkan:

```text
Email berhasil diverifikasi.
Selanjutnya, Admin Platform akan memverifikasi identitas lembaga Anda.
```

→ B-04

---

## B-04 — Menunggu Verifikasi Admin

Halaman sederhana tanpa sidebar tugas.

```text
Verifikasi Lembaga Sedang Diproses

Akun Anda belum dapat memproses peserta atau sertifikat
sebelum diverifikasi oleh Admin Platform.

Status: Menunggu Verifikasi
```

Optional action:

```text
[ Keluar ]
```

Jangan memberi akses ke antrean sertifikat sebelum aktif.

---

# 6. B-05 — DASHBOARD

Setelah aktif.

Header:

```text
Selamat datang
Lembaga Sertifikasi Logistik Nusantara
Terverifikasi
```

Cards:

```text
Peserta Perlu Konfirmasi
Permintaan Sertifikat Menunggu
Selesai Diproses
Ditolak / Perlu Tindak Lanjut
```

### Tugas Terbaru

```text
Peserta:
Raka P. — Forklift Dasar
Menunggu Konfirmasi Kelulusan
[ Proses ]

Sertifikat:
Raka P. — Sertifikat Forklift Dasar
Menunggu Verifikasi
[ Periksa ]
```

Jangan tampilkan skor rekomendasi kerja.

---

# 7. PESERTA PELATIHAN

## B-06 — Daftar Pelatihan yang Menjadi Kewenangan

Table/card:

```text
Nama Pelatihan
Jumlah Peserta
Menunggu Konfirmasi
Selesai
```

Contoh:

```text
Forklift Dasar
12 peserta
3 menunggu
[ Lihat Peserta ]
```

Badan Sertifikasi tidak memiliki tombol:

```text
Tambah Pelatihan
Edit Pelatihan
Hapus Pelatihan
```

Data pelatihan bersifat read-only.

---

## B-07 — Daftar Peserta Pelatihan

Header:

```text
Forklift Dasar
Peserta
```

Table:

```text
Peserta
Status
Tanggal Pencatatan
Aksi
```

Data peserta harus minimum untuk proses.

Contoh:

```text
Raka Pratama
Menunggu Konfirmasi
[ Tinjau ]
```

Jangan membuat kolom:

- skor lowongan;
- status PHK;
- seluruh skill;
- riwayat lamaran.

---

## B-08 — Detail Peserta untuk Konfirmasi

Tampilkan hanya konteks yang relevan:

```text
Peserta: Raka Pratama
Pelatihan: Forklift Dasar
Status: Menunggu Konfirmasi
```

Info pelatihan:

```text
Skill: Pengoperasian Forklift
Tingkat capaian: Menengah
```

Action:

```text
[ Konfirmasi Kelulusan ]
```

Jika peserta tidak terkait dengan pelatihan lembaga:

Server harus menolak akses.

Mockup unauthorized:

```text
Anda tidak memiliki akses ke data ini.
[ Kembali ]
```

---

## B-09 — Konfirmasi Kelulusan

Dialog / dedicated confirmation.

```text
Konfirmasi Kelulusan Peserta

Peserta: Raka Pratama
Pelatihan: Forklift Dasar

Pastikan data telah diperiksa sesuai proses lembaga.

[ Batal ]
[ Konfirmasi ]
```

Setelah sukses:

```text
Kelulusan berhasil dikonfirmasi.
```

PENTING:

UI jangan mengatakan lembaga mengubah seluruh profil skill Pelamar. Lembaga hanya mencatat hasil kelulusan pada proses yang menjadi kewenangannya.

### PERLU KEPUTUSAN

Hubungan persis antara konfirmasi kelulusan dan update permanen skill memiliki penjelasan draft yang belum sepenuhnya seragam. Mockup cukup menampilkan keberhasilan konfirmasi tanpa membuat klaim tambahan yang belum dikunci.

---

# 8. VERIFIKASI SERTIFIKAT

## B-10 — Daftar Permintaan Verifikasi

Tabs:

- Menunggu
- Terverifikasi
- Ditolak
- Semua

Jika UI menggunakan `Perlu Tindak Lanjut`, beri annotation bahwa status ini mewakili alur alternatif “informasi tidak memadai”, bukan istilah final yang sudah ditetapkan.

Table:

```text
Pemohon
Sertifikat
Pelatihan
Tanggal Diajukan
Status
Aksi
```

Contoh:

```text
Raka Pratama
Sertifikat Forklift Dasar
Forklift Dasar
18 Sep 2026
Menunggu
[ Tinjau ]
```

Hanya pengajuan untuk lembaga ini.

---

## B-11 — Detail Permintaan

### Header

```text
Verifikasi Sertifikat
Menunggu
```

### Informasi yang boleh dilihat

Sesuai proposal:

- nama Pelamar;
- sertifikat/file;
- lembaga tujuan = lembaga sendiri;
- skill yang diklaim;
- konteks pelatihan yang relevan;
- tingkat yang tidak boleh melebihi capaian pelatihan.

Jangan tampilkan:

- seluruh profil skill Pelamar;
- lowongan rekomendasi;
- skor;
- lamaran.

### File Viewer

Area preview/download file untuk pemeriksaan.

Helper:

> Pemeriksaan keaslian sertifikat dilakukan melalui proses lembaga di luar Skill Matching. Sistem hanya mencatat hasilnya.

### Skill yang diverifikasi

Contoh:

```text
Pengoperasian Forklift
Klaim: Menengah
Batas capaian pelatihan: Menengah
```

Jika klaim melebihi capaian:

Sistem seharusnya mencegah pengajuan sejak sisi Pelamar; jika data abnormal tetap muncul, tampilkan error/flag dan jangan izinkan verifikasi melebihi batas.

CTA:

```text
[ Verifikasi ]
[ Tolak ]
```

Jika informasi tidak memadai:

```text
[ Tandai Perlu Tindak Lanjut ]
```

hanya bila status tersebut dipilih dalam implementasi.

---

## B-12 — Keputusan Verifikasi

### Verifikasi

Dialog:

```text
Tetapkan sertifikat sebagai terverifikasi?

[ Batal ]
[ Ya, Verifikasi ]
```

Setelah sukses:

```text
Sertifikat berhasil diverifikasi.
```

### Tolak

Form:

```text
Alasan Penolakan *
```

CTA:

```text
[ Tolak Pengajuan ]
```

Alasan wajib karena Pelamar harus dapat melihat alasan singkat.

Setelah diproses:

- keputusan masuk riwayat;
- Pelamar dapat melihat hasil;
- Badan Sertifikasi tidak dapat mengedit skill lain di luar sertifikat.

---

# 9. RIWAYAT

## B-13 — Riwayat Proses

Gabungkan atau beri tabs:

```text
Kelulusan Peserta
Verifikasi Sertifikat
```

Columns:

```text
Tanggal
Jenis
Nama
Objek
Keputusan
```

Contoh:

```text
20 Sep
Verifikasi Sertifikat
Raka Pratama
Forklift Dasar
Terverifikasi
```

Read-only.

Tidak boleh menjadi cara untuk membuka profil Pelamar penuh.

---

# 10. AKUN & LEMBAGA

## B-14 — Akun & Informasi Lembaga

Tampilkan:

```text
Nama Lembaga
Email
Status Verifikasi
Informasi kontak
```

Badge:

```text
Terverifikasi
```

### PERLU KEPUTUSAN

Proposal tidak merinci data lembaga mana yang boleh diedit sendiri setelah verifikasi.

Untuk mockup:

- informasi utama boleh tampil read-only;
- field kontak dapat diberi tombol edit hanya sebagai opsi desain yang perlu dikonfirmasi.

Jangan memberi lembaga akses untuk:

- mengubah status verifikasi;
- menambah pelatihan;
- mengubah relasi pelatihan;
- mengakses konfigurasi sistem.

---

# 11. Security / Unauthorized States

Buat state nyata di prototype.

## URL peserta bukan milik lembaga

```text
Akses Ditolak
Data peserta ini tidak berada dalam kewenangan lembaga Anda.
[ Kembali ke Peserta ]
```

## Sertifikat bukan tujuan lembaga

```text
Akses Ditolak
Permintaan verifikasi ini tidak ditujukan kepada lembaga Anda.
[ Kembali ]
```

## Akun dinonaktifkan Admin saat sesi aktif

Pada request berikutnya:

```text
Sesi Anda sudah tidak aktif.
Silakan hubungi pengelola platform jika diperlukan.
[ Kembali ke Login ]
```

---

# 12. Empty States

## Tidak ada peserta

```text
Belum ada peserta yang perlu dikonfirmasi.
```

## Tidak ada verifikasi

```text
Tidak ada permintaan verifikasi yang menunggu.
```

## Riwayat kosong

```text
Belum ada proses yang selesai.
```

Jangan menambahkan CTA untuk membuat pelatihan.

---

# 13. Loading & Error States

Loading:

- dashboard skeleton;
- table skeleton;
- file preview loading.

Error:

```text
Data belum berhasil dimuat.
[ Coba Lagi ]
```

Verification save failure:

```text
Keputusan belum berhasil disimpan.
Tidak ada perubahan status yang diterapkan.
[ Coba Lagi ]
```

Pastikan UI tidak menampilkan success sebelum server berhasil.

---

# 14. Prototype Connections Minimum

```text
B-01 → B-05        jika aktif
B-01 → B-04        jika menunggu verifikasi

B-02 → B-03 → B-04

B-05 → B-06 → B-07 → B-08 → B-09

B-05 → B-10 → B-11 → B-12

B-05 → B-13
B-05 → B-14
```

---

# 15. Cross-Role Handoff

## Akun

```text
Badan Sertifikasi daftar
→ Admin menerima akun menunggu verifikasi
→ Admin verifikasi
→ Badan Sertifikasi dapat login penuh
```

## Sertifikat

```text
Pelamar mengajukan sertifikat ke lembaga
→ B-10 antrean menunggu
→ B-11 detail
→ B-12 keputusan
→ Pelamar melihat status
```

## Kelulusan

```text
Data peserta/pelatihan tersedia
→ B-07 daftar peserta
→ B-09 konfirmasi
→ sistem menyimpan hasil
→ dampak profil mengikuti aturan final produk
```

---

# 16. Data Dummy Konsisten

```text
Lembaga:
Lembaga Sertifikasi Logistik Nusantara
Status: Terverifikasi

Pelatihan:
Forklift Dasar
Capaian: Menengah

Peserta:
Raka Pratama

Pengajuan:
Sertifikat Forklift Dasar
Skill: Pengoperasian Forklift
Klaim: Menengah
Status awal: Menunggu
```

Gunakan data yang sama dengan dokumen Pelamar dan Admin agar prototype tampak sebagai satu sistem.

---

# 17. Prompt Figma Make — Badan Sertifikasi

```text
Create the complete Badan Sertifikasi portal for the responsive web application "Skill Matching".

Follow the MASTER MOCKUP SPEC and this Badan Sertifikasi document exactly.

Language: Indonesian.
Primary UX: concise task dashboard, efficient on desktop, responsive on mobile.

Build screens B-01 through B-14.

There are two core workflows:
1. confirm participant completion/graduation for trainings under this certification body's authority;
2. process certificate verification requests addressed to this certification body.

Strict privacy and permission boundaries:
- Do not show a Pelamar's full skill profile.
- Do not show job recommendation scores.
- Do not show job application history.
- Do not show other certification bodies' data.
- Do not allow this role to create or edit trainings.
- Do not allow processing requests outside this body's authority.

Account lifecycle:
registration → email verification → waiting for Admin verification → active → task dashboard.

Certificate verification:
view minimum required data → inspect certificate → external authenticity check → record Verified or Rejected decision → rejection requires a reason → Pelamar can later see the result.

Create unauthorized states, empty states, loading states, file preview states, confirmations, and success/error feedback.
```

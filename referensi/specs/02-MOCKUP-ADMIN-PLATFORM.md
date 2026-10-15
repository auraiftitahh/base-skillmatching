# MOCKUP FIGMA MAKE — ROLE ADMIN PLATFORM

> **Role:** Admin Platform  
> **Aplikasi:** Skill Matching  
> **Prioritas layout:** Desktop-first untuk pengelolaan data, tetap responsive.  
> **Dokumen acuan:** `00-MASTER-MOCKUP-SPEC.md`

---

# 1. Tujuan Mockup

Buat portal Admin yang mendukung:

```text
Kelola Taksonomi
→ Kelola Lowongan
→ Kelola Pelatihan
→ Kelola Konfigurasi Bobot
→ Evaluasi Kualitas
→ Ekspor Laporan
→ Kelola Akun Platform
→ Verifikasi Akun Badan Sertifikasi
→ Tinjau Riwayat Perubahan
```

Admin adalah pengelola platform, bukan HR perusahaan.

---

# 2. Batas Hak Akses

Admin boleh:

- CRUD/menonaktifkan skill;
- CRUD/menonaktifkan jabatan;
- mengatur pemetaan jabatan-skill;
- mengatur skill terkait;
- menambah/edit/import lowongan;
- publish/close/deactivate lowongan;
- menambah/edit/import pelatihan;
- mengelola bobot dan parameter pencocokan;
- mengelola data evaluasi;
- mengekspor laporan evaluasi;
- mengaktifkan/menonaktifkan akun;
- memverifikasi akun Badan Sertifikasi;
- melihat audit/riwayat perubahan yang menjadi kewenangannya.

Admin tidak memiliki UI default untuk:

- membuka profil skill individual Pelamar;
- membaca riwayat lamaran individual Pelamar;
- melihat data privat lengkap Pelamar sebagai fungsi sehari-hari.

Jangan membuat fitur tersebut.

---

# 3. Navigasi

```text
Dashboard

Data Master
  Taksonomi Skill
  Taksonomi Jabatan

Konten
  Lowongan
  Pelatihan

Konfigurasi
  Aturan Bobot

Evaluasi
  Kualitas Rekomendasi
  Laporan

Platform
  Akun
  Riwayat Aktivitas

Keluar
```

---

# 4. Screen Map

## ACCESS

```text
A-01 Login Admin
```

Tidak ada registrasi Admin publik karena mekanismenya tidak dijelaskan proposal.

## DASHBOARD

```text
A-02 Dashboard Admin
```

## TAKSONOMI

```text
A-03 Daftar Skill
A-04 Tambah/Edit Skill
A-05 Detail Skill & Skill Terkait
A-06 Daftar Jabatan
A-07 Tambah/Edit Jabatan
A-08 Pemetaan Jabatan → Skill
```

## LOWONGAN

```text
A-09 Daftar Lowongan
A-10 Tambah/Edit Lowongan
A-11 Atur Required Skills
A-12 Detail Lowongan & Riwayat
A-13 Import CSV Lowongan
A-14 Hasil Import / Error Review
```

## PELATIHAN

```text
A-15 Daftar Pelatihan
A-16 Tambah/Edit Pelatihan
A-17 Atur Skill yang Diajarkan
A-18 Atur Prasyarat Pelatihan
A-19 Detail Pelatihan & Riwayat
A-20 Import CSV Pelatihan
A-21 Hasil Import / Error Review
```

## CONFIG

```text
A-22 Konfigurasi Bobot Aktif
A-23 Buat Versi Konfigurasi Baru
A-24 Riwayat Versi Konfigurasi
A-25 Detail Versi
```

## EVALUATION

```text
A-26 Dashboard Evaluasi
A-27 Profil Uji
A-28 Pasangan Profil–Lowongan Uji
A-29 Data Penilaian Ahli
A-30 Feedback Pelamar
```

## REPORTING

```text
A-31 Laporan Evaluasi
A-32 Export Dialog / Export State
```

## ACCOUNTS & AUDIT

```text
A-33 Daftar Akun Platform
A-34 Detail Akun
A-35 Verifikasi Badan Sertifikasi
A-36 Nonaktifkan/Aktifkan Akun
A-37 Riwayat Aktivitas Admin
```

---

# 5. A-01 — Login Admin

Form:

- email;
- password;
- login.

Setelah login:

```text
→ A-02 Dashboard Admin
```

Jika akun nonaktif:

```text
Akun tidak dapat digunakan.
```

Jangan arahkan admin ke dashboard Pelamar.

---

# 6. A-02 — Dashboard Admin

### Tujuan

Memberi ringkasan kesehatan data platform, bukan data pribadi Pelamar.

Cards yang sesuai:

```text
Skill Aktif
Jabatan Aktif
Lowongan Aktif
Lowongan Draft
Lowongan Kedaluwarsa
Pelatihan Aktif
Akun Badan Sertifikasi Menunggu Verifikasi
Konfigurasi Bobot Aktif
```

Section:

### Perlu Tindakan

```text
3 Badan Sertifikasi menunggu verifikasi
5 lowongan akan kedaluwarsa
2 import memiliki baris gagal
```

### Aktivitas Terbaru

Gunakan aktivitas perubahan data platform.

Jangan menampilkan:

```text
"Raka memiliki 12 skill"
"Raka melamar PT X"
```

---

# 7. TAKSONOMI SKILL

## A-03 — Daftar Skill

Table columns:

```text
Nama Skill
Kategori
Alias
Skill Terkait
Status
Terakhir Diubah
Aksi
```

Controls:

- search;
- category filter;
- active/inactive filter;
- `+ Tambah Skill`.

Bulk action hanya jika nanti memang diputuskan; jangan wajib.

State:

- empty;
- no search results;
- duplicate warning;
- loading.

---

## A-04 — Tambah/Edit Skill

Data yang didukung proposal:

- nama baku/kanonis;
- alias;
- kategori;
- skill terkait.

Form:

```text
Nama Skill *
Kategori *
Alias
Skill Terkait
Status
```

Validation:

- nama wajib;
- potensi duplikasi;
- relasi tidak valid.

Jika duplikasi:

```text
Skill dengan nama/alias serupa ditemukan.
[ Lihat Skill ]
```

Jangan langsung membuat duplikat.

---

## A-05 — Detail Skill & Skill Terkait

Tampilkan:

```text
Pencatatan Stok
Kategori: Logistik
Alias: Inventory Recording, Stock Recording
Status: Aktif
```

Skill terkait:

```text
Manajemen Inventori
Faktor kedekatan mengikuti konfigurasi aktif
```

Catatan:

Faktor kedekatan adalah parameter konfigurasi umum menurut proposal; jangan membuat bobot berbeda per relasi jika tidak didukung.

Activity:

- dibuat;
- diedit;
- dinonaktifkan.

---

# 8. TAKSONOMI JABATAN

## A-06 — Daftar Jabatan

Columns:

- Nama Jabatan
- Jumlah Skill Mapping
- Status
- Updated
- Action

---

## A-07 — Tambah/Edit Jabatan

Minimal:

- nama jabatan;
- status;
- informasi taksonomi yang memang diperlukan.

Jangan mengarang kode klasifikasi eksternal wajib.

---

## A-08 — Pemetaan Jabatan → Skill

Layout split atau table.

Contoh:

```text
Jabatan: Operator Produksi

Skill yang disarankan:
☑ Keselamatan dan Kesehatan Kerja
☑ Pengoperasian Mesin
☑ Pencatatan Produksi
☑ Pencatatan Stok
```

Helper:

> Mapping ini digunakan untuk menyarankan skill ketika Pelamar mengisi riwayat.

Action:

```text
[ Simpan Pemetaan ]
```

---

# 9. LOWONGAN

## A-09 — Daftar Lowongan

Tabs:

- Semua
- Draft
- Aktif
- Ditutup
- Kedaluwarsa

Table:

```text
Posisi
Sumber
Tanggal Pengambilan
Tanggal Tutup
Required Skills
Status
Updated
Aksi
```

Controls:

- search;
- filter status;
- filter sumber;
- `+ Tambah Lowongan`;
- `Import CSV`.

---

## A-10 — Tambah/Edit Lowongan

Data proposal:

- informasi lowongan;
- sumber;
- tautan;
- tanggal pengambilan;
- tanggal penutupan;
- jika tanggal tutup tidak diketahui, default expiry 30 hari sejak pengambilan;
- persyaratan skill dikelola pada langkah terkait.

Gunakan wizard atau multi-section:

```text
1. Informasi Lowongan
2. Sumber & Masa Berlaku
3. Persyaratan Skill
4. Review & Publish
```

### Status

Action:

```text
[ Simpan Draft ]
[ Review ]
```

Publish dilakukan hanya jika valid.

---

## A-11 — Atur Required Skills

Table editor:

| Skill | Minimal Level | Kepentingan | Bobot |
|---|---|---|---|
| Forklift | Menengah | Wajib | 3 |
| K3 | Dasar | Diutamakan | 1 |

Level:

- Dasar
- Menengah
- Mahir
- Ahli

Kepentingan:

- Wajib
- Diutamakan

Bobot:

- default 3 / 1;
- bisa diubah 1–5.

Proposal menyatakan perubahan bobot yang diizinkan memiliki alasan tersimpan. Untuk bobot per lowongan, sediakan:

```text
Mengubah bobot default?
Alasan perubahan *
```

jika admin melakukan override.

### Publish Blocker

Jika tidak ada skill persyaratan:

```text
Lowongan belum dapat diterbitkan.
Tambahkan minimal satu keterampilan yang disyaratkan.
```

---

## A-12 — Detail Lowongan & Riwayat

Header:

```text
Staf Gudang
Aktif
```

Section:

- info;
- source;
- expiry;
- required skills;
- status;
- audit timeline.

Actions:

```text
[ Edit ]
[ Tutup Lowongan ]
[ Nonaktifkan ]
```

Untuk nonaktifkan karena sumber/data keliru:

Dialog:

```text
Alasan penonaktifan *
```

Riwayat tidak dihapus.

---

## A-13 — Import CSV Lowongan

Upload area.

Tampilkan requirement file:

```text
CSV
```

Proposal tidak menentukan template detail. Jangan mengarang struktur final sebagai requirement.

UI:

```text
[ Pilih CSV ]
[ Upload & Validasi ]
```

Tahap:

```text
Upload
→ Validasi
→ Preview
→ Import
```

---

## A-14 — Hasil Import / Error Review

Summary:

```text
60 baris dibaca
54 valid
4 perlu diperbaiki
2 duplikat
```

Error table:

```text
Baris
Kolom
Masalah
Nilai
```

Admin harus dapat mengetahui kesalahan agar diperbaiki.

---

# 10. PELATIHAN

## A-15 — Daftar Pelatihan

Tabs/filter:

- Semua
- Draft
- Aktif
- Nonaktif

Columns:

```text
Nama
Sumber/Penyedia
Skill Diajarkan
Biaya
Durasi
Mode
Status
Aksi
```

---

## A-16 — Tambah/Edit Pelatihan

Data proposal:

- nama/informasi pelatihan;
- skill yang diajarkan;
- tingkat capaian;
- biaya;
- durasi;
- mode;
- prasyarat;
- sumber;
- tautan;
- tanggal pengambilan.

Relasi Badan Sertifikasi dapat ditampilkan bila data pelatihan memang terhubung dengan lembaga di rancangan basis data.

Jangan memberi Badan Sertifikasi kemampuan mengedit halaman ini.

---

## A-17 — Atur Skill yang Diajarkan

Table:

| Skill | Tingkat Capaian |
|---|---|
| Forklift | Menengah |
| K3 Gudang | Menengah |

Validation:

tingkat capaian wajib untuk skill yang dipakai dalam simulasi.

---

## A-18 — Atur Prasyarat

Selector:

```text
Pelatihan ini memiliki prasyarat?
[ + Tambah Prasyarat ]
```

List:

```text
Dasar Logistik
```

Jangan memungkinkan pelatihan menjadi prasyarat untuk dirinya sendiri.

Circular dependency belum dijelaskan proposal; UI boleh menampilkan validation placeholder bila implementasi mendeteksinya, namun jangan jadikan requirement bisnis baru.

---

## A-19 — Detail Pelatihan & Riwayat

Tampilkan:

- semua informasi;
- skill;
- capaian;
- prasyarat;
- sumber;
- status;
- riwayat perubahan.

---

## A-20 / A-21 — Import CSV Pelatihan

Flow sama dengan lowongan:

```text
Upload
→ Validate
→ Preview
→ Import
→ Result
```

Error harus terlihat per baris.

---

# 11. ATURAN BOBOT

## A-22 — Konfigurasi Bobot Aktif

Tampilkan sangat jelas:

```text
Versi Aktif: V4
Aktif sejak: 18 Sep 2026
Diubah oleh: Admin ...
```

Parameter:

```text
Bobot skill wajib           3
Bobot skill diutamakan      1
Faktor skill terkait        0,5
Ambang skor tampil          40
```

Action:

```text
[ Buat Versi Baru ]
[ Lihat Riwayat ]
```

Jangan edit versi aktif secara langsung tanpa membuat versi baru.

---

## A-23 — Buat Versi Konfigurasi Baru

Form:

```text
Bobot Wajib            [ 3 ]   range 1–5
Bobot Diutamakan       [ 1 ]   range 1–5
Faktor Skill Terkait   [0.5]
Ambang Skor            [40]

Alasan Perubahan *
```

Validation:

- range tidak valid;
- alasan kosong.

Confirmation:

```text
Terbitkan konfigurasi baru?

Hasil rekomendasi lama tidak akan dihitung ulang.
Perhitungan berikutnya akan menggunakan versi baru.
```

CTA:

```text
[ Batal ]
[ Terbitkan Versi Baru ]
```

---

## A-24 — Riwayat Versi

Table:

```text
Versi
Tanggal Aktif
Parameter Ringkas
Alasan
Admin
Status
```

---

## A-25 — Detail Versi

Read-only.

Tampilkan perbedaan dengan versi sebelumnya bila memungkinkan sebagai **REKOMENDASI DESAIN**.

Penting:

jangan menyediakan `Edit versi lama`.

---

# 12. EVALUASI KUALITAS

## A-26 — Dashboard Evaluasi

Proposal mendukung:

- profil uji;
- pasangan profil-lowongan;
- hasil rekomendasi sistem;
- penilaian ahli;
- feedback Pelamar.

Card:

```text
Profil Uji
Pasangan Uji
Penilaian Ahli Tersedia
Feedback Pelamar
```

Section:

- completeness;
- latest evaluation run/data;
- comparison summary bila tersedia.

Jangan mengklaim AI accuracy.

---

## A-27 — Profil Uji

Data khusus pengujian.

Table:

```text
Kode Profil
Kelompok Uji
Jumlah Skill
Status Kelengkapan
```

Jangan mencampur dengan profil Pelamar produksi.

---

## A-28 — Pasangan Profil–Lowongan Uji

Table:

```text
Profil Uji
Lowongan Uji
Skor Sistem
Ranking Sistem
Penilaian Ahli
Status
```

---

## A-29 — Data Penilaian Ahli

### PERLU KEPUTUSAN

Proposal menetapkan ahli menilai pasangan profil-lowongan dengan skala 1–4, tetapi penilai ahli tidak mempunyai akun.

Mockup dapat menampilkan:

```text
Penilaian Ahli
Skala 1–4
```

Mekanisme input:

```text
[ Input / Import Penilaian ]
```

beri annotation:

```text
PERLU KEPUTUSAN:
mekanisme input manual vs import belum ditetapkan proposal.
```

Jangan membuat portal login `Penilai Ahli`.

---

## A-30 — Feedback Pelamar

Tampilkan agregat atau data feedback yang sesuai kebutuhan evaluasi.

Jangan membuat akses ke profil pribadi penuh.

Contoh:

```text
Lowongan
Versi Rekomendasi
Penilaian Relevansi
Komentar
Tanggal
```

Jika identitas tidak dibutuhkan, desain dapat menghindari menonjolkan nama Pelamar.

---

# 13. LAPORAN

## A-31 — Laporan Evaluasi

Controls:

- periode;
- data evaluasi;
- konfigurasi/versi bila relevan.

Preview ringkas:

```text
Jumlah pasangan diuji
Perbandingan ranking
Ketersediaan penilaian ahli
Feedback Pelamar
```

CTA:

```text
[ Ekspor Laporan ]
```

---

## A-32 — Export State

Jika tidak ada data:

```text
Tidak ada data untuk kriteria yang dipilih.
Laporan kosong tidak dibuat.
```

Jika tersedia:

```text
Laporan siap dibuat.
[ Unduh ]
```

Format file tidak ditetapkan proposal. Jangan menetapkan PDF/XLSX sebagai satu-satunya requirement final tanpa keputusan implementasi.

---

# 14. AKUN PLATFORM

## A-33 — Daftar Akun

Filter role:

- Pelamar
- Admin
- Badan Sertifikasi

Filter status:

- Aktif
- Nonaktif
- Menunggu Verifikasi (khusus yang relevan)

Columns:

```text
Nama
Role
Email
Status
Tanggal Daftar
Aksi
```

PENTING:

Detail akun Pelamar tidak boleh berubah menjadi halaman lengkap profil skill.

---

## A-34 — Detail Akun

Untuk Pelamar:

Tampilkan informasi akun administratif saja:

- identitas akun minimum;
- status;
- role;
- created;
- status aktif.

Jangan tampilkan:

- seluruh skill;
- skor;
- lamaran;
- rekomendasi pribadi.

Untuk Badan Sertifikasi:

Tampilkan data yang dibutuhkan proses verifikasi lembaga.

---

## A-35 — Verifikasi Badan Sertifikasi

Status:

```text
Menunggu Verifikasi
```

Tampilkan informasi/dokumen legalitas atau kontak resmi yang digunakan Admin untuk verifikasi, sesuai kebutuhan yang sudah disebut proposal.

Actions:

```text
[ Verifikasi & Aktifkan ]
[ Tolak / Tetap Nonaktif ]
```

Proposal tidak merinci workflow penolakan akun lembaga secara detail. Gunakan dialog alasan sebagai pola administratif yang konsisten, tetapi tandai vocabulary status final bila belum dikunci.

Confirmation:

```text
Aktifkan akun lembaga ini?
```

---

## A-36 — Aktifkan / Nonaktifkan Akun

Dialog wajib:

```text
Alasan *
```

Action:

```text
[ Nonaktifkan Akun ]
```

Setelah akun dinonaktifkan, sesi lama tidak boleh dapat terus digunakan.

UI confirmation:

```text
Akun akan kehilangan akses ke platform.
```

---

# 15. RIWAYAT AKTIVITAS

## A-37 — Riwayat Aktivitas Admin

Proposal mewajibkan catatan pelaku, waktu, dan jenis perubahan pada:

- konfigurasi bobot;
- taksonomi;
- lowongan;
- pelatihan.

Table/timeline:

```text
Waktu
Admin
Modul
Aksi
Objek
Ringkasan
```

Filter:

- admin;
- modul;
- action;
- date.

Read-only.

---

# 16. State Penting Admin

### Lowongan tanpa skill

Publish disabled.

### Draft

Tidak digunakan untuk matching.

### Expired

Tidak masuk rekomendasi Pelamar, tetapi data tetap ada.

### Duplicate

Berikan warning sebelum simpan/import.

### Weight invalid

Tolak save.

### Missing change reason

Tolak create version.

### Account pending certification

Masuk `Perlu Tindakan`.

### Export empty

Jangan menghasilkan report kosong yang menyesatkan.

---

# 17. Prototype Connections Minimum

```text
A-01 → A-02

A-02 → A-03
A-03 → A-04 → A-05
A-06 → A-07 → A-08

A-09 → A-10 → A-11 → A-12
A-09 → A-13 → A-14

A-15 → A-16 → A-17 → A-18 → A-19
A-15 → A-20 → A-21

A-22 → A-23 → A-24 → A-25

A-26 → A-27
A-26 → A-28 → A-29
A-26 → A-30
A-26 → A-31 → A-32

A-33 → A-34
A-33 → A-35
A-34 → A-36

A-02 → A-37
```

---

# 18. Data Dummy Konsisten

Gunakan:

### Config

```text
V4
Wajib = 3
Diutamakan = 1
Faktor skill terkait = 0,5
Ambang = 40
```

### Skill

```text
Pencatatan Stok
Pengoperasian Forklift
Spreadsheet
K3
```

### Lowongan

```text
Staf Gudang
Status: Aktif
```

### Pelatihan

```text
Forklift Dasar
Capaian: Menengah
```

### Badan Sertifikasi

```text
Lembaga Sertifikasi Logistik Nusantara
Status awal: Menunggu Verifikasi
```

---

# 19. Prompt Figma Make — Admin

```text
Create the complete Admin Platform portal for the web application "Skill Matching".

Follow the MASTER MOCKUP SPEC and this Admin document exactly.

Language: Indonesian.
Primary UX target: efficient desktop administration, responsive for smaller screens.

Build screens A-01 through A-37.

The admin manages platform data and configuration:
skill taxonomy, job taxonomy, job vacancies, trainings, weighting configuration, evaluation data, reports, accounts, certification-body verification, and audit history.

Strict privacy boundary:
Do NOT create a default feature that lets Admin browse a Pelamar's complete skill profile, recommendation score history, or job application history.

Important business rules:
- Draft job vacancies and trainings are not used in matching.
- A vacancy cannot be published without required skills.
- Weight configuration changes create a new version and require a reason.
- Historical recommendation results are not recalculated retroactively.
- Account deactivation requires a reason.
- Certification bodies must be verified before becoming active.
- Import flows must visibly report row-level validation errors.
- Evaluation supports expert ratings on a 1–4 scale, but expert assessors do not have accounts.
- The exact mechanism for entering expert ratings is unresolved and must be annotated, not invented as a separate expert portal.

Create reusable tables, forms, status badges, confirmation dialogs, empty states, import states, and audit timelines.
```

# MASTER MOCKUP SPEC — SKILL MATCHING

> **Tujuan dokumen**  
> Dokumen ini menjadi *source of truth* untuk pembuatan mockup di Figma Make. Tiga dokumen role (`Pelamar`, `Admin Platform`, dan `Badan Sertifikasi`) harus mengikuti aturan, istilah, batas akses, dan alur lintas-role di dokumen ini.
>
> **Basis rancangan**  
> Draft proposal **“Rancang Bangun Sistem Informasi Skill-Matching untuk Mendukung Reintegrasi Korban PHK ke Sektor Kerja Formal Berbasis Web”**.  
> Mockup harus mengikuti kebutuhan dan use case yang sudah ditulis pada proposal. Bagian yang belum ditentukan proposal diberi label **REKOMENDASI DESAIN** atau **PERLU KEPUTUSAN**, bukan dianggap sebagai requirement final.

---

## 1. Tujuan Produk

Skill Matching adalah sistem informasi berbasis web untuk membantu pencari kerja:

1. memetakan riwayat kerja/pendidikan/organisasi menjadi profil skill;
2. mencocokkan profil skill dengan lowongan;
3. melihat skor kecocokan yang dapat dijelaskan;
4. mengetahui kesenjangan skill;
5. memperoleh rekomendasi pelatihan dan jalur belajar;
6. melakukan simulasi perubahan skor tanpa mengubah profil permanen;
7. mencatat status lamaran yang dilakukan di luar aplikasi;
8. mengunggah sertifikat dan meminta verifikasi kepada Badan Sertifikasi;
9. memberi umpan balik terhadap rekomendasi.

Sistem memakai **aturan berbobot yang dapat dijelaskan**, bukan machine learning.

---

## 2. Role Resmi dan Batas Akses

Hanya ada tiga role aplikasi pada cakupan awal:

### 2.1 Pelamar

Pelamar adalah pencari kerja dari berbagai latar belakang, termasuk:

- pekerja terdampak PHK;
- lulusan baru;
- pekerja yang ingin berpindah karier;
- pencari kerja lain.

Hak akses:

- mengelola profil dan riwayat milik sendiri;
- mengelola skill milik sendiri;
- melihat rekomendasi lowongan dan skor;
- melihat analisis kesenjangan;
- melihat rekomendasi pelatihan dan jalur belajar;
- menjalankan simulasi;
- mencatat status lamaran milik sendiri;
- mengunggah sertifikat dan mengajukan verifikasi;
- melihat status verifikasi;
- memberi umpan balik.

Pelamar **tidak boleh** melihat profil pengguna lain.

### 2.2 Admin Platform

Hak akses:

- mengelola taksonomi skill dan jabatan;
- mengelola lowongan;
- mengelola pelatihan;
- mengelola konfigurasi bobot;
- mengelola evaluasi kualitas rekomendasi;
- mengekspor laporan evaluasi;
- mengaktifkan/menonaktifkan akun;
- memverifikasi akun Badan Sertifikasi;
- melihat riwayat aktivitas admin yang relevan.

Batas penting:

- Admin **tidak memiliki akses bawaan** untuk bebas melihat profil skill atau riwayat Pelamar secara individual.
- Jangan membuat menu seperti **“Profil Semua Pelamar”**, **“Lihat Seluruh Skill Pelamar”**, atau **“Riwayat Lamaran Pelamar”** sebagai fitur admin biasa.

### 2.3 Badan Sertifikasi

Hak akses:

- hanya bekerja pada pelatihan/peserta yang menjadi kewenangannya;
- mengonfirmasi kelulusan/penyelesaian peserta pada pelatihan miliknya;
- memproses pengajuan verifikasi sertifikat yang ditujukan kepada lembaganya;
- melihat data minimum yang diperlukan untuk proses tersebut.

Batas penting:

- tidak dapat menambah/mengubah data pelatihan;
- tidak dapat melihat profil skill Pelamar secara penuh;
- tidak dapat melihat riwayat lamaran;
- tidak dapat melihat skor rekomendasi Pelamar;
- tidak dapat mengakses data lembaga lain.

### 2.4 Role yang TIDAK ada

Jangan membuat akun/portal untuk:

- perusahaan;
- penyedia lowongan;
- penilai ahli.

Perusahaan tidak memiliki akun dalam cakupan awal. Pengiriman lamaran dilakukan di luar aplikasi.

---

## 3. Batas Cakupan yang Wajib Terlihat di Mockup

Mockup harus mencerminkan batas produk berikut:

- Proses **melamar pekerjaan** berlangsung di luar Skill Matching.
- Skill Matching hanya menyimpan **catatan status lamaran** yang diinput Pelamar.
- Proses **mengikuti pelatihan** berlangsung di luar aplikasi.
- Proses **memeriksa keaslian sertifikat** dilakukan Badan Sertifikasi di luar aplikasi.
- Sistem hanya mencatat hasil verifikasi.
- Verifikasi sertifikat bersifat opsional; skill yang belum diverifikasi tetap dapat dipakai dalam pencocokan.
- Status verifikasi **tidak mengubah angka skor**; status hanya menambah tingkat kepercayaan terhadap klaim skill.
- Lowongan atau pelatihan berstatus draft tidak digunakan dalam pencocokan.
- Hasil rekomendasi yang sudah disimpan harus tetap dapat ditelusuri berdasarkan waktu dan versi konfigurasi yang digunakan.
- Perubahan konfigurasi bobot tidak boleh mengubah hasil rekomendasi lama secara retroaktif.

---

## 4. Alur End-to-End Lintas Role

Gunakan flow berikut sebagai alur utama sistem.

```text
ADMIN
  ↓
Siapkan taksonomi skill & jabatan
  ↓
Siapkan data lowongan
  ↓
Siapkan data pelatihan
  ↓
Siapkan konfigurasi bobot aktif
  ↓
Verifikasi akun Badan Sertifikasi jika ada pengajuan
  ↓

PELAMAR
Registrasi → Verifikasi Email → Login
  ↓
Lengkapi profil
  ↓
Isi riwayat kerja / pendidikan / organisasi
  ↓
Sistem menyarankan skill berdasarkan riwayat/jabatan
  ↓
Pelamar mengonfirmasi skill dan level
  ↓
Buka rekomendasi lowongan
  ↓
Sistem menghitung skor dan mengurutkan lowongan
  ↓
Buka detail skor
  ↓
Lihat kesenjangan skill
  ↓
Lihat rekomendasi pelatihan & jalur belajar
  ↓
Jalankan simulasi skor
  ↓
Pelatihan dijalankan di luar aplikasi
  ↓
Pelamar mencatat penyelesaian sesuai aturan yang berlaku
  ↓
Opsional: unggah sertifikat
  ↓
Jika lembaga terdaftar → pengajuan dikirim ke Badan Sertifikasi
  ↓

BADAN SERTIFIKASI
Login
  ↓
Konfirmasi kelulusan peserta pada pelatihan yang menjadi kewenangannya
dan/atau
proses verifikasi sertifikat yang ditujukan kepada lembaganya
  ↓
Terverifikasi / Ditolak / status tindak lanjut yang sesuai
  ↓

PELAMAR
Melihat status terbaru
  ↓
Menjalankan rekomendasi ulang bila diinginkan
  ↓
Melamar pada situs/sumber eksternal
  ↓
Mencatat status lamaran di Skill Matching
  ↓
Memberikan feedback relevansi rekomendasi
  ↓

ADMIN
Meninjau evaluasi kualitas
  ↓
Jika konfigurasi diubah → wajib alasan + versi konfigurasi baru
```

---

## 5. Status dan Terminologi yang Konsisten

### 5.1 Status Skill

Gunakan dua status utama sesuai proposal:

- **Dilaporkan sendiri**
- **Terverifikasi**

Jika proses verifikasi sertifikat ditolak, tampilkan status pengajuan **Ditolak** dan alasan. Skill tidak boleh dianggap hilang; status kepercayaannya kembali pada kondisi tidak terverifikasi/dilaporkan sendiri.

### 5.2 Level Skill

Gunakan tepat empat level:

1. Dasar
2. Menengah
3. Mahir
4. Ahli

Rubrik level harus ditampilkan dengan bahasa sederhana.

### 5.3 Kepentingan Skill Lowongan

- Wajib
- Diutamakan

Bobot default proposal:

- Wajib = 3
- Diutamakan = 1

Admin dapat mengubah bobot dalam rentang 1–5 dengan alasan.

### 5.4 Skor

- skor disimpan dengan dua angka desimal;
- skor yang ditampilkan ke Pelamar berupa bilangan bulat;
- ambang tampilan default = 40;
- hasil di bawah ambang tidak masuk peringkat utama tetapi dapat diakses melalui **Tampilkan semua**.

### 5.5 Status Lowongan

Minimal mendukung:

- Draft
- Diterbitkan/Aktif
- Ditutup
- Kedaluwarsa
- Dinonaktifkan bila sumber/data bermasalah

### 5.6 Status Verifikasi Sertifikat

Mockup minimal memerlukan state:

- Menunggu
- Terverifikasi
- Ditolak

Use case juga menyebut kondisi informasi tidak memadai dapat membutuhkan tindak lanjut. Jika dibuat UI tambahan **Perlu Tindak Lanjut**, beri tanda bahwa ini adalah representasi UI dari alur alternatif, bukan istilah status final yang sudah dikunci proposal.

---

## 6. Aturan Perhitungan yang Perlu Tercermin di UI

Mockup tidak perlu menghitung rumus sungguhan, tetapi penyajian skor harus dapat menjelaskan asal skor.

### 6.1 Skor kecocokan

Rumus proposal:

```text
Skor = 100 × Σ(w × c) ÷ Σw

c = min(1, level Pelamar ÷ level yang disyaratkan)
```

Jika Pelamar tidak memiliki skill tetapi mempunyai skill terkait yang ditetapkan Admin, kecocokan dapat menggunakan faktor kedekatan. Faktor default = 0,5.

### 6.2 Gap

Gap skill:

```text
gap = level disyaratkan - level Pelamar
```

Nilai minimum gap adalah 0.

Prioritas gap mempertimbangkan bobot skill.

### 6.3 Rekomendasi Pelatihan

Pelatihan disaring berdasarkan:

- anggaran maksimal;
- waktu belajar per pekan;
- mode belajar;
- prasyarat.

Urutan mempertimbangkan:

1. cakupan gap terbesar;
2. biaya lebih rendah bila cakupan sama;
3. durasi lebih rendah bila tetap sama.

### 6.4 Jalur Belajar

- otomatis;
- maksimal tiga pelatihan;
- memperhatikan prasyarat.

### 6.5 Simulasi

Simulasi:

- membandingkan skor sebelum dan sesudah;
- tidak mengubah profil skill permanen;
- tidak boleh disamarkan sebagai hasil aktual.

Gunakan label visual seperti **“SIMULASI — belum mengubah profil”**.

---

## 7. Prinsip UX Bersama

### 7.1 Responsive

Requirement:

- fungsi utama harus dapat digunakan pada ponsel, tablet, dan desktop;
- prioritas ponsel terutama untuk Pelamar;
- tabel panjang memiliki area gulir sendiri.

### 7.2 Bahasa

- Bahasa Indonesia sederhana.
- Hindari istilah teknis tanpa penjelasan.
- Hindari nada yang menghakimi kondisi Pelamar.
- Tampilkan penjelasan singkat pada level skill dan hasil skor.

### 7.3 Transparansi

Jangan hanya menampilkan angka seperti `85%`.

Selalu sediakan jalur menuju:

- skill yang sudah memenuhi;
- skill yang masih kurang;
- tingkat yang dimiliki;
- tingkat yang diminta;
- status verifikasi;
- versi/waktu hasil rekomendasi bila melihat riwayat.

### 7.4 Empty State

Setiap halaman data harus memiliki empty state yang memberi langkah selanjutnya.

Contoh:

```text
Belum ada rekomendasi yang bisa dihitung.
Lengkapi profil dan konfirmasi keterampilan terlebih dahulu.
[ Lengkapi Profil ]
```

### 7.5 Loading State

Gunakan skeleton/loading pada:

- dashboard;
- rekomendasi;
- detail skor;
- gap analysis;
- rekomendasi pelatihan;
- evaluasi admin.

### 7.6 Error State

Semua form harus memiliki:

- validasi inline;
- pesan kegagalan simpan;
- data lama tetap terlihat jika penyimpanan gagal;
- tombol coba lagi bila relevan.

### 7.7 Confirmation

Konfirmasi wajib untuk tindakan berdampak, antara lain:

- membatalkan pengajuan verifikasi yang masih menunggu;
- menonaktifkan akun;
- menutup/menonaktifkan lowongan;
- menerbitkan konfigurasi bobot baru;
- menetapkan keputusan verifikasi sertifikat;
- konfirmasi kelulusan peserta.

---

## 8. Struktur Navigasi Tingkat Tinggi

### 8.1 Pelamar

```text
Beranda
Profil & Riwayat
Lowongan
Pelatihan
Rencana Belajar
Simulasi
Sertifikat
Lamaran
Pengaturan
```

Riwayat rekomendasi dapat ditempatkan sebagai subbagian di **Lowongan** karena proposal mewajibkan hasil lama dapat ditelusuri tetapi tidak menetapkan menu khusus.

### 8.2 Admin Platform

```text
Dashboard
Taksonomi
  - Skill
  - Jabatan
Lowongan
Pelatihan
Aturan Bobot
Evaluasi
Laporan
Akun Platform
Riwayat Aktivitas
```

`Riwayat Aktivitas` berasal dari requirement pencatatan perubahan admin. Letaknya sebagai menu tersendiri adalah rekomendasi IA, bukan nama menu eksplisit proposal.

### 8.3 Badan Sertifikasi

```text
Dashboard
Peserta Pelatihan
Verifikasi Sertifikat
Riwayat
Akun/Lembaga
```

`Akun/Lembaga` hanya untuk informasi akun/lembaga yang wajar ditampilkan kepada pemilik akun. Jangan memberi kemampuan mengubah data yang tidak didukung requirement tanpa penanda **PERLU KEPUTUSAN**.

---

## 9. Komponen Shared

Gunakan komponen konsisten:

- App Shell
- Topbar
- Sidebar/Desktop navigation
- Bottom navigation atau mobile drawer untuk Pelamar
- Breadcrumb
- Page Header
- Search
- Filter bar
- Sort control
- Status Badge
- Skill Level Badge
- Verification Badge
- Score Ring/Score Card
- Gap Card
- Training Card
- Vacancy Card
- Data Table
- Pagination
- Empty State
- Alert
- Toast
- Modal/Drawer
- Confirm Dialog
- File Upload
- Source Link
- Activity Timeline
- Version Badge
- Form validation state
- Skeleton loading
- Error state

---

## 10. REKOMENDASI DESAIN VISUAL — BUKAN REQUIREMENT PROPOSAL

Proposal tidak menentukan branding, warna, logo, atau gaya visual. Untuk prototipe Figma Make gunakan arahan berikut agar tiga role tetap konsisten.

### Karakter

- profesional;
- tenang;
- mudah dipahami;
- tidak terasa seperti portal HR perusahaan;
- tidak menggunakan visual “AI futuristic”;
- fokus pada keterbacaan data.

### Warna

Gunakan sistem warna netral dengan satu warna utama yang profesional. Jangan terlalu banyak gradient.

Status harus dapat dibedakan tanpa hanya mengandalkan warna.

### Layout

Pelamar:
- card-based;
- mobile-first;
- CTA jelas;
- minim tabel besar.

Admin/Badan Sertifikasi:
- desktop-first tetapi tetap responsive;
- tabel dapat digunakan bila data banyak;
- detail dapat dibuka sebagai halaman atau drawer.

### Tipografi

Gunakan sans-serif modern dan mudah dibaca. Prioritaskan hierarki teks yang jelas.

---

## 11. State Akun dan Akses

### Pelamar

```text
Belum registrasi
→ Registrasi
→ Email belum terverifikasi
→ Verifikasi berhasil
→ Aktif
→ Dapat login
```

### Badan Sertifikasi

Flow proposal:

```text
Mendaftar
→ Menunggu verifikasi Admin
→ Diverifikasi
→ Aktif
→ Dapat memproses tugas lembaganya
```

Buat halaman **Menunggu Verifikasi** jika lembaga sudah membuat akun tetapi belum disetujui.

### Admin

Proposal menyebut role Admin dan kemampuan mengelola admin lain, tetapi tidak menjelaskan mekanisme publik untuk membuat akun admin. Jangan membuat **Registrasi Admin Publik**.

---

## 12. Interaksi Eksternal

Saat Pelamar ingin melamar:

```text
[ Buka Sumber Lowongan ]
```

Berikan penjelasan:

> Anda akan membuka sumber lowongan di luar Skill Matching. Setelah melamar, Anda dapat mencatat status lamaran di sini.

Saat Pelamar ingin mengikuti pelatihan:

```text
[ Buka Sumber Pelatihan ]
```

Berikan penjelasan bahwa pendaftaran/pembelajaran dilakukan di luar aplikasi.

---

## 13. Aksesibilitas Minimum pada Mockup

- target sentuh mobile minimal nyaman;
- label form tidak hanya placeholder;
- teks kontras;
- badge memiliki teks;
- error tidak hanya ditunjukkan dengan warna;
- modal dapat ditutup dengan jelas;
- tabel memiliki header yang konsisten;
- nilai skor mempunyai label tekstual.

---

## 14. State Data yang Harus Diwakili di Figma

Buat varian desain untuk kondisi berikut.

### Pelamar

- profil kosong;
- profil sebagian lengkap;
- profil siap dihitung;
- belum ada rekomendasi;
- ada rekomendasi;
- semua hasil di bawah threshold;
- tidak ada gap;
- ada satu gap;
- ada banyak gap;
- tidak ada pelatihan sesuai filter;
- simulasi bisa dijalankan;
- simulasi tidak tersedia;
- sertifikat belum diajukan;
- verifikasi menunggu;
- terverifikasi;
- ditolak;
- belum ada lamaran;
- ada lamaran dengan beberapa status.

### Admin

- data kosong;
- data aktif;
- draft;
- validation error;
- duplicate warning;
- import berhasil;
- import sebagian gagal;
- lowongan tanpa skill wajib → tidak boleh publish;
- konfigurasi bobot valid;
- konfigurasi bobot tidak valid;
- alasan perubahan kosong;
- akun Badan Sertifikasi menunggu verifikasi;
- akun aktif/nonaktif;
- laporan tidak memiliki data untuk periode terpilih.

### Badan Sertifikasi

- belum diverifikasi Admin;
- tidak ada tugas;
- ada peserta yang perlu dikonfirmasi;
- pengajuan sertifikat menunggu;
- permintaan bukan kewenangan → harus ditolak oleh server;
- verifikasi diterima;
- verifikasi ditolak;
- data tidak memadai/perlu tindak lanjut.

---

## 15. Cross-Role Data Handoff yang Harus Konsisten

| Aksi Awal | Role | Dampak ke Role Lain |
|---|---|---|
| Badan Sertifikasi mendaftar | Badan Sertifikasi | Muncul pada antrean verifikasi akun Admin |
| Admin memverifikasi Badan Sertifikasi | Admin | Akun lembaga menjadi aktif |
| Admin menerbitkan lowongan | Admin | Lowongan dapat masuk proses pencocokan Pelamar |
| Admin menerbitkan pelatihan | Admin | Pelatihan dapat masuk rekomendasi Pelamar |
| Admin mengubah bobot | Admin | Hanya hasil perhitungan berikutnya yang memakai versi baru |
| Pelamar mengajukan sertifikat | Pelamar | Muncul pada antrean lembaga yang dipilih |
| Badan Sertifikasi memproses sertifikat | Badan Sertifikasi | Status dapat dilihat Pelamar |
| Pelamar memberi feedback | Pelamar | Data tersedia untuk modul evaluasi Admin |

---

## 16. PERLU KEPUTUSAN — Jangan Disembunyikan oleh Mockup

### 16.1 Penyelesaian pelatihan dan perubahan skill

Draft proposal memiliki dua penjelasan yang belum sepenuhnya sama:

- pada proses bisnis, Pelamar mengonfirmasi penyelesaian pelatihan lalu sistem memperbarui skill;
- pada KF-10, tingkat baru tersimpan permanen setelah kelulusan dikonfirmasi Badan Sertifikasi penyelenggara, atau oleh Pelamar sendiri dengan status belum terverifikasi jika pelatihan tidak memiliki lembaga terdaftar.

**Untuk mockup:** tampilkan flow kondisional, tetapi beri annotation `PERLU KEPUTUSAN FINAL`.

Usulan representasi:

```text
Pelatihan selesai
│
├── Pelatihan terkait lembaga terdaftar
│    → status "Menunggu konfirmasi lembaga"
│    → setelah konfirmasi, update mengikuti aturan final
│
└── Tidak ada lembaga terdaftar
     → Pelamar dapat konfirmasi sendiri
     → skill tetap berstatus "Dilaporkan sendiri"
```

Ini adalah **working assumption untuk mockup**, bukan koreksi diam-diam terhadap proposal.

### 16.2 Mekanisme input penilaian ahli

Proposal menyebut penilai ahli tidak memiliki akun, tetapi Admin mengelola evaluasi yang membandingkan penilaian ahli dengan sistem.

Proposal belum menetapkan apakah penilaian ahli:

- diinput manual Admin;
- diimpor;
- berasal dari formulir eksternal.

Mockup Admin boleh menampilkan area **“Data Penilaian Ahli”**, tetapi cara input harus diberi annotation `PERLU KEPUTUSAN`.

### 16.3 Pengelolaan profil lembaga

Proposal menetapkan profil `Certification_Bodies` di basis data, tetapi tidak menjelaskan secara rinci field apa yang boleh diubah sendiri oleh lembaga.

Buat halaman akun sederhana tanpa menambahkan kemampuan administratif yang belum ditetapkan.

---

## 17. Catatan Konsistensi Draft

Pada beberapa judul tabel draft masih muncul istilah **“LabaRapi”**, sedangkan judul, narasi utama, use case, dan rancangan sistem menggunakan nama **Skill Matching**.

Untuk mockup gunakan nama **Skill Matching** dan jangan menampilkan “LabaRapi”. Catatan ini perlu dibetulkan juga pada proposal final.

---

## 18. Instruksi Utama untuk Figma Make

Gunakan instruksi berikut ketika file ini disertakan:

```text
Build a high-fidelity responsive web application mockup named "Skill Matching".

Treat this document as the global source of truth.

There are exactly three application roles:
1. Pelamar
2. Admin Platform
3. Badan Sertifikasi

Do not create company accounts or expert assessor accounts.

Respect role boundaries strictly. Do not expose Pelamar private profile, skill, score, or application history to Badan Sertifikasi. Admin also must not have a default UI for browsing individual Pelamar skill profiles.

Create reusable components and consistent states across screens.

The UI language is Indonesian.

For Pelamar, prioritize mobile usability.
For Admin and Badan Sertifikasi, prioritize efficient desktop workflows while remaining responsive.

Every important workflow must have:
- default state,
- loading state,
- empty state,
- validation/error state,
- success feedback,
- relevant confirmation dialog.

Do not invent business processes outside the specification.
If a requirement is marked PERLU KEPUTUSAN, keep the UI flexible and annotate the unresolved behavior rather than silently deciding it.
```

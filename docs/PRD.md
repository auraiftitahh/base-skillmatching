# PRD — Peningkatan Website Skill Matching

Versi: 1.0  
Tanggal: 15 Oktober 2026  
Status: Rancangan implementasi; belum merupakan persetujuan deployment  
Produk: Skill Matching — reintegrasi korban PHK ke sektor kerja formal  
Platform: Web, Laravel + Blade  
Acuan audit runtime: https://skillaura.awicode.com

## 1. Ringkasan keputusan produk

Website akan menggunakan **UI Figma Make sebagai acuan utama**, dengan mempertahankan fungsi nyata yang sudah benar dan memperbaiki alur, penjelasan hasil, serta kelengkapan informasi. Dasarnya adalah hasil survei yang disampaikan tim: desain Figma lebih menarik dibandingkan implementasi sekarang. Data mentah survei belum ditelaah dalam audit ini; PRD tidak menetapkan angka preferensi responden.

Pekerjaan ini bukan sekadar mengganti warna atau menyalin seluruh perilaku prototipe. Karakter visual Figma dipertahankan, sedangkan kontrol demo, data contoh, dan ketidakkonsistenan prototipe tidak dibawa sebagai aturan produksi. Perubahan visual yang menjauh dari acuan perlu alasan dan perbandingan yang dapat ditinjau.

**Hasil yang dituju:** pengguna dapat mengetahui apa yang harus dilakukan, mengapa memperoleh suatu skor, pelatihan mana yang menutup gap, dan mengapa simulasi menaikkan atau tidak mengubah skor.

Dokumen ini merencanakan pekerjaan. Website, database, rumus, dan desain belum diubah melalui penyusunan PRD ini.

## 2. Masalah dan tujuan

### 2.1 Masalah yang ditemukan

1. UI website berbeda cukup jauh dari desain yang dipilih responden: struktur layout, hierarki informasi, kartu, tombol, ikon, dan teks.
2. Jalan kembali dan tahapan formulir tidak konsisten. Beberapa label tindakan tidak menggambarkan halaman tujuan setelah simpan.
3. Angka seperti `55 → 85`, `0 → 30`, `50 → 50`, dan persentase cakupan gap belum dijelaskan dengan cukup rinci.
4. Konteks lowongan belum selalu diteruskan saat menuju pelatihan dan simulasi.
5. Informasi penting pada detail pelatihan, sertifikat, peserta, serta beberapa ringkasan belum selengkap acuan.
6. Beberapa langkah prototipe digabung dalam implementasi. Penggabungan bisa dipertahankan apabila tujuan, informasi, dan tindakannya tetap jelas.

### 2.2 Tujuan

- Menyelaraskan UI seluruh halaman dan state relevan dengan karakter visual Figma.
- Membuat asal data, parameter, dan langkah perhitungan dapat ditelusuri pengguna.
- Mempertahankan konteks pekerjaan yang sedang dianalisis sepanjang alur.
- Membuat penyimpanan skill, simulasi, penyelesaian pelatihan, dan verifikasi mudah dibedakan.
- Menyamakan istilah, label, dan dokumentasi dengan perilaku website.

### 2.3 Batas tujuan

Skor adalah ukuran kecocokan skill terhadap persyaratan yang dimodelkan sistem. Skor bukan probabilitas diterima kerja, bukti kompetensi formal, atau jaminan hasil pelatihan. Keberhasilan kembali bekerja merupakan tujuan jangka panjang produk dan tidak dapat dibuktikan hanya dari kenaikan skor.

## 3. Pengguna dan kewenangan

| Peran | Kebutuhan utama | Batas kewenangan |
|---|---|---|
| Pelamar | Mengisi profil/riwayat, mengonfirmasi skill, memahami gap, memilih pelatihan, simulasi, mencatat aktivitas dan lamaran | Mengelola data sendiri; tidak mengubah bobot global atau memutuskan verifikasi |
| Admin platform | Mengelola taksonomi, pemetaan, lowongan, pelatihan, konfigurasi, evaluasi dan akun | Perubahan sensitif memerlukan validasi, alasan, dan jejak audit; tidak menetapkan kemampuan pribadi pelamar secara sewenang-wenang |
| Lembaga/badan sertifikasi | Meninjau peserta dan pengajuan yang berada dalam kewenangannya | Tidak mengakses atau memutuskan pengajuan lembaga lain |

## 4. Dasar dan batas bukti

Audit memetakan **84 layar acuan**: 33 Pelamar, 37 Admin, dan 14 Badan Sertifikasi. Terdapat 20 kelompok pemicu popup yang dicatat. Kode render Figma, template/controller/service website, screenshot desain tersimpan, dan hasil GET halaman menjadi sumber pemeriksaan.

Hasil GET sebelumnya: 83 respons HTTP 200 dan satu redirect akun lembaga aktif. Status HTTP tidak membuktikan keberhasilan semua fitur. Halaman detail dengan data kosong tetap diperiksa melalui kode; tampilan dengan data nyata dan seluruh transisi transaksi belum semuanya dijalankan.

Sumber utama di workspace:

- [Audit seluruh halaman](audit/Audit_Seluruh_84_Halaman.html)
- [Matriks 84 halaman](audit/Perbandingan_84_Halaman.csv)
- [Audit navigasi dan teks](audit/Audit_Menyeluruh_Back_dan_Teks.html)
- [Matriks navigasi dan teks](audit/Audit_Back_dan_Teks_84_Halaman.csv)
- Implementasi perhitungan: `../review/source/app/Services/MatchingCalculator.php` dan `MatchingService.php`.
- Sumber desain tersimpan: `D:/KAMPUS/Page - 5/PPL_SGDS8/SkillMatching/referensi/figma-source/src/App.tsx` dan `content.ts`.

ID `P-xx`, `A-xx`, dan `B-xx` di bawah merujuk layar acuan, bukan kewajiban membuat 84 URL terpisah.

## 5. Apa yang dipertahankan dan diubah

| Bagian | Arah keputusan |
|---|---|
| Tujuan produk dan rangkaian profil → matching → gap → pelatihan | Pertahankan |
| Laravel + Blade dan proses autentikasi nyata | Pertahankan |
| Mesin hitung berbobot, versi konfigurasi, snapshot hasil | Pertahankan perilakunya; tambah penjelasan dan uji regresi |
| Bobot berbeda antar lowongan/konfigurasi | Tetap diperbolehkan; tidak otomatis dianggap kesalahan |
| Taksonomi, relasi skill, dan saran dari riwayat | Pertahankan; jelaskan asal saran dan pisahkan dari skill tersimpan |
| UI global dan komponen halaman | Bangun ulang mengikuti acuan Figma dan kebutuhan responsif |
| Alur, konteks, rincian skor, detail pelatihan/sertifikat | Perbaiki sesuai kebutuhan di PRD |
| Proses keamanan dan validasi produksi yang lebih kuat daripada demo | Pertahankan; jangan dilonggarkan untuk meniru prototipe |
| Pemilih state, akun dummy di login, simulasi verifikasi email | Tidak dimasukkan ke UI produksi |
| Halaman yang digabung | Boleh tetap digabung jika seluruh tugas dan konteks tersedia dan dicatat dalam matriks |

## 6. Cakupan dan prioritas

**P0:** fondasi yang harus benar sebelum perubahan luas diterima.  
**P1:** kebutuhan inti rilis peningkatan.  
**P2:** peningkatan lanjutan setelah fungsi inti stabil.

| ID | Kebutuhan | Prioritas | Halaman terkait |
|---|---|---|---|
| UI-01 | Sistem visual dan komponen bersama mengikuti Figma | P0 | Seluruh 84 layar |
| UI-02 | State kosong, loading, error, berhasil, pending dan read-only konsisten | P1 | Seluruh konteks relevan |
| NAV-01 | Navigasi kembali dan alur setelah simpan konsisten | P1 | Seluruh form/detail |
| TXT-01 | Inventaris dan penyelarasan seluruh teks pengguna | P1 | Seluruh 84 layar |
| CTX-01 | Lowongan target dipertahankan lintas gap/pelatihan/simulasi | P0 | P14–P23 |
| SKL-01 | Saran skill, level dan penyimpanan profil dapat dipahami | P1 | P07–P12 |
| MAT-01 | Rincian skor dan sumber parameter dapat ditelusuri | P0 | P14–P18, A11, A22–A25 |
| TRN-01 | Detail pelatihan dan penjelasan cakupan gap lengkap | P1 | P19–P21, A16–A19 |
| SIM-01 | Hasil simulasi menjelaskan seluruh perubahan | P0 | P22–P23 |
| SIM-02 | Simulasi beberapa pelatihan tanpa hitung ganda | P2 | P22–P23 |
| ACT-01 | Aktivitas, penyelesaian dan perubahan profil transparan | P1 | P24–P25, B07–B09 |
| CRT-01 | Detail sertifikat dan keputusan lengkap | P1 | P26–P28, B10–B13 |
| ADM-01 | Form bertahap dan publikasi katalog jelas | P1 | A03–A21 |
| IMP-01 | Preview impor sebelum menulis data katalog | P1 | A13–A14, A20–A21 |
| CFG-01 | Review penerbitan versi bobot dan metadata riwayat | P1 | A22–A25 |
| AUTH-01 | Status verifikasi email dan akses kirim ulang | P1 | P01–P05, B01–B04 |
| EVAL-01 | Kelengkapan evaluasi, ranking dan keterlacakan versi | P2 | A26–A32 |
| DASH-01 | Dashboard memakai indikator yang bermakna dan benar | P1 | P13, A02, B05–B06 |

P1 berlaku lintas seluruh peran, bukan hanya halaman Pelamar. P2 tidak menghalangi rilis inti, tetapi tetap tercatat sebagai pekerjaan lanjutan.

## 7. Persyaratan UI dan navigasi

### UI-01 — Figma sebagai dasar visual

- Inventarisasikan warna, tipografi, radius, border, shadow, jarak, ikon, lebar konten, serta pola responsif dari sumber Figma.
- Terapkan sebagai token dan komponen Blade/CSS bersama: sidebar, header, tombol, field, dropdown, kartu skor, badge, tabel, tabs, modal, notifikasi dan pagination.
- Bandingkan pada viewport desktop yang sama dengan acuan. Jika desain mobile belum tersedia, buat adaptasi dari komponen yang sama dan dokumentasikan keputusannya.
- Teks dan angka harus tetap terbaca saat judul panjang, data banyak, status berbeda, serta pembesaran browser.
- Tabel boleh memiliki scroll horizontal yang jelas; konten utama tidak terpotong atau menimbulkan scroll horizontal halaman.
- Kontrol dapat digunakan dengan keyboard, memiliki label/fokus terlihat, dan status tidak disampaikan hanya melalui warna. Target kontras teks normal minimal 4,5:1.
- Semua interaksi tambahan memakai JavaScript yang diperlukan dalam arsitektur Laravel + Blade; tidak merencanakan perpindahan framework.

### NAV-01 — Jalan kembali dan tahapan

- Detail memiliki kembali ke daftar/konteks asal, dengan filter dan pilihan yang relevan tetap tersedia.
- Form memiliki tindakan batal yang jelas; perubahan belum tersimpan memunculkan konfirmasi bila pengguna akan meninggalkan form.
- Beranda tetap tersedia sebagai tujuan dashboard; jangan menyamakan Beranda dengan halaman sebelumnya.
- Jangan mengandalkan `history.back()` sebagai satu-satunya jalan kembali karena pengguna bisa membuka tautan langsung.
- `Simpan & Lanjutkan` hanya digunakan jika berhasil menyimpan lalu menuju langkah berikutnya. `Simpan` atau `Simpan Perubahan` digunakan jika tetap di halaman atau kembali ke daftar sesuai konteks yang dijelaskan.
- Aksi penting memakai modal ringkasan bergaya Figma dengan fokus keyboard dan tombol batal, menggantikan confirm browser secara bertahap.
- Pengecualian back pada ID 13 di sumber Figma tidak disalin mentah ke semua peran; A13 dan B13 dinilai berdasarkan tugas halamannya.

### TXT-01 — Konsistensi teks

Buat daftar judul, subjudul, label, bantuan, tombol, pesan validasi dan hasil untuk setiap layar. Pakai “keterampilan” dalam penjelasan umum, dan “skill” ketika istilah teknis tersebut membantu; jangan berganti istilah dalam kontrol yang sama. Gunakan “Impor”, “Umpan balik”, dan nama status yang konsisten. Indikator harus menyebut yang benar-benar dihitung; “lowongan sesuai” tidak boleh dipakai untuk jumlah semua lowongan yang dihitung.

## 8. Persyaratan profil dan matching

### SKL-01 — Saran dan skill tersimpan

1. Riwayat yang dipetakan ke jabatan taksonomi menghasilkan **saran**, bukan klaim kemampuan otomatis.
2. Tampilkan skill saran terlebih dahulu dan tetap sediakan pencarian katalog untuk penambahan manual.
3. Tampilkan panduan Dasar, Menengah, Mahir, Ahli. Definisi kemampuan per level harus disepakati tim dan sama di seluruh halaman.
4. Pilihan belum tersimpan ditandai; tombol simpan eksplisit dan pesan keberhasilan menjelaskan profil telah diperbarui.
5. Skill hasil pernyataan pelamar dibedakan dari skill berstatus terverifikasi. Jangan mensyaratkan sertifikat untuk semua matching apabila aturan saat ini memperbolehkan skill belum terverifikasi.
6. Hapus riwayat tidak diam-diam menghapus skill yang sudah dikonfirmasi. Jelaskan bahwa riwayat, skill, dan riwayat hasil perhitungan adalah data berbeda; perubahan skill dilakukan melalui kontrol skill.
7. Usulan field domisili/status dan indikator kelengkapan diputuskan pada tahap penyelarasan model, bukan ditambah diam-diam.

### CTX-01 — Konteks target

- Pertahankan ID lowongan dari daftar/detail → gap → rekomendasi pelatihan → detail pelatihan → simulasi → hasil.
- Tampilkan nama lowongan target pada setiap langkah terkait dan sediakan aksi ubah target.
- Jika lebih dari satu lowongan dipilih untuk gap, tampilkan daftar target dan nyatakan bahwa cakupan pelatihan dihitung terhadap gabungan gap tersebut.
- Simulasi satu lowongan harus meminta pengguna memilih target dari konteks yang tersedia. Jangan diam-diam memakai lowongan aktif pertama.
- Jika tidak ada target, tampilkan pemilihan target atau label “katalog pelatihan umum” tanpa klaim persentase personal.
- Jika target kedaluwarsa, tidak aktif atau tidak ditemukan, tampilkan pemberitahuan dan minta penggantian; jangan mengganti target tanpa pemberitahuan.

### MAT-01 — Kontrak perhitungan yang dipertahankan

Rumus utama:

```text
Skor = 100 × Σ(wᵢ × cᵢ) / Σwᵢ

wᵢ = bobot persyaratan skill i
cᵢ = tingkat kecocokan skill i dalam rentang 0–1
```

Perilaku kode yang menjadi baseline:

- Level skill pelamar 0 berarti tidak ada dalam profil; level kemampuan yang dipilih berada pada 1–4.
- Untuk skill langsung: `c = min(1, level_pelamar / level_target)`.
- Jika skill langsung tidak dimiliki, gunakan kecocokan terbaik dari relasi skill yang terdaftar, dibatasi 1 lalu dikalikan faktor relasi. Relasi tidak ditambahkan sebagai bonus di atas skill langsung.
- Bobot berasal dari override persyaratan jika diaktifkan; selain itu dari bobot wajib/diutamakan versi konfigurasi. Kode saat ini membatasi bobot efektif 1–5.
- Skor internal dibulatkan dua desimal, kartu dapat menampilkan bilangan bulat. Rincian menunjukkan alasan perbedaan pembulatan.
- Jika tidak ada persyaratan, tampilkan keadaan “persyaratan belum tersedia”; jangan menyajikan 0 sebagai bukti pelamar tidak cocok.
- Ambang skor mengatur penampilan rekomendasi default, bukan mengubah rumus atau menjamin kelayakan melamar.
- Skill wajib diberi bobot sesuai aturan sekarang; PRD ini tidak menambah aturan gagal otomatis bila satu skill wajib belum dimiliki.

Tabel rincian minimal memuat nama skill, level pelamar, level target, wajib/diutamakan, bobot efektif dan asalnya, kecocokan, relasi yang dipakai bila ada, kontribusi, jumlah bobot dan versi konfigurasi. Jelaskan bahwa admin mengatur parameter dan data persyaratan; skor dihitung sistem dari data tersebut, bukan diketik manual oleh admin.

Contoh wajib pada pengujian dan bantuan:

```text
100 × [(3×1) + (3×0) + (3×0,5) + (1×1)] / (3+3+3+1)
= 100 × 5,5 / 10
= 55

Jika pelatihan mengubah kecocokan komponen kedua dari 0 menjadi 1:
100 × [(3×1) + (3×1) + (3×0,5) + (1×1)] / 10 = 85
Tambahan = 30 poin, bukan kenaikan 30 persen relatif.
```

Nama skill pada contoh harus diambil dari fixture kasus uji, bukan diasumsikan berlaku untuk semua lowongan. Perbedaan bobot antar skenario diperbolehkan. Dokumen dan screenshot untuk skenario yang sama harus menggunakan konfigurasi yang sama.

## 9. Pelatihan, gap dan simulasi

### TRN-01 — Cakupan gap dan detail pelatihan

Detail menampilkan penyedia, sumber, biaya, durasi, mode, skill yang diajarkan, level capaian, prasyarat, konteks target, dan alasan direkomendasikan. Prasyarat pelatihan dan prasyarat level skill harus diberi nama berbeda jika keduanya kelak didukung.

Formula cakupan saat ini berbeda dari skor matching:

```text
gap_g = max(0, target_g − level_pelamar_g)
prioritas_g = agregasi (gap pada lowongan × bobot skill)
peningkatan_g = max(0, min(target_g, capaian_pelatihan_g) − level_pelamar_g)

Cakupan gap = 100 × Σ(prioritas_g × peningkatan_g / gap_g)
                      / Σprioritas_g
```

Hanya gap positif yang berkontribusi. Untuk banyak target, implementasi menggabungkan target/gap maksimum per skill dan menjumlahkan prioritas lintas lowongan. Cakupan bukan persentase lulus, peluang diterima kerja, atau otomatis tambahan skor matching.

- Tampilkan rincian skill dan kontribusi yang menghasilkan persentase; angka seperti 31,58% tidak boleh tampil tanpa target dan penjelasan denominator.
- Profil tanpa skill masih dapat memiliki gap terhadap target yang dipilih; cakupan positif dalam kondisi ini tidak otomatis salah.
- Jika tidak ada target atau tidak ada gap, jangan menampilkan persentase personal yang menyesatkan. Tampilkan keadaan yang sesuai dan jalur ke katalog umum.
- Jika tidak ada gap, jelaskan bahwa kebutuhan skill yang dimodelkan sudah terpenuhi; rekomendasi pengembangan umum harus dibedakan.

### SIM-01 — Sebelum dan sesudah yang dapat dijelaskan

- Abu-abu mewakili skor profil tersimpan saat perhitungan; hijau mewakili skor hipotetis sesudah capaian pelatihan diterapkan. Sertakan label teks, tidak hanya warna.
- Tampilkan lowongan, pelatihan, konfigurasi, skor sebelum/sesudah, tambahan poin dan perubahan level setiap skill relevan.
- Gunakan `level_hipotetis = max(level_sekarang, capaian_pelatihan)`; simulasi tidak menurunkan kemampuan dan tidak menulis ke profil.
- Tampilkan penjelasan khusus bila skor tidak berubah: skill tidak dibutuhkan/berelasi pada target, capaian tidak melebihi kemampuan, atau kecocokan sudah penuh.
- Tombol “Tambahkan ke Rencana” menyimpan pilihan pelatihan saja, disertai konfirmasi; tidak menyatakan pelatihan telah selesai.
- Jangan menjalankan simulasi seolah-olah mengikuti pelatihan menjamin capaian nyata. Badge “Simulasi — bukan profil aktual” tetap terlihat.
- Bandingkan sebelum dan sesudah dengan satu versi konfigurasi yang sama dalam satu perhitungan, termasuk bila versi aktif berubah bersamaan dengan request.

### SIM-02 — Beberapa pelatihan, tahap lanjutan

Mesin simulasi saat ini menerima daftar ID pelatihan; UI yang diaudit hanya memilih satu. Perluasan UI menggunakan capaian tertinggi per skill, bukan penjumlahan level atau penjumlahan persentase cakupan. Tampilkan jumlah pilihan, urutan/prasyarat dan dampak gabungan. Batas jumlah pilihan ditentukan setelah pengujian kegunaan dan performa; jangan menetapkan batas tanpa kebutuhan.

### ACT-01 — Rencana dan aktivitas

Bedakan rencana tersimpan, rekomendasi jalur, sedang dipelajari, pengajuan selesai, dan kelulusan/penyelesaian yang tercatat. Tampilkan pihak yang dapat menyetujui dan kapan profil berubah. Tidak mengubah aturan penyelesaian otomatis/manual sebelum keputusan model pada Bagian 15 disepakati dan perilaku backend diuji.

## 10. Sertifikat, lembaga dan akun

### CRT-01

- Detail sertifikat memuat pelamar, lembaga, pelatihan bila terkait, skill/level klaim, file, tanggal, status, alasan dan timeline.
- Preview file dilakukan bila format didukung dan akses diizinkan; unduh tetap tersedia.
- Form keputusan tidak memiliki keputusan positif yang terpilih diam-diam. Pengambil keputusan memilih secara eksplisit, membaca ringkasan, lalu mengonfirmasi.
- Validasi level, lembaga, kepemilikan, status dan akses tetap dilakukan di backend meskipun UI membatasi pilihan.
- Pengajuan ditolak memiliki jalur perbaikan/pengajuan ulang dengan jejak pengajuan sebelumnya tetap dapat ditelusuri; bukan menimpa sejarah tanpa catatan.
- Detail peserta lembaga menampilkan skill/capaian pelatihan yang akan diproses.
- Riwayat lembaga mencakup keputusan sertifikat dan konfirmasi kelulusan, dengan jenis, pelaksana, tanggal, alasan dan objek terkait.

### AUTH-01

Sediakan halaman/status verifikasi email, instruksi pemeriksaan kotak masuk, dan kirim ulang dengan pembatasan yang sesuai backend. Pertahankan tautan verifikasi/reset bertoken dan validasi sandi produksi. Jangan menambahkan tombol simulasi verifikasi. Tampilkan status email dan status persetujuan lembaga sebagai hal berbeda. Pengaturan akun menyediakan jalur ubah sandi yang jelas dan terautentikasi sesuai pola autentikasi proyek.

## 11. Admin, impor dan evaluasi

### ADM-01 — Katalog bertahap

Lowongan: metadata → persyaratan skill → review → publikasi. Pelatihan: metadata → capaian skill → prasyarat → review → publikasi. Tampilkan langkah, status draft, validasi dan tujuan tombol. Pengelolaan banyak skill dapat memakai tabel/checkbox sesuai Figma, dengan validasi per baris dan pesan hasil yang jelas. Publikasi ditolak jika persyaratan wajib kelengkapan objek belum dipenuhi; aturan kelengkapan dicatat sebelum implementasi.

### IMP-01 — Impor dua tahap

1. Upload dan validasi: tidak menulis baris katalog final; staging sementara diperbolehkan untuk preview.
2. Preview jumlah valid/tidak valid, isi baris, alasan error dan kebijakan duplikat.
3. Admin memilih simpan baris valid secara eksplisit.
4. Validasi ulang sebelum commit, simpan sebagai draft, cegah submit ganda, dan laporkan jumlah sukses/gagal.
5. Sediakan file contoh dan cara memperbaiki error. Kebijakan duplikat harus disepakati, tidak menimpa data lama secara implisit.

### CFG-01 — Versi bobot

Tampilkan konfigurasi aktif dan asal override per lowongan. Sebelum terbit, tampilkan nilai lama/baru dan alasan. Riwayat mencakup versi, parameter, pembuat, waktu, alasan dan status. Snapshot hasil lama tetap dapat dibaca dengan parameter historis; fitur hitung ulang membuat hasil baru, bukan mengganti isi snapshot lama.

### EVAL-01 — Tahap lanjutan

Lengkapi indikator penilaian ahli, ranking per profil uji, konteks versi hasil, filter periode/versi dan ekspor yang mengikuti filter. Aturan ranking seri dan arti kelengkapan penilaian ditetapkan lebih dahulu. Umpan balik pengguna tidak otomatis mengubah bobot. Histori yang tidak menyimpan versi tidak boleh diberi versi rekaan saat migrasi.

### DASH-01

Dashboard menampilkan tugas dan ringkasan sesuai peran, dengan definisi indikator yang dapat dijelaskan. Pelamar melihat kesiapan profil, target, gap prioritas, rencana dan aksi lanjut; admin melihat kelengkapan katalog/draft/kedaluwarsa serta konfigurasi; lembaga melihat antrean dan riwayat proses. Indikator “selesai diproses”, “terverifikasi” dan “ditolak” dihitung sesuai definisi masing-masing, bukan dipertukarkan.

## 12. Skenario penerimaan utama

Fixture berikut adalah data uji terkontrol, bukan janji hasil seluruh akun produksi. Uji dilakukan pada lingkungan staging.

| ID | Kondisi dan langkah | Ekspektasi |
|---|---|---|
| UAT-01 | Profil menghasilkan kecocokan `[1,0,0.5,1]`, bobot `[3,3,3,1]`; buka rincian lowongan | Skor 55; jumlah bobot 10; setiap kontribusi dan asal parameter terlihat |
| UAT-02 | Dari UAT-01 pilih pelatihan yang memenuhi komponen kedua | Hasil 55 → 85; +30 poin; komponen yang berubah ditunjukkan; profil tersimpan tetap sama |
| UAT-03 | Akun tanpa skill dan tanpa relasi skill yang memberi kecocokan; pelatihan memenuhi satu skill berbobot 3 dari total 10 | Hasil 0 → 30; penjelasan kontribusi tersedia |
| UAT-04 | Profil awal 0; pelatihan tidak mengajarkan skill langsung maupun relasi yang berpengaruh pada target | Hasil 0 → 0; alasan tidak berpengaruh ditampilkan |
| UAT-05 | Profil awal 50; pelatihan tidak menambah kecocokan target | Hasil 50 → 50; tidak mengklaim semua pelatihan selalu menaikkan skor |
| UAT-06 | Profil memiliki skill yang berasal dari konfirmasi terdahulu; hapus seluruh riwayat pekerjaan | Saran dari riwayat hilang; skill tersimpan tidak terhapus diam-diam; penjelasan tersedia |
| UAT-07 | Hapus seluruh skill; buka lowongan dan pelatihan dengan target eksplisit | Skor sesuai profil kosong/relasi yang benar; lowongan default tunduk ambang; cakupan pelatihan boleh positif bila gap target tertutup |
| UAT-08 | Buka rekomendasi pelatihan tanpa target dan tanpa skill | Minta target atau tampilkan katalog umum; tidak ada persentase cakupan personal tanpa dasar |
| UAT-09 | Gap skill A: 1, prioritas 3; gap B: 2, prioritas 2. Pelatihan menutup A penuh dan B satu level | Cakupan `100×(3+2×1/2)/5 = 80%`; bukan otomatis +80 poin matching |
| UAT-10 | Pilih lowongan B dari daftar, lanjut gap → pelatihan → detail → simulasi | Target tetap B; nama target terlihat; tidak berpindah ke lowongan pertama |
| UAT-11 | Isi pilihan skill, belum simpan, lalu tinggalkan halaman; ulangi dan simpan | Ada peringatan perubahan belum tersimpan; setelah simpan nilai bertahan saat halaman dimuat ulang |
| UAT-12 | Jalankan simulasi dan tambah rencana | Simulasi tidak mengubah profil; tambah rencana hanya membuat entri rencana |
| UAT-13 | Unggah impor dengan baris valid dan error; lihat preview lalu batal | Tidak ada objek katalog final baru; error per baris terlihat; staging dibersihkan sesuai kebijakan |
| UAT-14 | Simpan baris valid dari preview, lalu kirim ulang request | Hasil draft jelas; pengiriman ulang tidak menggandakan data secara tidak sengaja |
| UAT-15 | Lembaga membuka detail sertifikat lalu mencoba akses objek lembaga lain | Detail miliknya lengkap; akses di luar kewenangan ditolak backend |
| UAT-16 | Buka keputusan sertifikat tanpa memilih keputusan | Tidak dapat tersimpan sebagai terverifikasi secara default |
| UAT-17 | Terbitkan versi bobot baru setelah membuat snapshot | Perhitungan baru memakai versi baru; snapshot lama dan versinya tetap sama |
| UAT-18 | Buka detail langsung melalui URL, gunakan kembali; ulangi dari daftar berfilter | Tujuan kembali aman dan kontekstual; filter dari daftar dipertahankan jika tersedia |
| UAT-19 | Uji kartu/form/tabel dengan teks panjang, error, empty dan pending pada desktop/mobile | Karakter UI Figma tetap konsisten; tidak ada konten utama tertutup atau kontrol tidak dapat digunakan |
| UAT-20 | Pilih dua pelatihan yang mengajarkan skill sama, jika SIM-02 diterapkan | Capaian memakai maksimum per skill; tidak menjumlahkan level/cakupan; hasil profil tetap tidak berubah |

## 13. Rencana pelaksanaan dan keluaran

Urutan di bawah adalah dependensi pekerjaan, bukan estimasi tanggal. Estimasi waktu ditetapkan setelah inventaris komponen dan keputusan model selesai.

| Tahap | Pekerjaan | Keluaran dan gerbang selesai |
|---|---|---|
| 0 — Baseline | Bekukan revisi acuan Figma/source, inventaris 84 layar dan state, siapkan staging/data uji, petakan route dan aturan bisnis | Matriks `layar → komponen → route → state → keputusan`; keputusan Bagian 15 diselesaikan untuk cakupan rilis |
| 1 — Fondasi UI | Token, shell, navigasi, form, modal, tabel, kartu, badge dan notifikasi mengikuti Figma | Preview halaman contoh login, dashboard, daftar, form dan detail untuk tiga peran; tinjauan kesesuaian visual |
| 2 — Alur inti | Konteks target, panduan skill, rincian matching, cakupan pelatihan dan hasil simulasi | Alur Pelamar lengkap; UAT-01–12 lulus tanpa regresi formula |
| 3 — Admin dan lembaga | Katalog bertahap, review konfigurasi, impor preview, keputusan dan riwayat lengkap | UAT-13–17 lulus; kontrol akses dan transisi status terverifikasi |
| 4 — Seluruh halaman | Terapkan komponen ke sisa layar, audit teks/state/mobile, tutup seluruh baris matriks | Setiap 84 layar berstatus diterapkan/digabung sengaja/ditunda dengan alasan; tidak ada layar hilang tanpa keputusan |
| 5 — Validasi dan rilis | Uji regresi, perbandingan visual, uji pengguna, pembaruan dokumen dan rencana rollback | Bukti UAT, screenshot pembanding, catatan rilis dan deployment review; produksi hanya setelah otorisasi rilis |
| 6 — Lanjutan | Simulasi banyak pelatihan, evaluasi/ranking/versi, fitur tambahan yang dipilih | Rilis terpisah dengan acceptance criteria terkait |

Membangun UI pada Tahap 1 dan menerapkannya selama Tahap 2–4; keselarasan visual tidak ditunda sampai akhir atau dianggap pemolesan opsional.

### Cakupan kelompok halaman

| Kelompok | Fokus penerapan |
|---|---|
| P01–P05, B01–B04, A01 | Auth nyata dalam gaya Figma; verifikasi/reset/pending dan navigasi aman |
| P06–P13 | Onboarding, profil, riwayat, saran/konfirmasi skill, kesiapan dan dashboard |
| P14–P23 | Pencarian lowongan, detail/rincian, gap, snapshot, pelatihan, jalur dan simulasi |
| P24–P33 | Aktivitas, sertifikat, lamaran/timeline/sumber, umpan balik dan pengaturan akun |
| A02–A21 | Dashboard, taksonomi, pemetaan, katalog, publikasi dan impor |
| A22–A32 | Konfigurasi/riwayat, evaluasi, penilaian ahli, umpan balik dan laporan |
| A33–A37 | Akun/lembaga, verifikasi, status dan audit; alasan tindakan sensitif |
| B05–B14 | Dashboard, pelatihan, peserta, kelulusan, sertifikat, keputusan, riwayat dan profil lembaga |

## 14. Verifikasi dan definisi selesai

- Seluruh 84 baris matriks acuan memiliki hasil peninjauan; bukan semua harus menjadi URL terpisah.
- Screenshot pembanding pada viewport sama tersedia untuk halaman unik; halaman gabungan memiliki pemetaan informasi dan aksi yang dapat ditelusuri.
- State kosong, terisi, pending, disetujui, ditolak, error validasi dan read-only diuji pada konteks yang relevan menggunakan fixture staging.
- Pemeriksaan responsif minimal pada lebar 360, 768 dan 1440 piksel serta keyboard dilakukan; masalah potongan konten dan navigasi diblokir sebelum rilis.
- Uji unit domain menghitung matching, relasi, override, pembulatan, gap/coverage, gabungan simulasi dan konsistensi versi. Uji fitur mencakup target lintas halaman, penyimpanan, impor, kewenangan dan transisi status.
- Uji regresi memastikan UI baru tidak mengubah skor untuk input dan konfigurasi yang sama. Uji tampilan tidak menggantikan uji perhitungan.
- Semua kebutuhan P0/P1 lulus atau penundaan disetujui eksplisit; tidak ada cacat kritis pada data, akses, perhitungan atau alur utama.
- Semua angka kecocokan/cakupan pada alur inti memiliki target dan sumber penjelasan; tidak ada klaim persentase tanpa konteks.
- Uji kegunaan minimal melibatkan wakil tiap peran. Target produk: peserta mampu menjelaskan asal skor dan membedakan simulasi dari profil aktual tanpa bantuan fasilitator. Jumlah peserta, ambang keberhasilan dan metode perbandingan dengan versi lama ditetapkan sebelum pelaksanaan; tidak mengarang hasil survei.
- Manual diperbarui setelah perilaku final; proposal/diagram hanya disesuaikan pada bagian yang benar-benar berubah dan sesuai cakupan penugasan tim. Bagian Bab 4.5 ke atas tidak diubah otomatis melalui pekerjaan ini.
- Sampel data uji, akun, file upload dan rahasia konfigurasi tidak dimasukkan ke dokumen publik/repository.

## 15. Keputusan yang masih harus ditetapkan

Keputusan di bawah belum menjadi fakta sistem baru. Pekerjaan visual dan investigasi yang tidak bergantung padanya dapat berjalan; perubahan aturan/data yang bergantung padanya menunggu keputusan.

| Topik | Rekomendasi awal | Perlu dipastikan |
|---|---|---|
| Prasyarat | Pertahankan prasyarat antar pelatihan yang sudah didukung dan cegah siklus | Apakah perlu juga prasyarat skill/level; jika ya perlu model dan aturan tambahan |
| Penyelesaian tanpa lembaga | Jelaskan kebijakan sekarang sebelum mengubahnya | Bukti/otoritas yang mengizinkan kenaikan profil dan perbedaan status terverifikasi |
| Saran level dari pengalaman | Utamakan panduan dan konfirmasi pengguna | Apakah tahun pengalaman boleh menghasilkan saran, dan dasar pemetaannya; tidak otomatis menyamakan lama kerja dengan kompetensi |
| Profil dasar | Selaraskan field dengan kebutuhan matching dan acuan | Domisili, status PHK dan field wajib; tidak menambah pengumpulan data tanpa manfaat jelas |
| Skor nol/tanpa skill | Pertahankan aturan ambang dan sediakan penjelasan serta katalog umum | Teks empty state dan perilaku “tampilkan semua skor” yang disepakati |
| Impor duplikat | Preview dan tidak overwrite implisit | Kunci identifikasi, skip/update, masa berlaku staging dan batas file |
| Cakupan rilis | P0/P1 sebagai rilis inti; P2 terpisah | Apakah bookmark/filter lokasi, simulasi banyak pelatihan dan evaluasi lengkap masuk rilis awal |
| Sumber UI | Gunakan revisi Figma tersimpan yang diaudit | Apakah ada revisi Figma lebih baru; bekukan file/revisi sebelum pengerjaan |
| Lima website | Validasi staging lalu terapkan artefak yang sama sesuai otorisasi | Apakah lima domain harus selalu memakai revisi yang sama; domain staging dan urutan rilis |

## 16. Risiko dan mitigasi

| Risiko | Penanganan |
|---|---|
| Penyalinan prototipe menghilangkan validasi/akses nyata | Pertahankan backend, uji role/ownership, porting UI secara bertahap |
| Perubahan UI tanpa sengaja mengubah skor | Fixture dan baseline unit/regresi sebelum perubahan; bandingkan input dan versi sama |
| Perbedaan data disalahartikan sebagai kesalahan rumus | Simpan fixture, versi, persyaratan dan provenance parameter bersama hasil uji |
| Rumus cakupan disangka skor atau peluang kerja | Label dan bantuan berbeda; tampilkan komponen perhitungan |
| Migrasi field baru merusak data lama | Perubahan skema hanya jika perlu, backup, migration non-destruktif, dan rollback diuji |
| Semua halaman dinyatakan selesai hanya karena route terbuka | Gunakan matriks state, screenshot dan UAT transaksi, bukan status HTTP saja |
| Perbaikan visual menghilangkan karakter yang dipilih responden | Bandingkan dengan revisi Figma yang dibekukan dan dokumentasikan penyimpangan |
| Lima domain berbeda versi/koneksi data | Catat revisi tiap deployment, verifikasi APP_URL/database/storage per domain tanpa mencampur data |

## 17. Di luar cakupan awal

- Mengganti metode matching dengan machine learning atau menjadikan feedback pengubah bobot otomatis.
- Mengklaim semua pelatihan otomatis meningkatkan skor atau semua sertifikat otomatis membuktikan kemampuan.
- Mengubah bobot hanya untuk memaksa hasil contoh menjadi sama pada akun berbeda.
- Integrasi job board eksternal, pembayaran atau LMS penuh tanpa kebutuhan terpisah.
- Menghapus data produksi, menjalankan seeder ulang, mengganti konfigurasi email, atau deployment ke lima domain sebagai konsekuensi otomatis penulisan PRD.

## 18. Paket hasil implementasi yang direncanakan

1. UI Laravel + Blade mengikuti acuan Figma dengan komponen konsisten.
2. Matriks penutupan temuan seluruh 84 layar beserta state, keputusan penggabungan dan penundaan.
3. Penjelasan matching, gap dan simulasi dengan contoh uji yang dapat direproduksi.
4. Perbaikan alur Pelamar, Admin dan Lembaga sesuai prioritas yang disepakati.
5. Bukti tes dan screenshot pembanding, catatan perubahan, panduan migrasi/rollback bila relevan.
6. Pembaruan manual dan daftar penyesuaian proposal/diagram berdasarkan implementasi final.

PRD selesai ditulis tidak berarti implementasi selesai atau seluruh usulan sudah disepakati. Penerapan dilakukan berdasarkan cakupan yang dipilih dari dokumen ini, dengan UI Figma tetap menjadi acuan utama.

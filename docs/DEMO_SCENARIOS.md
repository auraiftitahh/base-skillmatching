# Data seeder dan skenario demonstrasi

Data ini sintetis, bukan lowongan, lembaga, sertifikat, atau penawaran pelatihan nyata. Seeder tidak mengirim email. Password diambil dari `DEMO_PASSWORD`; tidak disimpan dalam source. Password owner diambil dari `OWNER_PASSWORD`.

## Mengaktifkan

Pada database demo/staging baru, isi OWNER_PASSWORD dan DEMO_PASSWORD minimal 12 karakter, set `DEMO_SEED=true`, lalu jalankan `php artisan migrate --seed`. Pada database existing, backup dan jalankan migration terlebih dahulu; jangan menggunakan migrate:fresh. Seeder memakai create-if-missing dan tidak menyetel ulang konfigurasi aktif atau password existing.

Pada APP_ENV=production, data demo ditolak kecuali `ALLOW_DEMO_IN_PRODUCTION=true` diberikan secara eksplisit. Untuk instalasi nyata gunakan `DEMO_SEED=false`.

## Akun

| Email | Kondisi | Cara mencoba |
|---|---|---|
| admin@skillmatching.local | Owner bawaan jika OWNER_EMAIL tidak diganti | Kelola seluruh katalog, impor, bobot, evaluasi dan akun |
| raka@example.com | Profil parsial, pengalaman kerja, aktivitas, sertifikat, lamaran | Fixture utama Staf Gudang 55 → 85 |
| baru@example.test | Profil skill kosong | Staf Gudang 0 → 30 dengan Forklift Dasar; 0 → 0 dengan Komunikasi dan Pelayanan |
| parsial@example.test | Skill dasar | Bandingkan gap level yang belum penuh |
| mahir@example.test | Empat skill utama level 4, verified | Staf Gudang 100; pelatihan dasar tidak meningkatkan skor |
| relasi@example.test | Pengoperasian Mesin, tanpa Forklift langsung | Periksa kecocokan parsial melalui relasi/faktor |
| digital@example.test | Skill analisis data | Bandingkan Analis Persediaan dengan Staf Gudang |
| belum.verifikasi@example.test | Email belum diverifikasi | Login/akses ruang kerja dibatasi |
| nonaktif@example.test | Akun tidak aktif | Login ditolak |
| kontak@logistiknusantara.id | Lembaga logistik aktif | Kelulusan, sertifikat pending, riwayat keputusan |
| lembaga.digital@example.test | Lembaga digital aktif | Tugas dalam kewenangan lembaga kedua; tidak boleh membuka sertifikat logistik |
| lembaga.pending@example.test | Menunggu Admin | Hanya halaman status peninjauan |
| lembaga.rejected@example.test | Ditolak | Status dan pembatasan akses |
| lembaga.disabled@example.test | Akun/lembaga nonaktif | Login ditolak |
| lembaga.unverified@example.test | Status lembaga active, email belum verified | Memastikan status active saja belum cukup untuk tampil publik |

## Ekspektasi hitung

Konfigurasi awal database baru: wajib 3, diutamakan 1, faktor relasi 0,5, ambang 40. Jika database existing memakai konfigurasi berbeda atau fixture sudah diedit, hasil mengikuti data tersebut, bukan dipaksa ke angka berikut.

| Profil | Target | Pelatihan | Hasil |
|---|---|---|---|
| Raka | Staf Gudang | Forklift Dasar | 55 → 85 (+30 poin) |
| Profil kosong | Staf Gudang | Forklift Dasar | 0 → 30 |
| Profil kosong | Staf Gudang | Komunikasi dan Pelayanan | 0 → 0 |
| Raka | Operator Administrasi Demo | Forklift Dasar | 50 → 50; Forklift tidak relevan |
| Raka | Analis Persediaan | Forklift Dasar | 0 → 0 |
| Mahir | Staf Gudang | Forklift Dasar | 100 → 100 |
| Raka | Staf Gudang | Spreadsheet untuk Logistik + Spreadsheet Lanjutan | 55 → 70; maksimum level, tidak dijumlahkan |

Cakupan gap berbeda dari skor. Untuk Raka/Staf Gudang, gap Forklift 2×bobot3=6 dan Spreadsheet 1×bobot3=3. Forklift Dasar menutup 6 dari total prioritas9: cakupan 66,67%, sementara tambahan matching 30 poin. Detail pelatihan menampilkan komponen perhitungannya.

## Variasi status

- Lowongan aktif berbagai bidang dan lokasi; draft, disabled, closed, expired, tanggal sudah lewat walau status active, serta belum memiliki persyaratan. Kasus yang tidak layak publik hanya terlihat pada pengelolaan Admin.
- Pelatihan gratis/berbayar, daring/tatap muka/hybrid, mandiri/berlembaga, dasar/lanjutan, dan rantai prasyarat. Data dari lembaga pending/nonaktif/unverified sengaja tersedia di Admin untuk uji pembatasan.
- Enrollment planned, in_progress, waiting_confirmation, completed dan rejected pada akun berbeda.
- Sertifikat pending, verified, rejected dan cancelled. Fixture verified dimiliki akun mahir agar contoh Raka tetap konsisten 55.
- Enam status lamaran dan timeline, hasil rekomendasi historis, penilaian relevan/tidak relevan, profil evaluasi kosong/parsial/mahir/skill terkait/digital serta pasangan sudah/belum dinilai.
- File sertifikat demo dibuat sebagai PDF valid di penyimpanan privat. Saat seed diulang file tidak ditimpa dan jumlah record tidak digandakan.

Gunakan akun baru yang benar-benar diregistrasi bila ingin menguji pengiriman email nyata. Pengujian otomatis memakai mail fake/log, bukan Gmail produksi.

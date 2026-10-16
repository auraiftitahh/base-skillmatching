# Verifikasi UI Alignment V2 — 16 Oktober 2026

- 63 tes PHPUnit lulus dengan 441 assertions, tanpa failure/error.
- 290 file PHP aplikasi dan view terkompilasi lulus lint.
- 84/84 halaman utama mengembalikan HTTP 200 pada fixture lokal.
- 252 pemeriksaan viewport (1265, 768, 360 px): tidak ada overflow horizontal halaman.
- Tidak ada JavaScript page error; 23 pemeriksaan interaksi lulus.
- Regresi algoritme dari suite sebelumnya tetap lulus, termasuk 55→85, 0→30, 0→0, 50→50, cakupan gap dan histori.
- Pemeriksaan khusus mencakup navigasi lembaga pending, pemisahan tahap keputusan, tiga editor bulk, GET penyelesaian tidak mengubah status, dan satu tombol sumber lamaran.
- Data browser memakai SQLite QA terpisah. Tidak ada perubahan pada database lokal pengguna, ngrok, atau hosting.

Pengujian menggunakan PHP 8.3.27, SQLite, dan Chrome desktop. Bukan pengujian MySQL Hostinger, SMTP nyata, keseluruhan state/modal atau uji kegunaan responden baru. Keberhasilan tes dan HTTP tidak diklaim membuktikan kesamaan piksel. Peninjauan screenshot membandingkan hierarki dan komposisi halaman prioritas dengan source/screenshot Figma; data contoh dapat berbeda.

Pratinjau 84 pasangan screenshot dan keluaran tes tersedia pada paket QA terpisah. Rincian perhitungan tetap di backend; penjelasan teknis tidak lagi mendominasi UI pelamar.

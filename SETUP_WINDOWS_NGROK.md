# Panduan Windows + XAMPP/MySQL + Ngrok

1. Aktifkan MySQL pada XAMPP dan buat database `skill_matching` melalui phpMyAdmin.
2. Pastikan `php -v` menggunakan PHP 8.3+ dan `php -m` menampilkan `pdo_mysql`, `fileinfo`, `mbstring`, `openssl`.
3. Di root proyek jalankan `composer install`.
4. Salin `.env.example` menjadi `.env`; isi koneksi MySQL dan `OWNER_PASSWORD` minimal 12 karakter.
5. Jalankan `php artisan key:generate`, `php artisan migrate --seed`, `php artisan optimize:clear`.
6. Jalankan `php artisan serve --host=127.0.0.1 --port=8000`.
7. Buka localhost dan uji login Admin/Pelamar/Badan Sertifikasi.
8. Terminal kedua: `ngrok http 8000`; buka HTTPS yang diberikan ngrok.
9. Bila tautan email verifikasi perlu mengarah ke ngrok, ubah `APP_URL=https://xxxxx.ngrok-free.app` dan jalankan `php artisan optimize:clear`.

**Catatan:** `bootstrap/app.php` mempercayai forwarded headers dalam mode development agar URL dan skema HTTPS ngrok dikenali. Untuk hosting production, ubah `APP_PROXIES` menjadi IP reverse proxy yang valid dan aktifkan `APP_DEBUG=false` serta HTTPS.

Jika muncul 500, buka `storage/logs/laravel.log` dan kirim stacktrace lengkap. Gunakan `php artisan view:cache` untuk memeriksa kompilasi template sebelum browser testing.

# Perbaikan Composer — Skill Matching (10 Oktober 2026)

## Masalah

`composer install` sebelumnya gagal karena batas versi `laravel/tinker` dan `nunomaduro/collision` pada paket awal tidak sesuai Laravel 13.

## Yang diperbaiki

- `laravel/tinker`: `^2.10` → `^3.0`
- `nunomaduro/collision`: `^9.0` → `^8.6`

Kedua versi disesuaikan dengan paket resmi `laravel/laravel` cabang 13.x. Laravel 13 mendukung PHP 8.3.

## Instalasi pada Windows / PowerShell

1. Ekstrak arsip revisi ke folder proyek, jangan menimpa file `.env` yang sudah berisi informasi privat.
2. Pastikan terminal dibuka di direktori yang memuat `composer.json`.
3. Jalankan:

```powershell
composer install
Copy-Item .env.example .env  # lewati jika .env sudah ada
php artisan key:generate
```

4. Isi pengaturan database MySQL pada `.env`, siapkan database, lalu jalankan:

```powershell
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000
```

Untuk mencoba ngrok (terminal kedua):

```powershell
ngrok http 8000
```

Gunakan `composer validate` untuk memeriksa manifest dan `php artisan test` setelah dependensi serta driver database tersedia.

Catatan: paket revisi ini telah diperiksa secara statis; belum ada pengujian Composer/install Laravel penuh dalam lingkungan penyusunan karena Composer serta akses unduh dependensi tidak tersedia.

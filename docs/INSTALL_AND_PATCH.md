# Pemasangan UI Alignment V2 — 16 Oktober 2026

Rilis ini menyelaraskan tampilan Laravel + Blade dengan acuan Figma dan menyederhanakan informasi pelamar. Source dan patch belum diterapkan pada ngrok/hosting atau folder project lokal Anda. Source yang diedit berada di salinan workspace.

## Memasang patch ke project yang sebelumnya

1. Backup folder project. Pertahankan `.env`, `APP_KEY`, database, dan file upload.
2. Ekstrak ZIP patch di luar folder project. Jalankan `php verify-base.php "D:/path/ke/SkillMatching"` dari folder patch. Skrip hanya memeriksa kesesuaian file. Jika konflik muncul, tinjau perbedaannya sebelum menimpa.
3. Salin **isi folder `files/`** ke root project (folder yang berisi `artisan`), gabungkan direktori dan ganti file yang cocok dengan baseline. Alternatif untuk Git: jalankan `git apply --check /path/changes.patch`, lalu `git apply /path/changes.patch`. Gunakan salah satu cara saja.
4. Dari root project jalankan:

```sh
php artisan optimize:clear
```

5. Restart server lokal jika diperlukan dan muat ulang browser dengan Ctrl+Shift+R. Buka detail lowongan, rincian skor, hasil simulasi, dan detail lamaran untuk memeriksa hasilnya.

**Tidak perlu `migrate:fresh --seed`, `db:wipe`, `key:generate`, migration baru, atau seeder ulang untuk patch UI ini.** Composer dependency tidak berubah. Seeder variatif dari rilis sebelumnya tetap disertakan pada full source.

Baseline patch adalah rilis Improved sebelumnya (commit lokal b15418c20d6d098b8769b94d64d2fa484089aba7). File existing yang berubah telah dibandingkan dengan folder lokal D:/KAMPUS/Page - 5/PPL_SGDS8/SkillMatching saat pengerjaan; file aplikasi yang diperiksa cocok. Dokumen QA yang ikut diperbarui mungkin berbeda jika Anda sudah mengeditnya. Pemeriksa hash tetap menjadi acuan saat pemasangan.

## Memakai full source pada instalasi baru

Ekstrak `SkillMatching/` ke direktori baru. Paket membawa source aplikasi, composer.lock, dan vendor yang digunakan pada pengujian. Tidak memerlukan npm build untuk UI Blade.

1. Gunakan PHP 8.3+ dan ekstensi Laravel/PDO sesuai database. Salin `.env.example` menjadi `.env` lalu isi APP_URL, database, owner, dan SMTP milik Anda.
2. `composer install` tersedia bila perlu memasang ulang/memvalidasi dependency. Pada server produksi, gunakan `composer install --no-dev --optimize-autoloader`.
3. Hanya untuk instalasi baru, jalankan `php artisan key:generate`.
4. Pada database baru, jalankan `php artisan migrate --seed`. Untuk skenario demo, atur DEMO_SEED dan DEMO_PASSWORD sesuai docs/DEMO_SCENARIOS.md sebelum seeding. Produksi nyata menggunakan DEMO_SEED=false.
5. Jalankan aplikasi dengan `php artisan serve`; pada hosting, arahkan document root ke `public` dan pastikan `storage` serta `bootstrap/cache` dapat ditulis.

Jangan mengganti `.env` existing dengan contoh. Paket tidak membawa kredensial database/SMTP, sesi, database lokal, atau upload pribadi.

## Pratinjau dan batas rilis

Paket bukti QA berisi `PREVIEW_84_HALAMAN.html`, gambar Figma dan hasil perbaikan, hasil tes, serta tabel cakupan. Ekstrak dahulu agar gambar relatif terbaca. Ini pratinjau statis, bukan aplikasi interaktif.

Layout mengikuti hierarki Figma dengan penyesuaian untuk aplikasi nyata: validasi, hak akses, banyak data, pencarian, penyimpanan, dan preview import tetap diperlukan. Tidak diklaim identik piksel atau mencakup setiap kombinasi state. Toolbar demo/pemilih state Figma tidak diimplementasikan sebagai fitur pengguna produksi. Preview PDF tergantung browser; unduhan privat tersedia sebagai alternatif.

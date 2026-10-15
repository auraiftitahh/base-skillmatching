# PATCH v1.1.2 — diterapkan pada Full Source v1.1.1

1. Backup proyek (source dan database) terlebih dahulu.
2. Ekstrak ZIP ini di folder root SkillMatching (sejajar dengan `artisan`). Izinkan replace untuk file yang sama.
3. Jangan menghapus `.env`, `vendor`, `storage` atau database.
4. Jalankan `php artisan optimize:clear`, lalu `php artisan test`, lalu `scripts/VERIFY_ALL_WINDOWS.ps1`.
5. Tidak diperlukan migrasi database baru.

Berisi hanya berkas berubah/baru menurut manifest. Jika baseline Anda bukan Full Source v1.1.1, gunakan ZIP Full Source dan pertahankan `.env` lama Anda secara terpisah.

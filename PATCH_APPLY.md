# Skill Matching v1.1.1 Patch

**Baseline:** Full Source **v1.1.0**, bukan source versi sebelumnya yang belum dilengkapi perubahan besar.  
**Isi:** hanya file yang ditambah atau berubah. **Tidak ada migrasi database baru.**

## Cara menerapkan

1. Backup proyek dan database.
2. Ekstrak ZIP patch ke folder root proyek yang berisi `artisan`, timpa file yang sama. Jangan ekstrak ke subfolder `patch` terpisah.
3. Jangan hapus atau timpa `.env`, `vendor/`, atau file upload pengguna. ZIP patch tidak mencakup ketiganya.
4. Buka PowerShell pada folder proyek, lalu jalankan:

```powershell
php artisan optimize:clear
php artisan view:clear
php artisan view:cache
powershell -ExecutionPolicy Bypass -File scripts/VERIFY_ALL_WINDOWS.ps1
php artisan serve
```

5. Uji `/admin/skill/form?id=11` dan `/pelamar/pelatihan/aktivitas`, lalu uji fitur dari role lain.

**Pengujian Laravel/MySQL/browser belum dieksekusi di pembuat patch.** Detail audit tersedia pada `AUDIT_DAN_PERBAIKAN_v1.1.1.md`.

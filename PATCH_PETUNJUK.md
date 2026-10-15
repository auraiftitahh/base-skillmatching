# Penerapan Patch Skill Matching v1.1.5

Patch ini ditujukan hanya untuk Full Source v1.1.4. Cadangkan source dan database, ekstrak patch ke folder berisi `artisan` (pilih timpa file jika ditanya). Tidak perlu menjalankan migrasi atau mengganti `.env`.

Setelah timpa, jalankan:

```powershell
php artisan optimize:clear
php artisan view:cache
php artisan test --filter=GlobalDataControlsTest
php artisan test --filter=CatalogDetailRegressionTest
php artisan test --filter=CertificationDetailNavigationTest
php artisan test
```

Baca `PERBAIKAN_HALAMAN_DETAIL_v1.1.5.md` untuk daftar perubahan dan uji manual.

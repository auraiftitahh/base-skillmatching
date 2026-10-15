# Skill Matching v1.1.1 - jalankan pada root proyek (folder yang berisi artisan)
$ErrorActionPreference = 'Stop'
if (-not (Test-Path '.\\artisan')) { throw 'Jalankan script ini dari root proyek yang memuat artisan.' }
if (-not (Test-Path '.\\vendor\\autoload.php')) { throw 'Vendor belum tersedia. Jalankan composer install dahulu.' }
Write-Host '1/5 Bersihkan cache...' -ForegroundColor Cyan
php artisan optimize:clear
if ($LASTEXITCODE -ne 0) { throw 'optimize:clear gagal' }
Write-Host '2/5 Compile semua Blade...' -ForegroundColor Cyan
php artisan view:cache
if ($LASTEXITCODE -ne 0) { throw 'view:cache gagal' }
Write-Host '3/5 PHP lint file hasil kompilasi Blade...' -ForegroundColor Cyan
$files = @(Get-ChildItem '.\\storage\\framework\\views' -File -Filter '*.php')
if ($files.Count -eq 0) { throw 'Tidak ditemukan hasil kompilasi Blade.' }
foreach ($file in $files) {
  php -l $file.FullName | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "Blade hasil kompilasi invalid: $($file.FullName)" }
}
Write-Host "Lulus: $($files.Count) file Blade terkompilasi" -ForegroundColor Green
Write-Host '4/5 Daftar route...' -ForegroundColor Cyan
php artisan route:list --path=admin
if ($LASTEXITCODE -ne 0) { throw 'route:list gagal' }
Write-Host '5/5 Test seluruh page dan alur utama...' -ForegroundColor Cyan
php artisan test
if ($LASTEXITCODE -ne 0) { throw 'Ada feature test gagal; periksa detail hasil test.' }
Write-Host 'Pemeriksaan otomatis selesai tanpa error.' -ForegroundColor Green

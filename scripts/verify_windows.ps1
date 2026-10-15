# Run from project root, after composer install and .env configuration.
$ErrorActionPreference = 'Stop'
Write-Host '=== PHP CLI extensions ==='
php -v
php -m | Select-String -Pattern 'pdo_mysql|pdo_sqlite|fileinfo|mbstring|openssl'
Write-Host '=== Composer ==='
composer validate --strict
Write-Host '=== Framework status ==='
php artisan about
php artisan migrate:status
Write-Host '=== Routes ==='
php artisan route:list
Write-Host '=== Compile all Blade views ==='
php artisan view:clear
php artisan view:cache
$compiled = Get-ChildItem storage/framework/views -Filter '*.php' -File
foreach ($file in $compiled) { php -l $file.FullName; if ($LASTEXITCODE -ne 0) { throw "Blade PHP error: $($file.FullName)" } }
Write-Host '=== Feature and Unit Tests ==='
php artisan test
if ($LASTEXITCODE -ne 0) { throw 'Automated tests failed. Do not report PASS.' }
Write-Host '=== PURE PHP calculator ==='
php scripts/verify_matching.php
if ($LASTEXITCODE -ne 0) { throw 'Calculator verification failed.' }
Write-Host 'Selesai. Lanjutkan manual browser testing 3 role dan responsive testing.'

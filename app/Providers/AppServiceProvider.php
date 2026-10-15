<?php
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
class AppServiceProvider extends ServiceProvider {
    public function register(): void {}
    public function boot(): void {
        // With a trusted X-Forwarded-Proto set by ngrok, request()->isSecure() is true.
        // Avoid forcing HTTPS on localhost when the ngrok tunnel uses HTTPS externally.
        if (app()->environment('production') && str_starts_with((string)config('app.url'), 'https://')) URL::forceScheme('https');
    }
}

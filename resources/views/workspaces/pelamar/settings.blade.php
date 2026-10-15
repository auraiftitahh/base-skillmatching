<section class="card narrow"><h2>Pengaturan Akun</h2><p>{{ $u->name }}<br><small>{{ $u->email }}</small></p><div class="actions"><a class="btn outline" href="/pelamar/profil">Ubah Profil</a><form method="post" action="{{ route('logout') }}">
@csrf<button class="btn danger">Keluar</button></form></div></section>

@extends('layouts.base')
@section('content')
@php
$menus = match($role) {
    'pelamar' => ['dashboard','riwayat','lowongan','pelatihan','rencana-belajar','simulasi','pelatihan/aktivitas','sertifikat','lamaran','pengaturan'],
    'admin' => ['dashboard','skill','jabatan','lowongan','pelatihan','bobot','evaluasi','laporan','akun','aktivitas'],
    default => ['dashboard','pelatihan','pelatihan/peserta','sertifikat','riwayat','akun'],
};
$statusText = ['self_reported'=>'Dilaporkan sendiri','verified'=>'Terverifikasi','pending'=>'Menunggu','rejected'=>'Ditolak','cancelled'=>'Dibatalkan','active'=>'Aktif','draft'=>'Draft','closed'=>'Ditutup','expired'=>'Kedaluwarsa','disabled'=>'Dinonaktifkan','completed'=>'Selesai','planned'=>'Direncanakan','waiting_confirmation'=>'Menunggu konfirmasi'];
$levelText = [0=>'Belum memiliki',1=>'Dasar',2=>'Menengah',3=>'Mahir',4=>'Ahli'];
$menuLabels = [
    'pelamar' => ['dashboard'=>'Beranda','riwayat'=>'Profil & Riwayat','lowongan'=>'Lowongan','pelatihan'=>'Pelatihan','rencana-belajar'=>'Rencana Belajar','simulasi'=>'Simulasi','pelatihan/aktivitas'=>'Aktivitas Pelatihan','sertifikat'=>'Sertifikat','lamaran'=>'Lamaran','pengaturan'=>'Pengaturan'],
    'admin' => ['dashboard'=>'Dashboard','skill'=>'Taksonomi Skill','jabatan'=>'Jabatan','lowongan'=>'Lowongan','pelatihan'=>'Pelatihan','bobot'=>'Konfigurasi Bobot','evaluasi'=>'Evaluasi','laporan'=>'Laporan','akun'=>'Akun Platform','aktivitas'=>'Riwayat Aktivitas'],
    'sertifikasi' => ['dashboard'=>'Dashboard','pelatihan'=>'Pelatihan Lembaga','pelatihan/peserta'=>'Peserta Pelatihan','sertifikat'=>'Verifikasi Sertifikat','riwayat'=>'Riwayat Proses','akun'=>'Akun & Lembaga'],
];
$menuIcons = [
    'dashboard'=>'house', 'riwayat'=>'history','lowongan'=>'briefcase-business',
    'pelatihan'=>'graduation-cap','rencana-belajar'=>'book-open-check','simulasi'=>'chart-no-axes-combined',
    'pelatihan/aktivitas'=>'clipboard-check','sertifikat'=>'award','lamaran'=>'send',
    'pengaturan'=>'settings','skill'=>'shapes','jabatan'=>'contact-round',
    'bobot'=>'sliders-horizontal','evaluasi'=>'chart-column','laporan'=>'file-chart-column',
    'akun'=>'users-round','aktivitas'=>'history','pelatihan/peserta'=>'users-round',
];
// Choose exactly one most-specific active menu. A nested activity page must not also activate Pelatihan.
$activeMenu = null;
foreach ($menus as $menu) {
    if ($page === $menu || str_starts_with($page, $menu.'/')) {
        if ($activeMenu === null || strlen($menu) > strlen($activeMenu)) $activeMenu = $menu;
    }
}
if ($role === 'pelamar' && $page === 'pelatihan/selesaikan') $activeMenu = 'pelatihan/aktivitas';
if ($role === 'sertifikasi' && $page === 'pelatihan/kelulusan') $activeMenu = 'pelatihan/peserta';
@endphp
<div class="app-shell">
<div class="sidebar-backdrop" id="sidebar-backdrop" hidden></div>
<aside class="side" id="sidebar" aria-label="Navigasi utama">
<a class="brand" href="/{{ $role }}/dashboard"><span class="logo-symbol" aria-hidden="true">✧</span> skillmatching</a>
<small>{{ $role==='pelamar'?'RUANG KARIER ANDA':($role==='admin'?'PENGELOLAAN PLATFORM':'PORTAL LEMBAGA') }}</small>
<nav aria-label="Menu {{ $role }}">
@foreach($menus as $link)
<a href="/{{ $role }}/{{ $link }}" class="{{ $activeMenu === $link ? 'active' : '' }}" @if($activeMenu === $link) aria-current="page" @endif>
<img class="nav-icon" src="{{ asset('icons/'.($menuIcons[$link] ?? 'circle-help').'.svg') }}" alt="" aria-hidden="true">
<span>{{ $menuLabels[$role][$link] ?? ucfirst($link) }}</span>
</a>
@endforeach
</nav>
<div class="side-bottom"><div class="profile-tile"><span class="avatar">{{ mb_strtoupper(mb_substr($u->name,0,1)) }}</span><div><b>{{ $u->name }}</b><small>{{ $role==='sertifikasi'?'Badan Sertifikasi':ucfirst($role) }}</small></div></div>
<form action="{{ route('logout') }}" method="post">
@csrf
<button class="logout">Keluar <span aria-hidden="true">→</span></button></form></div>
</aside>
<div class="app-content">
<header class="topbar"><button class="mobile-menu" type="button" id="sidebar-toggle" aria-expanded="false" aria-controls="sidebar"><img src="{{ asset('icons/menu.svg') }}" alt="" aria-hidden="true"> Menu</button>
<span>Skill Matching <span class="crumb">/ {{ $title }}</span></span><a href="/{{ $role }}/dashboard">Beranda</a></header>
<div class="ribbon">SKILL MATCHING <span>Keterampilan hari ini, peluang esok hari.</span></div>
<main id="main-content"><div class="page-title"><div><small>{{ strtoupper($role==='sertifikasi'?'BADAN SERTIFIKASI':$role) }}</small><h1>{{ $title }}</h1></div></div>
@if(session('success'))
<div class="alert-success" role="status">{{ session('success') }}</div>
@endif
@if($errors->any())
<div class="alert-error" role="alert"><strong>Periksa kembali:</strong><ul>
@foreach($errors->all() as $error)
<li>{{ $error }}</li>
@endforeach
</ul></div>
@endif
@if(session('import_errors'))
<section class="card"><h3>Baris yang perlu diperbaiki</h3>
@foreach(session('import_errors') as $e)
<p>{{ $e }}</p>
@endforeach
</section>
@endif
@include('workspaces.'.$role.'.'.$viewKey)
<footer class="footer">© {{ date('Y') }} Skill Matching — Keterampilan hari ini, peluang esok hari.</footer>
</main></div></div>
<nav class="mobile-bottom" aria-label="Navigasi cepat">
@foreach(array_slice($menus,0,4) as $link)
<a href="/{{ $role }}/{{ $link }}" class="{{ $activeMenu === $link ? 'active' : '' }}" @if($activeMenu === $link) aria-current="page" @endif>
<img class="nav-icon" src="{{ asset('icons/'.($menuIcons[$link] ?? 'circle-help').'.svg') }}" alt="" aria-hidden="true"><span>{{ $menuLabels[$role][$link] ?? ucfirst($link) }}</span></a>
@endforeach
<button type="button" id="sidebar-toggle-bottom" aria-controls="sidebar"><img class="nav-icon" src="{{ asset('icons/menu.svg') }}" alt="" aria-hidden="true"><span>Menu</span></button>
</nav>
<script>
(function(){
  const sidebar=document.getElementById('sidebar');
  const backdrop=document.getElementById('sidebar-backdrop');
  const toggle=document.getElementById('sidebar-toggle');
  const bottom=document.getElementById('sidebar-toggle-bottom');
  if(!sidebar||!backdrop)return;
  function setOpen(open){sidebar.classList.toggle('opened',open);backdrop.hidden=!open;document.body.classList.toggle('nav-open',open);toggle?.setAttribute('aria-expanded',String(open));}
  toggle?.addEventListener('click',()=>setOpen(!sidebar.classList.contains('opened')));
  bottom?.addEventListener('click',()=>setOpen(!sidebar.classList.contains('opened')));
  backdrop.addEventListener('click',()=>setOpen(false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
  window.addEventListener('resize',()=>{if(window.innerWidth>760)setOpen(false)});
})();
</script>
@endsection

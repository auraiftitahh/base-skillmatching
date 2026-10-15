<div class="section-actions"><form action="{{ route('recommendations.snapshot') }}" method="post">
@csrf<button class="btn outline">Simpan Riwayat Perhitungan</button></form><a class="btn outline" href="/pelamar/lowongan/riwayat">Riwayat Hasil</a></div>
<form class="filterbar" method="get"><label>Cari lowongan<input name="q" value="{{ request('q') }}" placeholder="Posisi pekerjaan"></label><label class="check"><input type="checkbox" name="show_all" value="1" @checked(request('show_all'))> Tampilkan semua skor</label><button class="btn primary">Terapkan</button></form>
@if($ownedSkills->isEmpty())<div class="note">Belum ada skill yang dikonfirmasi. <a href="/pelamar/skill/konfirmasi">Lengkapi skill agar skor dapat dihitung.</a></div>
@endif
<div class="cards">
@php $shown=0; 
@endphp
@foreach($rank as $item)
@if((request('show_all') || $item['score']>=($config->threshold??40)) && (!request('q') || str_contains(mb_strtolower($item['job']),mb_strtolower(request('q')))))
@php $shown++; 
@endphp
<article class="card"><small>{{ $item['company'] }}</small><h3>{{ $item['job'] }}</h3><div class="score-text">{{ $item['display_score'] }}<span> / 100</span></div><div class="progress"><span style="width:{{ min(100,max(0,$item['score'])) }}%"></span></div><small>{{ $item['score']<($config->threshold??40)?'Di bawah ambang utama':'Kecocokan berdasarkan skill Anda' }}</small><div class="actions"><a class="btn primary" href="/pelamar/lowongan/detail?job_id={{ $item['job_id'] }}">Lihat Detail</a></div></article>
@endif
@endforeach
@if($shown===0)<div class="empty">Tidak ada lowongan yang cocok dengan pencarian/filter saat ini. Coba aktifkan Tampilkan Semua.</div>
@endif
</div>

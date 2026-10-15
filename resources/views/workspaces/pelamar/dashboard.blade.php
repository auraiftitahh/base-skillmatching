<div class="hero-banner"><div><small>LANGKAH BARU, PELUANG BARU</small><h2>Keterampilan Anda punya peluang yang lebih besar.</h2><p>Mulai dari kemampuan yang Anda miliki dan cari kesempatan berikutnya.</p><a class="btn light" href="/pelamar/lowongan">Lihat Rekomendasi →</a></div><span class="hero-art">✧</span></div>
<div class="stats"><a class="stat" href="/pelamar/skill/konfirmasi"><b>{{ $ownedSkills->count() }}</b>Skill Anda</a><a class="stat" href="/pelamar/lowongan"><b>{{ count($rank) }}</b>Lowongan yang dihitung</a><a class="stat" href="/pelamar/sertifikat"><b>{{ $certificates->count() }}</b>Sertifikat</a><a class="stat" href="/pelamar/lamaran"><b>{{ $applications->count() }}</b>Lamaran</a></div>
<h2>Rekomendasi untuk Anda</h2>
@if($ownedSkills->isEmpty())<div class="empty">Isi skill terlebih dahulu agar rekomendasi relevan. <a href="/pelamar/skill/konfirmasi">Lengkapi sekarang</a></div>
@else<div class="cards">
@forelse(array_slice($rank,0,3) as $item)<a class="card clickable" href="/pelamar/lowongan/detail?job_id={{ $item['job_id'] }}"><small>{{ $item['company'] }}</small><h3>{{ $item['job'] }}</h3><div class="score-text">{{ $item['display_score'] }}<span> /100</span></div></a>
@empty<div class="empty">Belum ada lowongan aktif.</div>
@endforelse</div>
@endif
<div class="actions"><a class="btn outline" href="/pelamar/pelatihan">Cari pelatihan</a><a class="btn outline" href="/pelamar/rencana-belajar">Rencana belajar</a></div>

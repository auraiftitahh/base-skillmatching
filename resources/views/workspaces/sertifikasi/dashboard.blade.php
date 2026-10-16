<div class="stats"><a href="/sertifikasi/pelatihan/peserta" class="stat"><b>{{ $participants->where('status','waiting_confirmation')->count() }}</b>Peserta Menunggu</a><a href="/sertifikasi/sertifikat" class="stat"><b>{{ $certificates->where('status','pending')->count() }}</b>Sertifikat Menunggu</a><a href="/sertifikasi/riwayat" class="stat"><b>{{ $certificates->where('status','verified')->count()+$participants->where('status','completed')->count() }}</b>Tugas Selesai</a><a href="/sertifikasi/riwayat?status=rejected" class="stat"><b>{{ $certificates->where('status','rejected')->count() }}</b>Pengajuan Ditolak</a></div>
<section class="card"><h2>Tugas yang memerlukan tindakan</h2><div class="list">
@foreach($participants->where('status','waiting_confirmation')->take(4) as $e)<a class="subcard" href="/sertifikasi/pelatihan/peserta/detail?id={{ $e->id }}">Kelulusan: {{ $e->user_name }} — {{ $e->training_title }} →</a>
@endforeach
@foreach($certificates->where('status','pending')->take(4) as $c)<a class="subcard" href="/sertifikasi/sertifikat/detail?id={{ $c->id }}">Sertifikat: {{ $c->applicant_name }} — {{ $c->title }} →</a>
@endforeach
@if($participants->where('status','waiting_confirmation')->isEmpty() && $certificates->where('status','pending')->isEmpty())<div class="empty">Semua tugas sudah diproses.</div>
@endif</div></section>

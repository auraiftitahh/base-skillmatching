@include('components.data-filters', ['searchHint'=>'Cari pelatihan dalam rencana'])
<section class="card"><h2>Rencana Belajar Otomatis</h2><p>Rekomendasi paling banyak tiga pelatihan, berdasarkan cakupan gap dan prasyarat.</p><div class="list">
@forelse($path as $i=>$t)<div class="subcard"><span class="badge">Langkah {{ $i+1 }}</span><strong>{{ $t['title'] }}</strong><p>{{ $t['coverage'] }}% cakupan • Rp {{ number_format($t['cost'],0,',','.') }}</p><form method="post" action="{{ route('plan.save') }}">
@csrf<input type="hidden" name="training_id" value="{{ $t['id'] }}"><button class="btn outline">Pilih Pelatihan</button></form></div>
@empty<div class="empty">Belum ada jalur otomatis sesuai gap dan prasyarat.</div>
@endforelse</div></section>
<section class="card"><h2>Pelatihan yang Anda pilih</h2><div class="list">
@forelse($enrollments as $e)<a href="/pelamar/pelatihan/aktivitas" class="subcard">{{ $e->training_title }} <span class="badge">{{ $statusText[$e->status]??$e->status }}</span></a>
@empty<div class="empty">Belum ada pelatihan yang dipilih.</div>
@endforelse</div></section>

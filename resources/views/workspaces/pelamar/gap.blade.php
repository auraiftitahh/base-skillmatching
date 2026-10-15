<form method="get" class="card"><h2>Pilih lowongan target</h2><div class="chips">
@foreach($allVacancies as $job)<label class="check"><input type="checkbox" name="jobs[]" value="{{ $job->id }}" @checked(in_array($job->id,$selectedJobIds))>{{ $job->title }}</label>
@endforeach</div><button class="btn primary">Hitung Gap</button></form>
<div class="cards">
@forelse($gaps as $g)<article class="card"><span class="badge orange">Prioritas {{ $g['priority'] }}</span><h3>{{ $g['skill'] }}</h3><div class="form-row"><p>Anda: <strong>{{ $levelText[$g['own']] }}</strong></p><p>Target: <strong>{{ $levelText[$g['target']] }}</strong></p></div><p>Selisih: {{ $g['gap'] }} level. Dibutuhkan oleh {{ count($g['jobs']) }} lowongan.</p><a class="btn primary" href="/pelamar/pelatihan">Cari Pelatihan →</a></article>
@empty<div class="empty">Tidak ada gap untuk lowongan terpilih.</div>
@endforelse</div>

@php $t=request()->filled('training_id') ? $allTraining->firstWhere('id',(int)request('training_id')) : $allTraining->first(); 
@endphp
@if($t)<section class="card narrow"><h2>{{ $t->title }}</h2><p>{{ $t->description }}</p><div class="stats"><div class="stat"><b>Rp {{ number_format($t->cost,0,',','.') }}</b>Biaya</div><div class="stat"><b>{{ $t->duration_hours }}</b>Jam</div><div class="stat"><b>{{ ucfirst($t->mode) }}</b>Mode</div></div><p>Disediakan oleh {{ $t->provider }}. Pembelajaran berlangsung di luar Skill Matching.</p><div class="actions"><form action="{{ route('plan.save') }}" method="post">
@csrf<input type="hidden" name="training_id" value="{{ $t->id }}"><button class="btn primary">Tambahkan ke Rencana</button></form><a class="btn outline" href="/pelamar/simulasi?training_id={{ $t->id }}">Simulasikan</a>
@if($t->source_url)<a href="{{ $t->source_url }}" target="_blank" rel="noopener noreferrer" data-confirm="Anda akan membuka penyedia pelatihan di luar aplikasi. Lanjutkan?" class="btn outline">Buka Sumber ↗</a>
@endif</div></section>
@else<div class="empty">Pelatihan belum tersedia.</div>
@endif

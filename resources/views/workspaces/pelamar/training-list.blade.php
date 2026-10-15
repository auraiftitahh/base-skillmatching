<form class="filterbar" method="get"><label>Cari pelatihan<input type="search" name="q" value="{{ request('q') }}" placeholder="Nama pelatihan" maxlength="100"></label><label>Anggaran maksimal<input name="budget" type="number" min="0" value="{{ request('budget') }}" placeholder="Rupiah"></label><label>Jam belajar per pekan<input name="hours" type="number" min="1" value="{{ request('hours') }}"></label><label>Mode<select name="mode"><option value="">Semua</option>
@foreach(['online'=>'Online','offline'=>'Tatap muka','hybrid'=>'Hybrid'] as $m=>$label)<option value="{{ $m }}" @selected(request('mode')===$m)>{{ $label }}</option>
@endforeach</select></label><button class="btn primary">Cari</button></form>
<div class="cards">
@forelse($options as $t)<article class="card"><span class="badge">{{ $t['coverage'] }}% cakupan gap</span><h3>{{ $t['title'] }}</h3><p>Rp {{ number_format($t['cost'],0,',','.') }} • {{ $t['duration_hours'] }} jam • {{ ucfirst($t['mode']) }}</p><div class="actions"><a class="btn outline" href="/pelamar/pelatihan/detail?training_id={{ $t['id'] }}">Detail</a><form method="post" action="{{ route('plan.save') }}">
@csrf<input type="hidden" name="training_id" value="{{ $t['id'] }}"><button class="btn primary">Tambahkan ke Rencana</button></form></div></article>
@empty<div class="empty">Belum ada pelatihan yang menutup gap sesuai preferensi Anda. Sesuaikan filter atau pilih lowongan lain.</div>
@endforelse</div>

@php $training=$trainings->firstWhere('id',(int)request('id')); 
@endphp
@if($training)<section class="card narrow"><h2>{{ $training->title }}</h2><form method="post" action="{{ route('training.skill',$training->id) }}">
@csrf<label>Skill diajarkan<select name="skill_id">
@foreach($skills as $s)<option value="{{ $s->id }}">{{ $s->name }}</option>
@endforeach</select></label><label>Tingkat capaian<select name="target_level">
@foreach([1=>'Dasar',2=>'Menengah',3=>'Mahir',4=>'Ahli'] as $lvl=>$text)<option value="{{ $lvl }}">{{ $text }}</option>
@endforeach</select></label><button class="btn primary">Simpan Capaian</button></form></section>
<section class="card"><h2>Skill Pelatihan</h2>
@php $rows=\Illuminate\Support\Facades\DB::table('training_skills as t')->join('skills as s','s.id','=','t.skill_id')->where('t.training_id',$training->id)->select('t.*','s.name')->get(); 
@endphp
@forelse($rows as $row)<div class="subcard">{{ $row->name }} <span class="badge">Tingkat {{ $row->target_level }}</span><form method="post" action="{{ route('admin.relation.remove',['training-skill',$row->id]) }}">
@csrf @method('DELETE')<button class="btn danger" data-confirm="Hapus capaian skill ini?">Hapus</button></form></div>
@empty<div class="empty">Belum ada skill capaian. Pelatihan tidak dapat diterbitkan sebelum data ini diisi.</div>
@endforelse</section>
@else<div class="empty">Pilih pelatihan dari daftar.</div>
@endif

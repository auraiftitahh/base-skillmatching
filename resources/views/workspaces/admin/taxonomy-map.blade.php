@php
    $selectedJobId = request()->integer('job_taxonomy_id');
@endphp
<section class="card narrow"><h2>Pemetaan Jabatan → Skill</h2><form method="post" action="{{ route('mappings.save') }}">
@csrf<label>Jabatan<select name="job_taxonomy_id">
@foreach($jobsTax as $job)<option value="{{ $job->id }}" @selected($selectedJobId === $job->id)>{{ $job->name }}</option>
@endforeach</select></label><label>Skill umum<select name="skill_id">
@foreach($skills as $skill)<option value="{{ $skill->id }}">{{ $skill->name }}</option>
@endforeach</select></label><button class="btn primary">Tambah Pemetaan</button></form></section>
<section class="card narrow"><h2>Relasi Skill Terkait</h2><form method="post" action="{{ route('relations.save') }}">
@csrf<label>Skill utama<select name="skill_id">
@foreach($skills as $skill)<option value="{{ $skill->id }}">{{ $skill->name }}</option>
@endforeach</select></label><label>Skill terkait<select name="related_skill_id">
@foreach($skills as $skill)<option value="{{ $skill->id }}">{{ $skill->name }}</option>
@endforeach</select></label><button class="btn primary">Tambah Relasi</button></form></section>
<section class="card"><div class="catalog-heading"><h2>Pemetaan Tersimpan</h2>
@if($selectedJobId > 0)<a class="btn outline" href="/admin/jabatan/pemetaan">Tampilkan Semua</a>@endif</div>
@php $mappings=\Illuminate\Support\Facades\DB::table('job_skills_mapping as m')->join('jobs_taxonomy as j','j.id','=','m.job_taxonomy_id')->join('skills as s','s.id','=','m.skill_id')->select('j.name as job','s.name as skill')->when($selectedJobId > 0, fn($q) => $q->where('m.job_taxonomy_id', $selectedJobId))->orderBy('j.name')->limit(100)->get(); 
@endphp
<div class="table-wrap"><table><thead><tr><th>Jabatan</th><th>Skill</th></tr></thead><tbody>
@forelse($mappings as $m)<tr><td>{{ $m->job }}</td><td>{{ $m->skill }}</td></tr>
@empty<tr><td colspan="2">Belum ada pemetaan</td></tr>
@endforelse</tbody></table></div></section>

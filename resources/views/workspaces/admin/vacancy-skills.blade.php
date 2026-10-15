@php $job=$allJobs->firstWhere('id',(int)request('id')); 
@endphp
@if($job)<section class="card narrow"><h2>Persyaratan: {{ $job->title }}</h2><form method="post" action="{{ route('vacancy.skill',$job->id) }}">
@csrf
<label>Skill<select name="skill_id">
@foreach($skills as $s)<option value="{{ $s->id }}">{{ $s->name }}</option>
@endforeach</select></label>
<label>Level minimal<select name="minimum_level">
@foreach([1=>'Dasar',2=>'Menengah',3=>'Mahir',4=>'Ahli'] as $lvl=>$label)<option value="{{ $lvl }}">{{ $label }}</option>
@endforeach</select></label>
<label>Kepentingan<select name="importance" id="importance"><option value="required">Wajib</option><option value="preferred">Diutamakan</option></select></label>
<label>Bobot (1–5)<input type="number" name="weight" id="weight" value="{{ $config?->required_weight??3 }}" min="1" max="5" required></label>
<label>Alasan jika bobot berbeda dari standar<textarea name="reason"></textarea></label>
<button class="btn primary">Simpan Persyaratan</button></form><script>document.getElementById('importance').addEventListener('change', e=>document.getElementById('weight').value=e.target.value==='required'?{{ $config?->required_weight??3 }}:{{ $config?->preferred_weight??1 }});</script></section>
<section class="card"><h2>Persyaratan yang sudah disimpan</h2>
@php $req=\Illuminate\Support\Facades\DB::table('job_required_skills as r')->join('skills as s','s.id','=','r.skill_id')->where('r.job_vacancy_id',$job->id)->select('r.*','s.name')->get(); 
@endphp
<div class="table-wrap"><table><thead><tr><th>Skill</th><th>Level</th><th>Kepentingan</th><th>Bobot</th><th>Aksi</th></tr></thead><tbody>
@forelse($req as $r)<tr><td>{{ $r->name }}</td><td>{{ [1=>'Dasar',2=>'Menengah',3=>'Mahir',4=>'Ahli'][$r->minimum_level] }}</td><td>{{ $r->importance }}</td><td>{{ $r->weight }}</td><td><form method="post" action="{{ route('admin.relation.remove',['job-skill',$r->id]) }}">
@csrf @method('DELETE')<button class="btn danger" data-confirm="Hapus persyaratan ini?">Hapus</button></form></td></tr>
@empty<tr><td colspan="5">Tambahkan minimal satu skill sebelum menerbitkan lowongan.</td></tr>
@endforelse</tbody></table></div><a class="btn outline" href="/admin/lowongan/form?id={{ $job->id }}">Kembali dan Atur Status Publikasi</a></section>
@else<div class="empty">Pilih lowongan terlebih dahulu melalui daftar.</div>
@endif

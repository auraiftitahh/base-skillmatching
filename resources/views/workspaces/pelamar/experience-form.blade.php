@php $edit=$experiences->firstWhere('id',(int)request('id')); 
@endphp
<section class="card narrow"><h2>{{ $edit?'Ubah':'Tambah' }} Riwayat</h2><form method="post" action="{{ route('experience.save') }}">
@csrf
@if($edit)<input type="hidden" name="id" value="{{ $edit->id }}">
@endif
<label>Jenis pengalaman<select name="type" required>
@foreach(['work'=>'Pekerjaan','education'=>'Pendidikan','organization'=>'Organisasi'] as $k=>$label)<option value="{{ $k }}" @selected(old('type',$edit->type??'work')===$k)>{{ $label }}</option>
@endforeach</select></label>
<label>Nama perusahaan / institusi / organisasi<input name="organization" required value="{{ old('organization',$edit->organization??'') }}"></label>
<label>Jabatan / posisi / program<input name="title" required value="{{ old('title',$edit->title??'') }}"></label>
<label>Jabatan dalam taksonomi (untuk saran skill)<select name="job_taxonomy_id"><option value="">Pilih jika sesuai</option>
@foreach($jobsTax as $tax)<option value="{{ $tax->id }}" @selected(old('job_taxonomy_id',$edit->job_taxonomy_id??null)==$tax->id)>{{ $tax->name }}</option>
@endforeach</select></label>
<div class="form-row"><label>Tanggal mulai<input type="date" name="start_date" value="{{ old('start_date',$edit->start_date??'') }}"></label><label>Tanggal selesai<input type="date" name="end_date" value="{{ old('end_date',$edit->end_date??'') }}"></label></div>
<label>Deskripsi pengalaman<textarea name="description">{{ old('description',$edit->description??'') }}</textarea></label>
<div class="actions"><button class="btn primary">Simpan Riwayat</button><a class="btn outline" href="/pelamar/riwayat">Batal</a></div></form></section>

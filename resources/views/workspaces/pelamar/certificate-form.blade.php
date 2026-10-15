<section class="card narrow"><h2>Unggah & ajukan verifikasi</h2><p>Silakan pilih pelatihan yang sudah Anda tandai selesai dan lembaga yang menerbitkan sertifikat.</p><form method="post" action="{{ route('certificates.save') }}" enctype="multipart/form-data">
@csrf
<label>Nama sertifikat<input name="title" required value="{{ old('title') }}"></label>
<label>Badan Sertifikasi<select name="certification_body_id" required><option value="">Pilih lembaga</option>
@foreach($allBodies as $b)<option value="{{ $b->id }}">{{ $b->name }}</option>
@endforeach</select></label>
<label>Pelatihan<select name="training_id" required><option value="">Pilih pelatihan yang diselesaikan</option>
@foreach($allTraining as $t)<option value="{{ $t->id }}">{{ $t->title }}</option>
@endforeach</select></label>
<label>Skill yang dibuktikan<select name="skill_id" required><option value="">Pilih skill</option>
@foreach($skills as $s)<option value="{{ $s->id }}">{{ $s->name }}</option>
@endforeach</select></label>
<label>Level klaim<select name="level" required>
@foreach([1=>'Dasar',2=>'Menengah',3=>'Mahir',4=>'Ahli'] as $level=>$text)<option value="{{ $level }}">{{ $text }}</option>
@endforeach</select></label>
<label>File sertifikat (PDF/JPG/PNG, maksimal 5 MB)<input type="file" name="file" accept=".pdf,.jpg,.jpeg,.png" required></label>
<button class="btn primary" data-confirm="Pastikan nama lembaga dan sertifikat benar. Kirim pengajuan?">Ajukan Verifikasi</button></form></section>

<section class="card narrow"><h2>Simulasi kecocokan</h2><p>Perhitungan hipotetis ini tidak mengubah profil keterampilan Anda.</p><form action="/pelamar/simulasi/hasil" method="get"><label>Lowongan target<select name="job_id" required>
@foreach($allVacancies as $j)<option value="{{ $j->id }}" @selected(request('job_id')==$j->id)>{{ $j->title }} — {{ $j->company }}</option>
@endforeach</select></label><label>Pelatihan simulasi<select name="training_id" required>
@foreach($allTraining as $t)<option value="{{ $t->id }}" @selected(request('training_id')==$t->id)>{{ $t->title }}</option>
@endforeach</select></label><button class="btn primary">Hitung Simulasi</button></form></section>

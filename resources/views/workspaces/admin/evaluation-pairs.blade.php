@include('components.data-filters', ['searchHint'=>'Cari profil atau lowongan uji', 'filterOptions'=>[['name'=>'status','label'=>'Penilaian','options'=>[''=>'Semua status','rated'=>'Sudah dinilai','unrated'=>'Belum dinilai']]]])
<section class="card narrow"><h2>Pasangan Profil–Lowongan Uji</h2><p>Penilai ahli berada di luar aplikasi. Admin memasukkan skala hasil penilaian 1–4 untuk dibandingkan dengan skor sistem.</p>
<form method="post" action="{{ route('evaluation.save','pair') }}">
@csrf<label>Profil uji<select name="evaluation_profile_id" required>
@foreach($evalProfiles as $e)<option value="{{ $e->id }}">{{ $e->code }}</option>
@endforeach</select></label><label>Lowongan<select name="job_vacancy_id" required>
@foreach($allJobs as $j)<option value="{{ $j->id }}">{{ $j->title }}</option>
@endforeach</select></label><label>Penilaian ahli (1–4, opsional)<input type="number" min="1" max="4" name="expert_rating"></label><button class="btn primary">Hitung dan Simpan</button></form></section>
<section class="card"><h2>Perbandingan Tersimpan</h2><div class="table-wrap"><table><thead><tr><th>Profil Uji</th><th>Lowongan</th><th>Skor Sistem</th><th>Penilaian Ahli</th></tr></thead><tbody>
@forelse($evalPairs as $e)<tr><td>{{ $evalProfileNames[$e->evaluation_profile_id] ?? 'Profil tidak tersedia' }}</td><td>{{ $jobNames[$e->job_vacancy_id] ?? 'Lowongan tidak tersedia' }}</td><td>{{ $e->system_score }}</td><td>{{ $e->expert_rating??'Belum dinilai' }}</td></tr>
@empty<tr><td colspan="4">Belum ada pasangan evaluasi.</td></tr>
@endforelse</tbody></table></div></section>

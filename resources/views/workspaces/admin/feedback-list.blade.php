@include('components.data-filters', ['searchHint'=>'Cari lowongan atau komentar', 'filterOptions'=>[['name'=>'status','label'=>'Relevansi','options'=>[''=>'Semua status','relevant'=>'Relevan','not_relevant'=>'Kurang relevan']]]])
<section class="card"><h2>Masukan dari Pelamar</h2><div class="table-wrap"><table><thead><tr><th>Lowongan</th><th>Penilaian</th><th>Komentar</th><th>Tanggal</th></tr></thead><tbody>
@forelse($feedback as $f)<tr><td>{{ $jobNames[$f->job_vacancy_id] ?? 'Tidak terkait lowongan tertentu' }}</td><td>{{ $f->rating === 'relevant' ? 'Relevan' : 'Kurang relevan' }}</td><td>{{ $f->comment }}</td><td>{{ \Carbon\Carbon::parse($f->created_at)->locale('id')->translatedFormat('d F Y') }}</td></tr>
@empty<tr><td colspan="4">Belum ada feedback.</td></tr>
@endforelse</tbody></table></div></section>

@include('components.data-filters', ['searchHint'=>'Cari nama peserta atau sertifikat', 'filterOptions'=>[['name'=>'status','label'=>'Keputusan','options'=>[''=>'Semua status','verified'=>'Terverifikasi','rejected'=>'Ditolak']]]])
<section class="card"><h2>Riwayat Keputusan Lembaga</h2><div class="table-wrap"><table><thead><tr><th>Pelamar</th><th>Sertifikat</th><th>Hasil</th><th>Diproses</th></tr></thead><tbody>
@forelse($certificates->whereIn('status',['verified','rejected']) as $c)<tr><td>{{ $c->applicant_name }}</td><td>{{ $c->title }}</td><td><span class="badge">{{ $statusText[$c->status]??$c->status }}</span></td><td>{{ $c->processed_at?\Carbon\Carbon::parse($c->processed_at)->locale('id')->translatedFormat('d F Y, H.i'):'—' }}</td></tr>
@empty<tr><td colspan="4">Belum ada keputusan.</td></tr>
@endforelse</tbody></table></div></section>

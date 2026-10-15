@include('components.data-filters', ['searchHint'=>'Cari nama peserta atau sertifikat', 'filterOptions'=>[['name'=>'status','label'=>'Status','options'=>[''=>'Semua status','pending'=>'Menunggu','verified'=>'Terverifikasi','rejected'=>'Ditolak','cancelled'=>'Dibatalkan']]]])
<section class="card"><h2>Permintaan Verifikasi</h2><p>Hanya sertifikat yang ditujukan kepada lembaga Anda.</p><div class="table-wrap"><table><thead><tr><th>Pelamar</th><th>Sertifikat</th><th>Diajukan</th><th>Status</th><th>Aksi</th></tr></thead><tbody>
@forelse($certificates as $c)<tr><td>{{ $c->applicant_name }}</td><td>{{ $c->title }}</td><td>{{ \Carbon\Carbon::parse($c->created_at)->locale('id')->translatedFormat('d F Y') }}</td><td><span class="badge">{{ $statusText[$c->status]??$c->status }}</span></td><td><a href="/sertifikasi/sertifikat/detail?id={{ $c->id }}">Lihat Detail</a></td></tr>
@empty<tr><td colspan="5">Tidak ada permintaan verifikasi.</td></tr>
@endforelse</tbody></table></div></section>

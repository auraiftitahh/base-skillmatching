@include('components.data-filters', ['searchHint'=>'Cari judul sertifikat', 'filterOptions'=>[['name'=>'status','label'=>'Status','options'=>[''=>'Semua status','pending'=>'Menunggu','verified'=>'Terverifikasi','rejected'=>'Ditolak','cancelled'=>'Dibatalkan']]]])
<div class="section-actions"><p>Sertifikat opsional; skill belum terverifikasi tetap dipakai dalam matching.</p><a class="btn primary" href="/pelamar/sertifikat/ajukan">+ Unggah Sertifikat</a></div><div class="list">
@forelse($certificates as $cert)<a class="card clickable record-row" href="/pelamar/sertifikat/detail?id={{ $cert->id }}"><span class="badge {{ $cert->status==='rejected'?'orange':'' }}">{{ $statusText[$cert->status]??$cert->status }}</span><h3>{{ $cert->title }}</h3><small>Diajukan {{ \Carbon\Carbon::parse($cert->created_at)->locale('id')->translatedFormat('d F Y') }}</small><span class="record-action">Lihat Detail →</span></a>
@empty<div class="empty">Belum ada sertifikat yang diajukan.</div>
@endforelse</div>

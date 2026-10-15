@php $c=$certificates->firstWhere('id',(int)request('id')); 
@endphp
@if($c)<section class="card narrow"><span class="badge">{{ $statusText[$c->status]??$c->status }}</span><h2>{{ $c->title }}</h2><p>Diajukan: {{ \Carbon\Carbon::parse($c->created_at)->locale('id')->translatedFormat('d F Y') }}</p><a class="btn outline" href="{{ route('certificates.file',$c->id) }}">Lihat/Unduh Sertifikat</a>
@if($c->reason)<div class="note">Catatan lembaga: {{ $c->reason }}</div>
@endif
@if($c->status==='pending')<form method="post" action="{{ route('certificates.cancel',$c->id) }}">
@csrf<button class="btn danger" data-confirm="Batalkan pengajuan ini?">Batalkan Pengajuan</button></form>
@endif</section>
@else<div class="empty">Pengajuan tidak ditemukan.</div>
@endif

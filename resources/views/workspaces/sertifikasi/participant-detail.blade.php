@php $e=$participants->firstWhere('id',(int)request('id')); 
@endphp
@if($e)<section class="card narrow"><h2>{{ $e->user_name }}</h2><p>Pelatihan: {{ $e->training_title }}</p><span class="badge">{{ $statusText[$e->status]??$e->status }}</span><p>Konfirmasi hanya boleh dilakukan setelah lembaga memeriksa kelulusan menurut prosedur eksternal.</p>
@if($e->status==='waiting_confirmation')<form method="post" action="{{ route('graduations.confirm',$e->id) }}">
@csrf<button class="btn primary" data-confirm="Konfirmasi bahwa peserta ini dinyatakan lulus?">Konfirmasi Kelulusan</button></form>
@else<div class="note">Tidak tersedia tindakan konfirmasi untuk status ini.</div>
@endif</section>
@else<div class="empty">Peserta tidak berada dalam kewenangan lembaga atau tidak ditemukan. <a href="/sertifikasi/pelatihan/peserta">Kembali</a></div>
@endif

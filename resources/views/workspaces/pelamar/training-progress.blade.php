@include('components.data-filters', ['searchHint'=>'Cari nama pelatihan', 'filterOptions'=>[['name'=>'status','label'=>'Status','options'=>[''=>'Semua status','planned'=>'Direncanakan','in_progress'=>'Sedang belajar','waiting_confirmation'=>'Menunggu konfirmasi','completed'=>'Selesai']]]])
<div class="list">
@forelse($enrollments as $e)<section class="card"><span class="badge">{{ $statusText[$e->status]??$e->status }}</span><h3>{{ $e->training_title }}</h3><p>Pelatihan dilakukan di luar aplikasi. Konfirmasi hanya setelah benar-benar selesai.</p>
@if(in_array($e->status,['planned','in_progress']))<form method="post" action="{{ route('enrollments.status',$e->id) }}">
@csrf<input type="hidden" name="status" value="{{ $e->status==='planned'?'in_progress':'planned' }}"><button class="btn outline">{{ $e->status==='planned'?'Mulai Belajar':'Kembali Direncanakan' }}</button></form><form action="{{ route('training.complete') }}" method="post">
@csrf<input type="hidden" name="training_id" value="{{ $e->training_id }}"><button class="btn primary" data-confirm="Anda telah menyelesaikan pelatihan ini?">Konfirmasi Penyelesaian</button></form>
@endif</section>
@empty<div class="empty">Belum ada pelatihan dalam rencana belajar. <a href="/pelamar/pelatihan">Cari Pelatihan</a></div>
@endforelse</div>

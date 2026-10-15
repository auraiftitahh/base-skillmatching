@php $app=$applications->firstWhere('id',(int)request('id')); 
@endphp
@if($app)<section class="card narrow"><span class="badge">{{ ['saved'=>'Disimpan','applied'=>'Sudah Dilamar','processing'=>'Diproses','interview'=>'Wawancara','accepted'=>'Diterima','rejected'=>'Tidak Lanjut'][$app->status]??'Tidak diketahui' }}</span><h2>{{ $app->job_title }}</h2><p>{{ $app->company }} • {{ $app->applied_at }}</p><div class="note">{{ $app->note }}</div><a class="btn primary" href="/pelamar/lamaran/form?id={{ $app->id }}">Perbarui Status</a></section>
<section class="card narrow"><h3>Riwayat Perubahan</h3>
@php $events=\Illuminate\Support\Facades\DB::table('application_events')->where('job_application_id',$app->id)->orderBy('created_at')->get(); 
@endphp
@foreach($events as $ev)<div class="timeline-item"><span class="badge">{{ ['saved'=>'Disimpan','applied'=>'Sudah Dilamar','processing'=>'Diproses','interview'=>'Wawancara','accepted'=>'Diterima','rejected'=>'Tidak Lanjut'][$ev->status]??'Tidak diketahui' }}</span> {{ \Carbon\Carbon::parse($ev->created_at)->locale('id')->translatedFormat('d F Y, H.i') }}<p>{{ $ev->note }}</p></div>
@endforeach</section>
@else<div class="empty">Catatan lamaran tidak ditemukan.</div>
@endif

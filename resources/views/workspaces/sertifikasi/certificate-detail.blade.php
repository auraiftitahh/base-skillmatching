@php $c=$certificates->firstWhere('id',(int)request('id'));$skill=$c?$skills->firstWhere('id',$c->skill_id):null; 
@endphp
@if($c)<div class="cards"><section class="card"><span class="badge">{{ $statusText[$c->status]??$c->status }}</span><h2>{{ $c->title }}</h2><p>Pelamar: {{ $c->applicant_name }}</p><a class="btn outline" href="{{ route('certificates.file',$c->id) }}">Lihat/Unduh File Sertifikat</a><div class="note">Keaslian dokumen harus diperiksa di luar aplikasi oleh petugas lembaga Anda.</div></section>
<section class="card"><h2>Keputusan Verifikasi</h2><p>Skill: <strong>{{ $skill?->name??'-' }}</strong> • Level klaim: {{ $levelText[$c->level]??$c->level }}</p>
@if($c->status==='pending')<form method="post" action="{{ route('certificates.decision',$c->id) }}">
@csrf<label>Keputusan<select name="decision" id="decision"><option value="verified">Terverifikasi</option><option value="rejected">Ditolak</option></select></label><label>Alasan penolakan (wajib jika ditolak)<textarea name="reason" id="reason"></textarea></label><button class="btn primary" data-confirm="Simpan keputusan ini?">Simpan Keputusan</button></form><script>document.getElementById('decision').addEventListener('change',e=>document.getElementById('reason').required=e.target.value==='rejected');</script>
@else<div class="note">Keputusan tercatat: {{ $statusText[$c->status]??$c->status }}. {{ $c->reason }}</div>
@endif</section></div>
@else<div class="empty">Permintaan tidak ditemukan atau berada di luar kewenangan lembaga.</div>
@endif

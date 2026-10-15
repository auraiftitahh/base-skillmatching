@if($currentJob && $score)<section class="card"><span class="badge">{{ $currentJob->company }}</span><h2>{{ $currentJob->title }}</h2><p>{{ $currentJob->location }} • {{ $currentJob->employment_type }}</p><div class="score-text">{{ $score['display_score'] }} <span>/100</span></div><p>{{ $currentJob->description }}</p><p><small>Sumber: {{ $currentJob->source }} • Berlaku sampai {{ $currentJob->expires_at }}</small></p>
<div class="actions"><a class="btn primary" href="/pelamar/lowongan/skor?job_id={{ $currentJob->id }}">Rincian Skor</a><a class="btn outline" href="/pelamar/lowongan/kesenjangan?jobs[]={{ $currentJob->id }}">Lihat Gap</a>
@if($currentJob->source_url)<a class="btn outline" target="_blank" rel="noopener noreferrer" href="{{ $currentJob->source_url }}" data-confirm="Anda akan membuka situs lain. Proses melamar dilakukan di luar Skill Matching. Lanjutkan?">Buka Sumber ↗</a>
@endif</div></section>
<section class="card"><h2>Persyaratan Skill</h2><div class="table-wrap"><table><thead><tr><th>Skill</th><th>Minimal</th><th>Level Anda</th><th>Kepentingan</th></tr></thead><tbody>
@foreach($score['items'] as $item)<tr><td>{{ $item['skill'] }}</td><td>{{ $levelText[$item['target']] }}</td><td>{{ $levelText[$item['own']] }}</td><td>{{ $item['importance']==='required'?'Wajib':'Diutamakan' }}</td></tr>
@endforeach</tbody></table></div></section>
@else<div class="empty">Lowongan tidak tersedia.</div>
@endif

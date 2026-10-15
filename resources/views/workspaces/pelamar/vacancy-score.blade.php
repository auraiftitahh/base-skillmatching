@if($score)<section class="card"><h2>Bagaimana skor dihitung?</h2><p>Skor = 100 × total kontribusi bobot ÷ total bobot. Status verifikasi tidak mengubah skor.</p><div class="score-text">{{ $score['display_score'] }} <span>/ 100 · Versi bobot {{ $score['configuration_version'] }}</span></div><div class="table-wrap"><table><thead><tr><th>Skill</th><th>Kepentingan</th><th>Dibutuhkan</th><th>Anda</th><th>Bobot</th><th>Kecocokan</th></tr></thead><tbody>
@foreach($score['items'] as $i)<tr><td>{{ $i['skill'] }}
@if($i['related']) <span class="badge">Skill Terkait</span>
@endif</td><td>{{ $i['importance']==='required'?'Wajib':'Diutamakan' }}</td><td>{{ $levelText[$i['target']] }}</td><td>{{ $levelText[$i['own']] }}</td><td>{{ $i['weight'] }}</td><td>{{ number_format(100*$i['match'],1) }}%</td></tr>
@endforeach</tbody></table></div><div class="actions"><a class="btn primary" href="/pelamar/lowongan/kesenjangan?jobs[]={{ $score['job_id'] }}">Analisis Kesenjangan</a></div></section>
@else<div class="empty">Belum ada data lowongan.</div>
@endif

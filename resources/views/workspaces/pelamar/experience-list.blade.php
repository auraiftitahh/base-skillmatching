@include('components.data-filters', ['searchHint'=>'Cari posisi atau instansi', 'filterOptions'=>[['name'=>'type','label'=>'Jenis riwayat','options'=>[''=>'Semua jenis','work'=>'Pekerjaan','education'=>'Pendidikan','organization'=>'Organisasi']]]])
<div class="section-actions"><a class="btn primary" href="/pelamar/riwayat/form">+ Tambah Riwayat</a></div>
<div class="list">
@forelse($experiences as $item)<section class="card"><span class="badge">{{ ['work'=>'Pekerjaan','education'=>'Pendidikan','organization'=>'Organisasi'][$item->type]??$item->type }}</span><h3>{{ $item->title }}</h3><p>{{ $item->organization }}</p><small>{{ $item->start_date }} — {{ $item->end_date??'Sekarang' }}</small><div class="actions"><a class="btn outline" href="/pelamar/riwayat/form?id={{ $item->id }}">Edit</a><form action="{{ route('experience.delete',$item->id) }}" method="post" data-confirm="Hapus riwayat ini?">
@csrf @method('DELETE')<button data-confirm="Hapus riwayat ini?" class="btn danger">Hapus</button></form></div></section>
@empty<div class="empty">Belum ada riwayat. Tambahkan pengalaman agar sistem dapat menyarankan skill yang relevan.</div>
@endforelse</div><div class="actions"><a class="btn primary" href="/pelamar/saran-skill">Lihat Saran Skill →</a></div>

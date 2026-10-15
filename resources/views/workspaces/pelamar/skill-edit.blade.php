<section class="card"><h2>Konfirmasi Skill & Level</h2><p>Pilih level sesuai kemampuan Anda: Dasar, Menengah, Mahir, Ahli. Skill yang belum dipilih tidak dimasukkan ke profil.</p>
<form method="post" action="{{ route('skills.save') }}">
@csrf
<div class="filterbar"><input type="search" id="skill-search" placeholder="Cari keterampilan ..." aria-label="Cari skill"></div>
<div class="skill-grid" id="skill-grid">
@foreach($skills as $skill)<label class="skill-item" data-skill="{{ strtolower($skill->name) }}"><span>{{ $skill->name }}<small>{{ $skill->category }}</small></span><select name="skill_levels[{{ $skill->id }}]"><option value="">Tidak dipilih</option>
@foreach([1=>'Dasar',2=>'Menengah',3=>'Mahir',4=>'Ahli'] as $lvl=>$text)<option value="{{ $lvl }}" @selected((int)($ownedSkills->firstWhere('skill_id',$skill->id)->level??0)===$lvl)>{{ $text }}</option>
@endforeach</select></label>
@endforeach</div>
<div class="actions"><button class="btn primary">Simpan Keterampilan</button><a href="/pelamar/profil/kesiapan" class="btn outline">Lihat Kesiapan</a></div></form></section>
<script>document.getElementById('skill-search').addEventListener('input',e=>document.querySelectorAll('[data-skill]').forEach(x=>x.hidden=!x.dataset.skill.includes(e.target.value.toLowerCase())));</script>

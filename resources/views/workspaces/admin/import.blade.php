@php $type=str_starts_with($page,'lowongan')?'job_vacancies':'trainings'; 
@endphp
<section class="card narrow"><h2>Impor CSV {{ $type==='job_vacancies'?'Lowongan':'Pelatihan' }}</h2><p>File diproses per baris. Data masuk sebagai draft, sehingga Admin tetap perlu menambahkan skill sebelum menerbitkan.</p>
@if($type==='job_vacancies')<p><small>Kolom wajib: title, company, source, fetched_at. Opsional: source_url, expires_at.</small></p>
@else<p><small>Kolom wajib: title, provider, cost, duration_hours, mode, fetched_at. Opsional: weekly_hours.</small></p>
@endif
<form method="post" enctype="multipart/form-data" action="{{ route('catalog.import',$type) }}">
@csrf<label>Pilih file CSV<input type="file" name="file" accept=".csv,text/csv" required></label><button class="btn primary">Upload, Validasi & Impor</button></form></section>

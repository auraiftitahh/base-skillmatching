@php $w=$weights->firstWhere('id',(int)request('id')); 
@endphp
@if($w)<section class="card narrow"><span class="badge">V{{ $w->version }} {{ $w->is_active?'Aktif':'Diarsipkan' }}</span><h2>Konfigurasi V{{ $w->version }}</h2><p>Bobot wajib: {{ $w->required_weight }}<br>Bobot diutamakan: {{ $w->preferred_weight }}<br>Faktor terkait: {{ $w->related_factor }}<br>Ambang: {{ $w->threshold }}</p><div class="note">Alasan: {{ $w->reason }}</div><small>Dibuat {{ \Carbon\Carbon::parse($w->created_at)->locale('id')->translatedFormat('d F Y') }}. Riwayat ini hanya dapat dibaca.</small></section>
@else<div class="empty">Versi tidak ditemukan.</div>
@endif

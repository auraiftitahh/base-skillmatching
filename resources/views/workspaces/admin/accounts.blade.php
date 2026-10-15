<section class="card">
    <div class="catalog-heading"><h2>Akun Pengguna</h2></div>
    @include('components.data-filters', ['searchHint'=>'Cari nama atau email', 'filterOptions'=>[
        ['name'=>'role','label'=>'Jenis akun','options'=>[''=>'Semua akun','pelamar'=>'Pelamar','sertifikasi'=>'Badan Sertifikasi']],
        ['name'=>'status','label'=>'Status akun','options'=>[''=>'Semua status','active'=>'Aktif','inactive'=>'Nonaktif']]
    ]])
    <div class="table-wrap"><table><thead><tr><th>Nama</th><th>Email</th><th>Jenis Akun</th><th>Status</th><th>Aksi</th></tr></thead><tbody>
    @forelse($users as $account)
    <tr>
        <td><strong>{{ $account->name }}</strong></td><td>{{ $account->email }}</td>
        <td>{{ $account->role==='pelamar'?'Pelamar':'Badan Sertifikasi' }}</td>
        <td><span class="badge {{ $account->is_active?'badge-active':'badge-inactive' }}">{{ $account->is_active?'Aktif':'Nonaktif' }}</span></td>
        @php $institution=$account->role==='sertifikasi'?$bodies->firstWhere('user_id',$account->id):null; $requiresReview=$institution&&in_array($institution->status,['pending','rejected']); @endphp
        <td><div class="row-actions">
            @if($requiresReview && !$account->is_active)
                <a href="/admin/akun/detail?id={{ $account->id }}">Periksa lembaga</a>
            @else
            <form method="post" action="{{ route('accounts.save',$account->id) }}" data-status-toggle data-subject="akun {{ $account->name }}">
                @csrf
                <input type="hidden" name="decision" value="{{ $account->is_active?'deactivate':'activate' }}">
                <input type="hidden" name="reason" value="">
                <button type="submit" class="ui-switch {{ $account->is_active?'is-on':'' }}" role="switch" aria-checked="{{ $account->is_active?'true':'false' }}" aria-label="{{ $account->is_active?'Nonaktifkan':'Aktifkan' }} akun {{ $account->name }}"><span></span></button>
            </form>
            @endif
            <a href="/admin/akun/detail?id={{ $account->id }}">Detail</a>
        </div></td>
    </tr>
    @empty<tr><td colspan="5">Tidak ada akun yang sesuai pencarian.</td></tr>@endforelse
    </tbody></table></div>
    @include('components.list-pages', ['paginator'=>$users])
</section>

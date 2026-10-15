export const certificateArchive = [
  {name:'Sertifikat K3 Gudang',skill:'K3',level:'Menengah',status:'Terverifikasi',reason:'',file:'sertifikat-k3-raka.pdf',date:'12 Sep 2026'},
  {name:'Sertifikat Pencatatan Stok',skill:'Pencatatan Stok',level:'Menengah',status:'Ditolak',reason:'Nama penerbit pada dokumen tidak sesuai lembaga tujuan.',file:'pencatatan-stok-raka.pdf',date:'08 Sep 2026'},
  {name:'Sertifikat Forklift — Pengajuan Sebelumnya',skill:'Pengoperasian Forklift',level:'Dasar',status:'Ditolak',reason:'Nomor sertifikat tidak terbaca. Unggah kembali dokumen yang lebih jelas.',file:'forklift-raka-scan-lama.pdf',date:'05 Sep 2026'},
]
export const completedParticipants = [
  {name:'Dimas Saputra',date:'15 Sep 2026',training:'Forklift Dasar'},
  {name:'Siti Rahmawati',date:'14 Sep 2026',training:'Forklift Dasar'},
  {name:'Andi Setiawan',date:'12 Sep 2026',training:'Forklift Dasar'},
  {name:'Nadia Putri',date:'10 Sep 2026',training:'Forklift Dasar'},
  {name:'Fajar Hidayat',date:'09 Sep 2026',training:'Forklift Dasar'},
]
export const demoApplications = [
  {job:'Staf Gudang',company:'PT Logistik Nusantara',status:'Sudah Dilamar',date:'2026-09-20',note:'Lamaran dikirim melalui situs sumber.'},
  {job:'Staf Gudang',company:'PT Logistik Nusantara',status:'Diproses',date:'2026-09-24',note:'Menerima konfirmasi dari perusahaan melalui email.'},
  {job:'Staf Gudang',company:'PT Logistik Nusantara',status:'Wawancara',date:'2026-09-28',note:'Wawancara awal dengan bagian operasional.'},
  {job:'Operator Produksi',company:'PT Manufaktur Indonesia',status:'Diproses',date:'2026-09-25',note:'Menunggu kabar tahap berikutnya dari sumber lowongan.'},
  {job:'Admin Inventori',company:'PT Distribusi Sentosa',status:'Disimpan',date:'2026-09-26',note:'Persiapkan keterampilan spreadsheet sebelum melamar.'},
  {job:'Petugas Pengiriman',company:'PT Distribusi Sentosa',status:'Sudah Dilamar',date:'2026-09-27',note:'Lamaran dicatat setelah dikirim di luar aplikasi.'},
  {job:'Operator Packing',company:'PT Manufaktur Indonesia',status:'Tidak Lanjut',date:'2026-09-22',note:'Menerima informasi bahwa seleksi tidak dilanjutkan.'},
]
export const demoRecords = [
  ...['Manajemen Inventori','Pengoperasian Mesin','Pencatatan Produksi','Pengemasan Produk','Pemeriksaan Kualitas','Komunikasi Kerja','Administrasi Dokumen'].map(title=>({title,type:'Skill',status:'Aktif'})),
  ...['Admin Inventori','Operator Forklift','Operator Packing','Petugas Pengiriman','Petugas Kontrol Kualitas'].map(title=>({title,type:'Jabatan',status:'Aktif'})),
  {title:'Petugas Pengiriman',type:'Lowongan',status:'Draft'},
  {title:'Koordinator Gudang',type:'Lowongan',status:'Ditutup'},
  {title:'Staf Administrasi Logistik',type:'Lowongan',status:'Kedaluwarsa'},
  {title:'Operator Mesin',type:'Lowongan',status:'Dinonaktifkan'},
  {title:'Pengenalan Manajemen Inventori',type:'Pelatihan',status:'Draft'},
  {title:'Pengoperasian Mesin Produksi',type:'Pelatihan',status:'Dinonaktifkan'},
]
export const demoFeedback = [
  'Relevan — Persyaratan pencatatan stok sesuai pengalaman saya.',
  'Relevan — Rincian skor membantu memahami skill yang masih perlu ditingkatkan.',
  'Tidak Relevan — Lokasi kerja terlalu jauh dari domisili saya.',
  'Relevan — Pelatihan yang disarankan sesuai gap prioritas.',
  'Relevan — Saya dapat memakai pengalaman produksi untuk pekerjaan gudang.',
  'Tidak Relevan — Hubungan kerja belum sesuai kebutuhan saya.',
]
export const demoActivity = [
  '18 Sep 2026 · Konfigurasi V4 diaktifkan — penyesuaian ambang tampilan',
  '18 Sep 2026 · Lowongan Staf Gudang diterbitkan',
  '17 Sep 2026 · Pelatihan Forklift Dasar diterbitkan',
  '17 Sep 2026 · Pemetaan Operator Produksi → skill diperbarui',
  '16 Sep 2026 · Akun Lembaga Sertifikasi Logistik Nusantara diverifikasi',
  '15 Sep 2026 · Alias Pencatatan Stok diperbarui',
  '14 Sep 2026 · Lowongan Koordinator Gudang ditutup',
  '13 Sep 2026 · Pelatihan Spreadsheet untuk Logistik diterbitkan',
]
export const testProfiles = [
  ['UJI-001','Logistik','4','Lengkap'],['UJI-002','Produksi','3','Lengkap'],['UJI-003','Administrasi','5','Lengkap'],['UJI-004','Logistik','6','Lengkap'],['UJI-005','Produksi','2','Perlu dilengkapi'],['UJI-006','Administrasi','4','Lengkap'],
]
export const testPairs = [
  ['UJI-001','Staf Gudang','55,00','1','3 / 4','Tersedia'],['UJI-002','Operator Produksi','60,00','1','3 / 4','Tersedia'],['UJI-003','Admin Inventori','75,00','1','4 / 4','Tersedia'],['UJI-004','Staf Gudang','85,00','1','4 / 4','Tersedia'],['UJI-005','Operator Packing','40,00','2','—','Belum tersedia'],['UJI-006','Admin Inventori','65,00','2','3 / 4','Tersedia'],['UJI-002','Staf Gudang','45,00','2','2 / 4','Tersedia'],['UJI-004','Admin Inventori','50,00','2','—','Belum tersedia'],
]

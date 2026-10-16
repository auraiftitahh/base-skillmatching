# Perubahan rilis peningkatan — 16 Oktober 2026

- UI Figma diadaptasi menjadi fondasi komponen Blade/CSS responsif; dashboard pelamar diperbarui dengan hierarki hero/kesiapan/indikator/rekomendasi/gap/rencana.
- Navigasi kembali kontekstual, pemeliharaan filter asal, tabs riwayat, dialog konfirmasi/review dan peringatan perubahan belum tersimpan.
- Panduan level, saran skill aktif dari riwayat dan penjelasan perbedaan saran/profil/verifikasi.
- Konteks target dipertahankan lintas gap, pelatihan dan simulasi; tidak memilih lowongan pertama diam-diam.
- Rincian kontribusi dan rumus berangka, cakupan gap terpisah, perubahan level dan tambahan poin simulasi.
- Simulasi beberapa pelatihan menggunakan maksimum capaian dan satu versi konfigurasi; profil tidak dimutasi.
- Bookmark, filter perusahaan/lokasi dan akses analisis banyak target dari daftar.
- Detail pelatihan/sertifikat/peserta dilengkapi, preview file privat, pengajuan ulang dan riwayat kelulusan.
- Pengelolaan skill katalog massal, alur simpan-lanjut, review/publikasi dan audit per objek.
- Impor dua tahap dengan validasi ketat, preview sementara, cancel/commit eksplisit dan pencegahan replay/duplikat.
- Laporan periode/versi, ranking per profil, kelengkapan ahli, metadata versi feedback/evaluasi dan histori yang tidak direkayasa.
- Verifikasi email/kirim ulang dan ubah sandi terautentikasi; aturan publikasi/akses berlaku pada backend.
- Seeder demo opt-in, idempotent dan variatif; tidak mereset konfigurasi/password lama atau mengirim email.
- Migration additive: domisili opsional, metadata konfigurasi nullable dan bookmark. Tidak menghapus tabel/data lama.

Rumus matching utama dan semantik prioritas skill langsung/terkait dipertahankan. Template gabungan tidak dipaksakan menjadi URL baru hanya untuk menyamai nomor layar prototipe. Paket tidak memuat .env, database, log, sesi, upload nyata atau rahasia SMTP.

<?php

namespace App\Support;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/** Mengubah catatan audit teknis menjadi penjelasan yang layak ditampilkan kepada Admin. */
final class AuditPresenter
{
    private const ACTIONS = [
        'account.activate' => 'Mengaktifkan akun',
        'account.deactivate' => 'Menonaktifkan akun',
        'account.verify' => 'Memverifikasi lembaga',
        'account.reject' => 'Menolak verifikasi lembaga',
        'catalog.create' => 'Menambahkan data',
        'catalog.save' => 'Memperbarui data',
        'skill.status' => 'Mengubah status keterampilan',
        'skill.delete' => 'Menghapus keterampilan',
        'catalog.csv_import' => 'Mengimpor data',
        'weight.publish' => 'Menerbitkan aturan pencocokan',
        'vacancy.requirement' => 'Memperbarui persyaratan lowongan',
        'training.skill' => 'Memperbarui capaian pelatihan',
        'training.prerequisite' => 'Mengatur prasyarat pelatihan',
        'taxonomy.mapping' => 'Memetakan keterampilan jabatan',
        'taxonomy.relation' => 'Menghubungkan keterampilan',
        'relation.remove' => 'Menghapus hubungan data',
        'graduation.confirm' => 'Mengonfirmasi kelulusan',
        'certificate.verified' => 'Menyetujui sertifikat',
        'certificate.rejected' => 'Menolak sertifikat',
        'evaluation.profile' => 'Menyimpan profil evaluasi',
        'evaluation.pair' => 'Menyimpan penilaian evaluasi',
    ];

    private const SUBJECTS = [
        'skills' => ['Keterampilan', 'name'],
        'jobs_taxonomy' => ['Jabatan', 'name'],
        'job_vacancies' => ['Lowongan', 'title'],
        'trainings' => ['Pelatihan', 'title'],
        'users' => ['Akun', 'name'],
        'certificates' => ['Sertifikat', 'title'],
        'weight_configurations' => ['Konfigurasi bobot', 'version'],
        'training_enrollments' => ['Peserta pelatihan', null],
        'job_required_skills' => ['Persyaratan lowongan', null],
        'training_skills' => ['Capaian pelatihan', null],
        'training_prerequisites' => ['Prasyarat pelatihan', null],
        'job_skills_mapping' => ['Pemetaan jabatan', null],
        'skill_relations' => ['Hubungan keterampilan', null],
        'evaluation_profiles' => ['Profil uji', 'code'],
        'evaluation_pairs' => ['Pasangan evaluasi', null],
    ];

    public static function entries(Collection $logs): Collection
    {
        if ($logs->isEmpty()) return collect();

        $actors = DB::table('users')->whereIn('id', $logs->pluck('user_id')->filter()->unique()->all())
            ->pluck('name', 'id');
        $nameMaps = [];
        foreach (self::SUBJECTS as $table => [$label, $field]) {
            if ($field === null) continue;
            $ids = $logs->where('subject_type', $table)->pluck('subject_id')->filter()->unique()->all();
            $nameMaps[$table] = $ids ? DB::table($table)->whereIn('id', $ids)->pluck($field, 'id') : collect();
        }

        return $logs->map(static function ($entry) use ($actors, $nameMaps) {
            $details = json_decode((string) ($entry->details ?? '{}'), true);
            if (!is_array($details)) $details = [];
            [$kind] = self::SUBJECTS[$entry->subject_type] ?? ['Data platform'];
            $name = $nameMaps[$entry->subject_type][$entry->subject_id] ?? $details['name'] ?? null;
            if ($entry->subject_type === 'weight_configurations' && $name) $name = 'Versi '.$name;

            $description = [];
            if (filled($details['status'] ?? null)) $description[] = 'Status: '.$details['status'];
            if (filled($details['reason'] ?? null)) $description[] = 'Alasan: '.$details['reason'];
            if (isset($details['success'])) $description[] = 'Berhasil: '.(int)$details['success'].' data';
            if (isset($details['errors'])) $description[] = 'Perlu diperbaiki: '.(int)$details['errors'].' data';

            return (object) [
                'when' => Carbon::parse($entry->created_at)->locale('id')->translatedFormat('d F Y, H.i'),
                'actor' => $actors[$entry->user_id] ?? 'Admin (akun tidak tersedia)',
                'label' => self::ACTIONS[$entry->action] ?? 'Memperbarui data platform',
                'subject' => $kind.($name ? ' — '.$name : ''),
                'description' => implode(' · ', $description),
            ];
        });
    }
}

<?php
namespace App\Support;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

final class PageExperience
{
    public static function enrich(array $data, Request $r): array
    {
        $role=$data['role']; $page=$data['page'];
        $parent=match(true) {
            $page==='simulasi/hasil'=>'simulasi',
            str_starts_with($page,'profil/')=>'profil',
            str_contains($page,'/')=>explode('/',$page)[0],
            in_array($page,['saran-skill','skill/konfirmasi','profil','riwayat'])=>'riwayat',
            default=>'dashboard',
        };
        if($role==='sertifikasi' && in_array($page,['pelatihan/peserta/detail','pelatihan/kelulusan']))$parent='pelatihan/peserta';
        $data['contextQuery']=array_filter(['job_id'=>$r->integer('job_id')?:null,'jobs'=>$data['selectedJobIds']??null]);
        $data['backUrl']='/'.$role.'/'.$parent.($data['contextQuery']?'?'.http_build_query($data['contextQuery']):'');
        $return=(string)$r->query('return','');
        if(str_starts_with($return,'/'.$role.'/')&&!preg_match('/[\r\n\\\\]/',$return)&&!str_contains($return,'..'))$data['backUrl']=$return;
        $data['backLabel']=$parent==='dashboard'?'Kembali ke beranda':'Kembali ke '.mb_strtolower($data['navigation'][$parent]??'daftar');
        if($return!==''&&$data['backUrl']===$return)$data['backLabel']='Kembali ke halaman asal';
        $data['pageDescription']=match($data['viewKey']) {
            'skill-edit'=>'Konfirmasikan kemampuan Anda. Pilihan baru dicatat setelah disimpan.',
            'vacancy-list'=>'Peluang terdekat dengan keterampilan Anda. Skor bukan jaminan diterima kerja.',
            'vacancy-score'=>'Pahami keterampilan yang sudah sesuai dan yang masih dapat ditingkatkan.',
            'gap'=>'Kenali kebutuhan yang belum terpenuhi dan tentukan langkah berikutnya.',
            'training-list'=>'Temukan pelatihan untuk menutup kesenjangan pada lowongan target Anda.',
            'simulation-form','simulation-result'=>'Lihat dampak potensial pelatihan tanpa mengubah profil aktual.',
            'dashboard'=>'Selamat datang kembali. Mari lanjutkan perjalanan Anda.',
            'profile'=>'Lengkapi informasi dasar agar perjalanan Anda lebih terarah.',
            'experience-list'=>'Ceritakan pengalaman Anda untuk menemukan keterampilan yang relevan.',
            'experience-form'=>'Catat pekerjaan, pendidikan, atau pengalaman belajar Anda.',
            'skill-suggestions'=>'Keterampilan yang relevan berdasarkan pengalaman Anda.',
            'certificate-list'=>'Pantau pengajuan dan verifikasi sertifikat keterampilan Anda.',
            'application-list'=>'Catat dan pantau perjalanan lamaran pekerjaan Anda.',
            'training-progress'=>'Pantau pembelajaran dan konfirmasikan pelatihan yang sudah selesai.',
            'accounts'=>'Kelola akses akun, verifikasi email, dan persetujuan lembaga.',
            'weights'=>'Atur prioritas keterampilan untuk perhitungan kecocokan.',
            default=>'',
        };
        if($role==='pelamar') {
            $data['suggestedIds']=DB::table('job_skills_mapping')->whereIn('job_taxonomy_id',
                $data['experiences']->pluck('job_taxonomy_id')->filter())->pluck('skill_id')->unique()->all();
            $data['skills']=$data['skills']->sortBy(fn($s)=>in_array($s->id,$data['suggestedIds'])?0:1)->values();
            $data['bookmarkIds']=DB::table('vacancy_bookmarks')->where('user_id',$data['u']->id)->pluck('job_vacancy_id')->all();
            $data['contextJobs']=$data['allVacancies']->whereIn('id',$data['selectedJobIds']);
            $data['trainingDetail']=$r->filled('training_id') ? Publication::trainings()->findOrFail($r->integer('training_id')) : null;
            $data['trainingOutcomes']=$data['trainingDetail'] ? self::outcomes($data['trainingDetail']->id) : collect();
            if($page==='lowongan/detail' && $data['currentJob']) {
                $data['displayTitle']=$data['currentJob']->title;
                $data['pageDescription']=$data['currentJob']->company.' · '.$data['currentJob']->location;
            }
            if($page==='pelatihan/detail' && $data['trainingDetail']) {
                $data['displayTitle']=$data['trainingDetail']->title;
                $data['pageDescription']=$data['trainingDetail']->provider;
            }
            if($page==='dashboard') $data['displayTitle']='Langkah baru, peluang baru.';
            if($page==='lowongan/skor') $data['displayTitle']='Memahami skor kecocokan';
            $data['trainingPrerequisites']=$data['trainingDetail'] ? DB::table('training_prerequisites as p')
                ->join('trainings as t','t.id','=','p.prerequisite_id')->where('p.training_id',$data['trainingDetail']->id)->select('t.id','t.title')->get():collect();
            $data['selectedOption']=collect($data['options'])->firstWhere('id',$data['trainingDetail']?->id);
            $data['readinessPercent']=(int)round(100*(($data['u']->name?1:0)+($data['experiences']->isNotEmpty()?1:0)+($data['ownedSkills']->isNotEmpty()?1:0))/3);
        }
        if($role==='sertifikasi' && $page==='pelatihan/peserta' && $r->integer('training_id')) {
            $training=$data['trainings']->firstWhere('id',$r->integer('training_id'));
            if($training) {$data['displayTitle']='Peserta · '.$training->title;$data['pageDescription']='Tinjau peserta dan konfirmasikan kelulusan sesuai kewenangan lembaga.';}
        }
        if($role==='pelamar' && $page==='simulasi/hasil') $data['displayTitle']='Dampak potensial pada kecocokan';
        if($role==='pelamar' && $page==='lamaran/detail') $data['displayTitle']='Detail catatan lamaran';
        if($role==='admin' && $data['viewKey']==='catalog-form') {
            $label=match(explode('/',$page)[0]) {'skill'=>'keterampilan','jabatan'=>'jabatan','lowongan'=>'lowongan',default=>'pelatihan'};
            $data['displayTitle']=($r->integer('id')?'Ubah ':'Tambah ').$label;
        }
        if($role==='admin') {
            $r->validate(['from'=>'nullable|date','to'=>'nullable|date|after_or_equal:from','version'=>'nullable|integer|exists:weight_configurations,id']);
            $data['configurationVersions']=DB::table('weight_configurations')->pluck('version','id');
            if($page==='evaluasi/umpan-balik')$data['feedback']=$data['feedback']->filter(fn($x)=>!$r->filled('version')||(int)$x->weight_configuration_id===$r->integer('version'))->values();
            if(str_starts_with($page,'laporan'))$data['evalPairs']=$data['evalPairs']->filter(fn($x)=>(!$r->from||substr($x->created_at,0,10)>=$r->from)&&(!$r->to||substr($x->created_at,0,10)<=$r->to)&&(!$r->filled('version')||(int)$x->weight_configuration_id===$r->integer('version')))->values();
            $data['creatorNames']=DB::table('users')->pluck('name','id');
            $data['evalRanks']=[];
            foreach(collect($data['evalPairs'])->groupBy('evaluation_profile_id') as $pairs) {
                foreach($pairs as $pair)$data['evalRanks'][$pair->id]=1+$pairs->filter(fn($x)=>(float)$x->system_score>(float)$pair->system_score)->count();
            }
        }
        return $data;
    }

    public static function outcomes(int $trainingId)
    {
        return DB::table('training_skills as ts')->join('skills as s','s.id','=','ts.skill_id')
            ->where('ts.training_id',$trainingId)->select('s.name','ts.skill_id','ts.target_level')->get();
    }
}

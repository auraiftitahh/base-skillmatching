<?php
namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class DatabaseSeeder extends Seeder {
 public function run():void {
  $ownerEmail=env('OWNER_EMAIL','admin@skillmatching.local');$ownerPassword=env('OWNER_PASSWORD');
  if(!$ownerPassword||strlen($ownerPassword)<12)throw new \RuntimeException('Set OWNER_PASSWORD minimal 12 karakter pada .env sebelum menjalankan seeder.');
  $admin=User::firstOrCreate(['email'=>$ownerEmail],['name'=>'Admin Platform','password'=>$ownerPassword,'email_verified_at'=>now(),'role'=>'admin','is_active'=>true]);
  DB::table('weight_configurations')->updateOrInsert(['version'=>1],['required_weight'=>3,'preferred_weight'=>1,'related_factor'=>.5,'threshold'=>40,'reason'=>'Konfigurasi awal','created_by'=>$admin->id,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()]);
  if(!filter_var(env('DEMO_SEED',false),FILTER_VALIDATE_BOOLEAN)){$this->command->info('Data demo tidak dibuat (DEMO_SEED=false).');return;}
  $pass=env('DEMO_PASSWORD','');if(strlen($pass)<12)throw new \RuntimeException('DEMO_PASSWORD minimal 12 karakter.');
  $applicant=User::firstOrCreate(['email'=>'raka@example.com'],['name'=>'Raka Pratama','password'=>$pass,'email_verified_at'=>now(),'role'=>'pelamar','is_active'=>true,'employment_status'=>'laid_off']);
  $bodyUser=User::firstOrCreate(['email'=>'kontak@logistiknusantara.id'],['name'=>'Lembaga Logistik Nusantara','password'=>$pass,'email_verified_at'=>now(),'role'=>'sertifikasi','is_active'=>true]);
  DB::table('certification_bodies')->updateOrInsert(['user_id'=>$bodyUser->id],['name'=>'Lembaga Sertifikasi Logistik Nusantara','contact'=>'kontak@logistiknusantara.id','status'=>'active','verified_at'=>now(),'created_at'=>now(),'updated_at'=>now()]);
  $bodyId=DB::table('certification_bodies')->where('user_id',$bodyUser->id)->value('id');
  $baseSkills=['Pencatatan Stok','Pengoperasian Forklift','Spreadsheet','K3','Manajemen Inventori','Pengoperasian Mesin','Pencatatan Produksi','Pengemasan Produk','Pemeriksaan Kualitas','Komunikasi Kerja','Administrasi Dokumen','Kontrol Mutu','Manajemen Gudang','Penerimaan Barang','Pengiriman Barang','Distribusi Logistik','Pengolahan Data','Layanan Pelanggan','Pemeliharaan Mesin','Operasional Produksi','Pemrosesan Pesanan','Pembelian Barang','Pengendalian Persediaan','Pengecekan Dokumen','Pemantauan Distribusi','Perencanaan Produksi','Dasar Akuntansi','Administrasi Perkantoran','Manajemen Keselamatan','Audit Persediaan'];
  $extra=['Dasar','Lanjutan','Digital','Industri','Operasional'];$seedSkills=$baseSkills;
  foreach($baseSkills as $name){foreach($extra as $suffix){$candidate=$name.' '.$suffix;if(count($seedSkills)<150)$seedSkills[]=$candidate;}}
  foreach($seedSkills as $i=>$name){DB::table('skills')->updateOrInsert(['name'=>$name],['category'=>in_array($i%5,[0,1])?'Logistik':'Produksi','aliases'=>json_encode([]),'is_active'=>true,'created_at'=>now(),'updated_at'=>now()]);}
  $sid=DB::table('skills')->pluck('id','name')->all();
  $jobNames=['Staf Gudang','Admin Inventori','Operator Produksi','Operator Packing','Petugas Pengiriman','Operator Forklift','Koordinator Gudang','Petugas Kualitas','Staf Logistik','Staf Administrasi','Admin Produksi','Petugas Penerimaan Barang','Supervisor Produksi','Petugas Distribusi','Operator Mesin','Petugas Stok','Analis Persediaan','Staf Dokumentasi','Staf Pembelian','Pengendali Persediaan'];
  foreach($jobNames as $i=>$name){DB::table('jobs_taxonomy')->updateOrInsert(['name'=>$name],['is_active'=>true,'created_at'=>now(),'updated_at'=>now()]);$tid=DB::table('jobs_taxonomy')->where('name',$name)->value('id');foreach(array_slice($baseSkills,$i%25,4) as $skill){DB::table('job_skills_mapping')->insertOrIgnore(['job_taxonomy_id'=>$tid,'skill_id'=>$sid[$skill]]);}}
  DB::table('skill_relations')->insertOrIgnore(['skill_id'=>$sid['Pengoperasian Forklift'],'related_skill_id'=>$sid['Pengoperasian Mesin']]);
  $source='https://karirhub.kemnaker.go.id';
  for($i=0;$i<60;$i++){
   $title=$jobNames[$i%20].($i>=20?' (Contoh '.(int)($i/20+1).')':'');
   $company=['PT Logistik Nusantara','PT Manufaktur Indonesia','PT Distribusi Sentosa'][$i%3];
   DB::table('job_vacancies')->updateOrInsert(['title'=>$title,'company'=>$company],['description'=>'Lowongan contoh untuk uji aplikasi. Bukan lowongan riil yang diverifikasi.','location'=>'Surabaya','employment_type'=>'Kontrak','source'=>'DATA CONTOH / DEMO','source_url'=>$source,'fetched_at'=>now()->toDateString(),'expires_at'=>now()->addDays(90)->toDateString(),'status'=>'active','created_at'=>now(),'updated_at'=>now()]);
   $jobId=DB::table('job_vacancies')->where(['title'=>$title,'company'=>$company])->value('id');
   $requirements=$i===0?[['Pencatatan Stok',2,'required',3],['Pengoperasian Forklift',2,'required',3],['Spreadsheet',2,'required',3],['K3',1,'preferred',1]]:array_map(fn($s)=>[$s,2,'required',3],array_slice($baseSkills,($i*2)%26,3));
   foreach($requirements as [$skill,$level,$importance,$weight]){DB::table('job_required_skills')->updateOrInsert(['job_vacancy_id'=>$jobId,'skill_id'=>$sid[$skill]],['minimum_level'=>$level,'importance'=>$importance,'weight'=>$weight,'is_override'=>false,'created_at'=>now(),'updated_at'=>now()]);}
  }
  for($i=0;$i<40;$i++){
   $name=($i===0?'Forklift Dasar':($i===1?'Spreadsheet untuk Logistik':('Pelatihan '.$baseSkills[$i%count($baseSkills)]))).($i>=30?' (Contoh)': '');
   DB::table('trainings')->updateOrInsert(['title'=>$name],['provider'=>'Penyedia Pelatihan Contoh','description'=>'Data pelatihan sintetis untuk demonstrasi, bukan penawaran resmi.','mode'=>$i%2?'online':'hybrid','duration_hours'=>8+($i%6)*4,'weekly_hours'=>2+($i%4),'cost'=>($i%6)*100000,'source'=>'DATA CONTOH / DEMO','source_url'=>'https://skillhub.kemnaker.go.id','fetched_at'=>now()->toDateString(),'status'=>'active','certification_body_id'=>$i===0?$bodyId:null,'created_at'=>now(),'updated_at'=>now()]);
   $trainId=DB::table('trainings')->where('title',$name)->value('id');$skill=$i===0?'Pengoperasian Forklift':($i===1?'Spreadsheet':$baseSkills[$i%count($baseSkills)]);
   DB::table('training_skills')->updateOrInsert(['training_id'=>$trainId,'skill_id'=>$sid[$skill]],['target_level'=>2,'created_at'=>now(),'updated_at'=>now()]);
  }
  foreach(['Pencatatan Stok'=>3,'Spreadsheet'=>1,'K3'=>2] as $name=>$level){DB::table('user_skills')->updateOrInsert(['user_id'=>$applicant->id,'skill_id'=>$sid[$name]],['level'=>$level,'verification_status'=>$name==='K3'?'verified':'self_reported','created_at'=>now(),'updated_at'=>now()]);}
  $tid=DB::table('jobs_taxonomy')->where('name','Operator Produksi')->value('id');
  DB::table('user_experiences')->updateOrInsert(['user_id'=>$applicant->id,'title'=>'Operator Produksi'],['type'=>'work','organization'=>'PT Manufaktur Indonesia','start_date'=>'2022-01-01','end_date'=>'2025-03-01','job_taxonomy_id'=>$tid,'created_at'=>now(),'updated_at'=>now()]);
  $forkliftTraining=DB::table('trainings')->where('title','Forklift Dasar')->value('id');DB::table('training_enrollments')->updateOrInsert(['user_id'=>$applicant->id,'training_id'=>$forkliftTraining],['status'=>'waiting_confirmation','created_at'=>now(),'updated_at'=>now()]);
  $this->command->warn('Demo seed aktif: data lowongan/pelatihan sintetis, bukan data pasar kerja aktual. Ganti sebelum produksi.');
 }
}

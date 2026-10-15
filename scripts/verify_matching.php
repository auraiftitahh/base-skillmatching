<?php
require __DIR__.'/../app/Services/MatchingCalculator.php';
use App\Services\MatchingCalculator;
$r=[];foreach([[1,'Pencatatan Stok',2,'required'],[2,'Forklift',2,'required'],[3,'Spreadsheet',2,'required'],[4,'K3',1,'preferred']] as [$id,$name,$level,$imp]){
 $r[]=['skill_id'=>$id,'skill'=>$name,'target'=>$level,'importance'=>$imp,'weight'=>$imp==='required'?3:1,'is_override'=>false];
}
$c=['required_weight'=>3,'preferred_weight'=>1,'related_factor'=>.5];
$checks=[['awal',[1=>3,3=>1,4=>2],[],55.0],['forklift',[1=>3,2=>2,3=>1,4=>2],[],85.0],['semua skill',[1=>3,2=>2,3=>2,4=>2],[],100.0],['skill terkait',[1=>3,3=>1,4=>2],[2=>[2]],70.0]];
foreach($checks as [$name,$owned,$rel,$expected]){$actual=MatchingCalculator::calculate($r,$owned,$rel,$c)['score'];if($actual!==$expected){fwrite(STDERR,"GAGAL {$name}: {$actual} (seharusnya {$expected})\n");exit(1);}echo "LULUS {$name}: {$actual}\n";}

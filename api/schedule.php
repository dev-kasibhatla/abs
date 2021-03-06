<?php
if(($sdate=date_create_from_format("!Y#n#j",$_POST['sdate']??null))===FALSE)
	throw new Exception("Invalid start date provided",400);
if(($edate=date_create_from_format("!Y#n#j",$_POST['edate']??null))===FALSE)
	$edate=clone $sdate/*->add(new DateInterval("P1D"))*/;
if(date_diff($sdate,$edate,1)->days>31)
	throw new Exception("Too long date range",400);

$sdatef=$sdate->format("Y-m-d");
$edatef=$edate->format("Y-m-d");

$db=my_sqli_connect();
$q=$db->query("SELECT `bdate`,`tslot`,`approved` FROM `booking`
	WHERE `bdate`>='".$db->escape_string($sdatef)."'
	AND `bdate`<='".$db->escape_string($edatef)."'
");
$db->close();

require_once 'slots.php';
if(!$q)
	throw new Exception(SL_ERR,500);
$q=$q->fetch_all(MYSQLI_ASSOC);

$result=[];
while($sdate<=$edate) {
	$sdatef=$sdate->format("Y-m-d");
	$result[$sdatef]=array_fill(SL_MIN,SL_MAX+1,1);
	array_filter($q,function($v) use(&$result,$sdatef){
		if($v['bdate']===$sdatef) {
			if($result[$sdatef][$v['tslot']]===-1)
				return false;
			if($v['approved']==1)
				$result[$sdatef][$v['tslot']]=0;
			elseif($v['approved']==0)
				$result[$sdatef][$v['tslot']]=-1;
			return false;
		}
	},0);
	$sdate->add(new DateInterval("P1D"));
}

header('Content-Type: application/json');
exit(json_encode($result));
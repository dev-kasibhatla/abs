<?php
require_once 'auth.php';
requireauth();
require_once 'slots.php';

$db=my_sqli_connect();
if(!$p=$db->query("SELECT `id`,`name`,`detail`,`link`
	FROM `event`
	WHERE `club`=".$db->escape_string($_SESSION['id'])
)) throw new Exception(SL_ERR,500);
$p=$p->fetch_all(MYSQLI_ASSOC);

$result=[];
foreach($p as $r) {
	$result[]=$r;
	end($result);
	$event=key($result);
	$result[$event]['tslot']=[];
	unset($result[$event]['id']);

	if(!$q=$db->query("SELECT `bdate`,`tslot`,`approved`
		FROM `booking`
		WHERE `event`=".$db->escape_string($r['id'])
	)) throw new Exception(SL_ERR,500);
	$q=$q->fetch_all(MYSQLI_ASSOC);

	//	0 - not booked,	1 - booking confirmed,	2 - booking queued
	foreach($q as $s) {
		if(empty($result[$event]['tslot'][$s['bdate']]))
			$result[$event]['tslot'][$s['bdate']]=array_fill(SL_MIN,SL_MAX+1,0);
		if($result[$event]['tslot'][$s['bdate']][$s['tslot']]===1)
			continue;
		if($s['approved']==1)
			$result[$event]['tslot'][$s['bdate']][$s['tslot']]=1;
		elseif($s['approved']==0)
			$result[$event]['tslot'][$s['bdate']][$s['tslot']]=2;
	}
}

header('Content-Type: application/json');
header('Connection: close');
exit(json_encode($result));
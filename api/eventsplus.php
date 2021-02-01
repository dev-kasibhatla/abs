<?php
if(($sdate=date_create_from_format("!Y#n#j",$_POST['sdate']??null))===FALSE)
	throw new Exception("Invalid start date provided",400);
if(!ctype_digit($limit=$_POST['limit']??null) || $limit>30)
	$limit=10;
require_once 'slots.php';
if(!ctype_digit($sslot=$_POST['sslot']??null) || $sslot<SL_MIN || $sslot>SL_MAX)
	throw new Exception("Invalid start slot provided",400);

$sdatef=$sdate->format("Y-m-d");
$db=my_sqli_connect();

if(!$p=$db->query("SELECT `event`.`id` AS `id`, `event`.`name` AS `name`, `event`.`detail` AS `detail`, `event`.`link` AS `link`
	FROM `event` RIGHT JOIN `booking` ON `event`.`id`=`booking`.`event` WHERE
	(`booking`.`bdate`>='".$db->escape_string($sdatef)."' AND `booking`.`tslot`>=$sslot) OR
	`booking`.`bdate`>'".$db->escape_string($sdatef)."'
	LIMIT $limit"
))
	throw new Exception(SL_ERR,500);
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
exit(json_encode($result));
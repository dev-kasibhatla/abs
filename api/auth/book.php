<?php
require_once 'auth.php';
requireauth();

//To-do: Input validation
if(!is_array($_POST['slots']) || empty($_POST['slots']))
	throw new Exception("At least one valid slot must be selected for the provided event",400);

$db=my_sqli_connect();
$q=$db->query("INSERT INTO `event`(`name`,`detail`,`link`,`club`) VALUES(".
	"'".$db->escape_string($_POST['ename'])."',".
	"'".$db->escape_string($_POST['edesc'])."',".
	"'".$db->escape_string($_POST['elink'])."',".
	$db->escape_string($_SESSION['id']).")"
);

if(!$q || $db->affected_rows!==1)
	throw new Exception("Unexpected error occurred while creating new event, please try again.",500);

$q=$db->insert_id;

require_once 'slots.php';
foreach($_POST['selectedSlots'] as $date=>$slots) {
	if(!is_array($slots) || empty($slots))
		continue;
	for($i=SL_MIN;$i<SL_MAX;++$i)
	if(boolval($slots[$i]??false)) {
		$r=$db->query("SELECT `id` FROM `booking` WHERE `bdate`='".$db->escape_string($date)."' AND `tslot`=$i");
		if($r && $r->num_rows===0)
			$db->query("INSERT INTO `booking`(`club`,`bdate`,`tslot`) VALUES(".
				"{$_SESSION['id']},'".$db->escape_string($date)."',$i".
			")");
		elseif($r && $r->num_rows===1) {
			$r=$r->fetch_assoc();
			$db->query("INSERT INTO `booking`(`club`,`bdate`,`tslot`,`approved`) VALUES(".
				"{$_SESSION['id']},'".$db->escape_string($date)."',$i,".intval(!boolval($r['approved']??false)).
			")");
		}
		else if($r && $r->num_rows===2)
			throw new Exception("One or more selected slots are no longer available, please reload and try again.",400);
		else
			throw new Exception("An unexpected database error occurred",500);
	}
}

if(!$db->commit())
	throw new Exception("Unexpected error occurred while adding slots for event, try again shortly.",500);

sexit("Booking successful!");
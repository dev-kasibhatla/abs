<?php
$db=my_sqli_connect();
$q=$db->query("SELECT * FROM `school`");
header('Content-Type: application/json');
if($q)
	exit(json_encode($q->fetch_all(MYSQLI_ASSOC)));
else
	exit(json_encode([["id"=>0,"name"=>"Error getting list of schools"]]));
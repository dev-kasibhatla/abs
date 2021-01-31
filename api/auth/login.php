<?php
require_once 'auth.php';
$x=initauth(true);

function getuser() {
if(empty($_SESSION)) return [];
else return [
	'email'=>$_SESSION['email'],
	'phone'=>$_SESSION['phone'],
	'name'=>$_SESSION['name'],
	'rname'=>$_SESSION['rname'],
	'remail'=>$_SESSION['remail'],
	'rdept'=>$_SESSION['rdept'],
	'ename'=>$_SESSION['ename'],
	'eschool'=>$_SESSION['eschool'],
	'registered'=>$_SESSION['registered'],
	'lastlogin'=>$_SESSION['lastlogin'],
	'lastloginip'=>$_SESSION['lastloginip']
];}

if($x && empty($_GET) && empty($_POST)) {
	header('Content-Type: application/json');
	exit(json_encode(getuser()));
}

$email=$_POST['email']??NULL;
if( !is_string($email) ||
	strlen($email)>A_EMAIL_MAX ||
	!($email=filter_var($email,FILTER_VALIDATE_EMAIL))
)
    throw new Exception(A_EM_ERR,400);

$db=my_sqli_connect();
$em=$db->escape_string($email);
$q=$db->query("SELECT * FROM `club` WHERE `email`='$em'");

if( $q->num_rows===0 || !(($q=$q->fetch_assoc())['enabled']) ||
    !password_verify($_POST['password']??null,$q['password'])
)
	throw new Exception("Invalid credentials or account disabled",401);

$db->autocommit(true);
$db->query("UPDATE `club` SET `lastlogin`=NOW(),`lastloginip`=INET6_ATON('".
	$db->escape_string($_SERVER['REMOTE_ADDR'])
."')");

session_start();
$_SESSION=$q;
//$_SESSION['lastlogin']=date('Y-m-d H:i:s');
//$_SESSION['lastloginip']=$_SERVER['REMOTE_ADDR'];

// To-do: ~Remove useless data~, add and validate login timestamp
session_commit();

exit(json_encode(getuser()));
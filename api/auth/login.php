<?php
require_once 'auth.php';
$x=initauth(true);

if($x && empty($_GET) && empty($_POST)) {
	header('Content-Type: application/json');
	exit(json_encode([
		'email'=>$_SESSION['email'],
		'phone'=>$_SESSION['phone'],
		'name'=>$_SESSION['name'],
		'rname'=>$_SESSION['rname'],
		'remail'=>$_SESSION['remail'],
		'rschool'=>$_SESSION['rschool'],
		'rdept'=>$_SESSION['rdept'],
		'ename'=>$_SESSION['ename'],
		'lastlogin'=>$_SESSION['lastlogin'],
		'lastloginip'=>$_SESSION['lastloginip']
	]));
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
	$db->escape_string($_SERVER['REQUEST_ADDR'])
."')");

session_start();
$_SESSION=$q;
// To-do: Remove useless data, add and validate login timestamp
session_commit();

exit(json_encode([
	'email'=>$_SESSION['email'],
	'phone'=>$_SESSION['phone'],
	'name'=>$_SESSION['name'],
	'rname'=>$_SESSION['rname'],
	'remail'=>$_SESSION['remail'],
	'rschool'=>$_SESSION['rschool'],
	'rdept'=>$_SESSION['rdept'],
	'ename'=>$_SESSION['ename'],
	'lastlogin'=>$_SESSION['lastlogin'],
	'lastloginip'=>$_SESSION['lastloginip']
]));
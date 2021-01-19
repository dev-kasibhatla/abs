<?php
require_once 'auth.php';
initauth();

$email=$_POST['email']??NULL;
if( !is_string($email) ||
	strlen($email)>A_EMAIL_MAX ||
	!boolval($email=filter_var($email,FILTER_VALIDATE_EMAIL))
)
    throw new Exception(A_EM_ERR,400);

$db=my_sqli_connect();
$em=$db->escape_string($email);
$q=$db->query("SELECT * FROM `club` WHERE `email`='$em'");

if( $q->num_rows===0 || !(($q=$q->fetch_assoc())['enabled']) ||
    !password_verify($_POST['password']??null,$q['password'])
)
	throw new Exception("This account does not exist",401);

session_start();
$_SESSION=$q;
// To-do: Remove useless data, add and validate login timestamp
session_commit();
sexit("Welcome ".$q['name']);

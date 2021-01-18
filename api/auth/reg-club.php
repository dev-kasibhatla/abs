<?php
require_once 'auth.php';

if(
	!filter_var($_POST['email']??null,FILTER_VALIDATE_EMAIL) ||
	strlen($_POST['email'])>A_EMAIL_MAX
)
	throw new Exception(A_EM_ERR,400);

if(
	!ctype_digit($_POST['phone']??null) ||
	strlen($_POST['phone'])!==10
)
	throw new Exception("Phone must be exactly 10 digits",400);

if(
	!is_string($_POST['name']??null) ||
	empty($_POST['name']=trim($_POST['name'])) ||
	strlen($_POST['name'])>A_NAME_MAX
)
	throw new Exception("Name must be a string with 1-".A_NAME_MAX." characters",400);

if(
	!is_string($_POST['rname']??null) ||
	empty($_POST['rname']=trim($_POST['rname'])) ||
	strlen($_POST['rname'])>A_NAME_MAX
)
	throw new Exception("Representative name must be a string with 1-".A_NAME_MAX." characters",400);

if(
	!filter_var($_POST['remail']??null,FILTER_VALIDATE_EMAIL) ||
	strlen($_POST['remail'])>A_EMAIL_MAX
)
	throw new Exception("Representative ".A_EM_ERR,400);

if(
	!is_string($_POST['password']??null) ||
	strlen($_POST['password'])<8 ||
	// At least one digit
	empty($_POST['password']=password_hash($_POST['password'],PASSWORD_BCRYPT))
)
	throw new Exception("Password should be a non-empty string",400);

$db=my_sqli_connect();
$q=$db->query("INSERT IGNORE INTO `clubs`(`name`,`email,`password`,`phone`,`rname`,`remail`,`enabled`) VALUES".
	"('".$db->escape_string($_POST['name'])."',".
	"'".$db->escape_string($_POST['email'])."',".
	"'".$db->escape_string($_POST['password'])."',".
	$db->escape_string($_POST['phone']).",".
	"'".$db->escape_string($_POST['rname'])."',".
	"'".$db->escape_string($_POST['remail'])."',1)"
);

if(!$q)
	throw new Exception(A_CR_ERR,500);
if($db->affected_rows!==1)
	throw new Exception("An account with this email address already exists. Please login to use the existing account",409);
if(!$db->commit())
	throw new Exception(A_CR_ERR,500);

sexit('Your account has been successfully created.');

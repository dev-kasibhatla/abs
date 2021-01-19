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
	throw new Exception(A_NM_ERR,400);

if(
	!is_string($_POST['inputMentorName']??null) ||
	empty($_POST['inputMentorName']=trim($_POST['inputMentorName'])) ||
	strlen($_POST['inputMentorName'])>A_NAME_MAX
)
	throw new Exception("Mentor ".A_NM_ERR,400);

if(
	!is_string($_POST['rname']??null) ||
	empty($_POST['rname']=trim($_POST['rname'])) ||
	strlen($_POST['rname'])>A_NAME_MAX
)
	throw new Exception("Representative ".A_NM_ERR,400);

if(
	!ctype_digit($_POST['inputSchool']??null) ||
	intval($_POST['inputSchool'])>127
)
	throw new Exception("Representative school identifier is invalid",400);

if(
	!filter_var($_POST['inputMentorEmail']??null,FILTER_VALIDATE_EMAIL) ||
	strlen($_POST['inputMentorEmail'])>A_EMAIL_MAX
)
	throw new Exception("Mentor ".A_EM_ERR,400);

if(
	!is_string($_POST['inputMentorDept']??null) ||
	empty($_POST['inputMentorDept']=trim($_POST['inputMentorDept'])) ||
	strlen($_POST['inputMentorDept'])>A_NAME_MAX
)
	throw new Exception("Mentor Department ".A_NM_ERR,400);

if(
	!is_string($_POST['password']??null) ||
	strlen($_POST['password'])<8 ||
	preg_match('/.*\d+.*/',$_POST['password'])!==1 ||
	$_POST['password']=password_hash($_POST['password'],PASSWORD_BCRYPT)
)
	throw new Exception("Password should be a string of length at least 8 and must contain at least one digit",400);

$db=my_sqli_connect();
$q=$db->query("INSERT IGNORE INTO `clubs`".
"(`name`,`email,`password`,`phone`,`rname`,`rdept`,`remail`,`ename`,`eschool`,`enabled`) VALUES(".
	"'".$db->escape_string($_POST['name'])."',".
	"'".$db->escape_string($_POST['email'])."',".
	"'".$db->escape_string($_POST['password'])."',".
	$_POST['phone'].",".
	"'".$db->escape_string($_POST['inputMentorName'])."',".
	"'".$db->escape_string($_POST['inputMentorDept'])."',".
	"'".$db->escape_string($_POST['inputMentorEmail'])."',".
	"'".$db->escape_string($_POST['rname'])."',".
	$_POST['inputSchool'].",".
	"1)"
);

if(!$q)
	throw new Exception(A_CR_ERR,500);
if($db->affected_rows!==1)
	throw new Exception("An account with this email address already exists. Please login to use the existing account",409);
if(!$db->commit())
	throw new Exception(A_CR_ERR,500);

sexit('Your account has been successfully created.');

<?php
require_once 'auth.php';
requireauth();

if(
	!empty($_POST['name']) && (
	!is_string($_POST['name']) ||
	empty($_POST['name']=trim($_POST['name'])) ||
	strlen($_POST['name'])>A_NAME_MAX
))
	throw new Exception(A_NM_ERR,400);

if(
	!empty($_POST['url']) && (
	!filter_var($_POST['url'],FILTER_VALIDATE_URL) ||
	strlen($_POST['url'])>A_URL_MAX
))
	throw new Exception("URL must be valid with 1-".A_URL_MAX." characters",400);

if(
	!empty($_POST['phone']) && (
	!ctype_digit($_POST['phone']) ||
	strlen($_POST['phone'])!==A_PHN_EXT
))
	throw new Exception(A_PH_ERR,400);

if(
	!empty($_POST['inputMentorName']) && (
	!is_string($_POST['inputMentorName']) ||
	strlen($_POST['inputMentorName']=trim($_POST['inputMentorName']))>A_NAME_MAX
))
	throw new Exception("Mentor ".A_NM_ERR,400);

if(
	!empty($_POST['rname']) && (
	!is_string($_POST['rname']) ||
	strlen($_POST['rname']=trim($_POST['rname']))>A_NAME_MAX
))
	throw new Exception("Representative ".A_NM_ERR,400);

if(
	!empty($_POST['inputSchool']) && (
	!ctype_digit($_POST['inputSchool']) ||
	intval($_POST['inputSchool'])>A_SCL_MAX
))
	throw new Exception(A_SC_ERR,400);

if(
	!empty($_POST['inputMentorEmail']) && (
	!filter_var($_POST['inputMentorEmail'],FILTER_VALIDATE_EMAIL) ||
	strlen($_POST['inputMentorEmail'])>A_EMAIL_MAX
))
	throw new Exception("Mentor ".A_EM_ERR,400);

if(
	!empty($_POST['inputMentorDept']) && (
	!is_string($_POST['inputMentorDept']) ||
	strlen($_POST['inputMentorDept']=trim($_POST['inputMentorDept']))>A_NAME_MAX
))
	throw new Exception("Mentor Department ".A_NM_ERR,400);

if(
	!empty($_POST['detail']) && (
	!is_string($_POST['detail']) ||
	strlen($_POST['detail']=trim($_POST['detail']))>DESC_MAX
))
	throw new Exception("Club ".DESC_MAX,400);

$_POST['ename']=$_POST['rname']??null;				unset($_POST['rname']);
$_POST['rname']=$_POST['inputMentorName']??null;	unset($_POST['inputMentorName']);
$_POST['rdept']=$_POST['inputMentorDept']??null;	unset($_POST['inputMentorDept']);
$_POST['remail']=$_POST['inputMentorEmail']??null;	unset($_POST['inputMentorEmail']);
$_POST['eschool']=$_POST['inputSchool']??null;		unset($_POST['inputSchool']);

$_POST=array_filter(array_diff_key($_POST,array_flip([
	'name','url','phone','ename','eschool','rname','remail','rdept','detail'
])),function($v){return !empty($v);});
$newsess=array_replace($_SESSION,$_POST);

$db=my_sqli_connect();
array_walk($_POST,function(&$v,$k) use(&$db){$v="$k='".$db->escape_string($v)."'";});

$q=$db->query("UPDATE `club` SET ".implode(',',$_POST)." WHERE `id`=".$db->escape_string($_SESSION['id']));

if(!$q || $db->affected_rows!==1 || !$db->commit())
	throw new Exception("Your account was not updated",500);

$_SESSION=$newsess;
session_commit();
sexit('Your account has been successfully updated.');
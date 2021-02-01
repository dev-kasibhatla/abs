<?php
$sxy=session_save_path();
if(!is_dir($sxy)) {
	file_exists($sxy) && unlink($sxy);
	mkdir($sxy,0770,1);
}
unset($sxy);

define('A_NAME_MAX',50);
define('A_EMAIL_MAX',320);
define('A_PHN_EXT',10);
define('A_URL_MAX',1024);
define('A_SCL_MAX',127);
define('DESC_MAX',65535);

define('A_CR_ERR',"Your account creation request could not be processed due to an unknown error, please retry or contact the support team if the issue persists");
define('A_NM_ERR',"Name must be a string with 1-".A_NAME_MAX." characters");
define('A_EM_ERR',"Email must be valid with 1-".A_EMAIL_MAX." characters");
define('A_PH_ERR',"Phone must be exactly 10 digits");
define('A_SC_ERR',"Representative school identifier is invalid");
define('DESC_ERR',"Description must be a string with 1-".DESC_MAX." characters");

function initauth($lock=true) {
	if(session_status()!==PHP_SESSION_ACTIVE && array_key_exists(session_name(),$_COOKIE))
		session_start(['read_and_close'=>!$lock]);
	if((!$lock || session_status()===PHP_SESSION_ACTIVE) &&
		!empty($_SESSION) && ctype_digit(strval($_SESSION['id']??'a'))
	)
		return true;
	if(array_key_exists(session_name(),$_COOKIE)) {
		$c=session_get_cookie_params();
		setcookie(session_name(),NULL,1,$c['path'],$c['domain']);
	}
	return false;
}

function requireauth() {
	if(!initauth())
		throw new Exception("You must be signed in to use this feature",401);
}

function denyauth() {
	if(initauth(false))
		throw new Exception("You are already signed in",400);
}
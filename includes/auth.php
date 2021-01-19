<?php
define('A_NAME_MAX',50);
define('A_EMAIL_MAX',320);
define('A_CR_ERR',"Your account creation request could not be processed due to an unknown error, please retry or contact the support team if the issue persists");
define('A_NM_ERR',"Name must be a string with 1-".A_NAME_MAX." characters");
define('A_EM_ERR',"Email must be valid with 1-".A_EMAIL_MAX." characters");

function initauth($lock=true) {
	if(array_key_exists(session_name(),$_COOKIE))
		session_start(['read_and_close'=>!$lock]);

	if(($lock && session_status()===PHP_SESSION_ACTIVE) || (!$lock && !empty($_SESSION)))
		return true;
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

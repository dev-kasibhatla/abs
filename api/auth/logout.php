<?php
require_once 'auth.php';
requireauth();
$gname=$_SESSION['name']??'anonymous';
$_SESSION=[];
$c=session_get_cookie_params();
setcookie(session_name(),NULL,1,$c['path'],$c['domain']);
session_destroy();
sexit("Goodbye, $gname!");
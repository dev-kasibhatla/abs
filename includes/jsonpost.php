<?php
if($_SERVER['REQUEST_METHOD']==='POST' && empty($_POST)) {
	try{$_POST=json_decode(file_get_contents('php://input'),1,10,JSON_THROW_ON_ERROR);}
	catch(Exception $e) {$_POST=[];}
}
<?php

const page=['<html><head><title>','</title><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="top:0;bottom:0;left:0;right:0;overflow:hidden;margin:0;position:fixed">
<div style="top:0;bottom:0;left:0;right:0;position:absolute;margin:5vh 5vw;background:',';">
<div style="top:0;bottom:0;left:0;right:0;position:absolute;margin:5vh 5vw;padding:5vh 5vw;background:#fff">',
'</div></div></body></html>'];

// Exception handler used everywhere
set_exception_handler(function($e) {
	if(!empty($e)) {
		$c=$e->getCode();
		if($c && in_array($c,[100,101,102,200,201,202,203,204,205,206,207,208,226,300,301,302,303,304,305,307,308,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,421,422,423,424,426,428,429,431,444,451,499,500,501,502,503,504,505,506,507,508,510,511,599],1))
			http_response_code($c);
		else
			http_response_code(500);
		$m=$e->getMessage()??"An unknown exception occurred";
	}
	else {
		http_response_code(500);
		$m="An unknown exception occurred";
	}
	if(empty($_SERVER['HTTP_ACCEPT']) || (strpos($_SERVER['HTTP_ACCEPT'],"text/html")===false && strpos($_SERVER['HTTP_ACCEPT'],"application/xhtml+xml")===false)) {
		header('Content-Type: application/json');
		exit(json_encode(['error'=>$m]));
	}
	header('Content-Type: text/html');
	exit(page[0].'Error'.page[1].'red'.page[2].nl2br(htmlspecialchars($m)).page[3]);
});

function sexit($s) {
	if(empty($_SERVER['HTTP_ACCEPT']) || (strpos($_SERVER['HTTP_ACCEPT'],"text/html")===false && strpos($_SERVER['HTTP_ACCEPT'],"application/xhtml+xml")===false)) {
		header('Content-Type: application/json');
		exit(json_encode(['success'=>$s]));
	}
	exit(page[0].'Success'.page[1].'green'.page[2].nl2br(htmlspecialchars($s)).page[3]);
}

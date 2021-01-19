<?php
//todo @msvamp make changes in this file for profile.html (use same format for giving club data)
$a = new stdClass();
$a->clubName = "Justice League";
$a->clubLink = "https://www.youtube.com/";
$a->clubRepName = "Batman";
$a->clubTag = "Blah";
$a->clubRepEmail = "notbrucew@yne.gotham";
$a->clubDescription = "**Without Fear you are Strong**";
echo json_encode($a);
die();
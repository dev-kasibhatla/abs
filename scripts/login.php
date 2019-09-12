<?php
//klog("It's like a triple staged darkness");



function klog($message){
    //todo: Add date and time
    //todo: create a new file for each date
    file_put_contents('logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}
?>
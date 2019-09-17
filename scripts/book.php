<?php
session_start();
//check request type
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $req = ($_POST["action"]);  
    if($req == "get_book"){
        //check if a user is logged in
        if(isset($_SESSION["username"]) || isset($_SESSION["adminID"])){
            //get data from server
            $date = ($_POST["date"]);
        }else{
            //user not logged in
            klog("User wasn't logged in. Trying to book slots");
            echo '<script type="text/JavaScript">  
				 window.location.replace("login.php");
				 </script>' 
				;
        }
    }

    if($req == "logout"){
        if(isset($_SESSION["username"])){
            $u = $_SESSION["username"];
            session_destroy();
            klog("$u was logged out");
            echo "1";
        }elseif (isset($_SESSION["adminID"])){
            $u = $_SESSION["amdinID"];
            session_destroy();
            klog("Admin: $u was logged out");
            echo "1";
        }
    }
}

function klog($message){
    //todo: Add date and time
    //todo: create a new file for each date
    $message = "Book.php:  ".$message;
    file_put_contents('../logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}
?>
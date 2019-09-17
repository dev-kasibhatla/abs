<?php
session_start();
klog("User trying to change password");
if(isset($_SESSION["username"])){
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $old_pass = ($_POST["change_old_password"]);
        $new_pass_1 = ($_POST["change_new_password1"]); 
        $new_pass_2 = ($_POST["change_new_password2"]); 


        $user = $_SESSION["username"];
        $table_name = "grps";
        if($_SESSION["level"] == 0){
            $sql = "select `Group Password` from $table_name where `Group Email` = '$user' ";
        }elseif($_SESSION["level"] == 1){
            $sql = "select `Group Password` from $table_name where `Mentor Email` = '$user' ";
        }

        $i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
        if($i -> connect_error){
            die("Connection failed: " . $i->connect_error);
            klog("Error connecting to database");
            echo "-2";
            die();
        }

        $result = mysqli_query($i,$sql);
        $row = mysqli_fetch_assoc($result);
        $p = $row["Group Password"]; 

        if($p != $old_pass){
            echo -4;
            die();
        }

        if(strlen($new_pass_1) < 8){
            echo "-3";
            die();
        }

        if($old_pass == $new_pass_1){
            echo "-1";
            klog("Old password and new password are same!");
            die();
        }

        if($new_pass_1 == $new_pass_2){
           
            //get username
            
            $sql = "update $table_name set `Group Password`='$new_pass_1' where `Group Email` = '$user' ";
            $result = mysqli_query($i,$sql);
            echo "1";
            klog("Password was changed for $user");
            session_abort();
        }else{
            echo "0";
            die();
        }
        
    }
}else{
    //redirect to login page
    header("Location: ../login.php");
    die();
}


function klog($message){
    //todo: Add date and time
    //todo: create a new file for each date
    $message = "change_password.php:  ".$message;
    file_put_contents('../logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}
?>
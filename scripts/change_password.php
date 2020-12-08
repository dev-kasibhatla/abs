<?php
session_start();
klog("User trying to change password");
if(isset($_SESSION["username"])){
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $old_pass = ($_POST["change_old_password"]);
        $new_pass_1 = ($_POST["change_new_password1"]); 
        $new_pass_2 = ($_POST["change_new_password2"]); 

        if($old_pass == ""){
            $old_pass = null;
        }

        $user = $_SESSION["username"];
        $table_name = "grps";
        if($_SESSION["level"] == 0){
            $sql = "select `Group Password` from $table_name where `Group Email` = '$user' ";
        }elseif($_SESSION["level"] == 1){
            $sql = "select `Mentor Password` from $table_name where `Mentor Email` = '$user' ";
        }
   
        $i = mysqli_connect('localhost','id10814660_root','dFX0#HxYkm(Y*g&I','id10814660_abs','3306');
        if($i -> connect_error){
            die("Connection failed: " . $i->connect_error);
            klog("Error connecting to database");
            echo "-2";
            die();
        }

        $result = mysqli_query($i,$sql);
        $row = mysqli_fetch_assoc($result);
        if($_SESSION["level"] == 0){
            $p = $row["Group Password"];
                    
        }elseif($_SESSION["level"] == 1){
            $p = $row["Mentor Password"];
                    
        }        

        if($p != $old_pass){
            echo -4;
            
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
           
            if($_SESSION["level"] == 0){
                $sql = "update $table_name set `Group Password`='$new_pass_1' where `Group Email` = '$user' "; 
            }elseif($_SESSION["level"] == 1){
                $sql = "update $table_name set `Mentor Password`='$new_pass_1' where `Mentor Email` = '$user' "; 
            }             
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
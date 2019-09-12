<?php



//get data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $l_uname = ($_POST["login_email"]);
    $l_password = ($_POST["login_password"]); 
    
    $i=connectDB();
    login($i, $l_uname, $l_password);
}


function login($i, $l_uname, $l_password){
    //declare names
    $account_table = "grps";

    if($i -> connect_error){
        die("Connection failed: " . $i->connect_error);
        klog("Error connecting to database");
    }else{
        klog("Connected to database");
    }

    //query:
    $mess = "USer typed: Uname: $l_uname, Password: $l_password";
    klog($mess);
    $sql = "select `Group Password`, `Group Email` from $account_table where `Group Email` = '$l_uname' ";

    $result = mysqli_query($i,$sql);
    if(mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_assoc($result);
        $p = $row["Group Password"];
        $u = $row["Group Email"];
        //$mess = "Server data: Uname: $u, Password: $p";
        $mess = "Login successful: $u\nStarting a session";
        klog($mess);
        //start session and set variables
        session_start();
        $_SESSION["username"] = $u;
        //send a response
        echo "1";
        
    }else{
        klog("This account doesn't exist");
        echo "0";
    }
}

function connectDB(){
    //connect to sql
    $i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
    if($i -> connect_error){
        die("Connection failed: " . $i->connect_error);
        klog("Error connecting to database");
        return false;
    }
    return $i;
}

function klog($message){
    //todo: Add date and time
    //todo: create a new file for each date
    $message = "Login-validate.php:  ".$message;
    file_put_contents('../logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}
?>
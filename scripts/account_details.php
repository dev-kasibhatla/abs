<?php
session_start();
if(isset($_SESSION["username"])){
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $user = $_SESSION["username"];
        $table_name = "grps";
        $sql = "select `*` from $table_name where `Group Email` = '$user' ";
        klog("$user is requesting account info");
        $i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
        if($i -> connect_error){
            die("Connection failed: " . $i->connect_error);
            klog("Error connecting to database");
            echo "-2";
            die();
        }
        $result = mysqli_query($i,$sql);; 

        if(mysqli_num_rows($result) == 1){
            $row = mysqli_fetch_assoc($result);
            $groupName = $row["Group Name"];
            $mentorName = $row["Mentor Name"];
            $mentorEmail = $row["Mentor Email"];
            $level = $row["Level"];
            $schoolName = $row["School Name"];
            $mess = "$user: retrieved all account information";
            klog($mess);

            $jobj = new \stdClass(); 
            $jobj ->username = $user;
            $jobj ->groupname = $groupName;
            $jobj ->mentorname = $mentorName;
            $jobj ->mentoremail = $mentorEmail;
            $jobj ->level = $level;
            $jobj ->schoolname = $schoolName; 
            
            $jres = json_encode($jobj);
            echo "$jres";
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
    $message = "account_details.php:  ".$message;
    file_put_contents('../logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}
?>
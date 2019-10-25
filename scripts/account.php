<?php
session_start();
//check request type
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $req = ($_POST["action"]);  
    if($req == "login_info"){
        //check if a user is logged in
        if(isset($_SESSION["username"])){
            //connect to server
            $i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
            if($i -> connect_error){
                die("Connection failed: " . $i->connect_error);
                klog("Error connecting to database");
                echo "0";
            }
            //get all data from database
            $user = $_SESSION["username"];
            if($_SESSION["level"] == 0){
                $sql = "select * from grps where `Group Email` = '$user' ";
            }elseif($_SESSION["level"] == 1){
                $sql = "select * from grps where `Mentor Email` = '$user' ";
            }

            $result = mysqli_query($i,$sql);
            if(mysqli_num_rows($result) == 1){
                $row = mysqli_fetch_assoc($result);
                $groupEmail = $row["Group Email"];
                $groupName = $row["Group Name"];
                $mentorName = $row["Mentor Name"];
                $mentorEmail = $row["Mentor Email"];
                $level = $row["Level"];
                $schoolName = $row["School Name"];
                $mess = "$user is already logged in";
                klog($mess);

                //create a json object to respond     
                $jobj = new \stdClass(); 
                $jobj ->username = $groupEmail;
                $jobj ->groupname = $groupName;
                $jobj ->mentorname = $mentorName;
                $jobj ->mentoremail = $mentorEmail;
                $jobj ->level = $_SESSION["level"];
                $jobj ->schoolname = $schoolName;
                
                $jres = json_encode($jobj);

                klog("Got all user data from db");

                //send a response
                echo "$jres";
                
            }

        }else{
            echo "0";
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

    if($req == "future_schedule" || $req == "past_schedule"){
        $group = ($_POST["group"]);  
        getSchedule($req,$group);
    }
}

function getSchedule($req,$group){
    $i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
    if($i -> connect_error){
        die("Connection failed: " . $i->connect_error);
        klog("Error connecting to database");
        echo "0";
    }
    
    $sql = "select * from schedule where `Group Name` = '$group' ";
    $result = mysqli_query($i,$sql);

    $index=-1;
    $jobj = new \stdClass(); 
    $jobj -> totalBooked = mysqli_num_rows($result);
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            $index++;
            $jobj -> $index = $row["SlotID"];   
            
        }              
    }
    //get data for queued bookings
    $sql = "select * from schedule where `Q Group Name` = '$group' ";
    $result = mysqli_query($i,$sql);
    $jobj -> totalQueued = mysqli_num_rows($result);
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            $index++;
            $jobj -> $index = $row["SlotID"];               
        }              
    }
    
    $jres = json_encode($jobj);
    //send a response
    echo "$jres";
}

function klog($message){
    //todo: Add date and time
    //todo: create a new file for each date
    $message = "Account.php:  ".$message;
    file_put_contents('../logs/log.txt', $message.PHP_EOL , FILE_APPEND);
    
}
?>
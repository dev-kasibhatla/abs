<?php
session_start();
if(!(isset($_SESSION["username"]) || isset($_SESSION["adminID"]))){
    klog("User wasn't logged in. Trying to book slots");
        echo '<script type="text/JavaScript">  
             window.location.replace("login.php");
             </script>' 
            ;
}
//check request type
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $req = ($_POST["action"]);  
    
    
    if($req == "get_book"){
        //check if a user is logged in
        if(isset($_SESSION["username"]) || isset($_SESSION["adminID"])){
            //get data from server
            $date = ($_POST["date"]);
            klog("Date is $date");
            $date=str_replace("-","",$date);
            klog("New date is $date");
            $i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
            if($i -> connect_error){
            klog("Error connecting to database");
             echo "0";
            die("Connection failed: " . $i->connect_error);
             }
            klog("Connected to DB");
            $table_name = "schedule";
            $sql = "select `SlotID`, `Group Name`, `Q Group Name` from $table_name where `Date`=$date and `Booked`=0 ";
            $result = mysqli_query($i,$sql);
             /*if(mysqli_num_rows($result) == 0){
                 klog("Got 0 rows");
             }else{
                 klog("Got a finite non-zero number of rows!");
             }*/
            //klog("result: $result");
            $index = 0;
            $jobj = new \stdClass(); 
            //$jobj -> "size" = (string)mysqli_num_rows($result);
            while($row = mysqli_fetch_assoc($result)){ // loop to store the data in an associative array.
                
                $sid = $row["SlotID"];
                $gn = $row["Group Name"];
                $qgn = $row["Q Group Name"];
                $jobj -> $index = $sid;
                $t1 = $index."a";
                $jobj -> $t1 = $gn;
                $t1 = $index."b";
                $jobj -> $t1 = $qgn;
                //klog("Found slot id: ".$row["SlotID"]);
                $index++;
            }
            $jobj -> size = $index;
            $jres = json_encode($jobj);
            echo "$jres";
            mysqli_close($i);
        }else{
            //user not logged in
            klog("User wasn't logged in. Trying to book slots");
            echo '<script type="text/JavaScript">  
				 window.location.replace("login.php");
				 </script>' 
				;
        }
    }

    if($req == "book_slots"){
        submitSlotData();
    }
}

function submitSlotData(){
    $data = ($_POST["data"]);
    //echo $data;
    $slots = explode(" ",$data);
    unset($slots[$slots.count()-1]);
    foreach ($slots as $slot) {
        klog("Booking for $slot");
    }
    //connect 
    $i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
    if($i -> connect_error){
        klog("Error connecting to database");
        echo "0";
        die("Connection failed: " . $i->connect_error);
    }
    klog("Connected to DB");
    $table_name = "schedule";
    
    //update $table_name set `Group Password`='$new_pass_1' where `Group Email` = '$user' ";
    $gname = "";
    //get group name to put into the slot table
    foreach($slots as $slot){
        if(isset($_SESSION["username"])){
            $gname = $_SESSION["username"];
        }elseif(isset($_SESSION["adminID"])){
            $gname = $_SESSION["adminID"];
        }else{
            echo "0";
            die();
        }
        //get group name and q group name
        $sql = "select `Group Name`, `Q Group Name` from $table_name where `SlotID`= $slot" ;
        $result = mysqli_query($i,$sql);
        if(mysqli_num_rows($result) == 0){
            klog("Got 0 rows. It means this slot is not available anymore");
            echo "Unable to book slot $slot";
            die();
        }else{
            //check where to put the name
            $row = mysqli_fetch_assoc($result);
            $res_gname = $row["Group Name"];
            $res_q_gname = $row["Q Group Name"];
            if($res_gname == null && $res_q_gname == null){
                //means booking goes into group name
                $sql = "update $table_name set `Group Name`='$gname' where `SlotID` = '$slot'";
                $result = mysqli_query($i,$sql);
                klog("slot $slot is being booked as main slot");
                echo "$slot booked as main";
            }elseif($res_gname != null && $res_q_gname == null){
                $sql = "update $table_name set `Q Group Name`='$gname' where `SlotID` = '$slot'";
                $result = mysqli_query($i,$sql);
                klog("slot $slot is being booked as queue slot");
                echo "$slot booked as queue";
            }
            klog("slot $slot is being booked");
        }

        //c
        //$result = mysqli_query($i,$sql);
    }
}


function klog($message){
    //todo: Add date and time
    //todo: create a new file for each date
    $message = "Book.php:  ".$message;
    file_put_contents('../logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}
?>
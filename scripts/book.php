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
            $i = my_sqli_connect();
            if($i -> connect_error){
                klog("Error connecting to database");
                echo "0";
                die("Connection failed: " . $i->connect_error);
            }
            klog("Connected to DB");
            $table_name = "schedule";
            // $u = $_SESSION['username'];
            $sql = "select `SlotID`, `Group Name`, `Q Group Name` from $table_name where `Date`=$date and `Q Group Name` IS NULL";
            $result = mysqli_query($i,$sql);
             if(mysqli_num_rows($result) == 0){
                 klog("Got 0 rows");
             }else{
                 klog("Got a finite non-zero number of rows!");
             }
            // print_r($result);

            $index = 0;
            $jobj = new \stdClass();
            // print_r($_POST);
            //$jobj -> "size" = (string)mysqli_num_rows($result);
            while($row = mysqli_fetch_assoc($result)){ // loop to store the data in an associative array.

                if($row["Group Name"]!=$_POST['grpname'])
                {
                    // print_r($row["Group Name"]." is not ".$_POST['grpname']."\n");

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
    unset($slots[count($slots)-1]);
    $finalres = new\stdClass();
    $finalres->error=0;
    $finalres->size=0;

    foreach ($slots as $slot) {
        klog("Booking for $slot");
    }
    //connect
    $i = my_sqli_connect();
    if($i -> connect_error){
        klog("Error connecting to database");
        echo "0";
        die("Connection failed: " . $i->connect_error);
    }
    klog("Connected to DB");
    $table_name = "schedule";

    //update $table_name set `Group Password`='$new_pass_1' where `Group Email` = '$user' ";
    $gname = "";
    $mname = "";
    //get group name to put into the slot table
    // print_r($slots);
    foreach($slots as $slot)
    {
        $finalres->size++;
        $temp = $finalres->size;
        $jobj = new \stdClass();
        if(isset($_SESSION["username"]))
        {
            $gname = $_SESSION["username"];
            // print_r($_SESSION);
            // die("Test");
            $jobj->lvl =  $_SESSION["level"];
            if($_SESSION["level"] == 1)
            {
                //get group email
                $sql = "select * from grps where `Mentor Email`= '$gname' " ;
                $result = mysqli_query($i,$sql);
                $row = mysqli_fetch_assoc($result);
                if(mysqli_num_rows($result) == 1)
                {
                    $gname = $row["Group Email"];
                    $mname = $row["Mentor Name"];
                    $finalres->gname = $gname;
                    $finalres->mname = $mname;
                    klog("Mentor Name is ".$mname);
                }else
                {
                    klog("Error fetching group username");
                    $finalres->error = 1;
                    echo json_encode($finalres);
                    die();
                }
            }
        }elseif(isset($_SESSION["adminID"])){
            $gname = $_SESSION["adminID"];
        }else{
            //user not logged in
            echo "0";
            //send user to login screen
            echo '<script type="text/JavaScript">
				 window.location.replace("login.php");
				 </script>' ;
            die();
        }
        //get group name and q group name
        $sql = "select `Group Name`, `Q Group Name` from $table_name where `SlotID`= $slot" ;
        $result = mysqli_query($i,$sql);
        if(mysqli_num_rows($result) == 0){
            //means one of the slots selected is unavailable for booking
            klog("Got 0 rows. It means this slot is not available anymore");
            $finalres->$temp = 0;

        }else{
            //check where to put the name
            $row = mysqli_fetch_assoc($result);
            $res_gname = $row["Group Name"];
            $res_q_gname = $row["Q Group Name"];
            klog($res_gname . "is the group name");
            if($res_gname == null && $res_q_gname == null){
                //means booking goes into group name
                $sql = "update $table_name set `Group Name`='$gname',`Booked`='1' where `SlotID` = '$slot'";
                $result = mysqli_query($i,$sql);
                klog("slot $slot is being booked as main slot");
                $jobj->slot = "$slot:m";


                $finalres->$temp = json_encode($jobj);


            }elseif($res_gname != null && $res_q_gname == null){
                $sql = "update $table_name set `Q Group Name`='$gname' where `SlotID` = '$slot'";
                $result = mysqli_query($i,$sql);
                klog("slot $slot is being booked as queue slot");
                $jobj->slot = "$slot:q";

                $finalres->$temp = json_encode($jobj);

            }
            klog("slot $slot is being booked");


        }


    }
    echo json_encode($finalres);
    die();
}


function klog($message){
    //todo: Add date and time
    //todo: create a new file for each date
    $message = "Book.php:  ".$message;
    file_put_contents('../logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}
?>
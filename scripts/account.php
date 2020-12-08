<?php
session_start();
//check request type
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $req = ($_POST["action"]);  
    if($req == "login_info"){
        //check if a user is logged in
        if(isset($_SESSION["username"])){
            //connect to server
            $i = mysqli_connect('localhost','id10814660_root','dFX0#HxYkm(Y*g&I','id10814660_abs','3306');
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
                $activated = $row["Activated"];
                $id = $row["id"];
                $mess = "$user is already logged in";
                klog($mess);
                
                

                //create a json object to respond     
                $jobj = new \stdClass();
                $jobj ->groupid = $id; 
                $jobj ->username = $groupEmail;
                $jobj ->groupname = $groupName;
                $jobj ->mentorname = $mentorName;
                $jobj ->mentoremail = $mentorEmail;
                $jobj ->level = $_SESSION["level"];
                $jobj ->schoolname = $schoolName;
                $jobj ->activated = $activated;
                $jres = json_encode($jobj);

                klog("Got all user data from db");

                //send a response
                echo "$jres";
                
            }

        }else{
            klog("Mentor with no grp tried to login");
            echo 0;
            die();
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
    
    if($req == "cancelslot")
    {
        cancelSlot();
        
    }
    if($req == "activate")
    {
        activateAccount();
    }
    
}




function activateAccount()
{
    $i = mysqli_connect('localhost','id10814660_root','dFX0#HxYkm(Y*g&I','id10814660_abs','3306');
    $mname=$_POST['group'];
    $sql = "update grps set `Activated` = '1' where `Mentor Name`='$mname'";
    $result=mysqli_query($i,$sql);
    if($result==TRUE)
    {
        $id=$_POST["groupid"];
        $sql = "update Mentor set `Group ID` = '$id' where `Mentor Name`='$mname'";
        $result=mysqli_query($i,$sql);
        if($result==TRUE)
        {
            $jobj=new \stdClass();
            $jobj->activation=1;
            echo json_encode($jobj);
            die(); 
        }
     }
     else
     {
        print_r(__line__.$i->error);
        echo 0;
        die();
     }
     
    
}
function cancelSlot()
{
    $i = mysqli_connect('localhost','id10814660_root','dFX0#HxYkm(Y*g&I','id10814660_abs','3306');
    $slotid=intval($_POST['time']);
    $sql = "update schedule set `Group Name` = NULL,`Booked`='0'  where `SlotID` = $slotid ";
    $result=mysqli_query($i,$sql);
    if($result==TRUE)
    {
        $sql="UPDATE schedule set `Group Name` = `Q Group Name`, `Q Group Name` = NULL where `SlotID` = $slotid ";
        $sql2="UPDATE schedule set  `Booked`=0 where `SlotID` = $slotid AND `Group Name`=NULL";
         $result=mysqli_query($i,$sql);
         $result=mysqli_query($i,$sql2);
         if($result==TRUE)
         {
             $jobj=new \stdClass();
             $jobj->response=1;
             echo json_encode($jobj);
             die();
         }
         else
         {
            print_r(__line__.$i->error);
            echo 0;
            die();
         }
    }
    else
    {
        print_r(__line__.$i->error);
            echo 0;
            die();
    }
}


function getSchedule($req,$group){
    $i = mysqli_connect('localhost','id10814660_root','dFX0#HxYkm(Y*g&I','id10814660_abs','3306');
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
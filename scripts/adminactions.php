<?php
session_start();
klog("adminactions called");

if(isset($_SESSION["adminID"])){
    klog("adminactions post called");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if($_POST["action"] == "gendates"){
            klog("Processing request to generate dates");
            generateDates();
        }
    }
}

function generateDates(){
    date_default_timezone_set('Asia/Kolkata');
    $date = date('YmdH', time());
    klog("Current time: $date");
    $i = my_sqli_connect();
    if($i -> connect_error){
        klog("Error connecting to database");
        echo "0";
        die("Connection failed: " . $i->connect_error);
    }
    klog("Connected to DB");
    $table_name = "schedule";
    $sql = "select `Sr. No.`, `SlotID` from $table_name ORDER BY `Sr. No.` DESC LIMIT 1 ";
    $result = mysqli_query($i,$sql);
    if(mysqli_num_rows($result) == 1){
        $row = mysqli_fetch_assoc($result);
        $srno = $row["Sr. No."];
        $sid = $row["SlotID"];
        klog("Got last slots: $srno and $sid");
        addSlots($sid);
        echo 1;
        die();
    }else{
        klog("Got 0 rows. So table is probably empty");
        //add slots from right now
        addSlots($date);
        echo 1;
        die();
    }
}

function addSlots($startSid){
    //calculate end date
    date_default_timezone_set('Asia/Kolkata');
    $date = new DateTime('now');
    $date->modify('+1 day');
    $endSid = $date->format('YmdH');
    klog("End Slot ID: $endSid");
    //maintain date, slot id, time separately
    $currSid = $startSid;
    //lets just create an array of reqd dates
    //get the exact start date slot id: yyyymmddHH
    $currSid = substr_replace($currSid,'-',4,0);
    $currSid = substr_replace($currSid,'-',7,0);
    $currSid = substr_replace($currSid,'-',10,0);
    $currDate = strtotime($currSid);

    $temp = $endSid;
    $temp = substr_replace($temp,'-',4,0);
    $temp = substr_replace($temp,'-',7,0);
    $temp = substr_replace($temp,'-',10,0);
    $endDate = strtoTime($temp);

    $dateArray = array();
    while($currDate < $endDate){
        array_push($dateArray,date('y-m-d',$currDate));
        $currDate = strtotime('+1 month',$currDate);
    }
    $table_name="schedule";
    $i = my_sqli_connect();
    if($i -> connect_error){
        klog("Error connecting to database");
        echo "0";
        die("Connection failed: " . $i->connect_error);
    }
    foreach($dateArray as $d){
        for($j=8;$j<=22;$j++){
            if($j < 10){
                $st = "0".$j;
            }else{
                $st = $j;
            }
            $slid = date('y-m-d',strtotime($d));
            $slid = "20".str_replace("-", "", $slid);
            $sql="insert into $table_name (`Date`,`Slot Timing`,`SlotID`) values ('$slid','$st','$slid$st')";
            $result = mysqli_query($i,$sql);
            klog($i->error);
            //$result = mysqli_query($i,$sql);
            klog($sql);

        }

    }

}

function klog($message){
    //todo: Add date and time
    //todo: create a new file for each date
    $message = "adminactions.php:  ".$message;
    file_put_contents('../logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}

?>

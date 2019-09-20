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
            $sql = "select `SlotID` from $table_name where `Date`=$date and `Booked`=0 ";
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
                $jobj -> $index = $sid;
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
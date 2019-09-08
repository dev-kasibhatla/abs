<?php
echo "Form was submitted<br>";

getData();
function klog($message){
    file_put_contents('logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}

function getData(){
    //collect data
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $group_name = cleanData($_POST["signup_group_name"]);
        $group_email = cleanData($_POST["signup_group_email"]);
        $group_password = cleanData($_POST["signup_group_password"]);
        $mentor_name = cleanData($_POST["signup_mentor_name"]);
        $mentor_email = cleanData($_POST["signup_mentor_email"]);
        $mentor_dept = cleanData($_POST["signup_mentor_dept"]);
        echo "<br>Data seems fine<br>";
    }     

    if(strlen($group_password)>7){
        echo "Password is okay";
    }else{
        echo "Password must be atleast 8 characters long";
        
    }


    

    echo "<br>Group Name: ".$group_name;
    echo "<br>Group Email: ". $group_email;
    echo "<br>Group Password: ".$group_password;
    echo "<br>Mentor Name: ".$mentor_name;
    echo "<br>Mentor Email: ".$mentor_email;
    echo "<br>Mentor Department: ".$mentor_dept;
}

function cleanData($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>
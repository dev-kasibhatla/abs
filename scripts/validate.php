<?php
//echo "Form was submitted<br>";

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
        //echo "<br>Data seems fine<br>";
    }     

    $signup_message = "";

    if(strlen($group_password)>7){
        echo "<h1 class=\"text-center\" font-face=\"verdana\" style=\"margin-left:20%\">Your data has been sent to the Administrator for reviewal.<br>Mentor will be sent an e-mail regarding the same.<br>
        Please check your e-mail for activation information.</h1>";
        echo "
        <br><a href=\"../index.html\" font-face=\"verdana\" style=\"margin-left:20%\">Click here</a> to continue to homepage";
        
    }
    else {
        echo "<h1 class=\"text-center\" font-face=\"verdana\" style=\"margin-left:20%\">Please enter a password that is atleast 8 characters long<br></h1>";
        echo "
            <a href=\"javascript:history.go(-1)\" font-face=\"verdana\" style=\"margin-left:20%\">Click to try again</a>
        ";
    }


    
    /*
    echo "<br>Group Name: ".$group_name;
    echo "<br>Group Email: ". $group_email;
    echo "<br>Group Password: ".$group_password;
    echo "<br>Mentor Name: ".$mentor_name;
    echo "<br>Mentor Email: ".$mentor_email;
    echo "<br>Mentor Department: ".$mentor_dept;
    */
}

function cleanData($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>
<?php
//echo "Form was submitted<br>";

getData();
function klog($message){
    file_put_contents('logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}

        /*$school_name ="";
        $group_name ="";
        $group_email= "";
        $group_password ="";
        $mentor_name ="";
        $mentor_email ="";
        $mentor_dept ="";
        $account_activated = 0;*/


function getData(){
    //collect data
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $school_name = cleanData($_POST["signup_school_name"]);
        $group_name = cleanData($_POST["signup_group_name"]);
        $group_email = cleanData($_POST["signup_group_email"]);
        $group_password = cleanData($_POST["signup_group_password"]);
        $mentor_name = cleanData($_POST["signup_mentor_name"]);
        $mentor_email = cleanData($_POST["signup_mentor_email"]);
        $mentor_dept = cleanData($_POST["signup_mentor_dept"]);
        $account_activated = 0;
        //echo "<br>Data seems fine<br>";
    }     

    $signup_message = "";

    if(strlen($group_password)>7){
               

        //addToTables();
        /*echo "<br>Group Name: ".$group_name;
        echo "<br>Group Email: ". $group_email;
        echo "<br>Group Password: ".$group_password;
        echo "<br>Mentor Name: ".$mentor_name;
        echo "<br>Mentor Email: ".$mentor_email;
        echo "<br>Mentor Department: ".$mentor_dept;
        echo "<br>School Name: ".$school_name;*/

          //create new connection
            $i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
            if($i -> connect_error){
                die("Connection failed: " . $i->connect_error);
                echo "Error connecting to database";
            }

            //declare names
            $account_table = "grps";
            $otp=rand(1000,9999);
            $sql ="insert into $account_table (`School Name`,`Group Name`,`Group Email`,`Group Password`,`Mentor Name`,`Mentor Email`,`Mentor Department`,`Activated`, `OTP`)".
            " values ('$school_name','$group_name','$group_email','$group_password','$mentor_name','$mentor_email','$mentor_dept','0', '$otp')";
           

            if ($i->query($sql) === TRUE) {
                echo "<h1 class=\"text-center\" font-face=\"verdana\" style=\"margin-left:20%\">Your data has been sent to the Administrator for reviewal.<br>Mentor will be sent an e-mail regarding the same.<br>
                Please check your e-mail for activation information.</h1>";
                //Call here i guess?
                sendemail($otp,$mentor_email);
                echo "
                <br><a href=\"../index.html\" font-face=\"verdana\" style=\"margin-left:20%\">Click here</a> to continue to homepage";
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $i->error;
               echo "<h1 class=\"text-center\" font-face=\"verdana\" style=\"margin-left:20%\">There was a problem connecting to our servers.
                Please try again shortly.<br></h1>";
                echo "<a href=\"javascript:history.go(-1)\" font-face=\"verdana\" style=\"margin-left:20%\">Click to try again</a>
                ";
            }
            
            $i->close();
            }
            else {
                echo "<h1 class=\"text-center\" font-face=\"verdana\" style=\"margin-left:20%\">Please enter a password that is atleast 8 characters long<br></h1>";
                echo "
                    <a href=\"javascript:history.go(-1)\" font-face=\"verdana\" style=\"margin-left:20%\">Click to try again</a>
                ";
            }    
}
    
    

function cleanData($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function addToTables(){
  
}

function tp(){
    
}

function sendemail($otp, $mentor_email){
//$otp=rand(1000,9999);
$subject = 'Account Activation';
$message = 'The otp for account activation of your student group is:'.$otp.'
Follow this link to activate: https://absabs2.000webhostapp.com/account_otp.php'; 
$from = 'Auditorium.Manager';
 //storing otp in grps table
  //$sql1="insert into $account_table (`OTP`) values ($otp) where `Group Email`=$group_email and `Mentor Email`=$mentor_email ";

echo "<h1 class=\"text-center\" font-face=\"verdana\" style=\"margin-left:20%\">Your Mentor has been sent an OTP for account confirmation</h1>";
            
              
if(mail($mentor_email, $subject, $message, $from)){
    echo 'Your mail has been sent successfully.';
} else{
    echo 'Unable to send email. Please try again.';
}
}


/*
<?php
$i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
$d=$i->query('show tables;');
$d=$d->fetch_all();
echo print_r($d);
?>
*/

?>

<?php
//Put your otp validation code here
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$mEmail = ($_POST["mentor_email"]);
		$mOtp = ($_POST["mentor_otp"]);
		
		//retrieve data from server
		$table_name = "grps";
        $sql = "select `OTP`,`Activated` from $table_name where `Mentor Email` = '$mEmail' ";
		$i = mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');
		if($i -> connect_error){
			klog("Unable to connect to DB");
			echo "Error connecting to mysql server";
			die();
		}
		$result = mysqli_query($i,$sql);
		if(mysqli_num_rows($result) == 1){
			$row = mysqli_fetch_assoc($result);
        	$activated = $row["Activated"];
			$otp = $row["OTP"];
			if($activated == 1){
				echo "Account already activated. Redirecting.";
				klog("Account already activated");
				echo '<script type="text/JavaScript">  
				 window.location.replace("index.html");
				 </script>' 
				;
				die();
			}
			
			//verify
			if($otp == $mOtp){
				//set account as activated
				$i=mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');

				klog("Otp matches server data. Activating this account");
				$sql = "update $table_name set `Activated` = '1' where `Mentor Email` = '$mEmail' ";
				$result = mysqli_query($i,$sql);
				
				$i=mysqli_connect('remotemysql.com','IsgZ9IuKUH','Xx4FYXPuoq','IsgZ9IuKUH','3306');

				$sql = "update $table_name set `OTP` = '0' where `Mentor Email` = '$mEmail' ";
				$result = mysqli_query($i,$sql);
				//start a mentor session and make them set password	
				sessiion_start();
				$_SESSION["username"] = $mEmail;
            	$_SESSION["level"] = 1;
				echo '<script type="text/JavaScript">  
				 window.location.replace("change_password.php");
				 </script>' 
				;
				die();
				
			}else{
				echo "Invalid OTP. Try again";
			}
		}else{
			echo "Invalid login";
			klog("Invalid email");
			echo '<script type="text/JavaScript">  
				 window.location.replace("adpa.php");
				 </script>' 
				;
			die();
		}
	}

function klog($message){
    //todo: Add date and time
    //todo: create a new file for each date
    $message = "account_otp.php:  ".$message;
    file_put_contents('logs/log.txt', $message.PHP_EOL , FILE_APPEND);
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Auditorium: Confirm account</title>

<!-- Bootstrap -->
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/account.css">


</head>
<body>
<div class="header"> 
  <a href="#default" class="logo" id="header_logo">Account</a>
  <div class="header-right">
    <a href="index.html" style="font-weight: bold">Home</a>
  </div>
</div>

<div class="row" style="margin-top: 2%" id="login_block">
		<div class="col-md-offset-0 col-md-12">
		  <h1 class="text-capitalize">Enter these details to confirm your Account</h1>
		</div>
		
  <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
 		<div class="col-md-offset-5 col-md-4" >
 		  <div>
 		    <div class="input-group col-md-11 col-md-offset-0" style="margin-bottom:4%"><span class="input-group-addon">Mentor Email</span>
 		      <input type="email" class="form-control" aria-describedby="addon1" name="mentor_email" required>
	        </div>
 		      
 		   <div class="input-group col-md-11 col-md-offset-0" style="margin-bottom:2%"><span class="input-group-addon">OTP</span>
 		     <input type="text" class="form-control" aria-describedby="addon1" name="mentor_otp" required>
	        </div>
	        
	      </div>
	      
		</div>
 		<div class="col-md-offset-5 col-md-4">
				<button type="submit" class="btn btn-primary btn-block" id ="admin_submit">Submit</button>
	        </div>
			<div class="col-md-offset-5 col-md-4">
				<p>Upon entering the correct OTP, you'll be asked to set a new password.<br>Leave old password blank</p>
	        </div>
					
		</form>
</div>
<script src="js/jquery-1.11.3.min.js"></script> 
<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="js/bootstrap.js"></script>

</body>

</html>

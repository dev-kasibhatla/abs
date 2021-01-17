<?php
	session_start();
	if(isset($_SESSION["adminID"])){
		echo '<script type="text/JavaScript">
				 window.location.replace("adpa2.php");
				 </script>'
				;
		die();
	}

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		session_abort();
		$user = ($_POST["admin_username"]);
		$pass = ($_POST["admin_password"]);

		$table_name = "admin";
        $sql = "select `password` from $table_name where `username` = '$user' ";
		$i = my_sqli_connect();
		if($i -> connect_error){
			echo "Error connecting to mysql server";
			die();
		}
		$result = mysqli_query($i,$sql);
    	if(mysqli_num_rows($result) == 1){
			$row = mysqli_fetch_assoc($result);
        	$p = $row["password"];
			//start a special session? Maybe decide later
			if($p == $pass){
				session_start();
				//login successful
				$_SESSION["adminID"] = "$user";
				echo '<script type="text/JavaScript">
				 window.location.replace("adpa2.php");
				 </script>'
				;
				die();
			}else{
				echo "Invalid login";
				echo '<script type="text/JavaScript">
				 window.location.replace("adpa.php");
				 </script>'
				;
				die();
			}
		}else{
			echo "Invalid login";
			echo '<script type="text/JavaScript">
				 window.location.replace("adpa.php");
				 </script>'
				;
			die();
		}

	}
?>



<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Auditorium: Admin Panel</title>

<!-- Bootstrap -->
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/account.css">

</head>
<body>
<div class="header">
  <a href="#default" class="logo" id="header_logo">Account</a>
  <div class="header-right">
    <a href="index.html" style="font-weight: bold">Home</a>
	<a href= "index.html" onclick="logout()" style="font-weight: bold" id="top_login_link">Logout</a>
  </div>
</div>

<div class="row" style="margin-top: 2%" id="login_block">
		<div class="col-md-offset-5 col-md-2">
			<h1 class="text-capitalize">Login</h1>
		</div>

		<form method="post" id="admin_login" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
 		<div class="col-md-offset-5 col-md-4" >
 		  <div>
 		    <div class="input-group col-md-11 col-md-offset-0" style="margin-bottom:4%"><span  class="input-group-addon">Username</span>
 		      <input type="text" class="form-control" aria-describedby="addon1" name="admin_username" required>
	        </div>

 		   <div class="input-group col-md-11 col-md-offset-0" style="margin-bottom:2%"><span  class="input-group-addon">Password</span>
 		      <input type="password" class="form-control" aria-describedby="addon1" name="admin_password" required>
	        </div>

	      </div>

		</div>
 		<div class="col-md-offset-5 col-md-4">
				<button type="submit" class="btn btn-primary btn-block" id ="admin_submit">Submit</button>
	        </div>

		</form>
 	</div>
<script src="js/jquery-1.11.3.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.js"></script>





</body>
</html>

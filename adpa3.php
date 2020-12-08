<?php
	session_start();
	if(isset($_SESSION["adminID"])){
		//echo "User ID: ".$_SESSION["adminID"];
	}else{
		//not logged in!
		echo '<script type="text/JavaScript">  
		 window.location.replace("adpa.php");
		 </script>' 
		;
		die();
	}
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		session_abort();
		$user = ($_POST["mentor_username"]);
		$pass = ($_POST["mentor_password"]);
		$email= ($_POST["mentor_email"]);
		$department= ($_POST["mentor_department"]);
	  	
		$table_name = "Mentor";
        $sql = "INSERT INTO $table_name (`Mentor Name`,`Mentor Email`,`Mentor Department`,`Mentor Password`)".
                " VALUES ('$user','$email','$department','$pass')";
		$i = mysqli_connect('localhost','id10814660_root','dFX0#HxYkm(Y*g&I','id10814660_abs','3306');
		$result = mysqli_query($i,$sql);
    	if($result==TRUE){
			
				echo '<script src="js/jquery-1.11.3.min.js"></script> 
                <script src="js/bootstrap.js"></script>
                <script type="text/JavaScript">  
				alert("Mentor was created successfully");
				window.location.replace("adpa2.php");
				 </script>' 
				;
				die();
			
		}
		else{
		    print_r($i->error);
			echo "Error connecting to mysql server";
			echo '<script type="text/JavaScript">  
				alert("Mentor was not created");
				 window.location.replace("adpa2.php");
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
<script src="js/jquery-1.11.3.min.js"></script> 
<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="js/bootstrap.js"></script>
</head>
<body id='body'>
<div class="header"> 
  <a href="#default" class="logo" id="header_logo">Account</a>
  <div class="header-right">
    <a href="index.html" style="font-weight: bold">Home</a>
	<a href= "index.html" onclick="logout()" style="font-weight: bold" id="top_login_link">Logout</a>
  </div>
</div>

<div class="row" style="margin-top: 2%" id="login_block">
		<div class="col-md-offset-5 col-md-2">
			<h1 class="text-capitalize">Add a Mentor</h1>
		</div>
		
		<form method="post" id="admin_login" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
 		<div class="col-md-offset-5 col-md-4" >
 		  <div>
 		    <div class="input-group col-md-11 col-md-offset-0" style="margin-bottom:4%"><span  class="input-group-addon">Mentor Name</span>
 		      <input type="text" class="form-control" aria-describedby="addon1" name="mentor_username" required>
	        </div>
 		   <div class="input-group col-md-11 col-md-offset-0" style="margin-bottom:2%"><span  class="input-group-addon">Mentor Password</span>
 		      <input type="password" class="form-control" aria-describedby="addon1" name="mentor_password" required>
	        </div>
	        <div class="input-group col-md-11 col-md-offset-0" style="margin-bottom:2%"><span  class="input-group-addon">Mentor Email</span>
 		      <input type="email" class="form-control" aria-describedby="addon1" name="mentor_email" required>
	        </div>
	        <div class="input-group col-md-11 col-md-offset-0" style="margin-bottom:2%"><span  class="input-group-addon">Mentor Dept.</span>
 		      <input type="text" class="form-control" aria-describedby="addon1" name="mentor_department" required>
	        </div>
	        
	      </div>
	      
		</div>
 		<div class="col-md-offset-5 col-md-4">
				<button type="submit" class="btn btn-primary btn-block" id ="admin_submit">Submit</button>
	        </div>
					
		</form>
 	</div>






</body>
</html>

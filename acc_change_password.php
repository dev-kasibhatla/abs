<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Auditorium: Change password</title>

<!-- Bootstrap -->
<link rel="stylesheet" href="css/bootstrap.css">
<link href="css/account.css" rel="stylesheet" type="text/css">

</head>
<body onLoad="initialize()">
	<div class="container-fluid"> 
		<div class="header"> 
	  		<a href="account.php" class="logo" id="header_logo">Account</a>
	  		<div class="header-right">
				<a href="index.html" style="font-weight: bold">Home</a>
	  		</div>
		</div>
		<hr color="#007CFF" width="95%">
  	</div>
  	
  	<div class="container-fluid"> 
  	<form method="post" id="change_password_form">
		<h1 class="text-capitalize text-center">Change Password</h1>
		<div class="row" style="margin-top: 5%">
			<div class = "col-md-4 col-md-offset-4">
				<div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  class="input-group-addon change-pass-old-colour">Old Password</span>
				  <input type="password" class="form-control" placeholder="Old Password" aria-describedby="addon1" name = "change_old_password" required>				  
			  	</div>
			  	
			  	<div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  class="input-group-addon">New Password</span>
				  <input type="password" class="form-control" placeholder="New Password" aria-describedby="addon1" name = "change_new_password1" required>				  
			  	</div>
			  	
				<div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  class="input-group-addon">New Password</span>
				  <input type="password" class="form-control" placeholder="Re-Type New Password" aria-describedby="addon1" name = "change_new_password2" required>				  
			  	</div>							
			  	
			</div>
		</div>
		
		<div class="col-md-4 col-md-offset-4" >
			<button type="submit" class="btn btn-primary btn-block" id="change_pass_submit" >Submit</button>	
		</div>	
		</form>
		<p id="login_message" class="col-md-10 col-md-offset-1">
			Login error
		</p>
  	</div>
 
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script src="js/jquery-1.11.3.min.js"></script> 
<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="js/bootstrap.js"></script>
<script src="js/change_password.js"></script>

<div style="margin-bottom: 5%"></div>
</body>
</html>

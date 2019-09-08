<!doctype html>
<html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Auditorium: Login</title>

<!-- Bootstrap -->
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/login.css" rel="stylesheet" type="text/css">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body onload = "initialize()">

<div class="header">
 
  <a href="#default" class="logo" id="header_logo">Account</a>
  <div class="header-right">
    <a href="index.html" style="font-weight: bold">Home</a>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-10 col-md-offset-1">
      <h1 class="text-center" id="account_name_label">You need to login to view this section</h1>
    </div>
  </div>
  <hr>
</div>

<div class="vl"></div>

<div class="container-fluid col-md-offset-2 col-md-4" >
 	<div class="row">
 		<div class="col-md-offset-3 col-md-9"  style="margin-bottom:4%">
			<h2>Login</h2>
		</div>		
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-2 col-md-10" >
 		  <div>
 		    <div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  class="input-group-addon">Username</span>
 		      <input type="email" class="form-control" placeholder="Type your email" aria-describedby="addon1" id="login_email">
	        </div>
 		      
 		   <div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:2%"><span  class="input-group-addon">Password</span>
 		      <input type="password" class="form-control" placeholder="Type your Password" aria-describedby="addon1" id = "login_password">
	        </div>
	      </div>
			
		</div>
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-2 col-md-10">
			<button type="button" class="btn btn-primary btn-block" id = "login_submit">Submit</button> 
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-2 col-md-10">
			<button type="button" class="btn btn-default btn-block" name="login_forgot_password">Forgot Password</button>	
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-2 col-md-10">
 			<!--show login error messages or please wait messages -->			
			<p class="text-center" id="login_message">
				<img src="images/Warning.svg" width="5%">     
				Invalid Credentials				
			</p>
		</div>	
 	</div> 	
 </div>	
 
 
 <div class="container-fluid col-md-offset-0 col-md-4">
 	<div class="row">
 		<div class=" col-md-10 col-md-offset-1" style="margin-bottom: 2%">
			<h2>Create an Account</h2>
		</div>		
 	</div>



<form action="scripts/validate.php" method="post">
	<div class="btn-group col-md-offset-0 col-md-11"  style="margin-bottom:4%">
	             <button type="button" class="btn btn-primary dropdown-toggle btn-block" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" name="signup_school_name">Select school  <span class="caret"></span></button>
			 <ul class="dropdown-menu">
	               <li role="presentation" class="dropdown-header">Select School</li>
	               <li role="presentation"><a href="#">School 1</a></li>
	               <li role="presentation"><a href="#">School 2</a></li>
	               <li role="presentation"><a href="#">School 3</a></li>
	               <li role="presentation"><a href="#">School 4</a></li>
              </ul>
	</div>

 	<div class="row" style="margin-top: 4%">
 		<div class="col-md-offset-0 col-md-11">
		  <div>
				<div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  class="input-group-addon">Name</span>
				  <input type="text" class="form-control" placeholder="Group Name" aria-describedby="addon1" name="signup_group_name" required>
				</div>

		    <div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  class="input-group-addon">Email</span>
				  <input type="email" class="form-control" placeholder="Group email" aria-describedby="addon1" name = "signup_group_email" required>				  
			  </div>

	          
			<div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  class="input-group-addon">Password</span>
		  <input type="password" class="form-control" placeholder="Atleast 8 characters" aria-describedby="addon1" name="signup_group_password" required onKeyUp="passwordKeyUp()"
			  onFocus="passwordOnFocus()"> 
				  </div>
			  
			  
			  
			  
			  
			  
				  
			<div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  					class="input-group-addon">Mentor Name</span>
				  	<input type="text" class="form-control" placeholder="Type Mentor Name" aria-describedby="addon1" name="signup_mentor_name" required>
			  </div>
      		
      		
      		
      		<div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  					class="input-group-addon">Mentor Email</span>
				  	<input type="email" class="form-control" placeholder="Type Mentor Email" aria-describedby="addon1" name="signup_mentor_email" required>
			  </div>
      	
      		
      		<div class="input-group col-md-10 col-md-offset-1" style="margin-bottom:4%"><span  					class="input-group-addon">Mentor Dept.</span>
				  	<input type="text" class="form-control" placeholder="Mentor's department" aria-describedby="addon1" name="signup_mentor_dept" required>
			  </div>
      	  </div>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-11 col-md-offset-0" >
			<button type="submit" class="btn btn-primary btn-block" id="signup_submit" >Submit</button>	
		</div>	
		<br><br><br><br><br><br>
 	</div>
 	</form>
 </div>
<p>
	 
</p>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script src="js/jquery-1.11.3.min.js"></script>

<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="js/bootstrap.js"></script>
<script src="js/login.js"></script>
<?php require 'scripts/login.php'	?>

</body>
</html>


</html>
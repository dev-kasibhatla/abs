
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Account</title>

<!-- Bootstrap -->
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/account.css" rel="stylesheet" type="text/css">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body onLoad="initialize()">
<p id = "onload_message_para">
	<h1>Please wait</h1>
</p>
<div class="header">
 
  <a href="#default" class="logo" id="header_logo">Account</a>
  <div class="header-right">
    <a href="index.html" style="font-weight: bold">Home</a>
	<a href= "index.html" onclick="logout()" style="font-weight: bold" id="top_login_link">Logout</a>
  </div>
</div>
<hr color="#007CFF" width="95%">


<div class="container-fluid" name = "title_block">
  <div class="row" name = "title_block">
    <div class="col-md-3 col-md-offset-3" name = "title_block">
      <h1 class="text-capitalize" id = "account_name_label">Account Name</h1>
    </div>
    <div class="col-md-offset-0 col-md-3">
      <h1 class="text-capitalize" id = "mentor_name_label">Mentor Name</h1>
    </div>
  </div>
  <hr>
</div>
 
 
 <div class="vl"></div>
 
 <div class="container-fluid col-md-offset-2 col-md-4" >
 	<div class="row">
 		<div class="col-md-offset-3 col-md-9"  style="margin-bottom:4%">
			<h2>Actions</h2>
		</div>		
 	</div>

 	<div class="row" style="margin-top: 4%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="#">Book Slot(s)</a>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9" >
			<a href="#">View Booking History</a>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="#">View Account Details</a>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="#">Change Email</a>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="#">Change Password</a>
		</div>	
 	</div>
 </div>	
 
 <div class="container-fluid col-md-offset-0 col-md-4">
 	<div class="row">
 		<div class="col-md-offset-3 col-md-9 " style="margin-bottom: 4%">
			<h2>Your Schedule</h2>
		</div>		
 	</div>

 	<div class="row" style="margin-top: 4%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="#"></a>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9" >
			<a href="#"></a>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="#"></a>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="#"></a>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="#"></a>
		</div>	
 	</div>
 </div>
  
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script src="js/jquery-1.11.3.min.js"></script>

<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="js/bootstrap.js"></script>
<script src="js/account.js"></script>
</body>
</html>

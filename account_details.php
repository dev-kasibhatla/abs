<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Auditorium: Account details</title>

<!-- Bootstrap -->
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/account.css">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
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
  		<div class="row">
  			<div class="col-md-5 col-md-offset-0">
  				<h1 class="text-capitalize" id="account_details_title">
  					Please Wait
  				</h1>
  			</div>
  		</div>
  		
  		<div class="row">
  			<div class="col-md-5 col-md-offset-0" id="account_details_div">
  				
  			</div>
  		</div>
  	</div>
<!-- / FOOTER --> 
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script src="js/jquery-1.11.3.min.js"></script> 
<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="js/bootstrap.js"></script>
<script src="js/account_details.js"></script>
</body>
</html>

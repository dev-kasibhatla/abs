<?php
	session_start();
	if(isset($_SESSION["adminID"])){
		echo "User ID: ".$_SESSION["adminID"];
	}else{
		//not logged in!
		echo '<script type="text/JavaScript">  
		 window.location.replace("adpa.php");
		 </script>' 
		;
		die();
	}
?>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Auditorium: Admin</title>

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



<div class="container-fluid">
  <div class="row">
    <div class="col-md-3 col-md-offset-2">
      <h1 class="text-capitalize" id = "account_name_label">Admin Panel</h1>
    </div>
  </div>
  <hr>
</div>

<div class="container-fluid col-md-offset-2 col-md-4" >
 	<div class="row">
 		<div class="col-md-9 col-md-offset-0"  style="margin-bottom:4%">
			<h2>Actions</h2>
		</div>		
 	</div>

 	<div class="row" style="margin-top: 4%">
 		<div class="col-md-9 col-md-offset-0">
			<a href="#" onclick="generateSlots()">Generate slots in DB</a>
		</div>	
 	</div>
 
 
 </div>	
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script src="js/jquery-1.11.3.min.js"></script> 
<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="js/bootstrap.js"></script>
<script src="js/account.js"></script>
<script>
	var request;
function generateSlots(){
	console.log("Generating dates");
	//send request
	if(request){
		request.abort();
	}
	var genDates = "gendates";
	request = $.ajax({
        url: "scripts/adminactions.php",
        type: "post",
        data: {'action': genDates}
	});
	
	request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("response: "+response);
        if(response == 1){
			
        }else{
			
        }
    });
}
	
</script>
</body>
</html>

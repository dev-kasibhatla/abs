
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title style="display:none;">Account</title>
<meta name="viewport" content="width=device-width, initial-scale=1">


<!-- Bootstrap -->

<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/account.css" rel="stylesheet" type="text/css">

</head>
<body onLoad="initialize()">


<!-- Modal -->
<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Cancel Slot?<br> This action is permanent and cannot be reverted.</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          
        </button>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" class="btn btn-danger" onclick = "cancelSlot()">Yes</button>
      </div>
    </div>
  </div>
</div>



<p >
	<h1 id = "onload_message_para">Please wait</h1>
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
    <div id="activation" class="row" style="margin-top: 4%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="#" onclick="activateAccount()">Your account isn't activated, click here to activate</a>
		</div>	
 	</div>
 	<div class="row" style="margin-top: 4%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="book.php">Book Slot(s)</a>
		</div>	
 	</div>

 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="account_details.php">View Account Details</a>
		</div>	
 	</div>

 	<div class="row" style="margin-top: 2%">
 		<div class="col-md-offset-3 col-md-9">
			<a href="acc_change_password.php">Change Password</a>
		</div>	
 	</div>
 </div>	
 
 <div class="container-fluid col-md-offset-0 col-md-4">
 	<div class="row">
 		<div class="col-md-offset-3  col-md-9" >
			<h2>Your Schedule</h2>			
		</div>
		<div class="col-md-4 col-md-offset-3">
			<font color="#green"> <strong> ■ </strong> </font>			
			<strong> Booked </strong>		
		</div>
		<div class="col-md-4 col-md-offset-1">
			<font color="grey"> <strong> ■ </strong> </font>			
			<strong> Queued</strong>		
		</div>	
 	</div>
 	
	<div id="future-booking-preview">
		
	</div>

 	
 </div>


  
<script src="https://kit.fontawesome.com/834927bd13.js" crossorigin="anonymous"></script>
<script
  src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

<script src="js/account.js"></script>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Auditorium: Book slots</title>

<!-- Bootstrap -->
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/account.css">

</head>
<body onload = "initialize()">
<div class="header">
 
  <a href="#default" class="logo" id="header_logo">Book</a>
  <div class="header-right">
    <a href="index.html" style="font-weight: bold">Home</a>
	<a href="account.php" style="font-weight: bold">Account</a>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-offset-0 col-md-4">
      <h1 class="text-center">Book Slots</h1>
    </div>
    <div class="col-md-4 col-md-offset-3">
		<h3 class="text-center" id="account_name_label">Account Name</h3>
    </div>
  </div>
  <hr>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-offset-1 col-md-4">
		<h3>Select all slots that apply</h3>   		
    </div>    
    <div class="col-md-3 col-md-offset-3">   
		<br>Date: <input type="date" id="date_input" onkeyup="onDateChanged()">        	
    </div>   
  </div>
  <div class="row">
    <div class="col-md-10 col-md-offset-1 selection-background" id="button_view">
    
    <h4 class="text-center" id="date_confirm">Loading</h4>
    <!--Buttons show up here -->
    
    <div class="form-group">
        <div class="items-collection" id="button_container" style="padding-bottom:2%">
          </div>
        </div>  
    
   
		
    </div>    
  </div>
   <div class="row" style="margin-top: 2%">   		
   		 <div class="col-md-1 col-md-offset-8" >
			<button type="clear_slots" class="btn btn-default btn-block" onclick="clearSlots()">Clear</button>	
		</div>	
		<div class="col-md-2 col-md-offset-0" >
			<button type="submit_slots" class="btn btn-primary btn-block" onclick="loadData()">Submit</button>	
		</div>	
		
		<br><br><br><br><br><br>
 	</div>
<style>


.items-collection{
    margin:10px 0 0 0;
}
.items-collection label.btn-default.active{
    background-color:#007CFF;
    color:#FFF;
}
.items-collection label.btn-default{
    width:90%;
    border:1px solid #007CFF;
    margin:5px; 
    border-radius: 5px;
    color: #305891;
}
.items-collection label .itemcontent{
    width:100%;
}
.items-collection .btn-group{
    width:90%
}
</style>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script src="js/jquery-1.11.3.min.js"></script> 
 
<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="js/book.js"></script>
<script src="js/bootstrap.js"></script>


</body>
</html>

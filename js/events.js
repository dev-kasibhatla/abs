<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Auditorium - home</title>
<!-- Bootstrap -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link href="css/login.css" rel="stylesheet" type="text/css">
<link href="css/index.css" rel="stylesheet" type="text/css">
</head>

<body>

	<nav class="navbar navbar-expand-lg navbar-dark bg-dark2 shadow-sm nav">
		<a class="navbar-brand" href="#">Auditorium Booking System</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
		  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
	
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
		  <ul class="navbar-nav mr-auto"></ul>
		  <ul class="navbar-nav my-2 my-lg-0">
			<!-- <li class="nav-item">
			  <a href="login.html" class="active nav-link">Already have an account? Go to login</a>
			</li> -->
	
			<li class="nav-item active">
			  <a class="nav-link" href="index.html">Home<span class="sr-only">(current)</span></a>
			</li>
	
			<li class="nav-item dropdown">
			  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false" name="clubName">
				Account
			  </a>
			  <div class="dropdown-menu dropdown-menu-right" style="right:0" aria-labelledby="navbarDropdown">
				<a class="dropdown-item " href="account.html">Account overview</a>
				<a class="dropdown-item" href="#">Events</a>
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">Logout</a>
			  </div>
			</li>
		  </ul>
		</div>
	  </nav>
	  <div style="height: 75px;"></div>
	  <section>
		  <div class="main-margin">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-12 flat-glass-no-hover margin-5">
						<h1>Events</h1><hr>
						<div class="text-description">
							View past and upcoming events of the club
						</div>
						<div class="div-10"></div>
						<!-- todo: replace this and all occurences of club name in a loop-->
						<h4 name="clubName" class="color-purple">Club Name</h4>
					</div>
				</div>
                
			</div>
			<div class="div-20"></div>
            <div class="container-fluid">
                <div class="row" id = "eventContainer">
                    
                </div>
            </div>
          </div>
          
		<div class="div-20"></div>
		<div class="div-20"></div>
		<div class="div-20"></div>

	  </section>

	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
		crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
		crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.matchHeight/0.7.2/jquery.matchHeight-min.js"></script>
	 <script src="js/events.js"></script>
	<script>

	</script>
</body>
</html>

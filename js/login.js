var scale = 'scale(0.90)';
document.querySelector("#mainbody").style.webkitTransform =  scale;    // Chrome, Opera, Safari
 document.querySelector("#mainbody").style.msTransform =   scale;       // IE 9
 document.querySelector("#mainbody").style.transform = scale;     // General

//start

function signupSubmitClicked(){
	document.getElementById("login_message").innerHTML="Button clicked";
	//execute php script
	//$.post("js/php/validate.php");
	//$.get("js/php/validate.php");
	//$.load("js/php/validate.php");
	//$("p").hide();
	//using jquery with ajax
	$.POST("js/php/validate.php");
	
}


function initialize(){
	$(document).ready(function(){
		document.getElementById("login_message").innerHTML="Page has loaded";
		
	});
}

//script to validate password
var passInput = document.getElementsByName("signup_group_password");
passInput.onfocus = function() {
	document.getElementById("signup_password_error").style.display=none;
	document.getElementById("login_message").innerHTML="Button clicked";

};
passInput.onblur = function() {
	document.getElementById("signup_password_error").style.display = none;
};

function passwordKeyUp(){
	document.getElementById("signup_password_error").style.display=none;
}

function passwordOnFocus(){
	document.getElementById("signup_password_error").style.display=none;

}



var scale = 'scale(0.90)';

//start
function initialize(){
	hideStuff(true);
	$(document).ready(function(){
		//hide everything
		
		console.log("Checking account status");
		checkAccountStatus();
    });
}

//account_name_label
//mentor_name_label
//account level needs to be checked
var request;

function checkAccountStatus(){
	//if user is logged in, set login link to logout
	
	//get all information
	if(request){
		request.abort();
	}
	
	var askForLoginInfo = "login_info";
	
	request = $.ajax({
        url: "../scripts/account.php",
        type: "post",
        data: {'action': askForLoginInfo}
	});
	
	request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        if(response == 0){
			//user not logged in. Redirect to login			
			console.log("redirecting to login");
			window.location.replace("login.php");
        }else{
			//user is logged in
			var res = JSON.parse(response);
			$("#account_name_label").text(res.groupname);
			$("#mentor_name_label").text(res.mentorname);
			hideStuff(false);
        }
    });
}

function logout(){
	if(request){
		request.abort();
	}
	
	var askLogout = "logout";
	
	request = $.ajax({
        url: "../scripts/account.php",
        type: "post",
        data: {'action': askLogout}
	});
	
	request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
		if(response == 1){
			console.log("User logged out");
	   }
		   
    });
	
	
}

function hideStuff(h){
	if(h){
		$("div").hide();
		$("onload_message_para").show();
	}else{
		$("*").show();
		$("#onload_message_para").hide();
	}
}
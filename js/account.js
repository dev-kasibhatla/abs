var scale = 'scale(0.90)';
var globalAccountData;
var deleteTime;
//start


function checkLogin() {
    if(request)
        request.abort();
    request = $.ajax({
        url:"../api/auth/login.php",
        type:"get"
    });
    request.done(function (response, textstatus,jqXHR){
        console.log(JSON.parse(jqXHR.responseText));
        if("success" in response) {
           
           console.log("user is logged in");
        }

    });
	request.fail(function(jqXHR, textstatus,errorThrown){
    	console.log(JSON.parse(jqXHR.responseText));
		console.log("User not logged in ");
		window.location.replace('login.html');
    });
}


function initialize(){
	hideStuff(true);
	checkLogin();
	$('.modal').hide();
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
			alert("Please register a group to use the auditorium booking system");
			console.log("redirecting to login");
			window.location.replace("login.php");
        }else{
			//user is logged in
			var res = JSON.parse(response);	

			$("#account_name_label").text(res.groupname);
			$("#mentor_name_label").text(res.mentorname);
			hideStuff(false);
			if(res.activated==0)
			{
			    $("#activation").show();
			}
			else{
			   $("#activation").hide();
			}
			globalAccountData = res;
			//now fetch user's schedule
			fetchSchedule();
        }
    });
}
function activateAccount()
{
   if(request){
		request.abort();
	}
	
	var action = "activate";
	$("#activation").html("<h4>Please Wait. Activating your account</h4>");
	request = $.ajax({
        url: "../scripts/account.php",
        type: "post",
        data: {'action': action, 'group': globalAccountData.mentorname, 'groupid': globalAccountData.groupid}
	}); 
	request.done(function (response, textStatus, jqXHR){
	   var res = JSON.parse(response);
	   if(res.activation==1)
	   {
	       alert("account activated successfully");
	        $("#activation").hide();
	   }
	   else{
	       alert("account activation failed");
	        $("#activation").html("<a href=\"#\" onclick=\"activateAccount()\">Your account isn't activated, click here to activate</a>");
	      
	   }
	    
	});
}

function fetchSchedule(){
	if(request){
		request.abort();
	}
	
	var askForSchedule = "future_schedule";
	$("#future-booking-preview").html("<div class=\"row\" >	<div class=\"col-md-offset-3 col-md-9\" align=\"center\">		<h4 align=\"left\"><br>Please Wait. Fetching your schedule</h4></div></div>");
	request = $.ajax({
        url: "../scripts/account.php",
        type: "post",
        data: {'action': askForSchedule, 'group': globalAccountData.username}
	});
	
	var bookedSlots = [];
	var queuedSlots = [];
	request.done(function (response, textStatus, jqXHR){
		
		// Log a message to the console
		console.log("response for slot request:");
        console.log(response);
        if(response == 0){
			//console.log("Error fetching slots");
        }else{
			var rightNow = new Date();
			var r = rightNow.toISOString().slice(0,10).replace(/-/g,"");
			currSlot = parseInt(r+rightNow.getHours());
			
			var res = JSON.parse(response);
			if(res.totalBooked > 0){
				console.log("Total booked slots: " + res.totalBooked);
				for(var i=0; i < res.totalBooked; i++){
					var temp = i.toString();
					var t2 = parseInt(res[temp]);
					if(t2 > currSlot){
						console.log("T2: " + t2 + " > " + currSlot);
						bookedSlots.push(t2);
					}
				}
			}
			if(res.totalQueued > 0){
				console.log("Total queues slot: " + res.totalQueued);
				for(var i=res.totalBooked; i < res.totalQueued + res.totalBooked; i++){
					var temp = i.toString();
					var t2 = parseInt(res[temp]);
					if(t2 > currSlot){
						console.log("T2: " + t2 + " > " + currSlot);
						queuedSlots.push(t2);
					}
				}
			}
			//collect 5 earliest slots
			
			var allSlots = [];
			for (var b=0;b<bookedSlots.length;b++){
				allSlots.push(bookedSlots[b]);
			}
			for(q=0;q<queuedSlots.length;q++){
				allSlots.push(queuedSlots[q]);
			}
			allSlots.sort();
			//var htmlCode = "<style> .grey-background {	background-color: #E0E0E0;	margin-top: 3px;	margin-bottom:3px;	padding-top:2px;	padding-bottom: 2px;}	.green-background {	background-color: #7BFF82;	margin-top: 3px;	margin-bottom:3px;	padding-top:2px;	padding-bottom: 2px;}	</style> ";
			var htmlCode = "";
			var bCol = "";
			var sTime = "";
			var i=0;
			for(var c=0; c < allSlots.length; c++){
				s=allSlots[c].toString();
				if(i>5){
					break;
				}
				//background color
				if(bookedSlots.indexOf(allSlots[c]) !== -1){
					//s is a booked slot
					console.log("s is a booked slot");
					bCol = "green-background ";	
				}else if(queuedSlots.indexOf(allSlots[c]) !== -1){
					console.log("s is a queued slot");
					bCol = "grey-background ";
				}else{
					console.log("Can't find in booked and queued");
				}
				//slot time
				month = parseInt(s.substring(4,6)) - 1;
				var d = new Date(s.substring(0,4),month.toString(),s.substring(6,8),s.substring(8,10));
				var temp = d.getHours()+1;
				sTime = d.toDateString() + " from " + d.getHours() + ":00 to " + temp + ":00";
				
				//html code

				htmlCode += "<div class=\"row\"> <div class=\" ";
				
				htmlCode += bCol;

				htmlCode += "col-md-offset-3 col-md-9\" align=\"center\"> <h4 align=\"left\">" + "<button type=\"button\" id=\""+s+"\" class=\"btn  modalVala \"><i class=\"far fa-times-circle fa-2x danger\"></i></button><br><br>"+" Slot Time:  ";
				
				htmlCode += sTime;
				htmlCode += " </h4> <h4 align=\"left\" >Slot ID:  ";
				htmlCode += s;
				htmlCode += " </h4></div></div> ";
				i++;
			}
			$("#future-booking-preview").html(htmlCode);
			if(allSlots.length == 0){
				$("#future-booking-preview").html("<br><div class=\"row\" >	<div class=\"col-md-offset-3 col-md-9\" align=\"center\">		<h4 align=\"left\">You have no upcoming bookings</h4></div></div>");
			}
			//console.log(htmlCode);
			console.log("Sizes: " + allSlots.length + "  " + bookedSlots.length + "  "+ queuedSlots.length);

        }
    });
}


   $("#future-booking-preview").on('click',".modalVala",function(){

         // show Modal
         console.log(this.getAttribute('id'));
         deleteTime = parseInt(this.getAttribute('id'));
         $('#myModal').modal('show');
    });



function fetchPastSchedule(username){
	if(request){
		request.abort();
	}
	
	var askForSchedule = "past_schedule";
	
	request = $.ajax({
        url: "../scripts/account.php",
        type: "post",
        data: {'action': askForSchedule, 'group': username}
	});
	
	request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        if(response == 0){
			console.log("Error fetching past slots");
        }else{
			//user is logged in
			var res = JSON.parse(response);
			//$("#account_name_label").text(res.groupname);
			
        }
    });
}

function logout(){
	if(request){
		request.abort();
	}
	
	var askLogout = "logout";
	console.log("Trying to logout");
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

function cancelSlot()
{

	if(request){
		request.abort();
	}
	console.log("Cancelling slot "+ deleteTime);
	request = $.ajax({
        url: "../scripts/account.php",
        type: "post",
        data: {'action': 'cancelslot','time':deleteTime}
	});
	
	request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        var res = JSON.parse(response);
		if(res['response'] == 1){
			console.log("Slot was deleted");
	    }
	    $('#myModal').modal('toggle');
	    fetchSchedule();
	    
		   
    });

}



function hideStuff(h){
	if(h){

		$("div").hide();
		$("onload_message_para").show();
	}else{
		$("*").show();
		$('.modal').hide();
		$("#onload_message_para").hide();
	}
}





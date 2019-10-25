var scale = 'scale(0.90)';
var globalAccountData;
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
			globalAccountData = res;
			//now fetch user's schedule
			fetchSchedule();
        }
    });
}

function fetchSchedule(){
	if(request){
		request.abort();
	}
	
	var askForSchedule = "future_schedule";
	
	request = $.ajax({
        url: "../scripts/account.php",
        type: "post",
        data: {'action': askForSchedule, 'group': globalAccountData.username}
	});
	
	var bookedSlots = [];
	var queuedSlots = [];
	request.done(function (response, textStatus, jqXHR){
		$("#future-booking-preview").html("<div class=\"row\" >	<div class=\"col-md-offset-3 col-md-9\" align=\"center\">		<h4 align=\"left\">Please Wait. Fetching your schedule</h4></div></div>");

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
				for(var i=res.totalBooked; i < res.totalQueued + totalBooked; i++){
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
			allSlots.push(...bookedSlots);
			allSlots.push(...queuedSlots);
			allSlots.sort();
			var htmlCode = "";
			var bCol = "";
			var sTime = "";
			var i=0;
			for(s in allSlots){
				if(i>5){
					break;
				}
				//background color
				if(bookedSlots.indexOf(s) !== -1){
					//s is a booked slot
					bCol = "green-background ";	
				}else if(queuedSlots.indexOf(s) !== -1){
					bCol = "grey-background ";
				}
				//slot time
				var d = new Date(s.substring(0,4),s.substring(4,6),s.substring(6,8),s.substring(8,10));
                var temp = d.getHours()+1;
				sTime = d.toDateString() + " from " + d.getHours() + ":00 to " + temp + ":00";
				
				//html code
				htmlCode += "<div class=\"row\"> <div class=\" ";
				htmlCode += bCol;
				htmlCode += " col-md-offset-3 col-md-9\" align=\"center\"> <h4 align=\"left\">Slot Time:  ";
				htmlCode += sTime;
				htmlCode += " </h4> <h4 align=\"left\" >Slot ID:  ";
				htmlCode += s;
				htmlCode += " </h4></div></div> ";
				i++;
			}
			$("#future-booking-preview").html(htmlCode);
			if(allSlots.length == 0){
				$("#future-booking-preview").html("<div class=\"row\" >	<div class=\"col-md-offset-3 col-md-9\" align=\"center\">		<h4 align=\"left\">You have no upcoming bookings</h4></div></div>");
			}
			console.log("Sizes: " + allSlots.length + "  " + bookedSlots.length + "  "+ queuedSlots.length);

        }
    });
}

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

function hideStuff(h){
	if(h){
		$("div").hide();
		$("onload_message_para").show();
	}else{
		$("*").show();
		$("#onload_message_para").hide();
	}
}
var scale = 'scale(0.90)';

//start
function initialize(){
	getAccountData();
}

//account_name_label
//mentor_name_label
//account level needs to be checked
var request;

function getAccountData(){
	//if user is logged in, set login link to logout
	
	//get all information
	if(request){
		request.abort();
	}
	
	var askForLoginInfo = "account_data";
	
	request = $.ajax({
        url: "../scripts/account_details.php",
        type: "post",
        data: {'action': askForLoginInfo}
	});
	
	request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        switch(response){
			case "-2":
				//error connecting mysql
				break;
			default:
				displayData(response);
				break;
		}
    });
}

function displayData (data){
	//decode json
	var res = JSON.parse(data);
	var lev="Level error";
	switch(res.level){
		case "0":
			lev="User account";
			break;
		case "1":
			lev="Mentor account";
			break;
		case "2":
			lev="Management account";
			break;
		case "3":
			lev="Admin";
			break;
	}
	
	$("#account_details_title").text("Account Details");
	//DAMN! can't use a loop
	var content = [
		"School: " + res.schoolname,
		"Group: " + res.groupname,
		"Email (Username): " + res.username,
		"Mentor: " + res.mentorname,
		"Mentor Email: " + res.mentoremail,
		"Account level: " + lev
	];

	for(i=0;i<content.length;i++){
		$("#account_details_div").append(
			"<h4 class=\"text-capitalize\">"
				+content[i]+"</h4>"
		);
	}

}

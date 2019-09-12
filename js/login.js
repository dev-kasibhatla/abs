var scale = 'scale(0.90)';

//start
function initialize(){
	$(document).ready(function(){
        $("#login_message").hide();
    });
}



//jquery code to submit login form:
var request;

$("#login_form").submit(function(event){
    $("#login_message").hide();
	console.log("Submitting login data now");
    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
	
    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "../scripts/login-validate.php",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        if(response == 1){
            //user is logged in
			//redirect to account page
			window.location.replace("account.php");

        }else{
            //user not logged in. Redirect to login
			console.log("Invalid login");
			$("#login_message").show();        }
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
        
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

});




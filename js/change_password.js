var scale = 'scale(0.90)';

//start
function initialize(){
	$(document).ready(function(){
        $("#login_message").hide();
    });
}



//jquery code to submit login form:
var request;

$("#change_password_form").submit(function(event){
	$("#login_message").text("");
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
        url: "../scripts/change_password.php",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        switch (response){
            case "1":
                //successful
                console.log("Password changed");
                $("#login_message").text("Password changed. Please login again");
                $("#login_message").show();
                window.location.replace("login.php");
                break;
            case "0":
                //new passwords don't match
                console.log("Passwords don't match");
                $("#login_message").text("New Passwords don't match");
                $("#login_message").show();
                break;
            case "-1":
                console.log("New password can't be same");
                $("#login_message").text("New and old password can't be same");
                $("#login_message").show();
                break;
            case "-2":
                console.log("mysql problem");
                $("#login_message").text("There was an error connecting to our servers");
                $("#login_message").show();
                break;
            case "-3":
                console.log("Password needs 8 chars");
                $("#login_message").text("Password should be atleast 8 characters long");
                $("#login_message").show();
                break;
            case "-4":
                console.log("Wrong password");
                $("#login_message").text("Old password is incorrect");
                $("#login_message").show();
                break;
                
        }
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




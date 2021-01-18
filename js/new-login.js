var scale = 'scale(0.90)';

//start
$(document).ready(initialize);
function initialize(){

        $("#login_message").hide();
        $("#errorDiv").html("");

}

var a  =  $("input");
$(a).focus(function() {
   $(this).css('border',"none");
   $("#errorDiv").html("");
   $("#emailHelp").html("");
});

//jquery code to submit login form:
var request;

$("#btnSubmit").click(function(event){
    var abort =0;
    $("#emailHelp").html("");
    $("#errorDiv").html("");
    $("#login_message").hide();
	console.log("Submitting login data now");
    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $("#loginForm");

    // Let's select and cache all the fields
    var $inputs = $($form).find("input, select, button, textarea");
    
    $.each($inputs, function(k,e) {
        if(e.type=="email")
        {
            if((e.value.length < 5))
            {
                $("#emailHelp").html("<strong class=\"text-danger\">Email should have more characters </strong>");
                $(e).css('border',"2px solid red");
                abort = 1;
            }
            
        }
        else if(e.type=="password")
        {
            const repass = /^(([^<>\'(=)\[\]\\.,;:\s"]+(\.[^<>()\[\]\\.,;:\s"]+)*)|(".+"))$/;
            if(!repass.test($(e).value)){
                $("#errorDiv").html("<strong class=\"text-danger\">The password doesnt meet requirements </strong>");
                $(e).css('border',"2px solid red");
                abort = 1;
            }
            else if(e.value.length < 8)
            {
                $("#errorDiv").html("<strong class=\"text-danger\">The password is wrong</strong>");
                $(e).css('border',"2px solid red");
                abort = 1;
            }
        }
        else if(e.type=="checkbox")
        {
            if($(e).val()!=="on" && $(e).val()!=="off")
            {
                console.log($(e).val());
                $("#errorDiv").html("<strong class=\"text-danger\">Invalid RM</strong>");
                abort = 1;
            }
        }
    });
    if(abort)
    return;

    // Serialize the data in the form
    var serializedData = $form.serializeArray();
    console.log(serializedData);
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




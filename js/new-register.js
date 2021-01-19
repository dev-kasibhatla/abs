function initialize() {
    getSchools();
    $("#emailHelp").html("");
    $("#errorMentor").html("");
    $("#errorGroupDetails").html("");
    $("#errorPassword").html("");

}
function jQFormSerializeArrToJson(formSerializeArr){
    var jsonObj = {};
    jQuery.map( formSerializeArr, function( n, i ) {
        jsonObj[n.name] = n.value;
    });

    return jsonObj;
}
var request;
var a  =  $("input");
$(a).focus(function() {
   $(this).css('border',"none"); 
});
function getSchools(){
   
    request = $.ajax({
        url: "../scripts/register-data.php",
        type: "post",
        data: {event:"schoolData"}
    });
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        if(response.length > 0){
            var schools = JSON.parse(response);
            var select = $("#inputSchool");
            for(var i=0;i<schools.length;i++)
            {
                $(select).append("<option value=\"i+1\">"+schools[i]+"</option>")
            }

        }else{
            //user not logged in. Redirect to login
            console.log("Could not fetch schools data");
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

}
$("#btnSubmit").click(function(){
    var abort=0
    // $("#login_message").hide();
    $("#emailHelp").html("");
    $("#phoneHelp").html("");
    $("#errorMentor").html("");
    $("#errorGroupDetails").html("");
    $("#errorPassword").html("");
    

    
	console.log("Submitting register data now");
    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $f = $('.registerForms');
    var $inputs;

    // Let's select and cache all the fields
    Array.prototype.forEach.call($f,form => {
        
        $inputs = $(form).find("input, select, button, textarea");
        const re = /^(([^<\*>\'(=)\[\]\\.,;:\s"0-9@]+(\.[^<>()\[\]\\.,;:\s"]+)*)|(".+"))$/;
        const repass = /^(([^<>\'(=)\[\]\\.,;:\s"]+(\.[^<>()\[\]\\.,;:\s"]+)*)|(".+"))$/;
        for(var i=0;i<$inputs.length;i++)
        {
            switch ($inputs[i].type) {
                case "email":
                {
                    if($($inputs[i]).parent().parent().attr('id')=="form1")
                    {
                        if(($inputs[i].value.length < 5))
                        {
                            $("#emailHelp").html("<strong class=\"text-danger\">Email should have more characters </strong>");
                            $($inputs[i]).css('border',"2px solid red");
                            abort = 1;
                        }
                    }
                    else
                    {
                        if(($inputs[i].value.length < 5))
                        {
                            $("#errorMentor").html("<strong class=\"text-danger\">Email should have more characters </strong>");
                            $($inputs[i]).css('border',"2px solid red");
                            abort = 1;
                        }
                    }
                        
                    break;
                }
                case "password":
                {
                    if(!repass.test($inputs[i].value))
                    {
                        $("#errorPassword").html("<strong class=\"text-danger\">Please enter a valid password with the appropriate characters</strong>");
                        $($inputs[i]).css('border',"2px solid red");
                        abort = 1;  
                    }
                    if(($inputs[i].value.length < 8))
                    {
                        $("#errorPassword").html("<strong class=\"text-danger\"> Password has to have more than eight characters </strong>");
                        $($inputs[i]).css('border',"2px solid red");
                        abort = 1;
                    }
                    if($inputs[i].value!==$("#inputPassword2").val())
                    {
                        $("#errorPassword").html("<strong class=\"text-danger\"> Both the passswords should match </strong>");
                        $($inputs[i]).css('border',"2px solid red");
                        abort = 1;
                    }
                    break;     
                }        
                case "text":   
                {
                	if($($inputs[i]).parent().parent().attr('id')=="form2")    
                    {

                        if(!repass.test($inputs[i].value))
                        {
                            $("#errorGroupDetails").html("<strong class=\"text-danger\">Please enter valid group details</strong>")  ;
                            $($inputs[i]).css('border',"2px solid red");
                             abort = 1;
                        }
                        if(($inputs[i].value.length < 7))
                        {
                            var a = $("label[for='"+$($inputs[0]).attr('id')+"']").text()
                            $("#errorGroupDetails").html("<strong class=\"text-danger\">"+ a +" should have atleast 7 characters  </strong>");
                            $($inputs[i]).css('border',"2px solid red");
                            abort = 1;
                        }
                    }
                    else
                    {
                        if(!repass.test($inputs[i].value))
                        {
                            $("#errorMentor").html("<strong class=\"text-danger\">Please enter valid mentor details</strong>")  ;
                            $($inputs[i]).css('border',"2px solid red");
                            abort = 1;
                        }
                        if(($inputs[i].value.length < 7))
                        {
                            var a = $("label[for='"+$($inputs[0]).attr('id')+"']").text()
                            $("#errorMentor").html("<strong class=\"text-danger\">"+ a +" should have atleast 7 characters  </strong>");
                            $($inputs[i]).css('border',"2px solid red");
                            abort = 1;
                        }    
                    }        
                    break;
                }
                case "tel":   
                {
                    if($inputs[i].value.length<10)
                    {
                        $("#phoneHelp").html("<strong class=\"text-danger\">Please enter a valid 10 digit phone number</strong>");
                        $($inputs[i]).css('border',"2px solid red");
                        abort = 1;
                    }
                    break;
                }
            }
        }
    });
    
	
    // Serialize the data in the form
    let serializedArr = $('#form1,#form2,#form3,#form4').serializeArray();
    console.log(serializedArr);
    let serializedData = jQFormSerializeArrToJson(serializedArr);
    console.log(serializedData);
    // Let's disable the inputs for the duration of the Ajax request.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "../api/auth/reg-club.php",
        type: "post",
        data: JSON.stringify(serializedData)
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
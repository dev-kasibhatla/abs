var request;
function initialize(){
    //check if the user is logged in
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
		//	window.location.replace("login.php");
        }else{
			//user is logged in
			var res = JSON.parse(response);
			$("#account_name_label").text(res.groupname);
            $(document).ready(function(){
                loadButtons();
            });
        }
    });
}

function loadButtons(){

}


function clearSlots(){

    $.each($("input[name='slot_input']:checked"), function(){            
        console.log($(this).val());
        $(this).prop('checked',false);
    });
    loadData();
}

function loadData(){
    //set datepicker
    var $j = jQuery.noConflict();
    $j('#datePicker').datepicker({
            format: 'mm/dd/yyyy'
        })
        .on('changeDate', function(e) {
            // Revalidate the date field
            $('#eventForm').formValidation('revalidateField', 'date');
        });

    $('#eventForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'The name is required'
                    }
                }
            },
            date: {
                validators: {
                    notEmpty: {
                        message: 'The date is required'
                    },
                    date: {
                        format: 'MM/DD/YYYY',
                        message: 'The date is not a valid'
                    }
                }
            }
        }
    });

    //load into div id = "button_container"
    /*
    button code:
    <div class="items col-xs-6 col-sm-3 col-md-3 col-lg-3">
                    <div class="info-block block-info clearfix">
                        <div data-toggle="buttons" class="btn-group bizmoduleselect">
                            <label class="btn btn-default" name="slot_button">
                                <div class="itemcontent">
                                    <input type="checkbox" autocomplete="off" value="s1" name="slot_input">
                                    <h5>car</h5>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
    */

    //get data from database



    //Each button will have 2 unnique values: Name (slot timing), value (slot id)
    //Check if a slot is booked and set the button colour accordingly


    var button_name ="default name";
    var button_value = "def_value";
    var button_title = "default_title";
   $("#button_container").html("");
    for(var i =0; i < 10; i++){
        $("#button_container").append("<div class=\"items col-xs-6 col-sm-3 col-md-3 col-lg-3\" ><div class=\"info-block block-info clearfix\"><div data-toggle=\"buttons\" class=\"btn-group bizmoduleselect\"><label class=\"btn btn-default\" name=\" "+
        button_name +
        " \"><div class=\"itemcontent\"><input type=\"checkbox\" autocomplete=\"off\" value=\" "+
        button_value + 
        " \" name=\"slot_input\"><h5> "+
        button_title +
        " </h5></div></label></div></div></div> ");

    }

}
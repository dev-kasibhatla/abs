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
			window.location.replace("login.php");
        }else{
			//user is logged in
			var res = JSON.parse(response);
			$("#account_name_label").text(res.groupname);
            $(document).ready(function(){
                loadButtons();
            });
        }
    });
    if($("#date_input").val() == ""){
        var now = new Date();

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        $("#date_input").val(today);
    }
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
    //get date from datepicker
    if($("#date_input").val() == ""){
        var now = new Date();

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        $("#date_input").val(today);
    }
    var date = $("#date_input").val();
    console.log("Date is: "+date);
    
    //request data to server:
    if(request){
		request.abort();
	}
    var askForInfo = "get_book";
	
	request = $.ajax({
        url: "../scripts/account.php",
        type: "post",
        data: {'action': askForInfo, 'date':date}
    });
    

    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        if(response == 0){
			console.log("Error occured");
        }else{
            //got data from server
            //now load it into buttons
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

function submitSlotData(){
    console.log("Selected slots: ");
    $.each($("input[name='slot_input']:checked"), function(){            
        console.log($(this).val());
        $(this).prop('checked',false);
    });
}
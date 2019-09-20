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

    clearSlots();
}

function onDateChanged(){
    clearSlots();
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
var slots = new Array();

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
        url: "../scripts/book.php",
        type: "post",
        data: {'action': askForInfo, 'date':date}
    });
    
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        //console.log(response);
        if(response == 0){
			console.log("Error occured");
        }else{
            //got data from server
            //now load it into buttons
            var res = JSON.parse(response);
            console.log("Got "+parseInt(res.size)+" slots from server");
            //put all those slot ids in an array
            var i = 0;
            for(i =0;i<parseInt(res.size);i++ ){
                var temp = i.toString();
                var data = parseInt(res[temp]);
                //console.log("data: "+data);
                slots.push(data);
            }
           // console.log("Here is the collected slot data:");
            //console.log(slots);
            setSlotsOnScreen();
        }
    });

}

function setSlotsOnScreen(){


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


    //Each button will have 2 unnique values: Name (slot timing), value (slot id)
    //Check if a slot is booked and set the button colour accordingly

    //date container id is date_confirm

    var button_name ="default name";
    var button_value = "def_value";
    var button_title = "default_title";
   $("#button_container").html("");
   //construct a confirmatiion date string
   var t1 = slots[0].toString();
   var cds = t1.substring(6,8)+"/"+t1.substring(4,6)+"/"+t1.substring(0,4);
   $("#date_confirm").html(cds);
   console.log("Length of slots is "+slots.length);
    for(var i =0; i < slots.length; i++){
        
        button_name = slots[i].toString().substring(8,10) + " to " + (slots[i] + 1).toString().substring(8,10) + " hrs";
        button_value = slots[i];
        button_title = button_name;
        console.log("Button name " + i + ": " + button_name);
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
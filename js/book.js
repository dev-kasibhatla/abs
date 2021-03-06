var request;
var grpemail;
$("document").ready(initialize);
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
        //console.log(response);
        if(response == 0){
			//user not logged in. Redirect to login			
			console.log("redirecting to login");
			window.location.replace("login.php");
        }else{
			//user is logged in
			var res = JSON.parse(response);
			console.log("Level is "+ res.level);
			if(res.level==0)
			{
	
	            var a =  "<a href=\"https://absabs2.000webhostapp.com/account.php\">Return to Account Page</a>";
			    $("html").html("Student Groups cannot make bookings<br>" + a);
			    
			}
			grpemail = res['username']
			$("#account_name_label").text(res.groupname);
            //$(document).ready(function(){});
            //console.log("User is :"+res.groupname);
            clearSlots();

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
function onDateChanged(){
    clearSlots();
}
function clearSlots(){

    $.each($("input[name='slot_input']:checked"), function(){            
        console.log($(this).val());
        $(this).prop('checked',false);
    });
    slots=[];
    slota=[];
    slotb=[];
    loadData();
    
}
//slot ids
var slots = new Array();
// a is current booking
//b is queued booking
var slota = new Array();
var slotb = new Array();
function loadData(){
    //visual indicators to show that the page is loading
    $("#date_confirm").html("Loading");
    $("#button_container").html("");

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
        data: {'action': askForInfo, 'date':date, 'grpname':grpemail}
    });
    
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log(response);
        if(response == 0){
			console.log("Error occured");
        }else{
            //got data from server
            //now load it into buttons
            var res = JSON.parse(response);
            console.log("Got "+parseInt(res.size)+" slots from server");
            //put all those slot ids in an array
            var i = 0;
            var rightNow = new Date();
			var r = rightNow.toISOString().slice(0,10).replace(/-/g,"");
			currSlot = parseInt(r+rightNow.getHours());                
            console.log("currSlot: "+currSlot);
            for(i =0;i<parseInt(res.size);i++ ){
                var temp = i.toString();
                var data = parseInt(res[temp]);
                console.log("data: "+data);
                if(data>currSlot){
                    
                    slots.push(data);
                    var a = i.toString() + "a";
                    var b = i.toString() + "b";
                    slota.push(res[a]);
                    slotb.push(res[b]);
                }
            }
            console.log("Here is the collected slot data:");
            console.log(slots);
            setSlotsOnScreen();
        }
    });

}
function setSlotsOnScreen(){

    //sample html code
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


    //Each button will have 2 unique values: Name (slot timing), value (slot id)
    //Check if a slot is booked and set the button colour accordingly

    //date container id is date_confirm
    
    
    if(slots.length == 0){
        $("#date_confirm").html("Slots are unavailable on this date");
    }else{
        var button_name ="default name";
        var button_value = "def_value";
        var button_title = "default_title";
        //var button_colour = "#007CFF"; //default blue
        //grey  #CFCFCF
        //ltblue #9BE7FF
        //ltyellow F9FFBA
        //ltgrey #E3E3E3  
        //construct a confirmatiion date string
        var t1 = slots[0].toString();
        var cds = t1.substring(6,8)+"/"+t1.substring(4,6)+"/"+t1.substring(0,4);
        $("#date_confirm").html(cds);
        console.log("Length of slots is "+slots.length);
        for(var i =0; i < slots.length; i++){
            
            
            button_value = slots[i];
            button_title = slots[i].toString().substring(8,10) + " to " + (slots[i] + 1).toString().substring(8,10) + " hrs";
            if(slota[i] == null){
                //console.log(button_title + " is empty");
                button_name = "button_available";
            }else if(slotb[i] == null){
                //console.log(button_title + " queue is empty");
                button_name="button_queue";
            }else{
                button_name="button_unavailable";
            }
            $("#button_container").append("<div class=\"items col-xs-6 col-sm-3 col-md-3 col-lg-3\" ><div class=\"info-block block-info clearfix\"><div data-toggle=\"buttons\" class=\"btn-group bizmoduleselect\"><label class=\"btn btn-default\" name=\""+
            button_name +
            "\"><div class=\"itemcontent\"><input type=\"checkbox\" autocomplete=\"off\" value=\""+
            button_value + 
            "\" name=\"slot_input\"><h5>"+
            button_title +
            "</h5></div></label></div></div></div> ");
        }
        //select buttons by name and set property
        $('label[name="button_available"]').css("border-color", "#007CFF");
        $('label[name="button_queue"]').css("border-color", "#9BE7FF");
        $('label[name="button_queue"]').css("background", "#E3E3E3");
        //$('label[name="button_available"]').css("border-color", "#CFCFCF");
        //$('label[name="button_available"]').css("background", "#E3E3E3");
        $('label[name="button_unavailable"]').hide();

    }
}
var selectedSlots = new Array();
function submitSlotData(){
    console.log("Selected slots: ");
    selectedSlots=[];
    $.each($("input[name='slot_input']:checked"), function(){            
        console.log($(this).val());
        selectedSlots.push($(this).val());
    });
    //now submit these to server
    if(request){
		request.abort();
	}
    var sendInfo = "book_slots";
    //create a string
    var data="";
    for(var i=0; i<selectedSlots.length;i++){
        data += selectedSlots[i]+" ";
    }
	request = $.ajax({
        url: "../scripts/book.php",
        type: "post",
        data: {'action': sendInfo, 'data': data},
        beforeSend:function(){
            // alert("No Masti allowed");
            $("#book-button").prop('disabled',true);
        }
    });

    request.done(function (response, textStatus, jqXHR){
        console.log("Response after sending data to server: "+response);
        //slotconfirmation page shows result of slot booking
        if(response == "0" || response == "1"){
            //show error
            console.log("Error occured");
        }else{
            var res = JSON.parse(response);
            //explode
            // var bookedSlots = res["slot"].split("\n");
            console.log(res);
            //final result holds html document that shows the result
            var final_result = "<style>	.light-background {	background-color: #E0E0E0;	margin-top: 5px;	margin-bottom: 5px;	padding-top:1px;	padding-bottom: 7px;}</style>"
            final_result += "<div class=\"col-md-7 col-md-offset-2\"><h1 align=\"left\"> Your slots were booked</h1><h3  align=\"left\">Group Email: "+res["gname"] +"</h3><h3  align=\"left\">Mentor name: "+res["mname"] +"</h3></div>";

            //collect all booked slots into the document
            for (var i=1; i<=res['size'];i++){
                
                //show all slots on screen
                //id is result_division
                var bookedSlots = JSON.parse(res[i]);
              
                console.log(bookedSlots["slot"]);

                var slotID = bookedSlots["slot"].substring(0,(bookedSlots["slot"].length)-2);
                var status = "error";
                if(bookedSlots["slot"].substring(bookedSlots["slot"].length-1,bookedSlots["slot"].length) == "m"){
                    status = "Booked";
                }else if(bookedSlots["slot"].substring(bookedSlots["slot"].length-1,bookedSlots["slot"].length) == "q"){
                    status = "Queued";
                }
                var mo = parseInt(bookedSlots["slot"].substring(4,6)) - 1;
                var d = new Date(bookedSlots["slot"].substring(0,4),mo.toString(),bookedSlots["slot"].substring(6,8),bookedSlots["slot"].substring(8,10));
                var temp = d.getHours()+1;
                var slotTime = d.toDateString() + " from " + d.getHours() + ":00 to " + temp + ":00";

                final_result +="<div class=\"col-md-7 col-md-offset-2 light-background\"><h3 align=\"left\">Slot Time: ";                    
                final_result += slotTime;

                final_result += "</h3><h3 align=\"left\" >Slot ID: ";
                final_result += slotID;

                final_result += "</h3><h3 align=\"left\">Status: ";
                final_result += status;
                final_result += " </h3></div> ";                
                
            }
            //hide the rest: name = "main_page"
            $("#book-button").prop('disabled',true);
            $("[name='main_page']").hide();
            //show result
            $("#result_division").html(final_result);

        }
    });
}
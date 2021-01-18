







var req;
var event;
var simplemde;
$("document").ready(initialize);
function initialize(){
    $('.dummy').matchHeight();

    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#inputDate').val(today);
    getDate();
    $("#outputDay").val(date.toLocaleDateString('default',{weekday:'long'}));
    displaySlots(now);

    // further changes to editor / get its value using built in methods
    console.log("Loading simplemde");
    simplemde = new SimpleMDE({ element: $("#simplemde")});



}
//---------------------------------------------Aesthetics----------------------------------------//
$("#inputLink").focusin(function(){
    $("#linkHelp").addClass('text-muted');
    $("#inputLink").css('border','none');
    $("#linkHelp").html("Pick a name for your event");
    console.log('Focused1');
});

$("#inputName").focusin(function(){
    $("#nameHelp").addClass('text-muted');
    $("#inputName").css('border','none');
    $("#nameHelp").html("Pick a name for your event");
    console.log('Focused2');
});

$("#inputDate").focusin(function(){
    $("#dateHelp").addClass('text-muted');
    $("#inputDate").css('border','none');
    $("#dateHelp").html("Pick a name for your event");
    $("#slotContainer").css('border','none');
    console.log('Focused3');
});
$("#eventDetails").on('focus','.CodeMirror',function () {
    console.log('focus mirror');
    $("#descriptionHelp").addClass('text-muted');
    $(".CodeMirror").css('border','none');
    $("#descriptionHelp").html("Pick a name for your event");
});


//-------------------------------------------SLOT FUNCTIONS---------------------------------------------------//
var date;
var slotData;
class slot{
    constructor(starttime, endtime,available) {
        this.st = starttime;
        this.et = endtime;
        this.av = available;
    }
}
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function getSlotKey(z){
    return z.getDate().toString() + "/" + (((z.getMonth() + 1)).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })).toString() + "/" + z.getFullYear().toString();
}
function getDate() {
    date = new Date($("#inputDate").val());
}
function getSlots (){
    event = "getSlots";
    if(req)
    {
        req.abort();
    }

    req = $.ajax({
        url:"../scripts/book.php",
        type:'post',
        data:{'event':event,'date':date}
    });
    req.done(function(response, textStatus, jqXHR){
        if(response==0)
        {
            console.log("Error occurred");
        }
        else
        {
            console.log('got a response');

            slotData = JSON.parse(response);
            let clubname = slotData['clubname'];
            $("[name='clubName']").text(clubname);
            displaySlots(new Date());
        }

    });


}
function displaySlots(currDate) {
    let a = {
        "17/01/2021":
            [
                {"st":5,"et":6,"av":1},
                {"st":6,"et":7,"av":0},
                {"st":7,"et":8,"av":1},
                {"st":8,"et":9,"av":1},
                {"st":9,"et":10,"av":0},
                {"st":10,"et":11,"av":1},
                {"st":11,"et":12,"av":0},
                {"st":12,"et":13,"av":1},
                {"st":13,"et":14,"av":1},
                {"st":14,"et":15,"av":0},
                {"st":16,"et":17,"av":-1},
                {"st":17,"et":18,"av":0},
                {"st":19,"et":20,"av":1},
                {"st":20,"et":21,"av":-1}
            ],
        "18/01/2021":
            [
                {"st":5,"et":6,"av":1},
                {"st":6,"et":7,"av":0},
                {"st":7,"et":8,"av":1},
                {"st":8,"et":9,"av":1},
                {"st":9,"et":10,"av":0},
                {"st":10,"et":11,"av":1},
                {"st":11,"et":12,"av":0},
                {"st":12,"et":13,"av":1},
                {"st":13,"et":14,"av":1},
                {"st":14,"et":15,"av":0},
                {"st":16,"et":17,"av":-1},
                {"st":17,"et":18,"av":0},
                {"st":19,"et":20,"av":1},
                {"st":20,"et":21,"av":-1}
            ],
        "19/01/2021":
            [
                {"st":5,"et":6,"av":1},
                {"st":6,"et":7,"av":0},
                {"st":7,"et":8,"av":1},
                {"st":8,"et":9,"av":1},
                {"st":9,"et":10,"av":0},
                {"st":10,"et":11,"av":1},
                {"st":11,"et":12,"av":0},
                {"st":12,"et":13,"av":1},
                {"st":13,"et":14,"av":1},
                {"st":14,"et":15,"av":0},
                {"st":16,"et":17,"av":-1},
                {"st":17,"et":18,"av":0},
                {"st":19,"et":20,"av":1},
                {"st":20,"et":21,"av":-1}
            ],
        "size":1
    };
    slotData = JSON.parse(JSON.stringify(a));
    //todo- delete upper 2 lines after Mandu starts giving slot data

    let today = new Date(currDate);
    let key = getSlotKey(today);
    console.log({slotData});
    if(key in slotData) {
        slotData[key].forEach(e => {
            let s = new slot(e['st'], e['et'], e['av']);
            console.log({s});
            let rn = (new Date).getTime();
            today.setHours(e['st'], 0, 0, 0);
            let slotid = today.getTime();

            console.log(slotid, (new Date).getTime());
            if (slotid > (new Date).getTime()) {
                console.log("in");
                switch (s.av) {
                    case -1: {
                        let html = "<div class=\"col-md-6 padding-0\"><div id=\"" + slotid + "\" data-value='" + e['st'] + "' class=\"slot-div red-ball\">" + e['st'] + " to " + e['et'] + "</div></div>";
                        $("#slotContainer").append(html);
                        break;
                    }
                    case 0: {
                        let html = "<div class=\"col-md-6 padding-0\"><div id=\"" + slotid + "\" data-value='" + e['st'] + "' class=\"slot-div grey-ball\">" + e['st'] + " to " + e['et'] + "</div></div>";
                        $("#slotContainer").append(html);
                        break;
                    }
                    case 1: {
                        let html = "<div class=\"col-md-6 padding-0\"><div id=\"" + slotid + "\" data-value='" + e['st'] + "' class=\"slot-div green-ball\">" + e['st'] + " to " + e['et'] + "</div></div>";
                        $("#slotContainer").append(html);
                        break;
                    }
                    default: {
                        console.log("unknown slot:-->");
                        console.log({e});
                        break;
                    }

                }
                console.log("Element with slot id " + slotid + "was created");
                if (tempSelect.includes(`${slotid}`)) {
                    console.log('Helloo');
                    $(`#${slotid}`).addClass('slot-div-selected');
                }
            }
        });
    }
    else
    {
        $("#slotContainer").html("<p>Sorry there are no slots available for this day</p>")
    }
}
$("#inputDate").change(()=>{

    let currDate = $("#inputDate").val();
    currDate = new Date(currDate);
    $("#slotContainer").css("border",'none');
    $("#slotContainer").html("");
    displaySlots(currDate);
    getDate();
    $("#outputDay").val(date.toLocaleDateString('default',{weekday:'long'}));

});

//-------------------------------------------COLLECTING AND SENDING DATA --> FUNCTIONS---------------------------------------------------//


var selectedSlots;
var tempSelect = [];
var availability = {};
$('#slotContainer').on('click','.green-ball, .grey-ball', function(){
    $("#slotContainer").css('border','none');
    console.log($(this));
    $(this).toggleClass('slot-div-selected');
    if($(this).hasClass('slot-div-selected'))
    {
        console.log('has selected class');
        tempSelect.push($(this).attr('id'));
        if($(this).hasClass('green-ball'))
            availability[$(this).attr('id')] = 1;
        else
            availability[$(this).attr('id')] = 0;

    }
    else
    {
        console.log('no selected class');
        tempSelect = tempSelect.filter(item => item !== ($(this).attr('id')));
        delete availability[$(this).attr('id')];
    }

    $("#dateHelp").addClass('text-muted');
    $("#inputDate").css('border','none');
    $("#dateHelp").html("Pick a name for your event");


});

function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}
function validate(){
    //Validate event url if given
    console.log('validating data');
    let url = $("#inputLink").val();
    if((!validURL(url)) && url.length!=0) {
        $("#linkHelp").removeClass('text-muted');
        $("#linkHelp").html('<strong>Please enter a valid event link</strong>');
        $("#linkHelp").css('color',"red");
        $("#inputLink").css('border','solid red 2px');
        return 0;
    }

    //validate event Name
    let eventName = $('#inputName').val();
    eventName = eventName.trim();
    if(eventName.length < 5)
    {
        $("#nameHelp").removeClass('text-muted');
        $("#nameHelp").html('<strong>Please give an event name greater than 5 characters</strong>');
        $("#nameHelp").css('color',"red");
        $("#inputName").css('border','solid red 2px');
        return 0;
    }
    if(eventName.length > 50)
    {
        $("#nameHelp").removeClass('text-muted');
        $("#nameHelp").html('<strong>Please give an event name less than 50 characters</strong>');
        $("#nameHelp").css('color',"red");
        $("#inputName").css('border','solid red 2px');
        return 0;
    }

    //validate event Description
    let eventDescription = simplemde.value();
    eventDescription.trim();
    if(eventDescription.length<10)
    {
        $("#descriptionHelp").removeClass('text-muted');
        $("#descriptionHelp").html('<strong>Please write atleast 10 characs in your description</strong>');
        $("#descriptionHelp").css('color',"red");
        $(".CodeMirror").css('border','solid red 2px');
        return 0;
    }
    else if(eventDescription.length>200)
    {
        ("#descriptionHelp").removeClass('text-muted');
        $("#descriptionHelp").html('<strong>Atmost 200 characters are allowed for description</strong>');
        $("#descriptionHelp").css('color',"red");
        $(".CodeMirror").css('border','solid red 2px');
        return 0;
    }

    //validate slots
    if(tempSelect.length<=0)
    {
        let text = "Atleast one slot must be selected";
        $("#dateHelp").removeClass('text-muted');
        $("#dateHelp").html('<strong>'+text+'</strong>');
        $("#dateHelp").css('color',"red");
        $("#inputDate").css('border','red solid 2px');
        $("#slotContainer").css('border','red solid 2px');
        return 0;
    }
    tempSelect.forEach(function(e){
        if(e < (new Date()).getTime())
        {
            let text = "Cannot select the slot " + (new Date(e)).getHours() + " to " + ((new Date(e)).getHours()+1);
            $("#dateHelp").removeClass('text-muted');
            $("#dateHelp").html('<strong>'+text+'</strong>');
            $("#dateHelp").css('color',"red");
            $("#inputDate").css('border','red solid 2px');
            return 0;
        }
        if(availability[e]!==1|| availability[e]!==0)
        {
            // noinspection JSJQueryEfficiency
            $("#dateHelp").removeClass('text-muted');
            $("#dateHelp").html("<strong>Inavalid slot selected please refresh the page and try again</strong>");
            $("#dateHelp").css('color',"red");
            $("#inputDate").css('border','red solid 2px');
            return 0;
        }
    });
    console.log("validate complete");
    return 1;



}
function submitData(){
    if(validate()==1)
    {
        //start the submit
        let finalData = new Object();
        finalData.eventName =  $('#inputName').val();
        finalData.eventDescription =  simplemde.value();
        finalData.selectedSlots = new Object();
        tempSelect.forEach(function(e){
            if(e < (new Date()).getTime())
            {
                let text = "Cannot select the slot " + (new Date(e)).getHours() + " to " + ((e).getHours()+1);
                $("#dateHelp").text(text);
                return 0;
            }
            let slotid = e;
            finalData.selectedSlots[slotid] = availability[slotid];

        });
        console.log(JSON.stringify(finalData));
        //todo - add ajax request and response after mandu starts accepting requests
        if(req)
            req.abort();
        req = $.ajax({
            url:"../abs/scripts/book.php",
            type:'post',
            data:{'event':'submitSlots','eventdata':(JSON.stringify(finalData))},
            error:(e)=>{
                console.error(e);
            },
            beforeSend: function(){
                console.log("sending now");
                $(".btn").toggleClass('disabled');
            }
        });
        req.done(function (response, textStatus, jqXHR){
            $(".btn").toggleClass('disabled');
            console.log(response);
            let finalResponse = JSON.parse(response);
            console.log(finalResponse);
            if(finalResponse['status']=="done")
            {
                $("#slotContainer").html("");
                $("#slotContainer").html("<strong> Your slots were successfully submitted and a confirmation mail has been sent to your account</strong>");

            }
        });
    }

}
$("#submitBtn").click(submitData);



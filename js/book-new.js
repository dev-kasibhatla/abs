
var req;
var event;
var simplemde;
$("document").ready(initialize);
function initialize(){
    $('.dummy').matchHeight();

    // further changes to editor / get its value using built in methods
    console.log("Loading simplemde");
    simplemde = new SimpleMDE();
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#inputDate').val(today);
    getDate();
    $("#outputDay").val(date.toLocaleDateString('default',{weekday:'long'}));


}

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
        "12/01/2021":
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
        "13/01/2021":
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
        "14/01/2021":
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
    slotData[key].forEach(e=>{
        let s = new slot(e['st'],e['et'],e['av']);
        console.log({s});
        let rn = (new Date).getTime();
        today.setHours(e['st'],0,0,0);
        let slotid = today.getTime();
        console.log(slotid,(new Date).getTime());
        if(slotid > (new Date).getTime()) {
            console.log("in");
            switch (s.av) {
                case -1: {
                    let html = "<div class=\"col-md-6 padding-0\"><div id=\""+slotid+"\" data-value='"+e['st']+"' class=\"slot-div red-ball\">" + e['st'] + " to " + e['et'] + "</div></div>";
                    $("#slotContainer").append(html);
                    break;
                }
                case 0: {
                    let html = "<div class=\"col-md-6 padding-0\"><div id=\""+slotid+"\" data-value='"+e['st']+"' class=\"slot-div grey-ball\">" + e['st'] + " to " + e['et'] + "</div></div>";
                    $("#slotContainer").append(html);
                    break;
                }
                case 1: {
                    let html = "<div class=\"col-md-6 padding-0\"><div id=\""+slotid+"\" data-value='"+e['st']+"' class=\"slot-div green-ball\">" + e['st'] + " to " + e['et'] + "</div></div>";
                    $("#slotContainer").append(html);
                    break;
                }
                default: {
                    console.log("unknown slot:-->");
                    console.log({e});
                    break;
                }

            }
        }
    });

}
$("#inputDate").change(()=>{

    let currDate = $("#inputDate").val();
    currDate = new Date(currDate);
    $("#slotContainer").html("");
    displaySlots(currDate);
    getDate();
    $("#outputDay").val(date.toLocaleDateString('default',{weekday:'long'}));

});

//-------------------------------------------COLLECTING AND SENDING DATA FUNCTIONS---------------------------------------------------//


var selectedSlots
$('#slotContainer').on('click','.green-ball, .grey-ball', function(){
    console.log($(this));
    $(this).toggleClass('slot-div-selected');
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
        $("#linkHelp").text(' Please enter a valid event link ');
        return 0;
    }

    //validate event Name
    let eventName = $('#inputName').val();
    eventName = eventName.trim();
    if(eventName.length < 5)
    {
        $("#nameHelp").text('Please give an event name greater than 5 characters');
        return 0;
    }
    if(eventName.length > 50)
    {
        $("#nameHelp").text('Please give an event name less than 50 characters');
        return 0;
    }

    //validate event Description
    let eventDescription = simplemde.value();
    eventDescription.trim();
    if(eventDescription.length<10)
    {
        $("#descriptionHelp").text('Please write atleast 10 characs in your description');
        return 0;
    }
    else if(eventDescription.length>200)
    {
        $("#descriptionHelp").text('Atmost 200 characters are allowed for description');
        return 0;
    }

    //validate slots
    $(".slot-div-selected").each(function(){
        if($(this).attr('id') < (new Date()).getTime())
        {
            let text = "Cannot select the slot " + (new Date($(this).attr('id'))).getHours() + " to " + ((new Date($(this).attr('id'))).getHours()+1);
            $("#dateHelp").text(text);
            return 0;
        }
        if(!($(this).hasClass('green-ball') || $(this).hasClass('grey-ball')))
        {
            $("#dateHelp").text("Inavalid slot selected please refresh the page and try again");
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
        $(".slot-div-selected").each(function(){
            if($(this).attr('id') < (new Date()).getTime())
            {
                let text = "Cannot select the slot " + (new Date($(this).attr('id'))).getHours() + " to " + ((new Date($(this).attr('id'))).getHours()+1);
                $("#dateHelp").text(text);
                return 0;
            }
            let slotid = $(this).attr('id');
            if($(this).hasClass('green-ball'))
                finalData.selectedSlots[slotid] = 1;
            else if($(this).hasClass('grey-ball'))
                finalData.selectedSlots[slotid] = 0;
            else
            {
                console.log("nlha");
                return;
            }

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



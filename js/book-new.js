
var req;
var event;
var simplemde;
var converter;
var clubData;
function checkLogin() {
    if(request)
        request.abort();
    request = $.ajax({
        url:"../api/auth/login.php",
        type:"get"
    });
    request.done(function (response, textstatus,jqXHR){
        console.log(response);
        clubData = response;
        $("[name=clubName]").text(clubData['name']);

    });
    request.fail(function (jqXHR, textStatus, error){
        // Log the error to the console
        window.location.replace('login.html');

    });

}


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
    getSlots();

    // further changes to editor / get its value using built in methods
    console.log("Loading simplemde");
    simplemde = new SimpleMDE(document.getElementById('simplemde'));

    console.log("yo");

    converter = new showdown.Converter();


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
    return z.getFullYear().toString()  + "-" + (((z.getMonth() + 1)).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })).toString() + "-" +z.getDate().toString() ;
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
    let sdate = new Date(date);
    console.log("sdate is ",getSlotKey(sdate));
    let edate = new Date(date);
    edate.setDate(edate.getDate()+15);
    console.log("edate is ",getSlotKey(edate));

    req = $.ajax({
        url:"../api/schedule.php",
        type:'post',
        data:{'edate':getSlotKey(edate),'sdate':getSlotKey(sdate)}
    });
    req.done(function(response, textStatus, jqXHR){


        console.log('got a response');
        console.log(response);
        slotData = (response);
        displaySlots(new Date());


    });


}
function displaySlots(currDate) {

    let a = {
        0: {"st": 7, "et": 8},
        1: {"st": 8, "et": 9},
        2: {"st": 9, "et": 10},
        3: {"st": 10, "et": 11},
        4: {"st": 11, "et": 12},
        5: {"st": 12, "et": 13},
        6: {"st": 13, "et": 14},
        7: {"st": 14, "et": 15},
        8: {"st": 15, "et": 16},
        9: {"st": 16, "et": 17},
        10: {"st": 17, "et": 18},
        11: {"st": 18, "et": 19},
        12: {"st": 19, "et": 20},
        13: {"st": 20, "et": 21},
        14: {"st": 21, "et": 22},
        15: {"st": 22, "et": 23},
    };

//     slotData = {"2021/01/19":[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
//         "2021/01/20":[1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1]};
    //todo- delete upper 2 lines after Mandu starts giving slot data

    let keyslots = getSlotKey(currDate);
    console.log(currDate);

    // let keyslots = (Object.keys(slotData)[0]);

    console.log(keyslots);
    console.log(slotData);
    let slotDataSize = Object.keys(slotData).length

    if(keyslots in slotData){
        for(let z=0;z<slotData[keyslots].length;z++)
        {
            let s;
            let slotid  = (new Date(keyslots));
            slotid.setHours((z+7),0,0,0);
            let rn = new Date();

            slotid.getTime();
            console.log(slotid);
            console.log(rn);
            if(slotid < rn.getTime())
            {
                s = new slot(a[z]['st'], a[z]['et'], -1);
                console.log({s});
            }
            else
            {
                console.log(slotData[keyslots][z])
                s = new slot(a[z]['st'], a[z]['et'], slotData[keyslots][z]);
            }
            slotid  = (new Date(keyslots));
            slotid.setHours(a[z]['st'],0,0,0);
            slotid = slotid.getTime();
            switch (s.av) {
                case -1: {
                    let html = "<div class=\"col-md-6 padding-0\"><div id=\"" + slotid + "\" data-value='" + a[z]['st'] + "' class=\"slot-div red-ball\">" + a[z]['st'] + " to " + a[z]['et'] + "</div></div>";
                    $("#slotContainer").append(html);
                    break;
                }
                case 0: {
                    let html = "<div class=\"col-md-6 padding-0\"><div id=\"" + slotid + "\" data-value='" + a[z]['st'] + "' class=\"slot-div grey-ball\">" + a[z]['st'] + " to " + a[z]['et'] + "</div></div>";
                    $("#slotContainer").append(html);
                    break;
                }
                case 1: {
                    let html = "<div class=\"col-md-6 padding-0\"><div id=\"" + slotid + "\" data-value='" + a[z]['st'] + "' class=\"slot-div green-ball\">" + a[z]['st'] + " to " + a[z]['et'] + "</div></div>";
                    $("#slotContainer").append(html);
                    break;
                }
                default: {
                    console.log("unknown slot:-->");
                    console.log({s});
                    break;
                }

            }
            if (tempSelect.includes(`${slotid}`)) {
                console.log('Helloo');
                $(`#${slotid}`).addClass('slot-div-selected');
            }
        }
    }
    else
    {
        $("#slotContainer").html("<p>No slot data available for this day</p>");
    }


    if(slotData.length<=0)
    {
        $("#slotContainer").html("<p>No slot data available for this day</p>")
    }

    // if(keyslots in slotData) {
    //     slotData[keyslots].forEach(e => {
    //         let s = new slot(e['st'], e['et'], e['av']);
    //         console.log({s});
    //         let rn = (new Date).getTime();
    //         today.setHours(e['st'], 0, 0, 0);
    //         let slotid = today.getTime();
    //
    //         console.log(slotid, (new Date).getTime());
    //         if (slotid > (new Date).getTime()) {
    //             console.log("in");
    //             switch (s.av) {
    //                 case -1: {
    //                     let html = "<div class=\"col-md-6 padding-0\"><div id=\"" + slotid + "\" data-value='" + e['st'] + "' class=\"slot-div red-ball\">" + e['st'] + " to " + e['et'] + "</div></div>";
    //                     $("#slotContainer").append(html);
    //                     break;
    //                 }
    //                 case 0: {
    //                     let html = "<div class=\"col-md-6 padding-0\"><div id=\"" + slotid + "\" data-value='" + e['st'] + "' class=\"slot-div grey-ball\">" + e['st'] + " to " + e['et'] + "</div></div>";
    //                     $("#slotContainer").append(html);
    //                     break;
    //                 }
    //                 case 1: {
    //                     let html = "<div class=\"col-md-6 padding-0\"><div id=\"" + slotid + "\" data-value='" + e['st'] + "' class=\"slot-div green-ball\">" + e['st'] + " to " + e['et'] + "</div></div>";
    //                     $("#slotContainer").append(html);
    //                     break;
    //                 }
    //                 default: {
    //                     console.log("unknown slot:-->");
    //                     console.log({e});
    //                     break;
    //                 }
    //
    //             }
    //             console.log("Element with slot id " + slotid + "was created");
    //         }
    //     });
    // }

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
        if(availability[e]!==1 && availability[e]!==0)
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
        finalData.ename =  $('#inputName').val();
        finalData.edesc =  converter.makeHtml(simplemde.value());
        finalData.elink = $("#inputLink").val();
        finalData.slots = new Object();
        let template = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        tempSelect.forEach(function(e){
            if(e < (new Date()).getTime())
            {
                let text = "Cannot select the slot " + (new Date(e)).getHours() + " to " + ((e).getHours()+1);
                $("#dateHelp").text(text);
                return 0;
            }
            let slotid = e;
            console.log(slotid);

            let slotkey = getSlotKey(new Date(parseInt(slotid)));
            console.log(slotkey);
            if(slotkey in finalData.slots){
                finalData.slots[slotkey][new Date(parseInt(slotid)).getHours()-7] = 1;
            }
            else
            {
                finalData.slots[slotkey] = template;
                finalData.slots[slotkey][new Date(parseInt(slotid)).getHours()-7] = 1;
            }
            console.log(finalData.slots)

        });
        console.log(JSON.stringify(finalData));

        if(req)
            req.abort();
        req = $.ajax({
            url:"../api/auth/book.php",
            type:'post',
            data:(finalData),
            beforeSend: function(){
                console.log("sending now");
                $(".btn").toggleClass('disabled');
            }
        });
        req.done(function (response, textStatus, jqXHR){
            $(".btn").toggleClass('disabled');
            console.log(response);
            let finalResponse = (response);
            console.log(finalResponse);
            if("success" in finalResponse)
            {
                $("#slotContainer").html("");
                $("#slotContainer").html("<strong> Your slots were successfully submitted and a confirmation mail has been sent to your account</strong>");

            }
        });
        req.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error(JSON.parse(jqXHR.responseText)['error']);
        });
    }

}
$("#submitBtn").click(submitData);



var clubData;
var request;
var calendar;
var tinySlots;
function getSlotKey(z){
    return z.getFullYear().toString() + "-" +
        (z.getMonth() + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        }) + "-" +
        z.getDate().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
}


function tinySchedule()
{

    if(request)
        request.abort();
    let limits = calendar.getLimits();
    request = $.ajax({
        url:"../api/tinysched.php",
        type:"post",
        data:{edate:getSlotKey(limits[1]),sdate:getSlotKey(limits[0])}
    });
    request.done(function (response, textstatus,jqXHR){
        console.log(response);
        tinySlots = response;
        let badgeSetter=[];
        for(keys in tinySlots)
        {
//         	console.log(keys);
//         	console.log(tinySlots[keys]);
            if(tinySlots[`${keys}`]==true)
            {
//         		console.log("True");
                badgeSetter.push(1);
            }
            else
            {
//         		console.log("False");
                badgeSetter.push(0);
            }
            if(badgeSetter.length==30)
            {
                console.log(badgeSetter);
                calendar.setBadges(badgeSetter);
                calendar.render();
                break;
            }

        }
    });
    request.fail(function (jqXHR, textStatus, error){
        // Log the error to the console
//         window.location.replace('login.html');
//         $($(".nav-item")[0]).html("<a class=\"nav-link\" href=\"login.html\">Login<span class=\"sr-only\">(current)</span></a>");
//         $($(".nav-item")[1]).html("<a class=\"nav-link\" href=\"register.html\">Register<span class=\"sr-only\">(current)</span></a>");
//         $($(".nav-item")[1]).addClass("active");
//         $($(".nav-item")[1]).removeClass("dropdown");
//         console.log("Not logged in");
    });
}

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
//         window.location.replace('login.html');
        $($(".nav-item")[0]).html("<a class=\"nav-link\" href=\"login.html\">Login<span class=\"sr-only\">(current)</span></a>");
        $($(".nav-item")[1]).html("<a class=\"nav-link\" href=\"register.html\">Register<span class=\"sr-only\">(current)</span></a>");
        $($(".nav-item")[1]).addClass("active");
        $($(".nav-item")[1]).removeClass("dropdown");
        console.log("Not logged in");
    });

}
function initialize() {
    $('.dummy').matchHeight();
    checkLogin();

    //todo: calendar starts
    let calDiv = document.getElementById("divCal");
    calendar = new Calendar(calDiv, new Date().getTime(),20,"Pick a date");
    //todo: to get date range
    console.log(calendar.getLimits());
    //todo: supply a badge array
    //length should be Math.floor(range*1.5)
// 		console.log([0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,1,0,0,1,1].length);
    tinySchedule();
// 		calendar.render();

    calDiv.addEventListener('calendarSelect',
        function(){
            //todo: this is how you get the date
            //I am using my own calendartime object, read the structure in console
            console.log(calendar.selectionDate);
            if(request)
                request.abort();

            request = $.ajax({
                url:"../api/eventsplus.php",
                type:"post",
                data:{sdate:calendar.selectionDate['parseString'],sslot:0,limit:16}
            });
            request.done(function (response, textstatus,jqXHR){
                console.log(response);

            });
            request.fail(function (jqXHR, textStatus, error){

            });


        }
    );


}

$(document).ready(initialize);
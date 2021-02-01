const slotHelper = {
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
var clubData;
var request;
var calendar;
var tinySlots;
var currentSlotHr = (new Date()).getHours() - 7;
var calDiv;
var nextSlots;
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
        getLatestEvents();
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

function getLatestEvents(){
    if(request)
        request.abort();
    request = $.ajax({
        url:"../api/eventsplus.php",
        type:"post",
        data:{sdate:calendar.selectionDate['parseString'],sslot:0,limit:10}

    });
    request.done(function (response, textstatus,jqXHR){
        console.log(response);
        console.log(" get Latest events ");
        nextSlots = response;
        if(Object.keys(nextSlots).length<=0)
            $("#upcomingDiv").append("<h5> Your club does not have any registered events <h5>");
        else{

            let firstSlot = true;
            for(let i=0;i<Object.keys(nextSlots).length;i++){
                for (keys in nextSlots[i]['tslot']){
//                console.log(new Date(keys));
                    console.log(nextSlots[i]['tslot'][keys]);
                    let a = new Date(keys);
                    let z = nextSlots[i]['tslot'][keys];
                    let index = z.indexOf(1);
                    while(index!=-1){
                        let timeString = a.getDate()+" "+a.toLocaleString('default', { month: 'short' })+" " + a.getFullYear() + " - " + slotHelper[index].st + "hrs to " + slotHelper[index].et + "hrs";
                        z[index] = 0;
                        console.log(timeString);
                        index = z.indexOf(1);
                        let html = `<div class=\"col-md-4 flat-glass margin-5\" style=\"height: 130px;\"><div><h5>${nextSlots[i]['name']}</h5></div><div>${clubData['name']}</div><div>${timeString}</div></div>`;
                        if(firstSlot)
                        {
                            console.log("check");
                            let nextevent = `<div class=\"flat-glass round align-items-center margin-5\" style=\"height: 150px;\"><div class=\"row\"><h4>Next event</h4></div><div class=\"row\"><div><h4>${nextSlots[i]['name']}</h4></div><div><h4>{${clubData['name']}</h4></div></div><div class=\"row\">${timeString}</div></div>`
                            $("#nextevent").html(nextevent);
                            firstSlot = false;
                        }

//                    {
                        $("#upcomingDiv").append(html);
//                    }

                    }


                }
            }
        }


    });
    request.fail(function (jqXHR, textStatus, error){
        // Log the error to the console
        // window.location.replace('login.html');

    });
}

function checkLogin() {
    if(request)
        request.abort();
    request = $.ajax({
        url:"../api/auth/login.php",
        type:"get",
        xhrFields: {
            withCredentials: true
        }
    });
    request.done(function (response, textstatus,jqXHR){
        console.log(response);
        clubData = response;
        $("[name=clubName]").text(clubData['name']);

        calendar = new Calendar(calDiv, new Date().getTime(),20,"Pick a date");
        calendar.render();

        //todo: to get date range
        console.log(calendar.getLimits());
        console.log(calendar.selectionDate['parseString']);

        //todo: supply a badge array
        //length should be Math.floor(range*1.5)
// 		console.log([0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,1,0,0,1,1].length);
        tinySchedule();

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
    calDiv = document.getElementById("divCal");
    checkLogin();

    //todo: calendar starts


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
                data:{sdate:calendar.selectionDate['parseString'],sslot:0,limit:10}
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
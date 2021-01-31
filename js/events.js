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
var clubEvents;
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
        getEvents();

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
function getEvents() {
    if(request)
        request.abort();
    request = $.ajax({
        url:"../api/auth/events.php",
        type:'get'
    });
    request.done(function (response, textstatus,jqXHR){
        console.log(response);
        clubEvents = response;
        for(let i=0;i<Object.keys(clubEvents).length;i++){
           for (keys in clubEvents[i]['tslot']){
//                console.log(new Date(keys));
                console.log(clubEvents[i]['tslot'][keys]);
                let a = new Date(keys);
                let z = clubEvents[i]['tslot'][keys];
                let index = z.indexOf(1);
                while(index!=-1){
                   let timeString = a.getDate()+" "+a.toLocaleString('default', { month: 'short' })+" " + a.getFullYear() + " - " + slotHelper[index].st + "hrs to " + slotHelper[index].et + "hrs";
                   z[index] = 0;
                   console.log(timeString);
                   index = z.indexOf(1);
                   let html = `<div class=\"col-md-4 flat-glass margin-5\" style=\"height: 130px;\"><div><h5>${clubEvents[i]['name']}</h5></div><div>${clubData['name']}</div><div>${timeString}</div></div>`;
                   $("#eventContainer").append(html);                     
                }

                
            }
        }
        


    });
    request.fail(function (jqXHR, textStatus, error){
        
    });
        
}
function initialize() {
    // note: using this class as a reference can be dangerous in the future
    checkLogin();
    
    $('.flat-glass').matchHeight();

}

$(document).ready(initialize);

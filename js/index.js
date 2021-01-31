var clubData;
var request;
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
    let calendar = new Calendar(calDiv, new Date().getTime(),20,"Pick a date");
    //todo: to get date range
    console.log(calendar.getLimits());
    //todo: supply a badge array
    //length should be Math.floor(range*1.5)
    console.log([0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,1,0,0,1,1].length);
    calendar.setBadges([0,0,0,0,0,0,0,0,1,1.0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,1,0,0,1,1]);
    calendar.render();
    calDiv.addEventListener('calendarSelect',
        function(){
            //todo: this is how you get the date
            //I am using my own calendartime object, read the structure in console
            console.log(calendar.selectionDate);
        }
    );

}

$(document).ready(initialize);
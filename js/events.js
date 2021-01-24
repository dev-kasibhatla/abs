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
    // note: using this class as a reference can be dangerous in the future
    checkLogin();
    $('.flat-glass').matchHeight();

}

$(document).ready(initialize);

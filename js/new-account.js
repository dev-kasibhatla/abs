var request;
function checkLogin() {
    if(request)
        request.abort();
    request = $.ajax({
        url:"../api/auth/login.php",
        type:"get"
    });
    request.done(function (response, textstatus,jqXHR){
        console.log(JSON.parse(jqXHR.responseText));

        clubData = response;
        $("[name=clubName]").text(clubData['name']);
        console.log("user is logged in");


    });
    request.fail(function(jqXHR, textstatus,errorThrown){
        console.log(JSON.parse(jqXHR.responseText));
        console.log("User not logged in ");
        window.location.replace('login.html');
    });
}

function initialize() {
    checkLogin();
    $('.flat-glass').matchHeight();

}

$(document).ready(initialize)
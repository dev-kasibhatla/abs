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
function initialize() {
    // note: using this class as a reference can be dangerous in the future
    $('.flat-glass').matchHeight();
    checkLogin();
}

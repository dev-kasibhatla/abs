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


    });

}
function initialize() {
    $('.dummy').matchHeight();
    checkLogin();
}
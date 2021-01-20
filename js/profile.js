
function checkLogin() {
    if(request)
        request.abort();
    request = $.ajax({
        url:"../api/auth/login.php",
        type:"get"
    });
    request.done(function (response, textstatus,jqXHR){
        if("success" in response) {
           console.log("user is logged in");
        }
        else
        {
            console.log("User not logged in ");
            window.location.replace('login.html');
        }
    });

}
//-----------------------------------------------------------------------------------------------------------//
var simplemde;
var converter;
console.log("hello");
$("document").ready(initialize);
function initialize(){
    $('.dummy').matchHeight();
    // further changes to editor / get its value using built in methods
    console.log("Loading simplemde");
    simplemde = new SimpleMDE(document.getElementById('inputDescription'));
    console.log(simplemde);
    simplemde.codemirror.options.readOnly = true;
    console.log("yo");
    converter = new showdown.Converter();
    getClubData();


}
//---------------------------------------------Input Enable/Disable----------------------------------------//
function enableInputsInfo() {
    $("#infoDiv :input").each(function (e) {

        $(this).prop('disabled',!($(this).attr('disabled')));
    });
}
$("#btnEditInfo").click(enableInputsInfo);
$("#btnEditDescription").click(function () {
    simplemde.codemirror.options.readOnly = !simplemde.codemirror.options.readOnly;
});
$("#btnEditClubName").click(function () {
    $("#inputClubName").prop('disabled',!($("#inputClubName").prop('disabled')))
});
//---------------------------------------------Get Data and Fill Inputs----------------------------------------//
var request;
var parsedResponse;
function getClubData(){
    let event = 'getClubData';
    if(request)
        request.abort();
    request = $.ajax( {
        url:"../abs/scripts/profile.php",
        type:'post',
        data:{'event':event}
    });
    request.done(function (response,textstatus ,jqXHR){
        console.log(response);
        if(response==0)
        {
            console.error("Some error occurred while communicatining wiht the servers");
        }
        else
        {
            console.log('got a response');
            parsedResponse = JSON.parse(response);
            $("#inputClubName").val(parsedResponse['clubName']);
            $("#inputLink").val(parsedResponse['clubLink']);
            $("#inputTag").val(parsedResponse['clubTag']);
            $("#inputRepName").val(parsedResponse['clubRepName']);
            $("#inputRepEmail").val(parsedResponse['clubRepEmail']);
            simplemde.value(parsedResponse['clubDescription']);
            simplemde.togglePreview();

        }
    });
}
//---------------------------------------------Send Data----------------------------------------//
var changedInputs = {};
function validate() {
    if($("#inputClubName").val()!=parsedResponse['clubName'] && $("#inputClubName").val().length>0 )
    {
        changedInputs['inputClubName'] = 1;
    }
    else
    {
        alert('Enter valid club Name');
        return 0;

    }
    if($("#inputLink").val()!=parsedResponse['clubLink'] && $("#inputLink").val().length > 0 )
    {
        changedInputs['inputLink'] = 1;
    }
    else
    {
        alert('Enter valid link');
        return 0;

    }

    if($("#inputTag").val()!=parsedResponse['clubTag'] && $("#inputTag").val().length>0 )
    {
        changedInputs['inputTag'] = 1;
    }
    else
    {
        alert('Enter valid tag');
        return 0;

    }
    if($("#inputRepName").val()!=parsedResponse['clubRepName'] && $("#inputRepName").val().length>0 )
    {
        changedInputs['inputRepName'] = 1;
    }
    else
    {
        alert('Enter valid Representative Name');
        return 0;

    }
    if($("#inputRepEmail").val()!==parsedResponse['clubRepName'] && $("#inputRepName").val().length>0 )
    {
        changedInputs['inputRepEmail'] = 1;

    }
    else
    {
        alert('Enter validate rep email');
        return 0;
    }
    if(simplemde.value()!==parsedResponse['clubDescription'] && simplemde.value().length>0 )
    {
        changedInputs['clubDescription'] = 1;
    }
    else
    {
        alert("enter valid description");
        return 0;
    }
    return 1;

}
function sendData(){
    if(validate()==1)
    {
        let finalChanges={};
        if(changedInputs.length>0){
            for(let key in changedInputs)
            {
                if(key!=='clubDescription')
                    finalChanges[`${key}`] = $(`#${key}`).val();
                else
                    finalChanges[`${key}`] = converter.makeHtml(simplemde.value());
                console.log({finalChanges});
            }
            let event = 'dataChange';
            if(request)
                request.abort();
            request = $.ajax({
                url:'../abs/scripts/profile.php',
                type:'post',
                data:{event: event,data:JSON.stringify(finalChanges)}

            });
            request.done(function (response,textstatus,jqXHR ) {
                if(response==0)
                    console.error("Some error while communicating to servers");
                else
                {
                    //todo After Mandu starts sending data add response filtering here
                    console.log("sucess");
                }
            });
        }
    }
}
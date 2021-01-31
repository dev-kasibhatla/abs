var clubData;
var dpData;

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
        $("#inputClubName").val(clubData["name"]);
        $("#inputLink").val(clubData['url']);
        if(clubData['detail']!=null)
        simplemde.value(clubData['detail']);    

    });
    request.fail(function (jqXHR, textStatus, error){
        // Log the error to the console
        window.location.replace('login.html');

    });

}


var simplemde;
var converter;
console.log("hello");
$("document").ready(initialize);
function initialize(){
    checkLogin();
    $('.dummy').matchHeight();
    // further changes to editor / get its value using built in methods
    console.log("Loading simplemde");
    simplemde = new SimpleMDE(document.getElementById('inputDescription'));
    console.log(simplemde);

    simplemde.codemirror.options.readOnly = true;
    
    console.log("yo");
    converter = new showdown.Converter();
//     getClubData();


}


function fileFunction()
{
    if(!isImage($("#inputDp")[0].files[0]))
    {
        alert("Only images can be uploaded as Profile Picture");
        $("#inputDp").val('');
    }
    changedInputs['inputDp'] = 1;
    let file = $("#inputDp")[0].files[0];
    let reader = new FileReader();
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        dpData = reader.result;
        $(".dp").attr('src', reader.result);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
    let event = "dpChange"
    request = $.ajax( {
        url:"../auth/api/profile.php",
        type:'post',
        data:{event:event,data:dpData}
    });
    request.done(function (response,textstatus ,jqXHR){
        console.log(response);
    });
    request.fail(function(jqXHR,textStatustatus,error){
        alert(JSON.parse(jqXHR.responseText)['error']);
    });

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



function isImage(file){

    return !!file.type.match('image.*');

}

var changedInputs = {};
function validate() {
    if($("#inputClubName").val()!=clubData['name'] && $("#inputClubName").val().length>0 )
    {
        console.log("change1");
        changedInputs['inputClubName'] = 1;
    }
    //todo: comment nextline when msvamp starts sending tagdata data.
    
    if($("#inputLink").val()!=clubData['url'] && $("#inputLink").val().length > 0 )
    {
        changedInputs['inputLink'] = 1;
    }

    if($("#inputTag").val()!=clubData['clubTag'] && $("#inputTag").val().length>0 )
    {
        changedInputs['inputTag'] = 1;
    }

    if($("#inputRepName").val()!=clubData['ename'] && $("#inputRepName").val().length>0 )
    {
        console.log("change2");
        changedInputs['inputRepName'] = 1;
    }

    if($("#inputRepEmail").val()!==clubData['email'] && $("#inputRepName").val().length>0 )
    {
        console.log("change3");
        changedInputs['inputRepEmail'] = 1;

    }
    if(simplemde.value()!==clubData['detail'] && simplemde.value().length>0 )
    {
        changedInputs['clubDescription'] = 1;
    }

    if(Object.keys(changedInputs).length)
        return 1;
    else
    {
        alert("No changes");
        return 0;
    }


}
function sendData(){
//     e.preventDefault();
    console.log("in1");
    if(validate()==1 )
    {
        console.log("in2");
        let finalChanges={};
        if(Object.keys(changedInputs).length>0){
            for(let key in changedInputs)
            {
                console.log("in3");
                if(key ==='inputDp')
                    finalChanges[`${key}`] =  dpData;
                else if(key!=='clubDescription')
                    finalChanges[`${key}`] = $(`#${key}`).val();
                else
                    finalChanges[`${key}`] = converter.makeHtml(simplemde.value());
                console.log({finalChanges});
            }
            for(let key in finalChanges)
            {
                if(key=='inputLink')
                {
                    finalChanges['url'] = finalChanges['inputLink'];
                    delete finalChanges['inputLink'];

                }
                else if(key=='inputTag')
                {
                    finalChanges['tagline'] = finalChanges['inputTag'];
                    delete finalChanges['inputTag'];
                    
                }
                else if(key=='inputRepName')
                {
                    finalChanges['ename'] = finalChanges['inputRepName'];
                    delete finalChanges['inputLink'];
                    
                }
                else if(key=='inputClubName')
                {
                    finalChanges['name'] = finalChanges['inputClubName'];
                    delete finalChanges['inputLink'];
                    
                }
                else if(key=='inputRepEmail')
                {
                    finalChanges['email'] = finalChanges['inputRepEmail'];
                    delete finalChanges['inputLink'];
                    
                }
                console.log(finalChanges);
            }
            


            let event = 'dataChange';
            let data = finalChanges;
            console.log(data);
            if(request)
                request.abort();
            request = $.ajax({
                url:'../api/auth/profile.php',
                type:'post',
                data:data

            });
            request.done(function (response,textstatus,jqXHR ) {
                alert("Your data has been saved");
            });
            request.fail(function(jqXHR,textStatustatus,error){
                console.log((jqXHR.responseText));
            });

        }
    }
}

$("#btnSubmit").click(function(){
//     this.preventDefault();
    sendData();

});

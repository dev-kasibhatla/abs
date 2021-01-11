


$("document").ready(initialize);
function initialize(){
    $('.dummy').matchHeight();

    // further changes to editor / get its value using built in methods
    console.log("Loading simplemde");
    var simplemde = new SimpleMDE();
    let now = new Date();

    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#inputDate').val(today);
    getDate();
    $("#outputDay").val(date.toLocaleDateString('default',{weekday:'long'}));


}

//-------------------------------------------SLOT FUNCTIONS---------------------------------------------------//
var date;
class slot{
  constructor(starttime, endtime,available) {
          this.st = starttime;
          this.et = endtime;
          this.av = available;
  }
};
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function getSlotKey(z){
    let key = z.getDate().toString() +"/"+ (((z.getMonth()+1)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})).toString() +"/"+z.getFullYear().toString();
    return key;
}
function getDate() {
    date = new Date($("#inputDate").val());
}
function getSlots (){
    event = "getSlots";
    if(req)
    {
        req.abort();
    }

    req = $.ajax({
        url:"../scripts/book.php",
        type:'post',
        data:{'event':event,'date':date}
    });
    req.done(function(response, textStatus, jqXHR){
        if(response==0)
        {
            console.log("Error occurred");
        }
        else
        {
            console.log('got a response');

            let slotData = JSON.parse(response);
            let clubname = slotData['clubname'];
            $("[name='clubName']").text(clubname);
            for(let i=0;i<slotData.size;i++)
            {
                let today = new Date();
                let key = getSlotKey(today);
                slotData[key].forEach(e=>{
                    let s = new slot(e['st'],e['et'],e['av']);
                    console.log({s});
                    switch (s.av) {
                        case -1:
                        {
                            let html = "<div class=\"col-md-6 padding-0\"><div class=\"slot-div red-ball\">" +e['st']+" to " +e['et']+"</div></div>";
                            $("#slotContainer").append(html);
                            break;
                        }
                        case 0:
                        {
                            let html = "<div class=\"col-md-6 padding-0\"><div class=\"slot-div grey-ball\">" +e['st']+" to " +e['et']+"</div></div>";
                            $("#slotContainer").append(html);
                            break;
                        }
                        case 1:
                        {
                            let html = "<div class=\"col-md-6 padding-0\"><div class=\"slot-div grey-ball\">" +e['st']+" to " +e['et']+"</div></div>";
                            $("#slotContainer").append(html);
                            break;
                        }
                        default:{
                            console.log("unknown slot:-->");
                            console.log({e});
                            break;
                        }

                    }
                });
                today = new Date(today.addDays(1));
                key = getSlotKey(today);

            }

        }

    });


}
//todo- delete tester() after mandu starts giving slot data
function tester() {
    let a = {
            "11/01/2021":
            [
                {"st":5,"et":6,"av":1},
                {"st":6,"et":7,"av":0},
                {"st":7,"et":8,"av":1},
                {"st":8,"et":9,"av":1},
                {"st":9,"et":10,"av":0},
                {"st":10,"et":11,"av":-1}
            ],
            "size":1
    };
    let slotData = JSON.parse(JSON.stringify(a));
    let today = new Date();
    let key = getSlotKey(today);
    for(let i=0;i<slotData['size'];i++)
    {
        today = new Date();
        key = getSlotKey(today);
        console.log(key);
        slotData[key].forEach(e=>{
            let s = new slot(e['st'],e['et'],e['av']);
            console.log({s});
            switch (s.av) {
                case -1:
                {
                    console.log("hi-1");
                    let html = "<div class=\"col-md-6 padding-0\"><div class=\"slot-div red-ball\">" +e['st']+" to " +e['et']+"</div></div>";
                    $("#slotContainer").append(html);
                    break;
                }
                case 0:
                {
                    console.log("hi0");
                    let html = "<div class=\"col-md-6 padding-0\"><div class=\"slot-div grey-ball\">" +e['st']+" to " +e['et']+"</div></div>";
                    $("#slotContainer").append(html);
                    break;
                }
                case 1:
                {
                    console.log("hi1");
                    let html = "<div class=\"col-md-6 padding-0\"><div class=\"slot-div green-ball\">" +e['st']+" to " +e['et']+"</div></div>";
                    $("#slotContainer").append(html);
                    break;
                }
                default:{
                    console.log("unknown slot:-->");
                    console.log({e});
                    break;
                }

            }
        });
        today = new Date(today.addDays(1));
        key = getSlotKey(today);

    }

}

//-------------------------------------------SEND DATA FUNCTIONS---------------------------------------------------//

var req;
var event;
function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}
function validate(){

}
function submitData(){




}




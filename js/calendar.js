class Calendar{

    /**
     *
     * @param parent - Parent element
     * @param startDate - starting date as timestamp
     * @param range - Number of days from the starting date
     * @param title - Calendar title
     */
    constructor(parent, startDate, range, title) {
        //get parent dimensions
        //console.log(parent.getBoundingClientRect());
        this.parent = parent;
        this.parentDimensions = parent.getBoundingClientRect();
        this.startDate = startDate;
        this.range = range;
        this.title = title;
    }

    render() {
        //clear all
        try{
            this.parent.innerHTML = "";
        }catch(e){}

        let h = this.parentDimensions.height;
        let w = this.parentDimensions.width;
        if(h > w) console.warn("Parent is not horizontal. Calendar won't look good");

        //title - 10% height
        let eTitle = document.createElement("div");
        eTitle.style.fontSize = this.geth(15).toString()+"px";
        eTitle.style.display = "inline-block";
        eTitle.innerHTML = this.title;

        //reset button
        let eReset = document.createElement("div");
        eReset.style.fontSize = this.geth(10).toString()+"px";
        eReset.style.marginTop = this.geth(3).toString()+"px";
        eReset.innerHTML = "Reset";
        eReset.classList.add("reset-btn");
        //todo: set onclick
        eReset.onclick = function(){
            calendar.render();
        };

        //main body
        let eBody = document.createElement("div");
        eBody.style.height = this.geth(70).toString()+"px";
        // eBody.style.backgroundColor = "#aaa";
        eBody.style.position = "relative";

        //create a row
        // let bRow = document.createElement("div");
        let bLeft = document.createElement("div");
        let bRight = document.createElement("div");
        let temph = this.geth(30).toString()+"px";

        bLeft.style.height = temph;
        bLeft.style.width = temph;
        bLeft.classList.add("btn-arrow");
        bLeft.style.top = this.geth(20).toString()+"px";
        bLeft.style.left = this.geth(5).toString()+"px";
        bLeft.classList.add("btn-arrow-left");

        bRight.style.height = temph;
        bRight.style.width = temph;
        bRight.classList.add("btn-arrow");
        bRight.style.top = this.geth(20).toString()+"px";
        bRight.style.right = this.geth(5).toString()+"px";
        bRight.classList.add("btn-arrow-right");

        let bCal = document.createElement("div");
        bCal.classList.add("cal-body");
        // bCal.style.width= this.getw(97).toString()+"px";
        //bCal.style.width = "auto";
        bCal.style.height= this.geth(70).toString()+"px";
        // bCal.style.width = "100%";

        let elementWidth = this.geth(40);
        //construct main calendar
        let e1 = this.getElement("32",true,this.geth(65).toString()+"px",
            this.geth(35).toString()+"px");
        let tempDate = new Date(this.startDate);
        tempDate.setDate(tempDate.getDate()-Math.floor(this.range/2));
        let dateChildren=[];
        let dates = [];

        //put an offset
        let offset = 60;
        let offsetBox = document.createElement("div");
        offsetBox.style.display = "inline-table";
        offsetBox.style.width = offset + "px";
        offsetBox.id = "offsetbox";
        bCal.appendChild(offsetBox);

        //callback event
        let event = document.createEvent('Event');

        event.initEvent(
            'calendarSelect',
            true,
            true
        );

        //generate days
        for (let i=0;i<Math.floor(this.range*1.5);i++){
            let temp = new CalendarTime(tempDate);
            dates.push(temp);
            let showBadge = false;
            try{
                if(this.bArr[i] === 1) showBadge=true;
            }catch(e){}
            let e = this.getElement(temp.date,showBadge,this.geth(65).toString()+"px", elementWidth.toString()+"px",
                this.geth(32).toString()+"px", dates[i]);
            e.addEventListener("click",function (){
                calendar.selectDate(i);
                calendar.parent.dispatchEvent(event);
            });
            tempDate.setDate(tempDate.getDate()+1);
            dateChildren.push(e);
            bCal.appendChild(e);
        }

/*        this.parent.addEventListener('calendarSelect',
          function(){
           console.log(calendar.selectionDate);
          }
        );*/

        //make global
        this.dateChildren = dateChildren;
        this.dates = dates;

        //set bcal width
        bCal.style.width = Math.floor(elementWidth*1.5*this.range) + offset*4 + "px";

        bLeft.onclick = function () {
            bCalParent.scrollLeft -= 100;
          //console.log("Scrolling");
        };
        bRight.onclick = function () {
            bCalParent.scrollLeft += 100;
        };

        let bCalParent =  document.createElement("div");
        bCalParent.appendChild(bCal);

        //construct body
        bCalParent.classList.add("cal-body-parent");
        eBody.appendChild(bLeft);
        eBody.appendChild(bRight);
        eBody.appendChild(bCalParent);


        //construct
        //console.log("rendering");
        this.parent.appendChild(eTitle);
        this.parent.appendChild(eReset);
        this.parent.appendChild(eBody);
        this.parent.style.padding= this.geth(5).toString()+"px";

        //align to the correct date
        let elementMargin = 1;
        bCalParent.scrollLeft +=( (elementMargin+elementWidth)*this.range/2 + Math.floor(offset/2));

        //select initial
        // this.selectionChild = this.dateChildren[Math.floor(this.range/2)];
        // this.selectionChild.classList.add("selected-cal-element");
        this.selectDate(Math.floor(this.range/2));
    }

    selectDate(i) {
        try{
            this.selectionChild.classList.remove("selected-cal-element");
        }catch (e){}
        //a date was clicked on
        this.selectionChild = this.dateChildren[i];
        this.selectionDate = this.dates[i];
        this.selectionChild.classList.add("selected-cal-element");
        // console.log(this.selectionChild);
        // console.log(this.selectionDate);
    }


    getLimits() {
        let r = [];
        let tempDate = new Date(this.startDate);
        tempDate.setDate(tempDate.getDate()-Math.floor(this.range/2));
        r.push(tempDate);
        tempDate = new Date(this.startDate);
        tempDate.setDate(tempDate.getDate()+this.range);
        r.push(tempDate);
        return r;
    }

    /**
     *  Creates one calendar element
     * @param text
     * @param showBadge
     * @param height
     * @param width
     * @param fontSize
     * @param calTime
     * @returns {HTMLDivElement}
     */
    getElement (text, showBadge,height, width, fontSize, calTime) {
        let e = document.createElement("div");
        e.classList.add("cal-element");
        e.style.height = height;
        e.style.fontSize = fontSize;
        e.innerHTML = text;
        e.style.width = width;
        let f = document.createElement("div");
        try{
            f.innerHTML = calTime.month;
            f.style.fontSize = "15px";
            e.appendChild(f);
        }catch (e){}
        if(showBadge){
           /* let b = document.createElement("div");
            b.classList.add("cal-badge");
            e.appendChild(b);*/
            e.classList.add("show-badge");
        }
        return e;
    }

    setBadges(bArr) {
        try{
            let l = Math.floor(this.range*1.5);
            if(l === bArr.length){
                this.bArr = bArr;
            }else{
                let b = [];
                for(let i=0;i<l;i++){
                    b.push(0);
                }
                this.bArr = b;
                console.warn("Invalid badge array was supplied. Badges won't be shown");
            }
        }catch(e){
            let l = Math.floor(this.range*1.5);
            let b = [];
            for(let i=0;i<l;i++){
                b.push(0);
            }
            this.bArr = b;
            console.warn("Invalid badge array was supplied. Badges won't be shown");
        }
    }

    /**
     * Get height percent
     * @param percent
     * @returns {number}
     */
    geth(percent){
        return (percent*this.parentDimensions.height)/100;
    }

    /**
     * Get width percent
     * @param percent
     * @returns {number}
     */
    getw(percent){
        return (percent*this.parentDimensions.width)/100;
    }
}

class CalendarTime {
    constructor(dateObj) {
        this.dateObj = dateObj;
        this.date = this.dateObj.getDate();
        this.day = this.dateObj.toString().split(' ')[0];
        this.month = this.dateObj.toString().split(' ')[1];
        //format YYYY/MM/DD
        const offset = this.dateObj.getTimezoneOffset();
        let d2 = new Date(this.dateObj.getTime() - (offset*60000));
        this.parseString = d2.toISOString().split('T')[0];
    }


}

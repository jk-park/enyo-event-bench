//EventHandling Test Module
enyo.kind({
    name: "eventHandlingTest",
    kind: "onyx.Button",
    handlers: { ontap: "tester", onMyEvent:"myEventHandler"},
    events: { onMyEvent: "" },
    content: "Start",
    tester: function() {
        var testSize = 500000;
    	t1= new Date().getTime();
        for(i=0;i<testSize;i++){
            this.doMyEvent({ param: i });
        }
        t2= new Date().getTime();
        this.target.addContent("<div class='result-subwindow'><span class='result-bold'>Event Handling Test Result</span></br>");
        this.target.addContent("Calling event handler, defined in the same kind.</br>");
        this.target.addContent("Handler call : <span class='result-bold'>"+testSize+"</span> times</br>");
        this.target.addContent("Executing Time : <span class='result-bold'>"+(t2-t1)+"</span> ms</br>");
        this.target.addContent("</div></br>");
        opPerSec = testSize*1000/(t2-t1);
        opPerSec = Math.floor(opPerSec);
        opPerSec = opPerSec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.sumTarget.setContent("<span class='result-bold'>Event Handler Call : </span>" + opPerSec + " op/sec");

    },
    myEventHandler: function(inSender, inEvent) {
        var a=1;
        return(true);
    }
});

//AddEvent Test Module
enyo.kind({
    name: "addEventTest",
    kind: "onyx.Button",
    handlers: { ontap: "tester" },
    content: "Start",
    tester: function() {
        var testSize = 250000;
        t1= new Date().getTime();
        for(i=0;i<testSize;i++){
            inName = "onMyTestEvent_"+i;
            inValue = "";
            inProto = this;
            enyo.Component.addEvent(inName,inValue,inProto);
        }
        t2= new Date().getTime();
        this.target.addContent("<div class='result-subwindow'><span class='result-bold'>Event Register Test Result</span></br>");
        this.target.addContent("Adding <span class='result-bold'>"+testSize+"</span> differently named event listener.</br>");
        this.target.addContent("Executing Time : <span class='result-bold'>"+(t2-t1)+"</span> ms</br>");
        this.target.addContent("</div></br>");
        opPerSec = testSize*1000/(t2-t1);
        opPerSec = Math.floor(opPerSec);
        opPerSec = opPerSec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.sumTarget.setContent("<span class='result-bold'>Event Register : </span>" + opPerSec + " op/sec");        
        for(i=0;i<testSize;i++)
        {
            inName = "onMyTestEvent_"+i;
            inName2 = "doMyTestEvent_"+i;
            delete this[inName];
            delete this[inName2];
        }        
        

    },
});

//dispatchMouseEvent Test Module
enyo.kind({
    name: "dispatchMouseEventTest",
    kind: "onyx.Button",
    handlers: { ontap: "tester" },
    content: "Start",
    tester: function(){
        var simList = {};
        //available types are following
        //mousemove, mouseup, mousedown, mouseover, mouseout
        var testSize = 10000;
        eventList = new Array(5);
        eventList[0] = "mousemove";
        eventList[1] = "mouseup";
        eventList[2] = "mousedown";
        eventList[3] = "mouseover";
        eventList[4] = "mouseout";
        //test for each type
        this.target.addContent("<div class='result-subwindow'><span class='result-bold'>Mouse Event Dispatching Test Result</span></br>");
        this.sumTarget.setContent("<span class='result-bold'>Mouse Event Dispatching</br></span><table border='0'>");
        for(j=0;j<5;j++){
            type = eventList[j]
            for(i=0;i<testSize;i++){
                name = "simEv_"+i;
                simList[name] = document.createEvent('MouseEvents');
                canBubble = true;
                cancelable = false;
                view = document.defaultView;
                detail = 0;
                screenX = 100+i; screenY = 0;
                clientX = 0; clientY = 0;
                ctrlKey = false; altKey = false; shiftKey = false; metaKey = false;
                button = null; relatedTarget = null;
                simList[name].initMouseEvent(type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
            }
            this.target.addContent("Dispatching mouse event of type <span class='result-bold'>"+type+"</span> for <span class='result-bold'>"+testSize+"</span> times.</br>");
            this.sumTarget.addContent("<tr><td><span class='result-bold'>&nbsp;"+type+"</span></td>");
            t1 = new Date().getTime();
            for(i=0;i<testSize;i++){
                name = "simEv_"+i;
                enyo.dispatch(simList[name]);
            }
            t2= new Date().getTime();
            this.target.addContent("Executing Time : <span class='result-bold'>"+(t2-t1)+"</span> ms</br>");
            opPerSec = testSize*1000/(t2-t1);
            opPerSec = Math.floor(opPerSec);
            opPerSec = opPerSec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.sumTarget.addContent("<td>: "+opPerSec+"op/sec</td></tr>");
        }
        this.target.addContent("</div></br>");
        this.sumTarget.addContent("</table>");
    }
});

//Enyo Framework Loading Test
enyo.kind({
    name: "enyoLoadingTest",
    kind: "onyx.Button",
    handlers: { ontap: "tester" },
    content: "Start",
    tester: function() {

        this.target.addContent("<div class='result-subwindow'><span class='result-bold'>Enyo Framework Loading Test</span></br>");
        this.target.addContent("Loading Enyo Framework in new window...</br>");
        
        /*create window object, and load enyo Framework in the new document */
        
        var testWindow=window.open("","","width=600,height=400");
        testWindow.document.open();
        testWindow.document.write('<scri' + 'pt>'+'document.write("<h1>Enyo Framework Loading Test</h1></br>Loading Enyo Framework...</br>");t1=new Date().getTime();'+'</scri' + 'pt>');
        testWindow.document.write('<scri' + 'pt src = "enyo/enyo.js">'+ '</scri' + 'pt>');
        testWindow.document.write('<scri' + 'pt>'+'t2=new Date().getTime();document.write("Loading Finished.</br><h2>Loading Time is "+(t2-t1)+"ms.</h2>");'+'</scri' + 'pt>');
        testWindow.document.write('Test finished.</br><button onclick="window.close()">Close Current Window</button>')
        testWindow.document.close();
        testWindow.document.title = "Enyo Framework Loading Test";

        this.target.addContent("Loading completed.</br>Check result in opened window.</br>"); 
        this.target.addContent("</div></br>");        

    },
});

//Outmost Layout
enyo.kind({
	name: "App",
    kind: "FittableColumns",
    components: [
        {   name: "menuList",
            kind: "Scroller",
            classes: "menu-list",
            //horizontal:"hidden",
            components: [
                {   kind: "Scroller",
                    classes: "menu-list-item",
                    touchOverscroll:false,
                    touch: true,
                    vertical: "hidden",
                    style: "margin:0px",
                    thumn:false,
                    components: [
                        {   classes: "onyx-toolbar-inline",
                            style: "white-space: nowrap;",
                            components : [
                                {content: "Enyo Framework Loading Test"},
                                {kind: "enyoLoadingTest"}
                            ]
                        }
                    ]
                },
                {
                    kind: "Scroller",
                    classes: "menu-list-item",
                    touchOverscroll:false,
                    touch: true,
                    vertical: "hidden",
                    style: "margin:0px",
                    thumn:false,
                    components: [
                        {   classes: "onyx-toolbar-inline",
                            style: "white-space: nowrap;",
                            components: [
                                        {content: "Event Handling Test"},
                                        {kind: "eventHandlingTest"}
                            ]
                        }
                    ]
                },
                {   kind: "Scroller",
                    classes: "menu-list-item",
                    touchOverscroll:false,
                    touch: true,
                    vertical: "hidden",
                    style: "margin:0px",
                    thumn:false,
                    components: [
                        {   classes: "onyx-toolbar-inline",
                            style: "white-space: nowrap;",
                            components : [
                                {content: "Event Register Test" },
                                {kind: "addEventTest"}
                            ]
                        }
                    ]
                },
                {   kind: "Scroller",
                    classes: "menu-list-item",
                    touchOverscroll:false,
                    touch: true,
                    vertical: "hidden",
                    style: "margin:0px",
                    thumn:false,
                    components: [
                        {   classes: "onyx-toolbar-inline",
                            style: "white-space: nowrap;",
                            components : [
                                {content: "Mouse Event Dispatching Test"},
                                {kind: "dispatchMouseEventTest"}
                            ]
                        }
                    ]
                }
            ]
        },
        {   
            name: "resultWindow",
            kind: "FittableRows",
            classes : "result-window",
            style:"padding:0px;",
            fit: true,
            components: [
                    {   name:"resultBox",
                        classes : "result-box",
                        kind: "FittableRows",
                        style :"height: 62%;",
                        components:[
                            {   name: "resultTitle",
                                classes: "result-box", 
                                allowHtml: true,
                                content: "<span class = 'result-title'>Test Result</span>"
                            },
                            {   name: "resultScroller",
                                kind: "Scroller",
                                fit : true,
                                classes: "vertical-scroller result-box enyo-scrollee-fit",
                                components: [
                                   {   name: "logMonitor",
                                        allowHtml: true,
                                        content: "",
                                        classes: "result-box"
                                    }
                                ]
                            }
                        ]
                    },
                    {   classes: "summary-box",
                        kind: "FittableRows",
                        style: "border-top: 1px solid; height:25%;",
                        components:[
                            {   name: "resultTitle",
                                classes: "summary-box",
                                allowHtml: true,
                                content: "<span class = 'summary-title'>Summary</span>"
                            },
                            {
                                name: "sumScroller",                                
                                kind: "Scroller",
                                fit : true,
                                classes: "vertical-scroller summary-box enyo-scrollee-fit",
                                //style : "height:80%",
                                components: [
                                    {   name: "eventHandlingSummary", allowHtml: true, classes : "summary-content",
                                        content : "<span class='result-bold'>Event Handler Call : </span>"
                                    },
                                    {   name: "eventRegisterSummary", allowHtml: true, classes : "summary-content",
                                        content : "<span class='result-bold'>Event Register :  </span>"
                                    },
                                    {   name: "mouseEventSummary", allowHtml: true, classes : "summary-content",
                                        content : "<span class='result-bold'>Mouse Event Dispatching</br></span>"
                                    }
                                ]
                            }
                        ]
                    },
                    {   classes: "env-box",
                        kind: "FittableRows",
                        style: "border-top: 1px solid; height:13%",
                        components:[
                            {   name: "envTitle",
                                classes: "env-box",
                                allowHtml: true,
                                content: "<span class = 'env-title'>Test Environment</span>"
                            },                        
                            {
                                name: "envScroller",
                                kind: "Scroller",
                                fit: true,
                                classes : "vertical-scroller env-box enyo-scrollee-fit",
                                components : [
                                    {   name: "envMonitor",
                                        allowHtml: true,
                                        content: "",
                                        classes: "env-box"
                                    }
                                ]
                            }
                        ]
                    }
            ]
        }
    ],
    create: function(){
        this.inherited(arguments);
        var target = this.$.logMonitor;
        this.$.eventHandlingTest.target = target;
        this.$.addEventTest.target = target;
        this.$.dispatchMouseEventTest.target = target;
        this.$.enyoLoadingTest.target = target;        
        this.$.envMonitor.addContent("<p><span class='result-bold'>Browser Info : </span>"+navigator.userAgent+"</p>");
        
        this.$.eventHandlingTest.sumTarget = this.$.eventHandlingSummary;
        this.$.addEventTest.sumTarget = this.$.eventRegisterSummary;
        this.$.dispatchMouseEventTest.sumTarget = this.$.mouseEventSummary;

    }
});



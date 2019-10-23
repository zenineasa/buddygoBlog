define([
    "mod/connectingLine/connectingLine",
], function(connectingLine){

    // Adding stylesheet
    var head = document.getElementsByTagName("HEAD")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "mod/dragbox/dragbox.css";
    head.appendChild(link);

    var dragbox = [];

    dragbox.connectionsTo = [];
    dragbox.connectionsFrom = [];

    dragbox.headerIdGen = function(id){
        return id + '-header';
    }

    dragbox.create = function(
        id, title, content, x, y, width, height, connectionsFrom, connectionsTo, // Mandatory
        titleColor, titleTextColor, boxColor, boxTextColor // optional
    ){
        var headerId = dragbox.headerIdGen(id);
        var div = document.createElement("div");
        div.id = id;
        div.className = "dragbox";
        div.innerHTML = '<div id="' + headerId + '" class="header">' + title + '</div>';
        div.innerHTML += '<div class="content">' + content + '</div>';

        div.style.left = x + "px";
        div.style.top = y + "px";
        div.style.width = width + "px";
        div.style.height = height + "px";

        var canvas = document.getElementById("canvas");
        canvas.appendChild(div);
        dragbox.dragElement(div);

        dragbox.connectionsFrom[id] = connectionsFrom;
        dragbox.connectionsTo[id] = connectionsTo;

        // Optional parameters
        if(typeof titleColor !== "undefined"){
            var headerDiv = document.getElementById(headerId);
            headerDiv.style.background = titleColor;
        }
        if(typeof titleTextColor !== "undefined"){
            var headerDiv = document.getElementById(headerId);
            headerDiv.style.color = titleTextColor;
        }
        if(typeof boxColor !== "undefined"){
            div.style.background = boxColor;
        }
        if(typeof boxTextColor !== "undefined"){
            div.style.color = boxTextColor;
        }
    }

    dragbox.dragElement = function(elmnt){
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(dragbox.headerIdGen(elmnt.id))) {
            document.getElementById(dragbox.headerIdGen(elmnt.id)).onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element"s new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

            // Update the lines
            connectingLine.updateConnectionsTo(elmnt.id, dragbox.connectionsFrom[elmnt.id]);
            connectingLine.updateConnectionsFrom(elmnt.id, dragbox.connectionsTo[elmnt.id]);
        }

        function closeDragElement() {
            // Update the lines
            connectingLine.updateConnectionsTo(elmnt.id, dragbox.connectionsFrom[elmnt.id]);
            connectingLine.updateConnectionsFrom(elmnt.id, dragbox.connectionsTo[elmnt.id]);

            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    dragbox.initializeConnections = function(content){
        setTimeout(function(){
            // For initializing connections, handling either of connectionsTo or connectionsFrom
            // would be sufficient
            for(var i = 0 ; i < content.length; i++){
                var toId = content[i].id;
                var connectionsFrom = dragbox.connectionsFrom[toId];
                for(j = 0; j < connectionsFrom.length; j++){
                    connectingLine.create(connectionsFrom[j], toId);
                }
            }
        });
    }

    return dragbox;
});

define([], function(){

    // Adding stylesheet
    var head = document.getElementsByTagName("HEAD")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "mod/connectingLine/connectingLine.css";
    head.appendChild(link);

    var connectingLine = [];

    connectingLine.idGen = function(id1, id2){
    	return 'connectingLine-' + id1 + "_" + id2;
    }

	connectingLine.create = function(id1, id2){
		// Create if it does not already exist
    	var div = document.createElement("div");
    	div.id = connectingLine.idGen(id1, id2);
        div.className = "connectingLine";

        // Arrow mark
        var span = document.createElement("span");
        span.innerHTML = "&#9654;";
        div.appendChild(span);

        var canvas = document.getElementById("canvas");
        canvas.appendChild(div);

        connectingLine.updateConnectionBetween(id1, id2);
    }

    connectingLine.updateConnectionBetween = function(id1, id2){
    	var div = document.getElementById(connectingLine.idGen(id1, id2));

		// Getting center coordinates of id1
        var div1 = document.getElementById(id1);
        var x1 = div1.offsetLeft + div1.offsetWidth / 2;
        var y1 = div1.offsetTop + div1.offsetHeight / 2;

        // Getting center coordinates of id2
        var div2 = document.getElementById(id2);
        var x2 = div2.offsetLeft + div2.offsetWidth / 2;
        var y2 = div2.offsetTop + div2.offsetHeight / 2;

        // calculate width and angle (r-theta coordinate system)
        var width = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        var angle = Math.atan((y1 - y2) / (x1 - x2)) * 57.2958;
        if(x1 - x2 > 0){
        	angle += 180;
        } else if (x1 - x2 === 0){
            if(y1 - y2 > 0){
                angle = -90;
            } else {
                angle = 90;
            }
        }

        div.style.left = x1;
        div.style.top = y1;
        div.style.width = width;
        div.style.transformOrigin = 0 + " " + 0;
        div.style.transform = "rotate(" + angle + "deg)";
    }

    connectingLine.updateConnectionsTo = function(id2, connectionsFrom){
    	for(var i = 0; i < connectionsFrom.length; i++){
    		connectingLine.updateConnectionBetween(connectionsFrom[i], id2);
    	}
    }

    connectingLine.updateConnectionsFrom = function(id1, connectionsTo){
    	for(var i = 0; i < connectionsTo.length; i++){
    		connectingLine.updateConnectionBetween(id1, connectionsTo[i]);
    	}
    }

    return connectingLine;
});
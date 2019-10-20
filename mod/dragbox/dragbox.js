define([
  'dojo/_base/declare'
], function(declare){

  // Adding stylesheet
  var head = document.getElementsByTagName('HEAD')[0];
  var link = document.createElement('link');
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "mod/dragbox/dragbox.css";
  head.appendChild(link);

  return declare("dragbox", null, {
    create: function(id, title, content, x, y){
      var div = document.createElement("div");
      div.id = id;
      div.className = "dragbox";
      div.innerHTML = '<div id="'+id+'header" class="header">'+title+'</div>';
      div.innerHTML += '<div class="content">'+content+'</div>';
      div.style.left = x + "px";
      div.style.top = y + "px";

      var canvas = document.getElementById("canvas");
      canvas.appendChild(div);
      dragbox().dragElement(div);
    },

    dragElement: function(elmnt){
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
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
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  });
});

require([
    "mod/pageSettings/pageSettings",
    "mod/dragbox/dragbox",
    "mod/sidebar/sidebar",
    "dojo/json"
    //"js/canvas"
], function(pageSettings, dragbox, sidebar, json){
    var params = window.location.search;
    params = params.split(/\?|=|&/);
    var index = params.findIndex(function(x){
        return x==="page"
    });
    var filename = params[index + 1];
    if(!filename){
        filename = "home"
    }
    var requireStr = "dojo/text!content/json/" + filename + ".json";

    require([requireStr], function(JSONContent){
        var jsonParsed = JSON.parse(JSONContent, true);

        // Setting up the page
        pageSettings.apply(jsonParsed.pageSettings);

        // Setting up the sidebar
        var sidebarContent = jsonParsed.sidebar;
        sidebar.create(
            sidebarContent.title,
            sidebarContent.subTitle,
            sidebarContent.content,
            sidebarContent.hidable
        );

        // Setting up the drag boxes
        var content = jsonParsed.canvas;
        var dragboxes = [];
        for(var i = 0 ; i < content.length; i++){
            dragbox.create(
                content[i].id,
                content[i].title,
                content[i].text,
                content[i].xCoordinate,
                content[i].yCoordinate,
                content[i].width,
                content[i].height,
                content[i].connectionsFrom,
                content[i].connectionsTo,
                content[i].titleColor, // optional
                content[i].titleTextColor, // optional
                content[i].boxColor, // optional
                content[i].boxTextColor // optional
            );
        }

        // Setting up the connecting lines
        dragbox.initializeConnections(content);
    });

});
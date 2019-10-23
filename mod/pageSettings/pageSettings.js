define([], function(){

	var pageSettings = [];
	
	pageSettings.apply = function(settings){
		if(settings.backgroundColor){
			document.body.style.background += " " + settings.backgroundColor;
		}
		if(settings.backgroundImage){
			document.body.style.background += " url(" + settings.backgroundImage + ")";
		}
		if(settings.backgroundSize){
			document.body.style.backgroundSize = settings.backgroundSize;
		}
		if(settings.scrollX){
			document.body.style.overflowX = "scroll";
		}
		if(settings.scrollY){
			document.body.style.overflowY = "scroll";
		}
	}

    return pageSettings;
});
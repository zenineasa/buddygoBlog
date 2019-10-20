require([
	'js/canvas.js',
	'mod/dragbox/dragbox.js',
	'dojo/json',
	'dojo/text!database.json'
], function(_,dragbox, json, JSONContent){
	var content = JSON.parse(JSONContent, true);
	for(var i = 0 ; i < content.length; i++){
		debugger;
		dragbox().create(
			content[i].id,
			content[i].title,
			content[i].text,
			content[i].xCoordinate,
			content[i].yCoordinate
		);
	}
});
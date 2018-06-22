jQuery(function() {

//does not need jwuery on its own
function loadPortals(username) {
	//load from file -> single pattern
	const loadPlainTextPortals = function(username) {
		const file = "website.json";
		const placeHolder = "USER";
		const json = loadJSONFile(file);

		for(let index=0; index<json.length; index++) {
			const generalUrl = json[index]['generalUrl'];
			const portalName = json[index]['portalName'];
			const successCondition = json[index]['successCondition'];

			const specificUrl = generalUrl.replace(placeHolder,username);

			portals.push(new PlainTextPortal(specificUrl, portalName, successCondition));
		}
	}

	//main loading
	var portals = [];

	//load any
	loadPlainTextPortals(username);

	return portals;
}

//jquery needed here
function loadJSONFile(name) {
	return jQuery.getJSON(name);
}

//put function created within jquery to global namespace
	window.loadspace = window.loadspace || {};
	window.loadspace.loadPortals = loadPortals;
});

jQuery(function() {


function Portal(url, name) {
	this.url = url;
	this.name = name;

	//every portal has the function check() -> true oder false, je nachdem, ob da ein account ist
}


function PlainTextPortal(url, name, successCondition) {
	super(url,name);

	this.successCondition = successCondition;
}

PlainTextPortal.prototype = Portal;

PlainTextPortal.check = function() {
	TODO
}




function loadPortals(username) {
	const portals = [];

	//load any
	loadPlainTextPortals(username);

	return portals;


	function loadPlainTextPortals(username) {
		const file = "plaintextportals.json";
		const json = jQuery.getJSON(file);

		for(let index=0; index<json.length; index++) {
			const generalUrl = json[index]['url'];
			const portalName = json[index]['name'];
			const successCondition = json[index]['successCondition'];

			const specificUrl = generalUrl.replace('USERNAME',username);

			portals.push(new PlainTextPortal(specificUrl, portalName, successCondition));
		}
	}
}


});
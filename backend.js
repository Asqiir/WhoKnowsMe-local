jQuery(function() {


function Portal(url, name) {
	this.url = url;
	this.name = name;

	//every portal has the function check(data) -> true oder false, je nachdem, ob da ein account ist
}

Portal.accountCheck = function(html) {
	const doc = new DOMParser().parseFromString(html, "text/html");

	if(this.check(doc)) {
		printAccount(this.url, this.name);
	}

	stillUnchecked -= 1;

	if(stillUnchecked <= 0) {
		stopLoading();
	}
}


function PlainTextPortal(url, name, successCondition) {
	super(url,name);

	this.successCondition = successCondition;
}

PlainTextPortal.prototype = Portal;

PlainTextPortal.check = function(doc) {
	const title = doc.querySelectorAll('title')[0].innerHTML;

	return !title.includes(this.successCondition);
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
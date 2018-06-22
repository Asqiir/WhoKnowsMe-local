jQuery(function() {


class Portal {
	constructor(url, name) {
		this.url = url;
		this.name = name;
	}

	accountCheck(html) {
		const doc = new DOMParser().parseFromString(html, "text/html");

		if(this.check(doc)) {
			printAccount(this.url, this.name);
		}

		stillUnchecked -= 1;

		if(stillUnchecked <= 0) {
			stopLoading();
		}
	}
	//every portal has the function check(data) -> true oder false, je nachdem, ob da ein account ist
}



class PlainTextPortal extends Portal {
	constructor(url, name, successCondition) {
		super(url,name);

		this.successCondition = successCondition;
	}

	check(doc) {
		const title = doc.querySelectorAll('title')[0].innerHTML;

		return !title.includes(this.successCondition);
	}
}



function loadPortals(username) {
	//load from file -> single pattern
	const loadPlainTextPortals = function(username) {
		const file = "plaintextportals.json";
		const placeHolder = "USER";
		const json = jQuery.getJSON(file);

		for(let index=0; index<json.length; index++) {
			const generalUrl = json[index]['url'];
			const portalName = json[index]['name'];
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


});

function test() {}
test();


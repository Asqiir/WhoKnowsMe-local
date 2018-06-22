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



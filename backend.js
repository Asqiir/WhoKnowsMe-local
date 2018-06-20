const plainTextUrlsFile = "plainTextUrls.json";
let plainTextUrlsJSON = 0; //will get value as soon as json is loaded

//2 json types over here:
 //1) json file that is loaded
 //2) json file that is created and sent to frontend

//for loading json files only
jQuery(function() {
jQuery.getJSON(plainTextUrlsFile,plainTextUrlsJsonLoaded);
});


function checkAccount(username) {
	//1) get all portals?
	const portals = loadPortals(username);

	//2) test for any of these, whether there is an account
	const accounts = [];

	for(let portal in portals) {
		if(portal.hasAccount()) {
			const url = portal.getProfileUrl();
			const portalName = portal.getName();
			accounts.push(new Account(url, portalName));
		}
	}

	//3) put all accounts in a json
	//4) return that json
	return accountsAsJson(accounts);
}

function Portal(url, name) {
	this.profileUrl = url;
	this.name = name;
}
//abstract method: (not implemented: https://stackoverflow.com/questions/7477453/best-practices-for-abstract-functions-in-javascript)
/*
* hasAccount() -> returns true or false
*/

function PlainTextPortal(url,name,successCondition) {
	super(url,name);
	this.successCondition = successCondition;
}

PlainTextPortal.prototype = Portal;

PlainTextPortal.hasAccount = function() {
	//if: title der website enthält this.successCondition -> return true
}



function Account(url,name) {
	this.profileUrl = url;
	this.portalName = name;
}


function accountsAsJson(accounts) {
	return JSON.stringify(accounts);
}

function loadPortals(username) {
	let allPortals = [];

	loadPlainTextPortals(username); //add all plaintextportals...

	return allPortals;


	function loadPlainTextPortals(username) {
		for(let index in plainTextUrlsJSON) {
			const generalUrl = plainTextUrlsJSON[index]['url'];
			const portalsName = plainTextUrlsJSON[index]['name'];
			const successCondition = plainTextUrlsJSON[index]['successCondition'];

			const specificUrl = generalUrl.replace('USERNAME',username);

			allPortals.push(new PlainTextPortal(specificUrl,portalsName,successCondition));
		}
	}
}

function plainTextUrlsJsonLoaded(json) {
	plainTextUrlsJSON = json;
}
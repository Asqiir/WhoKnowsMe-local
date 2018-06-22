jQuery(function() {

const proxy_url = "https://cors.io?";

//global. when 0, nothing loads anymore
let stillUnchecked = 0;

function run() { //run, when input event happens
	//1) clear #output
	jQuery('#output').html('');

	//2) start loading animation
	startLoading();

	//3) get username
	const username = getInput();

	//4) load portals
	const allPortals = loadPortals(username);

	//5) check any portal
	for(let index=0; index < allPortals.length; index++) {
		const url = allPortals[index]['url'];
		const on_finish = allPortals[index].accountCheck;

		jQuery.get(proxy_url + url, on_finish);
	}
}


function getInput() {
	return escape(jQuery('#username').val());
};
	

//====LOADING=FUNCTIONS========
function startLoading() {}

function stopLoading() {}


//====INPUT=EVENTS==============

//this function will be run when enter is pressed in the #username input
jQuery('#username').keypress(function (e) {
	if (e.which == 13) {
		run();
	}
});

//this function will run when button #submit is clicked
jQuery('#submit').click(function() {
	run();	
});

});
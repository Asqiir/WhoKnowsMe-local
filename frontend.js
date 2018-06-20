jQuery(function() {

function run() { //run, when input event happens
	//1) read input
	const input = getInput();

	//2) do work -> get answer as json? [extra file]
	const json = backend.checkAccount(input);

	//3) convert answer to list
	const list = frontend.createList(json);

	//3) print output
	jQuery('#output').html(list);
}



function getInput() {
	return escape(jQuery('#username').val());
};
	

//====HELPER=FUNCTIONS========

function createList(json) {
	const list = document.createElement('ul');

	for(var acc in json) {
		var listPoint = document.createElement('li');
		listPoint.innerHTML = 'There is an <a href="' + json[acc].url + '">account</a> at ' + json[acc].name;
		list.append(listPoint);
	}

	return list;
}

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
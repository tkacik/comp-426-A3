/*************************************
This Javascript was created by
T. J. Tkacik for 
Assignment 3 of COMP 426-f13
**************************************/

/*************************************
'Main' Method
**************************************/

$(document).ready(function () {
	
	$('#scenario_builder').on('submit', buildScenario);
	
	$('#demographics').on('submit', runScenario);
	
	$('#scenario_list').on('click', 'input', null, removeScenario);
});

var buildScenario = function(e) {
	if(validateScenario()) {
		addScenario();
	}
	e.preventDefault();
}

var validateScenario = function(e) {
	
	var isValid = false;
	alert("TODO: VALIDATION");
	isValid = true;
	return isValid;
}

var addScenario = function(e) {
	alert("TODO: ADDING");
}

var removeScenario = function(e) {
	alert("TODO: REMOVING");
	e.preventDefault();
}

var runScenario = function(e) {
	alert("TODO: RUN");
	e.preventDefault();
}

//$('#scenario_list').append($("<tr></tr>")).append($("<td></td>").append($('#scenario_builder input[name="scenario_name"]').val()));
//$('#the_list').append($("<li></li>").append($('#the_form input[name="itemval"]').val())
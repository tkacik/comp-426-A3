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
	var scen = $("<tr></tr>");
	$('#scenario_builder input').each( function(i,e) {
		if(i < 4)
			scen.append($("<td></td>").append($(e).val()));
	});
	
	scen.append('<td><input type="submit" value="Remove"></td>');

	$('#scenario_list').append(scen);
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
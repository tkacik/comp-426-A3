/*************************************
This Javascript was created by
T. J. Tkacik for 
Assignment 3 of COMP 426-f13
**************************************/

/*************************************
'Main' Method
**************************************/

var thisYear = 2013;
var yearOfBirth;
var currentSavings;
var retirementAge;
var deathAge;
var workingYears;
var retirementYears;

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
	$(this).parent().parent().remove();
	e.preventDefault();
}

var runScenario = function(e) {
	yearOfBirth = $('#year_of_birth').val();
	currentSavings = $('#current_savings').val();
	retirementAge = $('#retirement_age').val();
	deathAge = $('#life_expectancy').val();
	workingYears = retirementAge - (thisYear - yearOfBirth);
	retirementYears = deathAge - retirementAge;
	
	alert("TODO: VALIDATE DEMOGRAPHICS");
	$('#scenario_list tbody tr').each(calculateSaveReq);
	alert("TODO: CREATE TABLE");
	e.preventDefault();
}

var calculateSaveReq = function(i, e) {
	var n = workingYears;
	var m = retirementYears;
	var I = currentSavings;
	var r;
	var g;
	var T;
	$(e).children().each(function(j, f) {
		switch(j){
			case 1:
				r = $(f).text()/100 + 1;
				break;
			case 2:
				g = $(f).text()/100 + 1;
				break;
			case 3:
				T = $(f).text();
				break;
			default:
		};
	});
	
	S = ((T*(1-(Math.pow(g,m)))/(Math.pow(g,m-1))/(1-g))-(I*Math.pow(r,n)))*((1-r)/(1-Math.pow(r,n)));
	
	alert(S);
	//alert("TODO: CALCULATE " + e + i);
}

//$('#scenario_list').append($("<tr></tr>")).append($("<td></td>").append($('#scenario_builder input[name="scenario_name"]').val()));
//$('#the_list').append($("<li></li>").append($('#the_form input[name="itemval"]').val())
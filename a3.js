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
	
	$('#report_table').find('tr').remove();
		
	var scenarios = $("#scenario_list").find('tr');
	var reports = $("#report_table");
	
	var S = new Array(scenarios.length);
	var R = new Array(scenarios.length);
	var G = new Array(scenarios.length);
	var T = new Array(scenarios.length);
	var n = workingYears;
	var m = retirementYears;
	var I = currentSavings;
	
	var HEAD = $("<tr></tr>").appendTo(reports.find('thead'));
	
	HEAD.append("<td>Year</td>")

	scenarios.each(function(i, e) {
		$("<td></td>").appendTo(HEAD).text($(e).children().first().text());
	});
	
	HEAD = $("<tr></tr>").appendTo(HEAD.parent());
	HEAD.append("<td>Annual Savings</td>")
	
	scenarios.each(function(i, e) {
		$(e).children().each(function(j, f) {
			switch(j){
				case 1:
					R[i] = +($(f).text()/100 + 1);
					break;
				case 2:
					G[i] = +($(f).text()/100 + 1);
					break;
				case 3:
					T[i] = +($(f).text());
					break;
				default:
			};
		});
				
		S[i] = ((T[i]*(1-(Math.pow(G[i],m)))/(Math.pow(G[i],m-1))/(1-G[i]))-(I*Math.pow(R[i],n)))*((1-R[i])/(1-Math.pow(R[i],n)));

		$("<td></td>").appendTo(HEAD).text("$" + S[i].toFixed(2));
	});
	
	HEAD = $("<tr></tr>").appendTo(reports.find('tbody'));

	var y = 0;
	var gross = new Array(scenarios.length);
	
	scenarios.each(function(i, e) {
		gross[i] = +currentSavings;
	});

	while (y < workingYears) {
		$("<td></td>").text(thisYear + y).appendTo(HEAD);

		scenarios.each(function(i, e) {
			$("<td></td>").appendTo(HEAD).text(gross[i].toFixed(2));
			gross[i] = (Number(gross[i]))*R[i]+Number(S[i]);
		});
		y++;
		HEAD = $("<tr></tr>").appendTo(HEAD.parent());
	}
	
	HEAD.addClass("retirement");
		$("<td></td>").text(thisYear + y).appendTo(HEAD);
	
		scenarios.each(function(i, e) {
			$("<td></td>").appendTo(HEAD).text(gross[i].toFixed(2));
			gross[i] = (gross[i]-T[i])*G[i];
			});
		y++;
		HEAD = $("<tr></tr>").appendTo(HEAD.parent());
	
	while (y <= retirementYears + workingYears) {
		$("<td></td>").text(thisYear + y).appendTo(HEAD);

		scenarios.each(function(i, e) {
			$("<td></td>").appendTo(HEAD).text(gross[i].toFixed(2));
			gross[i] = (gross[i]-T[i])*G[i];
		});
		y++;
		HEAD = $("<tr></tr>").appendTo(HEAD.parent());
	}
	
	e.preventDefault();
}

//$('#scenario_list').append($("<tr></tr>")).append($("<td></td>").append($('#scenario_builder input[name="scenario_name"]').val()));
//$('#the_list').append($("<li></li>").append($('#the_form input[name="itemval"]').val())






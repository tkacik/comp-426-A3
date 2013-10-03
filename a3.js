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
var scenarioCount = 1;

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
	var flag = true;
	var message = "";
	if (!$.trim($('#scenario_name').val()).length) {
		$('#scenario_name').addClass("invalid");
		flag = false;
		message += "Invalid scenario name. ";
	} else {$('#scenario_name').removeClass("invalid");}
	
	if (isNaN($('#working_roi').val()) || $('#working_roi').val() <= 0 ) {
		$('#working_roi').addClass("invalid");
		flag = false;
		message += "Invalid return on investment while working. ";
	} else {$('#working_roi').removeClass("invalid");}

	if (isNaN($('#retired_roi').val()) || $('#retired_roi').val() <= 0 ) {
		$('#retired_roi').addClass("invalid");
		flag = false;
		message += "Invalid return on investment while retired. ";
	} else {$('#retired_roi').removeClass("invalid");}

	if (isNaN($('#desired_retirement').val()) || $('#desired_retirement').val() <= 0 ) {
		$('#desired_retirement').addClass("invalid");
		flag = false;
		message += "Invalid retirement income. ";
	} else {$('#desired_retirement').removeClass("invalid");}
	
	if (!flag) alert(message);
	
	return flag;
}

var addScenario = function(e) {	
	var scen = $("<tr></tr>");
	$('#scenario_builder input').each( function(i,e) {
		if(i < 4)
			scen.append($("<td></td>").append($(e).val()));
	});
	
	scen.append('<td><input type="submit" value="Remove"></td>');

	$('#scenario_list').append(scen);
	
	$('#scenario_list').prev().removeClass("hidden");
	
	$('#scenario_name').val("Scenario " + ++scenarioCount);

}

var removeScenario = function(e) {
	$(this).parent().parent().remove();
	
	if($('#scenario_list').children().length == 0) {
		$('#scenario_list').prev().addClass("hidden");
	}
	e.preventDefault();
}

var runScenario = function(e) {
	yearOfBirth = $('#year_of_birth').val();
	currentSavings = $('#current_savings').val();
	retirementAge = $('#retirement_age').val();
	deathAge = $('#life_expectancy').val();
	workingYears = retirementAge - (thisYear - yearOfBirth);
	retirementYears = deathAge - retirementAge;
	
	var scenarios = $("#scenario_list").find('tr');
	var reports = $("#report_table");
	
	reports.find('tr').remove();
	var HEAD = $("<tr></tr>").appendTo(reports.find('thead'));
	
	var validation = validateDemographics(yearOfBirth, currentSavings, retirementAge, deathAge);
	if (validation[0]) {

		
		var S = new Array(scenarios.length);
		var R = new Array(scenarios.length);
		var G = new Array(scenarios.length);
		var T = new Array(scenarios.length);
		var n = workingYears;
		var m = retirementYears;
		var I = currentSavings;
		
		HEAD.append("<td>Year</td>")
	
		scenarios.each(function(i, e) {
			$("<td></td>").appendTo(HEAD).text($(e).children().first().text());
		});
		
		HEAD = $("<tr></tr>").appendTo(HEAD.parent());
		HEAD.append("<td>(Annual Savings)</td>")
		
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
	
			$("<td></td>").appendTo(HEAD).text("($" + S[i].toFixed(2) + "/yr)");
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
				$("<td></td>").appendTo(HEAD).text("$" + gross[i].toFixed(2));
				gross[i] = (Number(gross[i]))*R[i]+Number(S[i]);
			});
			y++;
			HEAD = $("<tr></tr>").appendTo(HEAD.parent());
		}
		
		HEAD.addClass("retirement");
			$("<td></td>").text(thisYear + y).appendTo(HEAD);
		
			scenarios.each(function(i, e) {
				$("<td></td>").appendTo(HEAD).text("$" + gross[i].toFixed(2));
				gross[i] = (gross[i]-T[i])*G[i];
				});
			y++;
			HEAD = $("<tr></tr>").appendTo(HEAD.parent());
		
		while (y <= retirementYears + workingYears) {
			$("<td></td>").text(thisYear + y).appendTo(HEAD);
	
			scenarios.each(function(i, e) {
				$("<td></td>").appendTo(HEAD).text("$" + gross[i].toFixed(2));
				gross[i] = (gross[i]-T[i])*G[i];
			});
			y++;
			HEAD = $("<tr></tr>").appendTo(HEAD.parent());
		}
	}
	else {
		$("<td></td>").text(validation[1]).appendTo(HEAD);
	}
	e.preventDefault();
}

var validateDemographics = function(yearOfBirth, currentSavings, retirementAge, deathAge) {
	var flag = true;
	var message = "";
	
	if (isNaN(yearOfBirth) || yearOfBirth < 0 || yearOfBirth > thisYear) {
		$('#year_of_birth').addClass("invalid");
		flag = false;
		message += "Invalid birth year. ";
	} else {$('#year_of_birth').removeClass("invalid");}
	
	if (isNaN(currentSavings)) {
		$('#current_savings').addClass("invalid");
		flag = false;
		message += "Invalid savings. ";
	} else {$('#current_savings').removeClass("invalid");}
	
	if (isNaN(retirementAge) || yearOfBirth < thisYear - retirementAge + 1) {
		$('#retirement_age').addClass("invalid");
		flag = false;
		message += "Invalid retirement age. ";
	} else {$('#retirement_age').removeClass("invalid");}
	
	if (isNaN(deathAge) || deathAge <= retirementAge) {
		$('#life_expectancy').addClass("invalid");
		flag = false;
		message += "Invalid life expectancy. ";
	} else {$('#life_expectancy').removeClass("invalid");}
	
	if($('#scenario_list').children().length == 0){
		flag = false;
		message += "You must create at least one scenario. "
	}
	
	return new Array (flag, message);
}







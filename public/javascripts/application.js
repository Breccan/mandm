// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(document).ready(function() {
	
	var step = $( "#slider" ).slider( "option", "step" );
	var max = $( "#slider" ).slider( "option", "max" );
	var max = $( "#slider" ).slider( "option", "min" );
	
    $("#slider").slider({max:7, min:1, step:1 });

	

  });

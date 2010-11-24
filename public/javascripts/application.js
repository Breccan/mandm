// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(document).ready(function() {
	
	var step = $( "#slider" ).slider( "option", "step" );
	var max = $( "#slider" ).slider( "option", "max" );
	var max = $( "#slider" ).slider( "option", "min" );
	
    $("#slider").slider({max:13, min:1, step:1 });

/* canvas stuff , forgive me i am learning */


	$(function(){ 
		var canvas = document.getElementById('legend'); 
		var context = canvas.getContext('2d');
		
		var nzeuro = ('#29E2D8');
		var maori = ('#0EDB3E');
		var pasifika = ('#E0E836');
		var asian = ('#E02B8A');
		var meela = ('#EFA91D');
		var other = ('#3CC1EF')
		
		var legendFont = ('14px sans-serif')

		context.fillStyle = nzeuro; 
		context.fillRect (10, 10, 20, 20);
		
		context.fillStyle = maori; 
		context.fillRect (10, 40, 20, 20);
		
		context.fillStyle = pasifika; 
		context.fillRect (10, 70, 20, 20);
		
		context.fillStyle = asian; 
		context.fillRect (10, 100, 20, 20);
		
		context.fillStyle = meela; 
		context.fillRect (10, 130, 20, 20);
		
		context.fillStyle = other; 
		context.fillRect (10, 160, 20, 20);
		
		context.font = legendFont; 
		context.textBaseline = 'top';
		context.fillStyle = '#666';
		
		context.fillText('European /Pākehā', 50, 14);
		context.fillText('Māori', 50, 44);
		context.fillText('Pasifika', 50, 74);
		context.fillText('Asian', 50, 104);		
		context.fillText('MELAA', 50, 134);	
		context.fillText('Other', 50, 164);	

	});
});

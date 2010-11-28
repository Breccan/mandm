// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};
(function ($) {
	// Adds up an array of objects with value properties and returns the result.
 	$.sum_values = function(object){
		return $.inject(object, 0, function(total) {return total + Number(this.value);});
	}
})(jQuery);
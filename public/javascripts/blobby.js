(function($){
  /* * * * * * * *
   * Tweakables  *
   * * * * * * * */
  var BLOB_MARGIN = 50; //minimum margin between blob and center blob
  var BLOB_PADDING = 20; //for the text labels;
  var BLOB_AREA_EXPONENT = 1; //exponent for children to area
  var BLOB_ANIMATION_DURATION = 1000;
  var BLOB_ANIMATION_QUALITY = 10; //number of milliseconds per frame
  var BLOB_ANIMATION_EASING = 'easeInOutElastic';
  var BLOB_MARGIN_MULTIPLIER = 1.7;
  var BLOB_DEFAULT_COLOR = '#555'
  var BLOB_STEP_INTERVAL = 3000;
  var BLOB_TEXT_STYLE = 'bold 14px sans-serif ' //if you use @font-face you can stick museo in here too :) (maybe)
  var BLOB_TEXT_COLOUR_ON_BACKGROUND = '#999'
  var BLOB_TEXT_COLOUR_ON_BLOB = 'white'
  var BLOB_TEXT_HEIGHT = 15 //used for maths in the positioning of the text.
  var last_step = 0;
  /* * * * * * * * * * *
   * Context Extension *
   * * * * * * * * * * */
  var blobbyContext = {
    blobs : [],
    current_step : 0,
    //prepend to array so new ones get drawn under old ones.
    //the first added is the spawn point. we want this to be the last drawn.
    add_blob : function(blob){
      this.blobs.unshift(blob);
    },
    get_blob: function(name){
      return $.select_one(this.blobs, function(){if (this.name == name){ return this} })
    },
    remove_twins: function(name){
      this.blobs = $.reject(this.blobs, function(){if (this.twin){return true}});
    },
    //draws a cricle
    circle : function(x, y, r, color, label, value){
      this.fillStyle = color || BLOB_DEFAULT_COLOR
      var n = r/16; // chosen by my eyes to be the closest I could get to a quadratic circle. (nudges in the control points)
      var o = 0.5;  // offset, so the edges of circle is on pixel boundaries.
      this.beginPath();
      this.moveTo(x-r+o, y+o);
      this.quadraticCurveTo( x-r+n, y-r+n,   x+o,  y-r+o);
      this.quadraticCurveTo( x+r-n, y-r+n, x+r+o,    y+o);
      this.quadraticCurveTo( x+r-n, y+r-n,   x+o,  y+r+o);
      this.quadraticCurveTo( x-r+n, y+r-n, x-r+o,    y+o);
      this.closePath();
      this.fill();
      if (label && value > 0){
        value += ' students';
        if (this.measureText(label).width + BLOB_PADDING > r*2 || 
            this.measureText(value).width + BLOB_PADDING > r*2 ){
          this.fillStyle = BLOB_TEXT_COLOUR_ON_BACKGROUND;
          this.fillText(label, x, y+r+BLOB_PADDING+BLOB_TEXT_HEIGHT/2);
          this.fillText(value, x, y+r+BLOB_PADDING+BLOB_TEXT_HEIGHT*1.5);
        } else {
          this.fillStyle = BLOB_TEXT_COLOUR_ON_BLOB;
          this.fillText(label, x, y-BLOB_TEXT_HEIGHT/2);
          this.fillText(value, x, y+BLOB_TEXT_HEIGHT/2)
        }
      }
    },
    clear: function(){
      this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clear_all: function(){
      this.clear();
      this.blobs = [];
    },
    //draws all the blobs in the blobs array according to their current dimensions
    draw: function(){
      this.clear();
      var context = this;
      $.each(this.blobs, function(i, blob){
        blob.draw(context)
      });
    },
    //animates blobs in blobs array
    //from blob.origin to blob.goal
    animate: function(){
      var time_passed = 0;
      //$.each steals 'this'
      var context = this;
      //sets all blobs current dimensions to their goal.
      //removes all the dimensions objects.
      var end = function(){
        clearInterval(interval);
        $.each(context.blobs, function(i,blob){
          if (blob.goal){
            blob.x     = blob.goal.x;
            blob.y     = blob.goal.y;
            blob.value = blob.goal.value;
          }
          blob.origin = blob.change = blob.goal = null;
        });
        context.remove_twins()
        context.draw();
        
      }
      // sets all blobs current dimensions to what whatever the easing functions determine.
      // draws a circle for each blob
      var run = function(){
        var animation_time = time_passed += BLOB_ANIMATION_QUALITY;
        if(animation_time >= BLOB_ANIMATION_DURATION){
          end()
        } else {
          context.clear();
          $.each(context.blobs, function(i, blob){
            if (blob.origin && blob.change){
              var time = animation_time-Number(blob.start_time);
              var duration = BLOB_ANIMATION_DURATION-Number(blob.start_time);
              blob.set({
                value: $.easing[BLOB_ANIMATION_EASING](null, time, blob.origin.value, blob.change.value, duration),
                x:     $.easing[BLOB_ANIMATION_EASING](null, time, blob.origin.x,     blob.change.x,     duration),
                y:     $.easing[BLOB_ANIMATION_EASING](null, time, blob.origin.y,     blob.change.y,     duration)
              });
              // merge twins
              if (blob.twin && !blob.twin.goal && blob.is_further_out_than(blob.touch_twin_at) ) {
                var total = blob.twin.value + blob.goal.value;
                var final_position = blob.greatest_position(blob.goal, blob.twin);
                blob.to(total, final_position);
                blob.twin.to(total, final_position, animation_time);
              }
            }
            blob.draw(context)
          });
        };
      };
      var interval = setInterval(run, BLOB_ANIMATION_QUALITY);
    },
    //setup styles so we don't need to declare them every time we draw, yo. 
    setup: function(){
      this.font = BLOB_TEXT_STYLE;
      this.textBaseline = "middle"
      this.textAlign = "center"
    },
    stop: function(){
      if (this.interval){
        clearInterval(this.interval);
      }
    }
  }
  /* * * * * * * * * *
   * Blob Definition * 
   * * * * * * * * * */
  // initializer
  var Blob = function (name, context, value, x, y, options){
    if (options){ $.extend(this, options) }
    this.name = name;
    var $legend;
    if ($legend = $('#'+name)){
      this.color = $legend.css('backgroundColor');
      this.label = $.trim($legend.closest('li').text());
      this.label = this.label || this.name;
    }
    this.twin = context.get_blob(name);
    this.add_to_context(context)
    this.set({value:value, x:x, y:y})
  }
  // prototype
  var BlobPrototype = {
    draw: function(context){
      if (this.change && (this.change.x > 0 || this.change.y > 0)){
        context.circle(this.x, this.y, this.radius(), this.color);
      } else {
        context.circle(this.x, this.y, this.radius(), this.color, this.label, (this.goal ? this.goal.value : this.value));
      }
    },
    add_to_context: function(context){
      this.context = context || this.context;
      this.context.add_blob(this);
    },
    set: function(dimensions){
      if (dimensions.value !== undefined){ this.value = dimensions.value; }
      if (dimensions.x     !== undefined){ this.x     = dimensions.x; }
      if (dimensions.y     !== undefined){ this.y     = dimensions.y; }
    },
    //set dimensions state objects used by the animation method.
    to: function(value, position, start_time){
      position = position || {x: this.x, y: this.y}
      this.origin = {value:this.value, x:this.x, y:this.y};
      this.goal   = {value:value, x:position.x, y:position.y};
      this.change = {value:value - this.value, x:position.x - this.x, y:position.y - this.y};
      this.start_time = start_time || 0;
    },
    //find the radius given a value
    radius: function(value){
      value = value || this.value
			value = value > 0 ? value : 0;
      // Math.pow to make it look nicer.
      return Math.sqrt(Math.pow(value, BLOB_AREA_EXPONENT)/Math.PI);
    },
    //given a data set, create necessary bundles and set them animating.
    spawn: function(data_set){
      var parent = this;
      var context = parent.context;
      parent.to(this.value - $.sum_values(data_set));
      $.each(data_set, function(i){
        var angle = 2*Math.PI*i/data_set.length;
        var blob  = new Blob(this.key, context, this.value/2);
        blob.set(parent.edge_at(angle, -blob.radius()));
        
        blob.to(
          this.value, 
          parent.edge_at(angle, BLOB_MARGIN + blob.radius(this.value) * BLOB_MARGIN_MULTIPLIER, 'goal')
        );
        if (blob.twin) {
          blob.touch_twin_at = blob.twin.edge_at(angle-Math.PI, blob.radius(this.value));
          blob.to(this.value, blob.greatest_position(blob.goal, blob.twin))
        }
      });
      context.animate();
    },
    //find the edge of a circle at a given angle, and given radius offset, and either given dimensions or internal values.
    edge_at: function(angle, offset, dimensions){
      dimensions = this[dimensions] || this;
      offset = Number(offset) || 0
      return {
        x: dimensions.x + (this.radius(dimensions.value) + offset) * Math.cos(angle),
        y: dimensions.y + (this.radius(dimensions.value) + offset) * Math.sin(angle)
      }
    }, 
    is_further_out_than: function(position){
      if (this.change && position){
        return (this.change.x >= 0 && this.x >= position.x ||
                this.change.x <= 0 && this.x <= position.x)&&
               (this.change.y >= 0 && this.y >= position.y ||
                this.change.y <= 0 && this.y <= position.y)
      }
    },
    greatest_position: function(position_a, position_b){
      if (this.change){
        if ((this.change.x >= 0 && position_a.x >= position_b.x ||
             this.change.x <= 0 && position_a.x <= position_b.x)&&
            (this.change.y >= 0 && position_a.y >= position_b.y ||
             this.change.y <= 0 && position_a.y <= position_b.y)) {
          return {x: position_a.x, y: position_a.y} 
        } else {
          return {x: position_b.x, y: position_b.y} 
        }
      }
    }
  }
  $.extend(Blob.prototype, BlobPrototype);
	$.fn.load_blobs = function(data_params){
    if (!context) {
      var context = $(this)[0].getContext('2d');
    }
    if (context){
      if (!context.add_blobs){
        $.extend(context, blobbyContext);
        context.setup();
      }
      get_data(context, data_params);
    }
    return $(this);
  }
  
  var get_data = function(context, data_params, catch_year){
    $.getJSON('/data/', data_params, function(data){
      if(data.error){
        if (!catch_year){throw data.error;}
      } else {
        context.stop();
        if(context.center_blob){
          var blob = context.center_blob;
          blob.to($.sum_values(data.total));
        } else {
          var blob = new Blob('Started in 2004', context, $.sum_values(data.total), context.canvas.width/2, context.canvas.height/2, {is_origin:true});
          context.center_blob = blob;
        }
        context.draw();
        context.current_step = 0;
        if (last_step != 0 && data_params.year != last_step + 1){
          updateBlobDifference(context, data_params.year, last_step, data);
        }
        last_step = data_params.year;
        context.interval = setInterval(function(){
          $.advance_slider(data_params.year);
          blob.spawn(data.left[context.current_step]);
          context.current_step++;
          if (context.current_step == data.left.length){
            //load the next year.
            clearInterval(context.interval);
            data_params.year++;
            get_data(context, data_params, true)
          }
        }, BLOB_STEP_INTERVAL)
      }
    });
  },
  updateBlobDifference = function(context, from, to, data) {
          var data_set = data.left[context.current_step];
          $.each(context.blobs, function(blob){
            var that = this;
            var value_segment = $.select_one(data_set, function(){if (this.key == that.name ){ return this} });
            if (value_segment) {
              this.value = value_segment["value"];
            }
          });
  }
  
	$.advance_slider = function(year){
	  if ($('#y'+year)){
	    $('#slider_arrow').css({left:($('#y'+year).position().left+$('#y'+year).width()/2)+"px"});
	  }
	}
	
  $(document).ready(function(){
    $('#world').load_blobs({category:'ethnicity', year:2004});
    $('#years li').click(function(){
	    $('#world').load_blobs({category:'ethnicity', year:Number($(this).attr('id').substr(1))})
	    $('#slider_arrow').css({left:($(this).position().left+$(this).width()/2)+"px"});
	  });
    $("a.show_eth").click(function() { 
		  $(this).addClass("active");
		  $("a.show_sex").removeClass("active");
      $("#legend_ethnicity").show("slow");
		  $("#legend_sex").hide("slow");
    });
	  $("a.show_sex").click(function() {
		  $(this).addClass("active");
		  $("a.show_eth").removeClass("active");
		  $("#legend_sex").show("slow");
		  $("#legend_ethnicity").hide("slow");
    });
  });
})(jQuery);


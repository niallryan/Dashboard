angular.module('ACSSApp.animations', [])

	// http://www.yearofmoo.com/2013/08/remastered-animation-in-angularjs-1-2.html#animating-nginclude-ngview-and-ngif

	.animation('.view-slide-animation', function() {
		return {
		    enter : function(element, done) {
		      $(element).css({
		        position:'absolute',
		        'z-index':100,
		        top:600,
		        opacity:0
		      });
		      $(element).animate({
		        top:100,
		        opacity:1
		      }, done);
		    },

		    leave : function(element, done) {
		      $(element).css({
		        position:'absolute',
		        'z-index':101,
		        top:0,
		        opacity:1
		      });
		      $(element).animate({
		        top:-600,
		        opacity:0
		      }, done);
		    }
		};
	})

	.animation('.repeat-animation', function() {
		return {
			enter : function(element, done) {
			  $(element).css({
			    position:'relative',
			    left:-10,
			    opacity:0
			  });
			  $(element).animate({
			    left:0,
			    opacity:1
			  }, done);
			},

			leave : function(element, done) {
			  $(element).css({
			    position:'relative',
			    left:0,
			    opacity:1
			  });
			  $(element).animate({
			    left:-10,
			    opacity:0
			  }, done);
			},

			move : function(element, done) {
			  $(element).css({
			    opacity:0.5
			  });
			  $(element).animate({
			    opacity:1
			  }, done);
			}
		};
});;
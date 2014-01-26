'use strict';

angular.module('ACSSApp.controllers', [])

  	.controller('MainCtrl', function ($scope, $translate) {
      $scope.menuItems = {
        index: {
          name: "Home",
          link: "/index"
        },
        news: {
          name: "News",
          link: "/news"
        },
        weather: {
          name: "Weather",
          link: "/weather"
        },
        todo: {
          name: "ToDo",
          link: "/todo"
        },
        movies: {
          name: "Movies",
          link: "/movies"
        },
        music: {
          name: "Music",
          link: "/music"
        },
        cats: {
          name: "Photo",
          link: "/cats"
        }
      }
    	
  	})
    .controller('IndexCtrl', function($scope, $translate) {
      // http://pascalprecht.github.io/angular-translate/
      $scope.changeLanguage = function(key) {
        $translate.uses(key);
      }
    })
  	.controller('WeatherCtrl', function ($scope, weatherService) {

  		if ("geolocation" in navigator) {
  			navigator.geolocation.getCurrentPosition(function(position) {
  				$scope.lat = position.coords.latitude;
  				$scope.long = position.coords.longitude;
  				weatherService($scope.lat, $scope.long)
  					.then(function(data) {
  						$scope.weather = data.data.currently;
  						// http://darkskyapp.github.io/skycons/
						var skycons = new Skycons({"color": "black"});
						skycons.add("icon1", $scope.weather.icon);
					  	skycons.play();
  					});
			}, function() {
				alert("You need to give me permission to use your position to get Weather Info.");
			});
		} else {
			// Default Lat & Long for Dublin
  			$scope.lat = 53.3478;
  			$scope.long = 6.2597;
  			weatherService($scope.lat, $scope.long)
  				.then(function(data) {
  					$scope.weather = data.data.currently;
  					// http://darkskyapp.github.io/skycons/
					var skycons = new Skycons({"color": "black"});
					skycons.add("icon1", $scope.weather.icon);
				  	skycons.play();
  				});

  		}

  	})
  	.controller('NewsCtrl', function ($scope, newsService) {

  		newsService
    		.then(function(data) {
    			$scope.news = data.data.response.editorsPicks;
    		});
  	
  	})
  	.controller('MoviesCtrl', function ($scope, moviesService) {

      // http://teamtreehouse.com/library/treehouse-workshops/building-with-angularjs-and-apis

      $scope.limit = 10;
      $scope.page = 1;

      $scope.getMovieList = function() {
        moviesService.getList($scope.limit, $scope.page)
          .then(function(data) {
            $scope.movies = data.data.movies;
          });        
      }

		  $scope.getMovieList();

      $scope.nextPage = function() {
        $scope.page += 1;
        $scope.getMovieList();
      }

      $scope.prevPage = function() {
        $scope.page -= 1;
        $scope.getMovieList();
      }

      $scope.startOver = function() {
        $scope.page = 1;
        $scope.getMovieList();
      }

  	})
  	.controller('MovieCtrl', function ($scope, $routeParams, moviesService) {
  		$scope.movieid = $routeParams.movieid;

		    moviesService.getInfo($scope.movieid) 
          .then(function(data) {
          	$scope.movieInfo = data.data;
          });
  	
  	})
  	.controller('TodoCtrl', function ($scope, todoService, $route) {
		  todoService.getTasks()
		    .then(function(data) {
          console.log(data);
			    $scope.data = data;
		  });

  	  $scope.addTask = function() {
        $scope.list = "52aa518c57da60692700099f";
    	  todoService.addTask($scope.list, $scope.taskname)
    	    .success(function(data) {
            todoService.getTasks()
              .then(function(data) {
                $scope.data = data;
              });
    	    })
    	    .error(function(data) {
      		  alert("Error");
            console.log(data);
    	    });
      }

      

  	})
    .controller('MusicCtrl', function ($scope, $sce, $route) {
        
        $scope.searchSC = function() {
          SC.get('/tracks', { q: $scope.query, limit: 10 }, function(tracks) {
            $scope.tracks = tracks;
            $scope.$apply();
          });

          $scope.playTrack = function(track) {
            track_url = track.permalink_url;
            SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
              $scope.oEmbed = oEmbed;
              $scope.oEmbed.htmlSafe = $sce.trustAsHtml(oEmbed.html);
              $scope.$apply();
            });
          }
        }

        var track_url;
        SC.oEmbed(track_url, { auto_play: false }, function(oEmbed) {
            $scope.oEmbed = oEmbed;
            // http://stackoverflow.com/questions/19415394/with-ng-bind-html-unsafe-removed-how-do-i-inject-html
            $scope.oEmbed.htmlSafe = $sce.trustAsHtml(oEmbed.html);
            $scope.$apply();
        });

    })
    .controller('PhotoCtrl', function($scope) {
      // Set of Photos
      $scope.photos = [
        {src: 'http://www.wall321.com/thumbnails/detail/20120318/cats%20kittens%201920x1200%20wallpaper_www.wallpaperto.com_11.jpg', desc: 'Image 01'},
        {src: 'http://www.wallpaperhi.com/thumbnails/detail/20120307/cats%20animals%20friends%20feline%20kittens%20pets%201680x1050%20wallpaper_www.wallpaperhi.com_46.jpg', desc: 'Image 02'},
        {src: 'http://www.wall321.com/thumbnails/detail/20120510/cats%20animals%20kittens%201920x1200%20wallpaper_www.wall321.com_9.jpg', desc: 'Image 03'},
        {src: 'http://www.wallpaperhi.com/thumbnails/detail/20130512/cats%20blue%20eyes%20grass%20outdoors%20kittens_www.wallpaperhi.com_11.jpg', desc: 'Image 04'},
        {src: 'http://www.wall321.com/thumbnails/detail/20120602/cats%20animals%20jumping%20outdoors%20kittens%201680x1050%20wallpaper_www.wall321.com_26.jpg', desc: 'Image 05'},
        {src: 'http://www.wallpaperhi.com/thumbnails/detail/20120306/closeup%20cats%20animals%20tigers%20outdoors%20tiger%20cub%202560x1600%20wallpaper_www.wallpaperhi.com_2.jpg', desc: 'Image 06'}
      ];

      // initial image index
      $scope._Index = 0;
   
      // if a current image is the same as requested image
      $scope.isActive = function (index) {
          return $scope._Index === index;
      };
   
      // show a certain image
      $scope.showPhoto = function (index) {
          $scope._Index = index;
      };
    });
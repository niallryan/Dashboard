'use strict';

/* Directives */


angular.module('ACSSApp.directives', [])

  .directive('menuButton', function() {
    return function(scope, element, attr) {
      element.css({
        backgroundColor: "white", 
        borderRadius: "5px",
        color: "blue",
        textDecoration: "none",
        padding: ".5%",
        border: "1px lightblue solid"
      });
      element.on("mouseover", function() {
        element.css({backgroundColor: "lightblue"});
      });
      element.on("mouseout", function() {
        element.css({backgroundColor: "white"});
      });
    }
  })

  .directive('todoItem', function() {
    // return function (scope, element, attrs) {
    //   $().on("click", function() {
    //       alert($(this));
    //       element.css({border: "2px solid red"});
    //     }
    //   );
    // }

    // http://stackoverflow.com/questions/17928487/angular-js-how-to-change-an-elements-css-class-on-click-and-to-remove-all-others
    return function (scope, element, attrs) {
      scope.localFunction = function () {
        scope.model.value = scope.$id;
      };
        scope.$watch('model.value', function () {
          // Is this set to my scope?
          if (scope.model.value === scope.$id) {
            scope.selected = "active";
          // } else {
          // // nope
          //   scope.selected = '';
          }
      });
    }

  })
  // http://docs.angularjs.org/guide/directive
  .directive('draggable', function($document) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;
 
      element.css({
       position: 'relative',
       // border: '1px solid red',
       // backgroundColor: 'lightgrey',
       cursor: 'pointer'
      });
 
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });
 
      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }
 
      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }
    }
  })
  .directive('news', function() {
    return {
            replace: true,
            link: function(scope, element, attrs) {

            },
            template: '<div>' + 
                        '<h1>News</h1>' +
                        '<ul>' +
                          '<li ng-repeat="story in news" class="repeat-animation"><a href="{{story.webUrl}}" target="_blank">{{story.webTitle}}</a></li>' +
                        '</ul>' +
                      '</div>'
        };

  })
  .directive('weather', function() {
    return {
            restrict: 'E',
            replace: true,
            link: function(scope, element, attrs) {

            },
            template: '<div>' + 
                        '<h1>Weather</h1>' +
                        '<h2>Now</h2>' +
                        '<div>Summary: {{weather.summary}}</div>' +
                        '<div>Apparent Temp: {{weather.apparentTemperature}}</div>' +
                        '<div>Cloud Cover: {{weather.cloudCover}}</div>' +
                        '<div>Humidity: {{weather.humidity}}</div>' +
                        '<canvas id="icon1" width="128" height="128"></canvas>' +
                        '<div>Visibility: {{weather.visibility}}</div>' +
                        '<div>Wind Speed: {{weather.windSpeed}}</div>' +
                      '</div>'
        };

  })

  .directive('movieList', function() {
    return {
            replace: true,
            link: function(scope, element, attrs) {

            },
            template: '<div>' + 
                        '<h1>{{movieInfo.title}}</h1>' +
                        '<img ng-src="{{movieInfo.posters.profile}}" />' +
                        '<p>{{movieInfo.year}}</p>' +
                        '<p>{{movieInfo.runtime}} mins</p>' +
                        '<p>{{movieInfo.synopsis}}</p>' +
                        '<p>{{movieInfo.critics_consensus}}</p>' +
                      '</div>'
        };

  })
  .directive('musicPlayer', function() {
    return {
            restrict: 'E',
            replace: true,
            link: function(scope, element, attrs) {

            },
            template: '<div>' +
                        '<h1>Music</h1>' +
                        '<p ng-bind-html="oEmbed.htmlSafe"></p>' +
                        '<p>Searching for: {{query}}</p>' +
                        '<input ng-model="query" />' +
                        '<button type="submit" ng-click="searchSC()">Search</button>' +
                        '<ul>' +
                          '<li ng-repeat="track in tracks" class="repeat-animation"><a ng-click="playTrack(this.track)">{{track.title}}</a></li>' +
                        '</ul>' +
                      '</div>'

        }

  });

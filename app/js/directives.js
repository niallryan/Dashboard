'use strict';

/* Directives */


angular.module('ACSSApp.directives', [])

 	// http://jsfiddle.net/niden/H7jnB/
  .directive('menubar', function() {
        return {
            restrict: 'E',
            replace: true,
            link: function(scope, element, attrs) {
              for (var i = element[0].children; i < element[0].children.length; i++) {
                console.log(i);
              }

            },
            template: '<menu>' + 
                         '<span ng-repeat="item in menuItems">' + 
                             '<a href="{{item.link}}">{{item.name}} | </a>' + 
                         '</span>' + 
                      '</menu>'
        }
    })
  .directive('todo', function() {
    return {
            replace: true,
            link: function(scope, element, attrs) {

            },
            template: '<div>' + 
                        '<h1>To Do</h1>' + 
                        '<input ng-model="taskname" /> <button ng-click="addTask()">Add Task</button>' +
                        '<h2>Tasks</h2>' + 
                        '<p ng-repeat="card in data.data.cards" draggable>' +
                          '<span>{{card.name}}</span><button ng-click="completeTask()">Complete</button>' +
                        '</p>' +
                      '</div>'
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
                          '<li ng-repeat="story in news"><a href="{{story.webUrl}}" target="_blank">{{story.webTitle}}</a></li>' +
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
                        '<p>{{movieInfo.runtime}}</p>' +
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
                          '<li ng-repeat="track in tracks"><a ng-click="playTrack(this.track)">{{track.title}}</a></li>' +
                        '</ul>' +
                      '</div>'

        }

  });

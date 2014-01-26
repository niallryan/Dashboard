'use strict';

angular.module('ACSSApp', ['ngRoute', 'ACSSApp.services', 'ACSSApp.controllers', 'ACSSApp.directives', 'ACSSApp.filters', 'pascalprecht.translate', 'ACSSApp.keys', 'ngAnimate', 'ACSSApp.animations'])
  .config(function ($routeProvider, $locationProvider, $httpProvider, $translateProvider) {


    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.post['Content-Type'];

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'app/views/index.html',
        controller: 'IndexCtrl'
      })
      .when('/weather', {
        templateUrl: 'app/views/weather.html',
        controller: 'WeatherCtrl'
      })
      .when('/news', {
        templateUrl: 'app/views/news.html',
        controller: 'NewsCtrl'
      })
      .when('/calendar', {
        templateUrl: 'app/views/calendar.html',
        controller: 'CalendarCtrl'
      })
      .when('/cats', {
        templateUrl: 'app/views/cats.html',
        controller: 'CatsCtrl'
      })
      .when('/movies', {
        templateUrl: 'app/views/movies/movies.html',
        controller: 'MoviesCtrl'
      })
      .when('/movies/:movieid', {
        templateUrl: '/app/views/movies/movie.html',
        controller: 'MovieCtrl'
      })
      .when('/todo', {
        templateUrl: 'app/views/todo.html',
        controller: 'TodoCtrl'
      })
      .when('/music', {
        templateUrl: 'app/views/music.html',
        controller: 'MusicCtrl'
      })
      .when('/cats', {
        templateUrl: 'app/views/cats.html',
        controller: 'PhotoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      // i18n
      // http://pascalprecht.github.io/angular-translate/
      $translateProvider.translations('en', {
        TITLE: "Niall's Dashboard",
        FOO: 'Click one of the links above to get started.',
        BUTTON_LANG_EN: 'English',
        BUTTON_LANG_DE: 'Other'
      });
      $translateProvider.translations('de', {
        TITLE: "Niall's Thing",
        FOO: 'Dies ist ein Paragraph.',
        BUTTON_LANG_EN: 'Englisch',
        BUTTON_LANG_DE: 'Udder'
      });

      $translateProvider.preferredLanguage('en');

  });
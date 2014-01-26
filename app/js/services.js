'use strict';

angular.module('ACSSApp.services', [])

  	.factory('newsService', function($http, keystore) {
	  	var url = "http://content.guardianapis.com/?show-editors-picks=true&edition=UK&page=1&date-id=date%2Ftoday&api-key=" + keystore.guardian + "&callback=JSON_CALLBACK";
  		return $http.jsonp(url);
  	})
  	.factory('weatherService', function($http, keystore) {
  		return function (lat, long) {
  			return $http.jsonp("https://api.forecast.io/forecast/" + keystore.forecast + "/" + lat + "," + long + "?units=si&callback=JSON_CALLBACK");
  		}
  	})
  	.factory('moviesService', function($http, keystore) {
  		return {
  			getList: function(limit, page) {
  				return $http.jsonp("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=" + limit + "&page=" + page + "&country=ie&apikey=" + keystore.rotten + "&callback=JSON_CALLBACK")
  			},
  			getInfo: function(id) {
  				return $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies/' + id + '.json?apikey=' + keystore.rotten + '&callback=JSON_CALLBACK')
  			}
  		}
  	})
    .factory('todoService', function($http, keystore) {
      return {
        getTasks: function() {
          return $http.jsonp("https://api.trello.com/1/lists/52aa518c57da60692700099f?fields=name&cards=open&card_fields=name&key=" + keystore.trello.key + "&callback=JSON_CALLBACK");
        },
        addTask: function(list, name) {
          return $http.post("https://api.trello.com/1/lists/" + list + "/cards?key=" + keystore.trello.key + "&token=" + keystore.trello.token + "&name=" + name + "&due=null");
          },
        completeTask: function() {
          //angular.element(this).css({display: "none"});
        }
      }
    })
    .factory('SCService', function($http) {
      return function() {
        // return 
      }
    });
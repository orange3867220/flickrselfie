'use strict';

/**
 * @ngdoc overview
 * @name flickrApp
 * @description
 * # flickrApp
 *
 * Module of the flickr query handler.
 */
 angular
  .module('flickrApp').service('flickrSearchService',[
  	'$http', 'FLICKRKEY',
  	function($http, FLICKRKEY){

  		//
  		// Parse search URL from parameters put in
  		//
  		this.parseSearchUrl = function(params){
  			var url = 'https://api.flickr.com/services/rest/?';

  			url += '&method=flickr.photos.search';
  			url += '&api_key='+FLICKRKEY;
  			url += '&format=json';
        url += '&nojsoncallback=1';

			// Loop through put parameters in
			for (var key in params) {
				if (params.hasOwnProperty(key)) {
					var tar = params[key];
					url += '&' + key + '=' + ( angular.isArray(tar) ? tar.join(',') : tar );
				}
			}

  			return url;
  		};

  		//
  		// Request to send request to Flickr to query and get result
  		//
  		this.search = function(params){
  			var url = this.parseSearchUrl(params);

  			return $http.get(url)
  			 .success(function(data, status, headers, config){
  				  console.log(data);
    			}).error(function(data, status, headers, config){
    				console.log(data);
    			});
  		};
  	}]);

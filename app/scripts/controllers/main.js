'use strict';

/**
 * @ngdoc function
 * @name flickrselfieApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickrselfieApp
 */
angular.module('flickrselfieApp')
  .controller('MainCtrl', ['$scope', 'flickrSearchService', 
  	function ($scope, flickrSearchService) {


    	flickrSearchService.search({tags: ['selfie', 'pretty'], page: 2})
    		.success(function(data){
    			console.log(data);
    		});
  }]);

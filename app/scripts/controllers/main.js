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

  		//
  		// Set up scope variables
  		//
  		$scope.tags = '';
  		$scope.page = 1;
  		$scope.photos = [];
  		$scope.loading = false;

  		//
  		// Private function to start & end loading
  		//
  		var startLoading = function(){
  			$scope.loading = true;
  		};
  		var endLoading = function(){
  			$scope.loading = false;
  		}; 

  		//
  		// Private function to manipute photos in scope
  		//
  		var pushPhotos = function(photos){
  			for(var i in photos){
  				$scope.photos.push(photos[i]);
  			}
  		};

  		//
  		//
  		//
  		$scope.clearPhotos = function(){
  			$scope.photos = [];
  		};

  		$scope.searchByTags = function(){
  			startLoading();

  			flickrSearchService.search({tags: $scope.tags, page: $scope.page})
  				.success(function(response){
  					//console.log(response);
  					
  					pushPhotos(response.photos.photo);
  					$scope.page = $scope.page+1;

  					endLoading();
  				});	
  		};

  		//
  		// Infinite scroll, when reach end of page, load more page
  		//
		window.onscroll = function(ev) {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				$scope.loading = true;
				$scope.searchByTags();
			}
		};
  }]);

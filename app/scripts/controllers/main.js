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
  		// Function to clear previous search details
  		//
  		$scope.clearPrevious = function(){
  			$scope.photos = [];
  			$scope.page = 1;
  		};

  		//
  		// Function to do search
  		//
  		$scope.searchByTags = function(){
  			startLoading();

  			flickrSearchService.search({tags: $scope.tags, page: $scope.page})
  				.success(function(response){
  					//console.log(response);

  					$scope.page = $scope.page+1;
  					pushPhotos(response.photos.photo);

  					endLoading();
  				});	
  		};

  		//
  		// Infinite scroll, when reach end of page, load more page
  		//
		window.onscroll = function(e){
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
				$scope.loading = true;
				$scope.searchByTags();
			}
		};

		//
		// Bind enter click event for quick trigger search
		//
		angular.element('#search-input').keyup(function(e){
			if (e.keyCode === 13) {
        		$scope.clearPrevious();
        		$scope.searchByTags();
			}
		});

		//
		// Bind enter click for select all, improve UX
		//
		angular.element('#search-input').click(function(e){
			this.setSelectionRange(0, this.value.length);
		});


  }]);

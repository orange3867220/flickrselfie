'use strict';

/**
 * @ngdoc function
 * @name flickrselfieApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickrselfieApp
 */
angular.module('flickrselfieApp')
  .controller('MainCtrl', ['$scope', '$timeout', 'flickrSearchService', 
  	function ($scope, $timeout, flickrSearchService) {

  		//
  		// Set up scope variables
  		//
  		$scope.loading = false;
  		$scope.smallWindow = false;

  		$scope.tags = '';
  		$scope.page = 1;
  		$scope.photos = [];


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
		angular.element(window).scroll(function() {
			if(angular.element(window).scrollTop() + angular.element(window).height() === angular.element(document).height()) {
				$scope.loading = true;
				$scope.searchByTags();
			}
		});

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

		//
		// Private function to detect window size
		//
		var isSmallDevice = function(){
			if(Math.max(angular.element(window).width(), angular.element(document).width()) >= 768)
				return false;
			else
				return true;
		};
		$scope.smallWindow = isSmallDevice();

		//
		// Functions to detect window resize 
		// 				set proper image setting for display
		//				clear timeout trash when destory
		//
		var resizeTimemout;
		var clearTimeout = function(){
			if (angular.isDefined(resizeTimemout)) {
				$timeout.cancel(resizeTimemout);
				resizeTimemout = undefined;
			}
		};
		angular.element(window).resize(function() {
			if(resizeTimemout) clearTimeout(resizeTimemout);
				
			resizeTimemout = $timeout(function() {
				console.log('set window size');
				$scope.smallWindow = isSmallDevice();
				console.log($scope.smallWindow);
			}, 500);
		});
		// Remove timeout if set
		$scope.$on('$destory', function(){
			clearTimeout(resizeTimemout);
		});
  }]);

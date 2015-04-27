'use strict';


angular.module('flickrApp').directive('flickrPhotos', function() {
	return {
		restrict: 'E',

		scope: {
			tags: '='
		},

		controller: 'flickrPhotosCon',
    	templateUrl: '/scripts/flickr_module/flickr.template.html'
	};
});

angular.module('flickrApp').controller('flickrPhotosCon', 
	['$scope', 'flickrSearchService',
	function($scope, flickrSearchService){
		console.log($scope.tags);

		$scope.loading = false;
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

	  	if(angular.isDefined($scope.tags) && angular.isString($scope.tags) && $scope.tags.length > 0){
	  		$scope.searchByTags();
	  	}

	  	//
	  	// Infinite scroll, when reach end of page, load more page
	  	//
		angular.element(window).scroll(function() {
			if(angular.element(window).scrollTop() + angular.element(window).height() === angular.element(document).height()) {
				
				$scope.loading = true;
				$scope.searchByTags();
			}
		});
	  	
}]);
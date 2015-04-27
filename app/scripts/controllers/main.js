'use strict';

/**
 * @ngdoc function
 * @name flickrselfieApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickrselfieApp
 */
angular.module('flickrselfieApp')
  .controller('MainCtrl', ['$scope', '$routeParams', '$timeout', '$location', 
  	function ($scope, $routeParams, $timeout, $location) {

  	//
  	// Set up scope variables
  	//
    $scope.predicts = predictTags;

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


  	// Get tags from parameters and start searching by tags
  	if(angular.isDefined($routeParams.tags)){
  		$scope.tags = $routeParams.tags;
  		//$scope.searchByTags();
  	}else{
  		$scope.tags = '';
  	}

  	//
  	// Function to manipulate url
    // By passing to url to add to history stack for browser back & forward
  	//
  	$scope.realSearch = function(){
  		$location.path('/'+$scope.tags.replace(/ /g, ''));
  	};

		//
		// Bind enter click event for quick trigger search
		//
		angular.element('#search-input').keyup(function(e){
			// Replace by triggerig button click due to slow reaction
			if (e.keyCode === 13 && !$scope.loading) {
        angular.element('#search-button').trigger('click');
			}
		});

    //
    // Bind enter click for select all, improve UX
    //
    angular.element('#search-input').click(function(e){
      this.setSelectionRange(0, this.value.length);
    });

    //
    // Last word match for detection
    //
    $scope.matchLastWord = function (actual, expected) {
      var n = expected.lastIndexOf(',');
      var word = (n === -1) ? (expected + '') : expected.substring(n+1).replace(/ /g, '');

      if(word.length === 0)
        return false;

      return actual.toLowerCase().indexOf(word.toLowerCase()) === 0;
    };
    //
    // Auto fill selected word into search bar
    //
    $scope.autoFill = function(predict){
      //console.log(predict);
      var n = $scope.tags.lastIndexOf(',');
      $scope.tags = (n === -1) ? (predict+', ') : ($scope.tags.substring(0, n+1) + ' ' + predict + ', ');

      angular.element('#search-input').focus();
    };

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
				//console.log('set window size');
				$scope.smallWindow = isSmallDevice();
			}, 500);
		});
		// Remove timeout if set
		$scope.$on('$destory', function(){
			clearTimeout(resizeTimemout);
		});
  }]);

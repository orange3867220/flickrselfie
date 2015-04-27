var predictTags = [
    'selfie',
    'love',
    'tbt',
    'me',
    'cute',
    'photooftheday',
    'instamood',
    'beautiful',
    'picoftheday',
    'igers',
    'girl',
    'instadaily',
    'iphonesia',
    'follow',
    'tweegram',
    'happy',
    'summer',
    'instagramhub',
    'bestoftheday',
    'iphoneonly',
    'igdaily',
    'fashion',
    'webstagram',
    'picstitch',
    'nofilter',
    'sky',
    'jj',
    'followme',
    'fun',
    'smile',
    'like',
    'pretty',
    'sun',
    'food',
    'instagramers',
    'friends',
    'lol',
    'hair',
    'bored',
    'swag',
    'cool',
    'funny',
    'onedirection',
    'life',
    'nature',
    'family',
    'christmas',
    'my',
    'blue',
    'pink',
    'dog',
    'beach',
    'art',
    'hot',
    'tagsforlikes',
    'photo',
    'amazing',
    'repost',
    'girls',
    'instahub',
    'sunset',
    'party',
    'awesome',
    'red',
    'baby',
    'statigram',
    'black',
    'versagram',
    'cat',
    'music',
    'instalove',
    'likeforlike',
    'night',
    'followback',
    'throwbackthursday',
    'clouds',
    'white',
    'bestfriend',
    'yummy',
    'yum',
    'like4like',
    'textgram',
    'eyes',
    'green',
    '2015',
    'sweet',
    'all_shots',
    'school',
    'igaddict',
    'style',
    'i',
    'beauty',
    'harrystyles',
    'instacollage',
    'jj_forum',
    'foodporn',
    'nice',
    'boy',
    'instago',
    'best',
    'test'
  ];
'use strict';
/**
 * @ngdoc overview
 * @name flickrselfieApp
 * @description
 * # flickrselfieApp
 *
 * Main module of the application.
 */
angular.module('flickrApp', []);
// Module static parameter 
angular.module('flickrApp').value('FLICKRKEY', '19ecebef2255e448b878978920cca6be');
'use strict';
/**
 * @ngdoc overview
 * @name flickrApp
 * @description
 * # flickrApp
 *
 * Module of the flickr query handler.
 */
angular.module('flickrApp').service('flickrSearchService', [
  '$http',
  'FLICKRKEY',
  function ($http, FLICKRKEY) {
    //
    // Parse search URL from parameters put in
    //
    this.parseSearchUrl = function (params) {
      var url = 'https://api.flickr.com/services/rest/?';
      url += '&method=flickr.photos.search';
      url += '&api_key=' + FLICKRKEY;
      url += '&format=json';
      url += '&nojsoncallback=1';
      // Loop through put parameters in
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var tar = params[key];
          url += '&' + key + '=' + (angular.isArray(tar) ? tar.join(',').replace(/ /g, ',') : angular.isString(tar) ? tar.replace(/ /g, '') : tar);
        }
      }
      //console.log(url);
      return url;
    };
    //
    // Request to send request to Flickr to query and get result
    //
    this.search = function (params) {
      var url = this.parseSearchUrl(params);
      return $http.get(url).success(function (data, status, headers, config) {
        console.log(data);
      }).error(function (data, status, headers, config) {
        console.log(data);
      });
    };
  }
]);
'use strict';
angular.module('flickrApp').directive('flickrPhotos', function () {
  return {
    restrict: 'E',
    scope: {
      tags: '=',
      smalldevice: '='
    },
    controller: 'flickrPhotosCon',
    templateUrl: 'views/flickr.template.html'
  };
});
angular.module('flickrApp').controller('flickrPhotosCon', [
  '$scope',
  'flickrSearchService',
  function ($scope, flickrSearchService) {
    //console.log($scope.tags);
    $scope.loading = false;
    $scope.page = 1;
    $scope.photos = [];
    $scope.status = 'ok';
    //
    // Private function to start & end loading
    //
    var startLoading = function () {
      $scope.loading = true;
    };
    var endLoading = function () {
      $scope.loading = false;
    };
    //
    // Private function to manipute photos in scope
    //
    var pushPhotos = function (photos) {
      for (var i in photos) {
        $scope.photos.push(photos[i]);
      }
    };
    //
    // Function to clear previous search details
    //
    $scope.clearPrevious = function () {
      $scope.photos = [];
      $scope.page = 1;
    };
    //
    // Function to do search
    //
    $scope.searchByTags = function () {
      startLoading();
      flickrSearchService.search({
        tags: $scope.tags,
        page: $scope.page
      }).success(function (response) {
        //console.log(response);
        $scope.status = response.stat;
        $scope.page = response.photos.page + 1;
        pushPhotos(response.photos.photo);
        endLoading();
      }).error(function (response) {
        $scope.status = response.stat;
      });
    };
    if (angular.isDefined($scope.tags) && angular.isString($scope.tags) && $scope.tags.length > 0) {
      $scope.searchByTags();
    }
    //
    // Infinite scroll, when reach end of page, load more page
    //
    angular.element(window).scroll(function () {
      if (angular.element(window).scrollTop() + angular.element(window).height() === angular.element(document).height()) {
        $scope.loading = true;
        $scope.searchByTags();
      }
    });  /* auto binding works fine, no need to watch
		$scope.$watch(function(scope){
			console.log(scope.smalldevice);
			return scope.smalldevice;
		}, function(newValue, oldValue){
			console.log(newValue);
		});*/
  }
]);
'use strict';
/**
 * @ngdoc overview
 * @name flickrselfieApp
 * @description
 * # flickrselfieApp
 *
 * Main module of the application.
 */
angular.module('flickrselfieApp', [
  'ngAnimate',
  'ngRoute',
  'flickrApp'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/:tags', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name flickrselfieApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickrselfieApp
 */
angular.module('flickrselfieApp').controller('MainCtrl', [
  '$scope',
  '$routeParams',
  '$timeout',
  '$location',
  function ($scope, $routeParams, $timeout, $location) {
    //
    // Set up scope variables
    //
    $scope.predicts = predictTags;
    //
    // Private function to detect window size
    //
    var isSmallDevice = function () {
      if (Math.max(angular.element(window).width(), angular.element(document).width()) >= 768)
        return false;
      else
        return true;
    };
    $scope.smallWindow = isSmallDevice();
    // Get tags from parameters and start searching by tags
    if (angular.isDefined($routeParams.tags)) {
      $scope.tags = $routeParams.tags;  //$scope.searchByTags();
    } else {
      $scope.tags = '';
    }
    //
    // Function to manipulate url
    // By passing to url to add to history stack for browser back & forward
    //
    $scope.realSearch = function () {
      $location.path('/' + $scope.tags.replace(/ /g, ''));
    };
    //
    // Bind enter click event for quick trigger search
    //
    angular.element('#search-input').keyup(function (e) {
      // Replace by triggerig button click due to slow reaction
      if (e.keyCode === 13 && !$scope.loading) {
        angular.element('#search-button').trigger('click');
      }
    });
    //
    // Bind enter click for select all, improve UX
    //
    angular.element('#search-input').click(function (e) {
      this.setSelectionRange(0, this.value.length);
    });
    //
    // Last word match for detection
    //
    $scope.matchLastWord = function (actual, expected) {
      var n = expected.lastIndexOf(',');
      var word = n === -1 ? expected + '' : expected.substring(n + 1).replace(/ /g, '');
      if (word.length === 0)
        return false;
      return actual.toLowerCase().indexOf(word.toLowerCase()) === 0;
    };
    //
    // Auto fill selected word into search bar
    //
    $scope.autoFill = function (predict) {
      //console.log(predict);
      var n = $scope.tags.lastIndexOf(',');
      $scope.tags = n === -1 ? predict + ', ' : $scope.tags.substring(0, n + 1) + ' ' + predict + ', ';
      angular.element('#search-input').focus();
    };
    //
    // Functions to detect window resize 
    // 				set proper image setting for display
    //				clear timeout trash when destory
    //
    var resizeTimemout;
    var clearTimeout = function () {
      if (angular.isDefined(resizeTimemout)) {
        $timeout.cancel(resizeTimemout);
        resizeTimemout = undefined;
      }
    };
    angular.element(window).resize(function () {
      if (resizeTimemout)
        clearTimeout(resizeTimemout);
      resizeTimemout = $timeout(function () {
        //console.log('set window size');
        $scope.smallWindow = isSmallDevice();
      }, 500);
    });
    // Remove timeout if set
    $scope.$on('$destory', function () {
      clearTimeout(resizeTimemout);
    });
  }
]);
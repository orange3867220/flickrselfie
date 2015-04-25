'use strict';

/**
 * @ngdoc function
 * @name flickrselfieApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flickrselfieApp
 */
angular.module('flickrselfieApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

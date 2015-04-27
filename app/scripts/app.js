'use strict';

/**
 * @ngdoc overview
 * @name flickrselfieApp
 * @description
 * # flickrselfieApp
 *
 * Main module of the application.
 */
angular
  .module('flickrselfieApp', [
    'ngAnimate',
    'ngRoute',
    'flickrApp'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:tags', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

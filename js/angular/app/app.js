var app = angular.module('myApp', ['ngRoute', 'ngCookies'], ['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
}]);
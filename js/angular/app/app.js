//Módulo da aplicação
var app = angular.module('myApp', ['ngCookies', 'ngAnimate'], ['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
}]);
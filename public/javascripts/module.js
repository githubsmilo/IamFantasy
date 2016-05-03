var mainmodule = angular.module('earnfrontend', ['ngRoute']);

mainmodule.controller('AppCtrl', function($scope) {
});

mainmodule.config(
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/home',
        controller: 'AppCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
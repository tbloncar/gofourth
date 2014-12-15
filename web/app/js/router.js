angular.module("app").config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'pages/index.html',
    controller: 'ApplicationCtrl'
  });

  $routeProvider.otherwise({ redirectTo: '/' });
});

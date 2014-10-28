/*
------------------------------------------
| GoFourth
------------------------------------------
*/

var GF = angular.module("app", ["ngResource", "ngRoute"]).run(function($rootScope, SessionService) {
  $rootScope.currentUser = SessionService.currentUser();
});

/*
------------------------------------------
| GoFourth
------------------------------------------
*/

var GF = angular.module("app", ["ngResource", "ngRoute", "ui.bootstrap"]).run(function($rootScope, SessionService) {
  $rootScope.currentUser = SessionService.currentUser();
});

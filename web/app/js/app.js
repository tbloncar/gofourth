/*
------------------------------------------
| GoFourth
------------------------------------------
*/

angular.module("app", ["ngResource", "ngRoute"]).run(function($rootScope) {


  // Helpers
  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope.alert = function(thing) {
    alert(thing);
  };
});

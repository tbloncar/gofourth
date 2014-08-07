/*
------------------------------------------
| User Resource
------------------------------------------
*/

angular.module("app").factory("UserResource", function($q, $resource) {
  return $resource('/users');
});

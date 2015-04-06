/*
------------------------------------------
| User Resource
------------------------------------------
*/

GF.factory("UserResource", function($q, $resource, SettingsConst) {
  return $resource(SettingsConst.apiUrl + '/users');
});

/*
------------------------------------------
| Game Resource
------------------------------------------
*/

GF.factory("GameResource", function($q, $resource, SettingsConst) {
  return $resource(SettingsConst.apiUrl + '/games', {}, {
    create: { method: 'POST' } 
  });
});

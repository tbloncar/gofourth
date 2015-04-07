/*
------------------------------------------
| GoFourth
------------------------------------------
*/

var APP_DEPENDENCIES = [
  'ngResource',
  'ngRoute',
  'ui.bootstrap',
  'ng-token-auth'
];

var GF = angular.module("app", APP_DEPENDENCIES);

GF.config(function($authProvider, SettingsConst) {
  $authProvider.configure({
    apiUrl: SettingsConst.authUrl,
    authProviderPaths: {
      twitter: '/auth/twitter' 
    }
  });
});

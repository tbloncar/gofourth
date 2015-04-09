/*
------------------------------------------
| GoFourth
------------------------------------------
*/

var APP_DEPENDENCIES = [
  'ngResource',
  'ngRoute',
  'ui.bootstrap',
  'ng-token-auth',
  'angularMoment'
];

// Namespace models
var MODELS = {};

var GF = angular.module("app", APP_DEPENDENCIES);

GF.config(function($authProvider, SettingsConst) {
  $authProvider.configure({
    apiUrl: SettingsConst.authUrl,
    authProviderPaths: {
      twitter: '/auth/twitter' 
    }
  });
});

GF.run(function($rootScope, AuthenticationService) {
  $rootScope.$on('$routeChangeStart', function(event, toState, toParams, fromState, fromParams) {
    AuthenticationService.validateUser();
  });
});


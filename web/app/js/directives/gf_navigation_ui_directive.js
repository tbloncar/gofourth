// NAVIGATION UI DIRECTIVE

GF.directive("gfNavigationUi", function($modal, AuthenticationService, RegistrationService, SessionService) {

  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'directives/gf-navigation-ui.html',
    link: function(scope, $elm, $attrs) {
      scope.signIn = function() {
        AuthenticationService.signIn();
      };

      scope.signOut = function() {
        AuthenticationService.signOut(); 
      };
    }
 };
});

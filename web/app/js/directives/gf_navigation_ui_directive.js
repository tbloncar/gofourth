// NAVIGATION UI DIRECTIVE

GF.directive("gfNavigationUi", function(AuthenticationService, RegistrationService, SessionService) {

  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'directives/gf-navigation-ui.html',
    link: function(scope, $elm, $attrs) {
      scope.display = {};
      scope.user = {};
      scope.registration = {};

      scope.showSignInForm = function() {
        scope.display.registrationForm = false;
        scope.display.signInForm = true; 
      };

      scope.showRegistrationForm = function() {
        scope.display.signInForm = false; 
        scope.display.registrationForm = true;
      };

      scope.signIn = function() {
        if(scope.session.email && scope.session.password) {
          AuthenticationService.signIn(scope.session.email, scope.session.password).then(function(response) {
            SessionService.createCurrentUser(response.email, response.authentication_token);
            swal({
              title: "Success!",
              text: "You're in!",
              type: "success",
              confirmButtonText: "Okay"
            });
          }, function(errorResponse) {
            swal({
              title: "Oops!",
              text: "Bad email or password!",
              type: "error",
              confirmButtonText: "Okay"
            });
          });            
        }
      };

      scope.register = function() {
        if(scope.registration.email && scope.registration.password) {
          RegistrationService.register(scope.registration.email, scope.registration.password).then(function(response) {
            SessionService.createCurrentUser(response.email, response.authentication_token);
            swal({
              title: "Success!",
              text: "You're in!",
              type: "success",
              confirmButtonText: "Okay"
            });
          }, function(errorResponse) {
            swal({
              title: "Oops!",
              text: "Bad email or password!",
              type: "error",
              confirmButtonText: "Okay"
            });
          });  
        }
      };
    }
 };
});

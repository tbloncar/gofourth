// NAVIGATION UI DIRECTIVE

GF.directive("gfNavigationUi", function($modal, AuthenticationService, RegistrationService, SessionService) {

  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'directives/gf-navigation-ui.html',
    link: function(scope, $elm, $attrs) {
      var $signInModal, $registerModal;
      
      scope.session = {};
      scope.registration = {};
      scope.display = {
        signInBtnText: 'Sign In',
        registerBtnText: 'Register'
      };

      scope.showSignInForm = function() {
        $signInModal = $modal.open({
          templateUrl: 'gf-sign-in-modal.html'
        });
      };

      scope.showRegistrationForm = function() {
        $registerModal = $modal.open({
          templateUrl: 'gf-register-modal.html'
        }); 
      };

      scope.signIn = function() {
        delete scope.display.signInFormError;
        if(scope.session.email && scope.session.password) {
          scope.display.signInBtnText = 'Signing in...';
          AuthenticationService.signIn(scope.session.email, scope.session.password).then(function(response) {
            SessionService.createCurrentUser(response.data.email, response.data.authentication_token);
            scope.display.signInBtnText = 'Success!';
            $signInModal.close();
          }, function(errorResponse) {
            scope.display.signInBtnText = 'Sign In';
            scope.display.signInFormError = 'Invalid username or password.';
          });            
        }
      };

      scope.register = function() {
        delete scope.display.registerFormError;
        if(scope.registration.email && scope.registration.password) {
          scope.display.registerBtnText = 'Creating account...';
          RegistrationService.register(scope.registration.email, scope.registration.password).then(function(response) {
            SessionService.createCurrentUser(response.email, response.authentication_token);
            scope.display.registerBtnText = 'Success!';
            $registerModal.close();
          }, function(errorResponse) {
            scope.display.registerBtnText = 'Register';
            scope.display.registerFormError = 'Ouch! An account with this email exists!';
          });  
        }
      };
    }
 };
});

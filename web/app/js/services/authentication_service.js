// AUTHENTICATION SERVICE

GF.factory("AuthenticationService", function($auth) {

  return {
    signIn: function(email, password) {
      return $auth.submitLogin({
        email: email,
        password: password 
      });
    },

    signOut: function() {
      return $auth.signOut();
    }
  };
});

// AUTHENTICATION SERVICE

GF.factory("AuthenticationService", function($http) {

  return {
    signIn: function(email, password) {
      return $http.post('/api/users/sign_in', {
        session: {
          email: email, password: password
        } 
      });
    },

    signOut: function() {
      return $http.delete('/api/users/sign_out');
    }
  };
});

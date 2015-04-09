// AUTHENTICATION SERVICE

GF.factory("AuthenticationService", function($auth, $q, SessionService) {

  return {
    signIn: function(email, password) {
      return $auth.authenticate('twitter')
        .then(function(resp) {
          SessionService.createCurrentUser(resp); 
        })
        .catch(function(resp) {
        
        });
    },

    signOut: function() {
      var deferred = $q.defer();

      $auth.signOut()
        .then(function(resp) {
          SessionService.destroyCurrentUser(); 
          deferred.resolve(true);
        })
        .catch(function(resp) {
          deferred.reject(resp); 
        });

      return deferred.promise;
    },

    validateUser: function() {
      var deferred = $q.defer(),
          currentUser = SessionService.currentUser;

      if(currentUser) {
        deferred.resolve(currentUser); 
      } else {
        $auth.validateUser()
          .then(function(resp) {
            SessionService.createCurrentUser(resp);
            deferred.resolve(SessionService.currentUser);
          })
          .catch(function(resp) {
            deferred.reject(resp); 
          });
      }

      return deferred.promise;
    }
  };
});

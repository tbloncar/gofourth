// SESSION SERVICE

GF.factory("SessionService", function($http) {
  var currentUser = {};

  return {
    createCurrentUser: function(email, token) {
      currentUser.email = email;    
      currentUser.token = token;
      currentUser.signedIn = true;
    },

    destroyCurrentUser: function() {
      currentUser = {}; 
    },

    currentUser: function() {
      return currentUser; 
    }
  };
});

// REGISTRATION SERVICE

GF.factory("RegistrationService", function($http, $q, AuthenticationService) {

  return {
    register: function(email, password) {
      var deferred = $q.defer();

      $http.post('/api/users', {
        user: {
          email: email, password: password,
          password_confirmation: password
        } 
      }).success(function(responseReg) {
          AuthenticationService.signIn(email, password).success(function(responseAuth) {
            deferred.resolve(responseAuth); 
          }).error(function(errorResponse) {
            deferred.reject(errorResponse); 
          });
      }).error(function(errorResponse) {
        deferred.reject(errorResponse); 
      });

      return deferred.promise;
    } 
  };
});

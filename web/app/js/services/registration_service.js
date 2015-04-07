// REGISTRATION SERVICE

GF.factory("RegistrationService", function($q, $auth) {

  return {
    register: function(email, password) {
      var deferred = $q.defer();

      $auth.submitRegistration({
        email: email,
        password: password,
        password_confirmation: password
      })
      .then(function(resp) {
        deferred.resolve(resp); 
      })
      .catch(function(resp) {
        deferred.reject(resp); 
      });
     
      return deferred.promise;
    } 
  };
});

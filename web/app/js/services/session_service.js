// SESSION SERVICE

GF.factory("SessionService", function($rootScope) {
  return {
    currentUser: null,

    createCurrentUser: function(opts) {
      this.currentUser = new MODELS.CurrentUser(opts);
      $rootScope.currentUser = this.currentUser;
      console.log(this.currentUser);
    },

    destroyCurrentUser: function() {
      this.currentUser = null;
      delete $rootScope.currentUser;
    }
  };
});

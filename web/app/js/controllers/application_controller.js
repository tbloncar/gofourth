/* Application Controller */

GF.controller('ApplicationCtrl', function ($scope, UIStateService, RecentGamesService, GameResource) {
  $scope.uiState = UIStateService;  
  $scope.recentGames = RecentGamesService.getGames($scope);

  GameResource.query().$promise.then(
    function(games) {
      $scope.gameChoices = games;
      $scope.activeGame = games[0];
    },
    function(resp) {
      console.log(resp); 
    }
  );

  $scope.actions = {
    /* Set active game */
    activateGame: function(game) {
      console.log(game);
      $scope.activeGame = game; 
    },

    removeRecentGame: function(index) {
      RecentGamesService.removeGame(index);    
    }
  };
});

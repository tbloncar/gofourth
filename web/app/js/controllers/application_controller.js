/* Application Controller */

GF.controller('ApplicationCtrl', function ($scope, UIStateService, RecentGamesService, GameResource) {
  $scope.uiState = UIStateService;  
  $scope.recentGames = RecentGamesService.getGames($scope);

  GameResource.query().$promise.then(
    function(games) {
      $scope.gameChoices = games;
    },
    function(resp) {
      console.log(resp); 
    }
  );
});

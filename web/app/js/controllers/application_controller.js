// APPLICATION CONTROLLER

angular.module("app").controller('ApplicationCtrl', function ($scope, UIStateService, RecentGamesService) {
  $scope.uiState = UIStateService;  
  $scope.recentGames = RecentGamesService.getGames($scope);
});

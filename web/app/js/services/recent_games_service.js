// RECENT GAMES SERVICE

GF.factory('RecentGamesService', function($rootScope) {
  var games = [];

  function RecentGame(data) {
    this.name = data.name;
    this.timestamp = data.timestamp; 
    this.score = data.score;
  }

  return {
    addGame: function(data) {
      games.push(new RecentGame(data)); 
      $rootScope.$apply();
    },

    removeGame: function(index) {
      games.splice(index, 1); 
    },

    getGames: function() {
      return games; 
    }
  };
});

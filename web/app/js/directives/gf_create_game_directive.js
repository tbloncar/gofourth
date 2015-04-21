// CREATE GAME DIRECTIVE

GF.directive("gfCreateGame", function(SessionService, GameResource) {

  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'directives/gf-create-game.html',
    link: function(scope, $elm, $attrs) {
      function newLevelToLevel(l) {
        var level = new MODELS.Level(); 

        level.question = l.question; 
        level.answers.push(new MODELS.Answer({ label: l.answer1, is_correct: l.answer1_iscorrect }));
        level.answers.push(new MODELS.Answer({ label: l.answer2, is_correct: l.answer2_iscorrect }));
        level.answers.push(new MODELS.Answer({ label: l.answer3, is_correct: l.answer3_iscorrect }));
        level.answers.push(new MODELS.Answer({ label: l.answer4, is_correct: l.answer4_iscorrect }));

        return level;
      }

      scope.stage = 1;
      scope.newGame = new MODELS.Game();
      scope.newLevel = {};

      scope.createGame = function() {
        var isError, errorMessage;

        if(!scope.newGame.name || !scope.newGame.description) {
          return swal('Provide a name and description!');           
        } 

        if(!scope.newGame.levels.length) {
          return swal('Please add at least one level!'); 
        }

        isError = scope.newGame.levels.some(function(l, index) {
          var n = index + 1;

          if(!l.question) {
            errorMessage = 'Level ' + n + ' must have a question!'; 
            return true;
          }

          if(!l.answers[0].label || !l.answers[1].label || 
             !l.answers[2].label || !l.answers[3].label) {
            errorMessage = 'Please provide four answers for Level ' + n + '!'; 
            return true;
          }

          if(!l.answers[0].is_correct && !l.answers[1].is_correct &&
             !l.answers[2].is_correct && !l.answers[3].is_correct) {
            errorMessage = 'Please mark at least one answer as correct for Level ' + n + '!'; 
            return true;
          }
        });

        if(isError) {
          return swal(errorMessage); 
        }

        GameResource.create({
          game: scope.newGame.toJSON() 
        }).$promise.then(
          function(resp) {
            SessionService.currentUser.games.push(new MODELS.Game(resp)); 
            scope.newGame = new MODELS.Game();
            swal('You created a game!');
          },
          function(resp) {
            swal('Hm. Something went awry.'); 
          }
        );
      };

      scope.cancelGame = function() {
        swal({
          title: 'Discard this game?',
          showCancelButton: true,
          closeOnConfirm: true,
          closeOnCancel: true,
        }, function(confirmed) {
          if(confirmed) {
            scope.$apply(function() {
              scope.newGame = new MODELS.Game();    
            });
          } 
        });
      };

      scope.addLevel = function() {
        var l = scope.newLevel;

        if(!l.question) {
          return swal('A level must have a question!'); 
        }

        if(!l.answer1 || !l.answer2 || !l.answer3 || !l.answer4) {
          return swal('Please provide four answers!'); 
        }

        if(!l.answer1_iscorrect && !l.answer2_iscorrect &&
          !l.answer3_iscorrect && !l.answer4_iscorrect) {
          return swal('Please mark at least one answer as correct!'); 
        }

        scope.newGame.levels.push(newLevelToLevel(l));
        scope.newLevel = {};
      };

      scope.removeLevel = function(index) {
        scope.newGame.levels.splice(index, 1); 
      };
    }
 };
});

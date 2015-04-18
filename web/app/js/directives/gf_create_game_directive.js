// CREATE GAME DIRECTIVE

GF.directive("gfCreateGame", function(SessionService) {

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

      scope.setGameDetails = function() {
        if(!scope.newGame.name || !scope.newGame.description) {
          return swal('Provide a name and description!');           
        } 

        scope.stage = 2;
      };

      scope.addLevel = function() {
        var l = scope.newLevel;

        if(!l.question) {
          return swal('A level must have a question!'); 
        }

        if(!l.answer1 || !l.answer2 || !l.answer3 || !l.answer4) {
          return swal('Please provide four answers!'); 
        }

        console.log(l);

        if(!l.answer1_iscorrect && !l.answer2_iscorrect &&
          !l.answer3_iscorrect && !l.answer4_iscorrect) {
          return swal('Please mark at least once answer as correct!'); 
        }

        scope.newGame.levels.push(newLevelToLevel(l));
      };
    }
 };
});

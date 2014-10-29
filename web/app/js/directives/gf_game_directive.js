// GAME DIRECTIVE

GF.directive("gfGame", function() {

  return {
    restrict: 'A',
    replace: false,
    link: function(scope, $elm, attrs) {

      Number.prototype.clamp = function(min, max) {
        return Math.min(Math.max(this, min), max);
      };

      var GOFOURTH = {},
          C_WIDTH = $elm.innerWidth(),
          C_HEIGHT = C_WIDTH,
          headerHeight = 80,
          midX = C_WIDTH/2,
          midY = (headerHeight + C_HEIGHT)/2,
          ctx; 

      var LEVELS = [
        {
          question: "sqrt(5! - (-1))",
          choices: [22, 12, 5, 11],
          answer: 11
        },
        {
          question: "7!/6!",
          choices: [1, 7, 42, 6],
          answer: 7
        },
        {
          question: "sqrt(5! + 4!)",
          choices: [11, 14, 8, 12],
          answer: 12
        },
        {
          question: "1 + 1 / 1 - 1",
          choices: [11, 1, 0, 2],
          answer: 1
        },
        {
          question: "sqrt(4! + (3! * 2))",
          choices: [5, 17, 6, 24],
          answer: 6
        },
        {
          question: "3 * 4^2",
          choices: [48, 54, 18, 12],
          answer: 48
        },
        {
          question: "(22 + 2) / 3!",
          choices: [12, 9, 6, 4],
          answer: 4
        },
        {
          question: "8^8 / 8^7",
          choices: ["16,777,216", 8, 48, "160,000"],
          answer: 8
        },
        {
          question: "1 + 2 + 3 + 4",
          choices: [11, 8, 9, 10],
          answer: 10
        },
        {
          question: "(7! / 10) - 500",
          choices: [1, 200, 75, 4],
          answer: 4
        }
      ];

      GOFOURTH.game = (function() {
        var frameLength = 30,
          backgroundImg = new Image(),
          fourthOpacity = {
            topLeft: 70,
            topRight: 70,
            bottomLeft: 70,
            bottomRight: 70
          },
          fontSize = 24,
          timer = 500,
          level = 0,
          score = 0,
          state = 'start',
          $canvas, canvas, fourthWidth, fourthHeight,
          currentLevel, levels, topScore;

        topScore = localStorage['gf-top-score'] || 0;

        backgroundImg.onload = function() {
          drawBoard(); 
        };

        backgroundImg.src = 'img/background.jpg';

        function initialize(lvls) {
          loadLevels(lvls);

          $canvas = $elm;
          canvas = $canvas[0];
          ctx = canvas.getContext('2d');

          canvas.width = C_WIDTH;
          canvas.height = C_HEIGHT;

          gameLoop();
        }

        function loadLevels(lvls) {
          levels = _.map(_.shuffle(lvls), function(lvl) {
            lvl.choices = _.shuffle(lvl.choices); 
            return lvl;
          }); 
        }

        function restoreDefaultOpacity() {
          for(var f in fourthOpacity) fourthOpacity[f] = 25;
        }

        function drawBoard() {
          fourthWidth = canvas.width/2;
          fourthHeight = (canvas.height - headerHeight)/2;

          ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'rgba(255,185,15,0.' + fourthOpacity.topLeft + ')';
          ctx.fillRect(0, headerHeight, fourthWidth, fourthHeight);
          ctx.fillStyle = 'rgba(125,38,205,0.' + fourthOpacity.topRight + ')';
          ctx.fillRect(fourthWidth, headerHeight, fourthWidth, fourthHeight);
          ctx.fillStyle = 'rgba(127,255,0,0.' + fourthOpacity.bottomLeft + ')';
          ctx.fillRect(0, midY, fourthWidth, fourthHeight);
          ctx.fillStyle = 'rgba(205,0,0,0.' + fourthOpacity.bottomRight + ')';
          ctx.fillRect(fourthWidth, midY, fourthWidth, fourthHeight);

          restoreDefaultOpacity();
        }

        function textShadow(offsetX, offsetY, blur, color) {
          ctx.shadowColor = color;
          ctx.shadowOffsetX = offsetX;
          ctx.shadowOffsetY = offsetY;
          ctx.shadowBlur = blur;
        }

        function drawStart() {
          ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height); 
          ctx.font = 'italic normal 40px Oswald';
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.fillText("GoFourth", midX, 200);
          ctx.font = '22px Abel';
          textShadow(0, 2, 0, "rgba(0,0,0,0.5)");
          ctx.fillText('Press [SPACEBAR] to Begin', midX, 250);
          ctx.font = '18px Abel';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'bottom'
          ctx.fillText("High Score: " + topScore, 15, canvas.height - 15);
        }

        function drawWin() {
          ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
          ctx.font = "40px Abel";
          ctx.fillStyle = "#fff";
          ctx.textAlign = 'center';
          textShadow(0, 2, 0, "rgba(0,0,0,0.5)");
          ctx.fillText("You Win!", midX, 200);
          ctx.font = "22px Abel";
          ctx.fillText("Score: " + score + "  High Score: " + topScore, midX, 260);
          ctx.font = "18px Abel";
          ctx.fillText("Main Menu (M)  Play Again (P)", midX, 350);
        }

        function drawLose() {
          ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
          ctx.font = "40px Abel";
          ctx.fillStyle = "#fff";
          ctx.textAlign = 'center';
          textShadow(0, 2, 0, "rgba(0,0,0,0.5)");
          ctx.fillText("Game Over!", C_WIDTH/2, 200);
          ctx.font = "22px Abel";
          ctx.fillText("Score: " + score + "  High Score: " + topScore, midX, 260);
          ctx.font = "18px Abel";
          ctx.fillText("Main Menu (M)  Play Again (P)", midX, 350);
        }

        function gameLoop() {
          update();
          draw();

          setTimeout(gameLoop, frameLength);
        }

        function update() {
          switch(state) {
            case 'start':
              if(keydown.space) resetGame();
              break;
            case 'play':
              if(timer > 0) {
                if(keydown.left) GOFOURTH.rocket.move.left(); 
                if(keydown.right) GOFOURTH.rocket.move.right();
                if(keydown.up) GOFOURTH.rocket.move.up();
                if(keydown.down) GOFOURTH.rocket.move.down();
                if(keydown.return) handleAnswer();
                updateFourthOpacity(GOFOURTH.rocket);
                timer -= 1;
              } else {
                handleAnswer();
              }
              break;
            case 'win':
            case 'lose':
              if(score > topScore) setTopScore(score);
              if(keydown.p) resetGame();
              if(keydown.m) state = 'start';
              break;
          }
          scope.$digest();
        }

        function resetGame() {
          GOFOURTH.rocket.reset();
          loadLevels(levels);
          timer = 500;
          score = 0;  
          level = 0;
          currentLevel = levels[level];
          state = 'play';
        }

        function setTopScore(s) {
          topScore = s;
          localStorage['gf-top-score'] = s;
        }

        function handleAnswer() {
          if(timer > 490) return;
          return correctAnswer() ? nextLevel() : state = 'lose';
        }

        function nextLevel() {
          score += (level + 1) * timer;
          level += 1; 
          currentLevel = levels[level];
          timer = 500;

          return (levels[level] ? true : state = 'win');
        }

        function correctAnswer() {
          var answer = currentLevel.answer;
          return getFourth(GOFOURTH.rocket) === currentLevel.choices.indexOf(answer) ? true : false;
        }

        function updateFourthOpacity(rocket) {
          var rocketFourth = false;

          if(inTopLeft(rocket)) {
            rocketFourth = "topLeft";
          } else if(inTopRight(rocket)) {
            rocketFourth = "topRight";
          } else if(inBottomLeft(rocket)) {
            rocketFourth = "bottomLeft";
          } else if(inBottomRight(rocket)) {
            rocketFourth = "bottomRight";
          }

          if(rocketFourth) fourthOpacity[rocketFourth] = 40;
        }

        function getFourth(obj) {
          if(inTopLeft(obj)) {
            return 0; 
          } else if(inTopRight(obj)) {
            return 1; 
          } else if(inBottomRight(obj)) {
            return 2; 
          } else if(inBottomLeft(obj)) {
            return 3; 
          }

          return -1;
        }

        function inTopLeft(obj) {
          if(obj.getX() < midX && obj.getY() < midY) return true;
        }

        function inTopRight(obj) {
          if(obj.getX() > midX && obj.getY() < midY) return true;
        }

        function inBottomLeft(obj) {
          if(obj.getX() < midX && obj.getY() > midY) return true;
        }

        function inBottomRight(obj) {
          if(obj.getX() > midX && obj.getY() > midY) return true;
        }

        function draw() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          switch(state) {
            case 'start':
              drawStart();
              break;
            case 'play':
              drawBoard();
              ctx.font = fontSize.toString() + "px Abel";
              ctx.fillStyle = "#fff";
              ctx.textAlign = 'left';
              ctx.fillText(currentLevel.question, 25, headerHeight/2 + fontSize/2 - 3);
              ctx.textAlign = 'right';
              ctx.fillText(timer, C_WIDTH - 25, headerHeight/2 + fontSize/2 - 3);
              ctx.textAlign = 'center';
              ctx.fillText(currentLevel.choices[0] , fourthWidth/2, headerHeight + fourthHeight/2);
              ctx.fillText(currentLevel.choices[1], midX + fourthWidth/2, headerHeight + fourthHeight/2);
              ctx.fillText(currentLevel.choices[2], midX + fourthWidth/2, midY + fourthHeight/2);
              ctx.fillText(currentLevel.choices[3], fourthWidth/2, midY + fourthHeight/2);
              GOFOURTH.rocket.draw(); 
              break;
            case 'win':
              drawWin();
              break;
            case 'lose':
              drawLose();
              break;
          }
        }

        return {
          initialize: initialize
        };
      })();

      GOFOURTH.rocket = (function() {
        var x = midX,
          y = midY,
          frame = 0,
          width = 49, height = 49,
          rocketImg = new Image(),
          rocketLoaded = false;
          move = {},
          maxX = C_WIDTH - width/2,
          minX = width/2,
          maxY = C_HEIGHT - height/2,
          minY = headerHeight + height/2;

        rocketImg.onload = function() {
          rocketLoaded = true; 
        };

        rocketImg.src = 'img/rocket-sprite.png';

        function reset() {
          x = midX; 
          y = midY;
          frame = 0;
        }

        function draw() {
          if(!rocketLoaded) return;
          ctx.fillStyle = 'rgba(255,255,255,0.1)';
          ctx.beginPath();
          ctx.arc(x, y, width/1.5, 0, 2 * Math.PI);
          ctx.fill();
          ctx.drawImage(rocketImg, frame * width, 0, width, height,  x - width/2, y - height/2, width, height);  
        }

        move.right = function moveRight() {
          x = x.clamp(x + 10, maxX); 
          frame = 2;
        };

        move.up = function moveUp() {
          y = y.clamp(minY + 10, maxY) - 10;
          frame = 0;
        };

        move.left = function moveLeft() {
          x = x.clamp(minX + 10, maxX) - 10; 
          frame = 3;
        };

        move.down = function moveDown() {
          y = y.clamp(y + 10, maxY);
          frame = 1;
        };

        return {
          draw: draw,
          move: move,
          reset: reset,
          getX: function() { return x; },
          getY: function() { return y; }
        }
      })();

      $(document).ready(function() {
        GOFOURTH.game.initialize(LEVELS);
      });
    }
  };
});

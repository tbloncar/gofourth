// GAME DIRECTIVE

var gameState = { START: 0, PLAY: 1, WIN: 2, LOSE: 3 };

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Dimensions(width, height) {
  this.width = width;
  this.height = height;
}

function CanvasUtils(context) {
  this.textShadow = function(x, y, blur, color) {
    context.shadowColor = color;
    context.shadowOffsetX = x;
    context.shadowOffsetY = y;
    context.shadowBlur = blur;
  };
}

function GameView($canvas, backgroundImageSrc) {
  var canvas = $canvas[0], 
      context = canvas.getContext('2d'),
      canvasUtils = new CanvasUtils(context),
      headerHeight = 80,
      viewDimensions = new Dimensions(canvas.width, canvas.width),
      midPoint = new Point(canvas.width/2, (headerHeight + canvas.height)/2),
      fontSize = 24,
      backgroundImage = new Image(),
      backgroundImageLoaded = false,
      defaultOpacity = 30,
      fourthOpacity = {
        topLeft: defaultOpacity,
        topRight: defaultOpacity,
        bottomRight: defaultOpacity,
        bottomLeft: defaultOpacity 
      },
      fourthDimensions = new Dimensions(canvas.width/2, (canvas.height - headerHeight)/2);

  // Expose to public
  this.context = context;
  this.headerHeight = headerHeight;
  this.dimensions = viewDimensions;

  backgroundImage.onload = function() {
    drawGameBoard(); 
  };

  backgroundImage.src = backgroundImageSrc;

  this.draw = function(state, piece, currentLevel, topScore, timer) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    switch(state.getState()) {
      case gameState.START:
        drawStart(topScore);
        break;
      case gameState.PLAY:
        drawGameBoard();
        context.font = fontSize.toString() + "px Abel";
        context.fillStyle = "#fff";
        context.textAlign = 'left';
        context.fillText(currentLevel.question, 25, headerHeight/2 + fontSize/2 - 3);
        context.textAlign = 'right';
        context.fillText(timer, canvas.width - 25, headerHeight/2 + fontSize/2 - 3);
        context.textAlign = 'center';
        context.fillText(currentLevel.choices[0], fourthDimensions.width/2, headerHeight + fourthDimensions.height/2);
        context.fillText(currentLevel.choices[1], midPoint.x + fourthDimensions.width/2, headerHeight + fourthDimensions.height/2);
        context.fillText(currentLevel.choices[2], midPoint.x + fourthDimensions.width/2, midPoint.y + fourthDimensions.height/2);
        context.fillText(currentLevel.choices[3], fourthDimensions.width/2, midPoint.y + fourthDimensions.height/2);

        piece.draw();

        break;
      case gameState.WIN:
        drawWin();
        break;
      case gameState.LOSE:
        drawLose();
        break;
    }
  };

  function drawGameBoard() {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    context.fillStyle = backgroundColors().topLeft;
    context.fillRect(0, headerHeight, fourthDimensions.width, fourthDimensions.height);
    context.fillStyle = backgroundColors().topRight;
    context.fillRect(fourthDimensions.width, headerHeight, fourthDimensions.width, fourthDimensions.height);
    context.fillStyle = backgroundColors().bottomRight;
    context.fillRect(fourthDimensions.width, midPoint.y, fourthDimensions.width, fourthDimensions.height);
    context.fillStyle = backgroundColors().bottomLeft;
    context.fillRect(0, midPoint.y, fourthDimensions.width, fourthDimensions.height);

    restoreDefaultOpacity();
  };

  function drawStart(topScore) {
    // Draw background
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); 

    // Draw game name
    context.font = 'italic normal 40px Oswald';
    context.fillStyle = '#fff';
    context.textAlign = 'center';
    context.fillText("GoFourth", midPoint.x, 200);

    // Draw instructions
    context.font = '22px Abel';
    canvasUtils.textShadow(0, 2, 0, "rgba(0,0,0,0.5)");
    context.fillText('Press [SPACEBAR] to Begin', midPoint.x, 250);

    // Draw high score
    context.font = '18px Abel';
    context.textAlign = 'left';
    context.textBaseline = 'bottom'
    context.fillText("High Score: " + topScore, 15, canvas.height - 15);
  }

  function drawWin(score) {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.font = "40px Abel";
    ctx.fillStyle = "#fff";
    ctx.textAlign = 'center';
    textShadow(0, 2, 0, "rgba(0,0,0,0.5)");
    ctx.fillText("You Win!", midPoint.x, 200);
    ctx.font = "22px Abel";
    ctx.fillText("Score: " + score + "  High Score: " + topScore, midPoint.x, 260);
    ctx.font = "18px Abel";
    ctx.fillText("Main Menu (M)  Play Again (P)", midPoint.x, 350);
  };

  function drawLose(score, topScore) {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.font = "40px Abel";
    ctx.fillStyle = "#fff";
    ctx.textAlign = 'center';
    textShadow(0, 2, 0, "rgba(0,0,0,0.5)");
    ctx.fillText("Game Over!", canvas.width/2, 200);
    ctx.font = "22px Abel";
    ctx.fillText("Score: " + score + "  High Score: " + topScore, midPoint.x, 260);
    ctx.font = "18px Abel";
    ctx.fillText("Main Menu (M)  Play Again (P)", midPoint.x, 350);
  };

  this.updateFourthOpacity = function(piece) {
    var pieceFourth = false;

    if(inTopLeft(piece)) {
      pieceFourth = "topLeft";
    } else if(inTopRight(piece)) {
      pieceFourth = "topRight";
    } else if(inBottomLeft(piece)) {
      pieceFourth = "bottomLeft";
    } else if(inBottomRight(piece)) {
      pieceFourth = "bottomRight";
    }

    if(pieceFourth) fourthOpacity[pieceFourth] = 60;
  }

  this.getFourth = function(obj) {
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

  function backgroundColors() {
    return {
      topLeft: 'rgba(255,185,15,0.' + fourthOpacity.topLeft + ')',
      topRight: 'rgba(125,38,205,0.' + fourthOpacity.topRight + ')',
      bottomRight: 'rgba(127,255,0,0.' + fourthOpacity.bottomRight + ')',
      bottomLeft: 'rgba(205,0,0,0.' + fourthOpacity.bottomLeft + ')'
    };
  }

  function restoreDefaultOpacity() {
    for(var f in fourthOpacity) fourthOpacity[f] = defaultOpacity;
  }

  function inTopLeft(obj) {
    if(obj.position().x < midPoint.x && obj.position().y < midPoint.y) return true;
  }

  function inTopRight(obj) {
    if(obj.position().x > midPoint.x && obj.position().y < midPoint.y) return true;
  }

  function inBottomLeft(obj) {
    if(obj.position().x < midPoint.x && obj.position().y > midPoint.y) return true;
  }

  function inBottomRight(obj) {
    if(obj.position().x > midPoint.x && obj.position().y > midPoint.y) return true;
  }
}

function GamePiece(gameView, moveDistance, dimensions, imageSrc) {
  var image = new Image(),
      imageLoaded = false,
      frame = 0,
      position = new Point(gameView.dimensions.width / 2, gameView.dimensions.height / 2 + gameView.headerHeight / 2),
      initialPosition = position,
      context = gameView.context,
      minPoint = new Point(dimensions.width / 2, gameView.headerHeight + dimensions.height / 2),
      maxPoint = new Point(gameView.dimensions.width - dimensions.width / 2, gameView.dimensions.height - dimensions.height / 2),
      mD = moveDistance;

  image.onload = function() {
    imageLoaded = true; 
  };

  image.src = imageSrc;

  this.position = function() {
    return position; 
  };
 
  this.draw = function() {
    if(!imageLoaded) return; 

    context.fillStyle = 'rgba(255,255,255,0.2)';
    context.beginPath();
    context.arc(position.x, position.y, dimensions.width/1.5, 0, 2 * Math.PI);
    context.fill();
    context.drawImage(image, frame * dimensions.width, 0, dimensions.width,
      dimensions.height, position.x - dimensions.width/2, position.y - dimensions.height/2,
      dimensions.width, dimensions.height);  
  };

  this.moveRight = function() {
    position.x = position.x.clamp(position.x + mD, maxPoint.x); 
    frame = 2;
  };

  this.moveUp = function() {
    position.y = position.y.clamp(minPoint.y + mD, maxPoint.y) - mD; 
    frame = 0;
  };

  this.moveLeft = function() {
    position.x = position.x.clamp(minPoint.x + mD, maxPoint.x) - mD; 
    frame = 3;
  };

  this.moveDown = function() {
    position.y = position.y.clamp(position.y + mD, maxPoint.y); 
    frame = 1;
  };

  this.reset = function() {
    position = initialPosition;     
    frame = 0;
  };
}

function GameState() {
  var internalState = 0;

  this.getState = function() {
    return internalState; 
  };

  this.toStart = function() {
    internalState = gameState.START; 
  };

  this.toPlay = function() {
    internalState = gameState.PLAY;
  };

  this.toWin = function() {
    internalState = gameState.WIN;
  };

  this.toLose = function() {
    internalState = gameState.LOSE;
  };
}

function GameLevels(levels) {
  var levelIndex = 0;
  
  load(levels);

  this.current = function() {
    return levels[levelIndex]; 
  };

  this.currentIndex = function() {
    return levelIndex;
  };

  this.next = function() {
    levelIndex += 1; 
  };

  this.reset = function() {
    levelIndex = 0;  
    load(levels);
  };

  function load(lvls) {
    levels = _.map(_.shuffle(lvls), function(lvl) {
      lvl.choices = _.shuffle(lvl.choices); 
      return lvl;
    });     
  }
}

function Game(name, $elm, scope, gameLevels) {
  var name = name,
    state = new GameState(),
    view = new GameView($elm, 'img/background.jpg'),
    frameLength = 30,
    piece = new GamePiece(view, 10, new Dimensions(49, 49), 'img/rocket-sprite.png'),
    levels = new GameLevels(gameLevels),
    timer = 500,
    score = 0,
    topScore = localStorage['gf-top-score'];
  
  this.go = function() {
    gameLoop(); 
  };

  function gameLoop() {
    update();
    view.draw(state, piece, levels.current(), topScore, timer);

    setTimeout(gameLoop, frameLength);
  }

  function update() {
    switch(state.getState()) {
      case gameState.START:
        if(keydown.space) resetGame();
        break;
      case gameState.PLAY:
        if(timer > 0) {
          if(keydown.left) piece.moveLeft(); 
          if(keydown.right) piece.moveRight();
          if(keydown.up) piece.moveUp();
          if(keydown.down) piece.moveDown();
          if(keydown.return) handleAnswer();
          view.updateFourthOpacity(piece);
          timer -= 1;
        } else {
          handleAnswer();
        }
        break;
      case gameState.WIN:
      case gameState.LOSE:
        if(score > topScore) setTopScore(score);
        if(keydown.p) resetGame();
        if(keydown.m) state = gameState.START;
        break;
    }

    scope.$digest();
  }

  function resetGame() {
    piece.reset();

    timer = 500;
    score = 0;  
    levels.reset();
    state.toPlay();
  }

  function setTopScore(s) {
    topScore = s;
    localStorage['gf-top-score'] = s;
  }

  function handleAnswer() {
    if(timer > 490) return;
    return correctAnswer() ? levels.next() : state = gameState.LOSE;
  }

  function nextLevel() {
    score += (levels.currentIndex() + 1) * timer;
    levels.next();
    timer = 500;

    return (levels.current() ? true : state = gameState.WIN);
  }

  function correctAnswer() {
    var answer = levels.current().answer;
    return view.getFourth(piece) === level.current().choices.indexOf(answer) ? true : false;
  }
}

GF.directive('gfGameBeta', function() {
  return {
    restrict: 'A',
    replace: false,
    link: function(scope, $elm, attrs) {
      var levels = [
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

      var game = new Game('Demo Game', $elm, scope, levels);

      $(document).ready(function() {
        game.go();
      });
    }
  };
});


GF.directive("gfGame", function() {

  return {
    restrict: 'A',
    replace: false,
    link: function(scope, $elm, attrs) {

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
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
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

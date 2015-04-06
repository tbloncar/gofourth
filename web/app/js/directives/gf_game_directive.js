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
      headerHeight = 70,
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

  this.draw = function(state, piece, currentLevel, topScore, timer, score) {
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
        context.fillText(currentLevel.question, 25, headerHeight/2 + fontSize/2);
        context.textAlign = 'right';
        context.fillText(timer, canvas.width - 25, headerHeight/2 + fontSize/2);
        context.textAlign = 'center';
        context.fillText(currentLevel.answers[0].label, fourthDimensions.width/2, headerHeight + fourthDimensions.height/2);
        context.fillText(currentLevel.answers[1].label, midPoint.x + fourthDimensions.width/2, headerHeight + fourthDimensions.height/2);
        context.fillText(currentLevel.answers[2].label, midPoint.x + fourthDimensions.width/2, midPoint.y + fourthDimensions.height/2);
        context.fillText(currentLevel.answers[3].label, fourthDimensions.width/2, midPoint.y + fourthDimensions.height/2);

        piece.draw();

        break;
      case gameState.WIN:
        drawWin(score, topScore);
        break;
      case gameState.LOSE:
        drawLose(score, topScore);
        break;
    }
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
  };

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
  }

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
    context.textBaseline = 'bottom';
    context.fillText("High Score: " + topScore, 15, canvas.height - 15);
  }

  function drawWin(score, topScore) {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    context.font = "40px Abel";
    context.fillStyle = "#fff";
    context.textAlign = 'center';
    canvasUtils.textShadow(0, 2, 0, "rgba(0,0,0,0.5)");
    context.fillText("You Win!", midPoint.x, 200);
    context.font = "22px Abel";
    context.fillText("Score: " + score + "  High Score: " + topScore, midPoint.x, 260);
    context.font = "18px Abel";
    context.fillText("Main Menu (M)  Play Again (P)", midPoint.x, 350);
  }

  function drawLose(score, topScore) {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    context.font = "40px Abel";
    context.fillStyle = "#fff";
    context.textAlign = 'center';
    canvasUtils.textShadow(0, 2, 0, "rgba(0,0,0,0.5)");
    context.fillText("Game Over!", canvas.width/2, 200);
    context.font = "22px Abel";
    context.fillText("Score: " + score + "  High Score: " + topScore, midPoint.x, 260);
    context.font = "18px Abel";
    context.fillText("Main Menu (M)  Play Again (P)", midPoint.x, 350);
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
    position = new Point(gameView.dimensions.width / 2, gameView.dimensions.height / 2 + gameView.headerHeight / 2);
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
      lvl.answers = _.shuffle(lvl.answers); 
      return lvl;
    });     
  }
}

function Game(name, $elm, scope, gameLevels, recentGamesService) {
  var name = name,
    state = new GameState(),
    view = new GameView($elm, 'img/background.jpg'),
    recentGameAdded = false,
    frameLength = 30,
    piece = new GamePiece(view, 10, new Dimensions(49, 49), 'img/rocket-sprite.png'),
    levels = new GameLevels(gameLevels),
    timer = 500,
    score = 0,
    topScore = localStorage['gf-top-score'] || 0;
  
  this.go = function() {
    gameLoop(); 
  };

  function gameLoop() {
    update();
    view.draw(state, piece, levels.current(), topScore, timer, score);

    setTimeout(gameLoop, frameLength);
  }

  function update() {
    switch(state.getState()) {
      case gameState.START:
        if(keydown.space) {
          resetGame();
          state.toPlay();
        }
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
        if(!recentGameAdded) {
          addRecentGame();   
        }
        if(score > topScore) setTopScore(score);
        if(keydown.p) {
          resetGame();
          state.toPlay();
        }
        if(keydown.m) {
          state.toStart();
          resetGame();
        }
        break;
    }
  }

  function addRecentGame() {
    recentGamesService.addGame({ name: name, score: score, timestamp: new Date() });
    recentGameAdded = true;
  }

  function resetGame() {
    recentGameAdded = false;

    piece.reset();

    timer = 500;
    score = 0;  
    levels.reset();
  }

  function setTopScore(s) {
    topScore = s;
    localStorage['gf-top-score'] = s;
  }

  function handleAnswer() {
    if(timer > 490) return;
    return correctAnswer() ? nextLevel() : state.toLose();
  }

  function nextLevel() {
    score += (levels.currentIndex() + 1) * timer;
    levels.next();
    timer = 500;

    return levels.current() ? true : state.toWin();
  }

  function correctAnswer() {
    var correctAnswerIndexes = [];

    for(var i = 0; i < 4; i++) {
      if(levels.current().answers[i].is_correct) {
        correctAnswerIndexes.push(i); 
      } 
    }

    return _.contains(correctAnswerIndexes, view.getFourth(piece));
  }
}

GF.directive('gfGame', function(RecentGamesService) {
  return {
    restrict: 'A',
    replace: false,
    link: function(scope, $elm, attrs) {
      $(document).ready(function() {
        scope.$watch('activeGame', function(gameChoice) {
          if(!gameChoice) { return; }

          var game = new Game(gameChoice.name, $elm, scope, gameChoice.levels, RecentGamesService);

          game.go();
        });
      });
    }
  };
});

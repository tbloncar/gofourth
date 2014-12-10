// GAME SERVICE

GF.factory('GameService', function() {


  return {
  
  };
});

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

// ROCKET (GAME PIECE)
function Rocket(x, y, context, game) {
  var width = 49,                           // Piece width
      height = width,                       // Piece height
      image = new Image(),                  // Piece image
      imageLoaded = false,                  // Piece image loaded?
      frame = 0,                            // Sprite frame
      initX = x,                            // Initial X coordinate
      initY = y,                            // Initial Y coordinate
      maxX = game.width - width/2,          // Maximum X coordinate
      minX = width/2,                       // Minimum X coordinate
      maxY = game.height - height/2,        // Maximum Y coordinate
      minY = game.headerHeight + height/2,  // Minimum Y coordiante
      context = context,                    // Canvas context
      moveDist = 10;                        // Piece move distance

  // Update loaded state when image has loaded
  image.onload = function() {
    imageLoaded = true; 
  };

  image.src = 'img/rocket-sprite.png';

  this.x = x;
  this.y = y;

  // Resets game piece to initial state
  this.reset = function() {
    this.x = initX;
    this.y = initY;
    frame = 0;
  };

  // Draws the game piece
  this.draw = function() {
    if(!imageLoaded) { return; } 

    context.fillStyle = 'rgba(255,255,255,0.2)';
    context.beginPath();
    context.arc(this.x, this.y, width/1.5, 0, 2 * Math.PI);
    context.fill();
    context.drawImage(image, frame * width, 0, width, height, this.x - width/2, this.y - height/2, width, height);  
  };

  this.moveRight = function() {
    this.x  = this.x.clamp(this.x + moveDist, maxX);
    frame = 2;
  };
  
  this.move

}


/* Game */

MODELS.Game = function Game(options) {
  var opts = options || {};

  this.name = opts.name;
  this.description = opts.description;
  this.levels = opts.levels || [];
};

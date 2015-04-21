/* Game */

MODELS.Game = function Game(options) {
  var opts = options || {};

  this.name = opts.name;
  this.description = opts.description;
  this.is_public = opts.is_public;
  this.levels = opts.levels || [];
};

MODELS.Game.prototype.toJSON = function() {
  return {
    name: this.name,
    description: this.description,
    is_public: this.is_public,
    levels_attributes: this.levels.map(function(level) {
      return (new MODELS.Level(level)).toJSON(); 
    })
  }; 
};

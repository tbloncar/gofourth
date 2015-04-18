/* Level */

MODELS.Level = function Level(options) {
  var opts = options || {};

  this.question = opts.question;
  this.answers = opts.answers || [];
};

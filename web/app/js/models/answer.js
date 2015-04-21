/* Answer */

MODELS.Answer = function Answer(options) {
  var opts = options || {};

  this.label = opts.label;
  this.is_correct = opts.is_correct;
};

MODELS.Answer.prototype.toJSON = function() {
  return {
    label: this.label,
    is_correct: this.is_correct
  }; 
};

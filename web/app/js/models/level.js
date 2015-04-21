/* Level */

MODELS.Level = function Level(options) {
  var opts = options || {};

  this.question = opts.question;
  this.answers = opts.answers || [];
};

MODELS.Level.prototype.toJSON = function() {
  return {
    question: this.question,
    answers_attributes: this.answers.map(function(answer) {
      return (new MODELS.Answer(answer)).toJSON(); 
    })
  }; 
};

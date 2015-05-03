var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SurveySchema = new Schema({
	question: String,
	answerType: String,
	answerOptions : Schema.Types.Mixed,
  backgroundType: String,
  background: Schema.Types.Mixed,
  created_at    : { type: Date },
  updated_at    : { type: Date }
}, { strict: false });

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
	next();
});

mongoose.model('user', UserSchema);
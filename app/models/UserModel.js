var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var prefix = 'survey_';
var UserSchema = new Schema({
	name: String,
  email: String,
  password: String,
  token: String,
  created_at    : { type: Date },
  updated_at    : { type: Date }
}, { strict: false });

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
    this.token = prefix + this._id;
  }
  
	next();
});

mongoose.model('user', UserSchema);
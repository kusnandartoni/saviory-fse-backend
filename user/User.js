var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  country: String,
  birthday: String,
  isAdmin: Boolean
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
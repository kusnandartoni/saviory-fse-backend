var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  city: String,
  birthday: String,
  isAdmin: Boolean,
  imgUrl: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
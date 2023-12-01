const mongoose = require('mongoose')

const User = mongoose.model('User', {
  id:String,
  googleId:String,
  email: String,
  hashedPassword: String, // Store the hashed password
  userType: String,
  dob: Date,
  age: Number,
  firstname: String,
  lastname: String
});
module.exports = { User }
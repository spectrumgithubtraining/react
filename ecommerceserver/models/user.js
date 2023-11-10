const mongoose = require('mongoose')

const User = mongoose.model('User', {
    email: String,
    hashedPassword: String, // Store the hashed password
    userType: String,
    dob:Date,
    age:Number,
    firstname:String,
    lastname:String
  });
  module.exports = {User}
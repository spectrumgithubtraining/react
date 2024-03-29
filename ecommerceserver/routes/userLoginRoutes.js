// userLoginRoutes.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { OAuth2Client } = require('google-auth-library')
const session = require('express-session');
const { log } = require('console');
const cookie = require('cookie');
const validateToken = require('../middleware/tokenValidation');




const secretKey = 'your-secret-key'
const googleClientId = '880362377420-sdolrmkm9p5eaudqp94vcl24vm4tso7d.apps.googleusercontent.com'
const googleClientSecret = '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';
const googleRedirectUri = 'http://localhost';




// User login route

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    } 

    // Hash the provided password and compare with stored hashedPassword.
    const hashedInputPassword = crypto.createHash('sha256').update(password).digest('hex');
    const token = jwt.sign({ userId: user._id, userType: user.userType , email:user.email}, secretKey, { expiresIn: '1h' });
    if (hashedInputPassword !== user.hashedPassword) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate token with user type information

    const cookieOptions = {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'lax',
      maxAge: 3600000,
    };




    const serializedCookie = cookie.serialize('token', token, cookieOptions);

    // Set the 'token' cookie in the response header
    res.setHeader('Set-Cookie', serializedCookie);

    // Check userType to determine if it's a regular user or seller

    if (user.userType === 'user') {
      // Handle regular user login
      res.json({ userType: 'user', message: 'Regular user logged in', redirect: '/productPage', token, genratedcookie:serializedCookie });
    } else if (user.userType === 'seller') {
      // Handle seller login
      res.json({ userType: 'seller', message: 'Seller logged in', redirect: '/sellerdashboard', token });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/google', async (req, res) => {
  debugger;
  try {

    const { userType, email, firstName, lastName, googleId } = req.body;

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      // Generate a JWT token with user type information
      const token = jwt.sign({ googleId, userType,email, userId: existingUser._id }, secretKey, { expiresIn: '1h' });




      // Send the response with user type and token
      res.json({ userType: "user", redirect: '/', token });




    }
    else {
      const newUser = new User({
        googleId,
        email,
        userType: 'user',
        firstname: firstName,
        lastname: lastName,

      });
      await newUser.save();



      // Generate a JWT token with user type information
      const token = jwt.sign({googleId, userType,email, userId: newUser._id}, secretKey, { expiresIn: '1h' });






      // Send the response with user type and token

      res.json({ userType: "user", redirect: '/dashboard', token });
    }
  }

  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;



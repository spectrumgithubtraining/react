// userLoginRoutes.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const secretKey = 'your-secret-key';

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Hash the provided password and compare with stored hashedPassword.
    const hashedInputPassword = crypto.createHash('sha256').update(password).digest('hex')
    if (hashedInputPassword !== user.hashedPassword) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id, userType: user.userType }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });   //the first parameter is set to name of the cookie that is token
    //token: The second parameter is the value of the cookie, which is the JWT generated using jwt.sign().


    res.json({ userType: user.userType });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
const password = "868f984b6ce32a7788353c17268b373d46066d1c0cd04156198deea20b2a9941";
const hashedInputPassword = crypto.createHash('sha256').update(password).digest('hex');

console.log(hashedInputPassword);
module.exports = router;

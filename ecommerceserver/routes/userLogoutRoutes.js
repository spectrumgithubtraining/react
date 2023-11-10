// userLogoutRoutes.js
const express = require('express');
const router = express.Router();

// User logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

module.exports = router;

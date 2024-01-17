// // userRegistrationRoutes.js
// const express = require('express');
// const router = express.Router();
// const { User } = require('../models/user');

// // User details route
// router.get('/details/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const existingUser = await User.findOne({ _id:userId });

//     if (existingUser) {
//       return res.status(200).json({ message: 'User Found', user: existingUser });
//     } else {
//       return res.status(400).json({ message: 'No user with that id' });
//     }
//   } catch (error) {
//     console.error('Server error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

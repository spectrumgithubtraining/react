const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());
const {User} = require('../models/user')
const {Payment} = require('../models/payment')
const crypto = require('crypto')

async function verifyRecaptcha(recaptchaResponse) {
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: "6LfhlVkpAAAAAKE7fzOJKnrfQ6DyKRsXILKxrpbg", 
          response: recaptchaResponse,
        },
      }
    );

    return response.data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}

router.post('/submit', async (req, res) => {
  const { email, newPassword, recaptchaToken } = req.body;

  try {
    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
console.log(isRecaptchaValid)
    if (!isRecaptchaValid) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Existing User:", existingUser);
      const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
      existingUser.hashedPassword = hashedPassword;
      await existingUser.save();
      res.json({ success: true, message: "Password change successful" });
    } else {
      console.log("User not found for email:", email);
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error handling password change:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/orderHistory/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const orderHistory = await Payment.find({ userId });
    if (orderHistory.length === 0) {
      // Return 404 if no order history found for the user
      return res.status(404).json({ message: 'No order history found for the user' });
    }
    // Return the order history if found
    res.json(orderHistory);
  
  } catch (error) {
    console.error('Error fetching order history:', error);
    // Return 500 for internal server error
    res.status(500).json({ message: 'Internal server error while fetching order history' });
  }
});


router.get('/userDetails/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userDetails = await User.find({_id:userId });
    if (userDetails.length === 0) {
      // Return 404 if no order history found for the user
      return res.status(404).json({ message: 'No User Found' });
    }
    // Return the order history if found
    res.json(userDetails);
  
  } catch (error) {
    console.error('Error fetching order history:', error);
    // Return 500 for internal server error
    res.status(500).json({ message: 'Internal server error while fetching order history' });
  }
});

router.put('/userDetails/:userId', async (req, res) => {
  const userId = req.params.userId; // Use 'userId' instead of 'productId'
  const updatedUserData = req.body;

  try {
    // Find the user by ID and update the user's fields individually
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedUserData }, // Update user fields
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});





module.exports = router;

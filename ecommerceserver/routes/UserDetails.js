const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());
const {User} = require('../models/user')
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

module.exports = router;

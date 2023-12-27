const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const secretKey = 'your-secret-key'; // Replace with a strong and secret key

const validateToken = async (req, res, next) => {
  console.log('headerToken:', req.headers)
  console.log("cookieToken:", req.cookies);
  try {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Check multiple locations

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, secretKey);
    console.log("decoded : ", decoded);
    // Example: Convert Unix epoch time to a JavaScript Date object
    const issuedAt = new Date(decoded.iat * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const expirationTime = new Date(decoded.exp * 1000);
    console.log("issuedAt", issuedAt);
    console.log('expirationTime', expirationTime);

   // Replace with your actual 'iat' timestamp

    // Convert UTC timestamp to local time
    const issuedAtDate = new Date(issuedAt * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const localIssuedAt = issuedAtDate.toLocaleString(); // Convert to local date and time string

    console.log('Issued At (Local Time):', localIssuedAt);



    const user = await User.findOne({

      _id: decoded.userId,  // Use _id for consistency with Mongoose
      googleId: decoded.googleId || undefined, // Handle optional googleId
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.userId = user._id; // Set req.userId here
    next();
  } catch (error) {
    console.error('Error in validateToken middleware:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = validateToken;

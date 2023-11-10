// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const userRegistrationRoutes = require('./routes/userRegistrationRoutes');
const userLoginRoutes = require('./routes/userLoginRoutes');
const userLogoutRoutes = require('./routes/userRegistrationRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


mongoose.connect('mongodb://0.0.0.0:27017/ecommrceplatform', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const secretKey = 'your-secret-key';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }

    req.user = user;
    next();
  });
};

app.use('/api/user/register', userRegistrationRoutes);
app.use('/api/user/login', userLoginRoutes);
app.use('/api/user/logout', userLogoutRoutes);





app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

// middleware/tokenValidation.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');


const secretKey = 'your-secret-key';

const validateToken = async (req,res,next)=>{
    console.log('Cookies1:', req.cookies);
    // console.log('Body1:', req.body);
    // const token =  req.cookies.token
    // console.log('Token:', token);


    try {
        const token = req.cookies.token;  // Assuming the token is in the request body
        console.log("tokken:",token);
    
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
    
        jwt.verify(token, secretKey, async (err, decoded) => {
          if (err) {
            console.error('Error verifying token:', err);
    
            if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ message: 'Token expired' });
            }
    
            return res.status(401).json({ message: 'Token validation failed' });
          }
    
          try {
            let user;
    
            if (decoded.googleId) {
              user = await User.findOne({ googleId: decoded.googleId });
            } else if (decoded.userId) {
              user = await User.findById(decoded.userId);
            }
    
            if (!user) {
              return res.status(401).json({ message: 'User not found' });
            }
    
            req.user = user;
            next();
          } catch (error) {
            console.error('Error validating token:', error);
            return res.status(500).json({ message: 'Server error' });
          }
        });
      } catch (error) {
        console.error('Error in validateToken middleware:', error);
        return res.status(500).json({ message: 'Server error' });
      }
  // if(!token){
      
    //     return res.status(401).json({message:"Unauthorized"})
    // }
    // else{
    //     jwt.verify(token,secretKey, async(err,decoded)=>{
    //         if(err){
    //             return res.status(401).json({message:"Token validation failed"})
    
    //         }
    //         try{
    //             let user;
            
             
    //             if(decoded.googleId)
                
    //             { 
    //                 user = await User.findOne({ googleId: decoded.googleId });
    
    //             }
    //             else if(decoded.userId){
    //                 user=await User.findById(decoded.userId)
    
    //             }
    
    //             if(!user){
    
    //                 return res.status(401).json({message:"User not found"})
    //             }
    //           req.user= user;
    //           next()
            
    //         }
    //         catch (error) {
    //             console.error('Error validating token:', error);
    //             return res.status(500).json({ message: 'Server error' });
    //           }
    //     })

    // }

    

}
module.exports = validateToken;

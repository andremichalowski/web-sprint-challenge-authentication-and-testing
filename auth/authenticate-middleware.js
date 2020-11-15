/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const {secret} = require('./token.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err){
        res.status(401).json({message: 'Invalid token'});
      }else{
        console.log(decodedToken);
        res.status(200).json({ message: 'Token verified.'})
        req.user = {id: decodedToken.subject};
        next();
      }
    });
  }else{
    res.status(400).json({message: 'No token was provided'});
  }
};

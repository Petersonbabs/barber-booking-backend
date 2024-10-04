import jwt from 'jsonwebtoken';
import BlacklistTokens from '../models/blacklistToken.model.js'
import userModel from '../models/user.model.js';

// Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "You are currently not logged in. Please log in to continue"
    })
    return
  }

  const blacklistedToken = await BlacklistTokens.findOne({ token })
  if (blacklistedToken) {
    res.status(401).json({
      status: "fail",
      message: "Invalid token  supplied. Please login again"
    })
    return
  }
  const decoded = jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if(err){

      if(err.name == 'TokenExpiredError'){
        BlacklistTokens.create(token)
        res.status(403).json({
          status: 'error',
          message: 'Token expired, login again'
        })
        return
      }
      res.status(403).json({
        status: 'error',
        message: 'Invalid token'
      })
      return
    }
  })

  if(!decoded){
    return
  }
    
  const user = await userModel.findById(decoded.id);

  if (!user) {
    res.status(404).json({
      status: "fail",
      message: "Can't find user with the specified token"
    })
    return

  }

  req.user = user;
  next()

};



export const isBarber = async ( req, res, next) => {
  
  if(req.user.role !== 'barber') {
    res.status(403).json({
      status: 'error',
      message: 'Unauthorized! You are not a barber',
    })
    return
  }

  next()

}

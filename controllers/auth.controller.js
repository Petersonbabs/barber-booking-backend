
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Register User
export const register = async (req, res, next) => {
  const { profilePic, name, email, password } = req.body;

  try {

    let user = await User.findOne({ email });
    if(!name || !email || !password){
      res.status(400).json({
        status: 'error',
        message: 'Please complete the form.'
      })
      return
    }
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    user = await User.create(req.body)
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: process.env.jwt_exp });
    res.status(201).json({
      message: 'Restration successful!',
      user,
      token
    })

  } catch (err) {
    console.log(err)
    next(err)
  }
}


// Login Route
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(403).json({
        message: 'Complete the form'
      })
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: process.env.jwt_exp });
    res.status(200).json({
      message: 'login successful',
      user,
      token
    })

  } catch (err) {
    console.log(err)
    next(err)
  }
}

// sign in with google
export const signInWithGoogle = async (req, res, next) => {
  const { email } = req.body

  try {
    // const userExists = await User.findOne({ email })

    // if (userExists) {
    //   const access_token = jwt.sign({ id: userExists._id }, process.env.jwt_secret, { expiresIn: '30d' });
    //   res.status(200).json({
    //     status: 'success',
    //     message: 'login successful!',
    //     user: userExists,
    //     token: access_token
    //   })
    //   return
    // }

    // if (!email) {
    //   res.status(403).json({
    //     status: 'error',
    //     message: 'email not provided.'
    //   })
    //   return
    // }
    const user = await User.create({ password: 'test1234', ...req.body })
    console.log(user)
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'unable to create account.'
      })
      return
    }
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: process.env.jwt_exp });
    res.status(201).json({
      status: 'success',
      message: 'login successful',
      user,
      token
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}





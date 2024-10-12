
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Register User
export const register = async (req, res) => {
  const {phoneNumber, profilePic, name, email} = req.body
 
  try {
   
    let user = await User.findOne({ phoneNumber });
    if(!name || !phoneNumber || !email){
      res.status(400).json({
        status: 'error',
        message: 'Please complete the form.'
      })
      return
    }
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const defaultProfilePic = (await fetch(`https://avatar.iran.liara.run/public/boy?username=${name}`)).url
    user = await User.create({...req.body, profilePic: profilePic || defaultProfilePic || null})
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: process.env.jwt_exp });
    res.status(201).json({
      message: 'Restration successful!',
      user,
      token
    })
    
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error');
  }
}


// Login Route
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '30d' });
    res.status(200).json({
      message: 'login successful',
      user,
      token
    })
    
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error');
  }
}

// sign in with google
export const signInWithGoogle = async (req, res, next) => {
  try {
    const userExists = await User.find({email: req.body.email})
    if(userExists){
      res.status(200).json({
        status: 'success',
        message: 'login successful!',
        user: userExists
      })
      return
    }
    if(!req.body.email){
      res.status(403).json({
        status: 'error',
        message: 'email not provided.'
      })
      return
    }
    const user = await User.create(req.body)
    if(!user){
      res.status(404).json({
        status: 'error',
        message: 'unable to create account.'
      })
      return
    }
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '30d' });
    res.status(201).json({
      status: 'success',
      message: 'login successful',
      user,
      token
    })
  } catch (error) {
    console.log(error)
  }
}





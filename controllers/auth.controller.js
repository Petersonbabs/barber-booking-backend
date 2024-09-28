
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
  const { phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({ phoneNumber }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '1h' });
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





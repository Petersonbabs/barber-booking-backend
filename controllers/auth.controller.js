
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Register User
export const register = async (req, res) => {
  const {phoneNumber} = req.body
 
  try {
    let user = await User.findOne({ phoneNumber });
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





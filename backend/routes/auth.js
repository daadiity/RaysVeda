// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <--- Import jsonwebtoken

// Function to generate a JWT (add this helper function)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '24h', // Token expires in 1 hour (adjust as needed)
  });
};

// Signup (no OTP)
router.post('/signup', async (req, res) => {
  const { name, phone, address, password } = req.body;
  const existing = await User.findOne({ phone });
  if (existing) return res.status(400).json({ success: false, message: 'User already exists' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, phone, address, password: hashed });
    await user.save();

    // Generate token after successful signup
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created',
      token, // <--- Send the token
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
});

// Login (Updated to include _id and JWT in response)
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  // Generate token after successful login
  const token = generateToken(user._id);

  res.json({
    success: true,
    token, // <--- Send the token
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      address: user.address,
    },
  });
});

module.exports = router;
// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login route - accepts email OR phone
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received');
    console.log('Request body:', { 
      email: req.body.email, 
      phone: req.body.phone,
      hasPassword: !!req.body.password 
    });

    const { email, phone, password } = req.body;

    // Enhanced validation - require either email OR phone
    if ((!email && !phone) || !password) {
      console.log('Missing credentials - Email:', !!email, 'Phone:', !!phone, 'Password:', !!password);
      return res.status(400).json({
        success: false,
        message: 'Please provide (email or phone number) and password'
      });
    }

    if (typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Password must be provided'
      });
    }

    // Build query to find user by email OR phone
    let userQuery = {};
    let identifier = '';

    if (email) {
      // Validate email format
      if (!email.includes('@')) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }
      const normalizedEmail = email.trim().toLowerCase();
      
      // Try multiple email queries to handle different storage formats
      userQuery = {
        $or: [
          { email: normalizedEmail },
          { email: email.trim() }, // Original case
          { email: email.toLowerCase() }, // Just lowercase
          { email: email } // Exact match
        ]
      };
      identifier = normalizedEmail;
      console.log('Looking for user with email variations:', normalizedEmail);
    } else if (phone) {
      // Validate and normalize phone
      const cleanPhone = phone.replace(/\D/g, ''); // Remove non-digits
      if (cleanPhone.length < 10) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid phone number'
        });
      }
      
      // Try multiple phone formats
      userQuery = {
        $or: [
          { phone: cleanPhone },
          { phone: phone.trim() },
          { phone: phone }
        ]
      };
      identifier = cleanPhone;
      console.log('Looking for user with phone variations:', cleanPhone);
    }

    // Check if user exists
    // const user = await User.findOne(userQuery);
    const user = await User.findOne(userQuery).select("+password");

    console.log('User query:', JSON.stringify(userQuery));
    console.log('User found:', user ? `Yes (${user.email})` : 'No');

    if (!user) {
      console.log('User not found with identifier:', identifier);
      return res.status(401).json({
        success: false,
        message: 'Invalid email/phone or password'
      });
    }

    console.log('User found:', user.email || user.phone);

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', identifier);
      return res.status(401).json({
        success: false,
        message: 'Invalid email/phone or password'
      });
    }

    console.log('Password valid for user:', identifier);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );

    console.log('Login successful for user:', identifier);

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Register route (ensure phone is stored properly)
router.post('/register', async (req, res) => {
  try {
    console.log('Register request received');
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    // Normalize email and phone
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPhone = phone ? phone.replace(/\D/g, '') : null;

    // Check if user already exists with email or phone
    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        ...(cleanPhone ? [{ phone: cleanPhone }] : [])
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone number'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      phone: cleanPhone
    });

    await user.save();
    console.log('User created successfully:', normalizedEmail);

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
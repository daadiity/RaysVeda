const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Enhanced login route with email/phone flexibility
router.post('/login', async (req, res) => {
  try {
    console.log('=== LOGIN REQUEST ===');
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);

    const { emailOrPhone, password } = req.body;

    // Validate input
    if (!emailOrPhone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email/Phone and password are required'
      });
    }

    const inputValue = emailOrPhone.trim();
    let user;

    // Check if input is email or phone
    const isEmail = inputValue.includes('@');
    
    if (isEmail) {
      console.log('🔍 Searching by email:', inputValue);
      user = await User.findOne({ 
        email: inputValue.toLowerCase() 
      });
    } else {
      // Handle phone number - normalize different formats
      console.log('🔍 Searching by phone:', inputValue);
      
      // Remove all non-digit characters
      let normalizedPhone = inputValue.replace(/\D/g, '');
      
      // Handle different phone formats
      const phoneVariations = [];
      
      // If starts with 91, use as is
      if (normalizedPhone.startsWith('91')) {
        phoneVariations.push(normalizedPhone);
        phoneVariations.push(normalizedPhone.substring(2)); // Remove country code
      }
      // If 10 digits, add variations
      else if (normalizedPhone.length === 10) {
        phoneVariations.push(normalizedPhone);
        phoneVariations.push(`91${normalizedPhone}`);
        phoneVariations.push(`+91${normalizedPhone}`);
      }
      // If starts with 0, remove it
      else if (normalizedPhone.startsWith('0') && normalizedPhone.length === 11) {
        const withoutZero = normalizedPhone.substring(1);
        phoneVariations.push(withoutZero);
        phoneVariations.push(`91${withoutZero}`);
        phoneVariations.push(`+91${withoutZero}`);
        phoneVariations.push(normalizedPhone); // Also try with zero
      }
      // Add original input
      phoneVariations.push(inputValue);
      
      console.log('Phone variations to search:', phoneVariations);
      
      // Search with all phone variations
      user = await User.findOne({
        phone: { $in: phoneVariations }
      });
    }

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ User found:', user.email);

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Password validated');

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        phone: user.phone
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address
      }
    });

    console.log('✅ Login successful for:', user.email);

  } catch (error) {
    console.error('🚨 Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Keep existing register route...
router.post('/register', async (req, res) => {
  try {
    console.log('=== REGISTRATION REQUEST ===');
    console.log('Request body:', req.body);

    const { name, email, phone, address, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and password are required'
      });
    }

    // Normalize email and phone
    const normalizedEmail = email.toLowerCase().trim();
    let normalizedPhone = phone.replace(/\D/g, '');
    
    // Remove leading zero if present
    if (normalizedPhone.startsWith('0') && normalizedPhone.length === 11) {
      normalizedPhone = normalizedPhone.substring(1);
    }
    
    // Remove country code if present
    if (normalizedPhone.startsWith('91') && normalizedPhone.length === 12) {
      normalizedPhone = normalizedPhone.substring(2);
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { phone: normalizedPhone },
        { phone: `91${normalizedPhone}` },
        { phone: `+91${normalizedPhone}` }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone number'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      phone: normalizedPhone, // Store normalized phone
      address: address?.trim() || '',
      password: hashedPassword
    });

    await newUser.save();

    console.log('✅ User registered successfully:', normalizedEmail);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
      }
    });

  } catch (error) {
    console.error('🚨 Registration error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
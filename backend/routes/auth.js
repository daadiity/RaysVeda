// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { sendWelcomeEmail } = require('../services/emailService'); // Add this import
// const router = express.Router();

// // Enhanced login route with email/phone flexibility
// router.post('/login', async (req, res) => {
//   try {
//     console.log('=== LOGIN REQUEST ===');
//     console.log('Request body:', req.body);
//     console.log('Content-Type:', req.headers['content-type']);

//     const { emailOrPhone, password } = req.body;


//     // Validate input

//     if (!emailOrPhone || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email/Phone and password are required'
//       });
//     }


//     const inputValue = emailOrPhone.trim();

//     let user;

//     if (emailOrPhone.includes('@')) {
//       console.log('🔍 Searching by email:', emailOrPhone);
//       // IMPORTANT: Explicitly select password field
//       user = await User.findOne({ email: emailOrPhone }).select('+password');
//     } else {
//       console.log('🔍 Searching by phone:', emailOrPhone);

//       const phoneVariations = [
//         emailOrPhone,
//         emailOrPhone.startsWith('+91') ? emailOrPhone : `+91${emailOrPhone}`,
//         emailOrPhone.startsWith('+91') ? emailOrPhone.slice(3) : emailOrPhone,
//         emailOrPhone.replace(/^\+91/, ''),
//         emailOrPhone.replace(/^91/, ''),
//         emailOrPhone.length === 10 ? `+91${emailOrPhone}` : emailOrPhone,
//         emailOrPhone.startsWith('0') ? emailOrPhone.slice(1) : emailOrPhone,
//         emailOrPhone.startsWith('0') ? `+91${emailOrPhone.slice(1)}` : emailOrPhone
//       ];

//       console.log('📱 Phone variations:', phoneVariations);
//       // IMPORTANT: Explicitly select password field
//       user = await User.findOne({
//         phone: { $in: phoneVariations }
//       }).select('+password');
//     }


//     // Build query to find user by email OR phone
//     let userQuery = {};
//     let identifier = '';

//     if (emailorPhone) {
//       // Validate email format
//       if (!emailorPhone.includes('@')) {
//         return res.status(400).json({
//           success: false,
//           message: 'Please provide a valid email address'
//         });
//       }
//       const normalizedEmail = email.trim().toLowerCase();

//       // Try multiple email queries to handle different storage formats
//       userQuery = {
//         $or: [
//           { email: normalizedEmail },
//           { email: email.trim() }, // Original case
//           { email: email.toLowerCase() }, // Just lowercase
//           { email: email } // Exact match
//         ]
//       };
//       identifier = normalizedEmail;
//       console.log('Looking for user with email variations:', normalizedEmail);
//     } else if (phone) {
//       // Validate and normalize phone
//       const cleanPhone = phone.replace(/\D/g, ''); // Remove non-digits
//       if (cleanPhone.length < 10) {
//         return res.status(400).json({
//           success: false,
//           message: 'Please provide a valid phone number'
//         });
//       }

//       // Try multiple phone formats
//       userQuery = {
//         $or: [
//           { phone: cleanPhone },
//           { phone: phone.trim() },
//           { phone: phone }
//         ]
//       };
//       identifier = cleanPhone;
//       console.log('Looking for user with phone variations:', cleanPhone);
//     }

//     // Check if user exists
//     // const user = await User.findOne(userQuery);
//     const foundUser = await User.findOne(userQuery).select("+password");

//     console.log('User query:', JSON.stringify(userQuery));
//     console.log('User found:', foundUser ? `Yes (${foundUser.email})` : 'No');


//     if (!foundUser) {
//       console.log('❌ User not found');
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     console.log('✅ User found:', foundUser.email);

//     console.log('🔐 Password check:', {
//       hasPassword: !!foundUser.password,
//       passwordType: typeof foundUser.password,
//       passwordLength: foundUser.password ? foundUser.password.length : 0
//     });

//     // Check if password exists
//     if (!foundUser.password) {
//       console.log('❌ User password is missing from database');
//       return res.status(401).json({
//         success: false,
//         message: 'Account setup incomplete. Please contact support.'
//       });
//     }

//     const isValidPassword = await bcrypt.compare(password, foundUser.password);
//     if (!isValidPassword) {
//       console.log('❌ Invalid password');
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     console.log('✅ Password validated');

//     const token = jwt.sign(
//       {
//         userId: foundUser._id,
//         email: foundUser.email,
//         role: foundUser.role || 'user'
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     console.log('✅ Login successful for:', foundUser.email);

//     res.json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: {
//         id: foundUser._id,
//         name: foundUser.name,
//         email: foundUser.email,
//         phone: foundUser.phone,
//         role: foundUser.role || 'user'
//       }
//     });

//     console.log('✅ Login successful for:', foundUser.email);

//   } catch (error) {
//     console.error('🚨 Login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during login'
//     });
//   }
// });


// // Updated register route with email

// router.post('/register', async (req, res) => {
//   try {
//     console.log('=== REGISTRATION REQUEST ===');
//     console.log('Request body:', req.body);

//     const { name, email, phone, address, password } = req.body;

//     // Validate required fields
//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, email, phone, and password are required'
//       });
//     }

//     // Normalize email and phone
//     const normalizedEmail = email.toLowerCase().trim();
//     let normalizedPhone = phone.replace(/\D/g, '');

//     // Remove leading zero if present
//     if (normalizedPhone.startsWith('0') && normalizedPhone.length === 11) {
//       normalizedPhone = normalizedPhone.substring(1);
//     }

//     // Remove country code if present
//     if (normalizedPhone.startsWith('91') && normalizedPhone.length === 12) {
//       normalizedPhone = normalizedPhone.substring(2);
//     }

//     // Always store phone with +91 prefix for consistency
//     if (normalizedPhone.length === 10) {
//       normalizedPhone = `+91${normalizedPhone}`;
//     } else if (normalizedPhone.length === 12 && normalizedPhone.startsWith('91')) {
//       normalizedPhone = `+${normalizedPhone}`;
//     } else if (!normalizedPhone.startsWith('+91')) {
//       normalizedPhone = `+91${normalizedPhone}`;
//     }
//     // Check if user already exists
//     const existingUser = await User.findOne({
//       $or: [
//         { email: normalizedEmail },
//         { phone: normalizedPhone },
//         { phone: `91${normalizedPhone}` },
//         { phone: `+91${normalizedPhone}` }
//       ]
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists with this email or phone number'
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Create new user
//     const newUser = new User({
//       name: name.trim(),
//       email: normalizedEmail,
//       phone: normalizedPhone,
//       address: address?.trim() || '',
//       password: hashedPassword
//     });

//     await newUser.save();

//     console.log('✅ User registered successfully:', normalizedEmail);

//     // 📧 SEND WELCOME EMAIL
//     try {
//       const emailResult = await sendWelcomeEmail(normalizedEmail, name.trim());
//       if (emailResult.success) {
//         console.log('✅ Welcome email sent to:', normalizedEmail);
//       } else {
//         console.error('❌ Failed to send welcome email:', emailResult.error);
//       }
//     } catch (emailError) {
//       console.error('❌ Email sending error:', emailError);
//       // Don't fail registration if email fails
//     }

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully! Welcome email sent.',

//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         phone: newUser.phone
//       }
//     });

//   } catch (error) {
//     console.error('🚨 Registration error:', error);
//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists with this email or phone'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Server error during registration',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { sendWelcomeEmail } = require('../services/emailService'); // Add this import

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

    if (emailOrPhone.includes('@')) {
      console.log('🔍 Searching by email:', emailOrPhone);
      // IMPORTANT: Explicitly select password field
      user = await User.findOne({ email: emailOrPhone }).select('+password');
    } else {
      console.log('🔍 Searching by phone:', emailOrPhone);
      
      const phoneVariations = [
        emailOrPhone,
        emailOrPhone.startsWith('+91') ? emailOrPhone : `+91${emailOrPhone}`,
        emailOrPhone.startsWith('+91') ? emailOrPhone.slice(3) : emailOrPhone,
        emailOrPhone.replace(/^\+91/, ''),
        emailOrPhone.replace(/^91/, ''),
        emailOrPhone.length === 10 ? `+91${emailOrPhone}` : emailOrPhone,
        emailOrPhone.startsWith('0') ? emailOrPhone.slice(1) : emailOrPhone,
        emailOrPhone.startsWith('0') ? `+91${emailOrPhone.slice(1)}` : emailOrPhone
      ];

      console.log('📱 Phone variations:', phoneVariations);
      // IMPORTANT: Explicitly select password field
      user = await User.findOne({ 
        phone: { $in: phoneVariations } 
      }).select('+password');
    }


    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ User found:', user.email);

    console.log('🔐 Password check:', {
      hasPassword: !!user.password,
      passwordType: typeof user.password,
      passwordLength: user.password ? user.password.length : 0
    });

    // Check if password exists
    if (!user.password) {
      console.log('❌ User password is missing from database');
      return res.status(401).json({
        success: false,
        message: 'Account setup incomplete. Please contact support.'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('❌ Invalid password');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Password validated');

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role || 'user'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for:', user.email);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role || 'user'
      }
    });

    console.log('✅ Login successful for:', user.email);

  } catch (error) {
    console.error('🚨 Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});


// Updated register route with email

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

    // Always store phone with +91 prefix for consistency
    if (normalizedPhone.length === 10) {
      normalizedPhone = `+91${normalizedPhone}`;
    } else if (normalizedPhone.length === 12 && normalizedPhone.startsWith('91')) {
      normalizedPhone = `+${normalizedPhone}`;
    } else if (!normalizedPhone.startsWith('+91')) {
      normalizedPhone = `+91${normalizedPhone}`;
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
      phone: normalizedPhone,
      address: address?.trim() || '',
      password: hashedPassword
    });

    await newUser.save();

    console.log('✅ User registered successfully:', normalizedEmail);

    // 📧 SEND WELCOME EMAIL
    try {
      const emailResult = await sendWelcomeEmail(normalizedEmail, name.trim());
      if (emailResult.success) {
        console.log('✅ Welcome email sent to:', normalizedEmail);
      } else {
        console.error('❌ Failed to send welcome email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      // Don't fail registration if email fails
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully! Welcome email sent.',

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
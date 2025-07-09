const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');
const { sendWelcomeEmail, sendBookingConfirmationEmail } = require('../services/emailService');

const router = express.Router();

// Generate random password
const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Create booking route
router.post('/create', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gotra,
      poojaType,
      preferredDate,
      preferredTime,
      specialRequests,
      amount
    } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    let isNewUser = false;
    let tempPassword = '';

    if (!user) {
      // Create new user with temporary password
      tempPassword = generateRandomPassword();
      user = new User({
        fullName,
        email,
        password: tempPassword,
        phoneNumber,
        dateOfBirth: new Date(dateOfBirth),
        gotra,
        isTemporaryPassword: true
      });
      await user.save();
      isNewUser = true;
    }

    // Create booking
    const booking = new Booking({
      user: user._id,
      fullName,
      phoneNumber,
      dateOfBirth: new Date(dateOfBirth),
      gotra,
      poojaType,
      preferredDate: new Date(preferredDate),
      preferredTime,
      specialRequests: specialRequests || '',
      amount: amount || 0,
      status: 'pending',
      paymentStatus: 'pending'
    });

    await booking.save();

    // Send emails
    try {
      if (isNewUser) {
        await sendWelcomeEmail(email, fullName, tempPassword);
      }
      
      await sendBookingConfirmationEmail(email, fullName, {
        poojaType,
        preferredDate,
        preferredTime,
        gotra,
        specialRequests
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        poojaType: booking.poojaType,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        status: booking.status
      },
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isNewUser,
        isTemporaryPassword: user.isTemporaryPassword
      }
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
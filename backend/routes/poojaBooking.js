const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const PoojaBooking = require('../models/PoojaBooking');
const { protect } = require('../middleware/authMiddleware');

console.log('PoojaBooking module loaded (from poojaBooking.js).');
console.log('Type of PoojaBooking (from poojaBooking.js):', typeof PoojaBooking);

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Booking endpoint - PROTECTED ROUTE
router.post('/book-pooja', protect, async (req, res) => {
  console.log("Request body:", req.body);
  console.log("User from middleware:", req.user);

  const { name, gotra, address, phone, poojaType, email, date, time, amount } = req.body;

  console.log('Attempting to create new PoojaBooking instance...');
  console.log('User ID from authenticated request:', req.user ? req.user._id : 'User not authenticated');

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized: User ID not found in request. Please log in.' 
      });
    }

    // Validate required fields
    if (!name || !phone || !poojaType || !email || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, phone, poojaType, email, date, time'
      });
    }

    // Validate amount
    const bookingAmount = amount || 500;
    if (bookingAmount < 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    const booking = new PoojaBooking({
      user: req.user._id,
      name,
      gotra: gotra || '',
      address,
      phone,
      poojaType,
      email,
      date,
      time,
      amount: bookingAmount,
      paymentStatus: 'pending'
    });

    await booking.save();
    console.log('PoojaBooking saved successfully:', booking._id);

    // Create Razorpay order with dynamic amount
    const options = {
      amount: bookingAmount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_order_${booking._id}`,
      payment_capture: 1,
      notes: {
        bookingId: booking._id.toString(),
        name,
        gotra: gotra || '',
        address,
        phone,
        poojaType,
        email,
        date,
        time
      }
    };

    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order.id);

    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: options.amount,
      currency: options.currency,
      bookingId: booking._id,
      key: process.env.RAZORPAY_KEY_ID,
      message: 'Pooja booking initiated successfully, awaiting payment.'
    });

  } catch (error) {
    console.error('Error in /book-pooja route:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error: Booking failed', 
      error: error.message 
    });
  }
});

// Payment verification endpoint
router.post('/verify-payment', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    // Update booking status to paid
    const booking = await PoojaBooking.findByIdAndUpdate(
      bookingId,
      { 
        paymentStatus: 'paid',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      booking
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
});

// Get user bookings
router.get('/bookings', protect, async (req, res) => {
  try {
    const bookings = await PoojaBooking.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// Public booking route (if needed)
router.post('/book', async (req, res) => {
  const { user, name, gotra, address, phone, poojaType, email, date, time, amount } = req.body;

  console.log('=== PUBLIC BOOKING REQUEST ===');
  console.log('Request body:', req.body);

  try {
    // Validate required fields
    if (!name || !phone || !poojaType || !email || !date || !time) {
      console.log('Missing fields validation failed');
      console.log('name:', name);
      console.log('phone:', phone);
      console.log('poojaType:', poojaType);
      console.log('email:', email);
      console.log('date:', date);
      console.log('time:', time);
      
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, phone, poojaType, email, date, time'
      });
    }

    // Validate amount
    const bookingAmount = amount || 1101;
    if (bookingAmount < 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    console.log('Creating booking with amount:', bookingAmount);

    const booking = new PoojaBooking({
      user: user || null, // Save user ID if provided
      name,
      gotra: gotra || '',
      address,
      phone,
      poojaType,
      email,
      date,
      time,
      amount: bookingAmount,
      paymentStatus: 'pending'
    });

    await booking.save();
    console.log('✅ PoojaBooking saved successfully:', booking._id);

    // Create Razorpay order with dynamic amount
    const options = {
      amount: bookingAmount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_order_${booking._id}`,
      payment_capture: 1,
      notes: {
        bookingId: booking._id.toString(),
        name,
        gotra: gotra || '',
        address,
        phone,
        poojaType,
        email,
        date,
        time
      }
    };

    const order = await razorpay.orders.create(options);
    console.log('✅ Razorpay order created:', order.id);

    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: options.amount,
      currency: options.currency,
      bookingId: booking._id,
      key: process.env.RAZORPAY_KEY_ID,
      message: 'Pooja booking initiated successfully, awaiting payment.'
    });

  } catch (error) {
    console.error('❌ Error in /book route:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error: Booking failed', 
      error: error.message 
    });
  }
});

// Get user bookings by user ID
router.get('/bookings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('=== FETCHING USER BOOKINGS ===');
    console.log('User ID:', userId);

    // Find bookings by user ID
    const bookings = await PoojaBooking.find({ user: userId })
      .sort({ createdAt: -1 });

    console.log('Found bookings:', bookings.length);

    res.json({
      success: true,
      bookings,
      count: bookings.length
    });

  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// Get bookings for logged-in user by email
router.get('/my-bookings', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Decode token to get user info
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    console.log('=== FETCHING BOOKINGS BY EMAIL ===');
    console.log('User email:', userEmail);

    // Find bookings by email
    const bookings = await PoojaBooking.find({ email: userEmail })
      .sort({ createdAt: -1 });

    console.log('Found bookings by email:', bookings.length);

    res.json({
      success: true,
      bookings,
      count: bookings.length
    });

  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

module.exports = router;
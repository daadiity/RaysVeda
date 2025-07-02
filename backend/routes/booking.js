const express = require('express');
const router = express.Router();
const PoojaBooking = require('../models/PoojaBooking');
const { protect } = require('../middleware/authMiddleware');

// Get bookings for a user - REAL DATABASE ONLY
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  
  console.log('=== BOOKING FETCH REQUEST ===');
  console.log('Fetching bookings for user:', userId);
  console.log('Authorization header:', req.headers.authorization);
  
  try {
    // Fetch from database using different possible user field variations
    const bookings = await PoojaBooking.find({
      $or: [
        { user: userId },
        { userId: userId },
        { 'user._id': userId },
        { 'user.id': userId }
      ]
    }).sort({ createdAt: -1 });
    
    console.log('Database bookings found:', bookings.length);
    
    // Return actual database bookings (empty array if none found)
    res.json({ 
      success: true, 
      bookings: bookings,
      count: bookings.length,
      source: 'database'
    });
    
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: err.message
    });
  }
});

// Get bookings for a user - PROTECTED VERSION (when authentication is ready)
router.get('/user/:userId/protected', protect, async (req, res) => {
  const { userId } = req.params;
  
  console.log('Protected route - Fetching bookings for user:', userId);
  console.log('Authenticated user:', req.user._id);
  
  // Security check: ensure user can only access their own bookings
  if (req.user._id.toString() !== userId) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. You can only view your own bookings.' 
    });
  }
  
  try {
    const bookings = await PoojaBooking.find({ user: userId }).sort({ createdAt: -1 });
    console.log('Protected route - Found bookings:', bookings.length);
    
    res.json({ 
      success: true, 
      bookings,
      count: bookings.length,
      source: 'protected_database'
    });
  } catch (err) {
    console.error('Protected route - Error fetching bookings:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching bookings', 
      error: err.message 
    });
  }
});

// Get a specific booking by ID
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching booking by ID:', req.params.id);
    
    const booking = await PoojaBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      booking,
      source: 'database'
    });
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking details',
      error: err.message
    });
  }
});

// Get a specific booking by ID - PROTECTED VERSION
router.get('/:id/protected', protect, async (req, res) => {
  try {
    const booking = await PoojaBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Security check: ensure user can only access their own booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    res.json({
      success: true,
      booking,
      source: 'protected_database'
    });
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking details',
      error: err.message
    });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    console.log('Creating new booking:', req.body);
    
    const booking = new PoojaBooking(req.body);
    const savedBooking = await booking.save();
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: savedBooking
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: err.message
    });
  }
});

// Get all bookings (admin route)
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all bookings');
    
    const bookings = await PoojaBooking.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      bookings,
      count: bookings.length,
      source: 'database'
    });
  } catch (err) {
    console.error('Error fetching all bookings:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: err.message
    });
  }
});

// Health check endpoint
router.get('/health/check', (req, res) => {
  res.json({
    success: true,
    message: 'Booking service is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
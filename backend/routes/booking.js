const express = require('express');
const router = express.Router();
const PoojaBooking = require('../models/PoojaBooking');
const { protect } = require('../middleware/authMiddleware'); // Add this import

// Get bookings for a user - MAKE IT PROTECTED
router.get('/user/:userId', protect, async (req, res) => {
  const { userId } = req.params;
  
  console.log('Fetching bookings for user:', userId);
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
    console.log('Found bookings:', bookings.length);
    
    res.json({ 
      success: true, 
      bookings,
      count: bookings.length 
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

// Get a specific booking by ID - PROTECTED
router.get('/:id', protect, async (req, res) => {
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
      booking
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

module.exports = router;
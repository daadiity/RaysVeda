const express = require('express');
const router = express.Router();
const PoojaBooking = require('../models/PoojaBooking'); // CHANGE: Import PoojaBooking instead of Booking

// Get bookings for a user (CHANGED to use PoojaBooking model)
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }
  try {
    // CHANGE: Find bookings in the PoojaBooking collection, where the 'user' field matches the userId
    const bookings = await PoojaBooking.find({ user: userId });
    res.json({ success: true, bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ success: false, message: 'Error fetching bookings', error: err.message });
  }
});

// IMPORTANT: If you have other routes in booking.js that genuinely refer to a separate 'Booking' model,
// you might need to keep that model and its routes separate, or consolidate your booking logic.
// For the purpose of showing PoojaBookings on the dashboard, this change is necessary.

module.exports = router;
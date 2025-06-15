const express = require('express');
const {
  adminLogin,
  getAllUsers,
  deleteUser,
  getAllBookings,
  deleteBooking,
  getDashboardStats,
} = require('../controllers/admin.controller');
const { verifyAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/users', verifyAdmin, getAllUsers);
router.delete('/users/:id', verifyAdmin, deleteUser);
router.get('/bookings', verifyAdmin, getAllBookings);
router.delete('/bookings/:id', verifyAdmin, deleteBooking);
router.get('/dashboard-stats', verifyAdmin, getDashboardStats);

module.exports = router;

// This file defines the routes for admin-related operations.
// It imports the necessary modules and sets up a route for admin login.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const poojaBookingRoutes = require('./routes/poojaBooking');
const webhookRoute = require('./routes/webhook');
const authRoutes = require('../routes/auth');
const bookingRoutes = require('../routes/booking');

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Webhook route with raw body parser (must come BEFORE /api)
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRoute);

// All other API routes
app.use('/api', poojaBookingRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Booking Dashboard routes
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
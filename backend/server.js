require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const poojaBookingRoutes = require('./routes/poojaBooking');
const numerologyRoutes = require('./routes/numerologyRoutes'); // Import numerology routes

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Stripe webhook needs raw body
app.use('/api/webhook', express.raw({type: 'application/json'}));
app.use('/api', poojaBookingRoutes);
app.use('/api/numerology', numerologyRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


// Request logging middleware (only in development)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    if (req.method === 'POST' && req.path === '/api/auth/login') {
      console.log('Login request body keys:', Object.keys(req.body));
      console.log('Content-Type:', req.headers['content-type']);
    }
    next();
  });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/raysveda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes AFTER middleware setup
try {
  const authRoutes = require('./routes/auth');
  const poojaBookingRoutes = require('./routes/poojaBooking');
  const bookingRoutes = require('./routes/booking'); // Add this line
  const kundliRoutes = require('./routes/kundli'); // Add this import with other route imports

  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/pooja', poojaBookingRoutes);
  app.use('/api/bookings', bookingRoutes); // Add this line
  app.use('/api/kundli', kundliRoutes); // Add this route registration with other routes
 
  //Numerology route
  app.use('/api/numerology', require('./routes/numerologyRoutes'));


  console.log('Routes loaded successfully');
  console.log('Auth routes available at: /api/auth/register, /api/auth/login');
  console.log('Booking routes available at: /api/bookings/*'); // Add this line
} catch (error) {
  console.error('Error loading routes:', error);
}

// Serve static files (uploads)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Admin routes
// app.use("/api/admin", require("./routes/admin"));
// app.use("/api/admin/users", require("./routes/users"));
// app.use("/api/admin/bookings", require("./routes/bookings"));
// app.use("/api/admin/poojas", require("./routes/poojas"));
// app.use("/api/admin/reports", require("./routes/reports"));
// app.use("/api/admin/notifications", require("./routes/notifications"));
// app.use("/api/admin/settings", require("./routes/settings"));
// app.use("/api/admin/dashboard", require("./routes/dashboard"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});


// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS enabled for: ${corsOptions.origin.join(', ')}`);
});

module.exports = app;
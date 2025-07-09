const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser"); // ✅ Added

// Load environment variables
dotenv.config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Stripe Webhook (must be before any body parser)
const webhookRoute = require('./routes/webhook');
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRoute);


// Body parser middleware (after Stripe raw parser)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json());

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

// Serve static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Main routes
app.use('/api/numerology', require('./routes/numerologyRoutes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/poojaBooking'));
app.use('/api/bookings', require('./routes/booking'));
app.use("/api/pooja", require("./routes/poojaBooking"));


// Admin routes
app.use("/api/admin", require("./routes/admin"));
app.use("/api/admin/users", require("./routes/users"));
app.use("/api/admin/bookings", require("./routes/bookings"));
app.use("/api/admin/poojas", require("./routes/poojas"));
app.use("/api/admin/reports", require("./routes/reports"));
app.use("/api/admin/notifications", require("./routes/notifications"));
app.use("/api/admin/settings", require("./routes/settings"));
app.use("/api/admin/dashboard", require("./routes/dashboard"));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  });
});


// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
});


// Server start
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔓 CORS enabled for: ${corsOptions.origin.join(', ')}`);
});

module.exports = app;
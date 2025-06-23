const dotenv = require("dotenv");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

// Load environment variables
dotenv.config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Serve static files (for uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/numerology', require('./routes/numerologyRoutes'));
app.use('/api/auth', require('./routes/auth'));
// app.use('/api', require('./routes/poojaBooking'));

// Admin Routes
app.use("/api/admin", require("./routes/admin"))
app.use("/api/admin/users", require("./routes/users"))
app.use("/api/admin/bookings", require("./routes/bookings"))
app.use("/api/admin/poojas", require("./routes/poojas"))
app.use("/api/admin/reports", require("./routes/reports"))
app.use("/api/admin/notifications", require("./routes/notifications"))
app.use("/api/admin/settings", require("./routes/settings"))
app.use("/api/admin/dashboard", require("./routes/dashboard"))

// Import the webhook route
const webhookRoute = require('./routes/webhook'); // Import the webhook route

// 🟡 Must be BEFORE JSON parsing (Stripe webhook)
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRoute);

// ✅ JSON Body Parser (after raw)
app.use(bodyParser.json());

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error)
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const mongoose = require('mongoose');

const poojaBookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false  // Changed from true to false to allow bookings without user
  },
  name: { type: String, required: true },
  gotra: { type: String },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  poojaType: { type: String, required: true },
  email: { type: String, required: true },
  date: String,   
  time: String,
  amount: Number,
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, { timestamps: true });

// This is the crucial line for robust model export
module.exports = mongoose.models.PoojaBooking || mongoose.model('PoojaBooking', poojaBookingSchema);
const mongoose = require('mongoose');

const poojaBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gotra: { type: String },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  poojaType: { type: String, required: true },
  email: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('PoojaBooking', poojaBookingSchema);
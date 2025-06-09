const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  poojaType: { type: String, required: true },
  date: { type: Date, required: true },
  address: { type: String },
  paymentStatus: { type: String, default: 'Pending' } // "Pending" or "Success"
});

module.exports = mongoose.model('Booking', bookingSchema);
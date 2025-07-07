const mongoose = require('mongoose');

const numerologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ['Life Path Analysis', 'Name Numerology', 'Compatibility Check'],
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Numerology', numerologySchema);
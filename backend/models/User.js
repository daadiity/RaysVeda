const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // <-- unique email
  password: { type: String, required: true }, // hashed password
});

module.exports = mongoose.model('User', userSchema);
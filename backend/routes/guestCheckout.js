// backend/routes/guestCheckout.js

const express = require("express");
const router = express.Router();
const {
  handleGuestCheckout,
  confirmPayment,
} = require("../controllers/guestCheckout.controller");

// Guest checkout for puja
router.post("/guest-checkout", handleGuestCheckout);

// Razorpay payment confirmation
router.post("/confirm-payment", confirmPayment);

module.exports = router;

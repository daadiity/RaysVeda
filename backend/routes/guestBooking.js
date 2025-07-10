// const express = require("express");
// const router = express.Router();
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const User = require("../models/User");
// const PoojaBooking = require("../models/PoojaBooking");
// const { sendWelcomeEmail } = require("../services/emailService");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// // Route: POST /api/guest-checkout
// router.post("/guest-checkout", async (req, res) => {
//   const { name, email, phone, pujaId, pujaTitle, amount } = req.body;

//   try {
//     // 1. Check if user already exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       const tempPassword = Math.random().toString(36).slice(-8);
//       user = await User.create({
//         name,
//         email,
//         phone,
//         password: tempPassword,
//       });

//       await sendWelcomeEmail(email, name, tempPassword); // Modified version sends temp password
//     }

//     // 2. Create new booking (status: pending)
//     const booking = await PoojaBooking.create({
//       user: user._id,
//       puja: pujaId,
//       amount,
//       status: "pending",
//     });

//     // 3. Create Razorpay order
//     const razorOrder = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `rv_guest_${booking._id}`,
//       notes: {
//         userId: user._id.toString(),
//         bookingId: booking._id.toString(),
//         pujaTitle,
//       },
//     });

//     res.json({
//       razorOrderId: razorOrder.id,
//       bookingId: booking._id,
//     });
//   } catch (err) {
//     console.error("Guest checkout error:", err);
//     res.status(500).json({ error: "Guest checkout failed" });
//   }
// });

// // Route: POST /api/confirm-payment
// router.post("/confirm-payment", async (req, res) => {
//   const {
//     razorpay_payment_id,
//     razorpay_order_id,
//     razorpay_signature,
//     bookingId,
//   } = req.body;

//   try {
//     // 1. Verify Razorpay signature
//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ error: "Invalid payment signature" });
//     }

//     // 2. Update booking status
//     await PoojaBooking.findByIdAndUpdate(bookingId, {
//       status: "confirmed",
//       paymentId: razorpay_payment_id,
//       razorpayOrderId: razorpay_order_id,
//     });

//     res.json({ success: true });
//   } catch (err) {
//     console.error("Payment confirmation error:", err);
//     res.status(500).json({ error: "Payment confirmation failed" });
//   }
// });

// module.exports = router;

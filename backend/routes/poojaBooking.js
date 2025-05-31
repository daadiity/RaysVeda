const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
const PoojaBooking = require('../models/PoojaBooking');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Booking endpoint
router.post('/book-pooja', async (req, res) => {
  const { name, gotra, address, phone, poojaType, email } = req.body;

  // Save booking data to MongoDB
  const booking = new PoojaBooking({ name, gotra, address, phone, poojaType, email, paymentStatus: 'pending' });
  await booking.save();

  try {
    // Create Razorpay order
    const options = {
      amount: 50000, // amount in paise (₹500)
      currency: "INR",
      receipt: `receipt_order_${booking._id}`,
      payment_capture: 1,
      notes: {
        bookingId: booking._id.toString(),
        name,
        gotra,
        address,
        phone,
        poojaType,
        email
      }
    };
    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      bookingId: booking._id,
      name,
      email,
      poojaType
    });
  } catch (err) {
    res.status(500).json({ error: 'Payment order creation failed.' });
  }
});

// Razorpay webhook for payment success
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  // You should verify the webhook signature here for security (see Razorpay docs)
  const event = req.body && JSON.parse(req.body.toString());

  if (event && event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;
    const bookingId = payment.notes && payment.notes.bookingId;

    // Update booking as paid
    await PoojaBooking.findByIdAndUpdate(bookingId, { paymentStatus: 'paid' });

    // Send confirmation email
    const booking = await PoojaBooking.findById(bookingId);
    if (booking) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: '"RaysVeda" <your_email@gmail.com>',
        to: booking.email,
        subject: 'Pooja Booking Confirmation',
        html: `
          <h2>Thank you for booking!</h2>
          <p><b>Name:</b> ${booking.name}</p>
          <p><b>Gotra:</b> ${booking.gotra}</p>
          <p><b>Address:</b> ${booking.address}</p>
          <p><b>Phone:</b> ${booking.phone}</p>
          <p><b>Pooja Type:</b> ${booking.poojaType}</p>
          <p>Your payment was successful. We will contact you soon.</p>
        `
      });
    }
  }

  res.json({ received: true });
});

module.exports = router;
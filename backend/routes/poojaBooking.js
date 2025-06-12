const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
const PoojaBooking = require('../models/PoojaBooking');
const { protect } = require('../middleware/authMiddleware'); // Import your authentication middleware

// --- DIAGNOSTIC LOGS ---
console.log('PoojaBooking module loaded (from poojaBooking.js).');
console.log('Type of PoojaBooking (from poojaBooking.js):', typeof PoojaBooking);
// --- END DIAGNOSTIC LOGS ---

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Booking endpoint - PROTECTED ROUTE
router.post('/book-pooja', protect, async (req, res) => { // Apply the 'protect' middleware
  console.log("Request body:", req.body);

  // Destructure booking details from req.body.
  // The 'user' field will come from 'req.user' set by the 'protect' middleware.
  const { name, gotra, address, phone, poojaType, email, date, time } = req.body;

  // --- DIAGNOSTIC LOG AT POINT OF USE ---
  console.log('Attempting to create new PoojaBooking instance...');
  // Log the user ID obtained from the authentication middleware
  console.log('User ID from authenticated request (req.user._id):', req.user ? req.user._id : 'User not authenticated or ID missing');
  // --- END DIAGNOSTIC LOG ---

  // Save booking data to MongoDB
  try {
    // Ensure that req.user and req.user._id are available from the middleware
    if (!req.user || !req.user._id) {
      // This case should ideally be caught by the 'protect' middleware itself,
      // but it's a good defensive check.
      return res.status(401).json({ success: false, message: 'Unauthorized: User ID not found in request. Please log in.' });
    }

    const booking = new PoojaBooking({
      user: req.user._id, // Assign the authenticated user's ID
      name,
      gotra,
      address,
      phone,
      poojaType,
      email,
      date,
      time,
      amount: req.body.amount, 
      paymentStatus: 'pending'
    });

    await booking.save();
    console.log('PoojaBooking saved successfully:', booking._id);

    // Create Razorpay order
    const options = {
      amount: 50000, // amount in paise (₹500). Adjust as needed.
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
    console.log('Razorpay order created:', order.id);


    console.log('Sending Razorpay key to frontend:', process.env.RAZORPAY_KEY_ID);

    res.status(201).json({ // Use 201 Created for successful resource creation
      orderId: order.id,
      amount: options.amount,
      currency: options.currency,
      bookingId: booking._id,
      key: process.env.RAZORPAY_KEY_ID,
      message: 'Pooja booking initiated successfully, awaiting payment.'
    });
  } catch (error) {
    console.error('Error in /book-pooja route:', error);
    // Log the full error object for detailed debugging, especially validation errors
    console.error(error);
    
    // Check if it's a Mongoose validation error
    if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
    }
    
    res.status(500).json({ success: false, message: 'Internal Server Error: Booking failed', error: error.message });
  }
});


// Webhook for Razorpay payment success
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  // IMPORTANT: You should verify the webhook signature here for security
  // Refer to Razorpay documentation for signature verification:
  // https://razorpay.com/docs/payments/server-integration/nodejs/webhook-signature-verification/
  console.log('Received Razorpay webhook.');

  let event;
  try {
      event = req.body && JSON.parse(req.body.toString());
  } catch (parseError) {
      console.error('Error parsing webhook payload:', parseError);
      return res.status(400).send('Invalid JSON payload');
  }
  
  if (event && event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;
    const bookingId = payment.notes && payment.notes.bookingId;
    console.log(`Payment captured for booking ID: ${bookingId}, Payment ID: ${payment.id}`);

    try {
      // Update booking as paid
      const updatedBooking = await PoojaBooking.findByIdAndUpdate(
        bookingId,
        { paymentStatus: 'paid' }, // Set to 'paid'
        { new: true } // Return the updated document
      );

      if (!updatedBooking) {
        console.warn(`Booking with ID ${bookingId} not found for webhook update.`);
        return res.status(404).send('Booking not found');
      }
      console.log('Booking status updated to paid for:', updatedBooking._id);

      // Send confirmation email
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: `"RaysVeda" <${process.env.EMAIL_USER}>`, // Use environment variable for sender email
        to: updatedBooking.email,
        subject: 'Pooja Booking Confirmation & Payment Success',
        html: `
          <h2>Thank you for booking your Pooja with RaysVeda!</h2>
          <p>Your payment was successful and your booking is confirmed.</p>
          <p><b>Booking ID:</b> ${updatedBooking._id}</p>
          <p><b>Pooja Type:</b> ${updatedBooking.poojaType}</p>
          <p><b>Booked For:</b> ${updatedBooking.name}</p>
          <p><b>Contact Email:</b> ${updatedBooking.email}</p>
          <p><b>Contact Phone:</b> ${updatedBooking.phone}</p>
          <p><b>Address:</b> ${updatedBooking.address}</p>
          <p><b>Gotra:</b> ${updatedBooking.gotra || 'Not provided'}</p>
          <p>We look forward to serving you!</p>
          <br>
          <p>Best Regards,</p>
          <p>The RaysVeda Team</p>
        `
      });
      console.log('Confirmation email sent to:', updatedBooking.email);

    } catch (error) {
      console.error('Error processing webhook or sending email:', error);
      return res.status(500).send('Internal Server Error');
    }
  } else {
    console.log('Webhook event not a payment.captured event or payload is malformed.');
  }
  res.status(200).send('OK'); // Always respond with 200 OK to Razorpay
});

module.exports = router;
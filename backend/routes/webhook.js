const express = require('express');
const router = express.Router();
const PoojaBooking = require('../models/PoojaBooking');
const nodemailer = require('nodemailer');

// Razorpay webhook handler
router.post('/', async (req, res) => {
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
        { paymentStatus: 'paid' },
        { new: true }
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
        from: `"RaysVeda" <${process.env.EMAIL_USER}>`,
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
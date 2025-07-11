const User = require("../models/User");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { sendWelcomeEmail } = require("../services/emailService");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Utility: generate 8-character password
// const generateTempPassword = () => crypto.randomBytes(4).toString("hex");

// POST /api/guest-checkout
// POST /api/guest-checkout
exports.handleGuestCheckout = async (req, res) => {
  try {
    const { name, email, phone, pooja, amount } = req.body;

    console.log("Received pooja value:", pooja);
    console.log("Type of pooja:", typeof pooja);

    if (!name || !email || !phone || !pooja || !amount) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // 1. Find or create user
    let user = await User.findOne({ $or: [{ phone }, { email }] });
    let isNewUser = false;
    let tempPassword = "";

    if (!user) {
      tempPassword = crypto.randomBytes(4).toString("hex");
      const hashed = await bcrypt.hash(tempPassword, 10);

      user = await User.create({
        name,
        email,
        phone,
        password: hashed,
        isGuest: true,
      });

      isNewUser = true;

      // Send welcome email
      const completeLink = `${process.env.CLIENT_URL}/complete-profile?email=${email}`;
      await sendWelcomeEmail(email, name, tempPassword, completeLink);
    }

    // 2. Set JWT cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // 3. Send welcome email if new
    // if (isNewUser) {
    //   const completeLink = `${process.env.CLIENT_URL}/complete-profile`;
    //   await sendWelcomeEmail(email, name, tempPassword, completeLink);
    // }

    // 4. Create booking
    const booking = await Booking.create({
      user: user._id,
      pooja,
      status: "pending",
      amount,
    });

    // 5. Create Razorpay order
    const razorOrder = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: booking._id.toString(),
    });

    // ✅ Fixed response format
    res.status(200).json({
      id: razorOrder.id,
      amount: razorOrder.amount,
      bookingId: booking._id,
      userId: user._id,
      currency: razorOrder.currency,
    });
  } catch (err) {
    console.error("Guest checkout error:", err);

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User with this phone or email already exists.",
      });
    }

    res.status(500).json({ error: "Server error" });
  }
};


// POST /api/confirm-payment
exports.confirmPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, error: "Payment verification failed" });
    }

    // Update booking status
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        status: "paid",
        razorpay_payment_id,
      },
      { new: true }
    );

    res.status(200).json({ success: true, booking });
  } catch (err) {
    console.error("Payment confirmation error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

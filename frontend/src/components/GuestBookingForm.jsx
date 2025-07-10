import React, { useState } from "react";
import { adminAPI } from "../services/api";

const GuestBookingForm = ({ selectedPuja, onClose }) => {
  const { _id: id, name: pujaTitle, price: amount } = selectedPuja || {};
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async () => {
    const { name, email, phone } = formData;
    if (!name || !email || !phone) {
      alert("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      console.log("Selected puja ID:", id);
      console.log("Puja title:", pujaTitle);
      console.log("Amount:", amount);

      // Step 1: Create Razorpay order via backend
      const response = await adminAPI.createGuestRazorpayOrder({
        name,
        email,
        phone,
        pooja: id,
        pujaTitle,
        amount,
      });

      const order = response?.data;
      console.log("Razorpay order response:", order);

      if (!order || !order.amount || !order.id || !order.bookingId) {
        throw new Error("Invalid Razorpay order response");
      }

      // Step 2: Open Razorpay payment window
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "RaysVeda Puja Booking",
        description: pujaTitle,
        order_id: order.id,
        prefill: { name, email, contact: phone },
        handler: async function (response) {
          try {
            // Step 3: Confirm payment with backend
            await adminAPI.confirmGuestBooking({
              name,
              email,
              phone,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              pooja: id,
              pujaTitle,
              amount,
              bookingId: order.bookingId, // ✅ CRITICAL FIX
            });

            alert("🎉 Puja booked successfully!");
            onClose();
          } catch (err) {
            console.error("Payment confirmation failed:", err);
            alert("❌ Payment succeeded but confirmation failed. Contact support.");
          }
        },
        theme: { color: "#ff6b35" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(
        "Guest booking failed:",
        err.response?.data || err.message || err
      );
      alert("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">Book Puja as Guest</h2>

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <button
        type="button"
        disabled={loading}
        onClick={handlePayment}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </form>
  );
};

export default GuestBookingForm;

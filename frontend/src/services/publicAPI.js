// services/publicAPI.js
import axios from "axios";

// Create a separate axios instance for public API
const publicApiInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

// Public API functions
const publicAPI = {
  // For Puja listing
  fetchActivePujas: async () => {
    const response = await publicApiInstance.get("/poojas/public/active");
    return response.data.data;
  },

  // Guest Razorpay order creation
  createGuestRazorpayOrder: ({ name, email, phone, pooja, amount }) =>
    publicApiInstance.post("/guest-checkout", { name, email, phone, pooja, amount }),

  // Guest booking confirmation
  confirmGuestBooking: ({
    name,
    email,
    phone,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    pooja,
    amount,
    bookingId,
  }) =>
    publicApiInstance.post("/confirm-payment", {
      name,
      email,
      phone,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      pooja,
      amount,
      bookingId,
    }),
};

export default publicAPI; // ✅ Correct export

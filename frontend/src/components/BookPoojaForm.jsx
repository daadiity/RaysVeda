import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function BookPoojaForm({ selectedPuja, onClose }) {
  const { user } = useAuth();

  // ADD DEBUG LOGGING
  console.log('🔍 BookPoojaForm Debug:', {
    user: user,
    hasUser: !!user,
    userId: user?._id,
    userAltId: user?.id,
    token: !!localStorage.getItem('token')
  });

  const [form, setForm] = useState({
    name: "",
    gotra: "",
    address: "",
    phone: "",
    poojaType: "",
    email: "",
    date: "",
    time: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // FIXED: Configure axios defaults to use backend port
  axios.defaults.baseURL = 'http://localhost:3000'; // Changed from 5173 to 3000
  axios.defaults.withCredentials = true;

  // Auto-fill form when selectedPuja is provided
  useEffect(() => {
    if (selectedPuja) {
      setForm(prevForm => ({
        ...prevForm,
        poojaType: selectedPuja.title
      }));
    }
  }, [selectedPuja]);

  // Auto-fill user data if available
  useEffect(() => {
    if (user) {
      setForm(prevForm => ({
        ...prevForm,
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Format time to 12-hour format with AM/PM
  const formatTime = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(':');
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) < 12 ? 'AM' : 'PM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // IMPROVED USER CHECK - Check for both _id and id properties
    if (!user || (!user._id && !user.id)) {
      setMessage("You must be logged in to book a pooja.");
      setLoading(false);
      return;
    }


    // Get user ID (try both _id and id)
    const userId = user._id || user.id;
    
    console.log('🔍 User check:', {
      userExists: !!user,
      userId: userId,
      userObject: user
    });

    const amount = selectedPuja ? selectedPuja.amount : 1101;
    const formattedTime = formatTime(form.time);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setMessage("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }

      // FIXED: Map form fields correctly to match backend expectations
      const bookingData = {

        user: userId, // Use the userId we determined above

        name: form.name,
        gotra: form.gotra,
        address: form.address,
        phone: form.phone,
        email: form.email,
        poojaType: form.poojaType,

        date: form.date,
        time: formattedTime,
        amount: amount
      };

      console.log('📤 Sending booking request with data:', bookingData);

      // Use the correct endpoint that matches your backend routes
      const res = await axios.post("/api/pooja/book-pooja", bookingData, {

        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Booking response:', res.data);

      if (res.data.success) {
        const { orderId, currency, key } = res.data; // Use the structure from your backend

        const options = {
          key,
          amount: amount * 100,
          currency,
          name: "RaysVeda",
          description: `Booking for ${form.poojaType}`,
          order_id: orderId,
          handler: function (response) {
            console.log('Payment successful:', response);
            setMessage("Payment successful! Your puja has been booked.");
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 2000);
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          notes: {
            poojaType: form.poojaType,
            name: form.name,
            gotra: form.gotra,
            address: form.address,
            date: form.date,
            time: formattedTime
          },
          theme: {
            color: "#F59E42"
          },
          modal: {
            ondismiss: function() {
              console.log('Payment modal closed');
              setLoading(false);
            }
          }
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          setMessage("Payment gateway not loaded. Please refresh and try again.");
        }
      } else {
        setMessage(res.data.message || "Booking failed. Please try again.");
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Booking error:", err);
      console.error("Error response:", err.response?.data);
      
      if (err.response?.status === 401) {
        setMessage("Session expired. Please log in again.");
      } else if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else if (err.code === 'ERR_NETWORK') {
        setMessage("Network error. Please check your connection and try again.");
      } else {
        setMessage("Booking failed. Please try again.");
      }
      setLoading(false);
    }
  };

  // Available puja options
  const pujaOptions = [
    { value: "Shri Narayan Puja", label: "Shri Narayan Puja - ₹1,501", amount: 1501 },
    { value: "Shri Ganpati Puja", label: "Shri Ganpati Puja - ₹1,101", amount: 1101 },
    { value: "Maa Lakshmi Puja", label: "Maa Lakshmi Puja - ₹2,101", amount: 2101 },
    { value: "Shri Shiva Puja", label: "Shri Shiva Puja - ₹1,501", amount: 1501 },
    { value: "Durga Puja", label: "Durga Puja - ₹2,501", amount: 2501 },
    { value: "Satyanarayan Puja", label: "Satyanarayan Puja - ₹3,101", amount: 3101 }
  ];

  // Get today's date for min date restriction
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative border-2 border-orange-200 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-orange-600 text-3xl font-bold transition-colors duration-200"
          aria-label="Close"
        >
          &times;
        </button>
        
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700 font-serif tracking-wide">
          Book a Sacred Puja
        </h2>
        
        {selectedPuja && (
          <div className="bg-orange-50 p-4 rounded-lg mb-6 text-center">
            <h3 className="text-xl font-semibold text-orange-700">{selectedPuja.title}</h3>
            <p className="text-orange-600">Amount: {selectedPuja.price}</p>
          </div>
        )}

        {message && (
          <p className={`mb-4 text-center p-3 rounded ${
            message.includes('successful') 
              ? 'text-green-600 bg-green-50' 
              : 'text-red-600 bg-red-50'
          }`}>
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your Full Name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="gotra" className="block text-sm font-medium text-gray-700 mb-1">
              Gotra (Optional)
            </label>
            <input
              id="gotra"
              name="gotra"
              value={form.gotra}
              onChange={handleChange}
              placeholder="Your Gotra"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Complete Address *
          </label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Your Complete Address"
            rows="2"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="e.g., +91 9876543210"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
              type="tel"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
              type="email"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="poojaType" className="block text-sm font-medium text-gray-700 mb-1">
            Select Puja *
          </label>
          <select
            id="poojaType"
            name="poojaType"
            value={form.poojaType}
            onChange={handleChange}
            required
            disabled={selectedPuja ? true : false}
            className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800 ${
              selectedPuja ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <option value="">Select Puja</option>
            {pujaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedPuja && (
            <p className="text-sm text-gray-500 mt-1">
              Pre-selected from your choice
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date *
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              min={today}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time *
            </label>
            <input
              id="time"
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
            />
            <p className="text-xs text-gray-500 mt-1">
              Time will be displayed in 12-hour format
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg text-lg font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : `Proceed to Payment ${selectedPuja ? selectedPuja.price : ''}`}
          </button>
        </div>
      </form>
    </div>
  );
}
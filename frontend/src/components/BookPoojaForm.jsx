import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function BookPoojaForm({ onClose }) {
  const { user } = useAuth();

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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!user || !user._id) {
      setMessage("You must be logged in to book a pooja.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/book-pooja", {
        ...form,
        amount: 500,
      });

      const { orderId, amount, currency, key, name, email, poojaType } = res.data;

      const options = {
        key,
        amount,
        currency,
        name: "RaysVeda",
        description: `Booking for ${poojaType}`,
        order_id: orderId,
        handler: function (response) {
          window.location.href = "/success";
        },
        prefill: {
          name,
          email,
          contact: form.phone,
        },
        notes: {
          poojaType,
          gotra: form.gotra,
          address: form.address,
          date: form.date,
          time: form.time
        },
        theme: {
          color: "#F59E42"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
      setForm({
        name: "",
        gotra: "",
        address: "",
        phone: "",
        poojaType: "",
        email: "",
        date: "",
        time: ""
      });
    } catch (err) {
      setMessage("Booking failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border-2 border-orange-200"
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
          Book a Puja
        </h2>
        {message && (
          <p className="mb-4 text-red-600 text-center">{message}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
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
            Address
          </label>
          <input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Your Address"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
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
              Email
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
            Select Pooja
          </label>
          <select
            id="poojaType"
            name="poojaType"
            value={form.poojaType}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800 bg-white"
          >
            <option value="">Select Pooja</option>
            <option value="Rudra">Rudra Puja</option>
            <option value="Laxmi Puja">Laxmi Puja</option>
            <option value="Kalsarpadosh Puja">Kalsarpadosh Puja</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time
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
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-lg text-lg font-semibold tracking-wide transition-colors duration-200"
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}
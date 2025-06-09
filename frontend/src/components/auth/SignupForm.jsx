import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../context/AuthContext"; // Import useAuth

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", phone: "", address: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useAuth(); // Get login from context

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages
    try {
      const res = await axios.post("/api/auth/signup", form);
      // Backend should send { user: ..., token: ..., message: ... }
      const { user, token, message: successMessage } = res.data; // Destructure all needed data

      setMessage(successMessage || "Account created successfully!");
      login(user, token); // Automatically log in the user and store the token
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-700">Create your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone"
              className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Enter your address"
              className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>
          <div className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 hover:underline">
              Login
            </Link>
          </div>
          {message && (
            <div className="text-center text-red-500 mt-2">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}
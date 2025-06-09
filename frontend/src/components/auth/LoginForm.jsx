import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [form, setForm] = useState({ phone: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages
    try {
      const res = await axios.post("/api/auth/login", form);
      // The backend should now send { user: ..., token: ... }
      const { user, token } = res.data; // Destructure both user and token

      login(user, token); // Pass both user data AND the token to the login function
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-700">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
          <div className="text-center text-sm mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary-600 hover:underline">
              Sign up
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
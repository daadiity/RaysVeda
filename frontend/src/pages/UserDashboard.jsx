import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaHourglassHalf, FaRupeeSign, FaPlusCircle } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function formatDateIndian(dateStr) {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:5000';

  if (user === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <svg className="animate-spin h-10 w-10 text-orange-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  useEffect(() => {
    if (user && user._id) {
      setLoading(true);
      
      // Get token for authenticated request
      const token = localStorage.getItem('token');
      
      axios
        .get(`/api/bookings/user/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log('Dashboard bookings response:', res.data);
          setBookings(res.data.bookings);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Dashboard fetch error:', err);
          setError("Failed to fetch bookings. Please try again later.");
          setLoading(false);
        });
    } else if (user === null) {
      setLoading(false);
      setError("");
      setBookings([]);
    }
  }, [user]);

  // Summary stats - FIX: Change "Success" to "paid"
  const total = bookings.length;
  const completed = bookings.filter((b) => b.paymentStatus === "paid").length;
  const pending = bookings.filter((b) => b.paymentStatus === "pending").length;

  if (loading && user !== null)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <svg className="animate-spin h-10 w-10 text-orange-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <span className="text-red-600 text-lg font-semibold mb-2">{error}</span>
      </div>
    );

  return (
    <div className="container mx-auto py-8 px-2 md:px-0">
      {/* Welcome */}
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
        Welcome, <span className="text-primary-600">{user?.name || "User"}</span>!
      </h2>
      <p className="mb-6 text-gray-600">Here's your puja booking summary and history.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
          <MdEventAvailable className="text-3xl text-orange-500" />
          <div>
            <div className="text-lg font-semibold">{total}</div>
            <div className="text-gray-500 text-sm">Total Bookings</div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
          <FaCheckCircle className="text-3xl text-green-500" />
          <div>
            <div className="text-lg font-semibold">{completed}</div>
            <div className="text-gray-500 text-sm">Completed (Paid)</div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
          <FaHourglassHalf className="text-3xl text-yellow-500" />
          <div>
            <div className="text-lg font-semibold">{pending}</div>
            <div className="text-gray-500 text-sm">Pending Payments</div>
          </div>
        </div>
      </div>

      {/* Booking List */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow">
          <FaHourglassHalf className="text-5xl text-yellow-400 mb-4" />
          <div className="text-lg font-semibold mb-2">No bookings found.</div>
          <Link
            to="/puja"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded shadow mt-4 transition"
          >
            <FaPlusCircle /> Book a Puja Now
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white shadow rounded-lg p-5 flex flex-col gap-2 border-l-4 border-green-400"
              style={{
                borderColor: b.paymentStatus === "paid" ? "#22c55e" : "#facc15",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-800">{b.poojaType}</span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold
                    ${b.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"}`}
                >
                  {b.paymentStatus === "paid" ? (
                    <>
                      <FaCheckCircle className="text-green-500" /> Paid
                    </>
                  ) : (
                    <>
                      <FaHourglassHalf className="text-yellow-500" /> Pending
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MdEventAvailable className="text-orange-400" />
                <span>
                  {b.date ? formatDateIndian(b.date) : "—"}
                  {b.time ? `, ${b.time}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FaRupeeSign className="text-green-600" />
                <span>₹{b.amount ? b.amount : "—"}</span>
              </div>
              {b.address && (
                <div className="text-xs text-gray-400 mt-2">
                  <span className="font-semibold">Address:</span> {b.address}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
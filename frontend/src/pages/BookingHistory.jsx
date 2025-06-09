import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaHourglassHalf, FaRupeeSign, FaArrowLeft } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

function formatDateIndian(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BookingHistory() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/bookings/${id}`)
      .then((res) => {
        setBooking(res.data.booking);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch booking details.");
        setLoading(false);
      });
  }, [id]);

  if (loading)
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
        <button onClick={() => navigate(-1)} className="text-orange-600 underline flex items-center gap-1 mt-2">
          <FaArrowLeft /> Back
        </button>
      </div>
    );

  if (!booking) return null;

  return (
    <div className="container mx-auto py-8 px-2 md:px-0">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-orange-600 hover:underline">
        <FaArrowLeft /> Back to Dashboard
      </button>
      <div className="bg-white shadow rounded-lg p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary-700">Booking Details</h2>
        <div className="space-y-2 text-gray-700 text-sm">
          <div><span className="font-semibold">Pooja Type:</span> {booking.poojaType}</div>
          <div><span className="font-semibold">Date:</span> {formatDateIndian(booking.date)}</div>
          <div><span className="font-semibold">Amount:</span> <FaRupeeSign className="inline text-green-600" /> {booking.amount}</div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            {booking.paymentStatus === "Success" ? (
              <span className="inline-flex items-center gap-1 text-green-700"><FaCheckCircle /> Paid</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-yellow-700"><FaHourglassHalf /> Pending</span>
            )}
          </div>
          {booking.name && <div><span className="font-semibold">Name:</span> {booking.name}</div>}
          {booking.phone && <div><span className="font-semibold">Phone:</span> {booking.phone}</div>}
          {booking.email && <div><span className="font-semibold">Email:</span> {booking.email}</div>}
          {booking.address && <div><span className="font-semibold">Address:</span> {booking.address}</div>}
          {booking.notes && <div><span className="font-semibold">Notes:</span> {booking.notes}</div>}
        </div>
      </div>
    </div>
  );
}
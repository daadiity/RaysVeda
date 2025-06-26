// components/UserDetailsModal.jsx
import React from "react"

export default function UserDetailsModal({ user, onClose }) {
  if (!user) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          👤 User Details
        </h2>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{user.name || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{user.email || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{user.phone || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span
              className={`capitalize px-2 py-1 rounded-full text-xs ${
                user.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.status || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Join Date:</span>
            <span>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-GB")
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Bookings:</span>
            <span>{user.totalBookings ?? "0"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Spent:</span>
            <span>₹{user.totalSpent ?? "0"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

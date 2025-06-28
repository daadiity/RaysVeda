import { ClipboardList } from "lucide-react";

const ViewBookingModal = ({ open, onClose, booking }) => {
  if (!open || !booking?.data) return null;

  const b = booking.data;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        {/* Modal Title with Icon */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-gray-700" />
          Booking Details
        </h2>

        {/* Booking Information */}
        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>ID:</strong> {b._id}</p>

          <p><strong>User:</strong> {b.user?.name} ({b.user?.email})</p>
          <p><strong>User Phone:</strong> {b.user?.phone}</p>

          <p><strong>Pooja:</strong> {b.pooja?.name}</p>
          <p><strong>Category:</strong> {b.pooja?.category}</p>
          <p><strong>Price:</strong> ₹{b.pooja?.price}</p>

          <p><strong>Date & Time:</strong> {new Date(b.date).toLocaleDateString()} at {b.time}</p>
          <p><strong>Status:</strong> {b.status}</p>

          <p>
            <strong>Payment:</strong> ₹{b.paymentDetails?.paidAmount} via {b.paymentMethod} ({b.paymentStatus})
          </p>

          <p>
            <strong>Pandit:</strong> {b.assignedPandit?.name} ({b.assignedPandit?.phone}, {b.assignedPandit?.experience})
          </p>

          <p>
            <strong>Address:</strong> {b.address?.street}, {b.address?.landmark}, {b.address?.city}, {b.address?.state} - {b.address?.pincode}
          </p>

          <p><strong>Rating:</strong> ⭐ {b.rating}</p>
          <p><strong>Review:</strong> {b.review || "No review provided"}</p>
          <p><strong>Special Requests:</strong> {b.specialRequests || "None"}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBookingModal;

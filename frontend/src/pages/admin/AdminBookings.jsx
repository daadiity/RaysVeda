import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminBookings = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchBookings();
  }, [admin, navigate, currentPage, statusFilter]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/admin/bookings', {
        params: {
          page: currentPage,
          limit: 10,
          status: statusFilter
        }
      });
      
      setBookings(response.data.bookings);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    setUpdating(bookingId);
    try {
      await axios.put(`/admin/bookings/${bookingId}/status`, { status: newStatus });
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error updating booking status:', error);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🕉️</span>
              <span className="text-xl font-bold text-orange-600">RaysVeda Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {admin.fullName}</span>
              <button 
                onClick={logout}
                className="btn bg-gray-600 hover:bg-gray-700 text-white text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="text-gray-600 hover:text-orange-600 pb-2"
            >
              Dashboard
            </button>
            <button className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-2">
              Bookings
            </button>
            <button 
              onClick={() => navigate('/admin/users')}
              className="text-gray-600 hover:text-orange-600 pb-2"
            >
              Users
            </button>
            <button 
              onClick={() => navigate('/admin/analytics')}
              className="text-gray-600 hover:text-orange-600 pb-2"
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Manage Bookings</h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings found</h3>
                <p className="text-gray-600">No bookings match your current filter</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <h3 className="text-xl font-semibold text-gray-800">{booking.poojaType}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                              Payment: {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            <div>
                              <p><strong>Customer:</strong> {booking.user?.fullName}</p>
                              <p><strong>Email:</strong> {booking.user?.email}</p>
                              <p><strong>Phone:</strong> {booking.user?.phoneNumber}</p>
                            </div>
                            <div>
                              <p><strong>Date:</strong> {new Date(booking.preferredDate).toLocaleDateString()}</p>
                              <p><strong>Time:</strong> {booking.preferredTime}</p>
                              <p><strong>Gotra:</strong> {booking.gotra}</p>
                            </div>
                            <div>
                              <p><strong>Amount:</strong> ₹{booking.amount}</p>
                              <p><strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          {booking.specialRequests && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-600">
                                <strong>Special Requests:</strong> {booking.specialRequests}
                              </p>
                            </div>
                          )}

                          {/* Status Update Buttons */}
                          <div className="flex space-x-2">
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                  disabled={updating === booking._id}
                                  className="btn bg-green-600 hover:bg-green-700 text-white text-sm"
                                >
                                  {updating === booking._id ? 'Updating...' : 'Confirm'}
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                  disabled={updating === booking._id}
                                  className="btn bg-red-600 hover:bg-red-700 text-white text-sm"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => updateBookingStatus(booking._id, 'completed')}
                                disabled={updating === booking._id}
                                className="btn bg-blue-600 hover:bg-blue-700 text-white text-sm"
                              >
                                {updating === booking._id ? 'Updating...' : 'Mark Complete'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-4 mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="btn bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400"
                    >
                      Previous
                    </button>
                    <span className="text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="btn bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`/bookings/user/${user.id}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.fullName}!</h1>
              <p className="text-gray-600 mt-2">Manage your pooja bookings and account</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Email: {user.email}</p>
              <p className="text-sm text-gray-500">Phone: {user.phoneNumber}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="text-3xl text-orange-600 mr-4">📊</div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
                <p className="text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="text-3xl text-green-600 mr-4">✅</div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
                <p className="text-gray-600">Confirmed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="text-3xl text-blue-600 mr-4">🏁</div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="text-3xl text-yellow-600 mr-4">⏳</div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
                <p className="text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Your Bookings</h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading your bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🕉️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-4">Start your spiritual journey by booking your first pooja</p>
                <button 
                  onClick={() => navigate('/pooja')}
                  className="btn-primary"
                >
                  Book Your First Pooja
                </button>
              </div>
            ) : (
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><strong>Date:</strong> {new Date(booking.preferredDate).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {booking.preferredTime}</p>
                          </div>
                          <div>
                            <p><strong>Gotra:</strong> {booking.gotra}</p>
                            <p><strong>Amount:</strong> ₹{booking.amount}</p>
                          </div>
                        </div>
                        
                        {booking.specialRequests && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-600">
                              <strong>Special Requests:</strong> {booking.specialRequests}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right text-sm text-gray-500">
                        <p>Booked on</p>
                        <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Actions</h3>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/pooja')}
              className="btn-primary"
            >
              Book New Pooja
            </button>
            <button 
              onClick={logout}
              className="btn bg-gray-600 hover:bg-gray-700 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
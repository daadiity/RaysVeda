import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [admin, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, bookingsResponse] = await Promise.all([
        axios.get('/admin/dashboard/stats'),
        axios.get('/admin/bookings/recent')
      ]);
      
      setStats(statsResponse.data);
      setRecentBookings(bookingsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
            <button className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-2">
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/admin/bookings')}
              className="text-gray-600 hover:text-orange-600 pb-2"
            >
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

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="text-3xl text-blue-600 mr-4">👥</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
                    <p className="text-gray-600">Total Users</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="text-3xl text-orange-600 mr-4">📊</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
                    <p className="text-gray-600">Total Bookings</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="text-3xl text-green-600 mr-4">💰</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">₹{stats.totalRevenue?.toLocaleString()}</p>
                    <p className="text-gray-600">Total Revenue</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="text-3xl text-yellow-600 mr-4">⏳</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.pendingBookings}</p>
                    <p className="text-gray-600">Pending Bookings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirmed</h3>
                <p className="text-3xl font-bold text-green-600">{stats.confirmedBookings}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Completed</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.completedBookings}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Cancelled</h3>
                <p className="text-3xl font-bold text-red-600">{stats.cancelledBookings}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Revenue</h3>
                <p className="text-3xl font-bold text-orange-600">₹{stats.monthlyRevenue?.toLocaleString()}</p>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
              </div>
              
              <div className="p-6">
                {recentBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No recent bookings</h3>
                    <p className="text-gray-600">New bookings will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <h3 className="text-lg font-semibold text-gray-800">{booking.poojaType}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                <p><strong>Customer:</strong> {booking.user?.fullName}</p>
                                <p><strong>Email:</strong> {booking.user?.email}</p>
                              </div>
                              <div>
                                <p><strong>Date:</strong> {new Date(booking.preferredDate).toLocaleDateString()}</p>
                                <p><strong>Amount:</strong> ₹{booking.amount}</p>
                              </div>
                            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
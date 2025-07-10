import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminAnalytics = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({
    monthlyBookings: [],
    popularPoojas: [],
    statusDistribution: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchAnalytics();
  }, [admin, navigate]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/admin/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = (month) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[month - 1];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-yellow-500';
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
            <button className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-2">
              Analytics
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading analytics...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Monthly Bookings Trend */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Booking Trends</h2>
              {analytics.monthlyBookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600">No booking data available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analytics.monthlyBookings.map((month, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-20 text-sm font-medium text-gray-700">
                        {getMonthName(month._id.month)} {month._id.year}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div 
                              className="bg-orange-600 h-4 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${Math.min((month.count / Math.max(...analytics.monthlyBookings.map(m => m.count))) * 100, 100)}%` 
                              }}
                            ></div>
                          </div>
                          <div className="text-sm font-medium text-gray-700 w-16">
                            {month.count} bookings
                          </div>
                          <div className="text-sm font-medium text-green-600 w-24">
                            ₹{month.revenue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Poojas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Pooja Types</h2>
              {analytics.popularPoojas.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🕉️</div>
                  <p className="text-gray-600">No pooja data available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analytics.popularPoojas.map((pooja, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{pooja._id}</h3>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Bookings:</span>
                          <span className="font-medium text-gray-800">{pooja.count}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Revenue:</span>
                          <span className="font-medium text-green-600">₹{pooja.revenue.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min((pooja.count / Math.max(...analytics.popularPoojas.map(p => p.count))) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status Distribution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Status Distribution</h2>
              {analytics.statusDistribution.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📈</div>
                  <p className="text-gray-600">No status data available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {analytics.statusDistribution.map((status, index) => (
                    <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
                      <div className={`w-16 h-16 ${getStatusColor(status._id)} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                        <span className="text-white text-2xl font-bold">{status.count}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">
                        {status._id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {((status.count / analytics.statusDistribution.reduce((sum, s) => sum + s.count, 0)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
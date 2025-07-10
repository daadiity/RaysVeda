import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminUsers = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchUsers();
  }, [admin, navigate, currentPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/users', {
        params: {
          page: currentPage,
          limit: 10,
          search: searchTerm
        }
      });
      
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`/admin/users/${userId}`);
      setSelectedUser(response.data.user);
      setUserBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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
            <button className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-2">
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

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Search Users:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name or email..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading users...</p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No users found</h3>
                    <p className="text-gray-600">No users match your search criteria</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div 
                          key={user._id} 
                          className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                            selectedUser?._id === user._id ? 'border-orange-500 bg-orange-50' : ''
                          }`}
                          onClick={() => fetchUserDetails(user._id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
                              <p className="text-gray-600">{user.email}</p>
                              <p className="text-sm text-gray-500">{user.phoneNumber}</p>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                              <p>Joined</p>
                              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
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

          {/* User Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">User Details</h3>
              </div>
              
              <div className="p-6">
                {selectedUser ? (
                  <>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <p className="text-gray-900">{selectedUser.fullName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{selectedUser.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-gray-900">{selectedUser.phoneNumber}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                        <p className="text-gray-900">{new Date(selectedUser.dateOfBirth).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Gotra</label>
                        <p className="text-gray-900">{selectedUser.gotra}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Joined</label>
                        <p className="text-gray-900">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* User Bookings */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Bookings ({userBookings.length})</h4>
                      {userBookings.length === 0 ? (
                        <p className="text-gray-600 text-sm">No bookings yet</p>
                      ) : (
                        <div className="space-y-3">
                          {userBookings.slice(0, 5).map((booking) => (
                            <div key={booking._id} className="border border-gray-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-800">{booking.poojaType}</h5>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {new Date(booking.preferredDate).toLocaleDateString()} - ₹{booking.amount}
                              </p>
                            </div>
                          ))}
                          {userBookings.length > 5 && (
                            <p className="text-sm text-gray-500">
                              +{userBookings.length - 5} more bookings
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">👤</div>
                    <p className="text-gray-600">Select a user to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (user._id || user.id)) {
      fetchBookings();
    } else if (user === null) {
      setLoading(false);
      setError("Please login to view your bookings.");
    }
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    
    const userId = user._id || user.id;
    const token = localStorage.getItem('token');
    
    console.log('=== DASHBOARD API CALL ===');
    console.log('User ID:', userId);
    console.log('Token exists:', !!token);
    
    try {
      // FIXED: Use the correct endpoint that exists in your backend
      const response = await fetch(`http://localhost:3000/api/pooja/bookings/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        setBookings(data.bookings || []);
        console.log('Bookings set:', data.bookings?.length || 0);
      } else {
        setError(data.message || 'Failed to fetch bookings');
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(`Failed to fetch bookings: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #ff6b35',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#333', fontSize: '1.1rem' }}>Loading your dashboard...</p>
        </div>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <div>
            <h1 style={{
              color: '#333',
              fontSize: '2.5rem',
              fontWeight: '600',
              margin: '0 0 0.5rem 0'
            }}>
              Welcome, {user?.name}! 🙏
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              margin: '0 0 0.5rem 0'
            }}>
              Your spiritual journey dashboard
            </p>
            <div style={{
              fontSize: '0.8rem',
              color: '#888',
              background: '#f8f9fa',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              User ID: {user?._id || user?.id} | Email: {user?.email}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: '#ff6b35', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {bookings.length}
            </h3>
            <p style={{ color: '#666', margin: 0 }}>Total Bookings</p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: '#ff6b35', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {bookings.filter(b => b.status === 'completed').length}
            </h3>
            <p style={{ color: '#666', margin: 0 }}>Completed</p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: '#ff6b35', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {bookings.filter(b => b.status === 'upcoming').length}
            </h3>
            <p style={{ color: '#666', margin: 0 }}>Upcoming</p>
          </div>
        </div>

        {/* Bookings Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              color: '#333',
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: 0
            }}>
              Your Bookings
            </h2>
            <button
              onClick={fetchBookings}
              style={{
                background: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                color: '#495057',
                transition: 'all 0.3s'
              }}
            >
              🔄 Refresh
            </button>
          </div>

          {error ? (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: '1px solid #fcc',
              marginBottom: '1rem'
            }}>
              <strong>Error:</strong> {error}
              <br />
              <button
                onClick={fetchBookings}
                style={{
                  background: '#ff6b35',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  marginTop: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🕉️</div>
              <h3 style={{ 
                color: '#333', 
                marginBottom: '1rem',
                fontSize: '1.5rem'
              }}>
                No bookings found
              </h3>
              <p style={{ 
                fontSize: '1.1rem',
                marginBottom: '2rem',
                color: '#666'
              }}>
                You haven't made any puja bookings yet.<br />
                Start your spiritual journey by booking your first puja.
              </p>
              <button
                onClick={() => navigate('/puja')}
                style={{
                  background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
                }}
              >
                📿 Book Your First Puja
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  style={{
                    background: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div>
                      <h3 style={{
                        color: '#333',
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        margin: '0 0 0.5rem 0'
                      }}>
                        {booking.poojaType}
                      </h3>
                      <p style={{
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        📅 {booking.date} at {booking.time}
                      </p>
                      <p style={{
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        📍 {booking.address}
                      </p>
                      <p style={{
                        color: '#666',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        💰 ₹{booking.amount}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          background: booking.paymentStatus === 'paid' ? '#d4edda' : '#fff3cd',
                          color: booking.paymentStatus === 'paid' ? '#155724' : '#856404',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          display: 'block',
                          marginBottom: '0.5rem'
                        }}
                      >
                        {booking.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Pending'}
                      </span>
                      <span
                        style={{
                          background: booking.status === 'completed' ? '#d1ecf1' : '#e2e3e5',
                          color: booking.status === 'completed' ? '#0c5460' : '#383d41',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.85rem',
                          fontWeight: '600'
                        }}
                      >
                        {booking.status === 'completed' ? '✅ Completed' : '📅 Upcoming'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <button
            onClick={() => navigate('/puja')}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid #ff6b35',
              borderRadius: '15px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'center',
              color: '#333'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🙏</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Book Puja</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Schedule a new puja</p>
          </button>

          <button
            onClick={() => navigate('/services/kundli')}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid #ff6b35',
              borderRadius: '15px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'center',
              color: '#333'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Get Kundli</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Generate birth chart</p>
          </button>
        </div>
      </div>
    </div>
  );
}
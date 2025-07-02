import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const KundliForm = ({ onClose, onKundliGenerated, setLoading, loading }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    birthLocation: '',
    dateOfBirth: '',
    timeOfBirth: ''
    // Removed email field since not saving to DB
  });
  const [error, setError] = useState('');

  // Configure axios for backend
  axios.defaults.baseURL = 'http://localhost:3000';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please log in to generate Kundli');
        setLoading(false);
        return;
      }

      console.log('🔮 Sending Kundli request:', formData);

      const response = await axios.post('/api/kundli/generate', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        console.log('✅ Kundli generated successfully');
        onKundliGenerated(response.data.kundliReport);
      } else {
        setError(response.data.message || 'Failed to generate Kundli');
      }
    } catch (err) {
      console.error('❌ Kundli generation error:', err);
      setError(err.response?.data?.message || 'Failed to generate Kundli. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get today's date for max date restriction
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '3rem',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      position: 'relative'
    }}>
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '2rem',
          color: '#999',
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '50%',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#f0f0f0';
          e.target.style.color = '#ff6b35';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'none';
          e.target.style.color = '#999';
        }}
      >
        ×
      </button>

      {/* Form Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔮</div>
        <h2 style={{
          color: '#333',
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '0.5rem'
        }}>
          Generate Your Kundli
        </h2>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          Provide your accurate birth details for AI-powered predictions
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          background: 'linear-gradient(135deg, #f8d7da, #f5c6cb)',
          color: '#721c24',
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          border: '1px solid #f5c6cb',
          textAlign: 'center'
        }}>
          <strong>⚠️ {error}</strong>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#333',
            fontWeight: '600'
          }}>
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {/* Birth Location */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#333',
            fontWeight: '600'
          }}>
            Birth Location *
          </label>
          <input
            type="text"
            name="birthLocation"
            value={formData.birthLocation}
            onChange={handleChange}
            required
            placeholder="e.g., Delhi, India"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {/* Date of Birth */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#333',
            fontWeight: '600'
          }}>
            Date of Birth *
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            max={today}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {/* Time of Birth */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#333',
            fontWeight: '600'
          }}>
            Time of Birth *
          </label>
          <input
            type="time"
            name="timeOfBirth"
            value={formData.timeOfBirth}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <p style={{
            color: '#666',
            fontSize: '0.9rem',
            marginTop: '0.5rem'
          }}>
            💡 Accurate birth time is crucial for precise predictions
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? 
              'linear-gradient(135deg, #ccc, #999)' : 
              'linear-gradient(135deg, #ff6b35, #f7931e)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.2rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            boxShadow: loading ? 'none' : '0 4px 15px rgba(255, 107, 53, 0.3)'
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ animation: 'spin 1s linear infinite' }}>⟳</span>
              Generating Your Kundli...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span>🔮</span>
              Generate Kundli
            </span>
          )}
        </button>
      </form>

      {/* Loading Message */}
      {loading && (
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          color: '#666'
        }}>
          <p>✨ Our AI is analyzing your birth chart...</p>
          <p style={{ fontSize: '0.9rem' }}>This may take up to 30 seconds</p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default KundliForm;
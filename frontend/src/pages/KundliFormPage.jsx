import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KundliFormPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    dob: '',
    tob: '',
    gender: '',
    place: '',
    latitude: '',
    longitude: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formToSave = {
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    try {
      const response = await fetch('/api/gemini-interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formToSave),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate kundli');
      }
      sessionStorage.setItem('kundliResult', JSON.stringify(result));
      navigate('/services/kundli/result');
    } catch (err) {
      setError(err.message || 'Failed to generate kundli');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #ff8008, #ffc837)', padding: '2rem' }}>
      {/* Header */}
      <h1 style={{ textAlign: 'center', color: '#ffffff', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Discover Your Destiny with Precision
      </h1>
      <p style={{ textAlign: 'center', color: '#fff', fontSize: '1rem', marginBottom: '2rem' }}>
        Enter your birth details to generate an accurate and personalized Kundli. Unlock the cosmic secrets written in your stars.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        }}
      >
        {/* Full Name */}
        <label style={labelStyle}>Full Name</label>
        <input style={inputStyle} name="name" placeholder="e.g., abcdef" value={form.name} onChange={handleChange} required />

        {/* DOB and TOB in row */}
        <div style={rowStyle}>
          <div style={halfColStyle}>
            <label style={labelStyle}>Date of Birth</label>
            <input style={inputStyle} name="dob" type="date" placeholder="e.g., 09-11-2002" value={form.dob} onChange={handleChange} required />
          </div>
          <div style={halfColStyle}>
            <label style={labelStyle}>Time of Birth</label>
            <input style={inputStyle} name="tob" type="time" placeholder="e.g., 09:30" value={form.tob} onChange={handleChange} required />
          </div>
        </div>

        {/* Gender and Place of Birth */}
        <div style={rowStyle}>
          <div style={halfColStyle}>
            <label style={labelStyle}>Gender</label>
            <select style={inputStyle} name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={halfColStyle}>
            <label style={labelStyle}>Place of Birth</label>
            <input style={inputStyle} name="place" placeholder="e.g., Patna" value={form.place} onChange={handleChange} required />
          </div>
        </div>

        {/* Latitude and Longitude */}
        <div style={rowStyle}>
          <div style={halfColStyle}>
            <label style={labelStyle}>Latitude</label>
            <input
              style={inputStyle}
              name="latitude"
              type="number"
              step="any"
              placeholder="e.g., 28.6139"
              value={form.latitude}
              onChange={handleChange}
              required
            />
          </div>
          <div style={halfColStyle}>
            <label style={labelStyle}>Longitude</label>
            <input
              style={inputStyle}
              name="longitude"
              type="number"
              step="any"
              placeholder="e.g., 77.2090"
              value={form.longitude}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ color: '#fff', background: '#f44336', padding: '1rem', marginTop: '1rem', borderRadius: '10px' }}>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '2rem',
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#ff5722',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Generating...' : 'Generate Kundli'}
        </button>
      </form>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  color: '#ff5722',
  fontWeight: '600',
  fontSize: '1rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.8rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  marginBottom: '1rem',
};

const rowStyle = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '1rem',
};

const halfColStyle = {
  flex: 1,
};

export default KundliFormPage;

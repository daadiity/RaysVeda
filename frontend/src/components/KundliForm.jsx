import React, { useState } from 'react';

const orange = '#f26522';
const fontFamily = "'Poppins', 'Merriweather', serif";

// Make label lighter and less bold
const labelStyle = {
  fontWeight: 500,
  fontSize: '1.08rem',
  marginBottom: 6,
  color: '#666', // lighter gray
  fontFamily,
  display: 'block',
  textAlign: 'left',
  letterSpacing: '0.01em'
};

const inputStyle = {
  border: '2px solid #e3e3e3',
  borderRadius: 8,
  fontFamily,
  fontSize: '1.08rem',
  fontWeight: 400,
  background: '#fff',
  color: '#222',
  boxShadow: 'none'
};

const KundliForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '',
    gender: '',
    place: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="mb-3">
          <label htmlFor="name" style={labelStyle}>Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            required
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            style={inputStyle}
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="dob" style={labelStyle}>Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-control"
              required
              value={formData.dob}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="tob" style={labelStyle}>Time of Birth</label>
            <input
              type="time"
              id="tob"
              name="tob"
              className="form-control"
              required
              value={formData.tob}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="gender" style={labelStyle}>Gender</label>
            <select
              id="gender"
              name="gender"
              className="form-select"
              required
              value={formData.gender}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="place" style={labelStyle}>Place of Birth</label>
            <input
              type="text"
              id="place"
              name="place"
              className="form-control"
              placeholder="Place of Birth"
              required
              value={formData.place}
              onChange={handleChange}
              autoComplete="off"
              style={inputStyle}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="latitude" style={labelStyle}>Latitude</label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              className="form-control"
              placeholder="e.g. 28.6139"
              required
              value={formData.latitude}
              onChange={handleChange}
              autoComplete="off"
              style={inputStyle}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="longitude" style={labelStyle}>Longitude</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              className="form-control"
              placeholder="eg. 77.2090"
              required
              value={formData.longitude}
              onChange={handleChange}
              autoComplete="off"
              style={inputStyle}
            />
          </div>
        </div>
        <div className="mt-4 d-grid">
          <button
            className="btn btn-lg"
            type="submit"
            style={{
              background: orange,
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.18rem',
              borderRadius: '8px',
              padding: '0.7rem 2.5rem',
              boxShadow: '0 2px 8px #f2652255',
              border: 'none',
              letterSpacing: '0.5px',
              transition: 'background 0.2s',
              fontFamily,
            }}
          >
            Generate Kundli <span role="img" aria-label="crystal ball">🔮</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default KundliForm;
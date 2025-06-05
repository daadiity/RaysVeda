import React, { useState } from 'react';
import axios from 'axios';

const KundliForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '',
    gender: '',
    place: '',
    latitude: '',
    longitude: '',
  });

  const [loading, setLoading] = useState(false);
  const [interpretation, setInterpretation] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInterpretation('');

    try {
      const response = await axios.post('http://localhost:3000/api/gemini-interpret', formData);
      setInterpretation(response.data.interpretation);
    } catch (error) {
      alert('Error generating Kundli. Check backend logs.');
      console.error('Frontend error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url("https://dataconomy.com/wp-content/uploads/2023/08/kundli-gpt-AI_0_03-1536x861.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="card p-4 shadow-lg border-0" style={{ maxWidth: 600, width: '100%', borderRadius: '1rem', background: 'rgba(255,255,255,0.92)' }}>
        <h3 className="mb-4 text-center fw-bold" style={{ letterSpacing: '1px', color: '#3b3b5c' }}>
          Kundli Generator
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label fw-semibold">Full Name</label>
              <input type="text" name="name" className="form-control" required onChange={handleChange} autoComplete="off" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Date of Birth</label>
              <input type="date" name="dob" className="form-control" required onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Time of Birth</label>
              <input type="time" name="tob" className="form-control" required onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Gender</label>
              <select name="gender" className="form-select" required onChange={handleChange}>
                <option value="">Choose...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Place of Birth</label>
              <input type="text" name="place" className="form-control" placeholder="City, Country" required onChange={handleChange} autoComplete="off" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Latitude</label>
              <input type="text" name="latitude" className="form-control" placeholder="e.g., 28.6139" required onChange={handleChange} autoComplete="off" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Longitude</label>
              <input type="text" name="longitude" className="form-control" placeholder="e.g., 77.2090" required onChange={handleChange} autoComplete="off" />
            </div>
          </div>
          <div className="mt-4 d-grid">
            <button className="btn btn-primary btn-lg fw-bold" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/616/616494.png"
                    alt="Generating"
                    width="28"
                    height="28"
                    className="me-2"
                    style={{ verticalAlign: 'middle', animation: 'spin 1s linear infinite' }}
                  />
                  <span style={{ verticalAlign: 'middle' }}>Generating Kundli...</span>
                  <style>
                    {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                  </style>
                </>
              ) : (
                <>
                  Generate Kundli <span role="img" aria-label="crystal ball">🔮</span>
                </>
              )}
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616494.png"
              alt="Generating"
              width="48"
              height="48"
              style={{ animation: 'spin 1s linear infinite' }}
            />
            <style>
              {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
            </style>
            <p className="mt-2">Processing your Kundli...</p>
          </div>
        )}

        {interpretation && (
          <div className="mt-5 text-center">
            <h5 className="mb-3 fw-semibold">Kundli Interpretation</h5>
            <div className="alert alert-info">{interpretation}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KundliForm;
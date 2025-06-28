import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const detailBgImg = "https://i.pinimg.com/736x/01/91/35/019135a42563e7ae23c9f1a574735e38.jpg";
const cardBg = 'rgba(255,255,255,0.92)';
const orange = '#f26522';
const borderRadius = '1.5rem';
const fontFamily = "'Poppins', 'Merriweather', serif";

const KundliResultPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [interpretation, setInterpretation] = useState('');
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('kundliForm');
    if (!data) {
      navigate('/services/kundli');
      return;
    }
    setFormData(JSON.parse(data));
  }, [navigate]);

  useEffect(() => {
    if (!formData) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/gemini-interpret',
          formData
        );
        setInterpretation(response.data.interpretation);
      } catch (error) {
        setInterpretation('Error generating Kundli. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formData]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${detailBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        position: 'relative',
      }}
    >
      <div
        style={{
          background: cardBg,
          borderRadius,
          boxShadow: '0 0 32px 0 rgba(31, 38, 135, 0.15)',
          padding: '2.5rem 2rem 2rem 2rem',
          maxWidth: 500,
          width: '100%',
          border: `2px solid ${orange}`,
          zIndex: 1,
          position: 'relative',
        }}
      >
        {loading ? (
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
            <p className="mt-2" style={{ color: orange, fontFamily }}>
              Processing your Kundli...
            </p>
          </div>
        ) : (
          <div className="mt-5 text-center">
            <h5
              className="mb-3 fw-semibold"
              style={{ color: orange, fontFamily, fontWeight: 600 }}
            >
              Kundli Interpretation
            </h5>
            <div
              className="alert alert-info"
              style={{
                fontFamily,
                background: '#eaf6fb',
                color: '#222',
                border: `1.5px solid ${orange}`,
                borderRadius: 8,
                fontSize: '1.05rem',
                textAlign: 'left',
                margin: '0 auto',
                maxWidth: 440,
                fontWeight: 400,
              }}
            >
              {interpretation}
            </div>
            <button
              className="btn btn-outline-primary mt-4"
              style={{
                borderRadius: 8,
                fontFamily,
                fontWeight: 600,
                fontSize: '1.08rem',
                border: `2px solid ${orange}`,
                color: orange,
                background: '#fff',
                padding: '0.5rem 1.5rem',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/services/kundli')}
            >
              Generate Another Kundli
            </button>
          </div>
        )}
      </div>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default KundliResultPage;
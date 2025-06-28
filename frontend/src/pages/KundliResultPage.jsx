import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const godImages = [
  'https://kundliprint.com/wp-content/uploads/2025/06/kundliprint-vastu-photo-frame-printed-janam-kundli-pdf.webp',
  'https://kundliprint.com/wp-content/uploads/2025/06/kundliprint-vastu-photo-frame-printed-janam-kundli-pdf-1.webp',
  'https://kundliprint.com/wp-content/uploads/2025/06/kundliprint-vastu-photo-frame-printed-janam-kundli-pdf-2.webp'
];

const orangeGradient = 'linear-gradient(to right, #ff9800, #f26522)';
const cardBg = 'rgba(255, 255, 255, 0.95)';
const orange = '#f26522';
const borderRadius = '1.5rem';
const fontFamily = "'Poppins', 'Merriweather', serif";

const KundliResultPage = () => {
  const navigate = useNavigate();
  const [interpretation, setInterpretation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const data = sessionStorage.getItem('kundliResult');
    if (!data) {
      navigate('/services/kundli');
      return;
    }
    try {
      const parsed = JSON.parse(data);
      if (parsed?.interpretation) {
        setInterpretation(parsed.interpretation);
      } else {
        setError('No interpretation found.');
      }
    } catch {
      setError('Invalid result data.');
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    const onScroll = () => {
      const idx = Math.floor(window.scrollY / 200) % godImages.length;
      setScrollIndex(idx);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: '#fff7ea', fontFamily }}>
      {/* Gradient Header Section */}
      <div
        style={{
          background: orangeGradient,
          padding: '4rem 1rem 6rem',
          borderBottomLeftRadius: '120px 40px',
          borderBottomRightRadius: '120px 40px',
        }}
      >
        <div
          style={{
            maxWidth: '1150px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '3rem',
          }}
        >
          {/* Left Image */}
          <div style={{ flex: '1 1 40%', textAlign: 'center' }}>
            <img
              src={godImages[scrollIndex]}
              alt="Kundli Deity"
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              }}
            />
            <h5
              style={{
                color: '#fff',
                fontFamily,
                fontWeight: 600,
                marginTop: '1rem',
                fontSize: '1.2rem',
              }}
            >
              Your Kundli unveiled — scroll gently to reveal divine blessings.
            </h5>
          </div>

          {/* Right Result Card */}
          <div
            style={{
              flex: '1 1 50%',
              background: cardBg,
              borderRadius,
              border: `2px solid ${orange}`,
              boxShadow: '0 0 32px rgba(31,38,135,0.15)',
              padding: '2.2rem 1.8rem',
              maxWidth: '520px',
              width: '100%',
              margin: '0 auto',
            }}
          >
            {loading ? (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/616/616494.png"
                  alt="Generating"
                  width="48"
                  height="48"
                  style={{ animation: 'spin 1s linear infinite' }}
                />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                <p style={{ color: orange, fontFamily, marginTop: '0.75rem' }}>
                  Processing your Kundli...
                </p>
              </div>
            ) : error ? (
              <div
                style={{
                  borderRadius: 8,
                  fontFamily,
                  color: '#a94442',
                  background: '#f2dede',
                  padding: '1rem',
                }}
              >
                {error}
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: '#eaf6fb',
                    color: '#222',
                    border: `1.5px solid ${orange}`,
                    borderRadius: 8,
                    fontSize: '1.05rem',
                    textAlign: 'left',
                    padding: '1rem',
                    fontWeight: 400,
                    maxHeight: '400px',
                    overflowY: 'auto',
                  }}
                >
                  {interpretation}
                </div>
                <button
                  onClick={() => navigate('/services/kundli')}
                  style={{
                    borderRadius: 8,
                    fontFamily,
                    fontWeight: 600,
                    fontSize: '1.08rem',
                    border: `2px solid ${orange}`,
                    color: orange,
                    background: '#fff',
                    padding: '0.5rem 1.5rem',
                    marginTop: '1.5rem',
                    cursor: 'pointer',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  Generate Another Kundli
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default KundliResultPage;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KundliForm from '../components/KundliForm';

const formBg =
  `url("https://i.pinimg.com/736x/01/91/35/019135a42563e7ae23c9f1a574735e38.jpg")`;
const landingCard = 'rgba(255,255,255,0.96)';
const orange = '#f26522';
const orangeDark = '#d35400';
const borderRadius = '1.5rem';
const fontFamily = "'Poppins', 'Merriweather', serif";
const headingFont = "'Merriweather', serif";

const KundliFormPage = () => {
  const navigate = useNavigate();

  // Scroll to top when this page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (formData) => {
    sessionStorage.setItem('kundliForm', JSON.stringify(formData));
    navigate('/services/kundli/result');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: formBg,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        position: 'relative',
      }}
    >
      {/* Decorative top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: 90,
          background: 'linear-gradient(90deg, #fff7e6 60%, #ffe5c2 100%)',
          borderBottom: `2px solid ${orange}`,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily,
          fontWeight: 700,
          fontSize: '2.1rem',
          color: orangeDark,
          letterSpacing: '1px',
          boxShadow: '0 2px 12px #f2652212',
        }}
      >
        <span style={{ fontFamily: headingFont, fontWeight: 800 }}>
          Free Janam Kundli by RaysVeda
        </span>
      </div>

      {/* Main Card */}
      <div
        style={{
          background: landingCard,
          borderRadius,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
          padding: '2.8rem 2.2rem 2.2rem 2.2rem',
          maxWidth: 800,
          width: '100%',
          textAlign: 'center',
          border: `2.5px solid ${orange}`,
          position: 'relative',
          zIndex: 2,
          marginTop: 100,
          marginBottom: 30,
        }}
      >
        <h1
          style={{
            fontFamily: headingFont,
            fontWeight: 800,
            color: orange,
            fontSize: '2.7rem',
            marginBottom: '0.7rem',
            letterSpacing: '0.5px',
            textShadow: '0 2px 8px #f2652215',
          }}
        >
          Fill Your Birth Details
        </h1>
        <KundliForm onSubmit={handleFormSubmit} />
      </div>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default KundliFormPage;
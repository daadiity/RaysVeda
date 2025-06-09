import React from 'react';
import { useNavigate } from 'react-router-dom';

const landingBg =
  `url("https://i.pinimg.com/736x/a8/0d/4f/a80d4ff0eb2c859e043b3abb3028b2bc.jpg"),
   linear-gradient(120deg, #fff7e6 0%, #ffe5c2 100%),
   url("https://raysveda.com/images/kundli-bg.webp")`;
const landingCard = 'rgba(255,255,255,0.96)';
const orange = '#f26522';
const orangeDark = '#d35400';
const borderRadius = '1.5rem';
const fontFamily = "'Poppins', 'Merriweather', serif";
const headingFont = "'Merriweather', serif";
const subText = '#5a4632';

const KundliIntroPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: landingBg,
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        backgroundSize: 'contain, cover, cover',
        backgroundPosition: 'center, center, center',
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
          Free Janam Kundli (Birth Chart)
        </h1>
        <div
          style={{
            fontSize: '1.18rem',
            color: subText,
            marginBottom: '1.5rem',
            lineHeight: 1.7,
            fontFamily,
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: 700,
            margin: '0 auto',
          }}
        >
          <span style={{ color: orangeDark, fontWeight: 700 }}>
            Unlock the secrets of your destiny with your personalized Janam Kundli.
          </span>
          <br />
          <span>
            Kundli (Janam Kundli or Birth Chart) is the foundation of Vedic astrology. It is a celestial map created on the basis of your birth details—date, time, and place. Your Kundli reveals the positions of planets, stars, and other astrological aspects at the time of your birth, which influence your personality, strengths, weaknesses, career, relationships, and future events.
          </span>
          <br /><br />
          <span>
            <b>Why get your Kundli?</b> <br />
            <ul style={{
              textAlign: 'left',
              margin: '1rem auto 0 auto',
              maxWidth: 600,
              color: '#6b4b1a',
              fontSize: '1.08rem',
              lineHeight: 1.7,
              fontFamily,
              fontWeight: 500,
              paddingLeft: 24,
            }}>
              <li>Understand your strengths, weaknesses, and life path</li>
              <li>Get insights into career, marriage, health, and finances</li>
              <li>Know your planetary doshas and remedies</li>
              <li>Plan important events with auspicious timing (muhurat)</li>
              <li>Receive predictions and guidance for a better future</li>
            </ul>
          </span>
          <span>
            <b>RaysVeda’s Free Kundli</b> gives you a detailed birth chart, planetary positions, Lagna, Navamsa, and predictions in Hindi & English. Start your astrological journey now!
          </span>
        </div>
        <button
          className="btn btn-lg"
          style={{
            background: orange,
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.25rem',
            borderRadius: '8px',
            padding: '0.75rem 2.5rem',
            boxShadow: '0 2px 8px #f2652255',
            border: 'none',
            letterSpacing: '0.5px',
            transition: 'background 0.2s',
            fontFamily,
          }}
          onClick={() => navigate('/services/kundli/form')}
        >
          Generate Your Free Kundli
        </button>
        <div style={{
          marginTop: '2.2rem',
          color: orangeDark,
          fontSize: '1.03rem',
          fontFamily,
          fontWeight: 600,
          opacity: 0.85,
        }}>
          Powered by RaysVeda
        </div>
      </div>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default KundliIntroPage;
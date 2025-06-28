import React from 'react';

const orangeGradient = 'linear-gradient(to right, #ff7e00, #ffc107)';
const headingFont = "'Poppins', sans-serif";
const bodyFont = "'Poppins', sans-serif";

const kundliImg = "https://abblogging.com/wp-content/uploads/2021/08/kundli-matching-1536x1024.jpg";

const KundliIntroPage = () => (
  <div style={{ minHeight: '100vh', background: '#fff7ea', fontFamily: bodyFont }}>
    {/* Header with Gradient */}
    <div style={{
      background: orangeGradient,
      padding: '4.5rem 0',
      borderBottomLeftRadius: '120px 40px',
      borderBottomRightRadius: '120px 40px'
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Text Content */}
        <div style={{ flex: 1, minWidth: 320 }}>
          <h1 style={{
            fontFamily: headingFont,
            fontSize: '2.5rem',
            color: '#fff',
            fontWeight: 700
          }}>
            Free Janam Kundli (Birth Chart)
          </h1>
          <p style={{
            color: '#fffbe7',
            fontSize: '1.1rem',
            marginBottom: '1.5rem'
          }}>
            Your birth was no accident — the universe aligned its energies to script your journey. Discover what the cosmos holds for you.
          </p>
          <p style={{
            color: '#fff',
            fontSize: '1rem',
            marginBottom: '2rem'
          }}>
            Discover your destiny through the wisdom of Vedic astrology. Your Kundli is a cosmic map revealing the secrets of your life path.
          </p>
          <button
            onClick={() => window.location.href = '/services/kundli/form'}
            style={{
              background: '#fff',
              color: '#f26522',
              padding: '0.6rem 1.8rem',
              fontWeight: 600,
              border: '2px solid #f26522',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            Generate Your Kundli
          </button>
        </div>
        {/* Image */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img
            src={kundliImg}
            alt="Kundli"
            style={{ maxWidth: '100%', height: 300, borderRadius: 12 }}
          />
        </div>
      </div>
    </div>

    {/* Blogs Section */}
    <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.75rem', color: '#f26522', marginBottom: '1.2rem' }}>
        Explore the Wisdom of the Stars
      </h2>
      <p style={{ maxWidth: 800, margin: '0 auto', fontSize: '1rem', color: '#333' }}>
        Dive deeper into the world of astrology with handpicked blogs and articles that explain the science behind your Janam Kundli.
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.8rem',
        justifyContent: 'center',
        marginTop: '2rem'
      }}>
        {[
          {
            title: 'What is a Janam Kundli?',
            link: 'https://www.astrosage.com/kundli/',
          },
          {
            title: 'Importance of Birth Time in Astrology',
            link: 'https://www.astroyogi.com/articles/importance-of-time-in-kundli.aspx',
          },
          {
            title: 'How Vedic Astrology Can Help You',
            link: 'https://www.astrology.com/us/home.aspx',
          },
          {
            title: 'Reading Your Kundli Chart',
            link: 'https://www.ganeshaspeaks.com/astrology/kundli/',
          },
        ].map((blog, i) => (
          <a key={i}
             href={blog.link}
             target="_blank"
             rel="noopener noreferrer"
             style={{
               textDecoration: 'none',
               background: '#fff',
               borderRadius: '10px',
               boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
               padding: '1.5rem',
               width: 260,
               transition: 'transform 0.2s',
               color: '#f26522',
               fontWeight: 600,
               fontSize: '1rem'
             }}
             onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
             onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {blog.title}
          </a>
        ))}
      </div>
    </div>

    {/* Fonts */}
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
  </div>
);

export default KundliIntroPage;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import KundliForm from '../components/KundliForm';

const KundliPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [kundliResult, setKundliResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGenerateKundli = () => {
    console.log('🔮 Generate Kundli button clicked');
    setShowForm(true);
  };

  const handleKundliGenerated = (result) => {
    console.log('✅ Kundli generated successfully');
    setKundliResult(result);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    console.log('❌ Form closed');
    setShowForm(false);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  // Show login message for non-authenticated users
  if (!user) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '25px',
          padding: '4rem 3rem',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
          maxWidth: '600px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '2rem', opacity: '0.8' }}>🔒</div>
          <h1 style={{
            color: '#333',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            Please Login/Signup to See Kundli
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1.3rem',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Access your personalized Vedic Kundli generator with detailed astrological insights
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleLoginRedirect}
              style={{
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '1rem 2.5rem',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)'
              }}
            >
              🔑 Login
            </button>
            <button
              onClick={handleSignupRedirect}
              style={{
                background: 'transparent',
                color: '#ff6b35',
                border: '2px solid #ff6b35',
                borderRadius: '50px',
                padding: '1rem 2.5rem',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📝 Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Kundli Page for authenticated users
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif",
        padding: '2rem 1rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'white'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔮</div>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Welcome, {user.name}!
            </h1>
            <p style={{
              fontSize: '1.3rem',
              opacity: '0.9',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Discover your destiny through ancient Vedic astrology with AI-powered insights
            </p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              { icon: '⭐', title: 'Personality Analysis', desc: 'Core traits and characteristics' },
              { icon: '💼', title: 'Career Guidance', desc: 'Professional opportunities' },
              { icon: '💕', title: 'Relationship Insights', desc: 'Compatibility predictions' },
              { icon: '🌟', title: 'Life Predictions', desc: 'Future events and timing' }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ color: '#333', fontSize: '1.3rem', marginBottom: '0.8rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.5' }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Generate Kundli Button */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <button
              onClick={handleGenerateKundli}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#ff6b35',
                border: 'none',
                borderRadius: '50px',
                padding: '1.5rem 4rem',
                fontSize: '1.4rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>🔮</span>
              Generate My Kundli
            </button>
          </div>

          {/* Kundli Result Display */}
          {kundliResult && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '3rem',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                color: '#ff6b35',
                fontSize: '2.5rem',
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                Your Vedic Kundli Report 📊
              </h2>
              <div style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '15px',
                lineHeight: '1.8',
                fontSize: '1.1rem',
                color: '#333',
                whiteSpace: 'pre-wrap',
                maxHeight: '600px',
                overflowY: 'auto',
                border: '1px solid #eee'
              }}>
                {kundliResult}
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  onClick={() => setKundliResult(null)}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.3s'
                  }}
                >
                  🆕 Generate New Kundli
                </button>
              </div>
            </div>
          )}

          {/* How It Works */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#333', fontSize: '2.5rem', marginBottom: '2rem' }}>
              How It Works
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { step: '1', icon: '📝', text: 'Fill Birth Details' },
                { step: '2', icon: '🤖', text: 'AI Analysis' },
                { step: '3', icon: '📊', text: 'Get Report' },
                { step: '4', icon: '✨', text: 'Discover Future' }
              ].map((item, index) => (
                <div key={index} style={{ padding: '1rem' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                    color: 'white',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    margin: '0 auto 1rem'
                  }}>
                    {item.step}
                  </div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {item.icon}
                  </div>
                  <p style={{ color: '#666', fontWeight: '500' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FIXED MODAL POSITIONING - Centered Modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <KundliForm
            onClose={handleCloseForm}
            onKundliGenerated={handleKundliGenerated}
            setLoading={setLoading}
            loading={loading}
          />
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          flexDirection: 'column',
          color: 'white'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem', 
            animation: 'spin 2s linear infinite' 
          }}>
            🔮
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Generating Your Kundli...
          </h2>
          <p>Our AI is analyzing your birth chart</p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default KundliPage;
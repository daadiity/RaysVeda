import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export default function UserLoginForm() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(''); // 'email' or 'phone'
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });

    // Auto-detect input type for better UX
    if (e.target.name === 'emailOrPhone') {
      if (value.includes('@')) {
        setInputType('email');
      } else if (/^\d/.test(value)) {
        setInputType('phone');
      } else {
        setInputType('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Login attempt with:', { 
        emailOrPhone: formData.emailOrPhone,
        inputType: inputType 
      });
      
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: formData.emailOrPhone,
          password: formData.password
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        login(data.user, data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (inputType === 'email') return 'Enter your email address';
    if (inputType === 'phone') return 'Enter your phone number';
    return 'Email address or phone number';
  };

  const getInputIcon = () => {
    if (inputType === 'email') return '📧';
    if (inputType === 'phone') return '📱';
    return '👤';
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem 1rem'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '60px',
        height: '60px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '20%',
        width: '80px',
        height: '80px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 5s ease-in-out infinite'
      }}></div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRadius: '25px',
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative top bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ff6b35, #f7931e, #ff6b35)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite'
        }}></div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            animation: 'bounce 2s infinite'
          }}>🕉️</div>
          <h2 style={{
            color: '#333',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Welcome Back</h2>
          <p style={{
            color: '#666',
            fontSize: '1.1rem',
            fontWeight: '400'
          }}>Sign in to continue your spiritual journey</p>
        </div>

        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #ffe6e6, #ffcccc)',
            color: '#d63384',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            border: '1px solid #f5c6cb',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email/Phone Input */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: '#333',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              Email or Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem',
                zIndex: 1
              }}>
                {getInputIcon()}
              </span>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                required
                placeholder={getPlaceholder()}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  border: `2px solid ${inputType === 'email' ? '#28a745' : inputType === 'phone' ? '#007bff' : '#ddd'}`,
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  background: 'rgba(248, 249, 250, 0.8)',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff6b35';
                  e.target.style.background = '#fff';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = inputType === 'email' ? '#28a745' : inputType === 'phone' ? '#007bff' : '#ddd';
                  e.target.style.background = 'rgba(248, 249, 250, 0.8)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {/* Input type indicator */}
              {inputType && (
                <div style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: inputType === 'email' ? '#28a745' : '#007bff',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  animation: 'fadeIn 0.3s ease-out'
                }}>
                  {inputType === 'email' ? 'EMAIL' : 'PHONE'}
                </div>
              )}
            </div>
            {/* Helper text */}
            <p style={{
              fontSize: '0.85rem',
              color: '#666',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              💡 You can use email or phone number (with or without country code)
            </p>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: '#333',
              fontWeight: '600',
              fontSize: '1rem'
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem',
                zIndex: 1
              }}>
                🔒
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '1rem 3.5rem 1rem 3rem',
                  border: '2px solid #ddd',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  background: 'rgba(248, 249, 250, 0.8)',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff6b35';
                  e.target.style.background = '#fff';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#ddd';
                  e.target.style.background = 'rgba(248, 249, 250, 0.8)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: '#666',
                  transition: 'all 0.3s',
                  padding: '0.25rem'
                }}
                onMouseOver={(e) => e.target.style.color = '#ff6b35'}
                onMouseOut={(e) => e.target.style.color = '#666'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
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
              borderRadius: '12px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 8px 25px rgba(255, 107, 53, 0.3)',
              transform: loading ? 'none' : 'translateY(0)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 53, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.3)';
              }
            }}
          >
            {loading ? (
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ 
                  animation: 'spin 1s linear infinite',
                  display: 'inline-block'
                }}>⟳</span>
                Signing In...
              </span>
            ) : (
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <span>🚀</span>
                Sign In
              </span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1.5rem 0',
          borderTop: '1px solid #e9ecef'
        }}>
          <p style={{
            color: '#666',
            fontSize: '1rem',
            margin: '0 0 1rem 0'
          }}>
            Don't have an account?
          </p>
          <button
            onClick={() => navigate('/signup')}
            style={{
              background: 'transparent',
              border: '2px solid #ff6b35',
              color: '#ff6b35',
              padding: '0.75rem 2rem',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#ff6b35';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#ff6b35';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = ({ onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState('');
  const { login } = useAuth();

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:5000';

  // Phone number normalization function
  const normalizePhoneNumber = (phone) => {
    // Remove all non-digit characters
    let cleanPhone = phone.replace(/\D/g, '');
    
    // Handle different Indian phone number formats
    if (cleanPhone.length === 10) {
      // If 10 digits, assume it's without country code
      return cleanPhone;
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
      // If 11 digits starting with 0, remove the leading 0
      return cleanPhone.substring(1);
    } else if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      // If 12 digits starting with 91, remove country code
      return cleanPhone.substring(2);
    } else if (cleanPhone.length === 13 && cleanPhone.startsWith('910')) {
      // If 13 digits starting with 910, remove country code and leading 0
      return cleanPhone.substring(3);
    }
    
    // Return original clean phone if no standard format matches
    return cleanPhone;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });

    // Detect input type for better UX
    if (e.target.name === 'emailOrPhone') {
      if (value.includes('@')) {
        setInputType('email');
      } else if (/^\d+$/.test(value.replace(/\D/g, '')) && value.replace(/\D/g, '').length >= 10) {
        setInputType('phone');
      } else {
        setInputType('');
      }
    }

    if (error) setError('');
  };

  const isEmail = (input) => input.includes('@');
  
  const isPhone = (input) => {
    const cleanInput = normalizePhoneNumber(input);
    return cleanInput.length === 10 && /^\d+$/.test(cleanInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.emailOrPhone || !formData.password) {
      setError('Please provide email/phone and password');
      return;
    }

    const inputValue = formData.emailOrPhone.trim();
    
    if (!isEmail(inputValue) && !isPhone(inputValue)) {
      setError('Please provide a valid email address or 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const requestData = { password: formData.password };

      if (isEmail(inputValue)) {
        requestData.email = inputValue.toLowerCase();
        console.log('Attempting login with email:', requestData.email);
      } else {
        // Normalize phone number before sending
        const normalizedPhone = normalizePhoneNumber(inputValue);
        requestData.phone = normalizedPhone;
        console.log('Attempting login with normalized phone:', normalizedPhone, 'from input:', inputValue);
      }

      const response = await axios.post('/api/auth/login', requestData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        login(response.data.user);
        onClose();
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Invalid credentials. Please check your phone/email and password.');
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mb-4">
            <span className="text-2xl text-white">🕉️</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">RaysVeda</h1>
          <p className="text-gray-600">Welcome back to your spiritual journey</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in to your account</h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Phone Input */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email or Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  placeholder="email@example.com or 9876543210"
                  required
                />
                
                {/* Dynamic Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  {inputType === 'email' ? (
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  ) : inputType === 'phone' ? (
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>

                {/* Input Type Indicator */}
                {inputType && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      inputType === 'email' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {inputType === 'email' ? '📧 Email' : '📱 Phone'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Phone with or without 0 (e.g., 9876543210 or 09876543210)
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-orange-400 disabled:to-red-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <span className="text-gray-600 text-sm">Don't have an account? </span>
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors hover:underline"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2024 RaysVeda. Your spiritual journey begins here.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
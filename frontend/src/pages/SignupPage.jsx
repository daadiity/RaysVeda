import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import LoginForm from '../components/auth/LoginForm';

const SignupPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Navigate back to home page
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  const switchToSignup = () => {
    setShowLogin(false);
  };

  return (
    <>
      {showLogin ? (
        <LoginForm 
          onClose={handleClose}
          switchToSignup={switchToSignup}
        />
      ) : (
        <SignupForm 
          onClose={handleClose}
          switchToLogin={switchToLogin}
        />
      )}
    </>
  );
};

export default SignupPage;
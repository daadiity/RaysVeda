import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    console.log('AuthContext - Checking stored session...');
    console.log('Token exists:', !!token);
    console.log('User data exists:', !!userData);

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('AuthContext - Restored user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);


  // In your AuthContext or useAuth hook, add logging
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('🔍 Auth Debug:', {
      hasToken: !!token,
      hasUserData: !!userData,
      userData: userData ? JSON.parse(userData) : null
    });
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const login = (userData, token) => {
    console.log('AuthContext - Logging in user:', userData);
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log('AuthContext - Logging out user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

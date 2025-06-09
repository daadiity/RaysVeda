import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // Import axios

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize user and token from localStorage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("currentUser"); // Using 'currentUser' for clarity
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null; // Return null if parsing fails
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken"); // Store the JWT token
  });

  // Effect to manage axios default headers based on token
  useEffect(() => {
    if (token) {
      // Set the Authorization header for all future Axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("Axios Authorization header set.");
    } else {
      // Remove the Authorization header if no token is present
      delete axios.defaults.headers.common['Authorization'];
      console.log("Axios Authorization header removed.");
    }
    // No need to sync user from localStorage here if user state is already managed by login/logout
  }, [token]); // Re-run this effect whenever the token changes

  // Keep user state in sync with localStorage (for multi-tab/window, though less critical with token in header)
  useEffect(() => {
    const syncAuth = () => {
      try {
        const storedUser = localStorage.getItem("currentUser");
        const storedToken = localStorage.getItem("authToken");
        setUser(storedUser ? JSON.parse(storedUser) : null);
        setToken(storedToken);
      } catch (error) {
        console.error("Error syncing auth state from storage:", error);
        // If storage is corrupted, log out
        logout();
      }
    };

    window.addEventListener("storage", syncAuth); // Listen for changes in localStorage from other tabs/windows
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  // Modified login function to accept and store the token
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("currentUser", JSON.stringify(userData)); // Store user data
    localStorage.setItem("authToken", authToken); // Store the token
    console.log("User logged in, token stored:", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    // Axios header will be removed by the useEffect hook when token becomes null
    console.log("User logged out, token removed.");
  };

  // Provide a loading state if you want to delay rendering until auth status is checked
  // For your `ProtectedRoute`, `user === undefined` currently serves this purpose.
  // If `user` starts as `null` initially (which it does with `useState(() => ...)`)
  // you might need to adjust `ProtectedRoute` or add an `isLoading` state here.
  const authContextValue = {
    user,
    token, // You can expose token if needed elsewhere, though usually just managed internally
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  // Login function to set token and user data in state and localStorage
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // Default to 1 hour expiration
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: token,
      expiration: tokenExpirationDate.toISOString()
    }));
  }, []);

  // Logout function to clear the data from state and localStorage
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  // Auto-logout based on token expiration
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // Effect to check and restore data from localStorage on initial load or page refresh
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      const storedExpirationDate = new Date(storedData.expiration);
      if (storedExpirationDate > new Date()) {
        login(storedData.userId, storedData.token, storedExpirationDate);
      } else {
        console.log("Token has expired");
        logout(); // Ensure logout is triggered if the token has expired
      }
    } else {
      console.log("No valid token found in localStorage");
    }
  }, [login, logout]);

  return { token, login, logout, userId };
};

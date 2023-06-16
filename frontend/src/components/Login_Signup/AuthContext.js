import React, { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const setLoginStatus = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

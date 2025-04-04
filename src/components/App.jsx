import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import NoteApp from './page/NoteApp';

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/signIn" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("authToken"))); 

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("authToken")));
    };
  
    window.addEventListener("popstate", checkAuth);
    return () => window.removeEventListener("popstate", checkAuth);
  }, []);
  
  const handleLogin = () => {
    localStorage.setItem("authToken", "yourToken"); 
    setIsAuthenticated(true);
    window.history.replaceState(null, "", "/notes"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signIn" />} />
        <Route
          path="/signIn"
          element={isAuthenticated ? <Navigate to="/notes" replace /> : <SignIn onAuthChange={handleLogin} />}
        />
        <Route
          path="/signUp"
          element={isAuthenticated ? <Navigate to="/notes" replace /> : <SignUp onAuthChange={handleLogin} />}
        />
        <Route
          path="/notes"
          element={<ProtectedRoute element={<NoteApp onLogout={handleLogout} />} isAuthenticated={isAuthenticated} />}
        />
        <Route path="*" element={<Navigate to="/signIn" />} />
      </Routes>
    </Router>
  );
}

export default App;
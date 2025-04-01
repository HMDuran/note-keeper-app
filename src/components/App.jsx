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
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signIn" />} />
        <Route path="/signUp" element={<SignUp onAuthChange={handleLogin} />} />
        <Route path="/signIn" element={<SignIn onAuthChange={handleLogin} />} />
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
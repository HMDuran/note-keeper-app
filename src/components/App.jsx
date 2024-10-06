import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  </Router>
  )
}

export default App;
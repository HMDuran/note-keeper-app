import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './auth/SignUp'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />  
        <Route path="/signUp" element={<SignUp />} />  
        <Route path="*" element={<Navigate to="/" />} />  
      </Routes>
    </Router>
  );
}

export default App;
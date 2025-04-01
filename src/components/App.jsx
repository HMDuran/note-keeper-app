import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';  
import NoteApp from './page/NoteApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signIn" />} />  
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />  
        <Route path="/notes" element={<NoteApp />} />
        <Route path="*" element={<Navigate to="/signIn" />} />
      </Routes>
    </Router>
  );
}

export default App;

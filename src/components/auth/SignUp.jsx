import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthForm from './AuthForm';

const SignUp = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async ({ firstName, lastName, email, password, confirmPassword, resetForm }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ 
          firstName,
          lastName,
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }
  
      const data = await response.json();
      toast.success("User created successfully! Please sign in.");
      resetForm();
      setTimeout(() => navigate('/signIn'), 2000);
    } catch (error) {
      console.error("Error during signup:", error.message);
      toast.error(error.message || "No response from server. Please try again later.");
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    navigate(isSignIn ? '/signUp' : '/signIn'); 
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('signUp')) {
      setIsSignIn(false);
    } else {
      setIsSignIn(true);
    }
  }, [window.location.pathname]);

  return (
    <>
      <AuthForm onSubmit={handleSignUp} isSignIn={isSignIn} toggleAuthMode={toggleAuthMode} />
      <ToastContainer />
    </>
  );
};

export default SignUp;
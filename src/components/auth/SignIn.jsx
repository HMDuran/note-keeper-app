import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthForm from './AuthForm';

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {    
    try {
      if (!isSignIn) {
        if (!formData.confirmPassword || formData.password.trim() !== formData.confirmPassword.trim()) {
          toast.dismiss();
          toast.error("Passwords do not match!");
          return;
        }

        toast.dismiss();
        toast.success("Sign-up successful! Please sign in.");
        return;
      }

      const response = await fetch("http://localhost:5174/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.dismiss();
        toast.error(data.message || "Invalid email or password");
        return;
      }

      toast.dismiss();
      toast.success("Sign-in successful!");

      window.location.href = "/notes";  
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred. Please try again later.");
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    navigate(isSignIn ? '/signUp' : '/signIn');
  };

  return (
    <div>
      <AuthForm isSignIn={isSignIn} onSubmit={handleSubmit} toggleAuthMode={toggleAuthMode} />
      <ToastContainer />
    </div>
  );
};

export default SignIn;
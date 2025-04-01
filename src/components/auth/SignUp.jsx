import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthForm from './AuthForm';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async ({ firstName, lastName, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5174/api/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });
  
      console.log("User created successfully:", response.data);
      toast.dismiss();
      toast.success("User created successfully! Please sign in.");
      setTimeout(() => navigate('/signIn', { state: { message: "User created successfully! Please sign in" } }), 2000);
    } catch (error) {
      console.error("Error during signup:", error);
  
      if (error.response) {
        toast.error(error.response.data.message || "Failed to create user");
      } else {
        toast.error("No response from server. Please try again later.");
      }
    }
  };
  
  return (
    <>
      <AuthForm onSubmit={handleSignUp} />
      <ToastContainer />
    </>
  );
};

export default SignUp;
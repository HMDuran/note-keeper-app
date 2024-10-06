import React from 'react';
import AuthForm from './AuthForm';

const SignIn = () => {
  const handleSignIn = () => {
    
  };

  return <AuthForm isSignIn={true} onSubmit={handleSignIn} />;
};

export default SignIn;
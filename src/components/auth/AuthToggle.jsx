import React from 'react';

const AuthToggle = ({ isSignIn, toggleAuthMode }) => (
  <div className="text-center">
    <span className="text-sm text-gray-600">
      {isSignIn ? "Don't have an account? " : 'Already have an account? '}
    </span>
    <button
      className="mt-2 text-br font-semibold hover:underline"
      onClick={(e) => {
        e.preventDefault();
        toggleAuthMode(); 
      }}
    >
      {isSignIn ? 'Sign Up' : 'Sign In'}
    </button>
  </div>
);

export default AuthToggle;

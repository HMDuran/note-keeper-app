import React, { useState } from 'react';
import Logo from '../common/Logo';
import AuthToggle from './AuthToggle';
import InputField from '../common/InputField';
import GoogleSignIn from './GoogleSignIn';

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 shadow bg-white sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <Logo />
            <h2 className="text-2xl xl:text-3xl font-bold">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>

            <div className="w-full flex-1 mt-8">
              <div className={`mx-auto ${!isSignIn ? 'max-w-xl' : 'max-w-xs'}`}>
                {!isSignIn && (
                  <div className="flex flex-col sm:flex-row gap-0">
                    <InputField type="text" placeholder="First Name" />
                    <InputField className="ml-0 sm:ml-4" type="text" placeholder="Last Name" />
                  </div>
                )}
                <InputField type="email" placeholder="Email" />
                <div className="flex flex-col md:flex-row sm:gap-0">
                  <InputField type="password" placeholder="Password" />
                  {!isSignIn && <InputField className="ml-0 md:ml-4" type="password" placeholder="Confirm Password" />}
                </div>

                <AuthToggle isSignIn={isSignIn} toggleAuthMode={toggleAuthMode} />

                <button className="mt-5 tracking-wide font-semibold bg-tan-200 hover:text-white text-black w-full py-4 rounded-lg hover:bg-tan-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-3">{isSignIn ? 'Sign In' : 'Sign Up'}</span>
                </button>
              </div>
            </div>

            {isSignIn && <GoogleSignIn />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
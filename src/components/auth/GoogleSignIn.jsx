import React from 'react';

const GoogleSignIn = () => (
  <div className="my-4 text-center">
    <div className="leading-none psx-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
      Or sign in with Google
    </div>

    <div className="flex flex-col items-center mt-6">
      <button className="w-full max-w-xs px-16 font-bold border border-black hover:bg-gray-100 hover:text-brown-200 shadow-sm rounded-lg py-3 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
        <div className="p-2 rounded-full">
        </div>
        <span className="ml-4">Sign In with Google</span>
      </button>
    </div>
  </div>
);

export default GoogleSignIn;
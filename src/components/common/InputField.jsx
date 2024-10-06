import React from 'react';

const InputField = ({ type, placeholder, className }) => (
  <input
    className={`w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4 ${className}`}
    type={type}
    placeholder={placeholder}
  />
);

export default InputField;

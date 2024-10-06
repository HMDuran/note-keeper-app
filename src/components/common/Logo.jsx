import React from "react";
import logo from "../../assets/images/logo/logo.png";

const Logo = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <img className="w-12 h-16" src={logo} alt="logo" /> 
            <h1 className="mt-3 mb-2 font-extrabold text-4xl">ote Keeper</h1>
         </div>
    )
};

export default Logo;


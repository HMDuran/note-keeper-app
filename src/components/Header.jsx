import React from "react";
import logo from "../assets/images/logo/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ onLogout }) => {
    return (
        <header className="bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-10 w-10 object-cover"
                    />
                    <span className="text-2xl pt-4 font-glacial font-extrabold text-gray-800">ote Keeper</span>
                </div>
                <button
                    onClick={onLogout}
                    className="text-2xl text-gray-800 hover:text-brown-200"
                    title="Logout"
                >
                   <LogoutIcon /> 
                </button>
            </div>
        </header>
    );
};

export default Header;
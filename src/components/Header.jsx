import React from "react";
import logo from "../assets/images/logo/logo.png";

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
                    <span className="text-3xl font-glacial font-extrabold text-gray-800">Note Keeper</span>
                </div>

                <button
                    onClick={onLogout}
                    className="text-2xl text-gray-800 hover:text-red-600"
                    title="Logout"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
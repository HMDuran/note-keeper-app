import React, { useState } from "react";
import Header from "../Header";

const NoteApp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        window.location.href = "/signIn";
    };

    if (!isAuthenticated) {
        return null; 
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header onLogout={handleLogout} />
            <div className="flex-grow p-4">
                <h1>Welcome to Notes App!</h1>
            </div>
        </div>
    );
};

export default NoteApp;
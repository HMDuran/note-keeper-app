import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleSignIn = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  const handleSuccess = async (response) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/google-signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });
  
      const data = await res.json();
      if (!res.ok) {
        console.error("Server error:", res.status, data.message);
        alert(`Google Sign-In Error: ${data.message}`);
        return;
      }
  
      console.log("Server response:", data);
      if (data.success) {
        window.location.href = "/notes";
      } else {
        alert(`Google Sign-In Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Unexpected error during Google Sign-In:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleError = (error) => {
    console.error("Google Login Failed", error);
    alert("Google Sign-In failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="my-4 text-center">
        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
          Or sign in with Google
        </div>

        <div className="flex flex-col items-center mt-6">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
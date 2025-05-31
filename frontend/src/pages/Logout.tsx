import React from "react";
import { SignOut } from "@databutton/firebase-auth/react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-lime-50">
      <div className="p-8 bg-white shadow-xl rounded-2xl text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Log out of Prakriti?</h2>
        <SignOut
          onSuccess={() => {
            // Navigate to home page after successful logout
            navigate("/"); 
          }}
        />
      </div>
    </div>
  );
}

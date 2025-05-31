import React from "react";
import { SignIn } from "@databutton/firebase-auth/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-lime-50">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Login to Prakriti</h2>
        <SignIn
          onSuccess={() => {
            // Navigate to home page after successful login
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}

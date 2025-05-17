"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard"); // Redirect to dashboard if already signed in
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Admin welcome */}
      <div className="flex-1 flex flex-col p-8 justify-center items-center">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#4F46E5" fillOpacity="0.1" />
              <path d="M20 12L26 16V24L20 28L14 24V16L20 12Z" fill="#4F46E5" />
            </svg>
            <span className="ml-2 font-bold text-lg text-gray-800">Logo</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Welcome, Administrators</h2>
            <p className="text-lg text-gray-600">Access the admin portal to manage your school resources</p>
          </div>

          {/* Styled Sign In Button */}
          <SignInButton mode="modal">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors">
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </SignInButton>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden md:flex flex-1 bg-blue-500 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <div className="mb-8">
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M150 50C180 80 220 120 180 150C140 180 120 140 90 160C60 180 30 150 50 120C70 90 120 20 150 50Z"
                stroke="white"
                strokeWidth="2"
              />
              <circle cx="100" cy="80" r="10" fill="#FF6B6B" />
              <circle cx="200" cy="120" r="15" fill="#FFD166" />
              <path d="M120 100C130 90 140 100 130 110C120 120 110 110 120 100Z" fill="#4ECDC4" />
              <path d="M160 70L170 90L150 90L160 70Z" fill="#FF6B6B" />
              <path d="M90 130L100 150L80 150L90 130Z" fill="#FFD166" />
              <path d="M180 60C190 50 200 60 190 70C180 80 170 70 180 60Z" fill="#4ECDC4" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2">Smart Campus Admin Portal</h2>
          <p className="text-lg">Where dreams are made</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

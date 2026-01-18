
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Inputbox from "../InputButton/Inputbox";
import Button from "../Button/Button";

export default function LoginForm() {
  const navigate = useNavigate(-1); // React Router hook for navigation

  return (
    <div className="relative scroll-auto bg-black inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-sm">
    <div className="min-h-screen flex items-center justify-center py-6 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          
          {/* ✖ Close Button */}
          <button
            onClick={() => navigate("/")}  // Navigates back to the previous page
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>

          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Login</h1>

            <div className="divide-y divide-gray-200">
              <div className="py-8 space-y-4 text-gray-700">
                
                <Inputbox type="text" label="Email Address" />
                <Inputbox type="password" label="password" />

                <div className="relative">
                  <Button label="Submit" className="rounded-md px-4 py-2 w-full text-white bg-gradient-to-r from-blue-500 to-sky-500" />
                </div>
              </div>

              <p className="text-center mt-4">
                Don't have an account?  
                <Link to="/sign-up" className="text-blue-500 hover:underline ml-1">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center mt-4">
            <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 0 48 48"
              >
                <path d="M9.82727273,24 C9.82727273,22.4757333 ..." fill="#FBBC05"></path>
                <path d="M23.7136364,10.1333333 C27.025,10.1333333 ..." fill="#EB4335"></path>
                <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 ..." fill="#34A853"></path>
                <path d="M46.1454545,24 C46.1454545,22.6133333 ..." fill="#4285F4"></path>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

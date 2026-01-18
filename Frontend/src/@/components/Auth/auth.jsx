import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  MapPin,
  Briefcase,
  Code,
  Eye,
  EyeOff,
  Signal,
} from "lucide-react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const AuthComponent = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // Form data states
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    locationRequestDTO: {
      city: "",
      state: "",
      country: "",
    },
    userCategory: "",
    preferredLanguage: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  // Options for dropdowns
  const genderOptions = [
  { label: "Select Gender", value: "" },
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];

const categoryOptions = [
  { label: "Select Category", value: "" },
  { label: "Student", value: "STUDENT" },
  { label: "Working Professional", value: "WORKING_PROFESSIONAL" },
];

const languageOptions = [
  { label: "Select Language", value: "" },
  { label: "Java", value: "JAVA" },
  { label: "Python", value: "PYTHON" },
  { label: "C++", value: "CPP" },
  { label: "JavaScript", value: "JAVA_SCRIPT" },
  { label: "C", value: "C" },
];


  // Handle input changes for sign up
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setSignUpData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setSignUpData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle input changes for sign in
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle registration request
  const handleRegistrationRequest = async () => {
  setLoading(true);
  setMessage("");

  try {
    const response = await fetch("http://localhost:8080/central/user/registration-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
    });

    const data = await response.json();

    if (response.ok) {
      // Success case
      setMessage(data.message || "OTP sent successfully!");
      setOtpSent(true);
    } else {
      // Backend error case (400, 404, 409 etc.)
      // Handle MethodArgumentNotValidException (which returns a map of field errors)
      if (typeof data.message === 'object') {
        const errors = Object.values(data.message).join(", ");
        setMessage(errors);
      } else {
        setMessage(data.message || "An error occurred.");
      }
    }
  } catch (error) {
    setMessage("Connection lost. Is the server running?");
  } finally {
    setLoading(false);
  }
};

  const handleRegistration = async () => {
    setLoading(true);
    setMessage("");

    // Check if OTP is entered
    if (!otp || otp.trim().length === 0) {
      setMessage("Please enter a valid OTP.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/central/user/register?otp=${otp}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        }
      );
      // console.log(response.json())
      const data = await response.json();

      if (data.valid) {
        // ✅ OTP is valid and registration succeeded
        setMessage(data.message || "Registration successful!");
        // Reset form and switch to sign-in view
        setSignUpData({
          name: "",
          email: "",
          password: "",
          gender: "",
          locationRequestDTO: {
            city: "",
            state: "",
            country: "",
          },
          userCategory: "",
          preferredLanguage: "",
        });

        setOtp("");
        setOtpSent(false);
        setIsSignUp(false);
      } else {
        setMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle sign in
  // Handle sign in
  const handleSignIn = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8090/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      const data = await response.json();

      // Changed from data.valid to data.authenticated based on your new response
      if (data.authenticated) {
        // Save the JWT token
        localStorage.setItem("token", data.token);
        
        // Since your new response only sends token and authenticated status,
        // you might want to fetch the profile in a separate call or 
        // handle the absence of data.profile here.
        if (data.profile) {
          localStorage.setItem("profile", JSON.stringify(data.profile));
          if (data.profile.preferredLanguage) {
            localStorage.setItem("preferredLanguage", data.profile.preferredLanguage);
          }
        }

        setMessage("Login successful!");
        
        // Navigate to previous page or home
        navigate(-1);
      } else {
        // Handle the case where authenticated is false
        setMessage(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-600">
            {isSignUp ? "Sign up to get started" : "Sign in to your account"}
          </p>
        </div>

        {/* Sign In Form */}
        {!isSignUp && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={signInData.email}
                  onChange={handleSignInChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                {message && (
                  <p
                    style={{
                      color: message.includes("successful") ? "green" : "red",
                    }}
                  >
                    {message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        )}

        {/* Sign Up Form */}
        {isSignUp && !otpSent && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={signUpData.gender}
                  onChange={handleSignUpChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {genderOptions.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="userCategory"
                  value={signUpData.userCategory}
                  onChange={handleSignUpChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {categoryOptions.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="grid grid-cols-1 gap-3">
                <input
                  type="text"
                  name="locationRequestDTO.city"
                  value={signUpData.locationRequestDTO.city}
                  onChange={handleSignUpChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="locationRequestDTO.state"
                    value={signUpData.locationRequestDTO.state}
                    onChange={handleSignUpChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="State"
                    required
                  />
                  <input
                    type="text"
                    name="locationRequestDTO.country"
                    value={signUpData.locationRequestDTO.country}
                    onChange={handleSignUpChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Country"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Language
              </label>
              <select
                name="preferredLanguage"
                value={signUpData.preferredLanguage}
                onChange={handleSignUpChange}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {languageOptions.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {message && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${
                  message.includes("successful") ||
                  message.includes("OTP is sent")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <button
              onClick={handleRegistrationRequest}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* OTP Verification Form */}
        {isSignUp && otpSent && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Verify Your Email
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Enter the OTP sent to {signUpData.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                placeholder="Enter OTP"
                maxLength="6"
                required
              />
            </div>
            {message && (
              <div
                style={{ color: message.includes("success") ? "green" : "red" }}
              >
                {message}
              </div>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setMessage("");
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleRegistration}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Verifying..." : "Verify & Register"}
              </button>
            </div>
          </div>
        )}

        {/* Toggle between Sign In and Sign Up */}
        {!otpSent && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setMessage("");
                }}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AuthComponent;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authService = new AuthService();

  const handleLogin = async () => {
    setError("");
    const result = await authService.login(username, password);
    if (result.success) {
      navigate(result.redirect || "/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-green-50">
      
      {/* LEFT: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
          
          {/* App Stores (optional) */}
          <div className="flex gap-2 mb-6">
            <img src="/google-play.png" alt="Google Play" className="h-8" />
            <img src="/app-store.png" alt="App Store" className="h-8" />
          </div>

          <h2 className="text-gray-600">Welcome</h2>
          <h1 className="text-3xl font-bold mb-6">Log In</h1>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Your Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="text-right text-sm text-green-600 mb-6 cursor-pointer">
            Login help needed?
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
          >
            Log In
          </button>

          {/* Signup */}
          <p className="text-center text-sm mt-6">
            Don&apos;t have an account?{" "}
            <span className="text-green-700 font-semibold cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT: Branding / Illustration */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
        <div className="absolute top-10 right-10 flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-2xl font-bold text-green-800">
            FarmSense AI
          </span>
        </div>

        <img
          src="/farm-illustration.png"
          alt="Farm Illustration"
          className="w-3/4"
        />
      </div>
    </div>
  );
};

export default Login;
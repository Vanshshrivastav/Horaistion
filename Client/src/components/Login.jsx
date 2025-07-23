import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1E1E] px-4">
      <div className="relative w-full max-w-md bg-[#121212] p-8 rounded-xl shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-200 transition"
        >
          ← Back
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-center text-white">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          {isSignUp
            ? "Create an account to explore amazing features."
            : "Welcome back! Please login to continue."}
        </p>

        {/* Form */}
        <form className="space-y-4">
          {isSignUp && (
            <div>
              <label
                className="block text-sm text-gray-300 mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E3B505]"
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E3B505]"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              className="block text-sm text-gray-300 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E3B505]"
              placeholder="Enter your password"
            />
          </div>
          {isSignUp && (
            <div>
              <label
                className="block text-sm text-gray-300 mb-1"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E3B505]"
                placeholder="Confirm your password"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-[#E3B505] hover:bg-[#2E2E2E] text-white font-semibold rounded-lg transition duration-300"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400 mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-400 hover:text-[#E3B505] font-medium"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>

        {/* Social Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">Or continue with</p>
          <div className="flex justify-center gap-4 mt-4">
            {/* Facebook Login */}
            <button className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="h-6 w-6"
              />
            </button>
            {/* Google Login */}
            <button className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
              <img
                src="https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg"
                alt="Google Chrome"
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

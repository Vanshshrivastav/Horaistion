import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6002/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('fullname', response.data.fullname);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('isLoggedIn', 'true'); 

        if (response.data.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
        showToast(`Welcome back, ${response.data.email.split('@')[0]}!`, "success");
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast(error.response?.data?.message || 'Login failed', "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-center items-center px-6">

      {/* Login Form Container */}
      <div className="relative w-full max-w-md bg-[#121212] p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">Login</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Access your watchlist & preferences</p>
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              required
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#23252B] border border-white/5 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-[#F47521] outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              required
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#23252B] border border-white/5 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-[#F47521] outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#F47521] hover:bg-white text-black font-black py-4 rounded uppercase tracking-tighter transition-all transform hover:-translate-y-1 shadow-lg shadow-[#F47521]/10 mt-4"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Don't have an account? </span>
          <Link to="/Register" className="text-[#F47521] text-xs font-black uppercase tracking-wider hover:underline ml-1">
            Sign Up
          </Link>
        </div>


      </div>
    </div>
  );
};

export default Login;
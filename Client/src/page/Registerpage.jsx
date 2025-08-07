import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        conformPassword: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:6002/Signup', formData);
            console.log('Form Submitted:', res.data);
            if (res.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="relative w-full max-w-md bg-[#121212] p-8 rounded-xl shadow-lg">
                {/* Back Button */}
                <div className="mb-8">
                    <Link to="/" className="text-gray-400 hover:text-white flex items-center">
                        ← Back
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
                    <p className="text-gray-400">Create an account to explore amazing features.</p>
                </div>

                <form className="space-y-6 " onSubmit={handleSubmit}>
                    {/* Full Name Input */}
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Full Name</label>
                        <input
                            required
                            type="text"
                            placeholder="Enter your full name"
                            name='fullname'
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Email Address</label>
                        <input
                            required
                            type="email"
                            name='email'
                            value={formData.email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Password</label>
                        <input
                            required
                            type="password"
                            name='password'
                            value={formData.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Confirm Password</label>
                        <input
                            required
                            type="password"
                            placeholder="Confirm your password"
                            onChange={handleChange}
                            name='conformPassword'
                            value={formData.conformPassword}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-center">
                        <label className="text-sm select-none flex items-center text-gray-300">
                            <input
                                required
                                type="checkbox"
                                className="mr-2 accent-yellow-500"
                            />
                            I agree to the Terms & Conditions
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 transition rounded-lg py-3 font-semibold text-black"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-6">
                    <span className="text-gray-400">Already have an account? </span>
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
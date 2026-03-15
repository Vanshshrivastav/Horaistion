import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#121212] min-h-screen text-white pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          {/* Left Column: Form */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-4">
                <div className="w-2 h-10 bg-[#F47521]" />
                Get in Touch
            </h1>
            <form className="space-y-6">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#F47521] hover:bg-white transition-all rounded py-4 font-black text-black uppercase tracking-tighter transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column: Image and Contact Info */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl mb-8">
                <img 
                  src="https://unblast.com/wp-content/uploads/2020/09/Contact-Us-Vector-Illustration.jpg" 
                  alt="Contact Us Illustration" 
                  className="w-full max-w-md transition-transform duration-500 group-hover:scale-110" 
                />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-black text-[#F47521] uppercase italic tracking-tighter mb-4">Contact Information</h2>
              <p className="text-lg text-gray-400 font-bold mb-2">support@horaistion.com</p>
              <p className="text-lg text-gray-400 font-bold">+1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
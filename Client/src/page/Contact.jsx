import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#1E1E1E] min-h-screen text-white p-8">
        <div className="max-w-6xl mx-auto bg-[#121212] p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center">
          {/* Left Column: Form */}
          <div className="w-full md:w-1/2 md:pr-8">
            <h1 className="text-4xl font-bold text-center md:text-left text-[#E3B505] mb-8">Get in Touch</h1>
            <form>
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
                className="w-full bg-yellow-500 hover:bg-yellow-600 transition rounded-lg py-3 font-semibold text-black transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column: Image and Contact Info */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8 flex flex-col items-center">
            <img 
              src="https://unblast.com/wp-content/uploads/2020/09/Contact-Us-Vector-Illustration.jpg" 
              alt="Contact Us Illustration" 
              className="w-full max-w-md rounded-lg shadow-lg mb-8"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#E3B505] mb-4">Contact Information</h2>
              <p className="text-lg text-gray-300 mb-2">Email: support@horaistion.com</p>
              <p className="text-lg text-gray-300">Phone: +1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
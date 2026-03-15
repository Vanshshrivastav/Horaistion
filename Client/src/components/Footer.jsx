import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#121212] border-t border-gray-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="text-3xl font-black text-[#F47521] tracking-tighter uppercase italic mb-6 block">
                            Horaistion
                        </Link>
                        <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                            The ultimate destination for anime, movies, and TV shows. Join our community and discover your next favorite series with Horaistion.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-400 hover:text-[#F47521] text-sm transition-colors">Home</Link></li>
                            <li><Link to="/topairing" className="text-gray-400 hover:text-[#F47521] text-sm transition-colors">Anime</Link></li>
                            <li><Link to="/movie" className="text-gray-400 hover:text-[#F47521] text-sm transition-colors">Movies</Link></li>
                            <li><Link to="/tvshow" className="text-gray-400 hover:text-[#F47521] text-sm transition-colors">TV Shows</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><Link to="/contact" className="text-gray-400 hover:text-[#F47521] text-sm transition-colors">Contact Us</Link></li>
                            <li><button className="text-gray-400 hover:text-[#F47521] text-sm transition-colors">Privacy Policy</button></li>
                            <li><button className="text-gray-400 hover:text-[#F47521] text-sm transition-colors">Terms of Service</button></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © 2026 Horaistion. All rights reserved. Built for fans, by fans.
                    </p>
                    <div className="flex gap-6">
                        <div className="w-8 h-8 rounded-full bg-[#23252B] flex items-center justify-center hover:bg-[#F47521] transition-colors cursor-pointer group">
                           <span className="text-white text-xs group-hover:text-black">FB</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#23252B] flex items-center justify-center hover:bg-[#F47521] transition-colors cursor-pointer group">
                           <span className="text-white text-xs group-hover:text-black">TW</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#23252B] flex items-center justify-center hover:bg-[#F47521] transition-colors cursor-pointer group">
                           <span className="text-white text-xs group-hover:text-black">IG</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

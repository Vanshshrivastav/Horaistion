import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
        setIsAdmin(localStorage.getItem('role') === 'admin');

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            } else {
                navigate('/search');
            }
        }
    };

    const navLinks = [

        { name: "Anime", path: "/topairing" },
        { name: "Movies", path: "/movie" },
        { name: "TV Shows", path: "/tvshow" },
        { name: "Trending", path: "/Mostwatch" },
        { name: "Community", path: "/contact" },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#121212] shadow-xl py-2" : "bg-transparent py-4"}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo & Main Nav */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-black text-[#F47521] tracking-[-0.1em] uppercase italic flex-shrink-0 mr-4">
                        Horaistion
                    </Link>

                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm font-bold text-white uppercase tracking-widest hover:text-[#F47521] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Search & Actions */}
                <div className="flex items-center gap-6">
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-[#23252B] rounded px-3 py-1.5 border border-transparent focus-within:border-[#F47521] transition-all">
                        <input
                            type="text"
                            placeholder="Search titles..."
                            className="bg-transparent border-none outline-none text-sm text-white w-48 lg:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <button onClick={handleSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-[#F47521]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden sm:flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <Link to="/watchlist" className="hover:text-[#F47521] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </Link>
                                <div className="group relative">
                                    <button className="h-10 w-10 rounded-full bg-[#F47521] flex items-center justify-center font-bold text-black hover:ring-2 hover:ring-white transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-[#23252B] rounded-md shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-700">
                                        {isAdmin && (
                                            <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-[#F47521] hover:text-black transition-colors">
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-[#F47521] hover:text-black transition-colors">
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-[#F47521] text-black font-bold py-2 px-6 rounded uppercase tracking-tighter hover:bg-white transition-all"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

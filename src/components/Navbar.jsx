import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <header className="bg-[#121212] text-gray-600 relative z-10">
            <div className="mx-auto flex items-center justify-between p-4">
                {/* Dropdown and Logo */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 text-[#D3D3D3] bg-[#242424f1] rounded-md"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <Link to="/" className="text-[#D3D3D3] text-lg">
                        Horaistion
                    </Link>
                </div>

                {/* Desktop Search Bar and Login Button */}
                <div className="hidden md:flex items-center max-w-sm w-full">
                    <input
                        className="w-full bg-transparent text-[#E3B505] border border-slate-200 placeholder:text-slate-400 text-sm py-2 px-2 shadow-sm focus:outline-none"
                        placeholder="One Piece, Black Clover..."
                    />
                    <button className="ml-2 hover:bg-[#242424f1] p-2.5 text-white rounded-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 hover:text-[#E3B505]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                            />
                        </svg>
                    </button>
                    <Link
                        to="/login"
                        className="ml-4 bg-[#E3B505] text-black text-sm py-2 px-4 rounded-md shadow hover:bg-[#C99E04]"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Search and Login Button */}
                <div className="flex md:hidden items-center space-x-2">
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="p-2 text-[#D3D3D3] bg-[#242424f1] rounded-md"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" />
                        </svg>
                    </button>
                    <Link
                        to="/Login"
                        className="bg-[#E3B505] text-black text-sm py-2 px-1.5 rounded-md shadow hover:bg-[#C99E04]"
                    >
                        Login
                    </Link>
                </div>
            </div>

            {/* Dropdown Menu */}
            <div
                className={`fixed top-0 ${
                    menuOpen ? "left-0" : "-left-full"
                } h-full bg-[#242424f1] w-40 md:w-[10%] shadow-lg transition-transform duration-300 z-50`}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    className="p-4 text-[#D3D3D3]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <Link
                    to="/Movie"
                    className="block px-4 py-2 text-sm text-[#D3D3D3] hover:text-[#E3B505]"
                >
                    Movie
                </Link>
                <Link
                    to="/tvshow"
                    className="block px-4 py-2 text-sm text-[#D3D3D3] hover:text-[#E3B505]"
                >
                    TV Show
                </Link>
                <Link
                    to="/topairing"
                    className="block px-4 py-2 text-sm text-[#D3D3D3] hover:text-[#E3B505]"
                >
                    Top Airing
                </Link>
            </div>

            {/* Mobile Search Bar */}
            {searchOpen && (
                <div className="absolute top-14 left-0 right-0 max-w-xs mx-auto bg-[#242424f1] p-2 rounded-md shadow-lg z-50">
                    <input
                        className="w-full bg-transparent text-[#E3B505] border border-slate-200 placeholder:text-slate-400 text-sm py-2 px-2 rounded-md focus:outline-none"
                        placeholder="One Piece, Black Clover..."
                    />
                </div>
            )}
        </header>
    );
};

export default Navbar;

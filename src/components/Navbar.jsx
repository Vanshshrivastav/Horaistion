import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <header className="bg-[#121212] text-gray-600 body-font relative z-10">
            <div className="mx-auto flex flex-wrap items-center justify-between p-4 relative">
                {/* Logo */}
                <Link to="/" className="flex items-center text-[#D3D3D3]">
                    <span className="ml-2 text-lg">Horaistion</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex flex-wrap items-center text-base justify-center space-x-4">
                    <Link
                        to="/movie"
                        className="p-1 px-3 bg-[#242424f1] text-[#D3D3D3] hover:text-[#E3B505] rounded-sm"
                    >
                        Movie
                    </Link>
                    <Link
                        to="/tvshow"
                        className="p-1 px-3 bg-[#242424f1] text-[#D3D3D3] hover:text-[#E3B505] rounded-sm"
                    >
                        TV Show
                    </Link>
                    <Link
                        to="/topairing"
                        className="p-1 px-3 bg-[#242424f1] text-[#D3D3D3] hover:text-[#E3B505] rounded-sm"
                    >
                        Top Airing
                    </Link>
                </nav>

                {/* Desktop Search Bar */}
                <div className="hidden md:flex items-center w-full max-w-sm md:max-w-xs mt-4 md:mt-0">
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-[#E3B505] text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                        placeholder="One Piece, Black Clover..."
                    />
                    <button
                        className="ml-2 hover:bg-[#242424f1] p-2.5 rounded-md text-white"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-7 hover:text-[#E3B505]"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="relative md:hidden flex items-center space-x-2">
                    {/* Search Toggle */}
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="p-2 text-[#D3D3D3] bg-[#242424f1] rounded-md"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                            />
                        </svg>
                    </button>

                    {/* Menu Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 text-[#D3D3D3] bg-[#242424f1] rounded-md"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                        className={`absolute right-0 mt-2 bg-[#242424f1] rounded-md shadow-lg transition-all duration-200 ease-in-out ${
                            menuOpen ? "opacity-100 visible top-12" : "opacity-0 invisible top-10"
                        }`}
                        style={{ zIndex: 1000 }}
                    >
                        <Link
                            to="/movie"
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
                </div>

                {/* Search Bar for Mobile */}
                {searchOpen && (
                    <div
                        className="absolute top-14 left-0 right-0 mx-auto w-full max-w-xs bg-[#242424f1] p-2 rounded-md shadow-lg"
                        style={{ zIndex: 1000 }}
                    >
                        <input
                            className="w-full bg-transparent placeholder:text-slate-400 text-[#E3B505] text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 focus:outline-none"
                            placeholder="One Piece, Black Clover..."
                        />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;

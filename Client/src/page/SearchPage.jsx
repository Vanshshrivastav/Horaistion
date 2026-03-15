import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MediaCard from '../components/MediaCard';
import Footer from '../components/Footer';

const SearchPage = () => {
    const [allMedia, setAllMedia] = useState([]);
    const [filteredMedia, setFilteredMedia] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        genres: [],
        type: "",
        year: "",
        rating: ""
    });
    const [isGenreOpen, setIsGenreOpen] = useState(false);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axios.get('http://localhost:6002/media');
                setAllMedia(response.data);
                setFilteredMedia(response.data);
            } catch (err) {
                console.error("Error fetching media:", err);
            }
        };
        fetchMedia();
    }, []);

    useEffect(() => {
        let results = allMedia;

        // Title filter
        if (searchQuery) {
            results = results.filter(item => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Genre filter (OR logic)
        if (filters.genres.length > 0) {
            results = results.filter(item => 
                item.genres && filters.genres.some(g => item.genres.includes(g))
            );
        }

        // Type filter
        if (filters.type) {
            results = results.filter(item => item.type === filters.type);
        }

        // Year filter
        if (filters.year) {
            results = results.filter(item => 
                (item.aired && item.aired.includes(filters.year)) || 
                (item.releaseYear && item.releaseYear.toString() === filters.year)
            );
        }

        // Rating filter
        if (filters.rating) {
            results = results.filter(item => {
                const r = parseFloat(item.rating);
                return !isNaN(r) && r >= parseFloat(filters.rating);
            });
        }

        setFilteredMedia(results);
    }, [searchQuery, filters, allMedia]);

    const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Music", "Romance", "Sci-Fi", "Supernatural"];
    const types = ["TV Series", "Movie", "OVA"];
    const ratings = ["9", "8", "7", "6"];

    return (
        <div className="bg-[#121212] min-h-screen">
            <Navbar />
            
            <main className="container mx-auto px-4 pt-40 pb-12">
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-12 flex items-center gap-4">
                    <div className="w-2 h-10 bg-[#F47521]" />
                    Search & Discover
                </h1>

                {/* Search & Filters Controls */}
                <div className="bg-[#23252B] p-6 rounded-lg mb-12 border border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {/* Search Input */}
                        <div className="lg:col-span-2">
                             <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Search Title</label>
                             <input 
                                type="text"
                                placeholder="Enter title name..."
                                className="w-full bg-[#121212] border border-gray-700 rounded px-4 py-2.5 text-white focus:border-[#F47521] outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                             />
                        </div>

                        {/* Multi-Select Genre Dropdown */}
                        <div className="relative">
                             <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Genres</label>
                             <button 
                                onClick={() => setIsGenreOpen(!isGenreOpen)}
                                className="w-full bg-[#121212] border border-gray-700 rounded px-4 py-2.5 text-white text-left focus:border-[#F47521] outline-none transition-all flex justify-between items-center group"
                             >
                                <span className="truncate text-sm font-bold">
                                    {filters.genres.length === 0 ? "All Genres" : filters.genres.join(", ")}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                             </button>

                             {isGenreOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-40" 
                                        onClick={() => setIsGenreOpen(false)} 
                                    />
                                    <div className="absolute top-full left-0 w-full mt-2 bg-[#1A1C21] border border-white/5 rounded-lg shadow-2xl z-50 p-2 max-h-60 overflow-y-auto custom-scrollbar">
                                        <div className="flex justify-between items-center px-2 py-1 mb-2 border-b border-white/5">
                                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{filters.genres.length} Selected</span>
                                            <button 
                                                onClick={() => setFilters({...filters, genres: []})}
                                                className="text-[9px] font-black text-[#F47521] uppercase tracking-widest hover:text-white"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1">
                                            {genres?.map(genre => (
                                                <label 
                                                    key={genre}
                                                    className="flex items-center p-2 hover:bg-[#23252B] rounded cursor-pointer transition-colors group"
                                                >
                                                    <input 
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={filters.genres.includes(genre)}
                                                        onChange={() => {
                                                            const newGenres = filters.genres.includes(genre)
                                                                ? filters.genres.filter(g => g !== genre)
                                                                : [...filters.genres, genre];
                                                            setFilters({...filters, genres: newGenres});
                                                        }}
                                                    />
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${filters.genres.includes(genre) ? 'bg-[#F47521] border-[#F47521]' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                                        {filters.genres.includes(genre) && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-black" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className={`ml-3 text-xs font-bold transition-colors ${filters.genres.includes(genre) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                        {genre}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </>
                             )}
                        </div>

                        {/* Type Select */}
                        <div>
                             <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Media Type</label>
                             <select 
                                className="w-full bg-[#121212] border border-gray-700 rounded px-4 py-2.5 text-white focus:border-[#F47521] outline-none transition-all cursor-pointer"
                                value={filters.type}
                                onChange={(e) => setFilters({...filters, type: e.target.value})}
                             >
                                <option value="">All Types</option>
                                {types?.map(t => <option key={t} value={t}>{t}</option>)}
                             </select>
                        </div>

                        {/* Rating Select */}
                        <div>
                             <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Min Rating</label>
                             <select 
                                className="w-full bg-[#121212] border border-gray-700 rounded px-4 py-2.5 text-white focus:border-[#F47521] outline-none transition-all cursor-pointer"
                                value={filters.rating}
                                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                             >
                                <option value="">Any Rating</option>
                                {ratings?.map(r => <option key={r} value={r}>{r}+ Stars</option>)}
                             </select>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                {filteredMedia.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                        {filteredMedia?.map((item) => (
                            <MediaCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-[#23252B] rounded-lg border border-dashed border-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">No results found</h3>
                        <p className="text-gray-500 text-sm">Try adjusting your filters or search keywords.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default SearchPage;

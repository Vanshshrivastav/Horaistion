import React, { useEffect, useState } from "react";
import axios from "axios";
import MediaCard from './MediaCard';

const Moviep = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const moviesPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:6002/movie`);
                // Randomize data once on load
                const randomizedData = [...response.data].sort(() => Math.random() - 0.5);
                setMovies(randomizedData);
                setError(null);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch anime data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading) return <div className="bg-[#121212] min-h-screen flex items-center justify-center text-white font-black uppercase tracking-tighter">Loading...</div>;
    if (error) return <div className="bg-[#121212] min-h-screen flex items-center justify-center text-red-500 font-black uppercase tracking-tighter">{error}</div>;

    return (
        <div className="bg-[#121212] min-h-screen pt-32">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-12 flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#F47521]" />
                    Movies
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {currentMovies.map((item) => (
                        <MediaCard key={item.id} item={item} />
                    ))}
                </div>

                {/* ✅ Only show pagination if there are movies */}
                {movies.length > 0 && (
                    <div className="flex justify-center items-center mt-6 gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-3 py-1 bg-[#121212] text-[#E3B505] rounded-md disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                            (pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`px-3 py-1 rounded-md ${currentPage === pageNumber
                                        ? "bg-[#E3B505] text-black"
                                        : "bg-[#1E1E1E] text-white"
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            )
                        )}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-3 py-1 bg-[#121212] text-[#E3B505] rounded-md disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Moviep;
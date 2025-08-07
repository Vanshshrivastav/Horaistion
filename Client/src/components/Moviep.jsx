import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // ✅ Added axios import

const Moviep = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // ✅ Added loading state
    const [error, setError] = useState(null); // ✅ Added error state
    const moviesPerPage = 10; // Number of movies per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:6002/movie`); // ✅ Using same API endpoint
                setMovies(response.data);
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

    // Calculate the current page movies
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Calculate total pages
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // ✅ Loading state
    if (loading) {
        return (
            <div className="bg-[#1E1E1E] min-h-screen flex items-center justify-center">
                <div className="text-[#E0E0E0] text-xl">Loading...</div>
            </div>
        );
    }

    // ✅ Error state
    if (error) {
        return (
            <div className="bg-[#1E1E1E] min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-[#1E1E1E]">
            <div className="container mx-auto p-[1.0rem] ">
                <h1 className="text-3xl font-bold mb-6 text-[#E0E0E0]">Movies</h1>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6  ">
                    {currentMovies.map((item) => (
                        <Link to={`/animovie/${item.id}`} key={item.id}> {/* ✅ Added proper Link routing and key */}
                            <div className="overflow-hidden shadow-md bg-[#2E2E2E] hover:shadow-lg transition cursor-pointer"> {/* ✅ Added hover effects */}
                                {/* Anime image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-60 w-full object-cover md:h-90"
                                />
                                {/* Movie info */}
                                <div className="pt-2 bg-[#1E1E1E] flex flex-col  items-start justify-between">
                                    <div className="flex md:w-69 justify-between w-full px-2"> {/* ✅ Added width and padding */}
                                        <div>
                                            <h2 className="text-sm font-medium text-[#E0E0E0] hover:text-[#E3B505] truncate">
                                                {item.name}
                                            </h2>
                                            <div className="flex gap-1 mt-1">
                                                <p className="text-xs text-[#E0E0E0]">{item.type}</p>
                                                <p className="text-xs text-[#E0E0E0]">{item.duration}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 hidden md:block">
                                            <span className="text-[12px] font-bold text-black bg-[#9fe49e] px-2 py-1 rounded-md">
                                                {item.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import MediaCard from './MediaCard';

const Topcards = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const moviesPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:6002/media`);
                // Randomize for fresh start
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

    return (
        <div className="bg-[#121212] min-h-screen pt-32">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-12 flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#F47521]" />
                    Top Airing
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {currentMovies.map((item) => (
                        <MediaCard key={item.id} item={item} />
                    ))}
                </div>

                {/* ✅ Only show pagination if there are movies */}
                {movies.length > 0 && (
                    <div className="flex justify-center items-center mt-12 gap-2 flex-wrap pb-12">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="w-10 h-10 flex items-center justify-center bg-[#23252B] text-white hover:bg-[#F47521] rounded font-black transition-all disabled:opacity-20 disabled:hover:bg-[#23252B]"
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => index + 1)
                            .filter(page => Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages)
                            .map((pageNumber, idx, array) => {
                                const prev = array[idx - 1];
                                const isGap = prev && pageNumber - prev > 1;
                                return (
                                    <React.Fragment key={pageNumber}>
                                        {isGap && <span className="text-gray-600 font-black">...</span>}
                                        <button
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`w-10 h-10 flex items-center justify-center rounded font-black transition-all ${currentPage === pageNumber
                                                ? "bg-[#F47521] text-black"
                                                : "bg-[#23252B] text-white hover:bg-white hover:text-black"
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    </React.Fragment>
                                );
                            })}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="w-10 h-10 flex items-center justify-center bg-[#23252B] text-white hover:bg-[#F47521] rounded font-black transition-all disabled:opacity-20 disabled:hover:bg-[#23252B]"
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

export default Topcards;
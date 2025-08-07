import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Mosthome() {
    const [animeData, setAnimeData] = useState([]);
    const [visibleCards, setVisibleCards] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:6002/media`);
                setAnimeData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setVisibleCards(Math.min(animeData.length, 20));
            } else {
                setVisibleCards(5);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [animeData.length]);

    return (
        <div className="bg-[#1E1E1E] text-white p-3 sm:p-3  ">
            <h1 className="text-base sm:text-xl font-bold mb-3 sm:mb-5">Most Watch</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {animeData.slice(0, visibleCards).map((anime) => (
                    <Link to={`/aniproflie/${anime.id}`} key={anime.id}>
                        <div className="flex items-center bg-black text-white p-1.5 sm:p-1.5 shadow-md hover:shadow-lg transition cursor-pointer">
                            <img
                                src={anime.image}
                                alt={anime.name}
                                className="w-18 sm:w-20 h-20 sm:h-30 mr-2 sm:mr-3"
                            />
                            <div>
                                <h2 className="text-xs sm:text-[15px] font-bold hover:text-[#E3B505] mb-2 sm:mb-3">
                                    {anime.name}
                                </h2>
                                <div className="flex items-center space-x-1 sm:space-x-1">
                                    <div className="bg-[#2E2E2E] text-center text-[#E3B505]  w-10 sm:w-12 h-4 sm:h-5 flex items-center justify-center">
                                        <span className="text-[10px] sm:text-[15px]">{anime.aired_episodes}</span>
                                    </div>
                                    <div className="bg-[#E3B505] text-[#121212] text-center  w-10 sm:w-12 h-4 sm:h-5 flex items-center justify-center">
                                        <span className="text-[10px] sm:text-[15px]">{anime.total_episodes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-3 sm:mt-5 flex justify-end">
                <Link to="/Mostwatch">
                    <button className="bg-[#E3B505] text-black py-1 px-3 sm:py-2 sm:px-5 rounded-md font-semibold text-xs sm:text-sm hover:bg-[#C99A04]">
                        View More
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Mosthome;

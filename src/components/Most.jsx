import React, { useState, useEffect } from "react";
import animeData from "../data/mostcard.json"; // Adjust the path to your JSON file

function App() {
    const [visibleCards, setVisibleCards] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setVisibleCards(animeData.length); // Show all cards on desktop
            } else {
                setVisibleCards(5); // Show only 5 cards on smaller screens
            }
        };

        handleResize(); // Set initial state based on current screen size
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="bg-[#1E1E1E] text-white p-3 sm:p-4 border-t border-b border-gray-600">
            <h1 className="text-base sm:text-xl font-bold mb-3 sm:mb-5">Most Watch</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4  ">
                {animeData.slice(0, visibleCards).map((anime, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-black text-white p-1.5 sm:p-1.5  shadow-md"
                    >
                        <img
                            src={anime.image_url}
                            alt={anime.name}
                            className="w-18 sm:w-20 h-20 sm:h-30  mr-2 sm:mr-3"
                        />
                        <div>
                            <h2 className="text-xs sm:text-sm font-bold hover:text-[#E3B505] mb-2 sm:mb-3">
                                <a href="">{anime.name}</a>
                            </h2>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <div className="bg-gray-700 text-center rounded-lg w-10 sm:w-12 h-4 sm:h-5 flex items-center justify-center">
                                    <span className="text-[10px] sm:text-xs">{anime.aired_episodes}</span>
                                </div>
                                <div className="bg-gray-700 text-center rounded-lg w-10 sm:w-12 h-4 sm:h-5 flex items-center justify-center">
                                    <span className="text-[10px] sm:text-xs">{anime.total_episodes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-3 sm:mt-5 flex justify-end">
                <button
                    className="bg-[#E3B505] text-black py-1 px-3 sm:py-2 sm:px-5 rounded-md font-semibold text-xs sm:text-sm hover:bg-[#C99A04]"
                >
                    <a href="">View More</a>
                </button>
            </div>
        </div>
    );
}

export default App;




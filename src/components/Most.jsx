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
        <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
            <h1 className="text-2xl font-bold mb-6">Most Watch</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-6">
                {animeData.slice(0, visibleCards).map((anime, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-[#121212] text-white p-4 rounded-2xl shadow-lg"
                    >
                        <img
                            src={anime.image_url}
                            alt={anime.name}
                            className="w-20 h-28 rounded-lg mr-4"
                        />
                        <div>
                            <h2 className="text-lg font-bold hover:text-[#E3B505] mb-5">
                                <a href="">{anime.name}</a>
                            </h2>
                            <div className="flex items-center space-x-2">
                                <div className="bg-gray-700 text-center rounded-lg w-15 h-6 flex items-center justify-center">
                                    <span>{anime.aired_episodes}</span>
                                </div>
                                <div className="bg-gray-700 text-center rounded-lg w-15 h-6 flex items-center justify-center">
                                    <span>{anime.total_episodes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    className="bg-[#E3B505] text-black py-2 px-6 rounded-lg font-semibold hover:bg-[#C99A04]"
                >
                    <a href="">View More</a>
                </button>
            </div>
        </div>
    );
}

export default App;

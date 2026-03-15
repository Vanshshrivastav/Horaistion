import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaCard from "./MediaCard";

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
        <div className="bg-[#121212] py-12 px-4 container mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-8 bg-[#F47521]" />
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Most Watch</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {animeData.slice(0, visibleCards).map((anime) => (
                    <MediaCard key={anime.id} item={anime} variant="horizontal" />
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <Link to="/Mostwatch">
                    <button className="bg-[#F47521] text-black py-2.5 px-8 rounded font-black text-xs uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1">
                        View More
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Mosthome;

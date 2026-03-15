import React, { useEffect, useState } from "react";
import axios from "axios";

const Actordata = ({ animeId }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:6002/media`); // ✅ Using same API endpoint
        setMovies(response.data || []);
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

  if (loading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-white p-6">Error: {error}</div>;
  }

  const anime = movies.find((item) => item.id === parseInt(animeId));

  if (!anime || !anime.characters) {
    return (
      <div className="text-white p-6">
        <p>No character data available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 border-t border-white/5">
      <h2 className="text-xl font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-4">
        <div className="w-1 h-6 bg-[#F47521]" />
        Characters & Cast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {anime?.characters?.map((char, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-[#23252B] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <img src={char.character_image} alt={char.name} className="w-16 h-16 rounded-lg object-cover shadow-lg" />
              <div>
                <p className="text-white font-bold text-sm tracking-tight">{char.name}</p>
                <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Main Character</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#F47521] font-bold text-xs tracking-tight">{char.japanese_voice_actor}</p>
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Japanese VA</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actordata;

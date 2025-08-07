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
    <div className="bg-[#1E1E1E] p-8">
      <h2 className="text-white text-2xl font-bold mb-6">
        {anime.name} – Characters & Voice Actors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {anime.characters.map((char, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-[#121212] rounded-xl shadow-lg gap-3"
          >
            {/* Character Info */}
            <div className="flex items-center">
              <img
                src={char.character_image}
                alt={char.name}
                className="w-16 h-12 rounded-full mr-3"
              />
              <div>
                <p className="text-white font-bold">{char.name}</p>
                <p className="text-gray-400 text-sm">Main</p>
              </div>
            </div>

            {/* Voice Actors */}
            <div className="flex flex-col text-right gap-1">
              <div className="flex items-center justify-end gap-3">
                <div>
                  <p className="text-white text-sm font-bold">
                    {char.japanese_voice_actor}
                  </p>
                  <p className="text-gray-400 text-xs">Japanese</p>
                </div>
                <img
                  src={char.voice_actor_image}
                  alt="JP VA"
                  className="w-10 h-10 rounded-full"
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actordata;

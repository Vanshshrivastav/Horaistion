import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Adjust path based on your project structure

const Trailer = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the recipe ID from the URL

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

  // Find the specific recipe based on the ID
  const anime = movies.find((item) => item.id === parseInt(id));

  if (loading) {
    return <div className="text-white p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-white p-4 text-center">Error: {error}</div>;
  }

  if (!anime) {
    return <div className="text-white p-4 text-center">Anime not found.</div>;
  }

  // Convert animeTrailer array to the format expected by the component
  const videos = anime.animeTrailer
    ? anime.animeTrailer.map((trailer, index) => ({
        id: index + 1,
        name: trailer.title,
        videoUrl: trailer.url.replace("watch?v=", "embed/"),
      }))
    : [];

  return (
    <div className="bg-[#1E1E1E] p-6">
      <h2 className="text-white text-xl mb-4">Trailer Videos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <iframe
              className="w-full h-36 sm:h-40 md:h-48"
              src={video.videoUrl}
              title={video.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="bg-[#121212] text-center py-3">
              <p className="text-[#E0E0E0] text-sm">{video.name}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-white rounded-lg overflow-hidden shadow-lg w-10/12 md:w-2/3 lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-56 md:h-80"
              src={selectedVideo.videoUrl}
              title={selectedVideo.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trailer;
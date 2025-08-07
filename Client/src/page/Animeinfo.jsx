import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Animeinfo = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:6002/movie`);
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
    }, [id]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Find the specific anime based on the ID
    const anime = movies.find((item) => item.id === parseInt(id));

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="text-white p-6 text-center">Loading...</div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="text-white p-6 text-center">Error: {error}</div>
                <Footer />
            </>
        );
    }

    if (!anime) {
        return (
            <>
                <Navbar />
                <div className="text-white p-6 text-center">Anime not found.</div>
                <Footer />
            </>
        );
    }

    const videos = (anime.animeTrailer || []).map((trailer, index) => ({
        id: index + 1,
        name: trailer.title,
        videoUrl: trailer.url.replace("watch?v=", "embed/"),
    }));

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center bg-[#1E1E1E] p-4">
                <div className="text-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row w-full md:w-auto max-w-full">
                    {/* Left Section - Image */}
                    <div className="flex justify-center md:w-1/3 w-full mb-4 md:mb-0">
                        <img
                            src={anime.image}
                            alt="Anime Poster"
                            className="rounded-md shadow-md w-full h-auto max-w-[150px] sm:max-w-[200px] md:max-w-[300px] md:h-[28rem]"
                        />
                    </div>

                    {/* Right Section - Details */}
                    <div className="mt-4 md:mt-0 md:pl-6 md:w-2/3 w-full">
                        <h1 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
                            {anime.name}
                        </h1>

                        <ul className="mb-4 text-sm md:text-base">
                            <li className="mb-2">
                                <strong>Aired:</strong> {anime.aired}
                            </li>
                            <li className="mb-2">
                                <strong>Duration:</strong> {anime.duration}
                            </li>
                            <li className="mb-2">
                                <strong>Status:</strong> {anime.status}
                            </li>
                            <li className="mb-2">
                                <strong>Genres:</strong> {anime.genres.join(", ")}
                            </li>
                            <li className="mb-2">
                                <strong>Studios:</strong> {anime.studios}
                            </li>
                            <li className="mb-2">
                                <strong>Producers:</strong> {anime.producers}
                            </li>
                        </ul>
                        <div
                            className="bg-[#121212] rounded-md p-4 mb-4"
                            style={{ maxHeight: "200px", overflowY: "auto" }}
                        >
                            <p className="leading-relaxed text-sm md:text-base">
                                {isExpanded
                                    ? anime.story
                                    : `${anime.story ? anime.story.split(" ").slice(0, 50).join(" ") : ""}...`}
                                <span
                                    onClick={toggleExpand}
                                    className="text-[#E3B505] hover:underline cursor-pointer"
                                >
                                    {isExpanded ? " Show Less" : " Read More"}
                                </span>
                            </p>

                        </div>

                        {/* Buttons */}
                        <div className="flex flex-row gap-2 md:flex-row items-center md:space-x-4 mt-4">
                            <a
                                href="#"
                                className="w-35 md:w-auto text-center px-6 py-1.5 bg-[#E3B505] text-[#121212] font-medium rounded-md hover:bg-[#e3b705e3] transition-colors"
                            >
                                Watch now
                            </a>

                            <button className="w-35 md:w-auto flex items-center justify-center mt-0 md:mt-0 p-1.5 px-3 hover:text-[#121212] border border-[#E3B505] rounded-md hover:bg-[#E3B505] transition-colors">
                                <span className="text-lg font-bold">+</span>
                                <span className="ml-2">Add to List</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {anime.characters && anime.characters.length > 0 && (
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
            )}

            {videos.length > 0 && (
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
            )}
            <Footer />
        </>
    )
}

export default Animeinfo
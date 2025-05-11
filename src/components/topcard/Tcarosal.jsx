import React, { useRef } from 'react';
import animeData from '../topcard/animeData.json'; // Adjust the path based on your project structure

export default function AnimeCardCarousel() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#1E1E1E] p-4">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-full p-2 shadow-lg hover:scale-110 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 className="text-2xl font-bold mb-6 text-white ml-3">Top Watch</h1>
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll space-x-4 p-4 bg-[#1E1E1E] scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {animeData.map((anime, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-[#121212] rounded-2xl shadow-lg p-4 flex flex-col text-white"
          >
            <img
              src={anime.image}
              alt={anime.name}
              className="w-full h-full object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold hover:text-[#E3B505] mb-1">
              <a href="#">{anime.name}</a>
            </h3>
            <p className="text-sm">Type: {anime.type}</p>
            <p className="text-sm">Rating: {anime.rating}</p>
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-full p-2 shadow-lg hover:scale-110 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

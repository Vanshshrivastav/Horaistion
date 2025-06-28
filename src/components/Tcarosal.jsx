import React, { useRef } from 'react';
import animeData from '../data/animedata.json';

export default function AnimeCardCarousel() {
  const carouselRef = useRef(null);

  const scroll = (amount) => carouselRef.current?.scrollBy({ left: amount, behavior: 'smooth' });

  return (
    <div className="relative bg-[#1E1E1E] p-1.5">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll(-200)}
        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 bg-[#E3B505] text-black rounded-full p-2 shadow-lg hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-2xl font-bold mb-2 text-white ml-2">Top Watch</h1>

      <div
        ref={carouselRef}
        className="flex overflow-x-scroll space-x-2 lg:space-x-4 p-2 lg:p-4 bg-[#1E1E1E] scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides scrollbar for Firefox and IE/Edge
      >
        {animeData.slice(0, 10).map((anime, index) => (
          <div key={index} className="min-w-[125px] lg:min-w-[200px] bg-[#121212] shadow-lg flex flex-col text-white">
            <img src={anime.image} alt={anime.name} className="w-full h-50 md:h-70 object-cover" />
            <div className="p-2">
              <h3 className="text-sm font-semibold hover:text-[#E3B505] mb-1">
                <a href="#">{anime.name}</a>
              </h3>
              <p className="text-xs">Type: {anime.type}</p>
              <p className="text-xs">Rating: {anime.rating}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(200)}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 bg-[#E3B505] text-black rounded-full p-2 shadow-lg hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

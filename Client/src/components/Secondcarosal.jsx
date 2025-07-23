import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import animeData from '../data/maindata.json';

export default function AnimeCardCarousel() {
  const carouselRef = useRef(null);

  const scroll = (amount) =>
    carouselRef.current?.scrollBy({ left: amount, behavior: 'smooth' });

  return (
    <div className="relative bg-[#1E1E1E] p-2">
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
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {animeData.slice(0, 10).map((anime) => (
          <Link to={`/aniproflie/${anime.id}`} key={anime.id}>
            <div className="min-w-[125px] lg:min-w-[200px] bg-[#121212] shadow-lg flex flex-col text-white hover:shadow-xl transition cursor-pointer">
              <img src={anime.image} alt={anime.name} className="w-full h-50 md:h-70 object-cover" />
              <div className="p-2">
                <h3 className="text-sm font-semibold hover:text-[#E3B505] mb-1">
                  {anime.name}
                </h3>
                <p className="text-xs">Type: {anime.type}</p>
                <p className="text-xs">Rating: {anime.rating}</p>
              </div>
            </div>
          </Link>
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

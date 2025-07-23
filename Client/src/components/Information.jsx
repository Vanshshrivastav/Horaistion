import React, { useState } from "react";
import maindata from "../data/maindata.json";
 // Adjust path based on your project structure

import { useParams } from "react-router-dom";// Adjust path based on your project structure

const AnimeCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);


   const { id } = useParams(); // Get the recipe ID from the URL

    // Find the specific recipe based on the ID
  const anime = maindata.find(item => item.id === parseInt(id));


  // Assuming you are displaying the first anime's details for now
 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
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
  );
};

export default AnimeCard;






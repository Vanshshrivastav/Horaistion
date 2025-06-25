// import React, { useState } from "react";

// const AnimeCard = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const story =
//     "Gold Roger was known as the 'Pirate King,' the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King. Enter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy's reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.";

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className="flex items-center justify-center h-[35rem] bg-[#1E1E1E]">
//       <div className=" text-white rounded-lg shadow-lg p-6 flex">
//         {/* Left Section - Image */}
//         <div className="w-1/3 flex justify-center">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png" // Replace with your image source
//             alt="Anime Poster"
//             className="rounded-md shadow-md"
//           />
//         </div>

//         {/* Right Section - Details */}
//         <div className="w-2/3 pl-6">
//           <h1 className="text-2xl font-bold mb-4">Name of the Anime</h1>

//           <ul className="mb-4">
//             <li className="mb-2">
//               <strong>Aired:</strong> Date & Month
//             </li>
//             <li className="mb-2">
//               <strong>Duration:</strong> Time
//             </li>
//             <li className="mb-2">
//               <strong>Status:</strong> Complete or Airing
//             </li>
//             <li className="mb-2">
//               <strong>Genres:</strong> Action, Romance, etc.
//             </li>
//             <li className="mb-2">
//               <strong>Studios:</strong> Name of Studios
//             </li>
//             <li className="mb-2">
//               <strong>Producers:</strong> Name of Producers
//             </li>
//           </ul>
//           <div
//             className="bg-[#121212] rounded-md p-4"
//             style={{ height: "150px", overflow: "auto" }}
//           >
//             <p className="leading-relaxed">
//               {isExpanded
//                 ? story
//                 : `${story.split(" ").slice(0, 50).join(" ")}...`}
//               <span
//                 onClick={toggleExpand}
//                 className="text-[#E3B505] hover:underline cursor-pointer"
//               >
//                 {isExpanded ? " Show Less" : " Read More"}
//               </span>
//             </p>
//           </div>
//           <div className="flex items-center space-x-4 mt-2  ">
//             {/* Watch Now Button */}
//             <a
//               href="#"
//               className="px-6 py-1.5 bg-[#E3B505] text-[#121212] font-medium rounded-md hover:bg-[#e3b705e3] transition-colors"
//             >
//               Watch now
//             </a>

//             {/* Add to List Button */}
//             <button className="flex items-center justify-center p-1.5 px-3 hover:text-[#121212] border border-[#E3B505] rounded-md hover:bg-[#E3B505] transition-colors">
//               <span className="text-lg font-bold">+</span>
//               <span className="ml-2">Add to List</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnimeCard;



import React, { useState } from "react";

const AnimeCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const story =
    "Gold Roger was known as the 'Pirate King,' the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King. Enter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy's reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex items-center justify-center bg-[#1E1E1E] p-4">
      <div className="text-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row w-full md:w-auto max-w-full">
        {/* Left Section - Image */}
        <div className="flex justify-center md:w-1/3 w-full mb-4 md:mb-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png" // Replace with your image source
            alt="Anime Poster"
            className="rounded-md shadow-md w-full h-auto max-w-[150px] sm:max-w-[200px] md:max-w-[300px] md:h-[28rem]"
          />
        </div>

        {/* Right Section - Details */}
        <div className="mt-4 md:mt-0 md:pl-6 md:w-2/3 w-full">
          <h1 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">Name of the Anime</h1>

          <ul className="mb-4 text-sm md:text-base">
            <li className="mb-2">
              <strong>Aired:</strong> Date & Month
            </li>
            <li className="mb-2">
              <strong>Duration:</strong> Time
            </li>
            <li className="mb-2">
              <strong>Status:</strong> Complete or Airing
            </li>
            <li className="mb-2">
              <strong>Genres:</strong> Action, Romance, etc.
            </li>
            <li className="mb-2">
              <strong>Studios:</strong> Name of Studios
            </li>
            <li className="mb-2">
              <strong>Producers:</strong> Name of Producers
            </li>
          </ul>
          <div
            className="bg-[#121212] rounded-md p-4 mb-4"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <p className="leading-relaxed text-sm md:text-base">
              {isExpanded
                ? story
                : `${story.split(" ").slice(0, 50).join(" ")}...`}
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
            {/* Watch Now Button */}
            <a
              href="#"
              className="w-35 md:w-auto text-center px-6 py-1.5 bg-[#E3B505] text-[#121212] font-medium rounded-md hover:bg-[#e3b705e3] transition-colors"
            >
              Watch now
            </a>

            {/* Add to List Button */}
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

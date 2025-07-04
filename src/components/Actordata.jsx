// import React from "react";

// const CharacterList = () => {
//     // JSON Data
//     const characters = [
//         {
//             "characterImage": "https://via.placeholder.com/48",
//             "characterName": "Franky",
//             "role": "Main",
//             "actorName": "Cho",
//             "language": "Japanese",
//             "actorImage": "https://via.placeholder.com/48"
//         },
//         {
//             "characterImage": "https://via.placeholder.com/48",
//             "characterName": "Luffy",
//             "role": "Main",
//             "actorName": "Mayumi Tanaka",
//             "language": "Japanese",
//             "actorImage": "https://via.placeholder.com/48"
//         },
//         {
//             "characterImage": "https://via.placeholder.com/48",
//             "characterName": "Zoro",
//             "role": "Main",
//             "actorName": "Kazuya Nakai",
//             "language": "Japanese",
//             "actorImage": "https://via.placeholder.com/48"
//         },
//         {
//             "characterImage": "https://via.placeholder.com/48",
//             "characterName": "Sanji",
//             "role": "Main",
//             "actorName": "Hiroaki Hirata",
//             "language": "Japanese",
//             "actorImage": "https://via.placeholder.com/48"
//         },
//         {
//             "characterImage": "https://via.placeholder.com/48",
//             "characterName": "Sanji",
//             "role": "Main",
//             "actorName": "Hiroaki Hirata",
//             "language": "Japanese",
//             "actorImage": "https://via.placeholder.com/48"
//         },
//         {
//             "characterImage": "https://via.placeholder.com/48",
//             "characterName": "Sanji",
//             "role": "Main",
//             "actorName": "Hiroaki Hirata",
//             "language": "Japanese",
//             "actorImage": "https://via.placeholder.com/48"
//         }
//     ];

//     const CharacterCard = ({ characterImage, characterName, role, actorName, language, actorImage }) => {
//         return (
//             <div className="flex items-center justify-between p-4 bg-[#121212]  rounded-xl shadow-lg gap-3"  >
//                 {/* Character Details */}
//                 <div className="flex items-center ">
//                     <img
//                         src={characterImage}
//                         alt={`${characterName} avatar`}
//                         className="w-16 h-12 rounded-full mr-3"
//                     />
//                     <div>
//                         <p className="text-white font-bold">{characterName}</p>
//                         <p className="text-gray-400 text-sm">{role}</p>
//                     </div>
//                 </div>  

//                 {/* Voice Actor Details */}
//                 <div className="flex items-center">
//                     <div className="text-right mr-3">
//                         <p className="text-white font-bold">{actorName}</p>
//                         <p className="text-gray-400 text-sm">{language}</p>
//                     </div>
//                     <img
//                         src={actorImage}
//                         alt={`${actorName} avatar`}
//                         className="w-12 h-12 rounded-full"
//                     />
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="bg-[#1E1E1E] p-8 min-h">
//             <h2 className="text-white text-2xl font-bold mb-6">Characters & Voice Actors</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {characters.map((char, index) => (
//                     <CharacterCard key={index} {...char} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CharacterList;


import React from "react";
import maindata from "../data/maindata.json"; // Adjust path if needed

const Actordata = ({ animeId }) => {
  // Find the specific anime using the ID passed from props
  const anime = maindata.find((item) => item.id === parseInt(animeId));

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
              {/* <div className="flex items-center justify-end gap-3">
                <div>
                  <p className="text-white text-sm font-bold">
                    {char.english_voice_actor}
                  </p>
                  <p className="text-gray-400 text-xs">English</p>
                </div>
                <img
                  src={char.voice_actor_image}
                  alt="EN VA"
                  className="w-10 h-10 rounded-full"
                />
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actordata;

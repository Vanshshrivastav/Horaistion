import React from "react";

const CharacterList = () => {
    // JSON Data
    const characters = [
        {
            "characterImage": "https://via.placeholder.com/48",
            "characterName": "Franky",
            "role": "Main",
            "actorName": "Cho",
            "language": "Japanese",
            "actorImage": "https://via.placeholder.com/48"
        },
        {
            "characterImage": "https://via.placeholder.com/48",
            "characterName": "Luffy",
            "role": "Main",
            "actorName": "Mayumi Tanaka",
            "language": "Japanese",
            "actorImage": "https://via.placeholder.com/48"
        },
        {
            "characterImage": "https://via.placeholder.com/48",
            "characterName": "Zoro",
            "role": "Main",
            "actorName": "Kazuya Nakai",
            "language": "Japanese",
            "actorImage": "https://via.placeholder.com/48"
        },
        {
            "characterImage": "https://via.placeholder.com/48",
            "characterName": "Sanji",
            "role": "Main",
            "actorName": "Hiroaki Hirata",
            "language": "Japanese",
            "actorImage": "https://via.placeholder.com/48"
        },
        {
            "characterImage": "https://via.placeholder.com/48",
            "characterName": "Sanji",
            "role": "Main",
            "actorName": "Hiroaki Hirata",
            "language": "Japanese",
            "actorImage": "https://via.placeholder.com/48"
        },
        {
            "characterImage": "https://via.placeholder.com/48",
            "characterName": "Sanji",
            "role": "Main",
            "actorName": "Hiroaki Hirata",
            "language": "Japanese",
            "actorImage": "https://via.placeholder.com/48"
        }
    ];

    const CharacterCard = ({ characterImage, characterName, role, actorName, language, actorImage }) => {
        return (
            <div className="flex items-center justify-between p-4 bg-[#121212]  rounded-xl shadow-lg">
                {/* Character Details */}
                <div className="flex items-center">
                    <img
                        src={characterImage}
                        alt={`${characterName} avatar`}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <p className="text-white font-bold">{characterName}</p>
                        <p className="text-gray-400 text-sm">{role}</p>
                    </div>
                </div>  

                {/* Voice Actor Details */}
                <div className="flex items-center">
                    <div className="text-right mr-4">
                        <p className="text-white font-bold">{actorName}</p>
                        <p className="text-gray-400 text-sm">{language}</p>
                    </div>
                    <img
                        src={actorImage}
                        alt={`${actorName} avatar`}
                        className="w-12 h-12 rounded-full"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[#1E1E1E] p-8 min-h">
            <h2 className="text-white text-2xl font-bold mb-6">Characters & Voice Actors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {characters.map((char, index) => (
                    <CharacterCard key={index} {...char} />
                ))}
            </div>
        </div>
    );
};

export default CharacterList;

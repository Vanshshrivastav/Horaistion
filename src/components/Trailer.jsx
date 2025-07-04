import React, { useState } from "react";

const PromotionVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    { id: 1, name: "Trailer 1", videoUrl: "https://www.youtube.com/embed/-4HaVz_8qBI" },
    { id: 2, name: "Trailer 2", videoUrl: "https://www.youtube.com/embed/-4HaVz_8qBI" },
    { id: 3, name: "Trailer 3", videoUrl: "https://www.youtube.com/embed/-4HaVz_8qBI" },
  ];


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

export default PromotionVideos;

import React from "react";

const Refad = () => {
  const logos = [
    {
      id: 1,
      name: "Netflix",
      img: "https://i.pinimg.com/736x/72/a0/50/72a0500ff35991d147a6b48e4bffc721.jpg",
      link: "https://www.netflix.com/",
    },
    {
      id: 2,
      name: "Hianime",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnjpum-rYXMJR7IZ2vyOZsUcEats-S2Ff-5g&s",
      link: "https://hianime.tv/",
    },
  ];

  return (
    <div className="bg-[#1E1E1E] py-4">
      <h1 className="p-2 ml-5 text-base sm:text-xl font-bold mb-3 text-[#E0E0E0] sm:mb-5">
        Available On:
      </h1>
      <div className="flex items-center gap-4 ml-5 top-3 overflow-x-auto scrollbar-hide h-auto">
        {logos.map((logo) => (
          <a
            key={logo.id}
            href={logo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center"
          >
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full shadow-md"
              style={{
                backgroundImage: `url(${logo.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <span className="text-white font-bold text-sm justify-center flex p-0.5">
              {logo.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Refad;

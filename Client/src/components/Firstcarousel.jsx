import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Firstcarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [mainData, setMainData] = useState([]);

    // Take first 5 items from mainData for carousel
    const slidesData = mainData.slice(0, 3);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:6002/media`);
                setMainData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        console.log("Slides data:", slidesData); // Debug log
        const handleResize = () => setIsMobileView(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [slidesData]);

    const handleNavigation = (direction) => {
        setCurrentIndex((prev) => {
            if (direction === "prev") {
                return prev === 0 ? slidesData.length - 1 : prev - 1;
            }
            return prev === slidesData.length - 1 ? 0 : prev + 1;
        });
        setIsExpanded(false);
    };

    const FirstFirstcarousel = (slide, isMobile) => (
        <div className={`relative z-10 text-white ${isMobile ? "ml-5 mt-8" : "w-2/3"}`}>
            <h3 className="text-sm font-bold mb-2">{slide.type}</h3>
            <h2 className="text-2xl md:text-5xl font-bold mb-4">{slide.name}</h2>
            <p className="text-lg mb-6">Rating: {slide.rating} | Episodes: {slide.total_episodes}</p>
            {!isMobile && (
                <p className="text-sm mb-6">
                    {isExpanded ? slide.story : `${slide.story.slice(0, 100)}...`}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="ml-2 underline text-yellow-500"
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </button>
                </p>
            )}
            <div className="flex gap-4">
             <Link to={`/aniproflie/${slide.id}`}>
                <button className="bg-[#E3B505] text-[#121212] px-4 py-2 rounded-lg">Watch Now</button>
             </Link>
                <button className="bg-[#2E2E2E] text-[#E3B505] px-4 py-2 rounded-lg">Detail</button>
            </div>
        </div>
    );

    if (!slidesData || !slidesData.length) {
        return <div className="text-white p-4">Loading... or No data available</div>;
    }

    return (
        <div className="relative w-full h-85 bg-[#1E1E1E] overflow-hidden">
            <div
                className="flex h-100 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slidesData.map((slide, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 w-full h-80 flex items-center justify-between ${
                            isMobileView ? "relative" : "px-8"
                        }`}
                        style={
                            isMobileView
                                ? {
                                      backgroundImage: `url(${slide.image})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                      filter: "brightness(2.5)",
                                  }
                                : {}
                        }
                    >
                        {isMobileView && <div className="absolute inset-0 bg-black/90"></div>}
                        {FirstFirstcarousel(slide, isMobileView)}
                        {!isMobileView && (
                            <div className="h-full w-1/3 flex items-center mt-7 justify-center">
                                <img
                                    src={slide.image}
                                    alt={slide.name}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleNavigation("prev")}
                className="absolute top-1/2 left-1 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-400 text-3xl "
            >
                &#10094;
            </button>
            <button
                onClick={() => handleNavigation("next")}
                className="absolute top-1/2 right-1 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-400 text-3xl"
            >
                &#10095;
            </button>
        </div>
    );
};

export default Firstcarousel;
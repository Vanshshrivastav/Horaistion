import React, { useState, useEffect } from "react";
import slidesData from "../data/spotcard.json"; // Adjust the path if needed

const Carousel = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

    useEffect(() => {
        setSlides(slidesData);

        const handleResize = () => setIsMobileView(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNavigation = (direction) => {
        setCurrentIndex((prev) => {
            if (direction === "prev") {
                return prev === 0 ? slides.length - 1 : prev - 1;
            }
            return prev === slides.length - 1 ? 0 : prev + 1;
        });
        setIsExpanded(false);
    };

    const renderSlideContent = (slide, isMobile) => (
        <div className={`relative z-10 text-white ${isMobile ? "ml-5 mt-8" : "w-2/3"}`}>
            <h3 className="text-sm font-bold mb-2">{slide.spotlight}</h3>
            <h2 className="text-2xl md:text-5xl font-bold mb-4">{slide.title}</h2>
            <p className="text-lg mb-6">{slide.details}</p>
            {!isMobile && (
                <p className="text-sm mb-6">
                    {isExpanded ? slide.description : `${slide.description.slice(0, 100)}...`}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="ml-2 underline text-yellow-500"
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </button>
                </p>
            )}
            <div className="flex gap-4">
             <button className="bg-pink-500 text-white px-4 py-2 rounded-lg " >Watch Now</button>
                <button className="bg-white text-black px-4 py-2 rounded-lg">Detail</button>
            </div>
        </div>
    );

    if (!slides.length) return <div>Loading...</div>;

    return (
        <div className="relative w-full h-85 bg-[#1E1E1E] overflow-hidden">
            <div
                className="flex h-100 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
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
                        {renderSlideContent(slide, isMobileView)}
                        {!isMobileView && (
                            <div className="h-full w-1/3 flex items-center mt-7 justify-center">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleNavigation("prev")}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-400 text-3xl"
            >
                &#10094;
            </button>
            <button
                onClick={() => handleNavigation("next")}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-400 text-3xl"
            >
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;

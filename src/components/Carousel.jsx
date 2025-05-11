import React, { useState, useEffect } from "react";
import slidesData from "../data/spotcard.json"; // Adjust the path if needed
import { Link } from "react-router-dom";

const Carousel = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

    useEffect(() => {
        // Load slides data
        setSlides(slidesData);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setIsExpanded(false);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setIsExpanded(false);
    };

    if (!slides.length) return <div>Loading...</div>;

    return (
        <div className="relative w-full h-100 bg-[#1E1E1E] overflow-hidden">
            <div className="bg-black/80 h-full w-full absolute md:hidden z-10"></div>
            <div
                className="flex h-100 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full h-full flex items-center justify-between px-8 p-2"
                        style={
                            isMobileView
                                ? { backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                                : {}
                        }
                    >
                        <div>
                            <div className="text-gray-300 ml-5 relative z-50 flex-1">
                                <h3 className="text-1xl font-bold mb-4">{slide.spotlight}</h3>
                                <Link to="/aniproflie" className="text-5xl font-bold mb-6">{slide.title}</Link>
                                <p className="text-lg mb-6">{slide.details}</p>
                                <p className="text-sm mb-6">
                                    {isExpanded
                                        ? slide.description
                                        : `${slide.description.slice(0, 100)}...`}
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className={`ml-2 underline ${isMobileView ? "text-yellow-600" : "text-yellow-500"
                                            }`}
                                    >
                                        {isExpanded ? "Read Less" : "Read More"}
                                    </button>
                                </p>
                                <button className="bg-yellow-500 text-[#121212] px-6 py-3 rounded-md hover:bg-yellow-400">
                                    Watch Now
                                </button>
                            </div>
                        </div>
                        {!isMobileView && (
                            <div className="h-full  flex items-center justify-center flex-shrink-0 w-1/3">
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
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-400 text-3xl"
            >
                &#10094;
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-400 text-3xl"
            >
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;


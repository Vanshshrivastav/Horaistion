import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import MediaSection from '../components/MediaSection';
import SkeletonLoader from '../components/SkeletonLoader';

const Home = () => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axios.get('http://localhost:6002/media');
                setMedia(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching media:", err);
                setLoading(false);
            }
        };
        fetchMedia();
    }, []);

    // Auto-rotation logic (7 seconds)
    useEffect(() => {
        if (media.length > 0) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % Math.min(media.length, 5)); // Cycle through top 5 only
            }, 7000);
            return () => clearInterval(interval);
        }
    }, [media.length]);

    const { trending, topAnime, topMovies, latest } = React.useMemo(() => {
        if (media.length === 0) return { trending: [], topAnime: [], topMovies: [], latest: [] };

        const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

        return {
            trending: media.slice(5, 11),
            topAnime: shuffle(media.filter(item => item.type === 'TV Series')).slice(0, 6),
            topMovies: shuffle(media.filter(item => item.type === 'Movie')).slice(0, 6),
            latest: [...media].reverse().slice(0, 6)
        };
    }, [media]);

    if (loading) return (
        <div className="bg-[#121212] min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 pt-32 space-y-12">
                <SkeletonLoader type="banner" />
                <div className="space-y-4">
                    <div className="h-8 bg-[#23252B] w-48 rounded animate-pulse" />
                    <SkeletonLoader type="card" count={6} />
                </div>
                <div className="space-y-4">
                    <div className="h-8 bg-[#23252B] w-48 rounded animate-pulse" />
                    <SkeletonLoader type="card" count={6} />
                </div>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="bg-[#121212] min-h-screen">
            <Navbar />

            <main>
                {media.length > 0 && (() => {
                    const featuredTitles = ["one piece", "sword art online", "demon slayer", "hunter x hunter", "naruto", "hxh"];
                    const featuredMedia = media.filter(item =>
                        featuredTitles.some(title => item.name.toLowerCase().includes(title))
                    ).slice(0, 5);

                    const itemToShow = featuredMedia[activeIndex % featuredMedia.length] || media[0];
                    return <HeroBanner featuredItem={itemToShow} />;
                })()}

                <div className="relative -mt-12 z-10 lg:-mt-24">
                    <MediaSection title="Trending Now" items={trending} viewMorePath="/Mostwatch" />
                    <MediaSection title="Ultimate TV Selection" items={topAnime} viewMorePath="/topairing" />
                    <MediaSection title="Blockbuster Movies" items={topMovies} viewMorePath="/movie" />
                    <MediaSection title="Recently Added" items={latest} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
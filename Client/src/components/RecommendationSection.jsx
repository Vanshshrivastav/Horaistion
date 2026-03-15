import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MediaCard from './MediaCard';

const RecommendationSection = ({ currentMedia }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get('http://localhost:6002/media');
                if (currentMedia && res.data) {
                    // Filter by shared genres, excluding the current media
                    const filtered = res.data
                        .filter(item => item.id !== currentMedia?.id)
                        .filter(item => item.genres?.some(g => currentMedia?.genres?.includes(g)))
                        .slice(0, 6);
                    setRecommendations(filtered);
                }
            } catch (err) {
                console.error("Error fetching recommendations:", err);
            }
        };
        fetchRecommendations();
    }, [currentMedia]);

    if (recommendations.length === 0) return null;

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-4">
                <div className="w-1.5 h-8 bg-[#F47521]" />
                More Like This
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {recommendations?.map(media => (
                    <MediaCard key={media.id} item={media} />
                ))}
            </div>
        </div>
    );
};

export default RecommendationSection;

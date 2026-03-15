import React from 'react';
import MediaCard from './MediaCard';
import { Link } from 'react-router-dom';

const MediaSection = ({ title, items, viewMorePath }) => {
    if (!items || items.length === 0) return null;

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-[#F47521]" />
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                        {title}
                    </h2>
                </div>
                {viewMorePath && (
                    <Link
                        to={viewMorePath}
                        className="text-sm font-bold text-[#F47521] hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        VIEW ALL
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {items.slice(0, 6).map((item) => (
                    <MediaCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
};

export default MediaSection;

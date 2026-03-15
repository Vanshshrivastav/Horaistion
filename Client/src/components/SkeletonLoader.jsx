import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const skeletons = Array(count).fill(0);

  if (type === 'card') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skeletons.map((_, i) => (
          <div key={i} className="space-y-3 animate-pulse">
            <div className="bg-[#23252B] aspect-[2/3] rounded-xl" />
            <div className="h-4 bg-[#23252B] rounded w-3/4" />
            <div className="h-3 bg-[#23252B] rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'banner') {
    return (
      <div className="w-full aspect-[21/9] bg-[#23252B] animate-pulse rounded-3xl" />
    );
  }

  return null;
};

export default SkeletonLoader;

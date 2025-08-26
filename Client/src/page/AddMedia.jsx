import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddMedia = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaType: '',
    genre: '',
    releaseYear: '',
    imageUrl: '',
    videoUrl: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:6002/addMedia', formData); // Assuming a new endpoint
      console.log('Media Added:', res.data);
      setLoading(false);
      alert('Media added successfully!');
      // Optionally clear form or redirect
      setFormData({
        title: '',
        description: '',
        mediaType: '',
        genre: '',
        releaseYear: '',
        imageUrl: '',
        videoUrl: '',
      });
      navigate('/dashboard'); // Navigate to dashboard after successful submission
    } catch (error) {
      console.error("Failed to add media:", error);
      setLoading(false);
      alert('Failed to add media. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full max-w-md bg-[#121212] p-8 rounded-xl shadow-lg">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/dashboard" className="text-gray-400 hover:text-white flex items-center">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Add New Media</h2>
          <p className="text-gray-400">Fill in the details to add a new movie, TV show, or anime.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Title</label>
            <input
              required
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Description</label>
            <textarea
              required
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          {/* Media Type Select */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Media Type</label>
            <select
              required
              name="mediaType"
              value={formData.mediaType}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Media Type</option>
              <option value="movie">Movie</option>
              <option value="tv show">TV Show</option>
              <option value="anime">Anime</option>
            </select>
          </div>

          {/* Genre Input */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Genre</label>
            <input
              required
              type="text"
              placeholder="e.g., Action, Comedy, Sci-Fi"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Release Year Input */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Release Year</label>
            <input
              required
              type="number"
              placeholder="e.g., 2023"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Image URL (Poster/Thumbnail)</label>
            <input
              required
              type="url"
              placeholder="e.g., https://example.com/image.jpg"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Video URL Input */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Video URL (Trailer/Main Video)</label>
            <input
              required
              type="url"
              placeholder="e.g., https://example.com/video.mp4"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition rounded-lg py-3 font-semibold text-black disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Media'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedia;

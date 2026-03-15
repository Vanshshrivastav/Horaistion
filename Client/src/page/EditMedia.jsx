import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';

const EditMedia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaType: 'movie',
    genre: '',
    releaseYear: '',
    imageUrl: '',
    videoUrl: '',
    duration: '',
    totalEpisodes: 1,
    airedEpisodes: 1,
    status: 'Finished Airing',
    rating: 'PG-13',
    studios: '',
    producers: '',
    characters: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:6002/admin/media/${id}`, {
          headers: { 'x-auth-token': token }
        });
        const data = res.data;
        setFormData({
          title: data.name || '',
          description: data.synopsis || data.story || '',
          mediaType: data.type === 'Movie' ? 'movie' : 'anime',
          genre: data.genres ? data.genres.join(', ') : '',
          releaseYear: data.aired || '',
          imageUrl: data.image || '',
          videoUrl: (data.animeTrailer && data.animeTrailer[0]) ? data.animeTrailer[0].url : '',
          duration: data.duration || '',
          totalEpisodes: data.total_episodes || 0,
          airedEpisodes: data.aired_episodes || 0,
          status: data.status || 'Finished Airing',
          rating: data.rating || 'PG-13',
          studios: data.studios ? data.studios.join(', ') : '',
          producers: data.producers ? data.producers.join(', ') : '',
          characters: data.characters || []
        });
      } catch (err) {
        console.error("Failed to fetch media:", err);
        showToast("Failed to load media details.", "error");
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      // Prepare payload to match backend schema expectations
      const payload = {
        name: formData.title,
        synopsis: formData.description,
        type: formData.mediaType === 'movie' ? 'Movie' : (formData.mediaType === 'tv show' ? 'TV Series' : 'TV Series'),
        genres: formData.genre.split(',').map(g => g.trim()),
        aired: formData.releaseYear.toString(),
        image: formData.imageUrl,
        animeTrailer: [{ title: 'Trailer', url: formData.videoUrl }],
        status: formData.status,
        rating: formData.rating,
        duration: formData.duration,
        total_episodes: parseInt(formData.totalEpisodes),
        aired_episodes: parseInt(formData.airedEpisodes),
        studios: formData.studios.split(',').map(s => s.trim()),
        producers: formData.producers.split(',').map(p => p.trim()),
        characters: formData.characters // Include characters
      };

      await axios.put(`http://localhost:6002/admin/media/${id}`, payload, {
        headers: { 'x-auth-token': token }
      });
      showToast('Media updated successfully!', 'success');
      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to update media:", error);
      showToast('Failed to update media.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#F47521]" />
    </div>
  );

  return (
    <div className="bg-[#121212] min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-24 max-w-5xl">
        <div className="mb-12">
            <Link to="/dashboard" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
                Return to Dashboard
            </Link>
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Calibrate Content</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Update existing series or movie details</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#23252B] p-10 rounded-2xl border border-white/5 shadow-2xl space-y-10">
            {/* Row 1: Primary Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Primary Title</label>
                    <input
                        required
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-bold focus:outline-none focus:border-[#F47521] transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Poster Artwork URL</label>
                    <input
                        required
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-[#F47521]"
                    />
                </div>
            </div>

            {/* Row 2: Categorization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Type</label>
                    <select
                        name="mediaType"
                        value={formData.mediaType}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-black uppercase tracking-widest text-[10px] focus:outline-none focus:border-[#F47521]"
                    >
                        <option value="movie">Movie</option>
                        <option value="tv show">TV Show</option>
                        <option value="anime">Anime Series</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-black uppercase tracking-widest text-[10px] focus:outline-none focus:border-[#F47521]"
                    >
                        <option value="Finished Airing">Finished Airing</option>
                        <option value="Currently Airing">Currently Airing</option>
                        <option value="Not yet aired">Not yet aired</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Age Rating</label>
                    <input
                        type="text"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-bold focus:outline-none focus:border-[#F47521]"
                    />
                </div>
            </div>

            {/* Row 3: Technical Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Release Year</label>
                    <input
                        required
                        type="number"
                        name="releaseYear"
                        value={formData.releaseYear}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-bold focus:outline-none focus:border-[#F47521]"
                    />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Aired EPs</label>
                    <input
                        type="number"
                        name="airedEpisodes"
                        value={formData.airedEpisodes}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-bold focus:outline-none focus:border-[#F47521]"
                    />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Total EPs</label>
                    <input
                        type="number"
                        name="totalEpisodes"
                        value={formData.totalEpisodes}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-bold focus:outline-none focus:border-[#F47521]"
                    />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-bold focus:outline-none focus:border-[#F47521]"
                    />
                </div>
            </div>

            {/* Row 4: Tags & Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Genres</label>
                    <input
                        required
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-bold focus:outline-none focus:border-[#F47521]"
                    />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Trailer (YouTube)</label>
                    <input
                        required
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-[#F47521]"
                    />
                </div>
            </div>

            {/* Row 5: Production */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Studios</label>
                    <input
                        type="text"
                        name="studios"
                        value={formData.studios}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-bold focus:outline-none focus:border-[#F47521]"
                    />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Producers</label>
                    <input
                        type="text"
                        name="producers"
                        value={formData.producers}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white font-bold focus:outline-none focus:border-[#F47521]"
                    />
                </div>
            </div>

            {/* Row 6: Characters & Cast */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                        <div className="w-1 h-4 bg-[#F47521] rounded-full" />
                        Characters & Cast
                    </h2>
                    <button
                        type="button"
                        onClick={() => setFormData(prev => ({ 
                            ...prev, 
                            characters: [...prev.characters, { name: '', character_image: '', japanese_voice_actor: '' }] 
                        }))}
                        className="bg-white/5 hover:bg-white/10 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-lg border border-white/5 transition-all"
                    >
                        + Add Character
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {formData.characters.map((char, index) => (
                        <div key={index} className="bg-[#121212] p-6 rounded-xl border border-white/5 relative group">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                    ...prev,
                                    characters: prev.characters.filter((_, i) => i !== index)
                                }))}
                                className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2 px-1">Character Name</label>
                                    <input
                                        type="text"
                                        value={char.name}
                                        onChange={(e) => {
                                            const newChars = [...formData.characters];
                                            newChars[index].name = e.target.value;
                                            setFormData(prev => ({ ...prev, characters: newChars }));
                                        }}
                                        className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-white text-xs focus:outline-none focus:border-[#F47521]"
                                        placeholder="Jin-Woo Sung"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2 px-1">Character Image URL</label>
                                    <input
                                        type="url"
                                        value={char.character_image}
                                        onChange={(e) => {
                                            const newChars = [...formData.characters];
                                            newChars[index].character_image = e.target.value;
                                            setFormData(prev => ({ ...prev, characters: newChars }));
                                        }}
                                        className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-[#F47521]"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2 px-1">Japanese VA</label>
                                    <input
                                        type="text"
                                        value={char.japanese_voice_actor}
                                        onChange={(e) => {
                                            const newChars = [...formData.characters];
                                            newChars[index].japanese_voice_actor = e.target.value;
                                            setFormData(prev => ({ ...prev, characters: newChars }));
                                        }}
                                        className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-white text-xs focus:outline-none focus:border-[#F47521]"
                                        placeholder="Taito Ban"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {formData.characters.length === 0 && (
                        <div className="py-12 border-2 border-dashed border-white/5 rounded-2xl text-center">
                            <p className="text-gray-700 font-black uppercase tracking-widest text-[10px]">No characters assigned yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Row 7: Synopsis */}
            <div>
                <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Synopsis</label>
                <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-4 text-white text-sm leading-relaxed focus:outline-none focus:border-[#F47521]"
                />
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-[#F47521] text-black font-black py-5 rounded-xl uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl disabled:opacity-50"
                >
                    {saving ? 'Updating Matrix...' : 'Commit Changes'}
                </button>
            </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditMedia;

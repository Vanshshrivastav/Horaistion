import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [media, setMedia] = useState([]);
  const [Signup, setSignup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [mediaResponse, SignupResponse] = await Promise.all([
          axios.get('http://localhost:6002/media'),
          axios.get('http://localhost:6002/Signup') // Assuming a /Signup endpoint exists
        ]);
        setMedia(mediaResponse.data);
        setSignup(SignupResponse.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please make sure the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:6002/media/${id}`);
      setMedia(media.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete item.");
    }
  };

  if (loading) {
    return <div className="bg-gray-900 min-h-screen text-white text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="bg-gray-900 min-h-screen text-red-500 text-center p-8">{error}</div>;
  }

  return (
    <div className="bg-[#1E1E1E] min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-[#E3B505] mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#121212] p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-400">Total Media</h2>
            <p className="text-4xl font-bold text-white">{media.length}</p>
          </div>
          <div className="bg-[#121212] p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-400">Total Signup</h2>
            <p className="text-4xl font-bold text-white">{Signup.length}</p>
          </div>
          <div className="bg-[#121212] p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-400">Movies</h2>
            <p className="text-4xl font-bold text-white">{media.filter(m => m.type === 'Movie').length}</p>
          </div>
          <div className="bg-[#121212] p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-400">TV Shows</h2>
            <p className="text-4xl font-bold text-white">{media.filter(m => m.type !== 'Movie').length}</p>
          </div>
        </div>

        {/* Media Management Table */}
        <div className="bg-[#121212] p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Manage Content</h2>
            <Link to="/Addmedia">
              <button className="bg-[#E3B505] text-[#121212] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
                Add New
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-3">Title</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {media.slice(0, 10).map(item => ( // Limiting to 10 for display
                  <tr key={item._id} className="border-b border-gray-800 hover:bg-gray-800">
                    <td className="p-3 flex items-center">
                      <img src={item.image} alt={item.name} className="w-10 h-14 object-cover rounded-md mr-4"/>
                      <span>{item.name}</span>
                    </td>
                    <td className="p-3">{item.type}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'Complete' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">{item.rating}</td>
                    <td className="p-3">
                      <button className="text-blue-400 hover:underline mr-4">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

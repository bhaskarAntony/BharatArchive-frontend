import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { entryAPI } from '../services/api';
import EntryCard from '../components/EntryCard';
import SEO from '../components/SEO';
import { Search, TrendingUp } from 'lucide-react';

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await entryAPI.getAll({ limit: 8, sort: '-views' });
      setEntries(response.data.entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/explore?search=${searchTerm}`;
    }
  };

  return (
    <>
      <SEO />

      <div className="bg-gradient-to-b from-amber-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Discover India's Cultural Heritage
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore ancient temples, traditional festivals, timeless wisdom, and the rich tapestry of Bharat's cultural legacy
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search temples, festivals, traditions..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 focus:border-yellow-700 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-700 text-white px-6 py-2 hover:bg-yellow-800 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          <div className="flex justify-center gap-3 flex-wrap mb-8">
            {['temple', 'festival', 'ancient-tech', 'monument', 'art'].map((category) => (
              <Link
                key={category}
                to={`/explore?category=${category}`}
                className="px-4 py-2 bg-white border border-gray-300 hover:border-yellow-700 hover:text-yellow-700 transition-colors text-sm"
              >
                {category.replace('-', ' ').toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="text-yellow-700" size={24} />
          <h2 className="text-2xl font-serif font-bold text-gray-900">Popular Entries</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse h-80"></div>
            ))}
          </div>
        ) : entries.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {entries.map((entry) => (
                <EntryCard key={entry._id} entry={entry} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/explore"
                className="inline-block px-8 py-3 bg-yellow-700 text-white hover:bg-yellow-800 transition-colors text-lg"
              >
                Explore All Entries
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No entries found. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

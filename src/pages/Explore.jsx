import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { entryAPI } from '../services/api';
import EntryCard from '../components/EntryCard';
import SEO from '../components/SEO';
import { Filter, Search } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'temple', label: 'Temples' },
  { value: 'ancient-tech', label: 'Ancient Technology' },
  { value: 'festival', label: 'Festivals' },
  { value: 'monument', label: 'Monuments' },
  { value: 'art', label: 'Art & Culture' },
  { value: 'tradition', label: 'Traditions' },
  { value: 'other', label: 'Other' },
];

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEntries();
  }, [searchParams, page]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
      };

      if (searchParams.get('search')) {
        params.search = searchParams.get('search');
      }

      if (searchParams.get('category') && searchParams.get('category') !== 'all') {
        params.category = searchParams.get('category');
      }

      const response = await entryAPI.getAll(params);
      setEntries(response.data.entries);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (searchTerm.trim()) params.search = searchTerm;
    if (category !== 'all') params.category = category;
    setSearchParams(params);
    setPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const params = {};
    if (searchTerm.trim()) params.search = searchTerm;
    if (newCategory !== 'all') params.category = newCategory;
    setSearchParams(params);
    setPage(1);
  };

  return (
    <>
      <SEO
        title="Explore Indian Heritage"
        description="Browse through our comprehensive collection of Indian cultural heritage, temples, festivals, and traditions"
        keywords="explore Indian heritage, temples, festivals, cultural archive"
      />

      <div className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            Explore Heritage
          </h1>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-700 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-700 text-white hover:bg-yellow-800 transition-colors flex items-center gap-2"
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter by category:</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-4 py-2 text-sm transition-colors ${
                  category === cat.value
                    ? 'bg-yellow-700 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-yellow-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse h-80"></div>
            ))}
          </div>
        ) : entries.length > 0 ? (
          <>
            <div className="mb-6 text-gray-600">
              Found {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {entries.map((entry) => (
                <EntryCard key={entry._id} entry={entry} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-yellow-700"
                >
                  Previous
                </button>

                <span className="px-4 py-2 border border-gray-300">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-yellow-700"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No entries found matching your criteria.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;

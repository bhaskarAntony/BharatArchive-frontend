import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { entryAPI } from '../services/api';
import SEO from '../components/SEO';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'temple',
    imageUrls: [''],
    content: '',
    location: '',
    metaDescription: '',
    keywords: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await entryAPI.getAll({ limit: 100 });
      setEntries(response.data.entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData({ ...formData, imageUrls: newImageUrls });
  };

  const addImageUrlField = () => {
    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] });
  };

  const removeImageUrlField = (index) => {
    const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
    setFormData({ ...formData, imageUrls: newImageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      imageUrls: formData.imageUrls.filter(url => url.trim() !== ''),
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k !== ''),
    };

    try {
      if (editingEntry) {
        await entryAPI.update(editingEntry._id, submitData);
        alert('Entry updated successfully!');
      } else {
        await entryAPI.create(submitData);
        alert('Entry created successfully!');
      }

      setShowForm(false);
      setEditingEntry(null);
      resetForm();
      fetchEntries();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      category: entry.category,
      imageUrls: entry.imageUrls,
      content: entry.content,
      location: entry.location,
      metaDescription: entry.metaDescription || '',
      keywords: entry.keywords?.join(', ') || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      await entryAPI.delete(id);
      alert('Entry deleted successfully!');
      fetchEntries();
    } catch (error) {
      alert('Error deleting entry');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'temple',
      imageUrls: [''],
      content: '',
      location: '',
      metaDescription: '',
      keywords: '',
    });
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingEntry(null);
    resetForm();
  };

  if (!isAdmin()) {
    return null;
  }

  return (
    <>
      <SEO title="Admin Panel" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add New Entry
          </button>
        </div>

        {showForm && (
          <div className="bg-white border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingEntry ? 'Edit Entry' : 'Create New Entry'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
                >
                  <option value="temple">Temple</option>
                  <option value="ancient-tech">Ancient Technology</option>
                  <option value="festival">Festival</option>
                  <option value="monument">Monument</option>
                  <option value="art">Art & Culture</option>
                  <option value="tradition">Tradition</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URLs *
                </label>
                {formData.imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                    {formData.imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrlField(index)}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageUrlField}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add another image
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="City, State"
                  className="w-full px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows="10"
                  className="w-full px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description (SEO)
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Brief description for search engines (160 characters)"
                  className="w-full px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="temple, heritage, ancient"
                  className="w-full px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {editingEntry ? 'Update Entry' : 'Create Entry'}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-6 py-3 bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Entries ({entries.length})</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : entries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Likes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {entries.map((entry) => (
                    <tr key={entry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{entry.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{entry.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{entry.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{entry.views || 0}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{entry.likes?.length || 0}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/entry/${entry.slug || entry._id}`)}
                            className="p-2 text-gray-600 hover:text-blue-600"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(entry)}
                            className="p-2 text-gray-600 hover:text-blue-600"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(entry._id)}
                            className="p-2 text-gray-600 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              No entries yet. Create your first entry!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { entryAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';
import { Heart, MessageCircle, Share2, MapPin, Eye, Calendar } from 'lucide-react';

const EntryDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchEntry();
  }, [slug]);

  const fetchEntry = async () => {
    try {
      setLoading(true);
      const response = await entryAPI.getBySlug(slug);
      setEntry(response.data);
      setLikesCount(response.data.likes?.length || 0);
      if (user) {
        setIsLiked(response.data.likes?.includes(user.id));
      }
    } catch (error) {
      console.error('Error fetching entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await entryAPI.like(entry._id);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likes);
    } catch (error) {
      console.error('Error liking entry:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!commentText.trim()) return;

    try {
      const response = await entryAPI.addComment(entry._id, commentText);
      setEntry({ ...entry, comments: response.data.comments });
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: entry.title,
      text: entry.metaDescription || entry.content.substring(0, 100),
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 mb-6"></div>
          <div className="h-8 bg-gray-200 mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Entry not found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-yellow-700 hover:text-yellow-700"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={entry.title}
        description={entry.metaDescription || entry.content.substring(0, 160)}
        keywords={entry.keywords?.join(', ')}
        image={entry.imageUrls[0]}
        url={window.location.href}
        type="article"
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <span className="text-sm font-medium text-yellow-700 uppercase tracking-wide">
            {entry.category.replace('-', ' ')}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
          {entry.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{entry.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{entry.views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative aspect-video bg-gray-100 mb-4">
            <img
              src={entry.imageUrls[currentImageIndex]}
              alt={entry.title}
              className="w-full h-full object-cover"
            />
          </div>

          {entry.imageUrls.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {entry.imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 ${
                    currentImageIndex === index ? 'border-yellow-700' : 'border-gray-200'
                  }`}
                >
                  <img src={url} alt={`${entry.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
              isLiked
                ? 'border-red-500 text-red-500 bg-red-50'
                : 'border-gray-300 text-gray-700 hover:border-red-500'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:border-blue-500"
          >
            <MessageCircle size={20} />
            <span>{entry.comments?.length || 0}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:border-blue-500"
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {entry.content}
          </div>
        </div>

        <div id="comments" className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            Comments ({entry.comments?.length || 0})
          </h2>

          {user ? (
            <form onSubmit={handleComment} className="mb-8">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:outline-none mb-3"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-700 text-white hover:bg-yellow-800 transition-colors"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 border border-gray-200">
              <p className="text-gray-700">
                Please{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-yellow-700 hover:text-yellow-700 underline"
                >
                  login
                </button>{' '}
                to comment
              </p>
            </div>
          )}

          <div className="space-y-6">
            {entry.comments?.map((comment) => (
              <div key={comment._id} className="bg-gray-50 p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{comment.userName}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};

export default EntryDetail;

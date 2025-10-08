import { Link } from 'react-router-dom';
import { MapPin, Eye, Heart } from 'lucide-react';

const EntryCard = ({ entry }) => {
  return (
    <Link to={`/entry/${entry.slug || entry._id}`} className="block group">
      <article className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 h-full flex flex-col">
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img
            src={entry.imageUrls[0]}
            alt={entry.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
              {entry.category.replace('-', ' ')}
            </span>
          </div>

          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {entry.title}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">
            {entry.content?.substring(0, 150)}...
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{entry.location}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{entry.views || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={14} />
                <span>{entry.likes?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EntryCard;

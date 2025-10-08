import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3">BharatArchive</h3>
            <p className="text-sm text-gray-600">
              Preserving and celebrating India's rich cultural heritage, ancient wisdom, and timeless traditions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-sm text-gray-600 hover:text-gray-900">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Temples & Monuments</li>
              <li className="text-sm text-gray-600">Ancient Technology</li>
              <li className="text-sm text-gray-600">Festivals & Traditions</li>
              <li className="text-sm text-gray-600">Art & Culture</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BharatArchive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import SEO from '../components/SEO';

const About = () => {
  return (
    <>
      <SEO
        title="About BharatArchive"
        description="Learn about BharatArchive's mission to preserve and celebrate India's rich cultural heritage and traditions"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">
          About BharatArchive
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            BharatArchive is dedicated to preserving and celebrating India's rich cultural heritage,
            ancient wisdom, and timeless traditions.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-8">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We believe that India's cultural heritage is a treasure that belongs to all of humanity.
            Through this platform, we aim to document, preserve, and share the stories of ancient
            temples, traditional festivals, time-honored customs, and the wisdom of our ancestors.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-8">What We Cover</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Ancient temples and their architectural marvels</li>
            <li>Traditional festivals and their cultural significance</li>
            <li>Ancient Indian technology and scientific achievements</li>
            <li>Art forms, crafts, and traditional practices</li>
            <li>Historical monuments and heritage sites</li>
            <li>Cultural traditions and customs across India</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-8">Join Our Community</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Whether you're a history enthusiast, a cultural researcher, or simply someone who
            appreciates India's rich heritage, we invite you to explore, learn, and contribute
            to preserving these timeless treasures for future generations.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;

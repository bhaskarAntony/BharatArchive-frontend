import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteTitle = 'BharatArchive - Indian Cultural Heritage';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'Explore and preserve India\'s rich cultural heritage, ancient temples, traditional festivals, and timeless wisdom. Discover the beauty of Bharat\'s history and traditions.';
  const defaultKeywords = 'Indian heritage, Bharat, cultural archive, temples, festivals, ancient India, traditions, Indian culture, monuments, history';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}

      <link rel="canonical" href={url || window.location.href} />
    </Helmet>
  );
};

export default SEO;

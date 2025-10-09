import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'BharatArchive',
  published,
  modified
}) => {
  const siteTitle = 'BharatArchive - Indian Cultural Heritage';
  const siteName = 'BharatArchive';
  const fullTitle = title ? `${title} | ${siteTitle}` : 'BharatArchive - Discover India\'s Cultural Heritage | Temples, Festivals & Ancient Wisdom';
  const defaultDescription = 'Explore and preserve India\'s rich cultural heritage, ancient temples, traditional festivals, and timeless wisdom. Discover the beauty of Bharat\'s history and traditions. A comprehensive digital archive of Indian culture.';
  const defaultKeywords = 'Indian heritage, Bharat, cultural archive, Indian temples, festivals, ancient India, Indian traditions, Indian culture, monuments, history, Indian architecture, Hindu temples, cultural preservation';
  const defaultImage = 'https://bharat-archive.vercel.app/og-image.jpg';
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://bharatarchive.com');

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={currentUrl} />

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:image:secure_url" content={image || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || 'BharatArchive - Indian Cultural Heritage'} />
      <meta property="og:image:type" content="image/jpeg" />
      {published && <meta property="article:published_time" content={published} />}
      {modified && <meta property="article:modified_time" content={modified} />}
      {type === 'article' && <meta property="article:author" content={author} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:image:alt" content={title || 'BharatArchive - Indian Cultural Heritage'} />
      <meta name="twitter:site" content="@bharatarchive" />
      <meta name="twitter:creator" content="@bharatarchive" />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="BharatArchive" />

      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="application-name" content="BharatArchive" />

      <meta itemProp="name" content={fullTitle} />
      <meta itemProp="description" content={description || defaultDescription} />
      <meta itemProp="image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;

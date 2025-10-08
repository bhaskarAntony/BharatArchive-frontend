export const generateMetaTags = (entry) => {
  return {
    title: `${entry.title} | BharatArchive - Indian Cultural Heritage`,
    description: entry.metaDescription || entry.content.substring(0, 160),
    keywords: entry.keywords?.join(', ') || `${entry.category}, Indian heritage, ${entry.location}`,
    image: entry.imageUrls[0] || '',
    url: `${window.location.origin}/entry/${entry.slug}`,
  };
};

export const generateStructuredData = (entry) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.metaDescription || entry.content.substring(0, 160),
    image: entry.imageUrls,
    datePublished: entry.createdAt,
    dateModified: entry.updatedAt,
    author: {
      '@type': 'Person',
      name: entry.createdBy?.name || 'BharatArchive',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BharatArchive',
      logo: {
        '@type': 'ImageObject',
        url: `${window.location.origin}/logo.png`,
      },
    },
  };
};

export const generateSitemap = (entries) => {
  const baseUrl = window.location.origin;
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  xml += `  <url>\n    <loc>${baseUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  entries.forEach(entry => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/entry/${entry.slug}</loc>\n`;
    xml += `    <lastmod>${new Date(entry.updatedAt).toISOString()}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += '</urlset>';
  return xml;
};

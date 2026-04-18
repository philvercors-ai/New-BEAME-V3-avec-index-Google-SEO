const SITE_URL = 'https://beame.art';

const STATIC_PAGES = [
  { path: '/',             priority: '1.0', changefreq: 'monthly' },
  { path: '/galerie',      priority: '0.9', changefreq: 'weekly'  },
  { path: '/bio',          priority: '0.8', changefreq: 'monthly' },
  { path: '/expositions',  priority: '0.8', changefreq: 'monthly' },
  { path: '/contact',      priority: '0.5', changefreq: 'yearly'  },
];

module.exports = async function handler(req, res) {
  const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
  const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

  let artworks = [];
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/artworks?select=slug&order=sort_order.asc`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (r.ok) artworks = await r.json();
  } catch (_) {}

  const today = new Date().toISOString().split('T')[0];

  const allPages = [
    ...STATIC_PAGES.map(p => ({ url: p.path, priority: p.priority, changefreq: p.changefreq })),
    ...artworks.map(a => ({ url: `/galerie/${a.slug}`, priority: '0.7', changefreq: 'yearly' })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(xml);
};

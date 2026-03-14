#!/usr/bin/env node
/**
 * Génère public/sitemap.xml à partir des œuvres en base Supabase.
 * Usage : npm run sitemap
 * Nécessite REACT_APP_SUPABASE_URL et REACT_APP_SUPABASE_ANON_KEY dans .env.local
 */

const fs   = require('fs');
const path = require('path');

// Charger .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^([^#][^=]*)=(.+)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const SITE_URL     = 'https://beame.art';

const STATIC_PAGES = [
  { path: '/',        priority: '1.0', changefreq: 'monthly' },
  { path: '/bio',     priority: '0.8', changefreq: 'monthly' },
  { path: '/galerie', priority: '0.9', changefreq: 'weekly'  },
  { path: '/contact', priority: '0.5', changefreq: 'yearly'  },
];

async function generateSitemap() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Erreur : REACT_APP_SUPABASE_URL et REACT_APP_SUPABASE_ANON_KEY sont requis.');
    process.exit(1);
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/artworks?select=slug,sort_order&order=sort_order.asc`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );

  if (!res.ok) {
    console.error('Erreur Supabase :', await res.text());
    process.exit(1);
  }

  const artworks = await res.json();
  const today    = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Pages principales -->
${STATIC_PAGES.map(p => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}

  <!-- Pages œuvres (${artworks.length}) -->
${artworks.map(art => `  <url>
    <loc>${SITE_URL}/galerie/${art.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}

</urlset>`;

  const out = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(out, xml, 'utf-8');
  console.log(`sitemap.xml généré : ${artworks.length} œuvre(s) + ${STATIC_PAGES.length} pages → ${out}`);
}

generateSitemap().catch(err => { console.error(err); process.exit(1); });

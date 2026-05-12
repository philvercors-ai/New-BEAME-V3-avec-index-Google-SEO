const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://beame.art';

function esc(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let cachedIndex = null;

function getIndexHtml() {
  if (cachedIndex) return cachedIndex;
  try {
    cachedIndex = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    return cachedIndex;
  } catch (e) {
    return null;
  }
}

function injectOG(html, { title, description, image, url }) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("/g,       `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${esc(image)}$2`)
    .replace(/(<meta property="og:image:width" content=")[^"]*(")/, `$11200$2`)
    .replace(/(<meta property="og:image:height" content=")[^"]*(")/, `$1900$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${esc(url)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${esc(url)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${esc(image)}$2`);
}

module.exports = async (req, res) => {
  const slug = req.query.slug;

  if (!slug) {
    res.setHeader('Location', '/galerie');
    return res.status(302).end();
  }

  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );

  const { data: artwork } = await supabase
    .from('artworks')
    .select('title, image, technique, support, dimensions, description')
    .eq('slug', slug)
    .single();

  if (!artwork) {
    res.setHeader('Location', '/galerie');
    return res.status(302).end();
  }

  const title = `${artwork.title} — BÉAME`;
  const description = artwork.description
    || `${artwork.technique} sur ${artwork.support} · ${artwork.dimensions}`;
  const url = `${SITE_URL}/galerie/${slug}`;
  const image = artwork.image;

  const indexHtml = getIndexHtml();

  if (indexHtml) {
    const html = injectOG(indexHtml, { title, description, image, url });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).send(html);
  }

  // Fallback si index.html non disponible (ne devrait pas arriver)
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>${esc(title)}</title>
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${esc(image)}" />
  <meta property="og:url" content="${esc(url)}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:site_name" content="BÉAME — Artiste Peintre" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${esc(image)}" />
</head>
<body></body>
</html>`);
};

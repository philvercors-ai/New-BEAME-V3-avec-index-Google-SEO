const { createClient } = require('@supabase/supabase-js');

const SITE_URL = 'https://beame.art';

function esc(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${esc(artwork.image)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="900" />
  <meta property="og:url" content="${esc(url)}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:site_name" content="BÉAME — Artiste Peintre" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(artwork.image)}" />
  <link rel="canonical" href="${esc(url)}" />
</head>
<body></body>
</html>`);
};

import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
  NavLink
} from "react-router-dom";
import { Menu, X, ArrowLeft, Instagram } from "lucide-react";

// --- DONNÉES ---
const ARTWORKS = [
  { id: 8, slug: "Chaos-originel", title: "Chaos originel", category: "abstrait", image: "/images/Chaos-originel.webp", technique: "Huile", support: "Toile de lin", description: "Là où la peinture s'arrache au chaos pour donner corps à l'invisible.", price: "500€", dimensions: "50x61cm" },
  { id: 9, slug: "L_or-et-l_azur", title: "L'or et l'azur", category: "mer & océan", image: "/images/L_or-et-l_azur.webp", technique: "Huile", support: "toile de lin", description: "Le ressac d'un soleil qui s'éteint dans les éclats de la matière.", price: "500€", dimensions: "50x61cm" },
  { id: 10, slug: "La-Légèreté-de-l'instant", title: "La légèreté de l'instant", category: "abstrait", image: "/images/La-Légèreté-de-l'Instant.webp", technique: "Huile", support: "toile de lin", description: "Un instant sacré se suspend entre deux mondes.", price: "500€", dimensions: "50x61cm" },
  { id: 6, slug: "elevation", title: "Élévation", category: "abstrait", image: "/images/elevation.webp", technique: "Acrylique", support: "carton entoilé", description: "Une ascension chromatique entre terre et ciel.", price: "300€", dimensions: "25x40cm" },
  { id: 3, slug: "vendee-globe-1", title: "Vendée Globe 1", category: "mer & océan", image: "/images/vg1.jpeg", technique: "Huile", support: "toile de lin", description: "L'odyssée chromatique entre ciel de feu et mer d'azur.", price: "1200€", dimensions: "80x100cm" },
  { id: 2, slug: "vendee-globe-2", title: "Vendée Globe 2", category: "mer & océan", image: "/images/vg2.jpeg", technique: "Huile", support: "toile de lin", description: "Marine puissante évoquant la course au large.", price: "950€", dimensions: "70x90cm" },
  { id: 1, slug: "o", title: "Ô", category: "abstrait", image: "/images/o.jpg", technique: "Huile", support: "contre-plaqué", description: "Méditation sur la forme circulaire.", price: "850€", dimensions: "60x100cm" },
  { id: 4, slug: "le-chant-des-cigales", title: "Le chant des cigales", category: "paysage", image: "/images/Le-chant-des-cigales.webp", technique: "Huile", support: "toile de lin", description: "Évocation de la chaleur provençale.", price: "750€", dimensions: "50x70cm" },
  { id: 5, slug: "mer-emeraude", title: "Mer Émeraude", category: "mer & océan", image: "/images/mer-emeraude.webp", technique: "Huile", support: "toile de lin", description: "L'éclat cristallin d'un rivage sauvage.", price: "890€", dimensions: "65x85cm"},
];

// --- COMPOSANT SEO ---
const SITE_URL = "https://beame.art";
const DEFAULT_IMAGE = "/images/Chaos-originel.webp";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  path: string;
  jsonLd?: object;
}

const SEO = ({ title, description, image, path, jsonLd }: SEOProps) => {
  const absUrl = `${SITE_URL}${path}`;
  const absImage = `${SITE_URL}${image || DEFAULT_IMAGE}`;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    if (jsonLdString) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", "true");
      script.text = jsonLdString;
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [jsonLdString]);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absImage} />
      <meta property="og:url" content={absUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absImage} />
    </>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// --- NAVIGATION ---
const Navigation = ({ isMenuOpen, setIsMenuOpen }: any) => (
  <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
      <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
        <span className="text-2xl font-serif text-gray-900 tracking-tighter">BÉAME</span>
      </Link>
      <div className="hidden md:flex space-x-8">
        <NavLink to="/" className={({ isActive }) => `${isActive ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition uppercase text-[10px] tracking-widest px-1`}>Accueil</NavLink>
        <NavLink to="/bio" className={({ isActive }) => `${isActive ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition uppercase text-[10px] tracking-widest px-1`}>L'Artiste</NavLink>
        <NavLink to="/galerie" className={({ isActive }) => `${isActive ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition uppercase text-[10px] tracking-widest px-1`}>Galerie</NavLink>
        <NavLink to="/contact" className={({ isActive }) => `${isActive ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition uppercase text-[10px] tracking-widest px-1`}>Contact</NavLink>
      </div>
      <div className="flex items-center space-x-4">
        <a href="https://instagram.com/beame.arts" target="_blank" rel="noreferrer" aria-label="BÉAME sur Instagram" className="text-gray-600 hover:text-amber-600 transition"><Instagram size={20} /></a>
        <button className="md:hidden" aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
    {isMenuOpen && (
      <div className="md:hidden bg-white border-t flex flex-col p-4 space-y-4">
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="uppercase text-[10px] tracking-widest font-bold">Accueil</Link>
        <Link to="/bio" onClick={() => setIsMenuOpen(false)} className="uppercase text-[10px] tracking-widest font-bold">L'Artiste</Link>
        <Link to="/galerie" onClick={() => setIsMenuOpen(false)} className="uppercase text-[10px] tracking-widest font-bold">Galerie</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="uppercase text-[10px] tracking-widest font-bold">Contact</Link>
      </div>
    )}
  </nav>
);

// --- PAGE ACCUEIL ---
const AccueilPage = () => (
  <div className="relative h-screen flex items-center justify-center overflow-hidden">
    <SEO
      title="BÉAME | Artiste Peintre à Saint Remèze - Ardèche"
      description="Découvrez les œuvres de BÉAME, artiste peintre professionnelle à Saint Remèze en Ardèche. Peintures à l'huile et acrylique, paysages, abstraits et marines."
      image="/images/Chaos-originel.webp"
      path="/"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "BÉAME",
        "jobTitle": "Artiste Peintre",
        "url": "https://beame.art",
        "sameAs": ["https://www.instagram.com/beame.arts"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Saint Remèze",
          "addressRegion": "Ardèche",
          "addressCountry": "FR"
        }
      }}
    />
    <div className="absolute inset-0 z-0">
      <img src="images/Chaos-originel.webp" alt="Chaos originel - peinture à l'huile de BÉAME, artiste ardéchoise" className="w-full h-full object-cover scale-105 animate-slow-zoom" />
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>
    </div>
    <div className="relative z-10 text-center px-4">
      <h1 className="text-7xl md:text-9xl font-serif mb-6 tracking-tighter text-gray-900">BÉAME</h1>
      <h2 className="text-amber-900 uppercase tracking-[0.4em] text-sm md:text-base mb-12 font-bold">Artiste Peintre Professionnel • Saint Remèze - Ardèche</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <Link to="/galerie" className="px-10 py-4 bg-gray-900 text-white uppercase tracking-widest text-[10px] font-bold hover:bg-amber-800 transition">
          Découvrir la Galerie
        </Link>
        <Link to="/bio" className="px-10 py-4 border border-gray-900 text-gray-900 uppercase tracking-widest text-[10px] font-bold hover:bg-gray-900 hover:text-white transition">
          L'Artiste
        </Link>
      </div>
    </div>
  </div>
);

// --- PAGE BIO ---
const BioPage = () => (
  <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
    <SEO
      title="Biographie | BÉAME - Artiste Peintre en Ardèche"
      description="Découvrez le parcours de BÉAME, artiste peintre de Saint Remèze en Ardèche. Passionnée par la lumière des paysages minéraux, elle peint au couteau sur toile de lin."
      image="/images/bea.webp"
      path="/bio"
    />
    <h1 className="text-5xl font-serif text-center mb-16">Biographie</h1>
    <div className="grid md:grid-cols-5 gap-12 items-center">
     <div className="md:col-span-3 space-y-6 text-lg text-left">
        <p className="font-serif italic text-2xl text-amber-800">Le geste et la lumière</p>
        <p>BÉAME explore la frontière entre figuration et abstraction depuis son atelier de Saint Remèze.</p>
        <p>Ses œuvres sont une quête de la lumière qui sculpte les paysages minéraux de l'Ardèche, traduisant l'émotion brute par le couteau et la matière.</p>
      </div>
      <div className="md:col-span-2">
        <img src="/images/bea.webp" alt="BÉAME, artiste peintre à Saint Remèze en Ardèche" className="w-full shadow-2xl grayscale" />
      </div>
    </div>
  </div>
);

// --- PAGE GALERIE ---
const GaleriePage = () => {
  const [selectedFilter, setSelectedFilter] = useState("tous");
  const filteredArt = ARTWORKS.filter(art => selectedFilter === "tous" || art.category === selectedFilter);
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
      <SEO
        title="Galerie d'Art | BÉAME - Peintures Originales à Vendre"
        description="Galerie de peintures originales de BÉAME : tableaux abstraits, paysages ardéchois et marines. Huile et acrylique sur toile de lin. Œuvres disponibles à l'achat."
        image="/images/Chaos-originel.webp"
        path="/galerie"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Galerie BÉAME - Peintures originales",
          "description": "Collection de peintures originales de l'artiste BÉAME",
          "itemListElement": ARTWORKS.map((art, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": art.title,
            "url": `${SITE_URL}/galerie/${art.slug}`
          }))
        }}
      />
      <h1 className="text-5xl font-serif text-center mb-12">Galerie d'Art</h1>
      <div className="flex justify-center gap-4 mb-16 text-[10px] uppercase tracking-[0.2em] flex-wrap">
        {["tous", "paysage", "abstrait", "mer & océan"].map(filter => (
          <button key={filter} onClick={() => setSelectedFilter(filter)} className={`pb-2 transition-all ${selectedFilter === filter ? "text-amber-700 border-b-2 border-amber-700 font-bold" : "text-gray-400 hover:text-gray-900"}`}>{filter}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredArt.map((art) => (
          <Link to={`/galerie/${art.slug}`} key={art.id} className="group">
            <article>
              <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 shadow-md">
                <img src={art.image} alt={`${art.title} - ${art.technique} sur ${art.support} par BÉAME`} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-xl font-serif italic text-gray-900">{art.title}</h2>
                <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest font-medium">{art.dimensions} • {art.price}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- PAGE DÉTAILS ---
const InfoImage = () => {
  const { slug } = useParams();
  const artwork = ARTWORKS.find(a => a.slug === slug);
  if (!artwork) return <div className="pt-40 text-center">Œuvre non trouvée</div>;

  const priceNum = artwork.price.replace(/[^0-9]/g, "");

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row overflow-y-auto">
      <SEO
        title={`${artwork.title} - ${artwork.technique} sur ${artwork.support} | BÉAME`}
        description={`${artwork.description} ${artwork.technique} sur ${artwork.support}, ${artwork.dimensions}. Prix : ${artwork.price}. Œuvre originale de l'artiste BÉAME.`}
        image={artwork.image}
        path={`/galerie/${artwork.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "VisualArtwork",
          "name": artwork.title,
          "description": artwork.description,
          "image": `${SITE_URL}${artwork.image}`,
          "url": `${SITE_URL}/galerie/${artwork.slug}`,
          "creator": {
            "@type": "Person",
            "name": "BÉAME",
            "url": SITE_URL
          },
          "artMedium": artwork.technique,
          "artworkSurface": artwork.support,
          "artEdition": "Œuvre originale unique",
          "offers": {
            "@type": "Offer",
            "price": priceNum,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": `${SITE_URL}/contact?sujet=${encodeURIComponent(artwork.title)}`
          }
        }}
      />
      <Link to="/galerie" className="absolute top-6 left-6 z-[110] flex items-center space-x-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg">
        <ArrowLeft size={18} />
        <span className="font-bold uppercase tracking-widest text-[10px]">Retour Galerie</span>
      </Link>
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-50 flex items-center justify-center p-4">
        <img src={artwork.image} alt={`${artwork.title} - ${artwork.technique} sur ${artwork.support}, ${artwork.dimensions} - BÉAME`} className="max-w-full max-h-full object-contain shadow-2xl" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8 text-left">
          <div><span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">{artwork.category}</span>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2 italic">{artwork.title}</h1></div>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line border-t pt-6">{artwork.description}</p>
          <div className="space-y-3 text-gray-600 border-t pt-6 text-[11px] uppercase tracking-wide">
            <p className="flex justify-between"><strong>Dimensions</strong> <span>{artwork.dimensions}</span></p>
            <p className="flex justify-between"><strong>Technique</strong> <span>{artwork.technique}</span></p>
            <p className="text-3xl font-light text-amber-800 pt-4">{artwork.price}</p>
          </div>
          <Link to={`/contact?sujet=${encodeURIComponent(artwork.title)}`} className="block text-center w-full bg-gray-900 text-white py-5 font-bold uppercase tracking-widest text-xs">Demander une acquisition</Link>
        </div>
      </div>
    </div>
  );
};

// --- PAGE CONTACT ---
const ContactPage = () => {
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sujetPredefini = query.get('sujet');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    const formData = new FormData(e.currentTarget);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // @ts-ignore
        body: new URLSearchParams(formData).toString(),
      });
      setStatus("SUCCESS");
    } catch { setStatus("ERROR"); }
  };

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
      <SEO
        title="Contact | BÉAME - Artiste Peintre Ardèche"
        description="Contactez BÉAME pour l'acquisition d'une peinture originale, une commande ou des renseignements. Artiste peintre à Saint Remèze en Ardèche."
        path="/contact"
      />
      <h1 className="text-5xl font-serif mb-12 text-center">Contact</h1>
      <div className="bg-gray-50 p-8 md:p-12 shadow-inner">
        {status === "SUCCESS" ? (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
            <h2 className="text-3xl font-serif text-amber-800 mb-4">Merci !</h2>
            <p className="text-gray-600 uppercase tracking-widest text-[10px] font-bold">Votre message a bien été transmis à BÉAME.</p>
            <Link to="/galerie" className="mt-8 inline-block border-b border-black pb-1 text-[10px] uppercase tracking-widest font-bold">Retourner à la galerie</Link>
          </div>
        ) : (
          <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-8 text-left">
            <input type="hidden" name="form-name" value="contact" />
            <input name="subject" defaultValue={sujetPredefini ? `Acquisition : ${sujetPredefini}` : ""} placeholder="SUJET" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[10px] tracking-widest font-bold" />
            <div className="grid md:grid-cols-2 gap-8">
              <input name="name" required placeholder="NOM" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[10px] tracking-widest" />
              <input name="email" required type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[10px] tracking-widest" />
            </div>
            <textarea name="message" required rows={5} placeholder="VOTRE MESSAGE" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 resize-none text-[10px] tracking-widest" />
            <button type="submit" disabled={status === "SENDING"} className="bg-gray-900 text-white px-12 py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-amber-800 transition">
              {status === "SENDING" ? "Envoi..." : "Envoyer le message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white">
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<AccueilPage />} />
            <Route path="/galerie" element={<GaleriePage />} />
            <Route path="/galerie/:slug" element={<InfoImage />} />
            <Route path="/bio" element={<BioPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-12 text-center">
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">© 2025 BÉAME - Artiste Peintre Saint Remèze - Ardèche</p>
        </footer>
      </div>
    </Router>
  );
}

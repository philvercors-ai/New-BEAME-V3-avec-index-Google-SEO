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
import { Menu, X, Instagram, Mail, ChevronRight, ArrowLeft } from "lucide-react";

// --- TYPES ET DONNÉES ---
interface Artwork {
  id: number;
  slug: string; 
  title: string;
  category: string;
  image: string;
  technique: string;
  support: string;
  description: string;
  price: string;
  dimensions: string;
}

const ARTWORKS: Artwork[] = [
  { 
    id: 6, 
    slug: "elevation",
    title: "Élévation", 
    category: "abstrait", 
    image: "/images/elevation.webp", 
    technique: "Acrylique", 
    support: "carton entoilé", 
    description: "Une ascension chromatique entre terre et ciel. Cette œuvre se distingue par une verticalité audacieuse qui guide l'œil vers un sommet imaginaire.", 
    price: "300€", 
    dimensions: "25x40cm" 
  },
  { id: 2, slug: "vendee-globe-2", title: "Vendée Globe 2", category: "mer & océan", image: "/images/vg2.jpeg", technique: "Huile", support: "toile de lin", description: "Marine puissante évoquant la course au large.", price: "950€", dimensions: "70x90cm" },
  { 
    id: 3, 
    slug: "vendee-globe-1",
    title: "Vendée Globe 1", 
    category: "mer & océan", 
    image: "/images/vg1.jpeg", 
    technique: "Huile", 
    support: "toile de lin", 
    description: "L'odyssée chromatique entre ciel de feu et mer d'azur. Le travail au couteau sculpte l'écume et la houle.", 
    price: "1200€", 
    dimensions: "80x100cm" 
  },
  { id: 1, slug: "o", title: "Ô", category: "abstrait", image: "/images/o.jpg", technique: "Huile", support: "toile de lin", description: "Méditation sur la forme circulaire et la profondeur des bleus.", price: "850€", dimensions: "60x100cm" },
  { id: 4, slug: "le-chant-des-cigales", title: "Le chant des cigales", category: "paysage", image: "/images/Le-chant-des-cigales.webp", technique: "Huile", support: "toile de lin", description: "Évocation de la chaleur provençale.", price: "750€", dimensions: "50x70cm" },
  { id: 5, slug: "mer-emeraude", title: "Mer Émeraude", category: "mer & océan", image: "/images/mer-emeraude.webp", technique: "Huile", support: "toile de lin", description: "L'éclat cristallin d'un rivage sauvage.", price: "890€", dimensions: "65x85cm"},
];

// --- COMPOSANTS DE PAGES ---

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
        <a href="https://instagram.com/beame.arts" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-amber-600 transition"><Instagram size={20} /></a>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  </nav>
);

const AccueilPage = () => (
  <div className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* SEO NATIVE REACT 19 */}
    <title>BÉAME | Artiste Peintre à Vallon Pont d'Arc, Ardèche</title>
    <meta name="description" content="Découvrez les œuvres de BÉAME, artiste peintre en Ardèche. Galeries de peintures contemporaines, paysages et abstractions." />
    
    <div className="absolute inset-0 z-0">
      <img src="/images/o.jpg" alt="Peinture BÉAME" className="w-full h-full object-cover scale-105 animate-slow-zoom" />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
    </div>
    <div className="relative z-10 text-center px-4">
      <h1 className="text-7xl md:text-9xl font-serif mb-6 tracking-tighter text-gray-900">BÉAME</h1>
      <h2 className="text-amber-900 uppercase tracking-[0.4em] text-sm md:text-base mb-12 font-bold">Artiste Peintre Professionnel • Vallon Pont d'Arc</h2>
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

const GaleriePage = () => {
  const [selectedFilter, setSelectedFilter] = useState("tous");
  const filteredArt = ARTWORKS.filter(art => selectedFilter === "tous" || art.category === selectedFilter);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
      <title>Galerie d'Art - Peintures de BÉAME</title>
      <meta name="description" content="Explorez la collection de peintures : paysages ardéchois, marines et abstractions." />
      
      <h1 className="text-5xl font-serif text-center mb-12">Galerie d'Art</h1>
      <div className="flex justify-center gap-4 md:gap-8 mb-16 text-[10px] uppercase tracking-[0.2em] flex-wrap">
        {["tous", "paysage", "abstrait", "mer & océan"].map(filter => (
          <button key={filter} onClick={() => setSelectedFilter(filter)} className={`pb-2 transition-all ${selectedFilter === filter ? "text-amber-700 border-b-2 border-amber-700 font-bold" : "text-gray-400 hover:text-gray-900"}`}>
            {filter}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredArt.map((art) => (
          <Link to={`/galerie/${art.slug}`} key={art.id} className="group">
            <article>
              <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 shadow-md">
                <img src={art.image} alt={`Peinture ${art.title} par BÉAME`} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white border border-white px-8 py-3 text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-sm">Détails</span>
                </div>
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

const InfoImage = () => {
  const { slug } = useParams();
  const artwork = ARTWORKS.find(a => a.slug === slug);

  if (!artwork) return <div className="pt-40 text-center">Œuvre non trouvée</div>;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "VisualArtwork",
    "name": artwork.title,
    "image": `https://beame.art${artwork.image}`,
    "description": artwork.description,
    "artMedium": artwork.technique,
    "creator": { "@type": "Person", "name": "BÉAME" },
    "offers": { "@type": "Offer", "price": artwork.price.replace('€', ''), "priceCurrency": "EUR" }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row overflow-y-auto">
      <title>{`${artwork.title} | BÉAME`}</title>
      <meta name="description" content={`${artwork.title}, une peinture ${artwork.technique} sur ${artwork.support}. ${artwork.description}`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <Link to="/galerie" className="absolute top-6 left-6 z-[110] flex items-center space-x-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg">
        <ArrowLeft size={18} />
        <span className="font-bold uppercase tracking-widest text-[10px]">Retour Galerie</span>
      </Link>

      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-50 flex items-center justify-center p-4">
        <img src={artwork.image} alt={artwork.title} className="max-w-full max-h-full object-contain shadow-2xl" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div>
            <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">{artwork.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2 italic">{artwork.title}</h1>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line border-t pt-6">
            {artwork.description || "Une exploration des textures et de la lumière."}
          </p>
          <div className="space-y-3 text-gray-600 border-t pt-6 text-[11px] uppercase tracking-wide">
            <p className="flex justify-between"><strong>Dimensions</strong> <span>{artwork.dimensions}</span></p>
            <p className="flex justify-between"><strong>Technique</strong> <span>{artwork.technique}</span></p>
            <p className="text-3xl font-light text-amber-800 pt-4 lowercase">{artwork.price}</p>
          </div>
          <Link to={`/contact?sujet=${encodeURIComponent(artwork.title)}`} className="block text-center w-full bg-gray-900 text-white py-5 font-bold uppercase tracking-widest text-xs">
            Demander une acquisition
          </Link>
        </div>
      </div>
    </div>
  );
};

const BioPage = () => (
  <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
    <title>Biographie de BÉAME | Artiste Peintre Vallon Pont d'Arc</title>
    <meta name="description" content="Découvrez le parcours artistique de BÉAME et son atelier situé à Vallon Pont d'Arc en Ardèche." />
    
    <h1 className="text-5xl font-serif text-center mb-16">Biographie</h1>
    <div className="grid md:grid-cols-5 gap-12 items-center">
      <div className="md:col-span-3 space-y-6 text-lg">
        <p className="font-serif italic text-2xl text-amber-800">Le geste et la lumière</p>
        <p>BÉAME explore la frontière entre figuration et abstraction depuis son atelier de Vallon Pont d'Arc.</p>
        <p>Ses œuvres sont une quête de la lumière qui sculpte les paysages minéraux de l'Ardèche.</p>
      </div>
      <div className="md:col-span-2">
        <img src="/images/bea.webp" alt="L'artiste BÉAME" className="w-full shadow-2xl grayscale" />
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sujetPredefini = query.get('sujet');

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
      <title>Contact | BÉAME</title>
      <meta name="description" content="Contactez l'artiste BÉAME pour une acquisition ou une visite d'atelier en Ardèche." />
      <h1 className="text-5xl font-serif mb-12">Contact</h1>
      <div className="bg-gray-50 p-8 md:p-12 shadow-inner">
        <form className="space-y-8">
          <input defaultValue={sujetPredefini ? `Acquisition : ${sujetPredefini}` : ""} placeholder="SUJET" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[10px] tracking-widest font-bold" />
          <div className="grid md:grid-cols-2 gap-8">
            <input required placeholder="NOM" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[10px] tracking-widest" />
            <input required type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[10px] tracking-widest" />
          </div>
          <textarea required rows={5} placeholder="VOTRE MESSAGE" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 resize-none text-[10px] tracking-widest" />
          <button type="button" className="bg-gray-900 text-white px-12 py-4 uppercase tracking-widest text-[10px] font-bold">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

// --- APP ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
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
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">© 2025 BÉAME - Artiste Peintre Vallon Pont d'Arc</p>
        </footer>
      </div>
    </Router>
  );
}
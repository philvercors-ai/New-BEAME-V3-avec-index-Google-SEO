import "./App.css";
import React, { useState, useEffect } from "react";
import { Menu, X, Instagram, Mail, ChevronRight, ArrowLeft } from "lucide-react";

// 1. Définition du type pour TypeScript
interface Artwork {
  id: number;
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
    title: "Élévation", 
    category: "abstrait", 
    image: "/images/elevation.webp", 
    technique: "Acrylique", 
    support: "carton entoilé", 
    description: "Une ascension chromatique entre terre et ciel. Cette œuvre se distingue par une verticalité audacieuse qui guide l'œil vers un sommet imaginaire. Travaillée principalement au couteau, la matière s'exprime par des empâtements généreux.", 
    price: "300€", 
    dimensions: "25x40cm" 
  },
  { id: 2, title: "Vendée Globe 2", category: "mer & océan", image: "/images/vg2.jpeg", technique: "Huile", support: "toile de lin", description: "", price: "950€", dimensions: "70x90cm" },
  { 
    id: 3, 
    title: "Vendée Globe 1", 
    category: "mer & océan", 
    image: "/images/vg1.jpeg", 
    technique: "Huile", 
    support: "toile de lin", 
    description: "L'odyssée chromatique entre ciel de feu et mer d'azur. Cette œuvre célèbre le courage des marins solitaires face à l'immensité vibrante de l'océan. Le travail au couteau sculpte l'écume et la houle dans un contraste thermique saisissant entre un ciel incandescent et une mer d'un bleu électrique.", 
    price: "1200€", 
    dimensions: "80x100cm" 
  },
  { id: 1, title: "Ô", category: "abstrait", image: "/images/o.jpg", technique: "Huile", support: "toile de lin", description: "", price: "850€", dimensions: "60x100cm" },
  { id: 4, title: "Le chant des cigales", category: "paysage", image: "/images/Le-chant-des-cigales.webp", technique: "Huile", support: "toile de lin", description: "", price: "750€", dimensions: "50x70cm" },
  { id: 5, title: "Mer Émeraude", category: "mer & océan", image: "/images/mer-emeraude.webp", technique: "Huile", support: "toile de lin", description: "L'éclat cristallin d'un rivage sauvage. Cette œuvre capture ce moment suspendu où l'eau translucide vient caresser les teintes chaudes d'une côte rocheuse. Le travail sur les nuances de turquoise crée une profondeur saisissante, contrastant avec la force minérale des falaises.", price: "890€", dimensions: "65x85cm"},
];
// --- SOUS-COMPOSANTS ---

const AccueilPage = ({ setCurrentPage }: { setCurrentPage: (p: string) => void }) => {
  useEffect(() => {
    document.title = "BÉAME | Artiste Peintre à Vallon Pont d'Arc, Ardèche";
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/o.jpg" alt="BÉAME" className="w-full h-full object-cover scale-105 animate-slow-zoom" />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 text-center px-4 animate-in fade-in zoom-in duration-1000">
        <h1 className="text-7xl md:text-9xl font-serif mb-6 tracking-tighter text-gray-900 drop-shadow-sm">BÉAME</h1>
        <h2 className="text-amber-900 uppercase tracking-[0.4em] text-sm md:text-base mb-12 font-bold">Artiste Peintre Professionnel • Vallon Pont d'Arc</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button onClick={() => setCurrentPage("galerie")} className="group flex items-center gap-3 px-10 py-4 bg-gray-900 text-white uppercase tracking-widest text-[10px] font-bold hover:bg-amber-800 transition shadow-2xl">
            Découvrir la Galerie <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => setCurrentPage("bio")} className="px-10 py-4 border border-gray-900 text-gray-900 uppercase tracking-widest text-[10px] font-bold hover:bg-gray-900 hover:text-white transition">
            L'Artiste
          </button>
        </div>
      </div>
    </div>
  );
};

const Navigation = ({ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen }: any) => (
  <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
      <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage("accueil")}>
        <span className="text-2xl font-serif text-gray-900 tracking-tighter">BÉAME</span>
      </div>
      <div className="hidden md:flex space-x-8">
        {["accueil", "bio", "galerie", "contact"].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${currentPage.startsWith(page) ? "text-amber-700 font-semibold border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition capitalize text-[10px] tracking-widest px-1`}
          >
            {page}
          </button>
        ))}
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

const GaleriePage = ({ setCurrentPage, setSelectedArtwork, selectedFilter, setSelectedFilter }: any) => (
  <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
    <h1 className="text-5xl font-serif text-center mb-12">Galerie d'Art</h1>
    <div className="flex justify-center gap-4 md:gap-8 mb-16 text-[10px] uppercase tracking-[0.2em] flex-wrap">
      {["tous", "paysage", "abstrait", "mer & océan", "fleurs"].map(filter => (
        <button key={filter} onClick={() => setSelectedFilter(filter)} className={`pb-2 transition-all ${selectedFilter === filter ? "text-amber-700 border-b-2 border-amber-700 font-bold" : "text-gray-400 hover:text-gray-900"}`}>
          {filter}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {ARTWORKS.filter(art => selectedFilter === "tous" || art.category === selectedFilter).map((art) => (
        <article key={art.id} className="group cursor-pointer" onClick={() => { setSelectedArtwork(art); setCurrentPage("image_info"); }}>
          <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 shadow-md">
            <img src={art.image} alt={art.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white border border-white px-8 py-3 text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-sm">Détails</span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-xl font-serif italic text-gray-900">{art.title}</h3>
            <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest font-medium">{art.dimensions} • {art.price}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const InfoImage = ({ artwork, setCurrentPage }: { artwork: Artwork; setCurrentPage: (p: string) => void }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row overflow-y-auto md:overflow-hidden animate-in fade-in duration-300">
      {/* Bouton Retour */}
      <button 
        onClick={() => setCurrentPage("galerie")}
        className="absolute top-6 left-6 z-[110] flex items-center space-x-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg hover:text-amber-700 transition"
      >
        <ArrowLeft size={18} />
        <span className="font-bold uppercase tracking-widest text-[10px]">Retour Galerie</span>
      </button>

      {/* Colonne Gauche : L'Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-50 flex items-center justify-center p-4 md:p-12">
        <img 
          src={artwork.image} 
          alt={artwork.title} 
          className="max-w-full max-h-full object-contain shadow-2xl" 
        />
      </div>

      {/* Colonne Droite : Les Détails */}
      <div className="w-full md:w-1/2 h-auto md:h-full flex items-center justify-center p-8 md:p-16 bg-white overflow-y-auto">
        <div className="max-w-md w-full space-y-8">
          <div>
            <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">{artwork.category}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2 italic">{artwork.title}</h2>
          </div>

          {/* Section Description Artistique */}
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed border-t pt-6">
            <p className="font-serif italic text-lg text-amber-800">
              {artwork.id === 3 && "« L'odyssée chromatique entre ciel de feu et mer d'azur »"}
              {artwork.id === 5 && "« L'éclat cristallin d'un rivage sauvage »"}
              {artwork.id === 6 && "« Une ascension chromatique entre terre et ciel »"}
              {![3, 5, 6].includes(artwork.id) && "« Le geste et la lumière »"}
            </p>
            <p className="whitespace-pre-line">
              {artwork.description || "Une exploration des textures et de la lumière, capturant l'essence du mouvement et de la matière."}
            </p>
          </div>

          {/* Section Technique & Prix */}
          <div className="space-y-3 text-gray-600 border-t pt-6 text-[11px] uppercase tracking-wide">
            <p className="flex justify-between border-b pb-2"><strong>Dimensions</strong> <span>{artwork.dimensions}</span></p>
            <p className="flex justify-between border-b pb-2"><strong>Technique</strong> <span>{artwork.technique}</span></p>
            <p className="flex justify-between border-b pb-2"><strong>Support</strong> <span>{artwork.support}</span></p>
            <p className="text-3xl font-light text-amber-800 pt-4 lowercase tracking-normal">
              {artwork.price}
            </p>
          </div>

          {/* Bouton Contact avec sujet automatique */}
          <button 
            onClick={() => setCurrentPage(`contact?sujet=${encodeURIComponent(artwork.title)}`)} 
            className="w-full bg-gray-900 text-white py-5 rounded-none font-bold uppercase tracking-widest text-xs hover:bg-amber-800 transition shadow-xl"
          >
            Demander une acquisition
          </button>
        </div>
      </div>
    </div>
  );
};

const BioPage = () => (
  <div className="pt-32 pb-20 animate-in fade-in duration-1000">
    <div className="max-w-4xl mx-auto px-4 text-center md:text-left">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif mb-4 text-gray-900">Biographie</h1>
        <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3 space-y-6 text-gray-700 leading-relaxed text-lg order-2 md:order-1">
          <p className="font-serif italic text-2xl text-amber-800">Le geste et la lumière</p>
          <p>Explorant la frontière entre la figuration et l'abstraction, le travail de BÉAME est une quête permanente de la lumière qui sculpte les roches de l'Ardèche.</p>
          <p>Installé à Vallon Pont d'Arc, l'artiste puise son inspiration dans la sédimentation des paysages minéraux et la fluidité de l'instant présent.</p>
        </div>
        <div className="md:col-span-2 order-1 md:order-2">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden shadow-2xl rounded-sm">
            <img src="/images/bea.webp" alt="L'artiste peintre BÉAME" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = ({ currentPage }: { currentPage: string }) => {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const urlParams = new URLSearchParams(currentPage.split('?')[1]);
  const sujetPredefini = urlParams.get('sujet');

  const handleSubmit = (e: any) => { e.preventDefault(); setStatus("sending"); setTimeout(() => setStatus("success"), 1500); };

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3 space-y-12">
          <h1 className="text-5xl font-serif">Contact</h1>
          <p className="text-gray-500 text-sm">Une œuvre vous intéresse ? Vous souhaitez visiter l'atelier à Vallon Pont d'Arc ? Laissez-moi un message.</p>
          <div className="flex items-center gap-4 group">
            <div className="p-3 border group-hover:border-amber-700 transition"><Mail className="text-amber-700" size={18} /></div>
            <a href="mailto:beame.arts@gmail.com" className="text-[10px] uppercase tracking-widest font-bold">beame.arts@gmail.com</a>
          </div>
        </div>
        <div className="md:w-2/3 bg-gray-50 p-8 md:p-12 shadow-inner">
          {status === "success" ? (
            <div className="text-center py-12 font-serif text-xl animate-in zoom-in">✓ Message transmis.<br/><span className="text-sm font-sans text-gray-400">BÉAME vous répondra sous peu.</span></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <input defaultValue={sujetPredefini ? `Acquisition : ${sujetPredefini}` : ""} placeholder="SUJET" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 transition text-[10px] tracking-widest font-bold text-amber-900" />
              <div className="grid md:grid-cols-2 gap-8">
                <input required placeholder="NOM" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 transition text-[10px] tracking-widest" />
                <input required type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 transition text-[10px] tracking-widest" />
              </div>
              <textarea required rows={5} placeholder="VOTRE MESSAGE" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 resize-none transition text-[10px] tracking-widest" />
              <button className="bg-gray-900 text-white px-12 py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-amber-800 transition shadow-xl w-full md:w-auto">Envoyer la demande</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("accueil");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("tous");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header>
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>
      <main className="flex-grow">
        {currentPage === "accueil" && <AccueilPage setCurrentPage={setCurrentPage} />}
        {currentPage === "galerie" && <GaleriePage setCurrentPage={setCurrentPage} setSelectedArtwork={setSelectedArtwork} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />}
        {currentPage === "bio" && <BioPage />}
        {currentPage.startsWith("contact") && <ContactPage currentPage={currentPage} />}
        {currentPage === "image_info" && selectedArtwork && <InfoImage artwork={selectedArtwork} setCurrentPage={setCurrentPage} />}
      </main>
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">© 2025 BÉAME - Artiste Peintre Vallon Pont d'Arc - Tous droits réservés</p>
      </footer>
    </div>
  );
}
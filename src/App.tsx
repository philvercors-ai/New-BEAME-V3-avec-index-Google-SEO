import "./App.css";
import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
  NavLink
} from "react-router-dom";
import { Menu, X, ArrowLeft, Link2 } from "lucide-react";
import { supabase } from "./supabaseClient";
import type { Artwork, Exposition } from "./supabaseClient";
import AdminPage from "./AdminPage";

const PinterestIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);
const FacebookIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const WhatsAppIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const INSTAGRAM_DEFAULT = "https://instagram.com/beame.arts";

// --- VERSION
// v1.3.0 (2026-04-18) — Sitemap dynamique, partage social, page Expositions
// v1.2.0 (2026-04-14) — Multi-catégories par œuvre, tableau de bord statistiques admin
// v1.1.0 (2026-03-14) — Bio : nouveau texte complet, parcours artistique structuré
// v1.0.0 (2026-03-14) — Mise en production : galerie Supabase, SEO, admin CRUD, sitemap dynamique
// v0.1.0 (2026-03-10) — Version initiale : pages statiques, formulaire Web3Forms, React Router
const APP_VERSION = process.env.REACT_APP_VERSION || "1.4.0";

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
  const absImage = image?.startsWith('http') ? image : `${SITE_URL}${image || DEFAULT_IMAGE}`;
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
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!pathname.startsWith('/admin')) {
      supabase.from('page_views').insert({ page: pathname }).then(() => {});
    }
  }, [pathname]);
  return null;
};

// --- NAVIGATION ---
const Navigation = ({ isMenuOpen, setIsMenuOpen, instagramUrl }: { isMenuOpen: boolean; setIsMenuOpen: (v: boolean) => void; instagramUrl: string }) => (
  <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
      <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
        <span className="text-2xl font-serif text-gray-900 tracking-tighter">BÉAME</span>
      </Link>
      <div className="hidden md:flex space-x-8">
        <NavLink to="/" className={({ isActive }) => `${isActive ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition uppercase text-[10px] tracking-widest px-1`}>Accueil</NavLink>
        <NavLink to="/bio" className={({ isActive }) => `${isActive ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition uppercase text-[10px] tracking-widest px-1`}>L'Artiste</NavLink>
        <NavLink to="/galerie" className={({ isActive }) => `${isActive ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition uppercase text-[10px] tracking-widest px-1`}>Galerie</NavLink>
        <NavLink to="/expositions" className={({ isActive }) => `${isActive ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition uppercase text-[10px] tracking-widest px-1`}>Expositions</NavLink>
        <NavLink to="/contact" className={({ isActive }) => `${isActive ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-500"} hover:text-amber-600 transition uppercase text-[10px] tracking-widest px-1`}>Contact</NavLink>
      </div>
      <div className="flex items-center space-x-4">
        <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="BÉAME sur Instagram" className="text-gray-600 hover:text-amber-600 transition"><InstagramIcon size={20} /></a>
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
        <Link to="/expositions" onClick={() => setIsMenuOpen(false)} className="uppercase text-[10px] tracking-widest font-bold">Expositions</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="uppercase text-[10px] tracking-widest font-bold">Contact</Link>
      </div>
    )}
  </nav>
);

// --- PAGE ACCUEIL ---
const AccueilPage = () => {
  const [nextExpo, setNextExpo] = useState<Exposition | null>(null);

  useEffect(() => {
    const today = new Date();
    supabase
      .from('expositions')
      .select('*')
      .order('date_start', { ascending: true })
      .then(({ data }) => {
        const upcoming = (data || []).find(e => new Date(e.date_end || e.date_start) >= today);
        if (upcoming) setNextExpo(upcoming);
      });
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <SEO
        title="BÉAME | Artiste Peintre à Saint Remèze - Ardèche"
        description="Découvrez les œuvres de BÉAME, artiste peintre à Saint Remèze en Ardèche. Peintures à l'huile et acrylique, paysages, abstraits et marines."
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
        <h2 className="text-amber-900 uppercase tracking-[0.4em] text-sm md:text-base mb-12 font-bold">Artiste Peintre • Saint Remèze - Ardèche</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/galerie" className="px-10 py-4 bg-gray-900 text-white uppercase tracking-widest text-[10px] font-bold hover:bg-amber-800 transition">
            Découvrir la Galerie
          </Link>
          <Link to="/bio" className="px-10 py-4 border border-gray-900 text-gray-900 uppercase tracking-widest text-[10px] font-bold hover:bg-gray-900 hover:text-white transition">
            L'Artiste
          </Link>
        </div>
        {nextExpo && (
          <div className="mt-10">
            <Link
              to="/expositions"
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-amber-800/30 px-6 py-3 hover:bg-amber-800 hover:text-white hover:border-amber-800 transition group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700 group-hover:bg-white shrink-0" />
              <span className="text-[10px] uppercase tracking-widest text-amber-900 group-hover:text-white font-bold">
                Exposition à venir
              </span>
              <span className="text-[10px] text-gray-600 group-hover:text-white/80 italic font-serif normal-case tracking-normal">
                {nextExpo.title}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-white/70">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// --- PAGE BIO ---
const BioPage = () => (
  <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
    <SEO
      title="Biographie | BÉAME - Artiste Peintre en Ardèche"
      description="Découvrez le parcours de BÉAME, artiste peintre en Ardèche. De la danse à la peinture, un voyage chromatique du Vercors à la Normandie jusqu'aux lumières ardéchoises."
      image="/images/bea.webp"
      path="/bio"
    />
    <h1 className="text-5xl font-serif text-center mb-4">BÉAME</h1>
    <p className="text-center text-amber-800 uppercase tracking-[0.3em] text-xs mb-16">L'Exaltation de la Lumière et du Mouvement</p>

    <div className="grid md:grid-cols-5 gap-12 items-start mb-16">
      <div className="md:col-span-3 space-y-4 text-base text-left">
        <p className="font-serif italic text-xl text-amber-800 leading-relaxed">
          « De l'exaltation de la lumière naît la couleur des émotions et de la pensée. »
        </p>
        <p className="text-gray-700 leading-relaxed">
          Pour BÉAME, l'art n'est pas une simple discipline, c'est une célébration de la vie sous toutes ses formes. Son parcours est une danse entre la rigueur du trait, la fluidité du mouvement et l'ardeur de la couleur.
        </p>
      </div>
      <div className="md:col-span-2">
        <img src="/images/bea.webp" alt="BÉAME, artiste peintre à Saint Remèze en Ardèche" className="w-full shadow-2xl grayscale" loading="lazy" />
      </div>
    </div>

    <div className="max-w-3xl mx-auto space-y-10 text-gray-700 leading-relaxed">
      <div>
        <h2 className="text-xl font-serif text-gray-900 mb-3">Un parcours au confluent des Arts</h2>
        <p>Amoureuse des Arts depuis toujours, BÉAME commence son exploration créative par le corps. La danse classique, moderne et les expressions corporelles lui insufflent le sens du rythme et de la gestuelle, que l'on retrouve aujourd'hui dans le dynamisme de ses coups de pinceau.</p>
        <p className="mt-3">Sa maîtrise technique s'affine ensuite par une formation de dessinatrice industrielle, apportant à son œuvre une structure et une compréhension profonde de la perspective et de la forme.</p>
      </div>

      <div>
        <h2 className="text-xl font-serif text-gray-900 mb-3">Un voyage chromatique : du Vercors à la Normandie</h2>
        <p>Ses premiers pas chromatiques se font à l'aquarelle, sous l'influence des lumières froides, bleutées et violacées des paysages du Vercors. Ce contact avec la transparence et la délicatesse de l'eau forge sa sensibilité aux nuances les plus subtiles.</p>
        <p className="mt-3">Le chemin de la vie la conduit ensuite en Normandie, une étape charnière de son évolution artistique. Elle y a l'honneur et le bonheur de suivre l'enseignement de l'artiste-peintre et professeur des Beaux-Arts Christian Sauvé, à l'École des Beaux-Arts de Rouen. Sous sa direction, elle explore de nouveaux médiums et approfondit ses techniques, apprenant à dompter la matière pour mieux libérer son expression.</p>
      </div>

      <div>
        <h2 className="text-xl font-serif text-gray-900 mb-3">L'héritage des racines et l'appel du Sud</h2>
        <p>Les voyages artistiques de BÉAME sont le reflet de ses racines plurielles. Son œuvre est imprégnée des lumières océaniques et de l'impétuosité de ses jeunes années passées en Martinique et sur les rives de la Méditerranée. Cette influence solaire se traduit par une palette vive, chaleureuse et parfumée, où la couleur devient un vecteur d'énergie pure.</p>
      </div>

      <div>
        <h2 className="text-xl font-serif text-gray-900 mb-3">Aujourd'hui : l'ancrage Ardéchois</h2>
        <p>Désormais installée dans un petit village d'Ardèche, dans le sud de la France, BÉAME poursuit sa quête artistique. Dans cet environnement sauvage et lumineux, elle chemine vers une peinture où l'exaltation de la lumière donne naissance aux couleurs des émotions et de la pensée.</p>
        <p className="mt-3 font-serif italic text-amber-800">Chaque toile est une invitation à partager sa vision du monde : un univers où tout est beau dès lors qu'il est touché par la grâce de l'Art.</p>
      </div>
    </div>
  </div>
);

// --- PAGE EXPOSITIONS ---
const ExpositionsPage = () => {
  const [expositions, setExpositions] = useState<Exposition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('expositions').select('*').order('date_start', { ascending: false }).then(({ data }) => {
      setExpositions(data || []);
      setLoading(false);
    });
  }, []);

  const now = new Date();
  const upcoming = expositions.filter(e => new Date(e.date_end || e.date_start) >= now);
  const past = expositions.filter(e => new Date(e.date_end || e.date_start) < now);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  const ExpoCard = ({ expo }: { expo: Exposition }) => (
    <div className="border-t border-gray-100 py-8">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="md:w-48 shrink-0 text-amber-700 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
          {formatDate(expo.date_start)}
          {expo.date_end && <><br /><span className="font-normal">au {formatDate(expo.date_end)}</span></>}
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-xl text-gray-900">{expo.title}</h3>
          {expo.venue && <p className="text-gray-600 text-sm mt-1">{expo.venue}</p>}
          {expo.location && <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">{expo.location}</p>}
          {expo.description && <p className="text-gray-600 text-sm mt-3 leading-relaxed">{expo.description}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <SEO
        title="Expositions | BÉAME - Artiste Peintre Ardèche"
        description="Retrouvez les expositions passées et à venir de BÉAME, artiste peintre à Saint Remèze en Ardèche."
        path="/expositions"
      />
      <h1 className="text-5xl font-serif text-center mb-4">Expositions</h1>
      <p className="text-center text-amber-800 uppercase tracking-[0.3em] text-xs mb-16">Rencontres & Événements</p>

      {loading ? (
        <div className="space-y-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse border-t border-gray-100 py-8 flex gap-6">
              <div className="w-48 h-4 bg-gray-100 rounded shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-100 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : expositions.length === 0 ? (
        <div className="text-center py-24 border-t border-gray-100">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest">Aucune exposition pour le moment</p>
        </div>
      ) : (
        <div>
          {upcoming.length > 0 && (
            <section className="mb-16">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold mb-2">À venir</p>
              {upcoming.map(e => <ExpoCard key={e.id} expo={e} />)}
            </section>
          )}
          {past.length > 0 && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">Expositions passées</p>
              {past.map(e => <ExpoCard key={e.id} expo={e} />)}
            </section>
          )}
        </div>
      )}
    </div>
  );
};

// --- PAGE GALERIE ---
const GaleriePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("tous");

  useEffect(() => {
    supabase.from('artworks').select('*').order('sort_order', { ascending: true }).then(({ data }) => {
      setArtworks(data || []);
      setLoading(false);
    });
  }, []);

  const filteredArt = artworks.filter(art => selectedFilter === "tous" || art.category.includes(selectedFilter));

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
      <SEO
        title="Galerie d'Art | BÉAME - Peintures Originales à Vendre"
        description="Galerie de peintures originales de BÉAME : tableaux abstraits, paysages ardéchois et marines. Huile et acrylique sur toile de lin. Œuvres disponibles à l'achat."
        image="/images/Chaos-originel.webp"
        path="/galerie"
        jsonLd={artworks.length > 0 ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Galerie BÉAME - Peintures originales",
          "description": "Collection de peintures originales de l'artiste BÉAME",
          "itemListElement": artworks.map((art, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": art.title,
            "url": `${SITE_URL}/galerie/${art.slug}`
          }))
        } : undefined}
      />
      <h1 className="text-5xl font-serif text-center mb-12">Galerie d'Art</h1>
      <div className="flex justify-center gap-4 mb-16 text-[10px] uppercase tracking-[0.2em] flex-wrap">
        {["tous", "paysage", "abstrait", "mer & océan", "figuratif"].map(filter => (
          <button key={filter} onClick={() => setSelectedFilter(filter)} className={`pb-2 transition-all ${selectedFilter === filter ? "text-amber-700 border-b-2 border-amber-700 font-bold" : "text-gray-400 hover:text-gray-900"}`}>{filter}</button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] bg-gray-100" />
              <div className="mt-6 space-y-3 text-center">
                <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredArt.map((art) => (
            <Link to={`/galerie/${art.slug}`} key={art.id} className="group">
              <article>
                <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 shadow-md">
                  <img src={art.image} alt={`${art.title} - ${art.technique} sur ${art.support} par BÉAME`} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" loading="lazy" />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-xl font-serif italic text-gray-900">{art.title}</h2>
                  <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest font-medium">{art.dimensions} • {art.price}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// --- PAGE DÉTAILS ---
const InfoImage = () => {
  const { slug } = useParams();
  const [artwork, setArtwork] = useState<Artwork | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const trackShare = (platform: string) => {
    supabase.from('share_events').insert({ page: `/galerie/${slug}`, platform }).then(() => {});
  };

  useEffect(() => {
    supabase.from('artworks').select('*').eq('slug', slug).single().then(({ data }) => {
      setArtwork(data || null);
    });
  }, [slug]);

  if (artwork === undefined) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-amber-700 rounded-full animate-spin" />
      </div>
    );
  }

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
          "image": artwork.image.startsWith('http') ? artwork.image : `${SITE_URL}${artwork.image}`,
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
      <Link to="/galerie" className="md:absolute md:top-6 md:left-6 z-[110] flex items-center space-x-2 bg-white/80 backdrop-blur px-4 py-3 md:rounded-full md:shadow-lg border-b border-gray-100 md:border-none">
        <ArrowLeft size={18} />
        <span className="font-bold uppercase tracking-widest text-[10px]">Retour Galerie</span>
      </Link>
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-50 flex items-center justify-center p-4">
        <img src={artwork.image} alt={`${artwork.title} - ${artwork.technique} sur ${artwork.support}, ${artwork.dimensions} - BÉAME`} className="max-w-full max-h-full object-contain shadow-2xl" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8 text-left">
          <div><span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">{artwork.category.join(' · ')}</span>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2 italic">{artwork.title}</h1></div>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line border-t pt-6">{artwork.description}</p>
          {artwork.cartel && (
            <p className="text-gray-500 text-xs leading-relaxed whitespace-pre-line italic border-t pt-4">{artwork.cartel}</p>
          )}
          <div className="space-y-3 text-gray-600 border-t pt-6 text-[11px] uppercase tracking-wide">
            <p className="flex justify-between"><strong>Dimensions</strong> <span>{artwork.dimensions}</span></p>
            <p className="flex justify-between"><strong>Technique</strong> <span>{artwork.technique}</span></p>
            <p className="text-3xl font-light text-amber-800 pt-4">{artwork.price}</p>
          </div>
          <Link
            to={`/contact?sujet=${encodeURIComponent("Acquisition : " + artwork.title)}&message=${encodeURIComponent(
              `Bonjour,\n\nJe suis intéressé(e) par l'acquisition de l'œuvre suivante :\n\n• Titre : ${artwork.title}\n• Technique : ${artwork.technique} sur ${artwork.support}\n• Dimensions : ${artwork.dimensions}\n• Prix : ${artwork.price}\n\nPourriez-vous me donner plus d'informations sur les modalités d'acquisition ?\n\nCordialement,`
            )}`}
            className="block text-center w-full bg-gray-900 text-white py-5 font-bold uppercase tracking-widest text-xs"
          >
            Demander une acquisition
          </Link>
          <div className="pt-2 border-t border-gray-100">
            <span className="text-[9px] uppercase tracking-widest text-gray-400 block mb-3">Partager</span>
            <div className="grid grid-cols-4 gap-2">
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`${SITE_URL}/galerie/${artwork.slug}`)}&media=${encodeURIComponent(artwork.image)}&description=${encodeURIComponent(`${artwork.title} — ${artwork.technique} — BÉAME artiste peintre`)}`}
                target="_blank" rel="noreferrer" aria-label="Partager sur Pinterest"
                onClick={() => trackShare('pinterest')}
                className="flex flex-col items-center gap-1.5 py-3 bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-500 transition rounded-sm">
                <PinterestIcon size={20} />
                <span className="text-[8px] uppercase tracking-widest">Pinterest</span>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/galerie/${artwork.slug}`)}`}
                target="_blank" rel="noreferrer" aria-label="Partager sur Facebook"
                onClick={() => trackShare('facebook')}
                className="flex flex-col items-center gap-1.5 py-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 transition rounded-sm">
                <FacebookIcon size={20} />
                <span className="text-[8px] uppercase tracking-widest">Facebook</span>
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${artwork.title} par BÉAME — ${SITE_URL}/galerie/${artwork.slug}`)}`}
                target="_blank" rel="noreferrer" aria-label="Partager sur WhatsApp"
                onClick={() => trackShare('whatsapp')}
                className="flex flex-col items-center gap-1.5 py-3 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-500 transition rounded-sm">
                <WhatsAppIcon size={20} />
                <span className="text-[8px] uppercase tracking-widest">WhatsApp</span>
              </a>
              <button
                onClick={() => { trackShare('copy'); navigator.clipboard.writeText(`${SITE_URL}/galerie/${artwork.slug}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                aria-label="Copier le lien"
                className={`flex flex-col items-center gap-1.5 py-3 rounded-sm transition ${copied ? 'bg-amber-50 text-amber-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-500'}`}>
                <Link2 size={20} />
                <span className="text-[8px] uppercase tracking-widest">{copied ? 'Copié !' : 'Lien'}</span>
              </button>
            </div>
          </div>
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
  const messagePredefini = query.get('message');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.REACT_APP_WEB3FORMS_KEY || "",
          subject: formData.get("subject") || "Message depuis beame.art",
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          from_name: "Site BÉAME",
        }),
      });
      const data = await res.json();
      if (data.success) { setStatus("SUCCESS"); } else { setStatus("ERROR"); }
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
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            <input name="subject" defaultValue={sujetPredefini || ""} placeholder="SUJET" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[10px] tracking-widest font-bold" />
            <div className="grid md:grid-cols-2 gap-8">
              <input name="name" required placeholder="NOM" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[10px] tracking-widest" />
              <input name="email" required type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[10px] tracking-widest" />
            </div>
            <textarea name="message" required rows={5} defaultValue={messagePredefini || ""} placeholder="VOTRE MESSAGE" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-700 resize-none text-[10px] tracking-widest" />
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
  const [instagramUrl, setInstagramUrl] = useState(INSTAGRAM_DEFAULT);

  useEffect(() => {
    supabase.from('settings').select('value').eq('key', 'instagram_url').single().then(({ data }) => {
      if (data?.value) setInstagramUrl(data.value);
    });
  }, []);

  return (
    <Router>
      <Analytics />
      <SpeedInsights />
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={
          <div className="flex flex-col min-h-screen bg-white">
            <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} instagramUrl={instagramUrl} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<AccueilPage />} />
                <Route path="/galerie" element={<GaleriePage />} />
                <Route path="/galerie/:slug" element={<InfoImage />} />
                <Route path="/bio" element={<BioPage />} />
                <Route path="/expositions" element={<ExpositionsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <footer className="bg-gray-900 text-white py-12 text-center">
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">© 2025 BÉAME - Artiste Peintre Saint Remèze - Ardèche</p>
              <p className="text-gray-500 text-[9px] tracking-widest mt-2">v{APP_VERSION}</p>
            </footer>
          </div>
        } />
      </Routes>
    </Router>
  );
}

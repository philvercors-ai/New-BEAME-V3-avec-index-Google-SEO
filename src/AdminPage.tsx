import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import type { Artwork } from './supabaseClient';
import { LogOut, Plus, Edit2, Trash2, Upload, X } from 'lucide-react';

const CATEGORIES = ['abstrait', 'mer & océan', 'paysage', 'figuratif'];

const toSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const EMPTY_FORM = {
  title: '', slug: '', category: 'abstrait', image: '',
  technique: '', support: '', description: '', cartel: '',
  price: '', dimensions: '', sort_order: 0,
};

// ─── Login ────────────────────────────────────────────────────────────────────

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError('Email ou mot de passe incorrect.'); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-12 shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-serif text-center mb-2">BÉAME</h1>
        <p className="text-center text-gray-400 text-[10px] uppercase tracking-widest mb-10">Administration</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="EMAIL" autoComplete="email"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[11px] tracking-widest bg-transparent"
          />
          <input
            type="password" required value={password} onChange={e => setPassword(e.target.value)}
            placeholder="MOT DE PASSE" autoComplete="current-password"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[11px] tracking-widest bg-transparent"
          />
          {error && <p className="text-red-500 text-[10px] uppercase tracking-widest">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="w-full bg-gray-900 text-white py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-amber-800 transition"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Upload image ─────────────────────────────────────────────────────────────

const ImageUpload = ({ current, onUpload }: { current: string; onUpload: (url: string) => void }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(current);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('artwork-images').upload(path, file);
    if (error) { alert('Erreur upload : ' + error.message); setUploading(false); return; }
    const { data } = supabase.storage.from('artwork-images').getPublicUrl(path);
    setPreview(data.publicUrl);
    onUpload(data.publicUrl);
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">Image</label>
      {preview && (
        <img src={preview} alt="Aperçu" className="w-full h-48 object-cover shadow" />
      )}
      <label className="flex items-center gap-3 cursor-pointer border border-dashed border-gray-300 p-4 hover:border-amber-700 transition">
        <Upload size={16} className="text-gray-400" />
        <span className="text-[10px] uppercase tracking-widest text-gray-500">
          {uploading ? 'Envoi en cours...' : preview ? 'Changer l\'image' : 'Choisir une image'}
        </span>
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
      </label>
    </div>
  );
};

// ─── Formulaire œuvre ─────────────────────────────────────────────────────────

type FormData = Omit<Artwork, 'id'>;

const Field = ({ label, value, onChange, multiline = false, placeholder = '', type = 'text' }: {
  label: string; value: string | number; onChange: (val: string | number) => void;
  multiline?: boolean; placeholder?: string; type?: string;
}) => (
  <div className="space-y-1">
    <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</label>
    {multiline ? (
      <textarea
        rows={3} value={value as string} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full border-b border-gray-300 py-2 outline-none focus:border-amber-700 resize-none text-sm bg-transparent"
      />
    ) : (
      <input
        type={type} value={type === 'number' ? (value as number) : (value as string) || ''}
        placeholder={placeholder}
        onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        className="w-full border-b border-gray-300 py-2 outline-none focus:border-amber-700 text-sm bg-transparent"
      />
    )}
  </div>
);

const ArtworkForm = ({
  initial, onSave, onCancel,
}: {
  initial?: Partial<Artwork>;
  onSave: (data: FormData) => Promise<void>;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState<FormData>({ ...EMPTY_FORM, ...initial } as FormData);
  const [saving, setSaving] = useState(false);

  const set = (field: keyof FormData, val: string | number) =>
    setForm(f => ({ ...f, [field]: val }));

  const handleTitleChange = (val: string) =>
    setForm(f => ({
      ...f, title: val,
      slug: (f.slug === toSlug(f.title) || !f.slug) ? toSlug(val) : f.slug,
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) { alert('Veuillez ajouter une image.'); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 overflow-y-auto flex items-start justify-center p-4 pt-10">
      <div className="bg-white w-full max-w-2xl p-8 shadow-2xl mb-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif">{initial?.id ? 'Modifier l\'œuvre' : 'Nouvelle œuvre'}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-900 transition"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload current={form.image} onUpload={url => set('image', url)} />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">Titre *</label>
              <input
                required value={form.title} onChange={e => handleTitleChange(e.target.value)}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-amber-700 text-sm bg-transparent"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">Slug (URL)</label>
              <input
                value={form.slug} onChange={e => set('slug', e.target.value)}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-amber-700 text-xs font-mono bg-transparent text-gray-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">Catégorie</label>
            <select
              value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-amber-700 text-sm bg-transparent"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Field label="Technique" value={form.technique} onChange={v => set('technique', v)} placeholder="ex : Huile" />
            <Field label="Support" value={form.support} onChange={v => set('support', v)} placeholder="ex : Toile de lin" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Field label="Dimensions" value={form.dimensions} onChange={v => set('dimensions', v)} placeholder="ex : 50x61cm" />
            <Field label="Prix" value={form.price} onChange={v => set('price', v)} placeholder="ex : 500€" />
          </div>

          <Field label="Description" value={form.description} onChange={v => set('description', v)} multiline />
          <Field label="Cartel" value={form.cartel} onChange={v => set('cartel', v)} multiline placeholder="Texte du cartel (optionnel)" />
          <Field label="Ordre d'affichage" value={form.sort_order} onChange={v => set('sort_order', v)} type="number" />

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit" disabled={saving}
              className="flex-1 bg-gray-900 text-white py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-amber-800 transition"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button" onClick={onCancel}
              className="px-8 border border-gray-300 text-gray-700 uppercase tracking-widest text-[10px] font-bold hover:bg-gray-50 transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Gestionnaire d'œuvres ────────────────────────────────────────────────────

const ArtworkManager = ({ onLogout }: { onLogout: () => void }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState<Artwork | 'new' | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('artworks').select('*').order('sort_order', { ascending: true });
    setArtworks(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (form: FormData) => {
    if (editTarget && editTarget !== 'new') {
      await supabase.from('artworks').update(form).eq('id', (editTarget as Artwork).id);
    } else {
      await supabase.from('artworks').insert([form]);
    }
    setEditTarget(null);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Supprimer définitivement cette œuvre ?')) return;
    setDeleting(id);
    await supabase.from('artworks').delete().eq('id', id);
    setDeleting(null);
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-xl font-serif text-gray-900">BÉAME</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-400 text-[10px] uppercase tracking-widest">Administration</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/" target="_blank" rel="noreferrer"
              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-amber-700 transition"
            >
              Voir le site ↗
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-red-600 transition"
            >
              <LogOut size={14} /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif">Œuvres</h1>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
              {artworks.length} œuvre{artworks.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setEditTarget('new')}
            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 uppercase tracking-widest text-[10px] font-bold hover:bg-amber-800 transition"
          >
            <Plus size={16} /> Nouvelle œuvre
          </button>
        </div>

        {loading ? (
          <div className="text-center py-32 text-gray-300 text-[10px] uppercase tracking-widest">Chargement...</div>
        ) : artworks.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-4">Aucune œuvre</p>
            <button onClick={() => setEditTarget('new')} className="text-amber-700 text-[10px] uppercase tracking-widest font-bold hover:underline">
              Ajouter la première œuvre
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map(art => (
              <div key={art.id} className="bg-white shadow-sm overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                    <button
                      onClick={() => setEditTarget(art)}
                      className="bg-white text-gray-900 p-2.5 rounded hover:bg-amber-50 transition"
                      title="Modifier"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
                      disabled={deleting === art.id}
                      className="bg-white text-red-500 p-2.5 rounded hover:bg-red-50 transition"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif italic text-lg text-gray-900">{art.title}</h3>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
                    {art.category} · {art.dimensions} · {art.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal formulaire */}
      {editTarget && (
        <ArtworkForm
          initial={editTarget === 'new' ? undefined : editTarget as Artwork}
          onSave={handleSave}
          onCancel={() => setEditTarget(null)}
        />
      )}
    </div>
  );
};

// ─── Réinitialisation mot de passe ────────────────────────────────────────────

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setError('Erreur : ' + error.message); setLoading(false); return; }
    setSuccess(true);
    setLoading(false);
    setTimeout(() => supabase.auth.signOut(), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-12 shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-serif text-center mb-2">BÉAME</h1>
        <p className="text-center text-gray-400 text-[10px] uppercase tracking-widest mb-10">Nouveau mot de passe</p>
        {success ? (
          <p className="text-center text-green-600 text-[11px] uppercase tracking-widest">
            Mot de passe mis à jour. Redirection...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="NOUVEAU MOT DE PASSE"
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[11px] tracking-widest bg-transparent"
            />
            <input
              type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
              placeholder="CONFIRMER LE MOT DE PASSE"
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-amber-700 text-[11px] tracking-widest bg-transparent"
            />
            {error && <p className="text-red-500 text-[10px] uppercase tracking-widest">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full bg-gray-900 text-white py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-amber-800 transition"
            >
              {loading ? 'Enregistrement...' : 'Définir le mot de passe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ─── Page Admin (point d'entrée) ──────────────────────────────────────────────

const AdminPage = () => {
  const [session, setSession] = useState<any>(undefined);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setIsRecovery(true);
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-300 text-[10px] uppercase tracking-widest">Chargement...</p>
      </div>
    );
  }

  if (session && isRecovery) return <ResetPasswordForm />;
  if (!session) return <LoginForm />;

  return <ArtworkManager onLogout={() => supabase.auth.signOut()} />;
};

export default AdminPage;

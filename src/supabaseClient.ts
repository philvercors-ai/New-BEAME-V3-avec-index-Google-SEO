import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_SUPABASE_ANON_KEY || ''
);

export type Setting = {
  key: string;
  value: string;
};

export type Artwork = {
  id: number;
  slug: string;
  title: string;
  category: string[];
  image: string;
  technique: string;
  support: string;
  description: string;
  cartel: string;
  price: string;
  dimensions: string;
  sort_order: number;
};

export type PageView = {
  page: string;
  viewed_at: string;
};

export type Exposition = {
  id: number;
  title: string;
  venue: string;
  location: string;
  date_start: string;
  date_end: string | null;
  description: string;
};

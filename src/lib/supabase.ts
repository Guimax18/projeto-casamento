import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Cliente Supabase para uso exclusivo no Navegador (Client Components)
 * Seguro para ser importado no lado do cliente.
 */
export const supabaseBrowser = createBrowserClient(supabaseUrl, supabaseAnonKey);

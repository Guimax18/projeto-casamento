import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Cliente Supabase para uso no Navegador (Client Components)
 */
export const supabaseBrowser = createBrowserClient(supabaseUrl, supabaseAnonKey);

/**
 * Cria um cliente Supabase para uso no Servidor (Server Components, Route Handlers, Server Actions)
 * Utiliza o gerenciamento de cookies recomendado pelo Next.js 15+ (onde cookies() retorna uma Promise).
 */
export function getSupabaseServer() {
  const cookieStore = cookies();
  
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        async getAll() {
          const store = await cookieStore;
          return store.getAll();
        },
        async setAll(cookiesToSet) {
          try {
            const store = await cookieStore;
            cookiesToSet.forEach(({ name, value, options }) =>
              store.set(name, value, options)
            )
          } catch {
            // Ação disparada em um Server Component não permite gravação de cookies
            // Isso pode ser ignorado se houver um Middleware para gerenciar sessões
          }
        },
      },
    }
  );
}

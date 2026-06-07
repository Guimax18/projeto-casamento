'use server';

import { getSupabaseServer } from '@/lib/supabaseServer';
import { CONFIG } from '@/lib/config';

// Interface do Convidado
export interface Guest {
  id: string;
  name: string;
  confirmed: boolean | null;
  created_at: string;
}

/**
 * Busca convidados no Supabase pelo nome (usado no RSVP com debounce)
 * Retorna no máximo 5 resultados por motivos de privacidade e UI.
 */
export async function getGuests(searchTerm: string): Promise<{ success: boolean; data?: Guest[]; error?: string }> {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return { success: true, data: [] };
    }

    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('convidados')
      .select('*')
      .ilike('name', `%${searchTerm.trim()}%`)
      .order('name', { ascending: true })
      .limit(5);

    if (error) throw error;
    
    return { success: true, data: data as Guest[] };
  } catch (error: any) {
    console.error('Erro ao buscar convidados:', error);
    return { success: false, error: error.message || 'Falha ao buscar convidados.' };
  }
}

/**
 * Atualiza o status RSVP de um convidado
 * @param status true = confirmado, false = recusado, null = pendente
 */
export async function updateRsvp(guestId: string, status: boolean | null): Promise<{ success: boolean; error?: string }> {
  try {
    if (!guestId) {
      return { success: false, error: 'ID do convidado inválido.' };
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('convidados')
      .update({ confirmed: status })
      .eq('id', guestId);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error('Erro ao atualizar RSVP:', error);
    return { success: false, error: error.message || 'Falha ao atualizar confirmação.' };
  }
}

/**
 * ADMIN: Retorna estatísticas de presença gerais
 */
export async function getAdminStats(): Promise<{
  total: number;
  confirmed: number;
  declined: number;
  pending: number;
}> {
  try {
    const supabase = getSupabaseServer();
    
    // Como é um app pequeno, buscar a lista completa para processar estatísticas é seguro e evita múltiplas queries
    const { data, error } = await supabase
      .from('convidados')
      .select('confirmed');

    if (error) throw error;

    const stats = {
      total: data.length,
      confirmed: data.filter(g => g.confirmed === true).length,
      declined: data.filter(g => g.confirmed === false).length,
      pending: data.filter(g => g.confirmed === null).length
    };

    return stats;
  } catch (error) {
    console.error('Erro ao buscar estatísticas do admin:', error);
    return { total: 0, confirmed: 0, declined: 0, pending: 0 };
  }
}

/**
 * ADMIN: Busca a lista completa de convidados com filtros de presença
 */
export async function getAdminGuests(filterStatus?: string): Promise<Guest[]> {
  try {
    const supabase = getSupabaseServer();
    let query = supabase.from('convidados').select('*').order('name', { ascending: true });

    if (filterStatus === 'confirmado') {
      query = query.eq('confirmed', true);
    } else if (filterStatus === 'recusado') {
      query = query.eq('confirmed', false);
    } else if (filterStatus === 'pendente') {
      query = query.is('confirmed', null);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data as Guest[];
  } catch (error) {
    console.error('Erro ao obter convidados (admin):', error);
    return [];
  }
}

/**
 * ADMIN: Adiciona um novo convidado
 */
export async function addGuest(name: string): Promise<{ success: boolean; guest?: Guest; error?: string }> {
  try {
    if (!name || !name.trim()) {
      return { success: false, error: 'O nome não pode ser vazio.' };
    }

    const supabase = getSupabaseServer();
    
    // Opcional: verificar se o nome já está na lista
    const { data: existing } = await supabase
      .from('convidados')
      .select('id')
      .ilike('name', name.trim())
      .limit(1);

    if (existing && existing.length > 0) {
      return { success: false, error: 'Este convidado já está na lista!' };
    }

    const { data, error } = await supabase
      .from('convidados')
      .insert([{ name: name.trim() }])
      .select()
      .single();

    if (error) throw error;

    return { success: true, guest: data as Guest };
  } catch (error: any) {
    console.error('Erro ao adicionar convidado:', error);
    return { success: false, error: error.message || 'Falha ao adicionar convidado.' };
  }
}

/**
 * ADMIN: Exclui um convidado
 */
export async function deleteGuest(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!id) return { success: false, error: 'ID inválido.' };

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('convidados')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error('Erro ao excluir convidado:', error);
    return { success: false, error: error.message || 'Falha ao excluir convidado.' };
  }
}

/**
 * ADMIN: Valida a senha digitada no painel administrativo do lado do servidor
 */
export async function verifyAdminPassword(password: string): Promise<{ success: boolean }> {
  const envPassword = process.env.ADMIN_PASSWORD || CONFIG.ADMIN_PASSWORD;
  
  if (password === envPassword) {
    return { success: true };
  }
  return { success: false };
}

/**
 * ADMIN: Popula a lista inicial de convidados (seed) se ela estiver vazia
 */
export async function seedGuests(): Promise<{ success: boolean; count?: number; error?: string }> {
  try {
    const supabase = getSupabaseServer();
    
    // Verificar se já existem convidados cadastrados
    const { count, error: countError } = await supabase
      .from('convidados')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    if (count && count > 0) {
      return { success: false, error: `A lista já possui ${count} convidados. Não é necessário popular novamente.` };
    }

    const initialGuests = [
      'Patricia', 'Tarciano', 'Sophia', 'Thiago', 'Helena', 'Vo Manuel', 'Vo Sebastião',
      'Anderson', 'Val', 'Cristiano', 'Iris', 'Tio Agnel', 'Tia Nilza', 'Tia Cleuza',
      'Taina', 'Tia Jo', 'Tio zé', 'Primo Fábio', 'Neide', 'Amanda', 'Prima Fabi',
      'Esposo da Tia Fabi', 'Senhor Luis', 'Larissa', 'Tauany', 'Cadu', 'Hélder primo',
      'Renata', 'Maria Alice', 'Maria Cecilia', 'Rose tia', 'Tia Lindaura', 'Tia Fatinha',
      'Edna', 'Yasmin', 'Manu', 'Mário', 'Valdinete', 'Mara', 'Ingrid', 'Julia',
      'Ashiley', 'Andreia', 'Henrique', 'Andreza', 'Daniel', 'Miguel', 'Gabriel',
      'Joyce', 'Ana', 'Rebeca', 'Marise', 'Samuel', 'Livia', 'Jared', 'Natalia',
      'Matteo', 'Diogo', 'Leticia', 'Matheus', 'Luighi', 'Nice', 'Waldirene',
      'Viviane', 'Lucas', 'Bruno', 'Esposo da Val', 'Simone', 'Wagner', 'Vanderlei',
      'Vilma', 'David', 'Benjamin', 'Heitor', 'Rubinho', 'Guilherme', 'Isabela',
      'Claudia', 'Adilson', 'Irmã Olívia', 'Irmão Francisco', 'Irmã Neusa', 'Irmão Edivaldo',
      'Irmã Cristina', 'Cintia', 'Marta', 'Denis', 'Ana Paula', 'Ana Alice', 'Ana Luiza',
      'Tio Dan'
    ];

    // Mapeia para objetos para inserção no banco
    const insertData = initialGuests.map(name => ({ name }));

    const { data, error } = await supabase
      .from('convidados')
      .insert(insertData)
      .select();

    if (error) throw error;

    return { success: true, count: data?.length || 0 };
  } catch (error: any) {
    console.error('Erro ao popular lista de convidados:', error);
    return { success: false, error: error.message || 'Falha ao preencher banco de dados.' };
  }
}

// Interface da Mensagem
export interface Message {
  id: string;
  created_at: string;
  nome: string;
  mensagem: string;
  exibir_publico: boolean;
}

/**
 * Busca todas as mensagens públicas da tabela mensagens (exibir_publico = true)
 */
export async function getPublicMessages(): Promise<{ success: boolean; data?: Message[]; error?: string }> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('mensagens')
      .select('*')
      .eq('exibir_publico', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data as Message[] };
  } catch (error: any) {
    console.error('Erro ao buscar mensagens públicas:', error);
    return { success: false, error: error.message || 'Falha ao carregar mensagens.' };
  }
}

/**
 * Adiciona um recado na tabela mensagens
 */
export async function addMessage(nome: string, mensagem: string, exibirPublico: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    if (!nome || !nome.trim()) {
      return { success: false, error: 'O nome é obrigatório.' };
    }
    if (!mensagem || !mensagem.trim()) {
      return { success: false, error: 'A mensagem é obrigatória.' };
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('mensagens')
      .insert([{ 
        nome: nome.trim(), 
        mensagem: mensagem.trim(), 
        exibir_publico: exibirPublico 
      }]);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao adicionar mensagem:', error);
    return { success: false, error: error.message || 'Falha ao enviar mensagem.' };
  }
}

/**
 * ADMIN: Busca todas as mensagens sem filtros de privacidade
 */
export async function getAdminMessages(): Promise<Message[]> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('mensagens')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Message[];
  } catch (error) {
    console.error('Erro ao buscar mensagens (admin):', error);
    return [];
  }
}

/**
 * ADMIN: Exclui uma mensagem por ID
 */
export async function deleteMessage(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!id) return { success: false, error: 'ID inválido.' };

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('mensagens')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao excluir mensagem:', error);
    return { success: false, error: error.message || 'Falha ao excluir mensagem.' };
  }
}


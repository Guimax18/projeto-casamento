-- ====================================================================
-- SCRIPT DE CRIAÇÃO DA TABELA DE MENSAGENS E POLÍTICAS DE RLS
-- ====================================================================
-- Você pode copiar e rodar este comando inteiro no editor SQL do Supabase.
-- Caminho: Supabase Dashboard -> SQL Editor -> New Query -> colar e rodar.

-- 1. Criação da tabela mensagens
CREATE TABLE IF NOT EXISTS public.mensagens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nome TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    exibir_publico BOOLEAN NOT NULL DEFAULT true
);

-- 2. Habilitação de RLS (Row Level Security)
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Acesso
-- Política 3.1: Permitir inserção pública (qualquer convidado pode enviar mensagem)
CREATE POLICY "Permitir inserção pública de mensagens"
ON public.mensagens
FOR INSERT
WITH CHECK (true);

-- Política 3.2: Permitir leitura pública APENAS de mensagens com exibir_publico = true
CREATE POLICY "Permitir leitura pública de mensagens autorizadas"
ON public.mensagens
FOR SELECT
USING (exibir_publico = true);

-- Política 3.3: Permitir leitura total de todas as mensagens apenas para usuários autenticados (os noivos no admin)
CREATE POLICY "Permitir leitura completa de mensagens para admin"
ON public.mensagens
FOR SELECT
TO authenticated
USING (true);

-- Política 3.4: Permitir exclusão de mensagens apenas para noivos autenticados
CREATE POLICY "Permitir exclusão de mensagens para admin"
ON public.mensagens
FOR DELETE
TO authenticated
USING (true);

'use client';

import React, { useState, useEffect } from 'react';
import { addMessage, getPublicMessages, Message } from '@/app/actions';
import { MessageSquare, Send, Heart, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Função para formatar a data de forma carinhosa
const formatarData = (dateStr?: string) => {
  if (!dateStr) return '';
  try {
    const data = new Date(dateStr);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    return '';
  }
};

// Estilos dos post-its para o Moodboard
const postItStyles = [
  {
    bg: 'bg-rose-50/95 border-rose-100 text-rose-950 shadow-[4px_4px_15px_rgba(244,63,94,0.08)]',
    tapeColor: 'bg-rose-200/50',
    heartColor: 'text-rose-400 fill-rose-300',
    rotation: 'rotate-[-1.5deg]',
    animation: 'post-it-float-0',
    sticker: 'heart'
  },
  {
    bg: 'bg-purple-50/95 border-purple-100 text-purple-950 shadow-[4px_4px_15px_rgba(168,85,247,0.08)]',
    tapeColor: 'bg-purple-200/50',
    heartColor: 'text-purple-400 fill-purple-300',
    rotation: 'rotate-[1.2deg]',
    animation: 'post-it-float-1',
    sticker: 'tape'
  },
  {
    bg: 'bg-amber-50/95 border-amber-100 text-amber-950 shadow-[4px_4px_15px_rgba(245,158,11,0.08)]',
    tapeColor: 'bg-amber-200/50',
    heartColor: 'text-amber-400 fill-amber-300',
    rotation: 'rotate-[-0.8deg]',
    animation: 'post-it-float-2',
    sticker: 'tape'
  },
  {
    bg: 'bg-emerald-50/95 border-emerald-100 text-emerald-950 shadow-[4px_4px_15px_rgba(16,185,129,0.08)]',
    tapeColor: 'bg-emerald-200/50',
    heartColor: 'text-emerald-400 fill-emerald-300',
    rotation: 'rotate-[1.5deg]',
    animation: 'post-it-float-3',
    sticker: 'heart'
  },
  {
    bg: 'bg-blue-50/95 border-blue-100 text-blue-950 shadow-[4px_4px_15px_rgba(59,130,246,0.08)]',
    tapeColor: 'bg-blue-200/50',
    heartColor: 'text-blue-400 fill-blue-300',
    rotation: 'rotate-[-1.2deg]',
    animation: 'post-it-float-0',
    sticker: 'tape'
  }
];

export default function MuralMensagens() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(false);

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [exibirPublico, setExibirPublico] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Carrega as mensagens públicas do banco
  const fetchMessages = async () => {
    setLoadingFeed(true);
    try {
      const response = await getPublicMessages();
      if (response.success && response.data) {
        setMessages(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFeed(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Envio do Formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !mensagem.trim()) {
      toast.error('Por favor, preencha o nome e a mensagem.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await addMessage(nome, mensagem, exibirPublico);
      if (response.success) {
        toast.success(
          exibirPublico 
            ? 'Mensagem enviada com sucesso ao mural! 💜' 
            : 'Sua mensagem privada foi enviada diretamente aos noivos! 🔒'
        );
        setNome('');
        setMensagem('');
        
        // Se a mensagem foi pública, recarrega o feed
        if (exibirPublico) {
          fetchMessages();
        }
      } else {
        toast.error(response.error || 'Erro ao enviar recado.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Falha de conexão ao enviar recado.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-off-white/40 border-b border-border-lilac/30 relative overflow-hidden">
      {/* Estilos CSS Inline para Efeito Moodboard */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(-1.5deg); }
          50% { transform: translateY(-6px) rotate(-0.5deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(1.2deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(-0.8deg); }
          50% { transform: translateY(-7px) rotate(-1.8deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(1.5deg); }
          50% { transform: translateY(-4px) rotate(0.8deg); }
        }
        .post-it-float-0 { animation: float-0 6s ease-in-out infinite; }
        .post-it-float-1 { animation: float-1 7s ease-in-out infinite; }
        .post-it-float-2 { animation: float-2 5.5s ease-in-out infinite; }
        .post-it-float-3 { animation: float-3 6.5s ease-in-out infinite; }
        
        .moodboard-bg {
          background-color: #FAF7FC;
          background-image: radial-gradient(#E9D5EC 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }
      `}} />

      {/* Corações Decorativos no Fundo */}
      <div className="absolute top-10 left-10 text-secondary/15 animate-bounce duration-1000 hidden md:block">
        <Heart className="h-16 w-16 fill-secondary/10" />
      </div>
      <div className="absolute bottom-10 right-10 text-secondary/15 animate-pulse hidden md:block">
        <Heart className="h-20 w-20 fill-secondary/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-light-lilac text-primary text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="h-3 w-3 text-secondary" />
            <span>Palavras de Carinho</span>
          </div>
          <h2 className="font-title text-3xl sm:text-5xl font-bold text-primary flex items-center justify-center gap-2.5">
            Mural de Recados
            <Heart className="h-7 w-7 text-secondary fill-secondary animate-pulse" />
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-4 mb-6 rounded-full" />
          <p className="font-body text-sm sm:text-base text-text-dark/75">
            Deixe uma mensagem especial para nós! Seu recado vai decorar nosso mural com muito carinho e ficará guardado em nossos corações para sempre.
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lado Esquerdo: Formulário (Carta de Amor) */}
          <div className="lg:col-span-4 bg-white border border-border-lilac rounded-3xl p-6 sm:p-7 shadow-sm relative overflow-hidden group">
            {/* Decoração da Carta de Amor */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300" />
            
            <div className="relative z-10">
              <h3 className="font-title text-xl font-bold text-primary mb-5 flex items-center space-x-2 border-b border-border-lilac/30 pb-3">
                <MessageSquare className="h-5 w-5 text-secondary" />
                <span>Deixe seu Recado</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="mural-nome" className="block text-xs font-semibold text-text-dark/75 mb-1.5 flex items-center justify-between">
                    <span>Seu Nome</span>
                    <Heart className="h-3 w-3 text-secondary fill-secondary" />
                  </label>
                  <input
                    id="mural-nome"
                    type="text"
                    required
                    placeholder="Ex: Tio João e Família..."
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-lilac bg-white text-text-dark font-body text-sm placeholder:text-text-dark/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="mural-msg" className="block text-xs font-semibold text-text-dark/75 mb-1.5 flex items-center justify-between">
                    <span>Sua Mensagem</span>
                    <Heart className="h-3 w-3 text-secondary fill-secondary" />
                  </label>
                  <textarea
                    id="mural-msg"
                    required
                    rows={5}
                    placeholder="Escreva aqui seus votos de felicidade, carinho e conselhos para nossa nova jornada juntos..."
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-lilac bg-white text-text-dark font-body text-sm placeholder:text-text-dark/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all duration-300 resize-none leading-relaxed"
                  />
                </div>

                {/* Checkbox de Privacidade */}
                <div className="flex items-start space-x-3 bg-light-lilac/30 p-3 rounded-xl border border-border-lilac/30 hover:bg-light-lilac/50 transition-colors duration-200">
                  <input
                    id="mural-public"
                    type="checkbox"
                    checked={exibirPublico}
                    onChange={(e) => setExibirPublico(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border-lilac text-primary focus:ring-secondary focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="mural-public" className="text-xs text-text-dark/75 font-body leading-relaxed select-none cursor-pointer">
                    Desejo exibir minha mensagem publicamente no mural do site.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-body font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50 group-hover:shadow-md"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>Enviar com Amor 💜</span>
                </button>
              </form>
            </div>
          </div>

          {/* Lado Direito: Mural Público (Painel Moodboard) */}
          <div className="lg:col-span-8 bg-white border border-border-lilac/80 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col relative overflow-hidden">
            {/* Decoração Superior do Moodboard */}
            <div className="absolute top-2 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-purple-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-300" />
              </div>
              <div className="text-[10px] font-body font-bold text-primary/30 tracking-widest uppercase flex items-center gap-1">
                <span>Painel de Recados</span>
                <Heart className="h-2 w-2 text-pink-400 fill-pink-400 animate-pulse" />
              </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col pt-2">
              {/* Quadro Moodboard Decorado com Rolagem Interna */}
              <div className="flex-1 moodboard-bg border border-border-lilac/40 rounded-2xl p-5 sm:p-7 min-h-[580px] max-h-[680px] overflow-y-auto scrollbar-thin scrollbar-thumb-border-lilac scrollbar-track-transparent relative shadow-inner">
                
                {loadingFeed && messages.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-text-dark/40">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <span className="text-xs font-body font-medium">Lendo recadinhos...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div className="relative mb-3 flex items-center justify-center">
                      <Heart className="h-12 w-12 text-border-lilac/80 fill-border-lilac/10" />
                      <Sparkles className="h-6 w-6 text-secondary absolute animate-pulse" />
                    </div>
                    <span className="font-title text-base font-bold text-text-dark/65">Nenhum recado no mural ainda</span>
                    <span className="font-body text-xs text-text-dark/45 mt-1 max-w-xs">Seja o primeiro a deixar uma mensagem cheia de carinho para nós!</span>
                  </div>
                ) : (
                  /* Grid de Bilhetes Post-it */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4 pt-2">
                    {messages.map((msg, index) => {
                      // Define o estilo alternado de cores e rotações
                      const style = postItStyles[index % postItStyles.length];
                      return (
                        <div
                          key={msg.id}
                          className={`relative border p-6 rounded-2xl transition-all duration-300 hover:z-20 group cursor-default ${style.bg} ${style.rotation} ${style.animation}`}
                        >
                          {/* Adesivo: Washi Tape ou Coração Colado */}
                          {style.sticker === 'tape' ? (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/60 border border-white/20 backdrop-blur-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.03)] rotate-[-1.5deg] z-10 flex items-center justify-center">
                              <div className="w-full h-[1px] bg-pink-200/30" />
                            </div>
                          ) : (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center filter drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.08)]">
                              <Heart className="h-5.5 w-5.5 text-pink-400 fill-pink-500 hover:scale-125 transition-transform duration-200" />
                            </div>
                          )}

                          {/* Coração Decorativo no Canto Inferior */}
                          <Heart className={`absolute bottom-3.5 right-3.5 h-4.5 w-4.5 transition-all duration-500 group-hover:scale-130 group-hover:rotate-12 ${style.heartColor}`} />

                          {/* Cabeçalho do Post-it */}
                          <div className="mb-3 pr-4">
                            <h4 className="font-title text-base font-bold tracking-wide text-primary">
                              {msg.nome}
                            </h4>
                          </div>

                          {/* Mensagem escrita */}
                          <p className="font-body text-xs sm:text-sm leading-relaxed mb-4 break-words whitespace-pre-line text-text-dark/90 pr-2">
                            {msg.mensagem}
                          </p>

                          {/* Rodapé do Post-it */}
                          <div className="border-t border-border-lilac/30 pt-2 flex items-center justify-between text-[10px] font-body text-text-dark/40 font-semibold tracking-wider uppercase">
                            <span>Com Amor</span>
                            <span>{formatarData(msg.created_at)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

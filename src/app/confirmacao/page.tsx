'use client';

import React, { useState, useEffect } from 'react';
import { getGuests, updateRsvp, Guest } from '@/app/actions';
import { Search, Loader2, Check, X, CalendarCheck, HelpCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function RsvpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Implementação manual e robusta de Debounce de 300ms
  useEffect(() => {
    if (!searchTerm.trim() || searchTerm.trim().length < 2) {
      setGuests([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await getGuests(searchTerm);
        if (response.success && response.data) {
          setGuests(response.data);
        } else {
          toast.error(response.error || 'Erro ao pesquisar convidados.');
        }
      } catch (err) {
        console.error(err);
        toast.error('Erro na conexão. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }, 3000 * 0.1); // 300ms de debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleRsvpChange = async (guestId: string, name: string, confirmedStatus: boolean) => {
    try {
      const response = await updateRsvp(guestId, confirmedStatus);
      if (response.success) {
        // Atualiza a lista localmente para refletir o status imediatamente sem recarregar a query
        setGuests((prevGuests) =>
          prevGuests.map((g) => (g.id === guestId ? { ...g, confirmed: confirmedStatus } : g))
        );

        if (confirmedStatus) {
          toast.success(`Presença confirmada! Que alegria ter você conosco, ${name}! 🎉`, {
            duration: 5000,
            style: {
              background: '#4B0082',
              color: '#ffffff',
            },
          });
        } else {
          toast.success(`Obrigado por nos avisar, ${name}. Sentiremos sua falta! 💝`, {
            duration: 5000,
            style: {
              background: '#C8A2C8',
              color: '#ffffff',
            },
          });
        }
      } else {
        toast.error(response.error || 'Não foi possível atualizar sua presença.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Falha de conexão ao enviar resposta.');
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-16 px-4 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(243, 236, 245, 0.85), rgba(75, 0, 130, 0.25)), url('https://images.unsplash.com/photo-1490750967868-88aa4a44faa4?w=1200&q=80')`
      }}
    >
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-border-lilac p-6 sm:p-10 animate-fade-in relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="h-14 w-14 rounded-full bg-light-lilac flex items-center justify-center text-primary mx-auto mb-4 border border-border-lilac/50">
            <CalendarCheck className="h-7 w-7" />
          </div>
          <h2 className="font-title text-2xl sm:text-4xl font-bold text-primary">
            Confirmar Presença
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-3 mb-4 rounded-full" />
          <p className="font-body text-xs sm:text-sm text-text-dark/70 max-w-sm mx-auto leading-relaxed">
            Pesquise seu nome na barra abaixo para nos contar se poderemos celebrar esse momento tão especial juntos!
          </p>
        </div>

        {/* Input de Busca com Lupa */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-dark/40">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Digite seu nome (ex: Thiago, Leticia)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-4 rounded-2xl border border-border-lilac bg-white text-text-dark font-body text-sm sm:text-base placeholder:text-text-dark/45 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-sm"
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            </div>
          )}
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          {isSearching && !loading && guests.length === 0 && (
            <div className="text-center py-8 bg-light-lilac/30 rounded-2xl border border-dashed border-border-lilac/60 animate-fade-in">
              <HelpCircle className="h-8 w-8 text-primary/50 mx-auto mb-2" />
              <p className="font-body text-sm font-semibold text-primary">
                Nome não encontrado.
              </p>
              <p className="font-body text-xs text-text-dark/60 mt-1 max-w-xs mx-auto px-4 leading-relaxed">
                Verifique a grafia ou entre em contato diretamente com os noivos para acertar seu cadastro.
              </p>
            </div>
          )}

          {guests.map((guest) => {
            const isConfirmed = guest.confirmed === true;
            const isDeclined = guest.confirmed === false;
            
            return (
              <div
                key={guest.id}
                className="bg-white border border-border-lilac/50 hover:border-secondary/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
              >
                {/* Nome */}
                <div className="text-center sm:text-left">
                  <span className="font-title text-base sm:text-lg font-bold text-text-dark">
                    {guest.name}
                  </span>
                  <div className="flex items-center justify-center sm:justify-start space-x-1.5 mt-1">
                    <span className={`w-2 h-2 rounded-full ${
                      guest.confirmed === null 
                        ? 'bg-amber-400' 
                        : isConfirmed 
                        ? 'bg-green-500' 
                        : 'bg-red-400'
                    }`} />
                    <span className="text-[11px] font-body text-text-dark/50 uppercase tracking-wider font-semibold">
                      {guest.confirmed === null 
                        ? 'Pendente' 
                        : isConfirmed 
                        ? 'Presença Confirmada' 
                        : 'Não poderá ir'}
                    </span>
                  </div>
                </div>

                {/* Botões RSVP */}
                <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleRsvpChange(guest.id, guest.name, true)}
                    disabled={isConfirmed}
                    className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-body font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center space-x-1.5 focus:outline-none ${
                      isConfirmed
                        ? 'bg-primary text-white cursor-default shadow-md'
                        : 'bg-light-lilac/40 text-primary hover:bg-primary hover:text-white border border-border-lilac'
                    }`}
                  >
                    <Check className="h-4 w-4" />
                    <span>Sim, vou!</span>
                  </button>

                  <button
                    onClick={() => handleRsvpChange(guest.id, guest.name, false)}
                    disabled={isDeclined}
                    className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-body font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center space-x-1.5 focus:outline-none ${
                      isDeclined
                        ? 'bg-red-600 text-white cursor-default shadow-md'
                        : 'bg-light-lilac/40 text-text-dark/70 hover:bg-red-50 hover:text-red-600 border border-border-lilac'
                    }`}
                  >
                    <X className="h-4 w-4" />
                    <span>Não poderei</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informações adicionais */}
        {!isSearching && (
          <div className="mt-8 text-center bg-light-lilac/25 border border-border-lilac/30 rounded-2xl p-4 flex flex-col items-center justify-center">
            <span className="text-[11px] font-body font-bold text-primary/70 uppercase tracking-widest">
              Dica Importante
            </span>
            <span className="text-[11px] font-body text-text-dark/60 mt-1 leading-relaxed max-w-sm">
              Pedimos que confirme sua presença até o final de dezembro para organizarmos o buffet com carinho! ❤️
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Heart, User } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function Padrinhos() {
  const padrinhos = CONFIG.PADRINHOS;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (name: string) => {
    setImageErrors((prev) => ({ ...prev, [name]: true }));
  };

  // Função para pegar as iniciais do padrinho (ex: "João Silva" -> "JS")
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <section className="py-20 bg-white border-b border-border-lilac/30 relative">
      {/* Detalhes de Fundo */}
      <div className="absolute top-10 right-10 text-light-lilac/40 pointer-events-none">
        <Heart className="h-32 w-32 fill-light-lilac/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
            Nossos Conselheiros
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-bold text-primary">
            Padrinhos & Madrinhas
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-4 mb-6 rounded-full" />
          <p className="font-body text-sm sm:text-base text-text-dark/75 leading-relaxed">
            Pessoas escolhidas a dedo para estarem ao nosso lado no altar e na vida. Obrigado por aceitarem fazer parte da nossa história!
          </p>
        </div>

        {/* Grid dos Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {padrinhos.map((padrinho) => {
            const hasImage = padrinho.image && !imageErrors[padrinho.name];
            return (
              <div 
                key={padrinho.name}
                className="group flex flex-col items-center bg-off-white/40 border border-border-lilac/30 hover:border-primary/20 p-6 sm:p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Container Circular da Foto */}
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-inner flex items-center justify-center bg-light-lilac">
                  {hasImage ? (
                    <img 
                      src={padrinho.image} 
                      alt={padrinho.name} 
                      onError={() => handleImageError(padrinho.name)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-primary w-full h-full bg-gradient-to-tr from-light-lilac to-border-lilac/30">
                      <span className="font-title text-3xl font-bold tracking-wide">
                        {getInitials(padrinho.name)}
                      </span>
                    </div>
                  )}
                  {/* Selo decorativo sutil */}
                  <div className="absolute -bottom-1 right-2 bg-secondary text-white p-1.5 rounded-full shadow-md scale-75 group-hover:scale-90 transition-all duration-300">
                    <Heart className="h-3.5 w-3.5 fill-white text-secondary" />
                  </div>
                </div>

                {/* Informações */}
                <h4 className="font-title text-lg font-bold text-primary tracking-wide">
                  {padrinho.name}
                </h4>
                <span className="font-body text-[10px] font-bold text-secondary uppercase tracking-widest mt-1 mb-3 block">
                  {padrinho.role}
                </span>
                
                <div className="w-8 h-[1px] bg-border-lilac/60 mb-3" />
                
                <p className="font-body text-xs text-text-dark/70 leading-relaxed italic">
                  "{padrinho.description}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

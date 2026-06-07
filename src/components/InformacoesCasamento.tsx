import React from 'react';
import { Shirt, Map, ExternalLink, Navigation } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function InformacoesCasamento() {
  // Coordenadas do Sítio Della Torre obtidas na configuração do Google Maps
  const latitude = -23.298758;
  const longitude = -46.569402;

  // URLs de navegação direta
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

  return (
    <section className="py-20 sm:py-28 bg-off-white/60 border-b border-border-lilac/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
            Dicas Importantes
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-bold text-primary">
            Informações Úteis
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-4 mb-6 rounded-full" />
        </div>

        {/* Grid de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-stretch">
          
          {/* Card 1: Traje (Dress Code) */}
          <div className="bg-white border border-border-lilac/50 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-light-lilac flex items-center justify-center text-primary mb-6 border border-border-lilac/40">
                <Shirt className="h-6 w-6" />
              </div>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-primary mb-2">
                O Que Vestir?
              </h3>
              <span className="font-body text-xs font-bold text-secondary uppercase tracking-widest block mb-4">
                Esporte Fino / Passeio
              </span>
              <p className="font-body text-sm sm:text-base text-text-dark/85 leading-relaxed mb-6">
                Sugerimos o traje Esporte Fino. Como nossa cerimônia será pela manhã em um sítio, sinta-se à vontade para escolher tecidos leves e cores harmoniosas.
              </p>
            </div>
            
            <div className="bg-light-lilac/30 border border-dashed border-border-lilac/60 p-4 rounded-2xl text-xs sm:text-sm text-text-dark/70 italic space-y-2">
              <p>
                <strong className="text-primary not-italic block mb-1">Nota carinhosa:</strong>
                A cor branca é reservada exclusivamente para a noiva. Pedimos também que evitem a cor das nossas madrinhas.
              </p>
            </div>
          </div>

          {/* Card 2: Hospedagem & Trajeto */}
          <div className="bg-white border border-border-lilac/50 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-light-lilac flex items-center justify-center text-primary mb-6 border border-border-lilac/40">
                <Map className="h-6 w-6" />
              </div>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-primary mb-2">
                Hospedagem & Como Chegar
              </h3>
              <span className="font-body text-xs font-bold text-secondary uppercase tracking-widest block mb-4">
                Mairiporã - SP
              </span>
              <p className="font-body text-sm sm:text-base text-text-dark/85 leading-relaxed mb-6">
                Como a cerimônia no Sítio Della Torre será pontualmente às 09:00h da manhã de domingo, sugerimos que os convidados que moram mais longe considerem se hospedar na região de Mairiporã na noite de sábado para maior conforto.
              </p>
            </div>

            <div className="space-y-4">
              <p className="font-body text-[11px] font-semibold text-text-dark/40 uppercase tracking-widest border-b border-border-lilac/30 pb-2">
                Como navegar até lá
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-primary text-white font-body font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-primary/95 transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-white border border-primary text-primary font-body font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-light-lilac/50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Waze</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Countdown from '@/components/Countdown';
import { CONFIG } from '@/lib/config';
import { MapPin, Calendar, Camera, Heart, Gift, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const localPhotos = CONFIG.LOCAL_PHOTOS;
  const couplePhotos = CONFIG.COUPLE_PHOTOS;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center text-center overflow-hidden py-20 bg-gradient-to-tr from-primary via-primary/95 to-secondary/80 text-white">
        {/* Background Decorative Circles */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 sm:mb-8 animate-fade-in">
            <Heart className="h-4 w-4 text-white fill-white animate-pulse" />
            <span className="font-body text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Nós vamos nos casar!
            </span>
          </div>

          <h1 className="font-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide leading-tight mb-4 drop-shadow-md animate-slide-up">
            Amanda & Guilherme
          </h1>

          <div className="w-16 h-[2px] bg-white/50 rounded-full my-4" />

          <p className="font-body text-base sm:text-xl lg:text-2xl font-light text-white/90 max-w-2xl mx-auto mb-8 sm:mb-12 italic leading-relaxed">
            "Com o coração transbordando de alegria, convidamos você para celebrar conosco o início do nosso feliz para sempre."
          </p>

          {/* CONTADOR REGRESSIVO */}
          <div className="w-full max-w-lg mb-10 sm:mb-14">
            <Countdown />
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-md justify-center animate-slide-up">
            <Link
              href="/confirmacao"
              className="flex-1 px-8 py-4 bg-white text-primary font-body font-bold text-sm tracking-widest uppercase rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Confirmar Presença</span>
            </Link>
            <Link
              href="/presentes"
              className="flex-1 px-8 py-4 bg-transparent border-2 border-white text-white font-body font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Gift className="h-4 w-4" />
              <span>Lista de Presentes</span>
            </Link>
          </div>
        </div>

        {/* Waves Transition decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-off-white to-transparent" />
      </section>

      {/* 2. NOSSA HISTÓRIA */}
      <section className="py-20 sm:py-28 bg-off-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="font-body text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
              Nossa Jornada
            </span>
            <h2 className="font-title text-3xl sm:text-5xl font-bold text-primary">
              Do Primeiro Olhar ao Altar
            </h2>
            <div className="w-12 h-[2px] bg-secondary mx-auto mt-4 mb-6 rounded-full" />
            <p className="font-body text-sm sm:text-base text-text-dark/75 leading-relaxed">
              O amor não acontece por acaso. Ele é construído dia a dia, nas conversas sinceras, nos risos compartilhados, nos pequenos gestos de carinho e no desejo mútuo de caminhar juntos. Aqui começa o capítulo mais lindo das nossas vidas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            {/* Grid 2x2 de Fotos */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 order-2 lg:order-1">
              {couplePhotos.map((photo) => (
                <div
                  key={photo.src}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-light-lilac shadow-md hover:shadow-xl transition-all duration-500 border border-border-lilac/30"
                >
                  {!imageErrors[photo.src] ? (
                    <img
                      src={photo.src}
                      alt={photo.label}
                      onError={() => handleImageError(photo.src)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-light-lilac text-primary text-center">
                      <Camera className="h-8 w-8 text-secondary mb-2" />
                      <span className="font-body text-xs font-semibold">{photo.label}</span>
                      <span className="text-[10px] text-text-dark/40 mt-1">Foto em breve</span>
                    </div>
                  )}
                  {/* Label ao passar o mouse */}
                  {/* Subtle Label on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-body text-xs sm:text-sm font-medium tracking-wide">
                      {photo.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Texto da História */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <div className="border-l-4 border-secondary pl-4 sm:pl-6 space-y-4">
                <h3 className="font-title text-xl sm:text-2xl font-bold text-primary">
                  Como tudo começou...
                </h3>
                <p className="font-body text-sm sm:text-base text-text-dark/80 leading-relaxed">
                  Entre encontros inusitados e afinidades que pareciam traçadas pelo destino, nós nos descobrimos. O que começou como uma amizade sincera logo se transformou em uma cumplicidade inabalável. Percebemos que as melhores risadas e os sonhos mais altos eram aqueles que compartilhávamos juntos.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 sm:pl-6 space-y-4">
                <h3 className="font-title text-xl sm:text-2xl font-bold text-primary">
                  A Decisão de ser Um
                </h3>
                <p className="font-body text-sm sm:text-base text-text-dark/80 leading-relaxed">
                  E agora, com a bênção de Deus, de nossas famílias e cercados pelo amor dos amigos mais próximos, daremos o passo mais importante de nossa história. Escolhemos nos amar, nos respeitar e construir um lar repleto de paz, amor e sabedoria todos os dias de nossas vidas.
                </p>
              </div>

              <div className="flex items-center space-x-3 text-primary bg-light-lilac/50 border border-border-lilac/40 p-4 rounded-xl">
                <Heart className="h-5 w-5 text-secondary fill-secondary" />
                <span className="font-body text-xs sm:text-sm font-semibold italic">
                  "Mal podemos esperar para celebrar este amor com você!"
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCAL DA FESTA */}
      <section className="py-20 sm:py-28 bg-white border-y border-border-lilac/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-body text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
              O Grande Dia
            </span>
            <h2 className="font-title text-3xl sm:text-5xl font-bold text-primary">
              Local & Data
            </h2>
            <div className="w-12 h-[2px] bg-secondary mx-auto mt-4 mb-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Informações de Local e Fotos */}
            <div className="flex flex-col justify-between space-y-8">
              <div className="space-y-6 bg-light-lilac/30 border border-border-lilac/50 p-6 sm:p-8 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary text-white rounded-xl">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-title text-lg sm:text-xl font-bold text-primary">Data & Horário</h3>
                    <p className="font-body text-sm sm:text-base text-text-dark/85 mt-1 font-semibold">
                      Domingo, 24 de Janeiro de 2027
                    </p>
                    <p className="font-body text-xs sm:text-sm text-text-dark/60 mt-1">
                      Cerimônia pontual às 09:00h
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary text-white rounded-xl">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-title text-lg sm:text-xl font-bold text-primary">Onde</h3>
                    <p className="font-body text-sm sm:text-base text-text-dark/85 mt-1 font-semibold">
                      {CONFIG.LOCATION_NAME}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-text-dark/60 mt-1">
                      {CONFIG.LOCATION_ADDRESS}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid 2x2 de Fotos do Local */}
              <div className="grid grid-cols-2 gap-4">
                {localPhotos.map((photo) => (
                  <div
                    key={photo.src}
                    className="group relative aspect-video rounded-xl overflow-hidden bg-light-lilac shadow-sm hover:shadow-md transition-all duration-300 border border-border-lilac/30"
                  >
                    {!imageErrors[photo.src] ? (
                      <img
                        src={photo.src}
                        alt={photo.label}
                        onError={() => handleImageError(photo.src)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-light-lilac text-primary text-center">
                        <span className="font-body text-[10px] font-bold uppercase">{photo.label}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-100 group-hover:bg-primary/50 transition-colors duration-300">
                      <span className="text-white text-xs font-semibold font-body tracking-wider uppercase drop-shadow-sm text-center px-2">
                        {photo.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mapa Incorporado */}
            <div className="relative rounded-2xl overflow-hidden bg-light-lilac shadow-md min-h-[350px] border border-border-lilac/50">
              <iframe
                src={CONFIG.GOOGLE_MAPS_IFRAME_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de localização Fazenda Santa Clara"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

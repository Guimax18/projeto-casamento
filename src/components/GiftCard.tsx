'use client';

import React, { useState } from 'react';
import { Gift } from 'lucide-react';

interface GiftCardProps {
  title: string;
  price: number;
  unsplashId: string;
  onGift: () => void;
}

export default function GiftCard({ title, price, unsplashId, onGift }: GiftCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = `https://images.unsplash.com/photo-${unsplashId}?w=400&h=300&fit=crop&q=80`;

  return (
    <div className="group flex flex-col bg-white border border-border-lilac/60 rounded-2xl overflow-hidden hover:shadow-xl hover:border-secondary/60 hover:-translate-y-1 transition-all duration-300">
      {/* Imagem do Card */}
      <div className="relative aspect-4/3 w-full bg-light-lilac overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <img
            src={imageUrl}
            alt={title}
            onError={() => setImgError(true)}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-primary/70 select-none">
            <Gift className="h-10 w-10 text-secondary mb-2 animate-bounce" />
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-text-dark/50">
              Foto do presente
            </span>
          </div>
        )}
        
        {/* Overlay do preço em hover */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-border-lilac/50 px-3 py-1 rounded-full shadow-sm">
          <span className="font-body text-xs font-bold text-primary">
            R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 justify-between">
        <div className="mb-4">
          <h4 className="font-title text-base sm:text-lg font-bold text-text-dark group-hover:text-primary transition-colors duration-300 min-h-[3.5rem] flex items-center line-clamp-2">
            {title}
          </h4>
        </div>
        
        <button
          onClick={onGift}
          type="button"
          className="w-full py-3 px-4 bg-light-lilac hover:bg-primary text-primary hover:text-white font-semibold text-sm rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 border border-border-lilac hover:border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Gift className="h-4 w-4" />
          <span>Presentear</span>
        </button>
      </div>
    </div>
  );
}

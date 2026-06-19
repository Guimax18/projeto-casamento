'use client';

import React from 'react';
import { Gift } from 'lucide-react';

interface GiftCardProps {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  isBought: boolean;
  onGift: () => void;
}

export default function GiftCard({
  title,
  price,
  description,
  imageUrl,
  isBought,
  onGift
}: GiftCardProps) {
  return (
    <div
      className={`group flex flex-col bg-white border border-border-lilac/60 rounded-2xl overflow-hidden hover:shadow-xl hover:border-secondary/60 hover:-translate-y-1 transition-all duration-300 ${
        isBought ? 'opacity-60 hover:shadow-sm hover:translate-y-0' : ''
      }`}
    >
      {/* Imagem do Card */}
      <div className="relative aspect-4/3 w-full bg-light-lilac overflow-hidden flex items-center justify-center">
        {/* Tag de imagem solicitada pelo usuário (bem visível para fácil substituição) */}
        <img
          src={imageUrl}
          alt={title}
          className="img-presente object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Overlay do preço */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-border-lilac/50 px-3 py-1 rounded-full shadow-sm">
          {/* Valor do presente destacado em verde conforme a regra 1 */}
          <span className="font-body text-xs font-bold text-emerald-600">
            R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 justify-between">
        <div className="mb-4 flex-1">
          <h4 className="font-title text-base sm:text-lg font-bold text-text-dark group-hover:text-primary transition-colors duration-300 min-h-[3rem] flex items-center line-clamp-2">
            {title}
          </h4>
          <p className="font-body text-xs sm:text-sm text-text-dark/65 mt-2 line-clamp-3 leading-relaxed">
            {description}
          </p>
          <div className="mt-4">
            <span className="font-body text-base font-extrabold text-emerald-600 block">
              R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        
        {/* Botão de Ação */}
        {isBought ? (
          <button
            disabled
            type="button"
            className="w-full py-3 px-4 bg-gray-300 text-gray-500 font-semibold text-sm rounded-xl flex items-center justify-center space-x-2 border border-gray-300 cursor-not-allowed"
          >
            <Gift className="h-4 w-4" />
            <span>Já comprado!</span>
          </button>
        ) : (
          <button
            onClick={onGift}
            type="button"
            className="w-full py-3 px-4 bg-light-lilac hover:bg-primary text-primary hover:text-white font-semibold text-sm rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 border border-border-lilac hover:border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Gift className="h-4 w-4" />
            <span>Presentear com este item</span>
          </button>
        )}
      </div>
    </div>
  );
}

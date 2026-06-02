'use client';

import React, { useState } from 'react';
import GiftCard from '@/components/GiftCard';
import PixModal from '@/components/PixModal';
import { Heart, Info } from 'lucide-react';

interface GiftItem {
  id: number;
  title: string;
  price: number;
  unsplashId: string;
}

const GIFT_ITEMS: GiftItem[] = [
  { id: 1, title: 'Cafeteira dos sonhos (para o café dos recém-casados)', price: 150.00, unsplashId: '1504630083234-14187a9df0f3' },
  { id: 2, title: 'Jogo de panelas anti-grilo (para o arroz não queimar)', price: 200.00, unsplashId: '1556909114-f6e7d7c7e4b9' },
  { id: 3, title: 'Um "SIM" bem dado nas discussões', price: 15.00, unsplashId: '1509021436662-8e0d24b454e2' },
  { id: 4, title: 'Filtro dos sonhos (para espantar pesadelos de boletos)', price: 30.00, unsplashId: '1615485290382-441e4d49cb21' },
  { id: 5, title: 'Almofada da paz (porque sofá novo é muito caro)', price: 50.00, unsplashId: '1616627561950-9f746e330187' },
  { id: 6, title: 'Liquidificador turbo para vitaminas do amor', price: 120.00, unsplashId: '1585515320310-259814833e62' },
  { id: 7, title: 'Jogo de cama 200 fios (sonos abençoados)', price: 180.00, unsplashId: '1616628188850-3a1e2c3b0a4b' },
  { id: 8, title: 'Micro-ondas para pipoca de filme a dois', price: 250.00, unsplashId: '1574269909862-7e1d70bb8078' },
  { id: 9, title: 'Aspirador robô (para a noiva descansar)', price: 300.00, unsplashId: '1558618666-fcd25c85f82e' },
  { id: 10, title: 'Frigideira antiaderente (para o noivo não reclamar da omelete)', price: 60.00, unsplashId: '1590794056226-79b5db18a2a1' },
  { id: 11, title: 'Aula de dança para a lua de mel', price: 90.00, unsplashId: '1508807526345-15e9b5f4eaff' },
  { id: 12, title: 'Pizza da primeira noite sem fogão', price: 40.00, unsplashId: '1513104890138-7c749659a591' },
  { id: 13, title: 'Dia de spa para a noiva (ela merece)', price: 80.00, unsplashId: '1540555700478-4be289fbecef' },
  { id: 14, title: 'Massagem para o noivo (ele carregou as caixas da mudança)', price: 70.00, unsplashId: '1519823551278-64ac92734fb1' },
  { id: 15, title: 'Babá de plantas durante a lua de mel', price: 50.00, unsplashId: '1416879595882-3373a0480b5b' },
  { id: 16, title: 'Jardim de suculentas (para o novo lar)', price: 40.00, unsplashId: '1459411552884-841db9b3cc2a' },
  { id: 17, title: 'Gasolina para o carro da mudança', price: 100.00, unsplashId: '1533050487297-09b450131914' },
  { id: 18, title: 'Kit ferramentas (marido de aluguel não incluso)', price: 85.00, unsplashId: '1586862466650-45d8b1f1b5c8' },
  { id: 19, title: 'Curso de culinária para dois (adeus miojo!)', price: 150.00, unsplashId: '1556909114-f6e7d7c7e4b9' },
  { id: 20, title: 'Tapete de oração para o cantinho da paz', price: 35.00, unsplashId: '1582719471137-c3967ffb1e2c' },
  { id: 21, title: 'Luz de presença no corredor (para não tropeçar à noite)', price: 25.00, unsplashId: '1513506003901-1e6a229e2d15' },
  { id: 22, title: 'Seguro contra TPM: kit chocolate', price: 20.00, unsplashId: '1481391319762-47dff72954d9' },
  { id: 23, title: 'Contribuição para a máquina de lavar (livre)', price: 200.00, unsplashId: '1626806787461-102c1bfaaea1' },
  { id: 24, title: 'Super beijo no altar', price: 5.00, unsplashId: '1518199266791-5375a83190b7' },
];

export default function GiftsPage() {
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (gift: GiftItem) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGift(null);
  };

  return (
    <div className="py-12 sm:py-20 bg-off-white min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Página */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="font-body text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
            Carinho em Gestos
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-bold text-primary">
            Lista de Presentes
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-4 mb-6 rounded-full" />
          <p className="font-body text-sm sm:text-base text-text-dark/75 leading-relaxed">
            Criamos uma lista com opções criativas e bem-humoradas para ajudar a montar nosso novo lar.
            Sinta-se à vontade para escolher o presente que mais combina com você!
          </p>
        </div>

        {/* Informação sobre o Pix */}
        <div className="max-w-3xl mx-auto mb-12 bg-light-lilac/30 border border-border-lilac rounded-2xl p-5 sm:p-6 flex items-start space-x-4">
          <div className="p-2 bg-primary text-white rounded-lg shrink-0 mt-0.5">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-title text-base sm:text-lg font-bold text-primary">Como funciona nossa lista?</h3>
            <p className="font-body text-xs sm:text-sm text-text-dark/70 mt-1 leading-relaxed">
              Ao escolher um presente, abrirá um modal com o valor e a nossa chave Pix. Você insere seu nome para nosso registro, copia a chave Pix e faz a transferência diretamente no app do seu banco. Tudo rápido, simples e automático!
            </p>
          </div>
        </div>

        {/* Grid de Presentes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {GIFT_ITEMS.map((gift) => (
            <GiftCard
              key={gift.id}
              title={gift.title}
              price={gift.price}
              unsplashId={gift.unsplashId}
              onGift={() => handleOpenModal(gift)}
            />
          ))}
        </div>

        {/* Modal de confirmação do Pix e Intenção de Presente */}
        <PixModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          giftTitle={selectedGift?.title || ''}
          giftValue={selectedGift?.price || 0}
        />
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CONFIG } from '@/lib/config';
import { toast } from 'react-hot-toast';
import { Copy, Check, X, Gift } from 'lucide-react';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftTitle: string;
  giftValue: number;
}

export default function PixModal({ isOpen, onClose, giftTitle, giftValue }: PixModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = 'hidden'; // Evita scroll do body por trás
      setGuestName('');
      setCopied(false);
    } else {
      dialog.close();
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.PIX_KEY);
      setCopied(true);
      toast.success('Chave Pix copiada com sucesso!', {
        icon: '✨',
        style: {
          background: '#4B0082',
          color: '#ffffff',
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
      toast.error('Erro ao copiar a chave Pix. Tente copiar manualmente.');
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error('Por favor, informe seu nome para confirmar o presente.');
      return;
    }

    // Feedback emocionante conforme solicitado!
    toast.success(
      `Obrigado, ${guestName}! Intenção de presentear registrada com carinho! Não se esqueça de realizar o Pix.`,
      {
        duration: 6000,
        icon: '💝',
        style: {
          background: '#4B0082',
          color: '#ffffff',
          fontWeight: 'bold',
        },
      }
    );
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Fecha o modal apenas se o clique for no elemento <dialog> (que representa o backdrop)
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={onClose}
      className="rounded-2xl border border-border-lilac bg-white p-0 shadow-2xl max-w-md w-[90%] outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm animate-scale-up"
    >
      <div className="relative p-6 sm:p-8">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-dark/50 hover:text-primary transition-colors duration-300"
          aria-label="Fechar Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-light-lilac flex items-center justify-center text-primary mb-3">
            <Gift className="h-6 w-6" />
          </div>
          <h3 className="font-title text-xl sm:text-2xl font-bold text-primary">
            Presentear Noivos
          </h3>
          <p className="font-body text-xs sm:text-sm text-text-dark/60 mt-1">
            Você escolheu um presente muito especial!
          </p>
        </div>

        {/* Detalhes do Presente */}
        <div className="bg-light-lilac/50 border border-border-lilac rounded-xl p-4 mb-6">
          <p className="font-body text-xs text-text-dark/60 uppercase tracking-widest font-semibold">
            Presente Selecionado
          </p>
          <p className="font-title text-base sm:text-lg font-bold text-primary mt-1">
            {giftTitle}
          </p>
          <p className="font-body text-xl font-extrabold text-primary mt-2">
            R$ {giftValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Fluxo Pix */}
        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label htmlFor="guest-name" className="block text-xs font-semibold text-text-dark/70 mb-1">
              Seu Nome Completo *
            </label>
            <input
              id="guest-name"
              type="text"
              required
              placeholder="Digite seu nome para os noivos saberem"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border-lilac bg-white text-text-dark font-body text-sm placeholder:text-text-dark/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark/70 mb-1">
              Chave Pix dos Noivos
            </label>
            {CONFIG.PIX_KEY ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={CONFIG.PIX_KEY}
                  className="flex-1 px-4 py-3 rounded-lg border border-border-lilac bg-light-lilac/30 text-text-dark font-mono text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="bg-primary hover:bg-primary/95 text-white p-3 rounded-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  title="Copiar Chave Pix"
                >
                  {copied ? <Check className="h-4 w-4 text-green-300" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            ) : (
              <p className="text-sm italic text-text-dark/60">
                Chave Pix em breve! Os noivos estão preparando com carinho.
              </p>
            )}
          </div>

          <div className="text-[11px] text-text-dark/50 italic leading-relaxed text-center py-2 bg-light-lilac/25 rounded-lg border border-dashed border-border-lilac/50">
            ⚠️ O pagamento é efetuado manualmente no aplicativo do seu banco usando a chave Pix acima.
          </div>

          {/* Botões de Ação */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-border-lilac text-text-dark font-semibold text-sm hover:bg-light-lilac/30 transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Confirmar Presente
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

import React from 'react';
import MuralMensagens from '@/components/MuralMensagens';

export const metadata = {
  title: 'Mural de Recados | Casamento de Amanda & Guilherme',
  description: 'Deixe sua mensagem de carinho e votos de felicidade para Amanda e Guilherme em nosso mural!',
};

export default function MensagensPage() {
  return (
    <div className="bg-off-white min-h-[85vh]">
      <MuralMensagens />
    </div>
  );
}

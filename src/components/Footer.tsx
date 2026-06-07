import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Confirmar Presença', href: '/confirmacao' },
    { label: 'Mural de Mensagens', href: '/mensagens' },
    { label: 'Lista de Presentes', href: '/presentes' },
  ];

  return (
    <footer className="bg-primary text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#C8A2C8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h3 className="font-title text-3xl font-semibold tracking-wider mb-3">
          Amanda &amp; Guilherme
        </h3>
        <p className="font-body text-sm text-white/70 italic max-w-md mx-auto mb-6">
          &ldquo;O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.&rdquo;
        </p>
        
        {/* Links de Navegação */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-xs font-semibold text-white/60 hover:text-white tracking-widest uppercase transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-white/50 text-xs mb-8">
          <span>24.01.2027</span>
          <span>•</span>
          <Heart className="h-3 w-3 text-secondary fill-secondary animate-pulse" />
          <span>•</span>
          <span>Sítio Della Torre — Mairiporã, SP</span>
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <p className="font-body text-xs text-white/40">
            &copy; {currentYear} Casamento de Amanda &amp; Guilherme. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

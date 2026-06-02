'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Lista de Presentes', href: '/presentes' },
    { name: 'Confirmar Presença', href: '/confirmacao' },
    { name: 'Área dos Noivos', href: '/admin' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-title text-2xl sm:text-3xl font-bold tracking-widest text-primary group-hover:text-secondary transition-colors duration-300">
              A&G
            </span>
            <Heart className="h-4 w-4 text-secondary fill-secondary animate-pulse group-hover:scale-125 transition-transform duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-body text-sm font-medium tracking-wide transition-colors duration-300 py-1 ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-text-dark/80 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-primary hover:text-secondary focus:outline-none transition-colors duration-300"
              aria-label={isOpen ? 'Fechar Menu' : 'Abrir Menu'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 border-b border-border-lilac shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive(link.href)
                  ? 'bg-light-lilac text-primary font-bold pl-4'
                  : 'text-text-dark/80 hover:bg-light-lilac/50 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

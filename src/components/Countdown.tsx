'use client';

import React, { useState, useEffect } from 'react';
import { CONFIG } from '@/lib/config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = +CONFIG.WEDDING_DATE - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        setTimeLeft(newTimeLeft);
        setIsFinished(false);
      } else {
        setIsFinished(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Enquanto não estiver montado no cliente, renderizamos um placeholder limpo com o mesmo tamanho físico
  if (!mounted) {
    return (
      <div className="flex justify-center items-center space-x-3 sm:space-x-6 py-6 opacity-50">
        {[
          { label: 'Dias', value: '00' },
          { label: 'Horas', value: '00' },
          { label: 'Min.', value: '00' },
          { label: 'Seg.', value: '00' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="font-title text-2xl sm:text-4xl font-bold text-white">{item.value}</span>
            </div>
            <span className="text-white/70 text-xs sm:text-sm mt-2 font-medium tracking-wider uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="text-center py-6 animate-fade-in">
        <h3 className="font-title text-2xl sm:text-4xl font-bold text-white tracking-widest uppercase">
          🎉 Chegou o Grande Dia! 🎉
        </h3>
        <p className="text-white/80 font-body mt-2 text-sm sm:text-base">
          Amanda e Guilherme estão celebrando seu casamento neste exato momento!
        </p>
      </div>
    );
  }

  const items = [
    { label: 'Dias', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'Horas', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutos', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Segundos', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="flex justify-center items-center space-x-3 sm:space-x-6 py-6 animate-fade-in">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center group">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white/15 border border-white/25 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 group-hover:border-white/40">
            <span className="font-title text-2xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-md">
              {item.value}
            </span>
          </div>
          <span className="text-white/80 text-[10px] sm:text-xs mt-2 font-medium tracking-widest uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

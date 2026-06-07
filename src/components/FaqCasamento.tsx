import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqCasamento() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "Até que data preciso confirmar minha presença?",
      answer: "Por favor, confirmem sua presença o quanto antes! Precisamos dessa confirmação o mais breve possível para garantir a melhor experiência, conforto e organização para todos os nossos convidados."
    },
    {
      question: "Que horas devo chegar? Qual a programação inicial?",
      answer: "Nossa cerimônia começará pontualmente às 09:00h da manhã. Recomendamos chegar com antecedência! Todos os convidados que chegarem cedo receberão uma recepção super calorosa com coquetéis e comidinhas deliciosas de boas-vindas."
    },
    {
      question: "Como é o espaço do evento?",
      answer: "O Sítio Della Torre é um espaço maravilhoso, bem amplo e totalmente aberto, perfeito para aproveitarmos o dia em contato com a natureza."
    },
    {
      question: "Há estacionamento no local?",
      answer: "Sim, o Sítio Della Torre conta com estacionamento privativo dentro do próprio espaço para os nossos convidados."
    },
    {
      question: "Terá bebidas alcoólicas no evento?",
      answer: "Teremos drinques especiais com e sem álcool servidos exclusivamente no início do evento, durante a nossa recepção de boas-vindas."
    },
    {
      question: "Posso usar a piscina do sítio?",
      answer: "O local possui uma linda piscina, mas atenção: por motivos de segurança e logística do evento, não será permitida a entrada de ninguém na água."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-border-lilac/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
            Esclareça suas Dúvidas
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-bold text-primary">
            Dúvidas Frequentes
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-4 mb-6 rounded-full" />
        </div>

        {/* Lista de Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? 'border-primary/40 bg-light-lilac/10 shadow-sm' 
                    : 'border-border-lilac/50 bg-off-white/20 hover:bg-off-white/40'
                }`}
              >
                {/* Pergunta (Botão de Gatilho) */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left p-5 sm:p-6 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start space-x-3.5 pr-4">
                    <HelpCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                      isOpen ? 'text-primary' : 'text-text-dark/40'
                    }`} />
                    <span className={`font-title text-sm sm:text-base font-bold tracking-wide transition-colors duration-300 ${
                      isOpen ? 'text-primary' : 'text-text-dark/95'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-text-dark/50 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-primary' : ''
                  }`} />
                </button>

                {/* Resposta (Conteúdo Animado) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-border-lilac/20">
                      <p className="font-body text-xs sm:text-sm text-text-dark/75 leading-relaxed mt-4 pl-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

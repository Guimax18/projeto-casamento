'use client';

import React, { useState, useEffect } from 'react';
import GiftCard from '@/components/GiftCard';
import PixModal from '@/components/PixModal';
import { Heart, Info, DollarSign, ExternalLink, Sparkles } from 'lucide-react';

interface GiftItem {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Lista oficial dos 32 itens criativos fornecida pelo usuário
// As URLs de imagem estão completas e bem visíveis abaixo para fácil alteração
const GIFT_ITEMS: GiftItem[] = [
  // ==========================================
  // CATEGORIA: DESAFIOS DA COZINHA
  // ==========================================
  {
    id: 1,
    category: 'DESAFIOS DA COZINHA',
    title: 'Primeiro botijão de gás e o vasilhame',
    description: 'Porque a gente não tem nem o casco de ferro ainda. Esse aqui é para o primeiro mês de fogo alto.',
    price: 385.40,
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 2,
    category: 'DESAFIOS DA COZINHA',
    title: "Fundo 'O preço do Azeite tá um desaforo'",
    description: 'Para abastecer a despensa com óleo e azeite de oliva sem precisar fazer um empréstimo bancário.',
    price: 198.52,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 3,
    category: 'DESAFIOS DA COZINHA',
    title: 'Kit Sobrevivência (A Grande Feira do Mês)',
    description: 'Cota para encher o armário do zero: arroz, feijão, café e açúcar para não passarmos fome.',
    price: 680.44,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 4,
    category: 'DESAFIOS DA COZINHA',
    title: 'Estoque de Tupperware Antifurto',
    description: 'As visitas vão levar embora com pedaço de bolo, então precisamos de um estoque industrial.',
    price: 347.13,
    imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 5,
    category: 'DESAFIOS DA COZINHA',
    title: "Cota 'Mãos assadas nunca mais' (Fogão)",
    description: 'Fundo real para o nosso Fogão de 4 bocas com forno (chega de comer marmita fria).',
    price: 850.00,
    imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 6,
    category: 'DESAFIOS DA COZINHA',
    title: 'Rodinho de pia e organizadores Luxo',
    description: 'Manter a pia seca e organizada para o casal não brigar logo na primeira semana.',
    price: 215.25,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 7,
    category: 'DESAFIOS DA COZINHA',
    title: 'Seguro contra queima de arroz (Micro-ondas)',
    description: 'Fundo para o nosso Micro-ondas. Essencial para esquentar a janta quando chegarmos exaustos.',
    price: 785.18,
    imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 8,
    category: 'DESAFIOS DA COZINHA',
    title: "Fundo 'Salvem as nossas marmitas' (Geladeira)",
    description: 'Cota master para a nossa Geladeira Frost Free. Sem ela, a gente não tem nem água gelada.',
    price: 1250.00,
    imageUrl: 'https://images.unsplash.com/photo-1571175432291-3e4777af4f3b?w=500&h=300&fit=crop&q=80'
  },

  // ==========================================
  // CATEGORIA: FAXINA, LAVANDERIA & CONFORTO
  // ==========================================
  {
    id: 9,
    category: 'FAXINA, LAVANDERIA & CONFORTO',
    title: "Aspirador de Pó 'Cata-Miséria'",
    description: 'Para o marido ajudar na faxina de um jeito moderno, sem reclamar que a vassoura dói as costas.',
    price: 365.81,
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 10,
    category: 'FAXINA, LAVANDERIA & CONFORTO',
    title: "Cota 'Chega de lavar roupa no tanque'",
    description: 'Sua contribuição para a nossa Máquina de Lavar Roupa. Salve as mãos da noiva desse sofrimento!',
    price: 1150.00,
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 11,
    category: 'FAXINA, LAVANDERIA & CONFORTO',
    title: 'Inseticida e Equipamentos de Defesa',
    description: 'Para eliminar baratas e visitas de seis pernas sem ninguém precisar subir na mesa e chorar.',
    price: 135.21,
    imageUrl: 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 12,
    category: 'FAXINA, LAVANDERIA & CONFORTO',
    title: "Tapete de Entrada 'Traga um Mimo'",
    description: 'Aviso oficial na porta de entrada: só entra na casa nova quem trouxer um pacote de hálito ou um doce.',
    price: 147.80,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 13,
    category: 'FAXINA, LAVANDERIA & CONFORTO',
    title: 'Lâmpada Inteligente via Controle',
    description: 'Porque o frio de bater o queixo não combina com levantar do edredom para apagar a luz.',
    price: 165.44,
    imageUrl: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 14,
    category: 'FAXINA, LAVANDERIA & CONFORTO',
    title: 'Localizador de Controle Remoto (Sofá)',
    description: 'Fundo para o nosso Sofá de 3 lugares (lugar oficial onde o controle vai sumir para sempre).',
    price: 850.00,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 15,
    category: 'FAXINA, LAVANDERIA & CONFORTO',
    title: 'Mop Giratório Profissional de Faxina',
    description: 'Utensílio sagrado para limpar o piso da casa alugada sem travar a coluna no primeiro mês.',
    price: 286.28,
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 16,
    category: 'FAXINA, LAVANDERIA & CONFORTO',
    title: "Fundo 'Adeus Colchão Inflável' (Cama Box)",
    description: 'Contribuição para a nossa Cama Box de Casal. Dormir no chão na casa nova não dá!',
    price: 847.47,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=300&fit=crop&q=80'
  },

  // ==========================================
  // CATEGORIA: ALUGUEL & BOLETOS DA VIDA REAL
  // ==========================================
  {
    id: 17,
    category: 'ALUGUEL & BOLETOS DA VIDA REAL',
    title: 'Adote o boleto de energia elétrica',
    description: 'O chuveiro elétrico no inverno não perdoa. Ajudem a pagar a primeira conta de luz da casa.',
    price: 367.52,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 18,
    category: 'ALUGUEL & BOLETOS DA VIDA REAL',
    title: "Cota 'Socorro, os produtos de limpeza'",
    description: 'Amaciante, sabão em pó, desinfetante... tudo o que é caro para deixar a casa com cheiro de rica.',
    price: 487.13,
    imageUrl: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 19,
    category: 'ALUGUEL & BOLETOS DA VIDA REAL',
    title: 'Alvará de liberação para o futebol',
    description: 'O marido joga a sua partidinha de futebol em paz, mas deixa o Pix da janta pago e garantido.',
    price: 250.00,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 20,
    category: 'ALUGUEL & BOLETOS DA VIDA REAL',
    title: 'Alvará de liberação para o shopping',
    description: 'A esposa vai espairecer com as amigas e o Pix resolve os detalhes que faltaram no enxoval.',
    price: 350.00,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 21,
    category: 'ALUGUEL & BOLETOS DA VIDA REAL',
    title: "Fundo 'Calar os fofoqueiros de plantão'",
    description: 'Para a gente mobiliar tudo rápido e ninguém dizer que casamos sem ter onde cair morto!',
    price: 600.00,
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 22,
    category: 'ALUGUEL & BOLETOS DA VIDA REAL',
    title: 'Pedágio para a visita que não vai embora',
    description: 'Ajuda de custo para repor o pó de café e as bolachas que as visitas vão comer na nossa mesa.',
    price: 184.23,
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 23,
    category: 'ALUGUEL & BOLETOS DA VIDA REAL',
    title: "Seguro 'Chaveiro de Emergência 24h'",
    description: 'Porque na correria da mudança, um dos dois vai esquecer a chave para dentro de casa, certeza.',
    price: 280.00,
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 24,
    category: 'ALUGUEL & BOLETOS DA VIDA REAL',
    title: "Cota 'Internet Fibra Óptica Estável'",
    description: 'Para pagar a taxa de instalação e os primeiros meses da internet para assistirmos nossos vídeos.',
    price: 1000.00,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&h=300&fit=crop&q=80'
  },

  // ==========================================
  // CATEGORIA: PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL
  // ==========================================
  {
    id: 25,
    category: 'PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL',
    title: 'Fone Abafador de Ronco Extremo',
    description: 'Para garantir que a esposa durma em paz quando o cansaço do marido virar um motor V8.',
    price: 248.52,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 26,
    category: 'PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL',
    title: 'Climatizador de Ar Potente',
    description: 'O calor estressa as mentes. Nos ajude a comprar um ventilador/climatizador forte para o quarto.',
    price: 465.81,
    imageUrl: 'https://images.unsplash.com/photo-1618945811743-dd095b5f2c25?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 27,
    category: 'PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL',
    title: 'Chá de Camomila para o Dia da Mudança',
    description: 'Para acalmar os ânimos de recém-casados enquanto carregamos caixas no sol quente.',
    price: 110.25,
    imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 28,
    category: 'PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL',
    title: "Fundo 'Queremos comer sentados' (Mesa)",
    description: 'Cota para a nossa Mesa com Cadeiras. Comer com o prato na mão sentados no chão cansa rápido.',
    price: 750.00,
    imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 29,
    category: 'PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL',
    title: "Almofada 'Hoje a janta é por sua conta'",
    description: 'Para comunicação visual rápida quando a fome apertar e o cansaço do trabalho vencer os dois.',
    price: 136.61,
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 30,
    category: 'PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL',
    title: 'Curso de caligrafia para listas de mercado',
    description: 'Para o marido não errar as marcas dos produtos ou trazer o legume totalmente errado.',
    price: 110.00,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 31,
    category: 'PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL',
    title: "Kit Emergencial 'Fazer as pazes rápido'",
    description: 'Um belo combo de delivery japonês ou pizzaria premium para selar a paz após uma teimosia.',
    price: 300.00,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop&q=80'
  },
  {
    id: 32,
    category: 'PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL',
    title: "Fundo 'O Caução do Aluguel acabou com a gente'",
    description: 'Uma força real no orçamento para recuperarmos o fôlego depois de pagar a entrada da casa alugada.',
    price: 700.00,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop&q=80'
  }
];

const CATEGORIES = [
  'TODOS',
  'DESAFIOS DA COZINHA',
  'FAXINA, LAVANDERIA & CONFORTO',
  'ALUGUEL & BOLETOS DA VIDA REAL',
  'PAZ CONJUGAL & SOBREVIVÊNCIA ESTRUTURAL'
];

export default function GiftsPage() {
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('TODOS');
  
  // Estado local para persistir as compras feitas durante a navegação
  const [boughtGifts, setBoughtGifts] = useState<number[]>([]);

  // Carrega presentes já comprados armazenados localmente para não sumir ao recarregar a página
  useEffect(() => {
    const saved = localStorage.getItem('amanda_guilherme_bought_gifts');
    if (saved) {
      try {
        setBoughtGifts(JSON.parse(saved));
      } catch (err) {
        console.error('Erro ao ler presentes comprados:', err);
      }
    }
  }, []);

  const handleOpenModal = (gift: GiftItem) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGift(null);
  };

  const handleConfirmGift = (guestName: string) => {
    if (!selectedGift) return;
    
    const updated = [...boughtGifts, selectedGift.id];
    setBoughtGifts(updated);
    localStorage.setItem('amanda_guilherme_bought_gifts', JSON.stringify(updated));
  };

  // Filtra itens com base na categoria selecionada
  const filteredGifts = activeCategory === 'TODOS'
    ? GIFT_ITEMS
    : GIFT_ITEMS.filter(gift => gift.category === activeCategory);

  return (
    <div className="py-12 sm:py-16 bg-off-white min-h-[90vh] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Página */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-light-lilac text-primary text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="h-3 w-3 text-secondary" />
            <span>Gestos de Carinho</span>
          </div>
          <h2 className="font-title text-3xl sm:text-5xl font-bold text-primary flex items-center justify-center gap-2.5">
            Lista de Presentes
            <Heart className="h-6 w-6 text-secondary fill-secondary animate-pulse" />
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-4 mb-5 rounded-full" />
          <p className="font-body text-sm sm:text-base text-text-dark/75 leading-relaxed">
            Queridos amigos e familiares, sua presença é nosso maior presente! Se você deseja nos abençoar com algo a mais, criamos duas formas especiais para nos presentear abaixo:
          </p>
        </div>

        {/* SELETOR DE MODO DE PRESENTE: Pix vs Amazon (Conforme Regra do Topo da Página) */}
        <div className="max-w-4xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Opção A: Contribuição via Pix (Dinheiro) */}
          <div className="bg-white border border-border-lilac rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="font-title text-lg sm:text-xl font-bold text-primary">
                  Cotas Virtuais (Pix)
                </h3>
              </div>
              <p className="font-body text-xs sm:text-sm text-text-dark/70 leading-relaxed">
                Escolha uma das cotas cômicas e divertidas em nossa lista de presentes logo abaixo. O pagamento é via Pix e nos ajuda diretamente a mobiliar nossa casinha nova do nosso jeito!
              </p>
            </div>
            <button
              onClick={() => {
                const element = document.getElementById('lista-cotas-pix');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-6 w-full py-3 bg-primary text-white font-body font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-primary/95 transition-all duration-300 flex items-center justify-center space-x-1.5"
            >
              <span>Ver Cotas de Pix</span>
            </button>
          </div>

          {/* Opção B: Lista Física da Amazon (Lista Oficial Configurada pelo Usuário) */}
          <a
            href="https://www.amazon.com.br/hz/wishlist/ls/1C9X2S18ENM91?ref_=wl_share"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-border-lilac rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 group"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                  <ExternalLink className="h-6 w-6" />
                </div>
                <h3 className="font-title text-lg sm:text-xl font-bold text-primary">
                  Lista de Casamento (Amazon)
                </h3>
              </div>
              <p className="font-body text-xs sm:text-sm text-text-dark/70 leading-relaxed">
                Se você prefere nos presentear com um item físico (como eletrodomésticos, enxoval e utensílios), criamos uma lista oficial na Amazon com itens selecionados com muito amor.
              </p>
            </div>
            <div className="mt-6 w-full py-3 bg-amber-500 text-white font-body font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-amber-600 transition-all duration-300 flex items-center justify-center space-x-1.5">
              <span>Ir para a Lista Amazon</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </a>
        </div>

        {/* Separador e início da lista de Pix */}
        <div id="lista-cotas-pix" className="scroll-mt-24 pt-4 border-t border-border-lilac/50 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-title text-2xl font-bold text-primary">
                Cotas Divertidas de Casamento
              </h3>
              <p className="font-body text-xs sm:text-sm text-text-dark/60 mt-1">
                Selecione a cota virtual abaixo para presentear via Pix
              </p>
            </div>
            
            {/* Informação sutil sobre Pix */}
            <div className="flex items-center space-x-2 bg-light-lilac/30 border border-border-lilac/60 px-4 py-2 rounded-xl text-[11px] font-body text-text-dark/70 max-w-sm">
              <Info className="h-4 w-4 text-secondary shrink-0" />
              <span>Ao confirmar o presente, o card ficará desativado para outros convidados.</span>
            </div>
          </div>
        </div>

        {/* Filtros de Categorias para Facilitar a Navegação */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-body text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-text-dark/70 border border-border-lilac/80 hover:bg-light-lilac/40 hover:text-primary'
              }`}
            >
              {cat === 'TODOS' ? 'Todos os Itens' : cat}
            </button>
          ))}
        </div>

        {/* Grid de Presentes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              title={gift.title}
              price={gift.price}
              description={gift.description}
              imageUrl={gift.imageUrl}
              isBought={boughtGifts.includes(gift.id)}
              onGift={() => handleOpenModal(gift)}
            />
          ))}
        </div>

        {/* Modal de Confirmação do Pix */}
        {selectedGift && (
          <PixModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            giftTitle={selectedGift.title}
            giftValue={selectedGift.price}
            onConfirm={handleConfirmGift}
          />
        )}

      </div>
    </div>
  );
}

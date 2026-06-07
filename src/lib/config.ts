/**
 * ==========================================
 * CONFIGURAÇÃO DO CASAMENTO (AMANDA & GUILHERME)
 * ==========================================
 * 
 * Este arquivo centraliza todas as informações mutáveis do site.
 * Você pode editar os valores abaixo de forma rápida e segura!
 */

export const CONFIG = {
  // ==========================================
  // 🔑 CHAVE PIX DOS NOIVOS (EDITAR AQUI)
  // ==========================================
  PIX_KEY: "amandaeguilherme2027@pix.com.br",

  // ==========================================
  // 📅 DATA E HORA DO CASAMENTO (Horário de Brasília)
  // ==========================================
  WEDDING_DATE: new Date('2027-01-24T15:00:00-09:00'),

  // ==========================================
  // 📍 LOCAL DO CASAMENTO
  // ==========================================
  LOCATION_NAME: "Sítio Della Torre",
  LOCATION_ADDRESS: "Estrada Municipal, 270 - Jardim Sandra, Mairiporã - SP, CEP: 07631-315",
  GOOGLE_MAPS_IFRAME_URL: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3664.4684073169747!2d-46.5694025!3d-23.298758!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceedb3abfe6b33%3A0x147842871e75b3a7!2sS%C3%ADtio%20Della%20Torre!5e0!3m2!1spt-BR!2sbr!4v1780418948462!5m2!1spt-BR!2sbr",

  // ==========================================
  // 🔒 SENHA DO PAINEL DO ADMINISTRADOR
  // ==========================================
  ADMIN_PASSWORD: "amandaeguilherme2027",

  // ==========================================
  // 🌸 IMAGEM DE FUNDO DA CONFIRMAÇÃO DE PRESENÇA
  // ==========================================
  // Como trocar: 
  //   1. Coloque a foto desejada em public/images/fundo-confirmacao.jpg
  //   2. Mude o valor abaixo para '/images/fundo-confirmacao.jpg'
  // ==========================================
  CONFIRMATION_BG: 'https://images.unsplash.com/photo-1490750967868-88aa4a44faa4?w=1200&q=80',

  // ==========================================
  // 📸 FOTOS DO CASAL — Seção "Nossa História"
  // ==========================================
  // Como trocar as fotos:
  //   1. Coloque seus arquivos dentro da pasta: public/images/casal/
  //      Ex: public/images/casal/foto1.jpg
  //   2. No campo "src" abaixo, troque pela URL local:
  //      Ex: src: '/images/casal/foto1.jpg'
  //   3. Você também pode usar um link direto de qualquer imagem da internet.
  //
  // Dica: Use fotos no formato quadrado (1:1) para ficarem bonitas nessa seção.
  // ==========================================
  COUPLE_PHOTOS: [
    {
      src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=500&fit=crop&q=80',
      label: 'Sorrisos e Promessas',
    },
    {
      src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=500&h=500&fit=crop&q=80',
      label: 'De Mãos Dadas para o Futuro',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=500&fit=crop&q=80',
      label: 'O Abraço mais Seguro',
    },
    {
      src: 'https://images.unsplash.com/photo-1544116421-3f9c9f704b8a?w=500&h=500&fit=crop&q=80',
      label: 'Olhando na Mesma Direção',
    },
  ],

  // ==========================================
  // 🏡 FOTOS DO LOCAL — Seção "Local & Data"
  // ==========================================
  // Como trocar as fotos:
  //   1. Coloque seus arquivos dentro da pasta: public/images/local/
  //      Ex: public/images/local/salao.jpg
  //   2. No campo "src" abaixo, troque pela URL local:
  //      Ex: src: '/images/local/salao.jpg'
  //
  // Dica: Use fotos no formato paisagem (16:9) para ficarem melhores aqui.
  // ==========================================
  LOCAL_PHOTOS: [
    {
      src: '/images/local/jardim.jpeg',
      label: 'Jardim Encantado',
    },
    {
      src: 'images/local/salao.jpeg',
      label: 'Salão Rústico',
    },
    {
      src: 'images/local/mesas.jpeg',
      label: 'Mesas ao Ar Livre',
    },
    {
      src: 'images/local/flores.jpeg',
      label: 'Detalhes Florais',
    },
  ],

  // ==========================================
  // 📧 E-MAIL DE LOGIN DO ADMINISTRADOR
  // ==========================================
  // Como funciona:
  //   1. Cadastre esse e-mail no painel de Authentication do seu Supabase.
  //   2. Use esse e-mail e a senha que escolheu para fazer login na área /admin.
  // ==========================================
  ADMIN_EMAIL: 'amandaeguilherme2027@gmail.com',

  // ==========================================
  // 👥 PADRINHOS & MADRINHAS
  // ==========================================
  // Como trocar as fotos:
  //   1. Coloque os arquivos dentro da pasta: public/images/padrinhos/
  //      Ex: public/images/padrinhos/joao.jpg
  //   2. Mude o valor de "image" abaixo para '/images/padrinhos/joao.jpg'
  //
  // Dica: Use fotos quadradas ou verticais focadas no rosto.
  // ==========================================
  PADRINHOS: [
    {
      name: 'João Silva',
      role: 'Padrinho do Noivo',
      description: 'O irmão de coração que a vida me deu para estar sempre presente.',
      image: '', // Fica vazio para usar o placeholder inicial
    },
    {
      name: 'Maria Santos',
      role: 'Madrinha da Noiva',
      description: 'Minha melhor amiga e conselheira de todas as horas.',
      image: '',
    },
    {
      name: 'Carlos Oliveira',
      role: 'Padrinho',
      description: 'Amigo leal que sempre apoia e alegra nossa caminhada.',
      image: '',
    },
    {
      name: 'Ana Souza',
      role: 'Madrinha',
      description: 'Parceira de risadas e momentos inesquecíveis desde a infância.',
      image: '',
    },
  ],
};

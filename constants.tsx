
export const COLORS = {
  light: {
    offWhite: '#FAFAF8',
    graphite: '#1A1A1A',
    mediumGraphite: '#4A4A4A',
    champagne: '#D4AF37', // Intense Champagne
    warmGray: '#7A7A7A'
  },
  dark: {
    background: '#0F0F0F',
    foreground: '#E5E5E5',
    mediumGraphite: '#A0A0A0',
    champagne: '#D4AF37',
    warmGray: '#8E8E8E'
  }
};

export const SUBSCRIPTION_PLANS = [
  { id: 'monthly', name: 'Mensal', price: 99, period: 'mês', features: ['Acesso 24/7 Antony.ia', 'Briefings Mensais', 'Alertas Globais'] },
  { id: 'quarterly', name: 'Trimestral', price: 267, period: '3 meses', discount: '10% OFF', features: ['Tudo do Mensal', 'Dossiê Exclusivo', 'Prioridade de Auditoria'] },
  { id: 'annual', name: 'Anual', price: 999, period: 'ano', discount: '15% OFF', features: ['Tudo do Trimestral', 'Sessão 1:1 Marcello Antony', 'Acesso VIP Hubs'] }
];

export const TESTIMONIALS = [
  {
    name: "Ricardo S.",
    role: "CEO Tech Holding",
    country: "Portugal",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    before: "Preso à jurisdição brasileira, sentindo o capital derreter por incerteza política.",
    decision: "Estruturação via Hub Portugal e alocação em fundos de arbitragem global LV3.",
    after: "Liberdade geográfica total. Patrimônio blindado em 3 moedas e expansão EU em curso."
  },
  {
    name: "Helena M.",
    role: "Fundadora",
    country: "EAU",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    before: "Operação local limitada e carga tributária sufocante sobre dividendos.",
    decision: "Migração de tese para o Business Metafísico e abertura de Holding em Dubai.",
    after: "Imposto zero sobre dividendos. Foco 100% na visão. O mundo virou meu escritório."
  },
  {
    name: "Arthur D.",
    role: "Investidor",
    country: "Espanha",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    before: "Alta performance técnica, mas visão curta. Medo de dar o próximo passo global.",
    decision: "Protocolo SMQ identificou falha na Consciência do Observador. Mentoría LV3.",
    after: "Operando além-fronteiras. Sociedade em 4 novos negócios internacionais em 1 ano."
  }
];

export const SECTIONS = [
  { id: 'hero', label: 'Início', icon: '01' },
  { id: 'expansion', label: 'Expansão', icon: '02' },
  { id: 'world-field', label: 'Campo', icon: '03' },
  { id: 'metaphysical', label: 'Metafísico', icon: '04' },
  { id: 'observer-detail', label: 'Observador', icon: '05' },
  { id: 'host', label: 'Curador', icon: '06' },
  { id: 'tech', label: 'Tecnologia', icon: '07' },
  { id: 'antonyia', label: 'Antony.ia', icon: '08' },
  { id: 'library', label: 'Biblioteca', icon: '09' },
  { id: 'digital-products', label: 'Produtos', icon: '10' },
  { id: 'testimonials', label: 'Cases', icon: '11' },
  { id: 'subscription', label: 'Assinatura', icon: '12' },
  { id: 'concierge', label: 'Global', icon: '13' },
  { id: 'physical-products', label: 'Simbolismo', icon: '14' },
  { id: 'ecosystem', label: 'Sinergia', icon: '15' }
];

export const SMQ_DIMENSIONS = [
  {
    id: 'observer',
    name: 'Consciência do Observador',
    description: 'Capacidade de assumir responsabilidade total pela realidade percebida.',
    longDescription: 'A realidade não é algo externo que acontece com você; é um reflexo da sua arquitetura mental. Pontuação máxima exige 100% de autorresponsabilidade.'
  },
  {
    id: 'direction',
    name: 'Direção & Convicção',
    description: 'Clareza inegociável do destino, permitindo flexibilidade total no caminho.',
    longDescription: 'Ter uma visão de 10 a 20 anos tão sólida que o destino se torna inevitável. Sem uma direção clara, o esforço é dissipado.'
  },
  {
    id: 'competence',
    name: 'Dupla Competência',
    description: 'Domínio técnico operacional somado ao domínio da arquitetura mental.',
    longDescription: 'O equilíbrio entre a excelência no "fazer" e a excelência no "ser". Um mestre técnico sem visão é um escravo; um visionário sem técnica é um sonhador.'
  },
  {
    id: 'sacrifice',
    name: 'Sacrifício & Risco',
    description: 'Disposição consciente de alocar tempo, capital e ego em prol da visão.',
    longDescription: 'O que você está disposto a abandonar? A expansão exige a morte de versões anteriores do seu ego e a alocação deliberada de recursos.'
  },
  {
    id: 'expansion',
    name: 'Expansão Coletiva',
    description: 'Capacidade de escalar a visão através de pessoas e sistemas.',
    longDescription: 'O poder de atuar como um catalisador. Criar sistemas e lideranças que operam a sua visão sem a sua presença física constante.'
  }
];

export const PRODUCTS_CONFIG = [
  {
    id: "tier-1",
    tier: "01",
    category: "Entrada",
    title: "Briefings & Dossiês",
    description: "Guias práticos e playbooks de decisão por país e tema estratégico.",
    objective: "Clareza tática imediata.",
    price: 47,
    currency: "EUR",
    cta: "Acessar Acervo → Mapeamento de Oportunidades"
  },
  {
    id: "tier-2",
    tier: "02",
    category: "Recorrência",
    title: "Assinatura Concierge",
    description: "Acesso premium ao Antony.ia, alertas globais e missões exclusivas.",
    objective: "Continuidade e inteligência 24/7.",
    price: 99,
    currency: "EUR",
    isSubscription: true,
    cta: "Ativar Concierge → Alertas Globais 24/7"
  },
  {
    id: "tier-3",
    tier: "03",
    category: "Decisão",
    title: "Diagnóstico Estratégico",
    description: "Sessões direcionadas para alinhamento de tese pessoal ou empresarial.",
    objective: "Refino de arquitetura mental.",
    price: 1500,
    currency: "EUR",
    cta: "Agendar Diagnóstico → Clareza em 90min"
  },
  {
    id: "tier-4",
    tier: "04",
    category: "Expansão",
    title: "Consultoria Global",
    description: "Estruturação fiscal e jurídica internacional com parceiros locais.",
    objective: "Materialização além-fronteiras.",
    price: 10000,
    currency: "EUR",
    cta: "Aplicar para Vaga → Estruturação Internacional"
  }
];

export const DIGITAL_PRODUCTS_CONFIG = [
  {
    id: "briefings",
    title: "Briefings Estratégicos",
    showIcon: "globe",
    description: "Análise tática profunda de cenários geopolíticos e territórios específicos para expansão.",
    cta: "Baixar Briefing → Análise Geopolítica",
    price: 47,
    inclusions: ["Relatórios de Jurisdição", "Mapas de Risco", "Análise de Fricção"],
    index: ["01. Panorama Atual", "02. Hubs de Baixa Fricção", "03. Incentivos de Capital"],
    trustSignals: { format: "PDF/Interactive", length: "45-60 páginas", update: "Atualizado Mensalmente" },
    sections: [
      { title: "Mapeamento Geopolítico", content: "Análise fria de estabilidade e abertura de capitais." },
      { title: "Hubs de Inovação", content: "Identificação de zonas de baixa fricção burocrática." }
    ]
  },
  {
    id: "playbooks",
    title: "Playbooks de Execução",
    showIcon: "globe",
    description: "Manuais passo-a-passo para internacionalização de ativos e arquitetura de decisão.",
    cta: "Acessar Playbook → Protocolo de Execução",
    price: 197,
    isFeatured: true,
    inclusions: ["Checklists Operacionais", "Templates Documentais", "Guias de Compliance"],
    index: ["01. Protocolo de Saída", "02. Blindagem Patrimonial", "03. Governança Transcontinental"],
    trustSignals: { format: "Dossiê Técnico", length: "120+ páginas", update: "Revisão Trimestral" },
    samplePreview: {
      chapter: "Capítulo 03",
      title: "Protocolo de Soberania Digital",
      text: "A soberania começa na desconexão da jurisdição de origem. Para o capital, o país é uma plataforma de serviço, não uma pátria. Implementação: Estruturar o Trust Digital em 3 camadas de anonimato estratégico."
    },
    sections: [
      { 
        title: "Protocolo de Saída de Capital", 
        content: "Fluxo documental e compliance para alocação em jurisdições de alto nível. Inclui modelos de declaração de ativos e rotas de transferência legal." 
      },
      { 
        title: "Arquitetura de Holdings", 
        content: "Estruturação de camadas de proteção e anonimato estratégico. Uso de fundações e trusts em jurisdições de common law." 
      },
      { 
        title: "Governance de Vida Global", 
        content: "Checklist de residência, saúde e mobilidade para o operador internacional. Gestão de passaportes e domicílio fiscal." 
      }
    ]
  },
  {
    id: "dossies",
    title: "Dossiês Temáticos",
    showIcon: "flag",
    description: "Aprofundamentos verticais em business metafísico, proteção patrimonial e visão global.",
    cta: "Ler Dossiê → Aprofundamento Estratégico",
    price: 97,
    inclusions: ["Teses Metafísicas", "Entrevistas Exclusivas", "Arquitetura Mental"],
    index: ["01. O Efeito Observador", "02. Capital Invisível", "03. Hard Assets"],
    trustSignals: { format: "White Paper", length: "30-40 páginas", update: "Semestral" },
    sections: [
      { title: "Metafísica de Negócios", content: "Como o observador molda o lucro invisível." },
      { title: "Ouro & Hard Assets", content: "Reserva de valor além do sistema bancário tradicional." }
    ]
  },
  {
    id: "jornadas",
    title: "Jornadas Guiadas",
    showIcon: "globe",
    description: "Sprints estruturados de expansão mental e operacional com foco em resultados mensuráveis.",
    cta: "Iniciar Jornada → Expansão em Sprints",
    price: 497,
    inclusions: ["Workbooks de Decisão", "Sprints de 21 dias", "Suporte Antony.ia"],
    index: ["01. Desconstrução", "02. Arquitetura de Visão", "03. Operacionalização"],
    trustSignals: { format: "Video/Workbook", length: "21 Sprints", update: "Dinâmico" },
    sections: [
      { title: "Módulo Zero: Desconstrução", content: "Eliminação de barreiras geográficas mentais." },
      { title: "Módulo Final: Maestria", content: "Automação da visão através de sistemas autônomos." }
    ]
  }
];

export const REGIONS_CONFIG = [
  { id: 'pt', name: 'Portugal', flag: '🇵🇹', description: 'Base Europeia' },
  { id: 'latam', name: 'LatAm', flag: '🌎', description: 'Estrutura Continental' },
  { id: 'es', name: 'Iberia', flag: '🇪🇸', description: 'Expansão Mediterrânea' },
  { id: 'us', name: 'USA', flag: '🇺🇸', description: 'American Framework' },
  { id: 'gulf', name: 'Gulf', flag: '🇦🇪', description: 'Capital & Holding Hub' },
  { id: 'cn', name: 'China', flag: '🇨🇳', description: 'Industrial & Strategic Access' },
  { id: 'br', name: 'Brasil', flag: '🇧🇷', description: 'Origem & Consolidação' },
];

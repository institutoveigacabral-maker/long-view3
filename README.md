# Long View3 -- Arquitetura de Expansao Global

![CI](https://github.com/institutoveigacabral-maker/long-view3/actions/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Plataforma institucional de expansao global que opera na intersecao entre visao estrategica, negocios internacionais e desenvolvimento de alto nivel. Inclui o clone cognitivo Antony.ia (assistente de auditoria estrategica alimentado por Gemini AI), avaliacao SMQ (Strategic Maturity Quotient), biblioteca digital, produtos de conhecimento e sistema de checkout com conversao multi-moeda.

## Stack Tecnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| IA | Google Gemini AI (@google/genai) |
| Estado | Zustand (persistido em localStorage) |
| Exportacao | jsPDF (relatorios em PDF) |
| Icones | Lucide React |
| Backend | Express (Deno-compatible) com rate limiting |
| Logs | Winston |
| Testes | Vitest |

## Funcionalidades

### Antony.ia -- Clone Cognitivo

- Chat interativo com IA para auditoria estrategica de teses de negocio
- Respostas estruturadas com nivel de risco (baixo/medio/alto/critico)
- Cache inteligente de 24h para respostas recorrentes
- Backend proxy com rate limiting (10 requisicoes por 10 minutos)
- Prompt de sistema especializado em expansao global e business metafisico

### SMQ -- Strategic Maturity Quotient

- Avaliacao em 4 niveis: Reativo, Observador, Operador, Arquiteto
- Grafico radar de dimensoes estrategicas
- Analise personalizada gerada por IA
- Exportacao de relatorio em PDF

### Plataforma

- **Biblioteca Digital** -- acervo de conhecimento estrategico
- **Produtos Digitais** -- camadas de acesso (instrumentos de decisao)
- **Checkout Multi-Moeda** -- conversao EUR/USD/BRL com desconto de abandono (20%)
- **Planos de Assinatura** -- Mensal (R$99), Trimestral (R$267), Anual (R$999)
- **Onboarding** -- fluxo guiado para novos usuarios
- **Exit Intent Popup** -- captura de abandono com oferta
- **Testimonials** -- depoimentos com antes/decisao/depois
- **Cookie Consent** -- conformidade LGPD/GDPR
- **Tema Dark/Light** -- alternancia com persistencia
- **Reduced Motion** -- suporte a acessibilidade

### Regioes de Atuacao

Portugal, America Latina, Iberia, EUA, Golfo (EAU), China, Brasil -- cada regiao como hub estrategico de expansao.

### A/B Testing

- Sistema de experimentacao integrado (hook useExperiment)
- Variantes de texto no hero section
- Tracking de eventos e tempo por secao (analytics)

## Setup Local

### Pre-requisitos

- Node.js 18+
- npm

### Instalacao

```bash
git clone https://github.com/institutoveigacabral-maker/long-view3.git
cd long-view3
npm install
```

### Variaveis de Ambiente

```bash
cp .env.example .env.local
```

Configurar:

- `GEMINI_API_KEY` -- chave da API Google Gemini

### Desenvolvimento

```bash
npm run dev
```

A aplicacao estara disponivel em `http://localhost:5173`.

## Scripts Disponiveis

| Script | Descricao |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Type-check + build de producao |
| `npm run preview` | Preview do build de producao |
| `npm test` | Executa testes (Vitest) |
| `npm run format` | Formatacao de codigo (Prettier) |
| `npm run format:check` | Verificacao de formatacao |

## Arquitetura

```
/
  App.tsx               # Componente raiz com secoes e observers
  index.tsx             # Entry point
  constants.tsx         # Cores, planos, testimonials, regioes
  types.ts              # Tipos TypeScript (Region, Message, SectionProps)
  server.ts             # Backend Express (proxy Gemini AI + rate limiting)
  components/
    ChatInterface.tsx       # Interface do Antony.ia
    SMQAssessment.tsx       # Avaliacao de maturidade estrategica
    Products.tsx            # Catalogo de produtos digitais
    DigitalLibrary.tsx      # Biblioteca de conteudo
    CheckoutModal.tsx       # Modal de checkout multi-moeda
    Testimonials.tsx        # Depoimentos de clientes
    Header.tsx              # Cabecalho com navegacao
    NavigationBar.tsx       # Barra de navegacao por secoes
    Onboarding.tsx          # Fluxo de onboarding
    ExitIntentPopup.tsx     # Popup de intencao de saida
    CookieConsent.tsx       # Banner de consentimento
    ErrorBoundary.tsx       # Tratamento de erros
    ScrollReveal.tsx        # Animacao de scroll
    Skeletons.tsx           # Loading states
    StateLibrary.tsx        # Biblioteca de estados
    ProductPreviewModal.tsx # Preview de produtos
  hooks/
    useExperiment.ts    # A/B testing
  services/
    analytics.ts        # Tracking de eventos e metricas
    geminiService.ts    # Cliente da API Gemini com cache
  store/
    useStore.ts         # Estado global (Zustand) -- chat, SMQ, prefs, checkout
  __tests__/            # Testes unitarios
```

## Deploy

### Build de Producao

```bash
npm run build
```

Os arquivos otimizados serao gerados em `dist/`.

### Frontend (Vercel / Netlify)

1. Conectar o repositorio
2. Build command: `npm run build`
3. Output directory: `dist`
4. Configurar variaveis de ambiente

### Backend (server.ts)

O servidor Express que serve como proxy para a API Gemini pode ser deployado em:

- Deno Deploy (compativel nativamente)
- AWS Lambda / Google Cloud Functions
- Qualquer ambiente Node.js/Deno com suporte a ESM

Configurar `GEMINI_API_KEY` no ambiente de producao.

## Contributing

Ver [CONTRIBUTING.md](CONTRIBUTING.md).

## Licenca

MIT -- ver [LICENSE](LICENSE).

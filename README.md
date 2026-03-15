# Long View -- Avaliacao Estrategica de Negocios

![CI](https://github.com/institutoveigacabral-maker/long-view3/actions/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Plataforma de avaliacao estrategica com SMQ (Strategic Maturity Quotient), integracao com Gemini AI para analises personalizadas, checkout com conversao multi-moeda e planos de assinatura.

## Stack

- React + Vite + TypeScript
- Google Gemini AI (@google/genai)
- jsPDF (exportacao de relatorios)

## Funcionalidades

- Avaliacao SMQ com 4 niveis (Reativo/Observador/Operador/Arquiteto)
- Grafico radar de dimensoes estrategicas
- Analise personalizada via Gemini AI com cache
- Checkout com conversao EUR/USD/BRL
- Desconto de abandono de 20%
- Planos de assinatura

## Setup Local

```bash
git clone https://github.com/institutoveigacabral-maker/long-view3.git
cd long-view3
npm install
cp .env.example .env.local  # configurar variaveis
npm run dev
```

## Testes

```bash
npm test
```

56 testes cobrindo logica de negocio, validacoes e utilitarios.



## Contributing

Ver [CONTRIBUTING.md](CONTRIBUTING.md).

## Licenca

MIT -- ver [LICENSE](LICENSE).

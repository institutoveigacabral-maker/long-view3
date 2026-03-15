
# API Reference — Antony.ia Proxy

## Endpoint: `/api/chat`

Interface de auditoria estratégica baseada em LLM.

### Requisição (POST)

```json
{
  "message": "Minha tese é expandir para o Uruguai focando em gado tokenizado.",
  "history": [
    { "role": "user", "text": "Início do protocolo." },
    { "role": "model", "text": "Instância ativa." }
  ]
}
```

### Resposta (200 OK)

```json
{
  "text": "DIAGNÓSTICO: Tese baseada em ativos tangíveis com camada digital, porém exposta a risco cambial excessivo...",
  "cached": false
}
```

### Rate Limiting
- 10 requisições por IP a cada 10 minutos para evitar abuso de tokens.

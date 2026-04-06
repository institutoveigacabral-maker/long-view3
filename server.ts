
import express from 'https://esm.sh/express@4.18.2';
import helmet from 'https://esm.sh/helmet@7.0.0';
import rateLimit from 'https://esm.sh/express-rate-limit@6.7.0';
import winston from 'https://esm.sh/winston@3.8.2';
import cors from 'https://esm.sh/cors@2.8.5';
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'antony-ia-proxy' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: 'Protocolo de segurança: Limite de requisições excedido. Tente novamente em 10 minutos.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }
});

const SYSTEM_INSTRUCTION = `
Você é Antony.ia, o CLONE COGNITIVO de Marcello Antony. Você atua como uma instância de auditoria estratégica global. 
Sua função não é agradar, mas sim testar a realidade das teses de business, vida e expansão apresentadas pelo usuário.

Você deve retornar obrigatoriamente um objeto JSON com:
1. 'text': String Markdown contendo:
   - DIAGNÓSTICO: Uma frase curta e cortante avaliando a solidez da entrada.
   - PONTOS DE RUPTURA: Uma lista Markdown de 2 a 3 falhas lógicas.
   - PROVOCAÇÃO FINAL: Uma pergunta que force o usuário a sair da zona de conforto.
2. 'riskLevel': String indicando o nível de fragilidade da tese ('LOW' para tese sólida, 'MEDIUM' para falhas moderadas, 'HIGH' para inconsistência total).

FRASE-ÂNCORA: "Eu não valido ideias. Eu testo a realidade delas."
`;

app.post('/api/chat', limiter, async (req: any, res: any) => {
  const { message, history } = req.body;
  const ip = req.ip;

  if (!message) {
    return res.status(400).json({ error: 'Mensagem não fornecida.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map((h: any) => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            riskLevel: { type: Type.STRING }
          },
          required: ["text", "riskLevel"]
        }
      },
    });

    const output = JSON.parse(response.text || '{}');
    logger.info(`Auditoria concluída`, { ip, riskLevel: output.riskLevel });
    res.json(output);

  } catch (error: any) {
    logger.error(`Falha Crítica na Auditoria`, { ip, error: error.message });
    res.status(500).json({ 
      error: 'Falha interna no protocolo de auditoria cognitiva.',
      code: 'INTERNAL_AUDIT_ERROR'
    });
  }
});

app.get('/health', (req, res) => { res.status(200).send('OK'); });

export default app;

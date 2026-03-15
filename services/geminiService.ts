
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

export const getAntonyResponse = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]) => {
  const cacheKey = `antony_cache_${simpleHash(userMessage + JSON.stringify(history.slice(-2)))}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const { response, timestamp, riskLevel } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return { text: response, riskLevel, cached: true };
    }
    localStorage.removeItem(cacheKey);
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history: history }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Falha na comunicação com o servidor de auditoria.');
    }

    const data = await response.json();
    
    localStorage.setItem(cacheKey, JSON.stringify({
      response: data.text,
      riskLevel: data.riskLevel,
      timestamp: Date.now()
    }));

    return { text: data.text, riskLevel: data.riskLevel, cached: false };
  } catch (error: any) {
    console.error("Erro na comunicação com Antony.ia:", error);
    return { 
      text: `**ALERTA DE SISTEMA:** ${error.message || 'Falha na síntese cognitiva.'}\n\nReinicie o protocolo ou tente mais tarde.`, 
      riskLevel: 'HIGH',
      cached: false 
    };
  }
};

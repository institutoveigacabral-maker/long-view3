
import React, { useState, useRef, useEffect } from 'react';
import { getAntonyResponse } from '../services/geminiService';
import { useStore } from '../store/useStore';
import { LoadingState, EmptyState, ErrorState } from './StateLibrary';
import { Terminal, Send, History, LayoutPanelLeft, ChevronRight, X, ShieldAlert, ShieldCheck, ShieldClose } from 'lucide-react';
import { useExperiment } from '../hooks/useExperiment';
import { trackEvent } from '../services/analytics';

const MACROS = [
  { label: "Validar Tese", prompt: "Audite minha tese de expansão global baseada em arbitragem de jurisdição." },
  { label: "Identificar Risco", prompt: "Quais são os principais pontos de ruptura na minha arquitetura de decisão atual?" },
  { label: "Escala Global", prompt: "Como posso escalar minha visão sem depender da minha presença física em cada território?" },
  { label: "Síntese", prompt: "Sintetize os princípios do Business Metafísico aplicados ao meu cenário." }
];

type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | null;

export const ChatInterface: React.FC = () => {
  const { messages, isLoading, error, addMessage, setLoading, setError, clearChat } = useStore();
  const [input, setInput] = useState('');
  const [isCached, setIsCached] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ctaVariant = useExperiment('antonyia_cta');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (customMsg?: string) => {
    const msgToSend = customMsg || input.trim();
    if (!msgToSend || isLoading) return;

    if (messages.length === 0) {
      trackEvent('chat_initiated', { cta_variant: ctaVariant });
    }

    trackEvent('chat_message_sent', { length: msgToSend.length });

    setInput('');
    addMessage({ role: 'user', text: msgToSend });
    setLoading(true);
    setIsCached(false);
    setError(null);

    try {
      const history = messages.slice(-6);
      const result = await getAntonyResponse(msgToSend, history);

      if (result.cached) setIsCached(true);
      setRiskLevel(result.riskLevel as RiskLevel);

      if (result.riskLevel === 'HIGH') {
        trackEvent('chat_high_risk_detected');
      }

      addMessage({ role: 'model', text: result.text });
    } catch (err) {
      setError("Falha na auditoria cognitiva. Protocolo interrompido.");
      trackEvent('chat_error');
    } finally {
      setLoading(false);
    }
  };

  const getBorderColor = () => {
    switch (riskLevel) {
      case 'HIGH': return 'border-red-900/40 shadow-[inset_0_0_20px_rgba(185,28,28,0.05)]';
      case 'MEDIUM': return 'border-orange-500/30';
      case 'LOW': return 'border-champagne/40';
      default: return 'border-white/5';
    }
  };

  const getStatusBadge = () => {
    switch (riskLevel) {
      case 'HIGH': 
        return (
          <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 px-3 py-1 animate-pulse">
            <ShieldClose className="w-3 h-3 text-red-500" />
            <span className="text-[8px] font-ui font-black text-red-500 uppercase tracking-widest">Integridade Crítica</span>
          </div>
        );
      case 'MEDIUM': 
        return (
          <div className="flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1">
            <ShieldAlert className="w-3 h-3 text-orange-500" />
            <span className="text-[8px] font-ui font-black text-orange-500 uppercase tracking-widest">Fragilidade Detectada</span>
          </div>
        );
      case 'LOW': 
        return (
          <div className="flex items-center space-x-2 bg-champagne/10 border border-champagne/20 px-3 py-1">
            <ShieldCheck className="w-3 h-3 text-champagne" />
            <span className="text-[8px] font-ui font-black text-champagne uppercase tracking-widest">Tese Consistente</span>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div 
      className={`w-full max-w-7xl mx-auto flex flex-col lg:flex-row h-[75vh] md:h-[80vh] min-h-[60vh] max-h-[85svh] border transition-all duration-700 bg-[#020202] shadow-2xl relative overflow-hidden ${getBorderColor()}`}
    >
      <aside className={`absolute inset-y-0 left-0 z-30 w-72 bg-[#050505] border-r border-white/5 transition-transform duration-500 transform ${
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:relative lg:block'
      }`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <span className="text-[10px] font-ui text-champagne font-black uppercase tracking-[0.4em]">Audit Stats</span>
            <button onClick={() => setIsDrawerOpen(false)} className="lg:hidden text-white/40 hover:text-white p-2">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-10">
            <div>
              <span className="text-[8px] font-ui uppercase tracking-widest text-white/20 block mb-4">Integridade de Tese</span>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${
                  riskLevel === 'HIGH' ? 'bg-red-500 w-[30%]' : 
                  riskLevel === 'MEDIUM' ? 'bg-orange-500 w-[60%]' : 
                  riskLevel === 'LOW' ? 'bg-champagne w-[90%]' : 'bg-white/10 w-0'
                }`}></div>
              </div>
            </div>

            <div>
              <span className="text-[8px] font-ui uppercase tracking-widest text-white/20 block mb-4">Soberania Cognitiva</span>
              <p className="text-[11px] font-ui text-white/60 leading-relaxed font-medium">
                {riskLevel === 'HIGH' ? 'Fricção crítica detectada na arquitetura de decisão.' : 
                 riskLevel === 'MEDIUM' ? 'Pontos de ruptura identificados na execução.' :
                 'Instância operando em baixa fricção. O observador está ativo.'}
              </p>
            </div>

            <div className="pt-8 border-t border-white/5">
              <span className="text-[8px] font-ui uppercase tracking-widest text-white/20 block mb-4">Jurisdições Analisadas</span>
              <div className="flex flex-wrap gap-2">
                {["PT", "AE", "US", "CH"].map(tag => (
                  <span key={tag} className="text-[9px] font-ui font-black bg-white/[0.03] px-2 py-1 text-white/40 border border-white/5 tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm">
               <span className="text-[8px] font-ui uppercase tracking-widest text-champagne block mb-2 font-black">Status de Buffer</span>
               <p className="text-[9px] font-ui text-white/30 uppercase tracking-widest leading-relaxed">
                 {isCached ? 'Sincronizado Local' : 'Live Global Feed'}
               </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        <div className="p-5 border-b border-white/5 flex items-center justify-between px-6 bg-black/80 backdrop-blur-xl shrink-0">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden p-3 -ml-2 text-white/60 hover:text-white active:scale-90 transition-all min-w-[44px] min-h-[44px]"
              aria-label="Abrir estatísticas"
            >
              <LayoutPanelLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className={`w-1.5 h-1.5 rounded-full ${
                riskLevel === 'HIGH' ? 'bg-red-500 animate-pulse' : 
                riskLevel === 'MEDIUM' ? 'bg-orange-500' :
                riskLevel === 'LOW' ? 'bg-champagne' : 'bg-white/10'
              }`}></div>
              <span className="text-[10px] font-ui text-white/90 font-black uppercase tracking-[0.4em] truncate">Console v3.1</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {getStatusBadge()}
            <button 
              onClick={clearChat}
              className="text-[8px] font-ui text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center space-x-2 group"
            >
              <History className="w-3 h-3" />
              <span className="hidden sm:inline">Limpar Terminal</span>
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 bg-[radial-gradient(circle_at_center,rgba(20,20,20,1)_0%,rgba(2,2,2,1)_100%)]">
          {messages.length === 0 && !isLoading && !error && (
            <EmptyState 
              title="Terminal em Standby" 
              description="Submeta uma tese de negócio, plano de expansão ou dúvida estratégica para auditoria imediata."
            />
          )}

          {error && (
            <ErrorState 
              message={error} 
              onRetry={() => handleSend("Repetir último protocolo.")}
            />
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-700`}>
              <div className={`max-w-[90%] lg:max-w-[75%] group ${
                m.role === 'user' 
                  ? 'bg-white/[0.02] border border-white/5 p-6 rounded-sm hover:border-white/10 transition-colors' 
                  : 'border-l border-champagne/40 pl-6 md:pl-16 py-4 relative'
              }`}>
                {m.role === 'model' && (
                  <div className={`absolute left-[-1px] top-4 w-px h-12 shadow-[0_0_15px_rgba(212,175,55,0.5)] ${
                    riskLevel === 'HIGH' ? 'bg-red-500 shadow-red-500/50' : 
                    riskLevel === 'MEDIUM' ? 'bg-orange-500 shadow-orange-500/50' : 'bg-champagne'
                  }`}></div>
                )}
                
                <div className={`text-[13px] md:text-[14px] leading-[1.8] font-ui tracking-wide transition-colors ${
                  m.role === 'user' ? 'text-white/40 italic group-hover:text-white/60' : 'text-offWhite/80 group-hover:text-offWhite'
                }`}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    {m.text.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[7px] font-ui uppercase text-white/10 tracking-[0.3em] font-black">
                     {m.role === 'user' ? 'Inbound Transmission' : 'Cognitive Synthesis'}
                   </span>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-500">
               <div className="border-l border-white/10 pl-6 md:pl-16 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-champagne rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-champagne rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-champagne rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-[9px] font-ui text-white/20 uppercase tracking-[0.5em] font-black">Sintetizando...</span>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-4 md:p-8 border-t border-white/5 bg-black/95 shrink-0">
          <div className="flex overflow-x-auto gap-3 mb-6 pb-2 no-scrollbar -mx-4 px-4 mask-fade-edges">
            {MACROS.map((macro, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(macro.prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-6 py-3 border border-white/10 text-[9px] font-ui font-black uppercase tracking-[0.2em] text-white/40 hover:text-champagne hover:border-champagne/40 transition-all active:scale-95 bg-white/[0.02] flex items-center space-x-2 min-h-[44px]"
              >
                <span>{macro.label}</span>
                <ChevronRight className="w-3 h-3 opacity-20" />
              </button>
            ))}
          </div>

          <div className="max-w-5xl mx-auto relative flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Insira sua tese estratégica..."
                className="w-full bg-white/[0.03] border border-white/10 p-5 pr-12 text-[13px] text-white focus:outline-none focus:border-champagne/40 transition-all font-ui min-h-[44px]"
              />
              <Terminal className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 pointer-events-none" />
            </div>
            
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-offWhite text-black p-5 text-[10px] font-ui font-black uppercase tracking-[0.2em] hover:bg-champagne hover:text-white transition-all disabled:opacity-5 disabled:cursor-not-allowed group flex items-center gap-2 active:scale-95 min-h-[44px] min-w-[44px] justify-center"
              aria-label="Enviar auditoria"
            >
              <span className="hidden sm:inline mr-2">
                {ctaVariant === 'A' ? 'Auditar' : 'Testar Minha Tese Agora'}
              </span>
              <Send className="w-4 h-4 lg:w-3 lg:h-3 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

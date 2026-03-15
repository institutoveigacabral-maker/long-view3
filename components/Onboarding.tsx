
import React, { useState, useEffect } from 'react';

const ONBOARDING_STEPS = [
  {
    title: "O Observador",
    description: "Sua arquitetura mental precede seus negócios. Este ambiente foi desenhado para testar a solidez da sua visão global.",
    anchor: "hero"
  },
  {
    title: "SMQ Assessment",
    description: "Audite sua maturidade em 5 dimensões inegociáveis. Resultados abaixo de 50 indicam risco estrutural crítico.",
    anchor: "smq"
  },
  {
    title: "Antony.ia",
    description: "Nosso clone cognitivo opera como uma instância de auditoria. Ele não valida ideias; ele expõe falhas lógicas.",
    anchor: "antonyia"
  },
  {
    title: "Concierge Global",
    description: "Opere o mundo como campo. 7 hubs estratégicos para materializar sua expansão geográfica e patrimonial.",
    anchor: "concierge"
  }
];

export const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [hasDismissed, setHasDismissed] = useState(true);

  useEffect(() => {
    const isFirstTime = !localStorage.getItem('lv3-onboarding-complete');
    if (isFirstTime) {
      setTimeout(() => {
        setHasDismissed(false);
        setCurrentStep(0);
      }, 2000);
    }
  }, []);

  const handleNext = () => {
    if (currentStep !== null && currentStep < ONBOARDING_STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const anchor = ONBOARDING_STEPS[nextStep].anchor;
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('lv3-onboarding-complete', 'true');
    setHasDismissed(true);
    setCurrentStep(null);
  };

  if (hasDismissed || currentStep === null) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-700">
      <div className="max-w-md w-full bg-[#FAF9F6] border border-black/5 shadow-2xl p-10 md:p-14 relative overflow-hidden group">
        {/* Grain Overlay inside modal */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-12">
            <span className="text-[10px] font-ui font-black uppercase tracking-[0.5em] text-champagne">
              Protocolo de Integração
            </span>
            <span className="text-[10px] font-ui text-warmGray/40 font-bold">
              0{currentStep + 1} / 0{ONBOARDING_STEPS.length}
            </span>
          </div>

          <h2 className="text-4xl font-editorial italic text-graphite mb-6">
            {ONBOARDING_STEPS[currentStep].title}
          </h2>
          
          <p className="text-[13px] font-ui text-warmGray leading-relaxed mb-12 min-h-[80px]">
            {ONBOARDING_STEPS[currentStep].description}
          </p>

          <div className="flex flex-col space-y-4">
            <button 
              onClick={handleNext}
              className="w-full bg-graphite text-white py-5 text-[10px] font-ui font-black uppercase tracking-[0.3em] hover:bg-black transition-all active:scale-95"
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? 'Iniciar Experiência' : 'Próximo Protocolo'}
            </button>
            <button 
              onClick={handleComplete}
              className="w-full text-warmGray/60 hover:text-graphite py-2 text-[9px] font-ui font-black uppercase tracking-[0.2em] transition-all"
            >
              Pular Introdução
            </button>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-champagne/20 m-4"></div>
      </div>
    </div>
  );
};

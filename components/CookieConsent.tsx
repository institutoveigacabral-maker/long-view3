
import React, { useState, useEffect } from 'react';
import { trackEvent } from '../services/analytics';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lv3-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lv3-cookie-consent', 'accepted');
    setIsVisible(false);
    trackEvent('cookie_consent_accepted');
  };

  const handleDecline = () => {
    localStorage.setItem('lv3-cookie-consent', 'declined');
    setIsVisible(false);
    trackEvent('cookie_consent_declined');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[600] p-6 animate-in slide-in-from-bottom-full duration-700">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#0F0F0F] border border-black/5 dark:border-white/5 p-6 md:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <span className="text-[10px] font-ui font-black uppercase tracking-[0.4em] text-champagne mb-2 block">Privacidade & Protocolo</span>
          <p className="text-[11px] font-ui text-warmGray leading-relaxed uppercase tracking-widest opacity-80">
            Utilizamos cookies para auditar sua experiência e otimizar a tese de navegação global. Ao prosseguir, você aceita nossa arquitetura de dados.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={handleDecline}
            className="flex-1 md:w-32 py-4 text-[9px] font-ui font-black uppercase tracking-widest text-warmGray/40 hover:text-graphite dark:hover:text-white transition-all"
          >
            Recusar
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:w-48 bg-graphite dark:bg-offWhite text-white dark:text-black py-4 text-[9px] font-ui font-black uppercase tracking-[0.3em] hover:bg-black dark:hover:bg-white transition-all shadow-xl"
          >
            Aceitar Protocolo
          </button>
        </div>
      </div>
    </div>
  );
};

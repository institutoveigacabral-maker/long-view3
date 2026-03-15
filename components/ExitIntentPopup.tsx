
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Gift } from 'lucide-react';
import { useStore } from '../store/useStore';
import { trackEvent } from '../services/analytics';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const setCheckout = useStore(state => state.setCheckout);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        trackEvent('exit_intent_triggered');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white dark:bg-[#0F0F0F] border border-champagne/20 p-10 md:p-14 relative shadow-2xl overflow-hidden">
        <button 
          onClick={() => { setIsVisible(false); trackEvent('exit_intent_dismissed'); }} 
          className="absolute top-6 right-6 p-2 text-warmGray hover:text-graphite dark:hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-champagne/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Gift className="w-8 h-8 text-champagne" />
          </div>

          <span className="text-[10px] font-ui font-black uppercase tracking-[0.4em] text-champagne mb-4 block">Oferta de Retenção</span>
          <h2 className="text-3xl font-editorial italic text-graphite dark:text-offWhite mb-6">Ainda não terminou de expandir?</h2>
          
          <p className="text-sm font-ui text-warmGray dark:text-warmGray/60 mb-10 leading-relaxed">
            Não deixe sua tese de negócio incompleta. Use o cupom <span className="text-graphite dark:text-white font-black">OBSERVADOR20</span> para 20% de desconto em qualquer dossiê.
          </p>

          <button 
            onClick={() => {
              setIsVisible(false);
              setCheckout({ title: 'Acesso VIP de Retenção', price: 37, id: 'retention-offer' });
              trackEvent('exit_intent_accepted');
            }}
            className="w-full bg-graphite dark:bg-offWhite text-white dark:text-black py-5 text-[10px] font-ui font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-black dark:hover:bg-white transition-all active:scale-95"
          >
            <span>Resgatar Desconto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

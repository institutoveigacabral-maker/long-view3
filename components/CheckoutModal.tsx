
import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CreditCard, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SUBSCRIPTION_PLANS } from '../constants';
import { SuccessState, LoadingState } from './StateLibrary';
import { useExperiment } from '../hooks/useExperiment';
import { trackEvent } from '../services/analytics';

export const CheckoutModal: React.FC = () => {
  const { activeCheckout, setCheckout, setSubscription } = useStore();
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'BRL'>('EUR');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'sepa'>('card');
  const [selectedPlan, setSelectedPlan] = useState(SUBSCRIPTION_PLANS[0]);
  const [showAbandonmentOffer, setShowAbandonmentOffer] = useState(false);
  
  const priceVariant = useExperiment('pricing_tier');
  const rates = { EUR: 1, USD: 1.08, BRL: 5.42 };

  // PROMPT 21: Test 3 - Monthly vs Quarterly prominence
  useEffect(() => {
    if (priceVariant === 'B') {
      setSelectedPlan(SUBSCRIPTION_PLANS[1]); // Quarterly
    }
  }, [priceVariant]);

  useEffect(() => {
    if (activeCheckout) {
      trackEvent('checkout_started', { product: activeCheckout.title, variant: priceVariant });
    }
  }, [activeCheckout, priceVariant]);
  
  const basePrice = activeCheckout?.isSubscription ? selectedPlan.price : (activeCheckout?.price || 0);
  const finalPrice = showAbandonmentOffer ? basePrice * 0.8 : basePrice;
  const convertedPrice = (finalPrice * rates[currency]).toFixed(2);

  if (!activeCheckout) return null;

  const handleProcess = () => {
    setStep('processing');
    trackEvent('payment_processing', { method: paymentMethod, amount: finalPrice });
    setTimeout(() => {
      setStep('success');
      trackEvent('purchase_complete', { product: activeCheckout.title, amount: finalPrice });
      if (activeCheckout.isSubscription) {
        setSubscription(selectedPlan.id as any);
      }
    }, 2000);
  };

  const close = () => {
    if (step === 'details' && !showAbandonmentOffer) {
      setShowAbandonmentOffer(true);
      trackEvent('checkout_abandonment_offer_shown');
      return;
    }
    setCheckout(null);
    setStep('details');
    setShowAbandonmentOffer(false);
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-lg animate-in fade-in duration-500">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0F0F0F] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh]">
        
        {step === 'processing' && <div className="absolute inset-0 z-50 bg-white/90 dark:bg-black/90 flex items-center justify-center"><LoadingState message="Autorizando Protocolo Financeiro..." /></div>}
        {step === 'success' && (
          <div className="absolute inset-0 z-50 bg-white dark:bg-black flex flex-col items-center justify-center p-12 text-center">
            <SuccessState 
              message="Acesso Protocolado." 
              submessage={`O download de ${activeCheckout.title} foi enviado para seu email. Auditoria desbloqueada.`} 
            />
            <button onClick={() => { setCheckout(null); setStep('details'); }} className="mt-8 bg-graphite text-white px-12 py-4 text-[10px] font-ui font-black uppercase tracking-[0.3em] active:scale-95 transition-all">
              Voltar ao Hub
            </button>
          </div>
        )}

        <div className="w-full md:w-80 bg-offWhite dark:bg-[#151515] border-r border-black/5 dark:border-white/5 p-8 md:p-12 overflow-y-auto">
          <button onClick={close} className="absolute top-6 right-6 z-50 p-2 text-graphite/40 hover:text-graphite dark:text-white/40 dark:hover:text-white"><X className="w-6 h-6" /></button>
          
          <span className="text-[10px] font-ui font-black uppercase tracking-[0.4em] text-champagne mb-8 block">Checkout LV3</span>
          <h2 className="text-2xl font-editorial italic mb-8 leading-tight text-graphite dark:text-offWhite">{activeCheckout.title}</h2>
          
          <div className="space-y-6">
            <div className="pb-6 border-b border-black/5 dark:border-white/5">
              <span className="text-[8px] font-ui uppercase tracking-widest text-warmGray mb-2 block">Total a Investir</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-editorial italic text-graphite dark:text-offWhite">{convertedPrice}</span>
                <span className="text-xs font-ui text-warmGray font-bold">{currency}</span>
              </div>
              {showAbandonmentOffer && (
                <div className="mt-2 text-[9px] font-ui font-black text-green-600 dark:text-green-400 uppercase tracking-widest animate-pulse">
                  20% OFF APLICADO
                </div>
              )}
            </div>

            <div className="space-y-4">
              <span className="text-[8px] font-ui uppercase tracking-widest text-warmGray block">Moeda de Operação</span>
              <div className="flex gap-2">
                {(['EUR', 'USD', 'BRL'] as const).map(c => (
                  <button 
                    key={c}
                    onClick={() => { setCurrency(c); trackEvent('currency_switched', { to: c }); }}
                    className={`flex-1 py-2 text-[9px] font-ui font-black border transition-all ${
                      currency === c 
                      ? 'bg-graphite text-white border-graphite dark:bg-offWhite dark:text-black dark:border-offWhite' 
                      : 'border-black/10 text-warmGray hover:border-graphite dark:border-white/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 opacity-40">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldCheck className="w-4 h-4 text-champagne" />
              <span className="text-[8px] font-ui uppercase tracking-widest text-graphite dark:text-offWhite font-bold">Safe Protocol 256-bit</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-16 bg-white dark:bg-[#0F0F0F]">
          {activeCheckout.isSubscription && step === 'details' && (
            <div className="mb-12">
              <span className="text-[10px] font-ui font-black uppercase tracking-[0.4em] text-champagne mb-8 block">Selecione seu Protocolo</span>
              <div className="grid grid-cols-1 gap-4">
                {SUBSCRIPTION_PLANS.map(plan => (
                  <div 
                    key={plan.id}
                    onClick={() => { setSelectedPlan(plan); trackEvent('plan_selected', { plan_id: plan.id }); }}
                    className={`p-6 border cursor-pointer transition-all flex justify-between items-center group ${
                      selectedPlan.id === plan.id 
                      ? 'border-champagne bg-champagne/[0.03]' 
                      : 'border-black/5 dark:border-white/5 hover:border-black/20'
                    } ${priceVariant === 'B' && plan.id === 'quarterly' ? 'ring-1 ring-champagne' : ''}`}
                  >
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="text-[11px] font-ui font-black uppercase tracking-widest text-graphite dark:text-offWhite">{plan.name}</span>
                        {(plan.discount || (priceVariant === 'B' && plan.id === 'quarterly')) && (
                          <span className="text-[7px] font-ui bg-champagne text-white px-1.5 py-0.5 font-black uppercase">
                            {plan.id === 'quarterly' && priceVariant === 'B' ? 'RECOMENDADO' : plan.discount}
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] font-ui text-warmGray tracking-wider">{plan.features.slice(0, 2).join(' • ')}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-editorial italic text-graphite dark:text-offWhite">€{plan.price}</span>
                      <span className="text-[8px] font-ui text-warmGray block">/{plan.period}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[9px] font-ui text-warmGray italic">* 7 dias de trial gratuito inclusos. Cobrança automática após o período.</p>
            </div>
          )}

          <div className="space-y-8">
            {showAbandonmentOffer && (
              <div className="p-6 bg-green-500/5 border border-green-500/20 text-center animate-in zoom-in-95 duration-500">
                <p className="text-[11px] font-ui font-black text-green-600 dark:text-green-400 uppercase tracking-widest">
                  Protocolo de Retenção Ativo: Desconto de 20% aplicado para sua primeira liquidação.
                </p>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[9px] font-ui font-black uppercase tracking-widest text-warmGray block">Email Institucional</label>
                <input type="email" placeholder="operador@dominio.com" className="w-full bg-offWhite dark:bg-white/[0.03] border-b border-black/10 dark:border-white/10 p-4 text-[12px] font-ui focus:outline-none focus:border-champagne" />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-ui font-black uppercase tracking-widest text-warmGray block">Nome Completo</label>
                <input type="text" placeholder="Nome Sobrenome" className="w-full bg-offWhite dark:bg-white/[0.03] border-b border-black/10 dark:border-white/10 p-4 text-[12px] font-ui focus:outline-none focus:border-champagne" />
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-black/5 dark:border-white/5">
              <label className="text-[9px] font-ui font-black uppercase tracking-widest text-warmGray block">Método de Liquidação</label>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => setPaymentMethod('card')} className={`p-4 border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-champagne bg-champagne/5' : 'border-black/5 dark:border-white/5 opacity-40 hover:opacity-100'}`}>
                  <CreditCard className="w-5 h-5 text-graphite dark:text-white" />
                  <span className="text-[8px] font-ui uppercase font-black tracking-widest">Cartão</span>
                </button>
                <button onClick={() => setPaymentMethod('paypal')} className={`p-4 border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-500/5' : 'border-black/5 dark:border-white/5 opacity-40 hover:opacity-100'}`}>
                  <Landmark className="w-5 h-5 text-graphite dark:text-white" />
                  <span className="text-[8px] font-ui uppercase font-black tracking-widest">PayPal</span>
                </button>
                <button onClick={() => setPaymentMethod('sepa')} className={`p-4 border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'sepa' ? 'border-graphite bg-black/5' : 'border-black/5 dark:border-white/5 opacity-40 hover:opacity-100'}`}>
                  <ArrowRight className="w-5 h-5 text-graphite dark:text-white" />
                  <span className="text-[8px] font-ui uppercase font-black tracking-widest">SEPA</span>
                </button>
              </div>
            </div>

            <div className="pt-12">
              <button 
                onClick={handleProcess}
                className="w-full bg-graphite dark:bg-offWhite text-white dark:text-black py-6 text-[11px] font-ui font-black uppercase tracking-[0.4em] shadow-xl hover:bg-black dark:hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-4"
              >
                <span>Finalizar Liquidação Protocolada</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-6 text-[8px] font-ui text-warmGray text-center uppercase tracking-[0.2em] opacity-40">Processamento Seguro via LV3 Infrastructure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

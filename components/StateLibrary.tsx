
import React from 'react';
import { Loader2, Inbox, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = "Sintetizando Protocolo..." }) => (
  <div className="flex flex-col items-center justify-center p-20 animate-in fade-in duration-700">
    <div className="relative">
      <Loader2 className="w-12 h-12 text-champagne animate-spin mb-6" />
      <div className="absolute inset-0 w-12 h-12 border-2 border-champagne/10 rounded-full"></div>
    </div>
    <span className="text-[10px] font-ui text-warmGray uppercase tracking-[0.5em] font-black animate-pulse">
      {message}
    </span>
  </div>
);

export const EmptyState: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center p-20 text-center animate-in zoom-in-95 duration-500">
    <div className="w-16 h-px bg-champagne/20 mb-10"></div>
    <Inbox className="w-8 h-8 text-warmGray/20 mb-8" strokeWidth={1} />
    <h4 className="text-xl font-editorial italic text-graphite dark:text-offWhite mb-4">{title}</h4>
    <p className="text-[11px] font-ui text-warmGray leading-relaxed max-w-xs uppercase tracking-widest opacity-60">
      {description}
    </p>
    <div className="w-16 h-px bg-champagne/20 mt-10"></div>
  </div>
);

export const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-20 text-center animate-in slide-in-from-top-4 duration-500">
    <AlertTriangle className="w-10 h-10 text-red-500/40 mb-8" strokeWidth={1.5} />
    <span className="text-[9px] font-ui text-red-600 uppercase tracking-[0.4em] mb-4 font-black">Falha de Protocolo</span>
    <p className="text-sm font-ui text-warmGray mb-10 max-w-sm">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="border border-graphite/10 dark:border-white/10 px-10 py-4 text-[9px] font-ui font-black uppercase tracking-[0.3em] hover:bg-graphite hover:text-white dark:hover:bg-offWhite dark:hover:text-black transition-all"
      >
        Reiniciar Sincronização
      </button>
    )}
  </div>
);

export const SuccessState: React.FC<{ message: string; submessage?: string }> = ({ message, submessage }) => (
  <div className="flex flex-col items-center justify-center p-20 text-center animate-in scale-in-95 duration-700">
    <div className="w-20 h-20 rounded-full border border-champagne/20 flex items-center justify-center mb-10 relative">
      <CheckCircle2 className="w-10 h-10 text-champagne animate-in zoom-in-50 duration-500" strokeWidth={1} />
      <div className="absolute inset-0 border-2 border-champagne rounded-full animate-ping opacity-20"></div>
    </div>
    <h4 className="text-2xl font-editorial italic text-graphite dark:text-offWhite mb-4">{message}</h4>
    {submessage && (
      <p className="text-[10px] font-ui text-warmGray uppercase tracking-widest leading-relaxed">
        {submessage}
      </p>
    )}
  </div>
);

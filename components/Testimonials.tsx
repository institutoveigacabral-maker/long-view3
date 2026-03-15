
import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const item = TESTIMONIALS[current];

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto py-24 px-6 md:px-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ScrollReveal className="text-center mb-20">
         <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-champagne mb-6 block font-black">Transformação Real</span>
         <h2 className="text-4xl md:text-6xl font-editorial italic text-graphite dark:text-offWhite">Arquitetos de Realidade.</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-center min-h-[400px]">
        {/* User Card */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-champagne/20 p-2">
              <img src={item.photo} alt={item.name} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-graphite p-3 rounded-full shadow-xl border border-black/5 dark:border-white/5">
              <Globe className="w-5 h-5 text-champagne" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-editorial italic text-graphite dark:text-offWhite mb-1">{item.name}</h4>
            <p className="text-[10px] font-ui font-black uppercase tracking-widest text-warmGray mb-3">{item.role}</p>
            <span className="text-[9px] font-ui text-champagne border border-champagne/20 px-3 py-1 uppercase tracking-widest">Hub {item.country}</span>
          </div>
        </div>

        {/* Narrative */}
        <div className="relative space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
          <Quote className="absolute -top-12 -left-8 w-24 h-24 text-black/[0.03] dark:text-white/[0.03] -z-10" />
          
          <div className="space-y-10">
            <div className="group">
              <span className="text-[8px] font-ui uppercase tracking-widest text-warmGray/40 block mb-2 font-black group-hover:text-red-500/40 transition-colors">Antes: O Limite</span>
              <p className="text-lg md:text-xl font-ui text-warmGray dark:text-warmGray/60 leading-relaxed font-medium italic">"{item.before}"</p>
            </div>
            
            <div className="flex items-center space-x-6 py-4 border-l-2 border-champagne pl-8">
              <span className="text-[8px] font-ui uppercase tracking-widest text-champagne block mb-1 font-black">Decisão LV3</span>
              <p className="text-sm md:text-base font-ui text-graphite dark:text-offWhite font-bold uppercase tracking-widest">{item.decision}</p>
            </div>

            <div className="group">
              <span className="text-[8px] font-ui uppercase tracking-widest text-warmGray/40 block mb-2 font-black group-hover:text-green-500/40 transition-colors">Depois: A Expansão</span>
              <p className="text-xl md:text-2xl font-editorial italic text-graphite dark:text-offWhite leading-relaxed">"{item.after}"</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center pt-12 border-t border-black/5 dark:border-white/5">
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, i) => (
                <div key={i} className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-8 bg-champagne' : 'w-2 bg-black/10 dark:bg-white/10'}`}></div>
              ))}
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="p-4 border border-black/5 dark:border-white/5 hover:bg-offWhite dark:hover:bg-white/5 transition-all active:scale-90"
              >
                <ArrowLeft className="w-5 h-5 text-warmGray" />
              </button>
              <button 
                onClick={() => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)}
                className="p-4 border border-black/5 dark:border-white/5 hover:bg-offWhite dark:hover:bg-white/5 transition-all active:scale-90"
              >
                <ArrowRight className="w-5 h-5 text-warmGray" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
        {[
          { label: "Jurisdições Ativas", val: "14+" },
          { label: "Capitais Operadas", val: "120+" },
          { label: "Membros Protocolados", val: "2.5k+" },
          { label: "Hubs Globais", val: "07" }
        ].map((badge, i) => (
          <div key={i} className="text-center border-t border-black/5 dark:border-white/5 pt-8">
            <div className="text-3xl font-editorial italic text-graphite dark:text-offWhite mb-2">{badge.val}</div>
            <div className="text-[8px] font-ui uppercase tracking-widest text-warmGray font-black">{badge.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

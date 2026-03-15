
import React from 'react';
import { PRODUCTS_CONFIG } from '../constants';
import { useStore } from '../store/useStore';
import { ScrollReveal } from './ScrollReveal';

export const Products: React.FC = () => {
  const setCheckout = useStore(state => state.setCheckout);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
      {PRODUCTS_CONFIG.map((product, idx) => (
        <div 
          key={idx} 
          className="bg-white p-10 md:p-14 flex flex-col justify-between group hover:bg-graphite transition-all duration-700 min-h-[550px] relative overflow-hidden"
        >
          {/* Background Number Reveal */}
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
             <span className="text-[15rem] font-editorial font-bold leading-none text-black group-hover:text-white">{product.tier}</span>
          </div>

          <div>
            <div className="flex justify-between items-start mb-12">
              <span className="text-[9px] font-ui font-black uppercase tracking-[0.4em] text-champagne">
                Nível {product.tier}
              </span>
              <span className="text-[8px] font-ui font-bold uppercase tracking-[0.2em] text-warmGray/60 group-hover:text-white/40 transition-colors">
                {product.category}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-editorial italic text-graphite group-hover:text-white mb-6 leading-tight transition-colors">
              {product.title}
            </h3>
            
            <p className="text-[13px] font-ui text-warmGray group-hover:text-white/60 leading-relaxed mb-8 transition-colors font-medium">
              {product.description}
            </p>

            <div className="pt-8 border-t border-black/5 group-hover:border-white/10">
              <span className="text-[9px] font-ui uppercase tracking-[0.3em] text-warmGray/40 group-hover:text-champagne/60 block mb-2 font-bold">
                Objetivo Central
              </span>
              <p className="text-[11px] font-ui text-graphite group-hover:text-white font-black uppercase tracking-widest transition-colors">
                {product.objective}
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <div className="text-xl font-editorial italic text-graphite group-hover:text-champagne transition-colors">
              {product.price === 10000 ? 'Sob Consulta' : `€${product.price}`}
            </div>
            <button 
              onClick={() => setCheckout(product)}
              className="w-full py-4 border border-black/10 text-[10px] font-ui font-black uppercase tracking-[0.3em] group-hover:bg-white group-hover:text-black group-hover:border-white transition-all active:scale-95 leading-relaxed px-6"
            >
              {product.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

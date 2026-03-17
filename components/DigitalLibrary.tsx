
import React, { useState } from 'react';
import { DIGITAL_PRODUCTS_CONFIG } from '../constants';
import { useStore, type StoreState } from '../store/useStore';
import { ProductPreviewModal } from './ProductPreviewModal';
import { Globe, Flag } from 'lucide-react';

export const DigitalLibrary: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [modalProduct, setModalProduct] = useState<any>(null);
  const setCheckout = useStore((state: StoreState) => state.setCheckout);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setActiveSection(null);
      setShowPreview(false);
    } else {
      setExpandedId(id);
      setActiveSection(null);
      setShowPreview(false);
    }
  };

  const openFullPreview = (product: any) => {
    setModalProduct(product);
  };

  return (
    <div className="relative">
      <ProductPreviewModal 
        isOpen={!!modalProduct} 
        onClose={() => setModalProduct(null)} 
        product={modalProduct} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {DIGITAL_PRODUCTS_CONFIG.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          
          return (
            <div 
              key={item.id} 
              className={`flex flex-col border-l transition-all duration-700 relative ${
                isExpanded 
                ? 'border-champagne bg-black/[0.02] p-8 -m-4 z-20 shadow-2xl scale-[1.02]' 
                : 'border-black/5 pl-8 py-4 group hover:border-champagne/40'
              }`}
            >
              {item.isFeatured && (
                <div className={`absolute top-0 right-0 p-2 transition-opacity duration-700 ${isExpanded ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-2 h-2 rounded-full bg-champagne shadow-[0_0_10px_rgba(197,179,88,0.5)] animate-pulse"></div>
                </div>
              )}

              <span className={`text-[10px] font-ui mb-6 font-bold tracking-[0.3em] transition-colors ${
                isExpanded ? 'text-champagne' : 'text-warmGray/40'
              }`}>
                0{idx + 1}
              </span>
              
              <h3 className={`text-2xl font-editorial italic mb-4 transition-all flex items-center gap-2 ${
                isExpanded ? 'text-graphite scale-110 origin-left' : 'text-graphite group-hover:text-champagne'
              }`}>
                {item.title}
                {item.showIcon === 'globe' && <Globe className="w-3.5 h-3.5 text-champagne/40 shrink-0" strokeWidth={1.5} />}
                {item.showIcon === 'flag' && <Flag className="w-3.5 h-3.5 text-champagne/40 shrink-0" strokeWidth={1.5} />}
              </h3>
              
              <p className={`text-[12px] font-ui leading-relaxed mb-8 font-medium transition-colors ${
                isExpanded ? 'text-graphite' : 'text-warmGray'
              }`}>
                {item.description}
              </p>

              {/* Enhanced Accordion for Expanded Items */}
              {isExpanded && (
                <div className="mt-4 mb-8 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] font-ui uppercase tracking-[0.4em] text-champagne font-black">
                      Arquitetura do Documento
                    </span>
                    <button 
                      onClick={() => openFullPreview(item)}
                      className="text-[8px] font-ui uppercase tracking-[0.2em] text-graphite/40 hover:text-champagne font-black border-b border-black/5 hover:border-champagne transition-all"
                    >
                      [Ver Dossiê Completo]
                    </button>
                  </div>

                  {/* Sample Mini-Reader Preview */}
                  {showPreview && item.samplePreview && (
                    <div className="bg-white p-6 border border-black/5 shadow-inner mb-6 animate-in zoom-in-95 duration-500">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-[8px] font-ui uppercase text-champagne border border-champagne px-1.5 py-0.5 tracking-tighter">{item.samplePreview.chapter}</span>
                        <h5 className="text-[10px] font-ui font-black uppercase tracking-widest">{item.samplePreview.title}</h5>
                      </div>
                      <p className="text-[11px] font-ui text-warmGray italic leading-[1.8] border-l border-champagne/20 pl-4">
                        "{item.samplePreview.text}"
                      </p>
                      <div className="mt-4 flex justify-end">
                        <span className="text-[7px] font-ui uppercase text-warmGray/20">Página 12 de 184 — LV3-Confidencial</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {item.sections?.map((section, sIdx) => (
                      <div key={sIdx} className="bg-white/40 border border-black/5 rounded-sm transition-all">
                        <button 
                          onClick={() => setActiveSection(activeSection === sIdx ? null : sIdx)}
                          className={`w-full p-4 flex justify-between items-center text-left group/sec transition-colors ${activeSection === sIdx ? 'bg-white' : ''}`}
                        >
                          <span className={`text-[9px] font-ui uppercase tracking-widest font-bold transition-colors ${
                            activeSection === sIdx ? 'text-champagne' : 'text-graphite'
                          }`}>
                            {section.title}
                          </span>
                          <span className={`transform transition-transform duration-500 ${activeSection === sIdx ? 'rotate-180 text-champagne' : 'text-black/10'}`}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                              <path d="M6 9l6 6 6-6"/>
                            </svg>
                          </span>
                        </button>
                        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                          activeSection === sIdx ? 'max-h-60 opacity-100 p-4 border-t border-black/5' : 'max-h-0 opacity-0'
                        }`}>
                          <p className="text-[11px] font-ui text-warmGray leading-relaxed font-medium">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-6 flex flex-col gap-4">
                <button 
                  onClick={() => toggleExpand(item.id)}
                  className={`text-[9px] font-ui font-black uppercase tracking-[0.3em] flex items-center transition-all group/exp ${
                    isExpanded ? 'text-warmGray hover:text-graphite' : 'text-champagne/60 hover:text-champagne'
                  }`}
                >
                  <span className="relative">
                    {isExpanded ? 'Recolher Estrutura' : 'Ver Detalhes Técnicos'}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all group-hover/exp:w-full"></span>
                  </span>
                  {!isExpanded && (
                    <svg className="ml-2 w-3 h-3 transition-transform group-hover/exp:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  )}
                </button>

                <button 
                  onClick={() => setCheckout(item)}
                  className={`w-full py-4 text-[10px] font-ui font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 active:scale-95 ${
                  isExpanded 
                  ? 'bg-graphite text-white hover:bg-black shadow-xl' 
                  : 'text-graphite hover:text-champagne border-b border-transparent hover:border-champagne/20'
                }`}>
                  {item.cta}
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {!expandedId && (
        <div className="mt-16 text-center animate-bounce opacity-20">
           <svg className="w-4 h-4 mx-auto text-graphite" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
           </svg>
        </div>
      )}
    </div>
  );
};

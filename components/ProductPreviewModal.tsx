
import React from 'react';

interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-graphite/40 hover:text-graphite transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Sidebar Info */}
        <div className="w-full md:w-80 bg-white border-r border-black/5 p-8 md:p-12 overflow-y-auto">
          <span className="text-[10px] font-ui font-black uppercase tracking-[0.4em] text-champagne mb-8 block">Dossiê Institucional</span>
          <h2 className="text-3xl font-editorial italic mb-8 leading-tight">{product.title}</h2>
          
          <div className="space-y-10">
            <div>
              <span className="text-[9px] font-ui font-black uppercase tracking-[0.2em] text-graphite/30 block mb-4">Incluso no Protocolo</span>
              <ul className="space-y-3">
                {product.inclusions?.map((inc: string, i: number) => (
                  <li key={i} className="flex items-center space-x-3 text-[11px] font-ui font-medium text-warmGray">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne/40"></span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[9px] font-ui font-black uppercase tracking-[0.2em] text-graphite/30 block mb-4">Trust Signals</span>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(product.trustSignals || {}).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-[8px] font-ui uppercase tracking-tighter text-warmGray/40 block mb-1">{key}</span>
                    <span className="text-[10px] font-ui font-bold text-graphite uppercase">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Preview Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-16 relative bg-[url('https://www.transparenttextures.com/patterns/p6.png')] bg-fixed opacity-[0.98]">
           {/* Index Section */}
           <div className="mb-20">
             <span className="text-[10px] font-ui font-black uppercase tracking-[0.5em] text-champagne mb-12 block">Índice Analítico</span>
             <div className="space-y-6">
                {product.index?.map((item: string, i: number) => (
                  <div key={i} className="flex justify-between items-baseline border-b border-black/5 pb-2 group cursor-default">
                    <span className="text-lg font-editorial italic text-graphite/80 group-hover:text-graphite transition-colors">{item}</span>
                    <span className="text-[10px] font-ui text-warmGray/30 font-black">PAG. {Math.floor(Math.random() * 50) + 1}</span>
                  </div>
                ))}
             </div>
           </div>

           {/* Blurred Partial Content */}
           <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF9F6]/80 to-[#FAF9F6] z-10"></div>
             <div className="blur-[8px] select-none pointer-events-none opacity-40">
                <span className="text-[9px] font-ui uppercase tracking-[0.6em] text-champagne mb-8 block font-black">Amostra Parcial de Conteúdo</span>
                <h3 className="text-5xl font-editorial italic mb-8">Arquitetura de Holdings Transcontinentais</h3>
                <p className="text-sm font-ui leading-[2] text-warmGray mb-8">
                  A soberania começa na desconexão da jurisdição de origem. Para o capital, o país é uma plataforma de serviço, não uma pátria. Implementação: Estruturar o Trust Digital em 3 camadas de anonimato estratégico. Toda holding deve ser vista como um silo de responsabilidade limitada...
                </p>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-black/5"></div>
                  <div className="h-4 w-[90%] bg-black/5"></div>
                  <div className="h-4 w-[95%] bg-black/5"></div>
                  <div className="h-4 w-[85%] bg-black/5"></div>
                </div>
             </div>

             {/* CTA Overlay */}
             <div className="absolute inset-x-0 bottom-0 z-20 pb-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-px bg-champagne mb-8"></div>
                <p className="text-[11px] font-ui text-graphite uppercase tracking-[0.4em] font-black mb-8">Conteúdo Restrito a Membros Protocolados</p>
                <button className="bg-graphite text-white px-12 py-5 text-[11px] font-ui font-black uppercase tracking-[0.4em] hover:bg-black transition-all shadow-2xl active:scale-95">
                  {product.cta}
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

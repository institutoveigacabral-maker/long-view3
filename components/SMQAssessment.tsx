
import React, { useState, useMemo, useEffect } from 'react';
import { SMQ_DIMENSIONS } from '../constants';
import { useStore } from '../store/useStore';
import { FileDown, Target, TrendingUp, Award, Zap, X, Info } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { trackEvent } from '../services/analytics';

export const SMQAssessment: React.FC = () => {
  const scores = useStore(state => state.scores) as Record<string, number>;
  const setScore = useStore(state => state.setScore);
  const [modalDimension, setModalDimension] = useState<typeof SMQ_DIMENSIONS[0] | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasChangedAny, setHasChangedAny] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScoreChange = (id: string, value: number) => {
    setScore(id, value);
    if (!hasChangedAny) {
      setHasChangedAny(true);
      trackEvent('smq_started');
    }
  };

  const totalScore = (Object.values(scores) as number[]).reduce((a, b) => a + b, 0);

  const getLevel = (score: number) => {
    if (score >= 90) return { label: 'Arquiteto Quântico', desc: 'Domínio total da realidade e expansão.', icon: <Award className="w-6 h-6" />, color: 'text-champagne' };
    if (score >= 70) return { label: 'Operador Avançado', desc: 'Padrões consistentes, em fase de escala.', icon: <TrendingUp className="w-6 h-6" />, color: 'text-blue-500' };
    if (score >= 50) return { label: 'Observador Ativo', desc: 'Consciência presente, mas execução oscilante.', icon: <Zap className="w-6 h-6" />, color: 'text-orange-400' };
    return { label: 'Reativo', desc: 'A realidade ainda domina o observador.', icon: <Target className="w-6 h-6" />, color: 'text-warmGray' };
  };

  const level = getLevel(totalScore);

  const radarPoints = useMemo(() => {
    const angleStep = (Math.PI * 2) / SMQ_DIMENSIONS.length;
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 100;

    return SMQ_DIMENSIONS.map((dim, i) => {
      const score = scores[dim.id] || 0;
      const radius = (score / 20) * maxRadius;
      const angle = i * angleStep - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        labelX: centerX + (maxRadius + 20) * Math.cos(angle),
        labelY: centerY + (maxRadius + 20) * Math.sin(angle),
        label: dim.name.split(' ')[0]
      };
    });
  }, [scores]);

  const radarPath = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  const exportToPDF = async () => {
    setIsExporting(true);
    trackEvent('smq_exported', { score: totalScore });
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("LONG VIEW3", 105, 30, { align: "center" });
    
    doc.setFontSize(14);
    doc.text("Relatório de Maturidade Quântica (SMQ)", 105, 45, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Data da Auditoria: ${new Date().toLocaleDateString()}`, 105, 55, { align: "center" });
    
    doc.line(20, 65, 190, 65);
    
    doc.setFontSize(12);
    doc.text(`Score Total: ${totalScore}/100`, 20, 80);
    doc.text(`Nível Alcançado: ${level.label}`, 20, 90);
    
    let y = 110;
    SMQ_DIMENSIONS.forEach(dim => {
      doc.text(`${dim.name}: ${scores[dim.id]}/20`, 20, y);
      y += 10;
    });

    doc.setFontSize(8);
    doc.text("© 2024 Long View3 - Protocolo Confidencial", 105, 280, { align: "center" });
    
    doc.save(`SMQ_Report_${totalScore}.pdf`);
    setIsExporting(false);
  };

  useEffect(() => {
    if (totalScore > 10) {
      trackEvent('smq_completed', { score: totalScore, level: level.label });
    }
  }, [totalScore, level.label]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 animate-in fade-in duration-1000 pb-20 relative">
      {/* Dimension Detail Modal */}
      {modalDimension && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="max-w-md w-full bg-offWhite dark:bg-[#121212] border border-champagne/20 shadow-2xl p-8 md:p-12 relative animate-in scale-in-95 zoom-in-95 duration-300">
            <button 
              onClick={() => setModalDimension(null)}
              className="absolute top-4 right-4 p-2 text-warmGray hover:text-graphite dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-[10px] font-ui font-black uppercase tracking-[0.5em] text-champagne mb-4 block">Dimensão SMQ</span>
            <h3 className="text-3xl font-editorial italic text-graphite dark:text-offWhite mb-6">{modalDimension.name}</h3>
            <p className="text-sm font-ui text-warmGray dark:text-warmGray/70 leading-relaxed italic border-l-2 border-champagne pl-6 py-2">
              {modalDimension.longDescription}
            </p>
            <div className="mt-10 flex justify-end">
              <button 
                onClick={() => setModalDimension(null)}
                className="text-[9px] font-ui font-black uppercase tracking-widest text-graphite dark:text-offWhite hover:text-champagne transition-colors"
              >
                Retornar ao Diagnóstico
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 bg-white dark:bg-[#0F0F0F] border border-black/5 dark:border-white/5 p-8 md:p-14 shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-start mb-16">
          <div>
            <h3 className="text-3xl font-editorial italic mb-4 text-graphite dark:text-offWhite">SMQ Assessment</h3>
            <p className="text-[10px] font-ui uppercase tracking-[0.4em] text-warmGray dark:text-warmGray/60 font-black">Diagnóstico de Maturidade</p>
          </div>
          <button 
            onClick={exportToPDF}
            disabled={isExporting}
            className="flex items-center space-x-3 text-[9px] font-ui font-black uppercase tracking-widest text-champagne hover:text-graphite dark:hover:text-offWhite transition-colors disabled:opacity-30 p-2 min-h-[44px]"
          >
            <FileDown className="w-5 h-5 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">{isExporting ? 'Exportando...' : 'Exportar PDF'}</span>
          </button>
        </div>

        <div className="space-y-16">
          {SMQ_DIMENSIONS.map((dim) => {
            const currentScore = scores[dim.id];
            
            return (
              <div key={dim.id} className="group">
                <div className="flex justify-between items-end mb-4">
                  <div className="relative flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-[12px] font-ui font-black uppercase tracking-[0.2em] text-graphite dark:text-offWhite transition-colors">{dim.name}</h4>
                      <button 
                        onClick={() => {
                          setModalDimension(dim);
                          trackEvent('smq_info_clicked', { dimension: dim.id });
                        }}
                        className="w-11 h-11 md:w-6 md:h-6 rounded-full border border-black/10 dark:border-white/10 text-[10px] flex items-center justify-center transition-all hover:bg-champagne hover:text-white hover:border-champagne active:scale-125 focus:outline-none text-warmGray dark:hover:text-black dark:hover:bg-offWhite"
                        aria-label={`Mais informações sobre ${dim.name}`}
                      >
                        <Info className="w-3.5 h-3.5 md:w-3 md:h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-1 shrink-0">
                    <span className="text-2xl font-editorial italic text-graphite dark:text-offWhite">{currentScore}</span>
                    <span className="text-[10px] text-warmGray/30 font-black">/20</span>
                  </div>
                </div>

                <div className="relative py-6">
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-1">
                    {[0, 5, 10, 15, 20].map(m => (
                      <div key={m} className="flex flex-col items-center">
                        <div className={`h-2 w-px mb-1 ${currentScore >= m ? 'bg-champagne' : 'bg-black/10 dark:bg-white/10'}`}></div>
                        <span className="text-[7px] font-ui text-warmGray/40 font-black">{m}</span>
                      </div>
                    ))}
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={currentScore}
                    onChange={(e) => handleScoreChange(dim.id, parseInt(e.target.value))}
                    className="w-full h-1 bg-black/[0.03] dark:bg-white/[0.03] appearance-none cursor-pointer relative z-10 accent-champagne"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full lg:w-[400px] flex flex-col gap-8">
        <div className="bg-white dark:bg-[#0F0F0F] border border-black/5 dark:border-white/5 p-8 flex flex-col items-center shadow-sm">
          <span className="text-[9px] font-ui font-black uppercase tracking-[0.4em] text-warmGray/40 mb-10">Assinatura SMQ</span>
          
          <div className="relative w-full max-w-[300px] aspect-square">
            <svg width="100%" height="100%" viewBox="0 0 300 300" className="overflow-visible">
              {[0.2, 0.4, 0.6, 0.8, 1].map((r, idx) => (
                <circle key={idx} cx="150" cy="150" r={100 * r} fill="none" stroke="currentColor" className="text-black/[0.03] dark:text-white/[0.03]" />
              ))}
              {radarPoints.map((p, i) => (
                <line key={i} x1="150" y1="150" x2={p.labelX} y2={p.labelY} stroke="currentColor" className="text-black/[0.03] dark:text-white/[0.03]" strokeDasharray="2 2" />
              ))}
              {radarPoints.map((p, i) => (
                <text key={i} x={p.labelX} y={p.labelY} textAnchor="middle" className="text-[8px] font-ui font-black fill-warmGray/60 uppercase tracking-tighter" dy="0.3em">{p.label}</text>
              ))}
              <path d={radarPath} fill="rgba(212, 175, 55, 0.1)" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" className="transition-all duration-700" />
            </svg>
          </div>

          <div className="mt-8 flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-champagne"></div>
              <span className="text-[8px] font-ui uppercase font-black text-warmGray">Real</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 border border-dashed border-warmGray/40"></div>
              <span className="text-[8px] font-ui uppercase font-black text-warmGray/40">Benchmark</span>
            </div>
          </div>
        </div>

        <div className={`p-10 border-l-4 shadow-sm transition-all duration-700 ${totalScore < 50 ? 'border-warmGray bg-warmGray/[0.02]' : 'border-champagne bg-champagne/[0.02]'}`}>
           <div className="flex items-center justify-between mb-6">
             <div className={`${level.color} opacity-60`}>{level.icon}</div>
             <div className="text-4xl font-editorial italic text-graphite dark:text-offWhite animate-in fade-in slide-in-from-left-4 duration-1000">
               {totalScore}<span className="text-lg opacity-20">/100</span>
             </div>
           </div>
           <h4 className="text-[12px] font-ui font-black uppercase tracking-[0.3em] mb-4 text-graphite dark:text-offWhite transition-all duration-500">
             {level.label}
           </h4>
           <p className="text-[11px] font-ui text-warmGray dark:text-warmGray/60 leading-relaxed font-medium">
             {level.desc}
           </p>
        </div>
      </div>
    </div>
  );
};


import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ScrollReveal } from './components/ScrollReveal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SectionSkeleton } from './components/Skeletons';
import { NavigationBar } from './components/NavigationBar';
import { Onboarding } from './components/Onboarding';
import { CheckoutModal } from './components/CheckoutModal';
import { ExitIntentPopup } from './components/ExitIntentPopup';
import { CookieConsent } from './components/CookieConsent';
import { REGIONS_CONFIG, SECTIONS } from './constants';
import { useStore } from './store/useStore';
import { useExperiment } from './hooks/useExperiment';
import { trackEvent, trackTimeOnSection } from './services/analytics';

const SMQAssessment = lazy(() => import('./components/SMQAssessment').then(m => ({ default: m.SMQAssessment })));
const Products = lazy(() => import('./components/Products').then(m => ({ default: m.Products })));
const DigitalLibrary = lazy(() => import('./components/DigitalLibrary').then(m => ({ default: m.DigitalLibrary })));
const ChatInterface = lazy(() => import('./components/ChatInterface').then(m => ({ default: m.ChatInterface })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));

const App: React.FC = () => {
  const theme = useStore(state => state.theme);
  const heroVariant = useExperiment('hero_text');
  const sectionTimes = useRef<Record<string, number>>({});

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    trackEvent('app_initialized', { variant_hero: heroVariant });
  }, [theme, heroVariant]);

  useEffect(() => {
    const trackedSections = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (!trackedSections.has(id)) {
            trackEvent('section_viewed', { section_id: id });
            trackedSections.add(id);
          }
          sectionTimes.current[id] = Date.now();
        } else {
          const id = entry.target.id;
          if (sectionTimes.current[id]) {
            const duration = Date.now() - sectionTimes.current[id];
            trackTimeOnSection(id, duration);
          }
        }
      });
    }, { threshold: 0.5 });

    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen selection:bg-champagne selection:text-white relative bg-offWhite dark:bg-[#0F0F0F] transition-colors duration-300">
        <Header />
        <NavigationBar />
        <Onboarding />
        <ErrorBoundary>
          <CheckoutModal />
        </ErrorBoundary>
        <ExitIntentPopup />
        <CookieConsent />

        <main className="overflow-x-hidden">
          {/* 01: HERO */}
          <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105" 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-offWhite/95 via-offWhite/80 to-offWhite dark:from-[#0F0F0F]/95 dark:via-[#0F0F0F]/80 dark:to-[#0F0F0F]"></div>
            
            <ScrollReveal className="relative z-10 w-full max-w-5xl mx-auto">
              <h1 className="text-[18vw] md:text-[12rem] lg:text-[14rem] mb-4 tracking-tighter text-graphite dark:text-offWhite leading-[0.8] font-editorial select-none">
                {heroVariant === 'A' ? (
                  <>LONG <br /> VIEW3</>
                ) : (
                  <>SAIR DO <br /> BRASIL</>
                )}
              </h1>
              <p className="font-ui text-[10px] md:text-xs uppercase tracking-[0.5em] text-warmGray dark:text-warmGray mb-12 font-black opacity-60">
                Arquitetura de Expansão Global
              </p>
              <div className="w-px h-16 md:h-24 bg-graphite/20 dark:bg-white/20 mx-auto mb-12"></div>
              <p className="font-editorial text-xl md:text-3xl italic text-graphite/80 dark:text-offWhite/80 max-w-3xl mx-auto leading-tight px-4">
                "A realidade não é algo que acontece com você. É algo que responde à sua arquitetura de decisão."
              </p>
            </ScrollReveal>
          </section>

          <Suspense fallback={<SectionSkeleton />}>
            <section id="expansion" className="py-24 md:py-40 px-6 bg-white dark:bg-[#121212] border-y border-black/[0.03] dark:border-white/[0.03]">
              <div className="max-w-6xl mx-auto">
                <ScrollReveal className="text-center mb-24 md:mb-32">
                  <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-champagne mb-6 block font-black">O Chamado</span>
                  <h2 className="text-4xl md:text-7xl mb-10 font-editorial italic tracking-tight text-graphite dark:text-offWhite">Viver além das fronteiras.</h2>
                  <p className="text-sm md:text-base font-ui text-warmGray dark:text-warmGray max-w-2xl mx-auto leading-relaxed font-medium">
                    Expansão de vida, visão e negócios. Para quem opera o mundo como campo — não como limite geográfico ou burocrático.
                  </p>
                </ScrollReveal>
              </div>
            </section>

            <section id="world-field" className="py-24 md:py-40 bg-offWhite dark:bg-[#0F0F0F]">
              <div className="max-w-7xl mx-auto px-6 text-center">
                 <ScrollReveal>
                   <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-warmGray/40 mb-8 block font-black">Mundo como Campo</span>
                   <h2 className="text-4xl md:text-8xl mb-16 font-editorial italic opacity-10 dark:opacity-5 leading-none text-graphite dark:text-offWhite">Global Awareness</h2>
                   <div className="max-w-3xl mx-auto text-xl italic font-editorial text-graphite/70 dark:text-offWhite/70">
                     "Fronteiras são construções mentais materializadas em mapas. No Long View3, países são infraestruturas modulares para a sua visão."
                   </div>
                 </ScrollReveal>
              </div>
            </section>

            <section id="metaphysical" className="py-24 md:py-40 px-6 bg-white dark:bg-[#121212]">
              <div className="max-w-6xl mx-auto">
                <ScrollReveal className="text-center mb-24 md:mb-32">
                  <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-champagne mb-6 block font-black">Conceito Central</span>
                  <h2 className="text-4xl md:text-7xl mb-10 font-editorial italic tracking-tight text-graphite dark:text-offWhite">Business Metafísico.</h2>
                  <p className="text-sm md:text-base font-ui text-warmGray dark:text-warmGray max-w-2xl mx-auto leading-relaxed font-medium">
                    Toda realidade empresarial se forma primeiro no invisível — na mente, na visão, na arquitetura de decisão — e só depois se materializa em patrimônio.
                  </p>
                </ScrollReveal>
              </div>
            </section>

            <section id="observer-detail" className="py-24 md:py-40 px-6 bg-white dark:bg-[#121212] border-y border-black/[0.03] dark:border-white/[0.03]">
              <div className="max-w-6xl mx-auto">
                <ScrollReveal className="text-center mb-24 md:mb-32">
                  <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-champagne mb-6 block font-black">O Método Quântico</span>
                  <h2 className="text-4xl md:text-7xl mb-10 font-editorial italic tracking-tight text-graphite dark:text-offWhite">O Observador Ativo.</h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4">
                  {[
                    { label: 'Observador', desc: 'Responsabilidade total.' },
                    { label: 'Direção', desc: 'Destino inegociável.' },
                    { label: 'Competência', desc: 'Domínio técnico.' },
                    { label: 'Sacrifício', desc: 'Alocação de risco.' },
                    { label: 'Expansão', desc: 'Escala sistêmica.' }
                  ].map((step, idx) => (
                    <ScrollReveal key={idx} threshold={0.1 * idx} className="bg-offWhite dark:bg-[#0F0F0F] p-10 border border-transparent hover:border-black/5 dark:hover:border-white/5 hover:shadow-xl transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="text-6xl font-editorial font-bold italic text-graphite dark:text-offWhite">{idx + 1}</span>
                      </div>
                      <span className="text-[10px] font-ui text-warmGray block mb-6 font-bold tracking-widest">PASSO 0{idx + 1}</span>
                      <h4 className="text-[14px] font-ui font-black uppercase tracking-widest mb-3 group-hover:text-champagne transition-colors text-graphite dark:text-offWhite">{step.label}</h4>
                      <h4 className="text-[11px] font-ui text-warmGray/80 leading-relaxed font-medium">{step.desc}</h4>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            <section id="host" className="py-24 md:py-40 bg-white dark:bg-[#121212]">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                <ScrollReveal>
                   <div className="aspect-[3/4] bg-gray-200 dark:bg-[#222] relative overflow-hidden group shadow-2xl">
                     <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-transparent transition-all duration-700"></div>
                     <img 
                       src="https://images.慎unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974" 
                       alt="Marcello Antony" 
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                     />
                   </div>
                </ScrollReveal>
                <ScrollReveal>
                  <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-champagne mb-6 block font-black">Curadoria de Visão</span>
                  <h2 className="text-5xl md:text-7xl mb-8 font-editorial italic text-graphite dark:text-offWhite">Marcello Antony.</h2>
                  <p className="text-base font-ui text-warmGray dark:text-warmGray leading-relaxed mb-8">
                    Anfitrião e curador do Long View3. Sua jornada de expansão transcontinental serve como base para a arquitetura de decisão que compartilhamos.
                  </p>
                  <div className="w-16 h-px bg-champagne mb-8"></div>
                  <p className="font-editorial italic text-2xl text-graphite/70 dark:text-offWhite/70">
                    "O mundo é grande demais para ser visto de uma única janela."
                  </p>
                </ScrollReveal>
              </div>
            </section>

            <section id="tech" className="py-24 md:py-40 bg-black text-white">
               <div className="max-w-7xl mx-auto px-6 text-center">
                 <ScrollReveal>
                    <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-champagne mb-12 block font-black">Infraestrutura Silenciosa</span>
                    <h2 className="text-5xl md:text-8xl mb-12 font-editorial italic opacity-40">Intelligence as Code</h2>
                    <p className="text-sm font-ui text-warmGray max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
                      IA não é o futuro. É o sistema operacional do presente para quem quer escalar consciência e operação global.
                    </p>
                 </ScrollReveal>
               </div>
            </section>

            <section id="antonyia" className="py-24 md:py-48 px-6 bg-[#020202] text-offWhite relative overflow-hidden">
              <div className="max-w-screen-2xl mx-auto relative z-10">
                <ScrollReveal className="text-center mb-20">
                  <h2 className="text-5xl md:text-[9rem] mb-10 font-editorial italic tracking-tighter leading-none select-none text-offWhite">Antony.ia</h2>
                  <p className="text-[10px] font-ui text-warmGray uppercase tracking-[0.5em] mb-16">Clone Cognitivo & Auditoria Estratégica</p>
                </ScrollReveal>
                <ErrorBoundary>
                  <ChatInterface />
                </ErrorBoundary>
              </div>
            </section>

            <section id="library" className="py-24 md:py-40 px-6 bg-white dark:bg-[#121212] border-b border-black/[0.03] dark:border-white/[0.03]">
              <div className="max-w-7xl mx-auto">
                <ScrollReveal className="mb-20 text-center">
                  <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-champagne mb-6 block font-black">Acervo de Conhecimento</span>
                  <h2 className="text-4xl md:text-6xl mb-6 font-editorial italic text-graphite dark:text-offWhite">A Biblioteca Digital.</h2>
                </ScrollReveal>
                <ErrorBoundary>
                  <DigitalLibrary />
                </ErrorBoundary>
              </div>
            </section>

            <section id="digital-products" className="py-24 md:py-40 bg-offWhite dark:bg-[#0F0F0F]">
              <div className="max-w-screen-2xl mx-auto px-6">
                 <ScrollReveal className="text-center mb-20">
                    <span className="text-[10px] font-ui uppercase tracking-[0.6em] text-champagne mb-6 block font-black">Instrumentos de Decisão</span>
                    <h2 className="text-4xl md:text-8xl mb-8 font-editorial italic tracking-tighter text-graphite dark:text-offWhite">Camadas de Acesso</h2>
                 </ScrollReveal>
                 <ErrorBoundary>
                   <Products />
                 </ErrorBoundary>
              </div>
            </section>

            <section id="testimonials" className="py-24 md:py-40 bg-white dark:bg-[#121212]">
               <ErrorBoundary>
                 <Testimonials />
               </ErrorBoundary>
            </section>

            <section id="subscription" className="py-24 md:py-40 bg-offWhite dark:bg-[#0F0F0F] border-y border-black/5 dark:border-white/5">
               <div className="max-w-4xl mx-auto px-6 text-center">
                  <ScrollReveal>
                    <h2 className="text-5xl md:text-7xl font-editorial italic mb-12 text-graphite dark:text-offWhite">Protocolo de Continuidade.</h2>
                    <p className="text-base font-ui text-warmGray dark:text-warmGray mb-12 leading-relaxed">
                      Acesso recorrente à inteligência do Antony.ia, briefings mensais e alertas de jurisdição. Não é consumo. É infraestrutura.
                    </p>
                    <button 
                      onClick={() => {
                        trackEvent('subscription_cta_clicked');
                        useStore.getState().setCheckout({ title: 'Assinatura Concierge Global', isSubscription: true });
                      }}
                      className="bg-graphite dark:bg-offWhite dark:text-black text-white px-16 py-6 text-[11px] font-ui font-black uppercase tracking-[0.4em] hover:bg-black dark:hover:bg-white transition-all"
                    >
                      Ativar Concierge → Alertas Globais 24/7
                    </button>
                  </ScrollReveal>
               </div>
            </section>

            <section id="concierge" className="py-24 md:py-40 px-6 bg-[#121212] text-offWhite overflow-hidden">
              <div className="max-w-screen-2xl mx-auto text-center">
                <h2 className="text-4xl md:text-7xl mb-16 italic tracking-tight">O Mundo como Campo.</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 2xl:gap-10 mt-16">
                  {REGIONS_CONFIG.map((reg) => (
                    <div key={reg.id} className="bg-[#121212] p-10 group cursor-pointer hover:bg-black transition-all border border-white/5 aspect-square flex flex-col justify-center items-center">
                      <span className="text-5xl mb-6 block grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">{reg.flag}</span>
                      <h4 className="text-[12px] font-ui font-black uppercase tracking-[0.3em] mb-3">{reg.name}</h4>
                      <p className="text-[9px] font-ui text-warmGray uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100">{reg.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="physical-products" className="py-24 md:py-40 bg-white dark:bg-[#121212]">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                <ScrollReveal>
                  <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-champagne mb-6 block font-black">Simbolismo & Âncora</span>
                  <h2 className="text-4xl md:text-6xl mb-8 font-editorial italic text-graphite dark:text-offWhite">Objetos de Poder Mental.</h2>
                  <p className="text-sm font-ui text-warmGray dark:text-warmGray leading-relaxed mb-12">
                    Nossa linha de produtos físicos serve como âncora material para a expansão invisível. Relógios de zona dupla, passaportes de couro LV3, ferramentas de escrita para arquitetos de realidade.
                  </p>
                  <button className="border border-black/10 dark:border-white/10 px-10 py-4 text-[10px] font-ui font-black uppercase tracking-[0.3em] hover:border-graphite dark:hover:border-offWhite transition-all text-graphite dark:text-offWhite">
                    Explorar Atelier → Âncoras Materiais
                  </button>
                </ScrollReveal>
                <ScrollReveal>
                  <div className="aspect-square bg-offWhite dark:bg-[#0F0F0F] p-20 flex items-center justify-center border border-black/[0.02] dark:border-white/[0.02]">
                    <div className="text-9xl opacity-10 text-graphite dark:text-offWhite font-editorial italic">LV3</div>
                  </div>
                </ScrollReveal>
              </div>
            </section>

            <section id="ecosystem" className="py-40 md:py-60 px-6 bg-offWhite dark:bg-[#0F0F0F] text-center border-t border-black/[0.03] dark:border-white/[0.03]">
              <ScrollReveal className="max-w-5xl mx-auto">
                <h2 className="text-4xl md:text-9xl mb-20 tracking-tighter leading-none font-editorial italic text-graphite dark:text-offWhite">
                  A realidade é o <br className="hidden md:block" /> árbitro final.
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-16 md:mt-24">
                  <button className="w-full md:w-auto bg-graphite dark:bg-offWhite dark:text-black text-white px-20 py-7 text-[12px] uppercase tracking-[0.5em] font-ui font-black hover:bg-black dark:hover:bg-white transition-all">
                    Aplicar para Mentoria → Expansão Acelerada
                  </button>
                  <button className="w-full md:w-auto border border-black/10 dark:border-white/10 px-20 py-7 text-[12px] uppercase tracking-[0.5em] font-ui font-black hover:border-graphite dark:hover:border-offWhite transition-all text-graphite/40 dark:text-offWhite/40 hover:text-graphite dark:hover:text-offWhite">
                    Dossiê Institucional → Baixar Manifesto
                  </button>
                </div>
              </ScrollReveal>
            </section>
          </Suspense>

          <section id="smq" className="py-24 md:py-40 bg-white dark:bg-[#121212] border-t border-black/5 dark:border-white/5">
             <div className="max-w-7xl mx-auto px-6">
                <ErrorBoundary>
                  <SMQAssessment />
                </ErrorBoundary>
             </div>
          </section>
        </main>

        <footer className="py-24 px-6 bg-offWhite dark:bg-[#0F0F0F] text-[10px] font-ui uppercase tracking-[0.5em] text-warmGray/60 border-t border-black/[0.03] dark:border-white/[0.03] font-black text-center">
          © 2024 LONG VIEW3 — BUSINESS METAFÍSICO GLOBAL
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;

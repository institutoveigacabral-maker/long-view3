
import React from 'react';
import { SECTIONS } from '../constants';
import { useStore, type StoreState } from '../store/useStore';

export const Header: React.FC = () => {
  const theme = useStore((state: StoreState) => state.theme);
  const toggleTheme = useStore((state: StoreState) => state.toggleTheme);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-offWhite/90 dark:bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-black/[0.03] dark:border-white/[0.03] px-4 md:px-12 py-5 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center space-x-3 group cursor-pointer">
        <span className="font-editorial text-xl md:text-2xl font-bold tracking-tighter transition-all group-hover:tracking-normal text-graphite dark:text-offWhite">LONG VIEW3</span>
        <span className="hidden sm:inline-block text-[9px] font-ui border border-graphite/40 dark:border-white/40 px-2 py-0.5 uppercase tracking-[0.2em] leading-none opacity-60 text-graphite dark:text-offWhite">Instância Global</span>
      </div>
      
      <nav className="hidden lg:flex space-x-8">
        {SECTIONS.slice(0, 5).map(s => (
          <a key={s.id} href={`#${s.id}`} className="text-[10px] uppercase tracking-[0.3em] text-graphite/60 dark:text-offWhite/60 hover:text-champagne transition-all duration-300 font-ui font-semibold">
            {s.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center space-x-4 md:space-x-8">
        <button 
          onClick={toggleTheme}
          className="p-2 text-graphite/60 dark:text-offWhite/60 hover:text-champagne transition-colors focus:outline-none"
          aria-label="Alternar tema visual"
        >
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          )}
        </button>
        
        <button className="bg-graphite dark:bg-offWhite text-offWhite dark:text-black px-5 md:px-8 py-2.5 text-[9px] uppercase tracking-[0.2em] hover:bg-black dark:hover:bg-white transition-all font-ui font-bold shadow-sm active:scale-95">
          Auditoria Ativa
        </button>
      </div>
    </header>
  );
};

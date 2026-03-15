
import React, { useState, useEffect, useRef } from 'react';
import { SECTIONS } from '../constants';

export const NavigationBar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight - windowHeight;
      const progress = (currentScrollY / totalHeight) * 100;
      
      setScrollProgress(progress);
      
      // Update collapsed state based on scroll direction
      if (currentScrollY > 100 && currentScrollY > lastScrollYRef.current) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
      
      lastScrollYRef.current = currentScrollY;

      // Active section detection
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      const visibleSection = sectionElements.find(el => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 250 && rect.bottom >= 250;
      });

      if (visibleSection && visibleSection.id !== activeSection) {
        setActiveSection(visibleSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]); // Only depend on activeSection to stabilize the handler

  return (
    <nav className={`fixed left-0 top-1/2 -translate-y-1/2 z-[90] flex-col items-start px-4 md:px-8 transition-all duration-700 hidden lg:flex ${
      isCollapsed ? 'opacity-30 hover:opacity-100' : 'opacity-100'
    }`}>
      {/* Scroll Progress Bar */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-black/5 dark:bg-white/5">
        <div 
          className="w-full bg-champagne transition-all duration-300" 
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      <div className="space-y-6 relative pl-6">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center group relative outline-none"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Dot indicator */}
              <div className={`absolute -left-[27px] w-2.5 h-2.5 rounded-full border border-champagne transition-all duration-500 ${
                isActive ? 'bg-champagne scale-125' : 'bg-transparent group-hover:scale-110'
              }`} />
              
              <div className={`flex items-center space-x-4 transition-all duration-500 overflow-hidden ${
                isCollapsed && !isActive ? 'w-0 opacity-0' : 'w-48 opacity-100'
              }`}>
                <span className={`text-[9px] font-ui font-black tracking-widest uppercase transition-colors duration-500 ${
                  isActive ? 'text-champagne' : 'text-warmGray/40 dark:text-warmGray/30 group-hover:text-graphite dark:group-hover:text-offWhite'
                }`}>
                  {section.icon}
                </span>
                <span className={`text-[10px] font-ui font-black tracking-[0.3em] uppercase transition-all duration-500 whitespace-nowrap ${
                  isActive ? 'text-graphite dark:text-offWhite translate-x-1' : 'text-warmGray/20 dark:text-white/10 group-hover:text-graphite dark:group-hover:text-offWhite'
                }`}>
                  {section.label}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </nav>
  );
};


import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Globe, ChevronRight, ArrowRight, Moon, Sun } from 'lucide-react';
import CustomCursor from './CustomCursor';
import AnoLogo from './AnoLogo';
import Footer from './Footer';
import AiChatbot from './AiChatbot';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, language, toggleLanguage, direction } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Initialize Theme State
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.partners, path: '/partners' },
    { name: t.nav.blog, path: '/blog' },
    { name: t.nav.about, path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    if (pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const MotionDiv = motion.div as any;

  return (
    <div className={`min-h-screen bg-primary text-neutral-light font-sans selection:bg-accent selection:text-primary ${direction === 'rtl' ? 'rtl' : ''}`}>
      <CustomCursor />
      
      {/* Scroll Progress Indicator */}
      <MotionDiv
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[100]"
        style={{ 
            scaleX,
            transformOrigin: direction === 'rtl' ? 'right' : 'left'
        }}
      />
      
      {/* AI Chatbot Widget */}
      <AiChatbot />
      
      {/* Page Border Frame - Adaptive Color (Hidden on Home for Full Immersion) */}
      {!isHomePage && (
        <div className="fixed inset-0 pointer-events-none z-[55] border-[12px] md:border-[20px] border-primary transition-colors duration-500" />
      )}

      {/* GLOBAL BACKGROUND PHOTO */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {isHomePage ? (
          // Home Page: Background handled inside Home.tsx or here if needed, 
          // but usually Home.tsx has its own Hero. We leave this empty or minimal.
          null
        ) : (
          // Internal Pages (Services, Projects, etc.): Refined Architectural Background
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15] dark:opacity-[0.1] grayscale"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/70 to-primary/95" />
            <div className="absolute inset-0 bg-primary/30 backdrop-blur-[1px]" />
          </>
        )}
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 blueprint-grid opacity-20" />

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 top-0 left-0 right-0 transition-all duration-500 
        ${isHomePage && !scrolled ? 'bg-transparent border-transparent py-4' : 'bg-primary/90 backdrop-blur-md border-b border-neutral-light/5 py-0'}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* 1. LEFT COLUMN: Logo (Fixed Width) */}
          <div className="w-[260px] flex justify-start">
            <NavLink 
              to="/" 
              className="flex items-center gap-4 group"
              onClick={() => handleNavClick('/')}
            >
              <AnoLogo size="md" />
              <div className="flex flex-col leading-none">
                  <span className={`tracking-[0.1em] font-bold text-lg ${isHomePage && !scrolled ? 'text-white' : 'text-neutral-light'}`}>
                    {t.nav.brandName}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest mt-1 transition-colors ${isHomePage && !scrolled ? 'text-white/70 group-hover:text-accent' : 'text-neutral-dim group-hover:text-accent'}`}>
                      {t.nav.brandSubtitle}
                  </span>
              </div>
            </NavLink>
          </div>

          {/* 2. CENTER COLUMN: Navigation Links (Flex-1 Centered) */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={({ isActive }: { isActive: boolean }) => 
                  `text-[10px] lg:text-[11px] font-bold font-sans uppercase tracking-[0.15em] hover:text-accent transition-colors relative py-2 leading-none 
                   ${isActive ? 'text-accent' : (isHomePage && !scrolled ? 'text-white/90' : 'text-neutral-light')}
                  `
                }
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <MotionDiv 
                        layoutId="underline" 
                        className="absolute -bottom-2 left-0 right-0 h-px bg-accent" 
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* 3. RIGHT COLUMN: Actions (Fixed Width) */}
          <div className="hidden md:flex w-[260px] justify-end items-center gap-4">
            
            <Link 
              to="/contact" 
              onClick={() => handleNavClick('/contact')}
              className="h-10 px-6 bg-accent text-primary font-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 rounded-sm shadow-[0_0_15px_rgba(var(--color-accent),0.3)] hover:shadow-[0_0_25px_rgba(var(--color-accent),0.5)]"
            >
              {t.nav.contactNow}
            </Link>

            {/* SETTINGS POD */}
            <div className={`h-10 flex items-center backdrop-blur-md border rounded-full px-2 gap-3 shadow-sm transition-colors ${isHomePage && !scrolled ? 'bg-black/30 border-white/10' : 'bg-secondary/80 border-neutral-light/10'}`}>
                
                {/* Language Toggle */}
                <button 
                  onClick={toggleLanguage}
                  className={`flex items-center justify-center px-2 text-[10px] font-mono font-bold transition-colors h-full ${isHomePage && !scrolled ? 'text-white/80 hover:text-accent' : 'text-neutral-dim hover:text-accent'}`}
                  aria-label="Toggle Language"
                >
                  {language === 'en' ? 'AR' : 'EN'}
                </button>

                {/* Divider */}
                <div className="w-px h-3 bg-current opacity-20" />

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`relative h-6 w-10 rounded-full border transition-colors hover:border-accent/30 ${isHomePage && !scrolled ? 'bg-black/40 border-white/20' : 'bg-primary/50 border-neutral-light/10'}`}
                    aria-label="Toggle Dark Mode"
                >
                    <MotionDiv
                        className="absolute start-1 top-1 w-4 h-4 rounded-full bg-accent text-primary flex items-center justify-center shadow-sm"
                        animate={{ 
                            x: isDarkMode ? (direction === 'rtl' ? -16 : 16) : 0, 
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        {isDarkMode ? <Moon size={10} className="fill-primary" /> : <Sun size={10} />}
                    </MotionDiv>
                </button>
            </div>

          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-accent p-2 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <MotionDiv 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-primary pt-32 px-6 md:hidden flex flex-col h-screen overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="text-3xl font-bold text-neutral-light hover:text-accent flex items-center justify-between group border-b border-neutral-light/10 pb-4"
                >
                  {link.name}
                  <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity rtl-flip" />
                </NavLink>
              ))}
               <Link 
                  to="/contact"
                  onClick={() => handleNavClick('/contact')}
                  className="text-3xl font-bold text-accent flex items-center justify-between group border-b border-neutral-light/10 pb-4"
                >
                  {t.nav.contactNow}
                  <ArrowRight className="rtl-flip" />
                </Link>

              <div className="flex justify-between items-center mt-4 border-t border-neutral-light/10 pt-6 pb-20">
                  <button 
                    onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                    className="text-neutral-dim font-mono text-lg flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Globe size={18} />
                    {language === 'en' ? 'العربية' : 'English'}
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-neutral-dim font-mono text-lg hover:text-accent transition-colors"
                  >
                    {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                    <span>{isDarkMode ? 'Dark' : 'Light'}</span>
                  </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Main Content - Remove Top Padding on Home Page */}
      <main className={`${isHomePage ? 'pt-0' : 'pt-28'} min-h-screen relative z-10 transition-colors duration-500`}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

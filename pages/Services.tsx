
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { SERVICES as STATIC_SERVICES, PREMIUM_SERVICES as STATIC_PREMIUM_SERVICES } from '../constants';
import { 
  LayoutTemplate, Layers, Box, Compass, HardHat, Trees, Lightbulb, Route, 
  Printer, Glasses, BookOpen, ArrowRight, Zap, Map, ScanLine, Leaf, Wrench,
  Cpu, Cuboid, Star
} from 'lucide-react';

const Services: React.FC = () => {
  const { t, services, premiumServices, language, direction } = useLanguage();
  const navigate = useNavigate();

  const getIcon = (name: string, size: number = 24) => {
    const props = { size, strokeWidth: 1.5 };
    switch (name) {
      case 'LayoutTemplate': return <LayoutTemplate {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Box': return <Box {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'HardHat': return <HardHat {...props} />;
      case 'Trees': return <Trees {...props} />;
      case 'Lightbulb': return <Lightbulb {...props} />;
      case 'Route': return <Route {...props} />;
      case 'Printer': return <Printer {...props} />;
      case 'Glasses': return <Glasses {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Map': return <Map {...props} />;
      case 'ScanLine': return <ScanLine {...props} />;
      case 'Leaf': return <Leaf {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      default: return <Box {...props} />;
    }
  };

  // ---------------------------------------------------------
  // DATA PREPARATION & MERGING
  // ---------------------------------------------------------

  // Helper to merge CMS data with Static data (CMS takes priority, Static fills gaps)
  const mergeData = (dynamicList: any[], staticList: any[]) => {
      // If no dynamic data loaded yet, return static
      if (!dynamicList || dynamicList.length === 0) return staticList;
      
      const dynamicIds = new Set(dynamicList.map(d => d.id));
      const missingStatic = staticList.filter(s => !dynamicIds.has(s.id));
      return [...dynamicList, ...missingStatic];
  };

  // 1. CORE SERVICES (Double Column)
  const currentStaticServices = STATIC_SERVICES[language] || STATIC_SERVICES['en'];
  const mergedServices = mergeData(services, currentStaticServices);

  let coreList = [
    ...mergedServices,
    { id: 'cta-card', isCta: true, title: t.contact.intro, image: '', icon: 'Zap', description: '' }
  ];
  
  // Ensure even number for pairs
  if (coreList.length % 2 !== 0 && coreList.length > 0) {
      coreList.push({ ...coreList[0], id: coreList[0].id + '-duplicate' });
  }
  
  // Create Pairs
  const corePairedList = [];
  for (let i = 0; i < coreList.length; i += 2) {
      corePairedList.push({ top: coreList[i], bottom: coreList[i+1] });
  }
  
  // Infinite Duplicate for Core
  const coreCarouselItems = [...corePairedList, ...corePairedList, ...corePairedList, ...corePairedList];

  // 2. PREMIUM SERVICES (Single Row - Cinematic)
  const currentStaticPremium = STATIC_PREMIUM_SERVICES[language] || STATIC_PREMIUM_SERVICES['en'];
  const mergedPremium = mergeData(premiumServices, currentStaticPremium);
  
  // Infinite Duplicate for Premium (Need more duplicates since it's single row)
  const premiumCarouselItems = [...mergedPremium, ...mergedPremium, ...mergedPremium, ...mergedPremium, ...mergedPremium, ...mergedPremium];


  // ---------------------------------------------------------
  // ANIMATION STATE
  // ---------------------------------------------------------
  
  // Motion Values
  const xCore = useMotionValue(0);
  const xPremium = useMotionValue(0);

  // Dimensions
  const [coreColWidth, setCoreColWidth] = useState(0);
  const [premiumItemWidth, setPremiumItemWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const calculateWidths = () => {
        const isDesktop = window.innerWidth >= 768;
        
        // Core: Width + Gap
        const cColW = isDesktop ? 350 : 280; 
        const cGap = isDesktop ? 32 : 24; 
        setCoreColWidth(cColW + cGap);

        // Premium: Width + Gap (Wider cards)
        const pItemW = isDesktop ? 450 : 320;
        const pGap = isDesktop ? 32 : 24;
        setPremiumItemWidth(pItemW + pGap);

        setIsReady(true);
    };

    calculateWidths();
    window.addEventListener('resize', calculateWidths);
    return () => window.removeEventListener('resize', calculateWidths);
  }, []);

  // Calculate full width of one set
  const coreSingleSetWidth = corePairedList.length * coreColWidth;
  const premiumSingleSetWidth = mergedPremium.length * premiumItemWidth;

  // Animation Constants (SPEED UP)
  const SPEED_CORE = 0.8;  // Increased from 0.5
  const SPEED_PREMIUM = 0.6; // Increased from 0.4

  // Reset Positions on Direction Change
  useEffect(() => {
    if (!isReady) return;
    if (direction === 'rtl') {
        xCore.set(-coreSingleSetWidth); 
        xPremium.set(0); // Premium moves opposite
    } else {
        xCore.set(0);
        xPremium.set(-premiumSingleSetWidth);
    }
  }, [direction, isReady, coreSingleSetWidth, premiumSingleSetWidth, xCore, xPremium]);


  // ---------------------------------------------------------
  // THE ANIMATION LOOP (Unified)
  // ---------------------------------------------------------
  useAnimationFrame((t, delta) => {
    if (!isReady) return;
    const moveFactor = delta / 16; // Normalization based on 60fps

    // 1. CORE ANIMATION (Continues on Hover)
    if (coreSingleSetWidth > 0) {
        let currentX = xCore.get();
        let moveBy = SPEED_CORE * moveFactor;

        if (direction === 'rtl') {
            currentX += moveBy; // Move Right
            if (currentX >= 0) currentX = -coreSingleSetWidth;
        } else {
            currentX -= moveBy; // Move Left
            if (currentX <= -coreSingleSetWidth) currentX = 0;
        }
        xCore.set(currentX);
    }

    // 2. PREMIUM ANIMATION (Always Runs - No Hover Stop)
    if (premiumSingleSetWidth > 0) {
        let currentX = xPremium.get();
        let moveBy = SPEED_PREMIUM * moveFactor;

        // Note: Logic swapped intentionally to create counter-movement
        if (direction === 'rtl') {
            currentX -= moveBy; // Move Left (Opposite to Core)
            if (currentX <= -premiumSingleSetWidth) currentX = 0;
        } else {
            currentX += moveBy; // Move Right (Opposite to Core)
            if (currentX >= 0) currentX = -premiumSingleSetWidth;
        }
        xPremium.set(currentX);
    }
  });


  // ---------------------------------------------------------
  // RENDER HELPERS
  // ---------------------------------------------------------

  const renderCoreCard = (item: any) => {
      if (!item) return null;
      if (item.isCta) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-accent text-primary rounded-sm overflow-hidden relative group/cta cursor-pointer" onClick={() => navigate('/contact')}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/cta:opacity-20 transition-opacity" />
                <div className="text-center p-6 flex flex-col items-center justify-center h-full relative z-10">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover/cta:scale-110 transition-transform">
                        <Zap size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-black uppercase mb-2 leading-tight">{t.contact.intro}</h3>
                    <button className="mt-2 px-6 py-2 bg-primary text-accent font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white hover:text-primary transition-colors">
                        {t.nav.contactNow}
                    </button>
                </div>
            </div>
        );
      }
      return (
        <div className="w-full h-full relative group/card select-none overflow-hidden rounded-sm bg-secondary border border-white/5 hover:border-accent/50 transition-all duration-300">
             <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10 opacity-90 group-hover/card:opacity-80 transition-opacity" />
                {item.image ? (
                    <OptimizedImage 
                        src={item.image}
                        alt={item.title}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700 transform group-hover/card:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <Wrench className="text-neutral-dim opacity-10 w-24 h-24" />
                    </div>
                )}
            </div>
            <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                 <div className="flex justify-between items-end">
                    <div>
                        <div className="text-accent mb-2 transform origin-left group-hover/card:scale-110 transition-transform">
                             {getIcon(item.icon, 20)}
                        </div>
                        <h3 className="text-lg font-bold text-neutral-light leading-tight group-hover/card:text-white transition-colors">
                            {item.title}
                        </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover/card:bg-accent group-hover/card:text-primary group-hover/card:border-accent transition-all">
                        <ArrowRight size={14} className="rtl-flip" />
                    </div>
                 </div>
                 <div className="h-0 opacity-0 group-hover/card:h-auto group-hover/card:opacity-100 group-hover/card:mt-3 transition-all duration-500 overflow-hidden">
                     <p className="text-xs text-neutral-dim line-clamp-2">
                         {item.description}
                     </p>
                 </div>
            </div>
        </div>
      );
  };

  const renderPremiumCard = (service: any) => {
      return (
        <div className="w-full h-full relative group/prem select-none overflow-hidden rounded-sm bg-secondary border border-white/5 hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--color-accent),0.15)]">
            {/* Full Background Image */}
            <div className="absolute inset-0 z-0">
                <OptimizedImage 
                    src={service.image || ''} 
                    alt={service.title} 
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover grayscale opacity-60 group-hover/prem:grayscale-0 group-hover/prem:opacity-80 transition-all duration-700 transform group-hover/prem:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-90 group-hover/prem:opacity-70 transition-opacity" />
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col items-start justify-end">
                <div className="bg-accent/10 p-3 rounded-full mb-4 backdrop-blur-md border border-accent/20 text-accent group-hover/prem:scale-110 transition-transform duration-500">
                    {getIcon(service.icon, 28)}
                </div>
                
                <h3 className="text-2xl font-black text-neutral-light mb-2 leading-tight group-hover/prem:text-white transition-colors uppercase tracking-tight">
                    {service.title}
                </h3>
                <p className="text-neutral-dim text-sm mb-4 line-clamp-2 group-hover/prem:text-neutral-light/90 transition-colors">
                    {service.description}
                </p>

                {/* Feature Tags - Hidden initially, slide up on hover */}
                <div className="flex flex-wrap gap-2 max-h-0 opacity-0 group-hover/prem:max-h-20 group-hover/prem:opacity-100 transition-all duration-500 overflow-hidden">
                    {service.features.slice(0,2).map((feat: string, j: number) => (
                        <span key={j} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white/10 backdrop-blur rounded-sm text-white">
                            {feat}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* Top Right Badge */}
            <div className="absolute top-4 right-4 z-20">
                <Star className="text-accent fill-accent w-4 h-4 opacity-50 group-hover/prem:opacity-100 group-hover/prem:rotate-180 transition-all duration-500" />
            </div>
        </div>
      );
  };

  return (
    <div className="min-h-screen bg-primary text-neutral-light relative overflow-x-hidden flex flex-col">
       <SEO title={t.nav.services} path="/services" />
       
       {/* Background Grid & Decor */}
       <div className="fixed inset-0 blueprint-grid opacity-10 pointer-events-none z-0" />
       <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />

       {/* HERO HEADER */}
       <div className="pt-32 pb-8 px-6 md:px-12 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-accent" />
                  <span className="text-accent font-mono text-[10px] uppercase tracking-[0.25em]">
                      {t.services.worldClassBadge}
                  </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-4">
                  {t.nav.services}
              </h1>
              <p className="text-neutral-dim max-w-xl text-sm md:text-base leading-relaxed">
                  {t.services.heroDescription}
              </p>
          </div>
       </div>

       {/* 
          ====================================================
          SECTION 1: ENGINEERING CORE (Double Row Marquee)
          ====================================================
       */}
       <div 
         className="relative z-10 overflow-hidden flex flex-col justify-center py-12 group/container"
         dir="ltr" 
       >
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8" dir={direction}>
              <h2 className="font-bold text-xl text-neutral-light flex items-center gap-2">
                  <Cpu size={20} className="text-accent" />
                  {t.services.sectionCore}
              </h2>
              <p className="text-xs font-mono text-neutral-dim mt-1 uppercase tracking-widest">{t.services.coreSubtitle}</p>
          </div>

          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-l from-primary to-transparent pointer-events-none" />

          {/* Track */}
          <motion.div 
              className={`flex gap-6 md:gap-8 w-max px-6 md:px-8 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
              style={{ x: xCore }}
          >
              {coreCarouselItems.map((pair, index) => (
                  <div 
                    key={`col-${index}`} 
                    dir={direction}
                    className="shrink-0 flex flex-col gap-6 md:gap-8"
                    style={{ width: coreColWidth - (window.innerWidth >= 768 ? 32 : 24) }}
                  >
                      <div className="h-[260px] md:h-[300px] w-full">
                          {renderCoreCard(pair.top)}
                      </div>
                      <div className="h-[260px] md:h-[300px] w-full">
                          {renderCoreCard(pair.bottom)}
                      </div>
                  </div>
              ))}
          </motion.div>
       </div>

       {/* 
          ====================================================
          SECTION 2: CREATIVE STUDIOS (Single Row Cinematic Marquee)
          ====================================================
       */}
       {mergedPremium.length > 0 && (
           <div 
             className="relative z-10 overflow-hidden flex flex-col justify-center py-20 bg-gradient-to-b from-primary to-secondary/20"
             dir="ltr"
           >
                {/* Section Header */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12 flex flex-col md:flex-row justify-between items-end gap-4" dir={direction}>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase text-neutral-light mb-2 flex items-center gap-3">
                            <Cuboid className="text-accent" size={32} />
                            {t.services.sectionAtelier}
                        </h2>
                        <p className="text-neutral-dim max-w-lg">
                            {t.services.premiumDescription}
                        </p>
                    </div>
                    <div className="hidden md:block text-right">
                        <span className="font-mono text-xs text-accent uppercase tracking-[0.2em] block mb-1">
                            {t.services.premiumLabel}
                        </span>
                        <div className="h-1 w-24 bg-accent ml-auto" />
                    </div>
                </div>

                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 z-20 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 z-20 bg-gradient-to-l from-primary to-transparent pointer-events-none" />

                {/* Track */}
                <motion.div 
                    className={`flex gap-6 md:gap-8 w-max px-6 md:px-8 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
                    style={{ x: xPremium }}
                >
                    {premiumCarouselItems.map((service, index) => (
                        <div 
                            key={`prem-${index}`}
                            dir={direction}
                            className="shrink-0"
                            style={{ width: premiumItemWidth - (window.innerWidth >= 768 ? 32 : 24) }}
                        >
                            <div className="h-[350px] md:h-[450px] w-full">
                                {renderPremiumCard(service)}
                            </div>
                        </div>
                    ))}
                </motion.div>
           </div>
       )}

    </div>
  );
};

export default Services;

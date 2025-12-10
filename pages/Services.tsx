
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useAnimationFrame, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { 
  LayoutTemplate, Layers, Box, Compass, HardHat, Trees, Lightbulb, Route, 
  Printer, Glasses, BookOpen, ArrowRight, Zap, Map, ScanLine, Leaf, Activity,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const Services: React.FC = () => {
  const { t, services, premiumServices, language } = useLanguage();

  // Combine images safely
  const imagePool = [...services, ...premiumServices];
  
  const getSafeImage = (index: number) => {
      if (imagePool.length === 0) return 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop';
      return imagePool[index % imagePool.length]?.image || imagePool[0].image;
  };

  // The 10 Specific Services Data
  const servicesData = [
    {
      id: 'arch',
      title: language === 'ar' ? 'التصميم المعماري' : 'Architectural Design',
      description: language === 'ar' 
        ? 'تصميم مفاهيمي مبتكر وتخطيط تفصيلي للمساحات السكنية والتجارية والعامة.' 
        : 'Innovative conceptualization and detailed planning for residential, commercial, and public spaces.',
      icon: 'LayoutTemplate',
      image: services.find(s => s.id === 'arch')?.image || getSafeImage(0)
    },
    {
      id: 'interior',
      title: language === 'ar' ? 'التصميم الداخلي' : 'Interior Design',
      description: language === 'ar' 
        ? 'صياغة مساحات داخلية وظيفية وجمالية تعكس هوية العميل وتوفر الراحة.' 
        : 'Crafting functional and aesthetic interior spaces that reflect client identity and comfort.',
      icon: 'Compass',
      image: services.find(s => s.id === 'interior')?.image || getSafeImage(1)
    },
    {
      id: 'struct',
      title: language === 'ar' ? 'التصميم الإنشائي' : 'Structural Engineering',
      description: language === 'ar' 
        ? 'تحليل وتصميم إنشائي قوي يضمن السلامة والاستقرار والامتثال للكود.' 
        : 'Robust structural analysis and design ensuring safety, stability, and code compliance.',
      icon: 'Layers',
      image: services.find(s => s.id === 'struct')?.image || getSafeImage(2)
    },
    {
      id: 'mep',
      title: language === 'ar' ? 'التصميم الكهربائي والميكانيكي (MEP)' : 'MEP Engineering',
      description: language === 'ar' 
        ? 'حلول متكاملة للأنظمة الميكانيكية والكهربائية والصحية لضمان كفاءة المبنى.' 
        : 'Integrated solutions for mechanical, electrical, and plumbing systems ensuring efficiency.',
      icon: 'Zap',
      image: services.find(s => s.id === 'lighting')?.image || getSafeImage(3)
    },
    {
      id: 'bim',
      title: language === 'ar' ? 'نمذجة معلومات البناء BIM' : 'BIM Services',
      description: language === 'ar' 
        ? 'نمذجة معلومات البناء المتقدمة للكشف عن التعارضات وإدارة دورة حياة المشروع.' 
        : 'Advanced Building Information Modeling for collision detection and lifecycle management.',
      icon: 'Box',
      image: services.find(s => s.id === 'bim')?.image || getSafeImage(4)
    },
    {
      id: 'supervision',
      title: language === 'ar' ? 'الإشراف الهندسي وإدارة المشاريع' : 'Supervision & Management',
      description: language === 'ar' 
        ? 'إشراف ميداني وإدارة صارمة للمشاريع لضمان التنفيذ وفقاً لنية التصميم.' 
        : 'On-site supervision and rigorous project management to ensure execution matches design.',
      icon: 'HardHat',
      image: services.find(s => s.id === 'consult')?.image || getSafeImage(5)
    },
    {
      id: 'urban',
      title: language === 'ar' ? 'التصميم الحضري وتخطيط المواقع' : 'Urban Design & Planning',
      description: language === 'ar' 
        ? 'تخطيط شامل للمجتمعات والمساحات الحضرية لتعزيز جودة الحياة.' 
        : 'Comprehensive planning for communities and urban spaces to enhance quality of life.',
      icon: 'Map',
      image: services.find(s => s.id === 'roads')?.image || getSafeImage(6)
    },
    {
      id: 'landscape',
      title: language === 'ar' ? 'تصميم اللاندسكيب والمساحات الخارجية' : 'Landscape Architecture',
      description: language === 'ar' 
        ? 'تصميم بيئات خارجية متناغمة تمزج الطبيعة مع الهياكل المبنية.' 
        : 'Designing harmonious outdoor environments that blend nature with built structures.',
      icon: 'Trees',
      image: services.find(s => s.id === 'landscape')?.image || getSafeImage(7)
    },
    {
      id: 'surveying',
      title: language === 'ar' ? 'رفع المساحات والرفع المساحي' : 'Surveying & Geomatics',
      description: language === 'ar' 
        ? 'قياسات دقيقة وتحليل طوبوغرافي لضمان دقة الحدود والأساسات.' 
        : 'Precise measurements and topographic analysis to ensure boundary accuracy.',
      icon: 'ScanLine',
      image: getSafeImage(8)
    },
    {
      id: 'env',
      title: language === 'ar' ? 'التصميم البيئي واستدامة المباني' : 'Environmental Design',
      description: language === 'ar' 
        ? 'استراتيجيات تصميم مستدامة لتقليل الأثر البيئي وتعزيز كفاءة الطاقة.' 
        : 'Sustainable design strategies to minimize environmental impact and enhance energy efficiency.',
      icon: 'Leaf',
      image: getSafeImage(9)
    }
  ];

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
      default: return <Activity {...props} />;
    }
  };

  const MotionDiv = motion.div as any;
  const MotionImg = motion.img as any;

  // Add CTA to the list to include it in the scroll
  const fullList = [
    ...servicesData,
    { id: 'cta-card', isCta: true, title: t.contact.intro, image: '', icon: 'Zap', description: '' }
  ];

  // Duplicate for infinite scroll (Tripled to ensure smooth wrapping with wide screens)
  const carouselItems = [...fullList, ...fullList, ...fullList];

  // ---------------------------------------------------------
  // ANIMATION LOGIC
  // ---------------------------------------------------------
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Configuration
  const SPEED = 0.5; // Pixels per frame
  const CARD_WIDTH_DESKTOP = 400 + 32; // width + gap (md:gap-8)
  const CARD_WIDTH_MOBILE = 300 + 24;  // width + gap (gap-6)
  
  // Calculate total width of ONE set of items
  const getCardWidth = () => window.innerWidth >= 768 ? CARD_WIDTH_DESKTOP : CARD_WIDTH_MOBILE;
  const contentWidth = fullList.length * getCardWidth();

  // The Animation Loop
  useAnimationFrame((t, delta) => {
    if (!isHovered) {
      // Move left
      let moveBy = SPEED * (delta / 16); // Normalize delta
      if (moveBy > 5) moveBy = 5; // Cap jump on lag
      
      let newX = x.get() - moveBy;

      // Wrap logic: If we've scrolled past the first set, jump back to start
      if (newX <= -contentWidth) {
        newX = 0;
      }
      
      x.set(newX);
    }
  });

  // Manual Navigation Handlers
  const handleScroll = (direction: 'left' | 'right') => {
    const cardW = getCardWidth();
    const currentX = x.get();
    let targetX = direction === 'right' ? currentX - cardW : currentX + cardW;

    // Boundary/Wrap checks for manual scrolling
    if (targetX <= -contentWidth) {
        const remainder = targetX + contentWidth;
        x.set(remainder); 
        targetX = remainder - cardW; 
    }
    
    if (targetX > 0) {
        targetX = -contentWidth + cardW;
        x.set(-contentWidth); 
    }

    animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30
    });
  };

  return (
    <div className="min-h-screen bg-primary text-neutral-light relative overflow-x-hidden flex flex-col">
       
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
          ----------------------------------------------------
          INFINITE MARQUEE SECTION
          ----------------------------------------------------
       */}
       <div 
         className="flex-1 relative z-10 overflow-hidden flex flex-col justify-center py-12 group/container"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
       >
          
          {/* Gradient Masks for Smooth Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-r from-primary via-primary/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-l from-primary via-primary/80 to-transparent pointer-events-none" />

          {/* Scrolling Track */}
          <motion.div 
              className="flex gap-6 md:gap-8 w-max px-6 md:px-8 cursor-grab active:cursor-grabbing"
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -contentWidth * 2, right: 0 }}
              onDragStart={() => setIsHovered(true)}
              onDragEnd={() => setIsHovered(false)}
          >
              {carouselItems.map((service, index) => {
                  // Render CTA Card
                  if ((service as any).isCta) {
                      return (
                        <div key={`${service.id}-${index}`} className="shrink-0 w-[300px] md:w-[400px] h-[450px] md:h-[550px] flex items-center justify-center">
                            <div className="text-center p-8 border border-dashed border-white/10 rounded-sm w-full h-full flex flex-col items-center justify-center hover:border-accent/30 hover:bg-white/5 transition-all group/cta bg-secondary/20">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 group-hover/cta:scale-110 transition-transform">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-light mb-2">{t.contact.intro}</h3>
                                <p className="text-sm text-neutral-dim mb-6 max-w-[200px] leading-relaxed">Let's build something extraordinary together.</p>
                                <a href="#/contact" className="px-6 py-3 bg-accent text-primary font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-colors">
                                    {t.nav.contactNow}
                                </a>
                            </div>
                        </div>
                      );
                  }

                  // Render Standard Service Card
                  return (
                    <div 
                        key={`${service.id}-${index}`}
                        className="relative shrink-0 w-[300px] md:w-[400px] h-[450px] md:h-[550px] group/card select-none"
                    >
                        {/* Card Container */}
                        <div className="w-full h-full relative overflow-hidden rounded-sm bg-secondary border border-white/5 transition-all duration-500 group-hover/card:border-accent/50 group-hover/card:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
                            
                            {/* Image Layer */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                {/* Enhanced Gradient: Dark at top (for title) AND dark at bottom (for desc) */}
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-transparent to-primary/90 z-10 opacity-80 group-hover/card:opacity-70 transition-opacity duration-500" />
                                <MotionImg 
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700 transform group-hover/card:scale-110"
                                />
                            </div>

                            {/* Content Layer */}
                            <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between">
                                
                                {/* Top: Title & Icon/Number Cluster */}
                                <div className="flex justify-between items-start gap-4">
                                    {/* Title moved to top */}
                                    <h3 className="text-2xl md:text-3xl font-black text-neutral-light leading-tight group-hover/card:text-accent transition-colors drop-shadow-lg">
                                        {service.title}
                                    </h3>

                                    {/* Icon & Number */}
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-accent border border-white/10 group-hover/card:bg-accent group-hover/card:text-primary transition-all duration-300 shadow-lg">
                                            {getIcon(service.icon, 20)}
                                        </div>
                                        <span className="font-mono text-xs font-bold text-white/30 group-hover/card:text-accent/50 transition-colors">
                                            {((index % fullList.length) + 1).toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom: Description (Reveal) */}
                                <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                                    <div className="h-[1px] w-12 bg-white/20 mb-4 group-hover/card:w-full group-hover/card:bg-accent/50 transition-all duration-500" />
                                    
                                    <div className="flex items-end justify-between gap-4">
                                        <p className="text-sm text-neutral-dim line-clamp-3 group-hover/card:text-white/90 transition-colors duration-300 leading-relaxed opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 delay-75">
                                            {service.description}
                                        </p>
                                        <div className="w-8 h-8 rounded-full border border-accent text-accent flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 shrink-0">
                                            <ArrowRight size={14} className="rtl-flip" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                  );
              })}
          </motion.div>

          {/* 
             -------------------------------------------------
             MANUAL CONTROLS (Repositioned to Edges)
             -------------------------------------------------
          */}
          
          {/* Left Arrow - Positioned Left Edge Center */}
          <button 
                onClick={() => handleScroll('left')}
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white hover:bg-accent hover:border-accent hover:text-primary transition-all flex items-center justify-center group shadow-2xl opacity-0 group-hover/container:opacity-100 duration-500"
                aria-label="Previous Service"
            >
                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform rtl-flip" />
          </button>

          {/* Right Arrow - Positioned Right Edge Center */}
          <button 
                onClick={() => handleScroll('right')}
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white hover:bg-accent hover:border-accent hover:text-primary transition-all flex items-center justify-center group shadow-2xl opacity-0 group-hover/container:opacity-100 duration-500"
                aria-label="Next Service"
            >
                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform rtl-flip" />
          </button>

       </div>

    </div>
  );
};

export default Services;

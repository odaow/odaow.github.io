
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutTemplate, Layers, Box, Compass, HardHat, Trees, Lightbulb, Route, 
  Printer, Glasses, BookOpen, ArrowRight, Zap, Map, ScanLine, Leaf, Activity
} from 'lucide-react';

const Services: React.FC = () => {
  const { t, services, premiumServices, language, direction } = useLanguage();
  const navigate = useNavigate();

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
      title: language === 'ar' ? 'الإشراف وإدارة المشاريع' : 'Supervision & Management',
      description: language === 'ar' 
        ? 'إشراف ميداني وإدارة صارمة للمشاريع لضمان التنفيذ وفقاً لنية التصميم.' 
        : 'On-site supervision and rigorous project management to ensure execution matches design.',
      icon: 'HardHat',
      image: services.find(s => s.id === 'consult')?.image || getSafeImage(5)
    },
    {
      id: 'urban',
      title: language === 'ar' ? 'التخطيط الحضري' : 'Urban Planning',
      description: language === 'ar' 
        ? 'تخطيط شامل للمجتمعات والمساحات الحضرية لتعزيز جودة الحياة.' 
        : 'Comprehensive planning for communities and urban spaces to enhance quality of life.',
      icon: 'Map',
      image: services.find(s => s.id === 'roads')?.image || getSafeImage(6)
    },
    {
      id: 'landscape',
      title: language === 'ar' ? 'اللاندسكيب' : 'Landscape',
      description: language === 'ar' 
        ? 'تصميم بيئات خارجية متناغمة تمزج الطبيعة مع الهياكل المبنية.' 
        : 'Designing harmonious outdoor environments that blend nature with built structures.',
      icon: 'Trees',
      image: services.find(s => s.id === 'landscape')?.image || getSafeImage(7)
    },
    {
      id: 'surveying',
      title: language === 'ar' ? 'المساحة' : 'Surveying',
      description: language === 'ar' 
        ? 'قياسات دقيقة وتحليل طوبوغرافي لضمان دقة الحدود والأساسات.' 
        : 'Precise measurements and topographic analysis to ensure boundary accuracy.',
      icon: 'ScanLine',
      image: getSafeImage(8)
    },
    {
      id: 'env',
      title: language === 'ar' ? 'التصميم البيئي' : 'Environmental Design',
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

  const MotionImg = motion.img as any;

  // 1. Prepare Data List
  let fullList = [
    ...servicesData,
    { id: 'cta-card', isCta: true, title: t.contact.intro, image: '', icon: 'Zap', description: '' }
  ];

  // If odd number of items, duplicate the first service to make it even (so we have pairs)
  if (fullList.length % 2 !== 0) {
      fullList.push({ ...servicesData[0], id: servicesData[0].id + '-duplicate' });
  }

  // 2. Create Pairs (Columns)
  const pairedList = [];
  for (let i = 0; i < fullList.length; i += 2) {
      pairedList.push({
          top: fullList[i],
          bottom: fullList[i+1]
      });
  }

  // 3. Quadruple the PAIRED list for infinite loop
  const carouselItems = [...pairedList, ...pairedList, ...pairedList, ...pairedList];

  // ---------------------------------------------------------
  // ANIMATION LOGIC (Automatic Only)
  // ---------------------------------------------------------
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamic Width State
  const [columnWidth, setColumnWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Measure widths on mount and resize
  useEffect(() => {
    const calculateWidths = () => {
        const isDesktop = window.innerWidth >= 768;
        // Adjusted width for the new layout style
        const colW = isDesktop ? 350 : 280; 
        const gap = isDesktop ? 32 : 24; 
        setColumnWidth(colW + gap);
        setIsReady(true);
    };

    calculateWidths();
    window.addEventListener('resize', calculateWidths);
    return () => window.removeEventListener('resize', calculateWidths);
  }, []);

  // Calculate width of ONE complete set of COLUMNS
  const singleSetWidth = pairedList.length * columnWidth;
  const SPEED = 1.0; // Increased speed slightly for better flow

  // Reset Position on Direction Change
  useEffect(() => {
    if (singleSetWidth === 0) return;

    if (direction === 'rtl') {
        x.set(-singleSetWidth);
    } else {
        x.set(0);
    }
  }, [direction, singleSetWidth, x]);

  // The Animation Loop
  useAnimationFrame((t, delta) => {
    if (!isHovered && singleSetWidth > 0) {
      let moveBy = SPEED * (delta / 16); 
      
      let currentX = x.get();

      if (direction === 'rtl') {
          currentX += moveBy;
          if (currentX >= 0) {
            currentX = -singleSetWidth;
          }
      } else {
          currentX -= moveBy;
          if (currentX <= -singleSetWidth) {
            currentX = 0;
          }
      }
      x.set(currentX);
    }
  });

  const renderCard = (item: any) => {
      // CTA Card Render
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

      // Service Card Render
      return (
        <div className="w-full h-full relative group/card select-none overflow-hidden rounded-sm bg-secondary border border-white/5 hover:border-accent/50 transition-all duration-300">
             {/* Image Layer */}
             <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10 opacity-90 group-hover/card:opacity-80 transition-opacity" />
                <MotionImg 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700 transform group-hover/card:scale-110"
                />
            </div>
            
            {/* Content */}
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
                 
                 {/* Hover Description */}
                 <div className="h-0 opacity-0 group-hover/card:h-auto group-hover/card:opacity-100 group-hover/card:mt-3 transition-all duration-500 overflow-hidden">
                     <p className="text-xs text-neutral-dim line-clamp-2">
                         {item.description}
                     </p>
                 </div>
            </div>
        </div>
      );
  }

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
          INFINITE MARQUEE SECTION (DOUBLE STACKED)
          ----------------------------------------------------
       */}
       <div 
         className="flex-1 relative z-10 overflow-hidden flex flex-col justify-center py-8 group/container"
         dir="ltr" 
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
       >
          
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-l from-primary to-transparent pointer-events-none" />

          {/* Scrolling Track */}
          <motion.div 
              className={`flex gap-6 md:gap-8 w-max px-6 md:px-8 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
              style={{ x }}
          >
              {carouselItems.map((pair, index) => (
                  <div 
                    key={`col-${index}`} 
                    dir={direction}
                    className="shrink-0 flex flex-col gap-6 md:gap-8"
                    style={{ width: columnWidth - (window.innerWidth >= 768 ? 32 : 24) }} // Subtract gap from column width to get actual item width
                  >
                      {/* TOP CARD */}
                      <div className="h-[260px] md:h-[300px] w-full">
                          {renderCard(pair.top)}
                      </div>

                      {/* BOTTOM CARD */}
                      <div className="h-[260px] md:h-[300px] w-full">
                          {renderCard(pair.bottom)}
                      </div>
                  </div>
              ))}
          </motion.div>
       </div>

    </div>
  );
};

export default Services;

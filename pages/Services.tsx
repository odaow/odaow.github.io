
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutTemplate, Layers, Box, Compass, HardHat, Trees, Lightbulb, Route, 
  Printer, Glasses, BookOpen, ArrowRight, ArrowUpRight, Plus, Minus
} from 'lucide-react';

const Services: React.FC = () => {
  const { t, services, premiumServices } = useLanguage();
  const allServices = services;

  // Refined Grid Logic for better layout (Mosaic Style)
  const getGridSpan = (index: number) => {
    const spans = [
        "md:col-span-2 md:row-span-2", // 0 Arch
        "md:col-span-1 md:row-span-2", // 1 Struct
        "md:col-span-1 md:row-span-1", // 2 BIM
        "md:col-span-1 md:row-span-1", // 3 Consult
        "md:col-span-2 md:row-span-1", // 4 Landscape (Wide)
        "md:col-span-1 md:row-span-1", // 5 PM
        "md:col-span-1 md:row-span-1", // 6 Lighting
        "md:col-span-2 md:row-span-1", // 7 Roads (Wide)
    ];
    return spans[index] || "md:col-span-1 md:row-span-1";
  };

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
      default: return <Box {...props} />;
    }
  };

  const MotionDiv = motion.div as any;
  const MotionH1 = motion.h1 as any;

  return (
    <>
        {/* COMPACT HERO & INTRO - Changed bg-primary to bg-transparent */}
        <div className="relative pt-32 pb-12 px-4 md:px-6 min-h-[40vh] flex flex-col justify-end bg-transparent overflow-hidden">
             {/* Video Background (Subtle) */}
             <div className="absolute inset-0 z-0 w-full h-full">
                 <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
                 >
                     <source src="https://video.wixstatic.com/video/11062b_9261f465d644405d8f7646549551c9b2/1080p/mp4/file.mp4" type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
             </div>

             <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-end justify-between gap-8 border-b border-neutral-light/10 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[1px] w-12 bg-accent" />
                        <span className="text-accent font-mono text-xs uppercase tracking-widest">{t.services.worldClassBadge}</span>
                    </div>
                    <MotionH1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black text-neutral-light leading-[0.9] tracking-tighter"
                    >
                        {t.nav.services}
                    </MotionH1>
                </div>
                <div className="max-w-md text-neutral-dim text-sm md:text-base leading-relaxed">
                    {t.services.heroDescription}
                </div>
             </div>
        </div>

        {/* BENTO GRID - CORE SERVICES */}
        <Section className="py-0 md:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[250px] gap-4">
                {allServices.map((service, index) => (
                    <MotionDiv
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className={`group relative border border-neutral-light/10 overflow-hidden flex flex-col justify-between p-6 md:p-8 hover:shadow-2xl transition-all duration-500 rounded-sm ${getGridSpan(index)}`}
                    >
                        {/* Background Image - Cinematic & Darkened */}
                        <div className="absolute inset-0 z-0 bg-neutral-900">
                             {service.image && (
                                <img 
                                    src={service.image} 
                                    alt={service.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                                />
                             )}
                             {/* Gradient Overlay for Text Readability */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300" />
                        </div>
                        
                        {/* Top Section: Icon & Number */}
                        <div className="relative z-10 flex justify-between items-start">
                            <div className="p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white group-hover:text-accent group-hover:bg-black/50 group-hover:border-accent/50 transition-all duration-300">
                                {getIcon(service.icon, 24)}
                            </div>
                            <span className="font-mono text-[10px] text-white/50 group-hover:text-accent transition-colors">
                                0{index + 1}
                            </span>
                        </div>

                        {/* Middle/Bottom Content */}
                        <div className="relative z-10 mt-auto">
                            {/* Title: Always White for contrast against image */}
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:-translate-y-1 transition-transform duration-300">
                                {service.title}
                            </h3>
                            
                            {/* Expandable Description */}
                            <div className="h-0 overflow-hidden group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                                <p className="text-sm text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {service.features.slice(0, 3).map((f, i) => (
                                        <span key={i} className="text-[10px] uppercase font-mono border border-white/20 bg-black/30 backdrop-blur-sm px-2 py-1 rounded text-white/80">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Default State: Just an arrow hint */}
                            <div className="group-hover:hidden text-white/60 text-xs flex items-center gap-2 mt-2">
                                <Plus size={14} className="text-accent" />
                                <span className="uppercase tracking-wider text-[10px] font-mono">{t.common.explore}</span>
                            </div>
                        </div>

                    </MotionDiv>
                ))}
            </div>
        </Section>

        {/* PREMIUM SERVICES - INNOVATION ATELIER */}
        <section className="bg-secondary/20 py-20 md:py-32 relative overflow-hidden">
             {/* Tech Decoration Lines */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

             <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-accent">
                             <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                             <span className="font-mono text-xs uppercase tracking-[0.2em]">{t.services.premiumLabel}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-neutral-light">
                            {t.services.sectionAtelier}
                        </h2>
                    </div>
                    <p className="max-w-sm text-neutral-dim text-sm text-right rtl:text-left">
                        {t.services.atelierSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {premiumServices.map((service, index) => (
                        <MotionDiv 
                            key={service.id} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-[450px] overflow-hidden rounded-sm border border-neutral-light/10 hover:border-accent/50 hover:shadow-2xl transition-all duration-500"
                        >
                             {/* Background Image - Cinematic & Darkened */}
                             <div className="absolute inset-0 z-0 bg-neutral-900">
                                 {service.image && (
                                    <img 
                                        src={service.image} 
                                        alt={service.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out"
                                    />
                                 )}
                                 {/* Stronger Bottom Gradient for text readability */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-opacity duration-300" />
                            </div>

                            <div className="relative z-10 flex flex-col justify-between h-full p-8">
                                {/* Top: Icon */}
                                <div className="flex justify-between items-start">
                                    <div className="p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white group-hover:text-accent group-hover:bg-black/60 group-hover:border-accent/60 transition-all duration-300 shadow-lg">
                                        {getIcon(service.icon, 28)}
                                    </div>
                                    <ArrowUpRight className="text-white/40 group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100 rtl-flip transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                </div>

                                {/* Bottom: Content */}
                                <div>
                                     <h3 className="text-2xl font-bold text-white mb-3 group-hover:-translate-y-1 transition-transform duration-300">
                                        {service.title}
                                    </h3>
                                    
                                    <p className="text-sm text-gray-300 leading-relaxed mb-6 line-clamp-3 group-hover:text-white/90 transition-colors">
                                        {service.description}
                                    </p>

                                    {/* Features Pills */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((feat, i) => (
                                            <span key={i} className="text-[10px] uppercase font-mono border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-sm text-white/70 group-hover:text-accent group-hover:border-accent/30 transition-colors duration-300">
                                                {feat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Active Edge Line */}
                            <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-accent group-hover:w-full transition-all duration-700 ease-out z-20" />
                        </MotionDiv>
                    ))}
                </div>
             </div>
        </section>
    </>
  );
};

export default Services;

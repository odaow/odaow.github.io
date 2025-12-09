
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
        {/* COMPACT HERO & INTRO */}
        <div className="relative pt-32 pb-12 px-4 md:px-6 min-h-[50vh] flex flex-col justify-end bg-transparent overflow-hidden">
             {/* Architectural Background Image */}
             <div className="absolute inset-0 z-0 w-full h-full">
                 <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
                    alt="Services Architecture"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                 />
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

        {/* SWISS GRID - CORE SERVICES */}
        <Section className="py-0 md:pb-24">
            <div className="mb-12">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-dim mb-2">// 01</h3>
                <h2 className="text-2xl font-bold text-neutral-light">{t.services.sectionCore}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <MotionDiv
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group flex flex-col h-full border-t border-neutral-light/20 pt-6 hover:border-accent transition-colors duration-500"
                    >
                        {/* Number & Icon */}
                        <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-xs text-neutral-dim group-hover:text-accent transition-colors">
                                0{index + 1}
                            </span>
                            <div className="text-neutral-light group-hover:text-accent transition-colors duration-300 transform group-hover:scale-110 origin-right rtl:origin-left">
                                {getIcon(service.icon, 32)}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                             <div className="aspect-[4/3] w-full mb-6 overflow-hidden rounded-sm bg-secondary relative">
                                {service.image && (
                                    <img 
                                        src={service.image} 
                                        alt={service.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                             </div>

                             <h3 className="text-xl font-bold text-neutral-light mb-3 group-hover:text-accent transition-colors">
                                {service.title}
                             </h3>
                             <p className="text-sm text-neutral-dim leading-relaxed mb-4">
                                {service.description}
                             </p>
                        </div>

                        {/* Footer Features */}
                        <ul className="mt-auto space-y-1 border-l border-neutral-light/10 pl-4 rtl:pl-0 rtl:border-l-0 rtl:border-r rtl:pr-4">
                            {service.features.map((feat, i) => (
                                <li key={i} className="text-[10px] font-mono uppercase text-neutral-dim/70">
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </MotionDiv>
                ))}
            </div>
        </Section>

        {/* CREATIVE STUDIOS (PREMIUM) */}
        <section className="bg-secondary/20 py-20 md:py-32 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

             <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-accent">
                             <h3 className="text-xs font-mono uppercase tracking-widest">// 02</h3>
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
                            className="group relative h-[500px] overflow-hidden rounded-sm border border-neutral-light/10 bg-primary hover:border-accent/50 transition-all duration-500"
                        >
                             {/* Full Background Image */}
                             <div className="absolute inset-0 z-0">
                                 {service.image && (
                                    <img 
                                        src={service.image} 
                                        alt={service.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />
                                 )}
                                 <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                            </div>

                            <div className="relative z-10 flex flex-col justify-between h-full p-8">
                                {/* Top */}
                                <div className="flex justify-between items-start">
                                    <div className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm text-accent">
                                        {getIcon(service.icon, 24)}
                                    </div>
                                    <span className="font-mono text-xs text-white/30 group-hover:text-accent transition-colors">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* Bottom */}
                                <div>
                                     <h3 className="text-2xl font-bold text-white mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                                        {service.title}
                                    </h3>
                                    
                                    <p className="text-sm text-gray-400 leading-relaxed mb-6 border-l-2 border-accent pl-4 rtl:pl-0 rtl:border-l-0 rtl:border-r rtl:pr-4">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((feat, i) => (
                                            <span key={i} className="text-[10px] uppercase font-mono border border-white/10 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-sm text-white/70">
                                                {feat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </MotionDiv>
                    ))}
                </div>
             </div>
        </section>
    </>
  );
};

export default Services;

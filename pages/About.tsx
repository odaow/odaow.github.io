
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Target, Zap, Shield, Leaf, Box, Award, Fingerprint, Activity, Layers, Globe, ArrowRight, Check, Sparkles, Compass } from 'lucide-react';
import { TeamMember } from '../types';

/**
 * Architectural Sidebar Component
 */
const ArchitecturalSidebar = ({ side }: { side: 'left' | 'right' }) => {
    const { direction } = useLanguage();
    const isRtl = direction === 'rtl';
    const positionClass = side === 'left' 
        ? (isRtl ? 'right-4 md:right-8' : 'left-4 md:left-8')
        : (isRtl ? 'left-4 md:left-8' : 'right-4 md:right-8');

    return (
        <div className={`fixed top-1/2 -translate-y-1/2 z-[40] hidden xl:flex flex-col items-center gap-12 pointer-events-none mix-blend-difference opacity-20 ${positionClass}`}>
            <div className="h-40 w-px bg-accent/50" />
            <div className="vertical-text font-mono text-[8px] uppercase tracking-[1em] whitespace-nowrap text-accent">
                {side === 'left' ? 'COORD_SYS: 32.32N / 35.37E' : 'VERIFICATION_ID: NEB-2024-INTEL'}
            </div>
            <div className="h-40 w-px bg-accent/50" />
        </div>
    );
};

/**
 * Human Authority Row Component (Leadership)
 */
const LeadershipRow = ({ member, index }: { member: TeamMember, index: number }) => {
    const { direction, language } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const MotionDiv = motion.div as any;

    return (
        <MotionDiv
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group relative border-b border-neutral-light/5 py-10 md:py-20 cursor-default overflow-hidden"
        >
            <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-16 items-start px-4 md:px-0">
                {/* 1. Name & Authority Stat */}
                <div className="lg:col-span-7">
                    <div className="flex flex-col gap-1 relative">
                         <div className="flex items-center gap-4 mb-2">
                             <span className="font-mono text-accent text-[8px] md:text-[9px] uppercase tracking-[0.5em] font-bold opacity-60">
                                {member.specialty || 'Lead Engineer'}
                             </span>
                             <div className="h-px flex-1 bg-accent/10" />
                         </div>
                         
                         <h3 className="text-3xl md:text-6xl lg:text-7xl font-bold text-neutral-light group-hover:text-accent transition-all duration-700 leading-[0.95] tracking-tighter mb-4 md:mb-6">
                            {member.name}
                         </h3>

                         <div className="flex items-center gap-4 md:gap-6">
                            <span className="text-[9px] md:text-[10px] font-mono font-bold text-accent border border-accent/20 px-2 md:px-3 py-1 rounded-sm uppercase tracking-[0.25em]">
                                {member.authorityStat}
                            </span>
                            <span className="text-[10px] md:text-[11px] text-neutral-dim uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium opacity-80">
                                {member.role}
                            </span>
                         </div>
                    </div>
                </div>

                {/* 2. Bio */}
                <div className="lg:col-span-5 lg:ps-12 border-neutral-light/5 mt-4 lg:mt-0">
                    <div className="relative">
                        <QuoteIcon className="absolute -top-4 -left-4 md:-top-6 md:-left-6 opacity-5 text-accent w-6 h-6 md:w-8 md:h-8" />
                        <p className="text-sm md:text-lg text-neutral-dim leading-relaxed group-hover:text-neutral-light transition-colors duration-500 font-light">
                            {member.bio}
                        </p>
                    </div>
                    <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4 text-accent/30">
                        <Fingerprint size={18} className="group-hover:text-accent transition-colors" />
                        <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.4em]">Auth_Signature_Verified</span>
                    </div>
                </div>
            </div>

            {/* Subtle Specialty Background Graphic */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 1.1, rotate: -5 }}
                        animate={{ opacity: 0.02, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute top-0 ${direction === 'rtl' ? 'left-0' : 'right-0'} z-0 pointer-events-none`}
                    >
                         <Layers size={400} className="text-accent" strokeWidth={0.3} />
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionDiv>
    );
};

const QuoteIcon = ({ className }: { className?: string }) => (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="currentColor" className={className}>
        <path d="M14 17h4v4h-4zm16 0h4v4h-4zm-16 8h8v4h-8zm16 0h8v4h-8z" opacity=".2"/>
        <path d="M12 14v12h12V14H12zm10 10h-8v-8h8v8zm16-10v12h12V14H38zm10 10h-8v-8h8v8z"/>
    </svg>
);

const About: React.FC = () => {
  const { t, team, language, direction } = useLanguage();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  const moveX = useTransform(springX, [-500, 500], [-10, 10]);
  const moveY = useTransform(springY, [-500, 500], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Target': return <Target size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'Shield': return <Shield size={20} />;
      case 'Leaf': return <Leaf size={20} />;
      default: return <Target size={20} />;
    }
  };

  const MotionDiv = motion.div as any;
  const MotionPath = motion.path as any;
  const MotionRect = motion.rect as any;

  return (
    <div className="relative overflow-x-hidden">
        <SEO title={t.nav.about} path="/about" />
        
        <ArchitecturalSidebar side="left" />
        <ArchitecturalSidebar side="right" />

        {/* 1. HERO SECTION */}
        <Section className="pt-28 md:pt-40 pb-0">
            <div className="relative border-x border-t border-neutral-light/5 dark:border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Brand Identity */}
                    <div className="lg:col-span-8 p-6 md:p-20 border-b border-neutral-light/5">
                        <div className="flex items-center gap-4 mb-10 md:mb-16">
                            <Box className="text-accent" size={16} />
                            <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.6em] md:tracking-[0.8em] text-accent font-black">
                                {language === 'ar' ? 'القسم 01 // الهوية' : 'Section_01 // Identity'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl lg:text-[7.5rem] font-bold uppercase tracking-[-0.05em] text-neutral-light leading-[0.85] md:leading-[0.8] mb-12 md:mb-20">
                            {t.nav.about}
                        </h1>
                        <p className="text-lg md:text-3xl text-neutral-light/80 font-light leading-snug max-w-2xl italic tracking-tight">
                            "{t.about.heroText1}"
                        </p>
                    </div>

                    {/* Fibonacci Lenspod */}
                    <div 
                        className="lg:col-span-4 p-6 md:p-10 border-b border-l border-neutral-light/5 bg-secondary/20 flex flex-col justify-between"
                        onMouseMove={handleMouseMove}
                    >
                        <div className="space-y-2 md:space-y-3 mb-8 md:mb-0">
                             <span className="font-mono text-[7px] md:text-[8px] uppercase text-accent block tracking-[0.4em] font-black opacity-60">
                                {language === 'ar' ? 'سنة التأسيس' : 'Established'}
                             </span>
                             <span className="text-xl md:text-2xl font-bold text-neutral-light tracking-tight block">
                                {language === 'ar' ? 'طوباس، 2000' : 'Tubas, 2000'}
                             </span>
                        </div>

                        {/* MATHEMATICALLY ACCURATE GOLDEN RATIO DRAWING */}
                        <div className="pt-0 md:pt-10 max-w-[280px] md:max-w-full mx-auto w-full">
                            <div className="w-full aspect-square border border-accent/10 rounded-full overflow-hidden relative group cursor-crosshair bg-primary shadow-inner">
                                <div className="absolute inset-0 opacity-[0.03] blueprint-grid" />

                                <MotionDiv 
                                    className="absolute inset-0 flex items-center justify-center p-0"
                                    style={{ x: moveX, y: moveY }}
                                >
                                    <svg viewBox="0 -1 22 15" className="w-[85%] h-[85%] text-accent transition-opacity duration-1000 overflow-visible">
                                        <g opacity="0.3">
                                            <MotionRect x="0" y="0" width="13" height="13" stroke="currentColor" strokeWidth="0.05" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                                            <MotionRect x="13" y="0" width="8" height="8" stroke="currentColor" strokeWidth="0.05" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
                                            <MotionRect x="16" y="8" width="5" height="5" stroke="currentColor" strokeWidth="0.05" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} />
                                            <MotionRect x="13" y="10" width="3" height="3" stroke="currentColor" strokeWidth="0.05" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6 }} />
                                            <MotionRect x="13" y="8" width="2" height="2" stroke="currentColor" strokeWidth="0.05" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8 }} />
                                            <MotionRect x="15" y="8" width="1" height="1" stroke="currentColor" strokeWidth="0.05" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.0 }} />
                                            <MotionRect x="15" y="9" width="1" height="1" stroke="currentColor" strokeWidth="0.05" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.2 }} />
                                        </g>

                                        <MotionPath
                                            d="M 0,13 A 13,13 0 0,1 13,0 A 8,8 0 0,1 21,8 A 5,5 0 0,1 16,13 A 3,3 0 0,1 13,10 A 2,2 0 0,1 15,8 A 1,1 0 0,1 16,9 A 1,1 0 0,1 15,10"
                                            stroke="currentColor" strokeWidth="0.2" fill="none"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 5, ease: "easeInOut" }}
                                        />

                                        <g opacity="0.4">
                                            <text x="0" y="-0.5" className="font-mono text-[0.6px] fill-accent uppercase font-black">Ref_13.00</text>
                                            <text x="13.5" y="-0.5" className="font-mono text-[0.6px] fill-accent uppercase font-black">Ref_08.00</text>
                                            <motion.line x1="13" y1="0" x2="13" y2="-1" stroke="currentColor" strokeWidth="0.02" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} />
                                        </g>

                                        <motion.circle cx="15" cy="10" r="0.25" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 4 }} />
                                        
                                        <text x="16" y="9.8" className="font-mono text-[0.5px] fill-accent uppercase tracking-widest opacity-60 font-bold">
                                            PHI_CONSTRUCT
                                        </text>
                                        <text x="0" y="14" className="font-mono text-[0.4px] fill-accent uppercase tracking-[0.2em] opacity-30 font-black">
                                            Scale_1.618033:1
                                        </text>
                                    </svg>
                                </MotionDiv>

                                <div className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center font-mono text-[6px] md:text-[7px] text-accent tracking-[0.6em] md:tracking-[0.8em] font-black opacity-30 pointer-events-none">
                                    PRECISION_GEO_CERT: #1.618
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>

        {/* 2. STORY & MISSION */}
        <Section className="py-20 md:py-40">
            <div className="max-w-6xl mx-auto px-4 md:px-0">
                 <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
                    <div className="flex-1">
                        <h3 className="font-mono text-accent text-[8px] uppercase tracking-[0.6em] md:tracking-[0.8em] mb-12 md:mb-20 flex items-center gap-4 md:gap-6 font-black">
                            <span className="w-8 md:w-10 h-[1px] bg-accent" />
                            {t.about.history.title}
                        </h3>
                        <div className="ps-6 md:ps-12 border-l border-neutral-light/5 space-y-20 md:space-y-32 relative">
                            <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 bg-accent rounded-full" />
                                <span className="font-mono text-[9px] md:text-[10px] text-accent block mb-6 md:mb-8 tracking-[0.4em] uppercase font-black">YEAR_2000 // Inception</span>
                                <p className="text-lg md:text-2xl text-neutral-light leading-relaxed font-light max-w-2xl tracking-tight">
                                    {t.about.history.content.split('. ')[0]}.
                                </p>
                            </MotionDiv>
                            
                            <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                <div className="p-6 md:p-10 border border-neutral-light/5 hover:border-accent/10 transition-colors relative group bg-secondary/5 rounded-sm">
                                    <Zap className="text-accent/40 group-hover:text-accent mb-4 md:mb-6 transition-colors" size={20} />
                                    <p className="text-base md:text-xl text-neutral-dim font-medium leading-relaxed italic group-hover:text-neutral-light transition-colors">
                                        {t.about.digitalPioneer}
                                    </p>
                                </div>
                            </MotionDiv>
                        </div>
                    </div>

                    <div className="w-full md:w-80 shrink-0 space-y-8 md:space-y-12">
                         <div className="p-8 md:p-10 border border-neutral-light/5 bg-secondary/10 backdrop-blur rounded-sm group hover:border-accent/20 transition-all duration-500">
                            <Target size={20} className="text-accent/60 mb-6 md:mb-8" />
                            <h3 className="font-mono text-accent text-[8px] uppercase tracking-[0.5em] mb-4 md:mb-6 font-black">{t.about.mission.title}</h3>
                            <p className="text-sm md:text-base text-neutral-dim leading-relaxed font-light group-hover:text-neutral-light transition-colors">
                                {t.about.mission.content}
                            </p>
                         </div>

                         <div className="p-8 md:p-10 border border-neutral-light/5 bg-secondary/10 backdrop-blur rounded-sm group hover:border-accent/20 transition-all duration-500">
                            <Sparkles size={20} className="text-accent/60 mb-6 md:mb-8" />
                            <h3 className="font-mono text-accent text-[8px] uppercase tracking-[0.5em] mb-4 md:mb-6 font-black">{t.about.vision.title}</h3>
                            <p className="text-sm md:text-base text-neutral-dim leading-relaxed font-light group-hover:text-neutral-light transition-colors">
                                {t.about.vision.content}
                            </p>
                         </div>
                    </div>
                 </div>
            </div>
        </Section>

        {/* 3. IMPACT RIBBON */}
        <div className="bg-neutral-light dark:bg-white text-primary py-20 md:py-28 relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 items-center">
                <div className="text-center md:text-start">
                    <span className="text-5xl md:text-8xl font-bold leading-none block tracking-[-0.08em] mb-2">+2.5M</span>
                    <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.5em] md:tracking-[0.6em] font-black opacity-40">
                        {language === 'ar' ? 'متر مربع تم تصميمه' : 'Square Meters Designed'}
                    </span>
                </div>
                <div className="text-center md:text-start border-y md:border-y-0 md:border-x border-primary/5 py-10 md:py-0 md:px-16">
                    <span className="text-5xl md:text-8xl font-bold leading-none block tracking-[-0.08em] mb-2">24+</span>
                    <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.5em] md:tracking-[0.6em] font-black opacity-40">
                        {language === 'ar' ? 'عاماً من التفاني' : 'Years of Dedication'}
                    </span>
                </div>
                <div className="text-center md:text-start">
                    <span className="text-5xl md:text-8xl font-bold leading-none block tracking-[-0.08em] mb-2">100%</span>
                    <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.5em] md:tracking-[0.6em] font-black opacity-40">
                        {language === 'ar' ? 'نزاهة هندسية' : 'Engineering Integrity'}
                    </span>
                </div>
            </div>
        </div>

        {/* 4. LEADERSHIP */}
        <Section className="py-24 md:py-48 bg-primary">
            <div className="mb-16 md:mb-32 px-4 md:px-0">
                <div className="flex items-center gap-6 mb-8 md:mb-10">
                    <div className="h-[1px] w-12 md:w-20 bg-accent/40" />
                    <span className="text-accent font-mono text-[7px] md:text-[8px] uppercase tracking-[0.8em] md:tracking-[1em] font-black opacity-80">The Authority</span>
                </div>
                <h2 className="text-4xl md:text-8xl font-bold text-neutral-light uppercase tracking-tighter leading-none">
                    {t.about.leadership}
                </h2>
            </div>

            <div className="flex flex-col border-t border-neutral-light/5">
                {team.map((member, i) => (
                    <LeadershipRow key={member.id} member={member} index={i} />
                ))}
            </div>
        </Section>

        {/* 5. CORE VALUES */}
        <Section className="pb-24 md:pb-48">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-0">
                {t.about.values.items.map((v, i) => (
                    <MotionDiv 
                        key={i}
                        whileHover={{ y: -8 }}
                        className="group p-8 md:p-12 bg-secondary/10 border border-neutral-light/5 rounded-sm relative overflow-hidden flex flex-col justify-between h-72 md:h-80 transition-all duration-700"
                    >
                        <div className="absolute top-8 right-8 md:top-10 md:right-10 text-accent/5 group-hover:text-accent/10 transition-all duration-700">
                            {getIcon(v.icon)}
                        </div>
                        
                        <div>
                            <div className="w-10 h-10 md:w-12 md:h-12 border border-accent/10 flex items-center justify-center text-accent/40 mb-8 md:mb-10 group-hover:border-accent group-hover:bg-accent group-hover:text-primary transition-all duration-700">
                                {getIcon(v.icon)}
                            </div>
                            <h4 className="text-neutral-light font-bold uppercase tracking-[0.1em] text-lg md:text-xl mb-4 md:mb-6 leading-none">{v.title}</h4>
                        </div>
                        
                        <p className="text-neutral-dim text-[9px] md:text-[10px] leading-relaxed uppercase tracking-[0.2em] md:tracking-[0.25em] font-mono opacity-60 group-hover:text-neutral-light group-hover:opacity-100 transition-all">
                            {v.desc}
                        </p>

                        <div className="absolute bottom-4 right-8 md:bottom-6 md:right-10 font-mono text-[6px] md:text-[7px] opacity-10 uppercase tracking-[0.4em] font-black">
                            V_24_CERT
                        </div>
                    </MotionDiv>
                ))}
            </div>
        </Section>

        {/* 6. CALL TO ACTION */}
        <Section className="pb-32 md:pb-64 pt-10 md:pt-20 px-4 md:px-0">
            <div className="max-w-5xl mx-auto border border-accent/10 bg-secondary/5 rounded-sm p-8 md:p-24 relative overflow-hidden group/closer">
                <div className="absolute -top-20 -right-20 md:top-1/2 md:right-20 md:-translate-y-1/2 opacity-[0.03] group-hover/closer:opacity-[0.08] transition-opacity duration-1000 pointer-events-none">
                    <svg width="450" height="450" viewBox="0 0 400 400" className="text-accent animate-spin-slow">
                        <defs>
                            <path id="circlePathAbout" d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
                        </defs>
                        <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="12 12" />
                        <text className="font-mono text-[10px] uppercase tracking-[0.8em] fill-current font-black">
                            <textPath href="#circlePathAbout">
                                AL NEBRAS ENGINEERING OFFICE • PRECISION • AUTHORITY • VISION • EST. 2000 •
                            </textPath>
                        </text>
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 text-center md:text-start">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-8 md:mb-10 justify-center md:justify-start">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-accent/5 rounded-full flex items-center justify-center text-accent/60 border border-accent/10">
                                <Award size={18} />
                            </div>
                            <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.5em] md:tracking-[0.6em] text-accent font-black">Building Legacies</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-bold text-neutral-light mb-8 md:mb-10 leading-[1] md:leading-[0.95] uppercase tracking-tighter">
                            {language === 'ar' ? 'توقيع التميز الهنـدسي' : 'The Signature of Excellence'}
                        </h2>
                        <p className="text-base md:text-xl text-neutral-dim/80 font-light leading-relaxed max-w-md">
                            {language === 'ar' ? 'لنوقع عقد نجاحك القادم بناءً على أسس صلبة ورؤية مبتكرة.' : "Let's sign your next success contract based on solid foundations and innovative vision."}
                        </p>
                    </div>

                    <div className="shrink-0 flex flex-col items-center gap-8 md:gap-10 w-full md:w-auto">
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center justify-center gap-6 md:gap-10 w-full md:w-auto px-8 md:px-12 py-5 md:py-6 bg-accent text-primary font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs rounded-sm hover:bg-white transition-all duration-700 group/btn shadow-xl shadow-accent/5"
                        >
                            {language === 'ar' ? 'ابدأ مشروعك' : 'Start Project'}
                            <ArrowRight className="group-hover/btn:translate-x-2 transition-transform rtl-flip" />
                        </Link>
                        
                        <div className="flex items-center gap-3 md:gap-4 text-[8px] md:text-[9px] font-mono uppercase tracking-[0.4em] text-neutral-dim/40 font-black">
                            <Check size={12} className="text-accent/40" />
                            {language === 'ar' ? 'مستند موثق' : 'Verified'}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-24 md:mt-40 pt-10 border-t border-neutral-light/5 flex flex-wrap justify-between items-center opacity-20 font-mono text-[7px] md:text-[8px] uppercase tracking-[0.6em] md:tracking-[0.8em] gap-6 md:gap-8 font-black">
                <div className="flex items-center gap-4">
                    <Award size={14} />
                    <span>ISO_9001_COMPLIANT</span>
                </div>
                <span>STATE_OF_PALESTINE_LICENSE: #N-402</span>
            </div>
        </Section>
    </div>
  );
};

export default About;

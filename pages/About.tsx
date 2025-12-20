
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
            <div className="vertical-text font-mono text-[9px] uppercase tracking-[0.8em] whitespace-nowrap text-accent">
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
    const MotionPath = motion.path as any;

    return (
        <MotionDiv
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group relative border-b border-neutral-light/10 py-16 md:py-24 cursor-default overflow-hidden"
        >
            <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-12 items-start">
                {/* 1. Name & Authority Stat */}
                <div className="lg:col-span-7">
                    <div className="flex flex-col gap-2 relative">
                         <div className="flex items-center gap-4 mb-2">
                             <span className="font-mono text-accent text-[10px] uppercase tracking-[0.4em] opacity-60">
                                {member.specialty || 'Lead Engineer'}
                             </span>
                             <div className="h-px flex-1 bg-accent/10" />
                         </div>
                         
                         <h3 className="text-5xl md:text-8xl font-black text-neutral-light group-hover:text-accent transition-all duration-700 leading-[0.85] tracking-tighter mb-6">
                            {member.name}
                         </h3>

                         {/* Signature Line Animation */}
                         <div className="absolute -bottom-2 left-0 w-full h-1 overflow-hidden pointer-events-none">
                            <motion.div 
                                initial={{ x: direction === 'rtl' ? '100%' : '-100%' }}
                                animate={{ x: isHovered ? '0%' : (direction === 'rtl' ? '100%' : '-100%') }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent"
                            />
                         </div>

                         <div className="flex items-center gap-6">
                            <span className="text-[11px] font-mono font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-sm uppercase tracking-widest">
                                {member.authorityStat}
                            </span>
                            <span className="text-xs text-neutral-dim uppercase tracking-[0.2em] font-medium">
                                {member.role}
                            </span>
                         </div>
                    </div>
                </div>

                {/* 2. Bio */}
                <div className="lg:col-span-5 lg:ps-12 border-neutral-light/5">
                    <div className="relative">
                        <QuoteIcon className="absolute -top-6 -left-6 opacity-5 text-accent" />
                        <p className="text-lg md:text-xl text-neutral-dim leading-relaxed group-hover:text-neutral-light transition-colors duration-500 font-light">
                            {member.bio}
                        </p>
                    </div>
                    <div className="mt-10 flex items-center gap-4 text-accent/40">
                        <Fingerprint size={24} className="group-hover:text-accent transition-colors" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em]">Auth_Signature_Verified</span>
                    </div>
                </div>
            </div>

            {/* Subtle Specialty Background Graphic */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 1.1, rotate: -5 }}
                        animate={{ opacity: 0.03, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute top-0 ${direction === 'rtl' ? 'left-0' : 'right-0'} z-0 pointer-events-none`}
                    >
                         <Layers size={500} className="text-accent" strokeWidth={0.5} />
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionDiv>
    );
};

const QuoteIcon = ({ className }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" className={className}>
        <path d="M14 17h4v4h-4zm16 0h4v4h-4zm-16 8h8v4h-8zm16 0h8v4h-8z" opacity=".2"/>
        <path d="M12 14v12h12V14H12zm10 10h-8v-8h8v8zm16-10v12h12V14H38zm10 10h-8v-8h8v8z"/>
    </svg>
);

const About: React.FC = () => {
  const { t, team, language, direction } = useLanguage();
  
  // Parallax Mouse Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  const moveX = useTransform(springX, [-500, 500], [-15, 15]);
  const moveY = useTransform(springY, [-500, 500], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Target': return <Target size={24} />;
      case 'Zap': return <Zap size={24} />;
      case 'Shield': return <Shield size={24} />;
      case 'Leaf': return <Leaf size={24} />;
      default: return <Target size={24} />;
    }
  };

  const MotionDiv = motion.div as any;
  const MotionPath = motion.path as any;

  return (
    <div className="relative">
        <SEO title={t.nav.about} path="/about" />
        
        <ArchitecturalSidebar side="left" />
        <ArchitecturalSidebar side="right" />

        {/* 1. HERO SECTION: THE IDENTITY */}
        <Section className="pt-32 pb-0">
            <div className="relative border-x border-t border-neutral-light/10 dark:border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Brand Identity */}
                    <div className="lg:col-span-8 p-8 md:p-20 border-b border-neutral-light/10 dark:border-white/5">
                        <div className="flex items-center gap-4 mb-12">
                            <Box className="text-accent" size={20} />
                            <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-accent">
                                {language === 'ar' ? 'القسم 01 // الهوية المؤسسية' : 'Section_01 // Corporate_Identity'}
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter text-neutral-light leading-[0.75] mb-16">
                            {t.nav.about}
                        </h1>
                        <p className="text-2xl md:text-4xl text-neutral-light font-light leading-snug max-w-3xl italic opacity-90">
                            "{t.about.heroText1}"
                        </p>
                    </div>

                    {/* Fibonacci Lenspod */}
                    <div 
                        className="lg:col-span-4 p-8 md:p-12 border-b border-l border-neutral-light/10 dark:border-white/5 bg-secondary/30 dark:bg-secondary/50 flex flex-col justify-between"
                        onMouseMove={handleMouseMove}
                    >
                        <div className="space-y-12">
                             <div>
                                <span className="font-mono text-[10px] uppercase text-accent block mb-3 tracking-widest opacity-50">
                                    {language === 'ar' ? 'سنة التأسيس' : 'Established'}
                                </span>
                                <span className="text-3xl font-black text-neutral-light tracking-tight">
                                    {language === 'ar' ? 'طوباس، 2000' : 'Tubas, 2000'}
                                </span>
                             </div>
                        </div>

                        {/* REACTIVE FIBONACCI LENS */}
                        <div className="pt-12">
                            <div className="w-full aspect-square border border-accent/20 rounded-full overflow-hidden relative group cursor-crosshair bg-primary/40 dark:bg-black/40 shadow-inner">
                                <div className="absolute inset-0 opacity-[0.03] blueprint-grid" />

                                {/* Parallax Fibonacci Spiral */}
                                <MotionDiv 
                                    className="absolute inset-0 flex items-center justify-center p-8"
                                    style={{ x: moveX, y: moveY }}
                                >
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-30 group-hover:opacity-60 transition-opacity duration-1000">
                                        <MotionPath
                                            d="M 50,50 m -40,0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0 M 50,50 L 90,50 M 50,50 L 50,10 M 50,50 L 78.28,21.72"
                                            stroke="currentColor" strokeWidth="0.5" fill="none"
                                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3 }}
                                        />
                                        <MotionPath
                                            d="M1,1 c55,0 98,43 98,98"
                                            stroke="currentColor" strokeWidth="0.5" fill="none"
                                            initial={{ pathLength: 0, scale: 0.8 }} animate={{ pathLength: 1, scale: 1 }}
                                            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                                        />
                                        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.2" fill="none" />
                                        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.2" fill="none" />
                                        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.2" fill="none" />
                                    </svg>
                                </MotionDiv>
                                
                                {/* Scanning UI */}
                                <MotionDiv 
                                    className="absolute top-1/2 left-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent z-10"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    style={{ originX: "50%", originY: "50%", x: "-50%", y: "-50%" }}
                                />

                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="p-6 rounded-full border border-accent/20 backdrop-blur-xl bg-accent/5 group-hover:bg-accent/10 transition-all duration-700">
                                        <Compass className="text-accent" size={32} strokeWidth={1} />
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-accent tracking-[0.5em] opacity-40">
                                    PRECISION_1.618
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>

        {/* 2. STORY & MISSION: THE FOUNDATION */}
        <Section className="py-32">
            <div className="max-w-6xl mx-auto">
                 <div className="flex flex-col md:flex-row gap-20 items-start">
                    {/* History Timeline */}
                    <div className="flex-1">
                        <h3 className="font-mono text-accent text-[10px] uppercase tracking-[0.6em] mb-16 flex items-center gap-6">
                            <span className="w-8 h-[1px] bg-accent" />
                            {t.about.history.title}
                        </h3>
                        <div className="ps-12 border-l border-neutral-light/10 dark:border-white/5 space-y-24 relative">
                            <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-accent rounded-full" />
                                <span className="font-mono text-xs text-accent block mb-6 tracking-widest uppercase">YEAR_2000 // Inception</span>
                                <p className="text-2xl text-neutral-light leading-relaxed font-light max-w-2xl">
                                    {t.about.history.content.split('. ')[0]}.
                                </p>
                            </MotionDiv>
                            
                            <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                <div className="p-8 bg-accent/5 border border-accent/20 rounded-sm group hover:bg-accent/10 transition-colors">
                                    <Zap className="text-accent mb-6" size={28} />
                                    <p className="text-lg md:text-xl text-neutral-light font-medium leading-relaxed italic">
                                        {t.about.digitalPioneer}
                                    </p>
                                </div>
                            </MotionDiv>
                        </div>
                    </div>

                    {/* Mission/Vision Floating Cards */}
                    <div className="w-full md:w-96 shrink-0 space-y-8">
                         <div className="p-10 border border-neutral-light/10 bg-secondary/50 backdrop-blur rounded-sm group hover:border-accent/40 transition-all duration-500">
                            <Target size={24} className="text-accent mb-8" />
                            <h3 className="font-mono text-accent text-[10px] uppercase tracking-[0.5em] mb-4">{t.about.mission.title}</h3>
                            <p className="text-lg text-neutral-light leading-relaxed font-light">
                                {t.about.mission.content}
                            </p>
                         </div>

                         <div className="p-10 border border-neutral-light/10 bg-secondary/50 backdrop-blur rounded-sm group hover:border-accent/40 transition-all duration-500">
                            <Sparkles size={24} className="text-accent mb-8" />
                            <h3 className="font-mono text-accent text-[10px] uppercase tracking-[0.5em] mb-4">{t.about.vision.title}</h3>
                            <p className="text-lg text-neutral-light leading-relaxed font-light">
                                {t.about.vision.content}
                            </p>
                         </div>
                    </div>
                 </div>
            </div>
        </Section>

        {/* 3. IMPACT RIBBON: THE NUMBERS (New Section) */}
        <div className="bg-neutral-light dark:bg-white text-primary py-24 overflow-hidden shadow-2xl relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center">
                <div className="text-center md:text-start">
                    <span className="text-[110px] font-black leading-none block tracking-tighter">+2.5M</span>
                    <span className="font-mono text-xs uppercase tracking-[0.4em] font-bold opacity-60">
                        {language === 'ar' ? 'متر مربع تم تصميمه' : 'Square Meters Designed'}
                    </span>
                </div>
                <div className="text-center md:text-start border-y md:border-y-0 md:border-x border-primary/10 py-12 md:py-0 md:px-12">
                    <span className="text-[110px] font-black leading-none block tracking-tighter">24+</span>
                    <span className="font-mono text-xs uppercase tracking-[0.4em] font-bold opacity-60">
                        {language === 'ar' ? 'عاماً من التفاني' : 'Years of Dedication'}
                    </span>
                </div>
                <div className="text-center md:text-start">
                    <span className="text-[110px] font-black leading-none block tracking-tighter">100%</span>
                    <span className="font-mono text-xs uppercase tracking-[0.4em] font-bold opacity-60">
                        {language === 'ar' ? 'نزاهة هندسية' : 'Engineering Integrity'}
                    </span>
                </div>
            </div>
        </div>

        {/* 4. LEADERSHIP: THE HUMAN AUTHORITY */}
        <Section className="py-40 bg-primary dark:bg-primary transition-colors">
            <div className="mb-24">
                <div className="flex items-center gap-6 mb-8">
                    <div className="h-[2px] w-24 bg-accent" />
                    <span className="text-accent font-mono text-xs uppercase tracking-[0.6em] font-bold">The Guardians of Excellence</span>
                </div>
                <h2 className="text-7xl md:text-9xl font-black text-neutral-light uppercase tracking-tighter leading-none">
                    {t.about.leadership}
                </h2>
            </div>

            <div className="flex flex-col border-t border-neutral-light/10 dark:border-white/5">
                {team.map((member, i) => (
                    <LeadershipRow key={member.id} member={member} index={i} />
                ))}
            </div>
        </Section>

        {/* 5. CORE VALUES: THE PILLARS */}
        <Section className="pb-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.about.values.items.map((v, i) => (
                    <MotionDiv 
                        key={i}
                        whileHover={{ y: -10 }}
                        className="group p-10 bg-secondary dark:bg-secondary/40 border border-neutral-light/10 rounded-sm relative overflow-hidden flex flex-col justify-between h-72"
                    >
                        <div className="absolute top-6 right-6 text-accent/10 group-hover:text-accent/30 transition-all duration-700 transform group-hover:scale-110">
                            {getIcon(v.icon)}
                        </div>
                        
                        <div>
                            <div className="w-14 h-14 border border-accent/20 flex items-center justify-center text-accent mb-8 group-hover:border-accent group-hover:bg-accent group-hover:text-primary transition-all duration-700">
                                {getIcon(v.icon)}
                            </div>
                            <h4 className="text-neutral-light font-black uppercase tracking-widest text-2xl mb-4 leading-none">{v.title}</h4>
                        </div>
                        
                        <p className="text-neutral-dim text-xs leading-relaxed uppercase tracking-wider font-mono opacity-60">
                            {v.desc}
                        </p>

                        <div className="absolute bottom-4 right-6 font-mono text-[8px] opacity-20 uppercase tracking-[0.3em]">
                            verified_stat_24
                        </div>
                    </MotionDiv>
                ))}
            </div>
        </Section>

        {/* 6. CALL TO ACTION: THE SIGNATURE */}
        <Section className="pb-56 pt-24">
            <div className="max-w-6xl mx-auto border border-accent/20 bg-secondary/30 rounded-lg p-12 md:p-24 relative overflow-hidden group/closer">
                {/* Visual Background Element: The Digital Stamp */}
                <div className="absolute -top-10 -right-10 md:top-1/2 md:right-20 md:-translate-y-1/2 opacity-[0.03] group-hover/closer:opacity-[0.1] transition-opacity duration-1000 pointer-events-none">
                    <svg width="450" height="450" viewBox="0 0 400 400" className="text-accent animate-spin-slow">
                        <defs>
                            <path id="circlePath" d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
                        </defs>
                        <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
                        <text className="font-mono text-[14px] uppercase tracking-[0.4em] fill-current">
                            <textPath href="#circlePath">
                                AL NEBRAS ENGINEERING OFFICE • PRECISION • AUTHORITY • VISION • EST. 2000 •
                            </textPath>
                        </text>
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 text-center md:text-start">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
                            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent border border-accent/20">
                                <Award size={24} />
                            </div>
                            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent/80 font-bold">Ready to Shape the Future?</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-neutral-light mb-8 leading-[1] uppercase tracking-tighter">
                            {language === 'ar' ? 'توقيع التميز الهنـدسي' : 'The Signature of Excellence'}
                        </h2>
                        <p className="text-xl md:text-2xl text-neutral-dim font-light leading-relaxed max-w-xl">
                            {language === 'ar' ? 'لنوقع عقد نجاحك القادم بناءً على أسس صلبة ورؤية مبتكرة.' : "Let's sign your next success contract based on solid foundations and innovative vision."}
                        </p>
                    </div>

                    <div className="shrink-0 flex flex-col items-center gap-8">
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center gap-8 px-12 py-6 bg-accent text-primary font-black uppercase tracking-[0.3em] text-sm rounded-sm hover:bg-white hover:shadow-[0_0_50px_rgba(var(--color-accent),0.5)] transition-all duration-500 group/btn"
                        >
                            {language === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
                            <ArrowRight className="group-hover/btn:translate-x-3 transition-transform rtl-flip" />
                        </Link>
                        
                        <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-dim/50">
                            <Check size={14} className="text-accent" />
                            {language === 'ar' ? 'مستند موثق إلكترونياً' : 'Electronically Verified'}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-32 pt-12 border-t border-neutral-light/10 flex flex-wrap justify-between items-center opacity-30 font-mono text-[9px] uppercase tracking-[0.5em] gap-8">
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

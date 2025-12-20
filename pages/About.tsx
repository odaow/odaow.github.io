
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Shield, Leaf, Box, MapPin, Award, Fingerprint, Activity, Layers, Globe, ArrowRight, Check, Sparkles, Compass } from 'lucide-react';
import { TeamMember } from '../types';

/**
 * Architectural Sidebar Component
 * Adds technical authority to the page margins on desktop.
 */
const ArchitecturalSidebar = ({ side }: { side: 'left' | 'right' }) => {
    const { direction } = useLanguage();
    const isRtl = direction === 'rtl';
    
    // Position logic based on RTL/LTR
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
 * Enhanced Team Row with Technical "Spine"
 */
const TeamSpineRow = ({ member, index }: { member: TeamMember, index: number }) => {
    const { direction, language } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const MotionDiv = motion.div as any;
    
    const handleMouseEnter = () => {
        setIsHovered(true);
        window.dispatchEvent(new CustomEvent('specialty-hover', { detail: member.specialty }));
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        window.dispatchEvent(new CustomEvent('specialty-hover', { detail: null }));
    };

    // Technical label translations
    const labels = {
        status: language === 'ar' ? 'الحالة' : 'Status',
        clearance: language === 'ar' ? 'المستوى' : 'Clearance',
        active: language === 'ar' ? 'قيد العمل' : 'Active_Duty',
        verified: language === 'ar' ? 'توقيع معتمد' : 'Verified Signature'
    };

    return (
        <MotionDiv
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, x: direction === 'rtl' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group relative border-b border-neutral-light/5 py-12 md:py-20 cursor-default overflow-hidden"
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.05, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                    >
                         <Layers size={400} className="text-accent" strokeWidth={0.5} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start lg:items-center">
                <div className="lg:col-span-3 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-accent text-[10px] tracking-tighter bg-accent/5 px-2 py-1 rounded-sm">
                            REF_{ (index + 1).toString().padStart(2, '0') }
                        </span>
                        <div className="h-px flex-1 bg-accent/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 font-mono text-[9px] uppercase tracking-widest text-neutral-dim">
                        <div>
                            <span className="block text-accent/40 mb-1">{labels.status}</span>
                            <span className="text-accent">{labels.active}</span>
                        </div>
                        <div>
                            <span className="block text-accent/40 mb-1">{labels.clearance}</span>
                            <span className="text-accent">Lvl_0{index + 1}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity size={14} className="text-accent animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent/60">
                            {member.specialty || 'Engineering'}
                        </span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black text-neutral-light group-hover:text-accent transition-all duration-700 leading-none mb-4">
                        {member.name}
                    </h3>
                    <span className="inline-block px-3 py-1 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/5">
                        {member.role}
                    </span>
                </div>

                <div className="lg:col-span-4 lg:ps-8 border-l border-neutral-light/5">
                    <p className="text-sm md:text-base text-neutral-dim leading-relaxed group-hover:text-neutral-light transition-colors duration-500">
                        {member.bio}
                    </p>
                    <div className="mt-6 flex items-center gap-4 text-accent">
                        <Fingerprint size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">{labels.verified}</span>
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};

const About: React.FC = () => {
  const { t, team, language, direction } = useLanguage();

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

  // Final section translations
  const signatureTexts = {
      title: language === 'ar' ? 'توقيع التميز الهندسي' : 'The Signature of Excellence',
      subtitle: language === 'ar' ? 'لنوقع عقد نجاحك القادم بناءً على أسس صلبة ورؤية مبتكرة.' : "Let's sign your next success contract based on solid foundations and innovative vision.",
      cta: language === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project Now',
      verified: language === 'ar' ? 'مستند موثق إلكترونياً' : 'Electronically Verified Document'
  };

  return (
    <div className="relative">
        <SEO title={t.nav.about} path="/about" />
        
        <ArchitecturalSidebar side="left" />
        <ArchitecturalSidebar side="right" />

        {/* 1. THE MODULAR HERO GRID */}
        <Section className="pt-32 pb-0">
            <div className="relative border-x border-t border-neutral-light/10">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-8 p-8 md:p-16 border-b border-neutral-light/10">
                        <div className="flex items-center gap-4 mb-8">
                            <Box className="text-accent" size={20} />
                            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
                                {language === 'ar' ? 'القسم 01 // الهوية المؤسسية' : 'Section_01 // Corporate_Identity'}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-neutral-light leading-[0.8] mb-12">
                            {t.nav.about}
                        </h1>
                        <p className="text-xl md:text-3xl text-neutral-light font-light leading-snug max-w-2xl italic">
                            "{t.about.heroText1}"
                        </p>
                    </div>

                    <div className="lg:col-span-4 p-8 border-b border-l border-neutral-light/10 bg-secondary/30 flex flex-col justify-between">
                        <div className="space-y-12">
                             <div>
                                <span className="font-mono text-[9px] uppercase text-accent block mb-2 opacity-50">
                                    {language === 'ar' ? 'سنة التأسيس' : 'Established'}
                                </span>
                                <span className="text-2xl font-bold text-neutral-light">
                                    {language === 'ar' ? 'طوباس، 2000' : 'Tubas, 2000'}
                                </span>
                             </div>
                             {/* REMOVED CLASSIFICATION BOX FOR CLEANER LOOK */}
                        </div>
                        <div className="pt-8">
                            {/* UPGRADED TECHNICAL LENS: THE FIBONACCI BLUEPRINT */}
                            <div className="w-full aspect-square border border-accent/20 rounded-full overflow-hidden relative group cursor-crosshair bg-primary/40 shadow-inner">
                                
                                {/* Background Tech Pattern */}
                                <div className="absolute inset-0 opacity-[0.03] blueprint-grid" />

                                {/* THE FIBONACCI SPIRAL (SVG) */}
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-30 group-hover:opacity-60 transition-opacity duration-1000">
                                        <MotionPath
                                            d="M 50,50 m -40,0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0 M 50,50 L 90,50 M 50,50 L 50,10 M 50,50 L 78.28,21.72"
                                            stroke="currentColor"
                                            strokeWidth="0.5"
                                            fill="none"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 3, ease: "easeInOut" }}
                                        />
                                        <MotionPath
                                            d="M1,1 c55,0 98,43 98,98"
                                            stroke="currentColor"
                                            strokeWidth="0.5"
                                            fill="none"
                                            initial={{ pathLength: 0, scale: 0.5 }}
                                            animate={{ pathLength: 1, scale: 0.8 }}
                                            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                                            style={{ originX: "0px", originY: "0px" }}
                                        />
                                        {/* Golden Ratio Circles */}
                                        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.2" fill="none" />
                                        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.2" fill="none" />
                                        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.2" fill="none" />
                                    </svg>
                                </div>
                                
                                {/* Rotating Radar Line */}
                                <MotionDiv 
                                    className="absolute top-1/2 left-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent z-10"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    style={{ originX: "50%", originY: "50%", x: "-50%", y: "-50%" }}
                                />

                                {/* Static Blueprint Marks */}
                                <div className="absolute inset-0 border border-accent/5 rounded-full" />
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-px bg-accent/30" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-px bg-accent/30" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-accent/30" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-px bg-accent/30" />
                                
                                {/* Digital Status Overlay */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[7px] text-accent/80 uppercase tracking-widest z-20 bg-primary/60 px-2 py-1 backdrop-blur-sm rounded-full">
                                    Ratio_Analysis_Active
                                </div>
                                
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="p-5 rounded-full border border-accent/20 backdrop-blur-md bg-accent/5 group-hover:bg-accent/10 transition-colors">
                                        <Compass className="text-accent" size={28} strokeWidth={1} />
                                    </div>
                                </div>

                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
                                    <span className="font-mono text-[8px] text-accent animate-pulse">PRECISION_1.618</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>

        {/* 2. TIMELINE BLUEPRINT */}
        <Section className="py-24">
            <div className="max-w-5xl mx-auto">
                 <div className="flex flex-col md:flex-row gap-16 items-start">
                    <div className="flex-1">
                        <h3 className="font-mono text-accent text-[10px] uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                            <span className="w-4 h-[1px] bg-accent" />
                            {t.about.history.title}
                        </h3>
                        <div className="relative ps-12 border-l border-accent/20 space-y-16">
                            <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(var(--color-accent),0.8)]" />
                                <span className="font-mono text-xs text-accent block mb-4 tracking-widest">
                                    {language === 'ar' ? 'عام_2000' : 'YEAR_2000'}
                                </span>
                                <p className="text-lg md:text-xl text-neutral-light leading-relaxed font-light">
                                    {t.about.history.content.split('. ')[0]}.
                                </p>
                            </MotionDiv>
                            
                            <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                                <div className="absolute -left-[5px] top-[40%] w-2 h-2 bg-accent rounded-full opacity-40" />
                                <span className="font-mono text-xs text-accent block mb-4 tracking-widest">
                                    {language === 'ar' ? 'عام_2015' : 'YEAR_2015'}
                                </span>
                                <div className="p-6 bg-accent/5 border border-accent/20 rounded-sm">
                                    <Zap className="text-accent mb-4" size={24} />
                                    <p className="text-sm md:text-base text-neutral-light font-medium leading-relaxed">
                                        {t.about.digitalPioneer}
                                    </p>
                                </div>
                            </MotionDiv>

                            <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                                <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-accent rounded-full opacity-40" />
                                <span className="font-mono text-xs text-accent block mb-4 tracking-widest">
                                    {language === 'ar' ? 'الوقت_الحاضر' : 'PRESENT_DAY'}
                                </span>
                                <p className="text-lg text-neutral-dim leading-relaxed font-light italic">
                                    {language === 'ar' ? 'نستكمل مسيرة الدقة والتميز في كافة أرجاء الوطن.' : 'Continuing the legacy of precision across Palestine.'}
                                </p>
                            </MotionDiv>
                        </div>
                    </div>

                    {/* Mission & Vision Badges */}
                    <div className="w-full md:w-80 shrink-0 space-y-6">
                         {/* Mission */}
                         <div className="p-8 border border-neutral-light/10 bg-secondary/50 relative overflow-hidden rounded-sm group hover:border-accent/40 transition-colors">
                            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-accent/30 translate-x-2 -translate-y-2" />
                            <Target size={20} className="text-accent mb-6" />
                            <h3 className="font-mono text-accent text-[10px] uppercase tracking-[0.5em] mb-4">{t.about.mission.title}</h3>
                            <p className="text-base text-neutral-light leading-relaxed font-light">
                                {t.about.mission.content}
                            </p>
                         </div>

                         {/* Vision */}
                         <div className="p-8 border border-neutral-light/10 bg-secondary/50 relative overflow-hidden rounded-sm group hover:border-accent/40 transition-colors">
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-accent/30 -translate-x-2 translate-y-2" />
                            <Sparkles size={20} className="text-accent mb-6" />
                            <h3 className="font-mono text-accent text-[10px] uppercase tracking-[0.5em] mb-4">{t.about.vision.title}</h3>
                            <p className="text-base text-neutral-light leading-relaxed font-light">
                                {t.about.vision.content}
                            </p>
                         </div>
                    </div>
                 </div>
            </div>
        </Section>

        {/* 3. THE STRUCTURAL SPINE (TEAM) */}
        {team.length > 0 && (
            <Section className="py-32">
                <div className="border-t border-neutral-light/10 mb-16 pt-16">
                    <h2 className="text-5xl md:text-8xl font-black mb-4 text-neutral-light uppercase tracking-tighter">
                        {t.about.leadership}
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className="h-[2px] w-40 bg-accent" />
                        <p className="text-accent font-mono text-[11px] uppercase tracking-[0.6em]">
                            {language === 'ar' ? 'الدقة // الثقة // الرؤية' : 'Precision // Authority // Vision'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col">
                    {team.map((member, i) => (
                        <TeamSpineRow key={member.id} member={member} index={i} />
                    ))}
                </div>
            </Section>
        )}

        {/* 4. CORE VALUES: CERTIFICATION STAMPS (Bento Style) */}
        <Section className="pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.about.values.items.map((v, i) => (
                    <MotionDiv 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="group p-8 bg-secondary border border-neutral-light/5 rounded-sm relative overflow-hidden flex flex-col justify-between h-48 lg:h-64"
                    >
                        <div className="absolute top-4 right-4 text-accent/10 group-hover:text-accent/20 transition-colors">
                            {getIcon(v.icon)}
                        </div>
                        
                        <div>
                            <div className="w-12 h-12 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:border-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                                {getIcon(v.icon)}
                            </div>
                            <h4 className="text-neutral-light font-black uppercase tracking-widest text-lg md:text-xl mb-2">{v.title}</h4>
                        </div>
                        
                        <p className="text-neutral-dim text-[11px] leading-relaxed uppercase tracking-wider font-mono">
                            {v.desc}
                        </p>

                        <div className="absolute bottom-2 right-4 font-mono text-[8px] opacity-20 uppercase tracking-widest">
                            {language === 'ar' ? 'بيانات_معتمدة_24' : 'STAT_VERIFIED_24'}
                        </div>
                    </MotionDiv>
                ))}
            </div>
        </Section>

        {/* 5. THE SIGNATURE CALL (The Closer) */}
        <Section className="pb-40 pt-12">
            <div className="max-w-6xl mx-auto border border-accent/10 bg-secondary/30 rounded-lg p-10 md:p-20 relative overflow-hidden group/closer">
                {/* Visual Background Element: The Digital Stamp */}
                <div className="absolute -top-10 -right-10 md:top-1/2 md:right-20 md:-translate-y-1/2 opacity-[0.03] group-hover/closer:opacity-[0.08] transition-opacity duration-1000">
                    <svg width="400" height="400" viewBox="0 0 400 400" className="text-accent animate-spin-slow">
                        <defs>
                            <path id="circlePath" d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
                        </defs>
                        <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
                        <text className="font-mono text-[14px] uppercase tracking-[0.4em] fill-current">
                            <textPath href="#circlePath">
                                AL NEBRAS ENGINEERING OFFICE • PRECISION • AUTHORITY • VISION • EST. 2000 •
                            </textPath>
                        </text>
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-start">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent border border-accent/20">
                                <Award size={20} />
                            </div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/80">Authorized Signature Required</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-neutral-light mb-6 leading-[1.1] uppercase tracking-tighter">
                            {signatureTexts.title}
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-dim font-light leading-relaxed">
                            {signatureTexts.subtitle}
                        </p>
                    </div>

                    <div className="shrink-0 flex flex-col items-center gap-6">
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center gap-6 px-10 py-5 bg-accent text-primary font-bold uppercase tracking-[0.2em] text-sm rounded-sm hover:bg-white hover:shadow-[0_0_40px_rgba(var(--color-accent),0.5)] transition-all group/btn"
                        >
                            {signatureTexts.cta}
                            <ArrowRight className="group-hover/btn:translate-x-2 transition-transform rtl-flip" />
                        </Link>
                        
                        <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-neutral-dim/50">
                            <Check size={12} className="text-accent" />
                            {signatureTexts.verified}
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Verification Footnote */}
            <div className="mt-24 pt-8 border-t border-neutral-light/5 flex flex-wrap justify-between items-center opacity-30 font-mono text-[9px] uppercase tracking-[0.5em] px-4 gap-8">
                <div className="flex items-center gap-4">
                    <Award size={14} />
                    <span>ISO_9001_COMPLIANT</span>
                </div>
                <span>DOC_TYPE: COMPANY_PROFILE_EXT_01</span>
                <span>STATE_OF_PALESTINE_LICENSE: #N-402</span>
            </div>
        </Section>
    </div>
  );
};

export default About;

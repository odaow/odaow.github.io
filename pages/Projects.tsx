
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import SEO from '../components/SEO';
import Schema from '../components/Schema';
import OptimizedImage from '../components/OptimizedImage';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, ArrowLeft, ChevronLeft, ChevronRight, MapPin, Calendar, Ruler, Building, Armchair, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Projects: React.FC = () => {
  const { t, language, direction, projects: exteriorProjects, interiorProjects } = useLanguage();
  const location = useLocation();
  
  // View State: 'exterior' or 'interior'
  const [view, setView] = useState<'exterior' | 'interior'>('exterior');
  
  // Determine which dataset to use
  const activeProjects = view === 'exterior' ? exteriorProjects : interiorProjects;

  const [filter, setFilter] = useState('All');
  
  // Store ID instead of object to allow dynamic content updates on language switch
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Deep Link Logic: Handle navigation from Home Page
  useEffect(() => {
    if (location.state && location.state.projectId) {
      const incId = location.state.projectId;
      
      // Determine if the incoming ID belongs to interior or exterior
      // Interior IDs usually start with 'i' based on constants.ts, or we check existence
      const isInterior = interiorProjects.some(p => p.id === incId);
      
      if (isInterior) {
        setView('interior');
      } else {
        setView('exterior');
      }
      
      // Open the modal
      setSelectedProjectId(incId);
      
      // Clear state to prevent reopening on refresh (optional, but good UX)
      window.history.replaceState({}, document.title);
    }
  }, [location.state, interiorProjects]);

  // Derived state: Always get the project from the CURRENT active dataset
  // We need to look in BOTH lists if selectedProjectId is set, to ensure we find it before the view switches
  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    const foundInActive = activeProjects.find(p => p.id === selectedProjectId);
    if (foundInActive) return foundInActive;
    
    // Fallback: If view hasn't updated yet, check the other list
    const otherList = view === 'exterior' ? interiorProjects : exteriorProjects;
    return otherList.find(p => p.id === selectedProjectId) || null;
  }, [activeProjects, selectedProjectId, view, interiorProjects, exteriorProjects]);

  // Reset filter when language or view changes (unless a project is selected)
  useEffect(() => {
    if (!selectedProjectId) {
      setFilter('All');
    }
  }, [language, view, selectedProjectId]);

  // Derive unique categories based on active view
  const categories = useMemo(() => {
     return ['All', ...Array.from(new Set(activeProjects.map(p => p.category)))];
  }, [activeProjects]);

  const filteredProjects = useMemo(() => {
    return filter === 'All' 
        ? activeProjects 
        : activeProjects.filter(p => p.category === filter);
  }, [activeProjects, filter]);

  // Disable body scroll when modal or lightbox is open
  useEffect(() => {
    if (selectedProjectId || lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProjectId, lightboxIndex]);

  // Lightbox Logic
  const allImages = selectedProject 
    ? [selectedProject.image, ...(selectedProject.gallery || [])] 
    : [];

  const handleNextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % allImages.length));
  }, [allImages.length]);

  const handlePrevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + allImages.length) % allImages.length));
  }, [allImages.length]);

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') direction === 'rtl' ? handlePrevImage() : handleNextImage();
      if (e.key === 'ArrowLeft') direction === 'rtl' ? handleNextImage() : handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, direction, handleNextImage, handlePrevImage, handleCloseLightbox]);


  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const MotionDiv = motion.div as any;
  const MotionH2 = motion.h2 as any;
  const MotionButton = motion.button as any;

  return (
    <Section className="pt-32">
       <SEO 
         title={t.nav.projects} 
         description={language === 'ar' 
           ? 'استكشف مشاريع مكتب النبراس في التصميم المعماري، الديكور الداخلي، وتنسيق الحدائق.' 
           : 'Explore Al Nebras projects in architectural design, interior decoration, and landscape architecture.'}
         path="/projects"
       />
       {/* Inject Dynamic Project Schema if selected, otherwise fallback to Organization */}
       <Schema type={selectedProject ? 'project' : 'organization'} data={selectedProject} />

       {/* CATEGORY SELECTOR HERO */}
       <div className="mb-16 md:mb-24">
            <MotionH2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight text-neutral-light text-center md:text-start"
            >
                {t.projects.heading}
            </MotionH2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-[50vh] md:h-[60vh]">
                {/* Exterior Selector */}
                <div 
                    onClick={() => { setView('exterior'); setFilter('All'); }}
                    className={`relative group cursor-pointer overflow-hidden rounded-sm transition-all duration-500 border ${view === 'exterior' ? 'border-accent shadow-[0_0_30px_rgba(var(--color-accent),0.2)]' : 'border-neutral-light/10 hover:border-neutral-light/30'}`}
                >
                    <div className="absolute inset-0 z-0">
                         <OptimizedImage
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                            alt="Exterior Visualization"
                            containerClassName="w-full h-full"
                            className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${view === 'exterior' ? 'scale-105 grayscale-0' : 'scale-100 grayscale hover:scale-105'}`}
                         />
                         <div className={`absolute inset-0 transition-colors duration-500 ${view === 'exterior' ? 'bg-black/40' : 'bg-black/60 group-hover:bg-black/50'}`} />
                    </div>
                    
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6">
                         <MotionDiv 
                            animate={{ 
                                scale: view === 'exterior' ? 1.1 : 1,
                                y: view === 'exterior' ? -10 : 0
                            }}
                            className={`p-4 rounded-full mb-4 backdrop-blur-md border transition-all duration-500 ${view === 'exterior' ? 'bg-accent text-primary border-accent' : 'bg-white/10 text-neutral-light border-white/10'}`}
                         >
                            <Building size={32} />
                         </MotionDiv>
                         <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-widest mb-2 transition-colors duration-300 ${view === 'exterior' ? 'text-accent' : 'text-neutral-light'}`}>
                            {t.projects.exterior.title}
                         </h3>
                         <p className="font-mono text-xs md:text-sm text-neutral-dim uppercase tracking-wider opacity-80">
                            {t.projects.exterior.subtitle}
                         </p>

                         {/* Active Indicator */}
                         {view === 'exterior' && (
                             <MotionDiv 
                                layoutId="activeIndicator"
                                className="absolute bottom-6 w-2 h-2 bg-accent rounded-full"
                             />
                         )}
                    </div>
                </div>

                {/* Interior Selector */}
                <div 
                    onClick={() => { setView('interior'); setFilter('All'); }}
                    className={`relative group cursor-pointer overflow-hidden rounded-sm transition-all duration-500 border ${view === 'interior' ? 'border-accent shadow-[0_0_30px_rgba(var(--color-accent),0.2)]' : 'border-neutral-light/10 hover:border-neutral-light/30'}`}
                >
                    <div className="absolute inset-0 z-0">
                         <OptimizedImage
                            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
                            alt="Interior Design"
                            containerClassName="w-full h-full"
                            className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${view === 'interior' ? 'scale-105 grayscale-0' : 'scale-100 grayscale hover:scale-105'}`}
                         />
                         <div className={`absolute inset-0 transition-colors duration-500 ${view === 'interior' ? 'bg-black/40' : 'bg-black/60 group-hover:bg-black/50'}`} />
                    </div>
                    
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6">
                         <MotionDiv 
                            animate={{ 
                                scale: view === 'interior' ? 1.1 : 1,
                                y: view === 'interior' ? -10 : 0
                            }}
                            className={`p-4 rounded-full mb-4 backdrop-blur-md border transition-all duration-500 ${view === 'interior' ? 'bg-accent text-primary border-accent' : 'bg-white/10 text-neutral-light border-white/10'}`}
                         >
                            <Armchair size={32} />
                         </MotionDiv>
                         <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-widest mb-2 transition-colors duration-300 ${view === 'interior' ? 'text-accent' : 'text-neutral-light'}`}>
                            {t.projects.interior.title}
                         </h3>
                         <p className="font-mono text-xs md:text-sm text-neutral-dim uppercase tracking-wider opacity-80">
                            {t.projects.interior.subtitle}
                         </p>

                         {/* Active Indicator */}
                         {view === 'interior' && (
                             <MotionDiv 
                                layoutId="activeIndicator"
                                className="absolute bottom-6 w-2 h-2 bg-accent rounded-full"
                             />
                         )}
                    </div>
                </div>
            </div>
            
            {/* Scroll/Down Hint */}
            <div className="flex justify-center mt-8 opacity-50">
                 <ChevronDown className="animate-bounce w-6 h-6 text-neutral-dim" />
            </div>
       </div>

       {/* FILTER BAR */}
       <div className="mb-12 sticky top-24 z-30 bg-primary/95 backdrop-blur-xl py-4 border-b border-neutral-light/5">
         <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`font-mono text-[10px] md:text-xs uppercase tracking-widest px-4 md:px-6 py-2 md:py-3 rounded-sm transition-all duration-300 relative overflow-hidden group ${
                        filter === cat 
                        ? 'bg-accent text-primary font-bold shadow-[0_0_15px_rgba(var(--color-accent),0.4)]' 
                        : 'text-neutral-dim hover:text-neutral-light bg-secondary hover:bg-secondary/80'
                    }`}
                >
                    <span className="relative z-10">{cat === 'All' ? t.common.filterAll : cat}</span>
                </button>
            ))}
         </div>
       </div>

       {/* PROJECTS GRID */}
       <div className="min-h-[50vh]">
         <AnimatePresence mode="wait">
            <MotionDiv
                key={`${view}-${filter}`} // Force re-render on view or filter change
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
                {filteredProjects.map((project) => (
                    <MotionDiv 
                        variants={cardVariants}
                        key={project.id}
                        onClick={() => setSelectedProjectId(project.id)}
                        className="group cursor-pointer bg-secondary border border-neutral-light/5 hover:border-accent/50 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
                    >
                        {/* Image Container */}
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <OptimizedImage
                                src={project.image} 
                                alt={project.title} 
                                containerClassName="w-full h-full"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500" />
                            
                            {/* Hover Overlay Icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                 <div className="w-14 h-14 bg-accent/90 rounded-full flex items-center justify-center backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                                    <Maximize2 className="text-primary w-6 h-6" />
                                 </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-sm">{project.category}</span>
                                <span className="font-mono text-[10px] text-neutral-dim pt-1">{project.year}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-neutral-light group-hover:text-accent transition-colors">{project.title}</h3>
                            <p className="text-sm text-neutral-dim line-clamp-2">{project.description}</p>
                        </div>
                    </MotionDiv>
                ))}
            </MotionDiv>
         </AnimatePresence>
       </div>

       {/* PROJECT DETAIL OVERLAY - USING PORTAL */}
       {createPortal(
           <AnimatePresence>
             {selectedProject && (
                <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-primary overflow-y-auto no-scrollbar text-start"
                >
                    <div className="min-h-screen relative flex flex-col">
                        {/* Main Content Wrapper */}
                        <div className="flex-1 w-full px-4 md:px-12 pb-24 pt-24 md:pt-40 relative max-w-[1920px] mx-auto">
                            <MotionDiv
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                            >
                                {/* Back Button */}
                                <button 
                                    onClick={() => setSelectedProjectId(null)}
                                    className="inline-flex items-center gap-3 px-3 md:px-5 py-2 md:-ms-5 rounded-full hover:bg-neutral-light/5 transition-all mb-6 md:mb-8 group"
                                >
                                    <ArrowLeft size={20} className="rtl-flip text-accent group-hover:-translate-x-1 transition-transform" />
                                    <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-light group-hover:text-accent transition-colors">
                                        {t.common.backToProjects}
                                    </span>
                                </button>

                                {/* Split Layout: Side-by-Side */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
                                    
                                    {/* Column 1: Visuals */}
                                    <div className="space-y-4 md:space-y-6">
                                        {/* Main Image */}
                                        <div 
                                            className="w-full aspect-[4/3] overflow-hidden rounded-sm border border-neutral-light/10 shadow-2xl cursor-zoom-in relative group"
                                            onClick={() => setLightboxIndex(0)}
                                        >
                                            <OptimizedImage 
                                                src={selectedProject.image} 
                                                alt={selectedProject.title} 
                                                className="w-full h-full object-cover" 
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <Maximize2 className="text-white w-10 h-10 drop-shadow-md" />
                                            </div>
                                        </div>

                                        {/* Gallery Grid */}
                                        {selectedProject.gallery && (
                                            <>
                                                <h3 className="font-mono text-accent uppercase tracking-widest text-xs mb-2 mt-6 md:mt-8 opacity-80">
                                                    {t.common.gallery}
                                                </h3>
                                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                                    {selectedProject.gallery.map((img, i) => (
                                                        <div 
                                                            key={i} 
                                                            className="aspect-[4/3] overflow-hidden border border-neutral-light/5 rounded-sm cursor-zoom-in relative group"
                                                            onClick={() => setLightboxIndex(i + 1)}
                                                        >
                                                            <OptimizedImage 
                                                                src={img} 
                                                                alt={`Gallery ${i+1}`} 
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                <Maximize2 className="text-white w-8 h-8 drop-shadow-md" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Column 2: Content */}
                                    <div className="lg:sticky lg:top-32">
                                        <span className="font-mono text-accent text-xs tracking-widest uppercase mb-4 block">
                                            {selectedProject.category}
                                        </span>
                                        
                                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 leading-tight text-neutral-light">
                                            {selectedProject.title}
                                        </h2>

                                        {/* Meta Data Row with Icons */}
                                        <div className="flex flex-wrap gap-x-6 md:gap-x-8 gap-y-4 mb-8 md:mb-10 border-y border-neutral-light/10 py-4 md:py-6">
                                            <div className="flex items-center gap-2 md:gap-3 text-sm text-neutral-light">
                                                <MapPin className="text-accent w-4 h-4 md:w-5 md:h-5" />
                                                <span>{selectedProject.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 md:gap-3 text-sm text-neutral-light">
                                                <Calendar className="text-accent w-4 h-4 md:w-5 md:h-5" />
                                                <span>{selectedProject.year}</span>
                                            </div>
                                            <div className="flex items-center gap-2 md:gap-3 text-sm text-neutral-light">
                                                <Ruler className="text-accent w-4 h-4 md:w-5 md:h-5" />
                                                <span>{selectedProject.area}</span>
                                            </div>
                                        </div>

                                        <div className="mb-8 md:mb-10">
                                            <h3 className="text-lg md:text-xl font-bold mb-4 text-neutral-light">{t.common.viewProject}</h3>
                                            <p className="text-base md:text-lg text-neutral-dim leading-relaxed whitespace-pre-line">
                                                {selectedProject.description}
                                            </p>
                                        </div>

                                        {/* Specs Box */}
                                        <div className="bg-secondary p-6 md:p-8 border border-neutral-light/5 rounded-sm backdrop-blur-sm">
                                            <h3 className="font-mono text-accent uppercase tracking-widest mb-6 border-b border-accent/20 pb-2 text-xs">
                                                {t.common.specs}
                                            </h3>
                                            <ul className="space-y-4">
                                                {selectedProject.specs.map((spec, i) => (
                                                    <li key={i} className="flex justify-between items-center text-sm">
                                                        <span className="text-neutral-dim">{spec.label}</span>
                                                        <span className="font-bold text-neutral-light">{spec.value}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </MotionDiv>
                        </div>
                    </div>
                </MotionDiv>
             )}
           </AnimatePresence>,
           document.body
       )}

       {/* LIGHTBOX OVERLAY - USING PORTAL */}
       {createPortal(
           <AnimatePresence>
                {lightboxIndex !== null && selectedProject && (
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center backdrop-blur-md"
                        onClick={handleCloseLightbox}
                    >
                        <button 
                            onClick={handleCloseLightbox}
                            className="absolute top-4 end-4 md:top-8 md:end-8 p-3 text-neutral-dim hover:text-accent transition-colors z-[210]"
                        >
                            <X className="w-[28px] h-[28px] md:w-[32px] md:h-[32px]" />
                        </button>

                        <button 
                            onClick={handlePrevImage}
                            className="absolute start-2 md:start-8 top-1/2 -translate-y-1/2 p-2 md:p-4 text-neutral-dim hover:text-accent hover:bg-white/10 rounded-full transition-all z-[210] group"
                        >
                            <ChevronLeft className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rtl-flip group-active:scale-95" />
                        </button>

                        <MotionDiv
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-[95vw] md:max-w-[90vw] max-h-[80vh] md:max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={allImages[lightboxIndex]} 
                                alt="Full View" 
                                loading="lazy"
                                className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain shadow-2xl border border-white/10"
                            />
                             <div className="absolute -bottom-10 left-0 right-0 text-center font-mono text-xs text-neutral-dim">
                                {lightboxIndex + 1} / {allImages.length}
                            </div>
                        </MotionDiv>

                        <button 
                            onClick={handleNextImage}
                            className="absolute end-2 md:end-8 top-1/2 -translate-y-1/2 p-2 md:p-4 text-neutral-dim hover:text-accent hover:bg-white/10 rounded-full transition-all z-[210] group"
                        >
                            <ChevronRight className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rtl-flip group-active:scale-95" />
                        </button>
                    </MotionDiv>
                )}
           </AnimatePresence>,
           document.body
       )}
    </Section>
  );
};

export default Projects;

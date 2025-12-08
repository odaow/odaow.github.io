


import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useInView, animate, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Layers, Zap, HardHat, LayoutTemplate, Compass, Box, Trees, Lightbulb, Route,
  ArrowDown, Quote, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';

// Array of high-quality architectural images for the slider
const HERO_SLIDES = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189303/05-min_nxowmo.jpg",
    alt: "Architectural Excellence"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189303/01-less-Saturation_s3qjuv.jpg",
    alt: "Modern Design"
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189302/the-ligthting-institute-min-1_loafzh.jpg",
    alt: "Lighting Institute Facade"
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189302/12a-min_o8qlqn.jpg",
    alt: "Interior Detail"
  }
];

const StatItem = ({ value, label }: { value: string, label: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest: number) => Math.round(latest));
    
    // Parse numeric part and suffix (e.g., "250+" -> 250 and "+")
    const numericValue = parseInt((value || '0').replace(/\D/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, numericValue, { duration: 2.5, ease: "easeOut" });
            return controls.stop;
        }
    }, [isInView, count, numericValue]);

    const MotionSpan = motion.span as any;

    return (
        <div ref={ref} className="flex flex-col items-center">
            <div className="flex items-baseline text-4xl md:text-6xl font-black tracking-tighter mb-2">
                <MotionSpan>{rounded}</MotionSpan>
                <span>{suffix}</span>
            </div>
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-80">{label}</span>
        </div>
    );
};

const Home: React.FC = () => {
  const { t, projects, services, testimonials, direction } = useLanguage();
  
  // Typewriter effect state
  const [text, setText] = useState('');
  const fullText = t.hero.typewriter;
  
  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play Slider Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  useEffect(() => {
    setText('');
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  // Icon mapping
  const getIcon = (name: string) => {
    switch (name) {
      case 'Layers': return <Layers className="w-8 h-8" />;
      case 'Zap': return <Zap className="w-8 h-8" />;
      case 'HardHat': return <HardHat className="w-8 h-8" />;
      case 'LayoutTemplate': return <LayoutTemplate className="w-8 h-8" />;
      case 'Compass': return <Compass className="w-8 h-8" />;
      case 'Box': return <Box className="w-8 h-8" />;
      case 'Trees': return <Trees className="w-8 h-8" />;
      case 'Lightbulb': return <Lightbulb className="w-8 h-8" />;
      case 'Route': return <Route className="w-8 h-8" />;
      default: return <Box className="w-8 h-8" />;
    }
  };

  const featuredProjects = projects.slice(0, 3);
  // Show only top 4 services on home page
  const displayedServices = services.slice(0, 4);

  const MotionDiv = motion.div as any;
  const MotionImg = motion.img as any;

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-[100dvh] flex flex-col justify-start pt-28 pb-32 md:justify-center md:pt-0 md:pb-0 overflow-hidden group/hero">
        
        {/* SLIDER BACKGROUNDS */}
        <div className="absolute inset-0 z-0 w-full h-full bg-black">
             <AnimatePresence mode="popLayout">
               <MotionImg 
                  key={currentSlide}
                  src={HERO_SLIDES[currentSlide].image}
                  alt={HERO_SLIDES[currentSlide].alt}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
               />
             </AnimatePresence>
             
             {/* Adaptive Overlay - Deep Blue Tone similar to reference */}
             <div className="absolute inset-0 bg-blue-950/40 mix-blend-multiply z-[1]" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[2]" />
        </div>

        {/* SLIDER CONTROLS (Manual Navigation) */}
        {/* Left Arrow: Always Prev */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/20 text-white/50 hover:text-white hover:bg-white/10 hover:border-white transition-all hidden md:flex opacity-0 group-hover/hero:opacity-100 duration-500"
          aria-label="Previous Slide"
        >
          {/* No rtl-flip here, we want it to point left always */}
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Arrow: Always Next */}
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/20 text-white/50 hover:text-white hover:bg-white/10 hover:border-white transition-all hidden md:flex opacity-0 group-hover/hero:opacity-100 duration-500"
          aria-label="Next Slide"
        >
          {/* No rtl-flip here, we want it to point right always */}
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-8 bg-accent' : 'w-2 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>

        {/* HERO CONTENT */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 z-10 text-center md:text-start w-full relative">
          <MotionDiv 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="font-mono text-accent text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block drop-shadow-md">
                {t.hero.est}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight mb-6 leading-none text-white min-h-[3em] md:min-h-0 drop-shadow-2xl">
              <span className="block">{text}<span className="animate-pulse">_</span></span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mb-8 md:mb-10 font-light leading-relaxed drop-shadow-md">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
                <Link 
                  to="/projects" 
                  className="inline-flex items-center gap-4 px-6 md:px-10 py-3 md:py-4 bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-300 group font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm"
                >
                  {t.hero.cta}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform rtl-flip" />
                </Link>

                {/* Mobile Only Quick CTA */}
                <button 
                  onClick={scrollToProjects}
                  className="md:hidden flex items-center gap-2 text-sm text-gray-300 hover:text-white font-mono uppercase tracking-widest border-b border-white/30 pb-1 transition-colors"
                >
                  {t.hero.exploreProjects}
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </button>
            </div>

          </MotionDiv>
        </div>

        {/* Scroll Indicator (Desktop Only) */}
        <MotionDiv 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-30 pointer-events-none hidden md:flex"
        >
          <span className="whitespace-nowrap text-[10px] md:text-xs font-bold font-mono uppercase tracking-[0.2em] text-white/80 drop-shadow-md">
            {t.hero.scroll}
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent shadow-lg opacity-80" />
        </MotionDiv>
      </section>

      {/* FEATURED PROJECTS */}
      <Section id="projects" grid>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-neutral-light">{t.nav.projects}</h2>
            <div className="h-1 w-20 bg-accent" />
          </div>
          <Link to="/projects" className="flex items-center gap-2 text-accent font-mono text-sm hover:underline">
            {t.common.explore} <ArrowRight size={16} className="rtl-flip" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProjects.map((project, index) => (
            <Link to={`/projects`} key={project.id}>
              <MotionDiv
                whileHover={{ y: -10 }}
                className="group relative bg-secondary border border-neutral-light/5 overflow-hidden h-full shadow-sm"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                   <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                   <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                   />
                   {/* Overlay Stats */}
                   <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-primary/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                     <div className="grid grid-cols-2 gap-4 text-xs font-mono text-accent">
                        {project.specs.slice(0,2).map((s, i) => (
                            <div key={i}>
                                <span className="text-neutral-dim block">{s.label}</span>
                                {s.value}
                            </div>
                        ))}
                     </div>
                   </div>
                </div>
                <div className="p-6 border-t border-neutral-light/5">
                  <div className="flex justify-between items-start mb-2">
                     <span className="font-mono text-xs text-accent/80">{project.year}</span>
                     <span className="font-mono text-xs text-neutral-dim">{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-light group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-sm text-neutral-dim line-clamp-2">{project.description}</p>
                </div>
              </MotionDiv>
            </Link>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section>
        <div className="mb-12 md:mb-16 text-center md:text-start">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-light">{t.nav.services}</h2>
            <p className="text-neutral-dim max-w-2xl">{t.services.heroDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {displayedServices.map((service, i) => (
                <MotionDiv 
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                    className="relative p-6 md:p-8 border border-neutral-light/10 bg-secondary group overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]"
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="text-accent mb-6 transform transition-transform duration-500 ease-out group-hover:scale-110 ltr:origin-left rtl:origin-right">
                            {getIcon(service.icon)}
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-neutral-light group-hover:text-neutral-light transition-colors duration-300">{service.title}</h3>
                        <p className="text-sm text-neutral-dim mb-6 group-hover:text-neutral-light transition-colors duration-300">{service.description}</p>
                        <ul className="space-y-2">
                            {service.features.map((feat, j) => (
                                <li key={j} className="flex items-center gap-2 text-xs font-mono text-neutral-dim group-hover:text-neutral-light/90 transition-colors duration-300">
                                    <div className="w-1.5 h-1.5 bg-accent/50 group-hover:bg-accent rounded-full transition-colors duration-300" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </MotionDiv>
            ))}
        </div>

        {/* View All Services Button */}
        <div className="mt-12 flex justify-center">
            <Link 
              to="/services" 
              className="group flex items-center gap-4 px-8 md:px-10 py-4 md:py-5 border border-accent/30 bg-accent/5 hover:bg-accent hover:border-accent transition-all duration-500 rounded-sm"
            >
               <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent group-hover:text-primary transition-colors">
                 {t.common.viewAllServices}
               </span>
               <ArrowRight className="text-accent group-hover:text-primary transition-colors rtl-flip group-hover:translate-x-1" />
            </Link>
        </div>
      </Section>

      {/* TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
          <Section className="bg-secondary/20">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-light">{t.common.testimonials}</h2>
                <div className="w-20 h-1 bg-accent mx-auto" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, i) => (
                    <MotionDiv
                        key={testimonial.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-primary border border-neutral-light/5 p-8 relative rounded-sm hover:border-accent/30 transition-colors"
                    >
                        <Quote className="text-accent/20 absolute top-6 right-6 w-12 h-12 rotate-180" />
                        <p className="text-neutral-dim text-sm leading-relaxed mb-6 italic relative z-10">
                            "{testimonial.content}"
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold">
                                {testimonial.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-light text-sm">{testimonial.name}</h4>
                                <p className="text-xs text-neutral-dim/70 font-mono">{testimonial.role} {testimonial.company && `| ${testimonial.company}`}</p>
                            </div>
                        </div>
                    </MotionDiv>
                ))}
             </div>
          </Section>
      )}

      {/* STATS BANNER */}
      <div className="bg-accent text-primary py-12 md:py-20 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
                { val: '24+', label: t.hero.stats.years },
                { val: '2500+', label: t.hero.stats.projects },
                { val: '12', label: t.hero.stats.awards },
            ].map((stat, i) => (
                <StatItem key={i} value={stat.val} label={stat.label} />
            ))}
         </div>
      </div>
    </>
  );
};

export default Home;
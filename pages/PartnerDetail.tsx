import React, { useState, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Briefcase, Mail, Award, MapPin, Phone, User, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const PartnerDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, direction, partners } = useLanguage();
  const partner = partners.find(p => p.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNextImage = useCallback(() => {
    if (!partner?.gallery) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % partner.gallery!.length));
  }, [partner?.gallery]);

  const handlePrevImage = useCallback(() => {
    if (!partner?.gallery) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + partner.gallery!.length) % partner.gallery!.length));
  }, [partner?.gallery]);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') direction === 'rtl' ? handlePrevImage() : handleNextImage();
        if (e.key === 'ArrowLeft') direction === 'rtl' ? handleNextImage() : handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, direction, handleNextImage, handlePrevImage]);


  if (!partner) {
    return (
      <Section className="pt-32 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dim">{t.common.partnerNotFound}</h1>
        <Link to="/partners" className="text-accent hover:underline flex items-center gap-2">
            <ArrowLeft className="rtl-flip" /> {t.common.backToPartners}
        </Link>
      </Section>
    );
  }

  const MotionDiv = motion.div as any;
  const MotionH1 = motion.h1 as any;

  return (
    <Section className="pt-32 min-h-screen">
      {/* Back Button */}
      <Link 
        to="/partners"
        className="inline-flex items-center gap-3 px-3 md:px-5 py-2 md:-ms-5 rounded-full hover:bg-neutral-light/5 transition-all mb-8 md:mb-12 group"
      >
        <ArrowLeft size={20} className="rtl-flip text-accent group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-light group-hover:text-accent transition-colors">
            {t.common.backToPartners}
        </span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-24">
        {/* Left Column: Logo & Meta */}
        <div>
            <MotionDiv 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary border border-neutral-light/10 rounded-sm p-6 md:p-8 flex items-center justify-center aspect-square mb-8 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-accent/5" />
                <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500" />
            </MotionDiv>

            <div className="space-y-6 bg-secondary p-6 border border-neutral-light/5 rounded-sm">
                <div className="flex items-center gap-4 text-sm border-b border-neutral-light/5 pb-4">
                    <Calendar className="text-accent w-5 h-5 shrink-0" />
                    <div>
                        <span className="block text-neutral-dim text-xs uppercase tracking-wider">{t.common.partnerSince}</span>
                        <span className="font-bold text-neutral-light">{partner.since}</span>
                    </div>
                </div>

                {partner.location && (
                     <div className="flex items-center gap-4 text-sm border-b border-neutral-light/5 pb-4">
                        <MapPin className="text-accent w-5 h-5 shrink-0" />
                        <div>
                            <span className="block text-neutral-dim text-xs uppercase tracking-wider">{t.common.location}</span>
                            <span className="font-bold text-neutral-light">{partner.location}</span>
                        </div>
                    </div>
                )}
                
                {partner.director && (
                     <div className="flex items-center gap-4 text-sm border-b border-neutral-light/5 pb-4">
                        <User className="text-accent w-5 h-5 shrink-0" />
                        <div>
                            <span className="block text-neutral-dim text-xs uppercase tracking-wider">{t.common.director}</span>
                            <span className="font-bold text-neutral-light">{partner.director}</span>
                        </div>
                    </div>
                )}

                {partner.website && (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm border-b border-neutral-light/5 pb-4 group hover:text-accent transition-colors">
                        <ExternalLink className="text-accent w-5 h-5 shrink-0" />
                        <div>
                            <span className="block text-neutral-dim text-xs uppercase tracking-wider">{t.common.visitWebsite}</span>
                            <span className="font-bold text-neutral-light">{partner.website.replace(/^https?:\/\//, '')}</span>
                        </div>
                    </a>
                )}

                {partner.phone && (
                    <div className="flex items-center gap-4 text-sm border-b border-neutral-light/5 pb-4">
                        <Phone className="text-accent w-5 h-5 shrink-0" />
                        <div>
                            <span className="block text-neutral-dim text-xs uppercase tracking-wider">{t.common.phone}</span>
                            <span className="font-bold text-neutral-light" style={{ direction: 'ltr' }}>{partner.phone}</span>
                        </div>
                    </div>
                )}

                {partner.contactEmail && (
                    <div className="flex items-center gap-4 text-sm border-b border-neutral-light/5 pb-4">
                        <Mail className="text-accent w-5 h-5 shrink-0" />
                        <div>
                            <span className="block text-neutral-dim text-xs uppercase tracking-wider">{t.common.contactLabel}</span>
                            <span className="font-bold text-neutral-light break-all">{partner.contactEmail}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-2">
            <MotionH1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight text-neutral-light"
            >
                {partner.name}
            </MotionH1>

            <MotionDiv 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-lg text-neutral-light leading-relaxed mb-8 md:mb-12 whitespace-pre-line"
            >
                {partner.description}
            </MotionDiv>

            {/* Accreditation Section */}
            {partner.accreditation && (
                <MotionDiv 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-8 md:mb-12 bg-secondary border border-neutral-light/10 p-6 md:p-8 rounded-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 end-0 w-24 h-24 bg-accent/5 rounded-bl-full" />
                    <h3 className="font-mono text-accent uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10 text-sm md:text-base">
                        <Award className="w-5 h-5" /> {t.partners.accreditationHeading}
                    </h3>
                    <p className="text-neutral-light leading-relaxed relative z-10 text-sm md:text-base">
                        {partner.accreditation}
                    </p>
                </MotionDiv>
            )}

            {/* Services Grid */}
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 md:mb-12"
            >
                <h3 className="font-mono text-accent uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> {t.common.servicesProvided}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {partner.services.map((service, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 border border-neutral-light/10 bg-secondary rounded-sm hover:border-accent/30 transition-colors">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                            <span className="text-sm font-medium text-neutral-light">{service}</span>
                        </div>
                    ))}
                </div>
            </MotionDiv>

            {/* Gallery Grid */}
            {partner.gallery && partner.gallery.length > 0 && (
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="font-mono text-accent uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Maximize2 className="w-4 h-4" /> {t.common.gallery}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {partner.gallery.map((img, i) => (
                            <div 
                                key={i} 
                                className="aspect-[4/3] overflow-hidden rounded-sm border border-neutral-light/10 cursor-zoom-in relative group"
                                onClick={() => setLightboxIndex(i)}
                            >
                                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Maximize2 className="text-white w-6 h-6 drop-shadow-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                </MotionDiv>
            )}
        </div>
      </div>

       {/* Lightbox Overlay */}
       <AnimatePresence>
            {lightboxIndex !== null && partner.gallery && (
                <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center backdrop-blur-md"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button 
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-4 end-4 md:top-8 md:end-8 p-3 text-neutral-dim hover:text-accent transition-colors z-[210]"
                    >
                        <X className="w-[28px] h-[28px] md:w-[32px] md:h-[32px]" />
                    </button>

                    <button 
                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                        className="absolute start-2 md:start-8 top-1/2 -translate-y-1/2 p-2 md:p-4 text-neutral-dim hover:text-accent hover:bg-white/10 rounded-full transition-all z-[210]"
                    >
                        <ChevronLeft className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rtl-flip" />
                    </button>

                    <MotionDiv
                        key={lightboxIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-w-[95vw] md:max-w-[90vw] max-h-[80vh] md:max-h-[85vh]"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <img 
                            src={partner.gallery[lightboxIndex]} 
                            alt="Full View" 
                            loading="lazy"
                            className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain shadow-2xl border border-white/5"
                        />
                         <div className="absolute -bottom-10 left-0 right-0 text-center font-mono text-xs text-neutral-dim">
                            {lightboxIndex + 1} / {partner.gallery.length}
                        </div>
                    </MotionDiv>

                    <button 
                        onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                        className="absolute end-2 md:end-8 top-1/2 -translate-y-1/2 p-2 md:p-4 text-neutral-dim hover:text-accent hover:bg-white/10 rounded-full transition-all z-[210]"
                    >
                        <ChevronRight className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rtl-flip" />
                    </button>
                </MotionDiv>
            )}
       </AnimatePresence>

    </Section>
  );
};

export default PartnerDetail;
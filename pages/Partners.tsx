
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { motion } from 'framer-motion';
import { ArrowRight, Building, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Partners: React.FC = () => {
  const { t, partners } = useLanguage();

  const MotionH1 = motion.h1 as any;
  const MotionP = motion.p as any;
  const MotionDiv = motion.div as any;

  return (
    <Section className="pt-32 min-h-screen">
      <SEO title={t.nav.partners} path="/partners" />
      <div className="mb-12 md:mb-20 text-center max-w-4xl mx-auto">
        <MotionH1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight text-neutral-light"
        >
          {t.partners.title}
        </MotionH1>
        <MotionP 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-neutral-dim"
        >
          {t.partners.description}
        </MotionP>
        <MotionDiv 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-16 md:w-24 h-1 bg-accent mx-auto mt-6 md:mt-8" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {partners.map((partner, index) => (
          <Link key={partner.id} to={`/partners/${partner.slug}`}>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group h-full bg-secondary border border-neutral-light/5 p-0 rounded-sm hover:border-accent/50 hover:bg-neutral-light/5 hover:shadow-[0_10px_30px_-10px_rgba(var(--color-accent),0.15)] transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Logo Area */}
              <div className="h-40 md:h-48 flex items-center justify-center bg-neutral-light/5 relative overflow-hidden p-6 md:p-8">
                 <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 {partner.logo ? (
                     <OptimizedImage 
                        src={partner.logo} 
                        alt={partner.name} 
                        containerClassName="w-full h-full flex items-center justify-center"
                        className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" 
                     />
                 ) : (
                     <Building className="w-16 h-16 text-neutral-dim group-hover:text-accent transition-colors" />
                 )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-neutral-light group-hover:text-accent transition-colors min-h-[3rem] md:min-h-[3.5rem] flex items-start">{partner.name}</h3>
                
                {/* Meta info */}
                <div className="space-y-2 mb-6">
                    {partner.location && (
                        <div className="flex items-center gap-2 text-xs text-neutral-dim">
                            <MapPin size={14} className="text-accent" />
                            <span>{partner.location}</span>
                        </div>
                    )}
                    {partner.director && (
                        <div className="flex items-center gap-2 text-xs text-neutral-dim">
                            <User size={14} className="text-accent" />
                            <span>{partner.director}</span>
                        </div>
                    )}
                </div>

                <p className="text-sm text-neutral-dim mb-6 line-clamp-3 leading-relaxed flex-1 group-hover:text-neutral-light/80">
                    {partner.description}
                </p>

                {/* Footer */}
                <div className="pt-6 border-t border-neutral-light/5 flex justify-between items-center text-xs font-mono mt-auto">
                    <span className="text-neutral-dim group-hover:text-neutral-light transition-colors">{t.common.explore}</span>
                    <ArrowRight className="w-4 h-4 text-accent rtl-flip transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </MotionDiv>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default Partners;

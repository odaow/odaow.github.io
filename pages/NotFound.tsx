import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  const { t } = useLanguage();
  const MotionDiv = motion.div as any;
  const MotionH1 = motion.h1 as any;
  const MotionP = motion.p as any;

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden pt-24 px-4">
       {/* Background Grid Animation */}
       <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
       
       <div className="relative z-10 text-center max-w-lg">
          <MotionDiv
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
              <div className="w-24 h-24 border-2 border-accent/50 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 border border-accent/20 rounded-full animate-ping" />
                  <AlertTriangle size={48} className="text-accent" />
              </div>
          </MotionDiv>

          <MotionH1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-4xl md:text-6xl font-black text-neutral-light mb-4 tracking-tighter"
          >
             {t.common.notFoundTitle}
          </MotionH1>

          <MotionP 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="text-neutral-dim mb-8 font-mono text-sm md:text-base leading-relaxed border-t border-b border-neutral-light/10 py-4"
          >
             {t.common.notFoundDesc}
          </MotionP>

          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
              <Link 
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-primary font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded-sm"
              >
                 <Home size={18} />
                 {t.common.returnHome}
              </Link>
          </MotionDiv>
       </div>
    </div>
  );
};

export default NotFound;
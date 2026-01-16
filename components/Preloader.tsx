
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const duration = 2800;
    const interval = 25; 
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    const sequenceTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(timer);
      clearTimeout(sequenceTimer);
    };
  }, [onComplete]);

  const MotionDiv = motion.div as any;
  const MotionPath = motion.path as any;
  const MotionRect = motion.rect as any;

  return (
    <MotionDiv
      className="fixed inset-0 z-[2000] bg-primary flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Blueprint Grid Drawing */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%">
            <defs>
                <pattern id="pre-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#E5BE6E" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pre-grid)" />
        </svg>
      </div>

      {/* New Year 2026 Greeting Above Logo */}
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mb-10 text-center z-10"
      >
        <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-accent font-bold block mb-3 drop-shadow-sm">
            {language === 'ar' ? 'نصمم رؤية عام 2026' : 'Designing the Vision of 2026'}
        </span>
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto" />
      </MotionDiv>

      {/* Logo Assembly */}
      <div className="relative w-44 h-44 flex items-center justify-center mb-14 z-10">
          <svg width="170" height="170" viewBox="0 0 160 160" className="overflow-visible text-accent filter drop-shadow-[0_0_8px_rgba(var(--color-accent),0.3)]">
            <MotionRect
                x="30" y="30" width="100" height="100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                initial={{ pathLength: 0, rotate: 45, opacity: 0, transformOrigin: "center" }}
                animate={{ pathLength: 1, rotate: 45, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            
            <MotionRect
                x="50" y="50" width="60" height="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0, rotate: 45, opacity: 0, transformOrigin: "center" }}
                animate={{ pathLength: 1, rotate: 225, opacity: 0.6 }} 
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.4 }}
            />

            <MotionRect
                x="76" y="76" width="8" height="8"
                fill="currentColor"
                initial={{ scale: 0, rotate: 45, transformOrigin: "center" }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{ duration: 0.5, delay: 2.2, type: "spring" }}
            />
          </svg>
      </div>

      {/* Counter */}
      <div className="flex flex-col items-center gap-2 font-mono text-accent z-10">
        <div className="mt-4 w-72">
            <div className="flex justify-between text-[9px] font-mono mb-3 text-neutral-dim font-bold tracking-widest uppercase">
                <span>Building_Future_2026</span>
                <span className="text-accent">{Math.round(count)}%</span>
            </div>
            <div className="w-full h-[3px] bg-neutral-light/10 relative overflow-hidden rounded-full">
                <MotionDiv 
                    className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_15px_#E5BE6E]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${count}%` }}
                    transition={{ ease: "linear", duration: 0.1 }} 
                />
            </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Preloader;

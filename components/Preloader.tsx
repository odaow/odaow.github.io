import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Counter Logic (0-100% over ~2.5s)
    const duration = 2500;
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

    // 2. Sequence Complete Timer (3s total)
    const sequenceTimer = setTimeout(() => {
      onComplete();
    }, 3000);

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
      className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* 1. Blueprint Grid Drawing Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg width="100%" height="100%">
            <defs>
                <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                    <MotionPath 
                        d="M 60 0 L 0 0 0 60" 
                        fill="none" 
                        stroke="currentColor" 
                        className="text-accent"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* 2. Logo Assembly */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-12 z-10">
          <svg width="160" height="160" viewBox="0 0 160 160" className="overflow-visible text-accent">
            {/* Outer Diamond Drawing */}
            <MotionRect
                x="30" y="30" width="100" height="100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0, rotate: 45, opacity: 0, scale: 0.8, transformOrigin: "center" }}
                animate={{ pathLength: 1, rotate: 45, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Inner Diamond Drawing & Rotate */}
            <MotionRect
                x="50" y="50" width="60" height="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0, rotate: 45, opacity: 0, transformOrigin: "center" }}
                animate={{ pathLength: 1, rotate: 225, opacity: 0.5 }} // Rotates 180 + 45
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Center Assembly */}
            <MotionRect
                x="76" y="76" width="8" height="8"
                fill="currentColor"
                initial={{ scale: 0, rotate: 45, transformOrigin: "center" }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{ duration: 0.5, delay: 2, type: "spring" }}
            />
          </svg>
      </div>

      {/* 3. Text & Progress Counter */}
      <div className="flex flex-col items-center gap-2 font-mono text-accent z-10">
        <MotionDiv 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center"
        >
             <h1 className="text-2xl tracking-[0.3em] font-bold mb-1">AL NEBRAS</h1>
             <span className="text-[10px] uppercase tracking-widest text-neutral-dim">Engineering Office</span>
        </MotionDiv>

        <div className="mt-8 w-64">
            <div className="flex justify-between text-[10px] font-mono mb-2 text-neutral-dim">
                <span>SYSTEM INITIALIZATION</span>
                <span className="text-accent">{Math.round(count)}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-neutral-light/10 relative overflow-hidden">
                <MotionDiv 
                    className="absolute inset-y-0 left-0 bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: `${count}%` }}
                    transition={{ ease: "linear", duration: 0.1 }} // Smooth steps
                />
            </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Preloader;
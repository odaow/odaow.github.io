
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  grid?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id, grid = false }) => {
  const MotionDiv = motion.div as any;
  return (
    <section id={id} className={`relative py-16 md:py-24 px-4 md:px-6 overflow-hidden ${className}`}>
      {grid && (
        <div className="absolute inset-0 pointer-events-none opacity-5 blueprint-grid z-0" />
      )}
      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {children}
      </MotionDiv>
    </section>
  );
};

export default Section;

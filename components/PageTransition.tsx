
import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(10px)',
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] // Custom refined bezier for "premium" feel
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    filter: 'blur(10px)',
    transition: {
        duration: 0.4,
        ease: "easeIn"
    }
  }
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const MotionDiv = motion.div as any;
  
  return (
    <MotionDiv
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </MotionDiv>
  );
};

export default PageTransition;

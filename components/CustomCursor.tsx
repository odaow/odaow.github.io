
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
          target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button') ||
          target.classList.contains('cursor-interactive');
          
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof navigator !== 'undefined' && 'ontouchstart' in window) return null;

  const MotionDiv = motion.div as any;

  return (
    <>
      {/* Central Diamond */}
      <MotionDiv
        className="fixed top-0 left-0 pointer-events-none mix-blend-exclusion"
        style={{ left: cursorX, top: cursorY, x: '-50%', y: '-50%', zIndex: 999999 }}
      >
        <MotionDiv 
            animate={{ scale: isHovering ? 0.5 : 1, rotate: 45 }}
            className="w-2 h-2 bg-accent" 
        />
      </MotionDiv>

      {/* Outer Functional Ring */}
      <MotionDiv
        className="fixed top-0 left-0 pointer-events-none mix-blend-exclusion flex items-center justify-center"
        style={{ left: cursorXSpring, top: cursorYSpring, x: '-50%', y: '-50%', zIndex: 999999 }}
      >
        <MotionDiv
          animate={{
            width: isHovering ? 50 : 25,
            height: isHovering ? 50 : 25,
            opacity: isHovering ? 1 : 0.4,
            rotate: 45,
          }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="border border-accent"
        />
      </MotionDiv>
    </>
  );
};

export default CustomCursor;

import React from 'react';

interface AnoLogoProps {
  size?: 'sm' | 'md';
}

const AnoLogo: React.FC<AnoLogoProps> = ({ size = 'md' }) => {
  const dim = size === 'md' ? 'w-10 h-10' : 'w-8 h-8';
  const fontSize = size === 'md' ? 'text-[10px]' : 'text-[8px]';

  return (
    <div className={`relative ${dim} flex items-center justify-center group`}>
      {/* Diamond Border - Rotates on hover */}
      <div className="absolute inset-0 border border-accent rotate-45 group-hover:rotate-90 group-hover:bg-accent transition-all duration-500 ease-out origin-center" />
      
      {/* Inner Border for double-line effect (Architecture style) */}
      <div className="absolute inset-1 border border-accent/30 rotate-45 group-hover:rotate-90 group-hover:border-transparent transition-all duration-500 ease-out origin-center" />
      
      {/* Text - Stays upright but changes color */}
      <span className={`relative z-10 font-mono font-bold ${fontSize} tracking-widest text-accent group-hover:text-primary transition-colors duration-300`}>
        ANO
      </span>
    </div>
  );
};

export default AnoLogo;
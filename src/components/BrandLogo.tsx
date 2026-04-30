import React from 'react';

export const XeloriaLogo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* The Hexagonal Core */}
      <path 
        d="M50 15L80 32.5V67.5L50 85L20 67.5V32.5L50 15Z" 
        fill="url(#logo-grad-primary)"
        className="opacity-90"
      />
      
      {/* Internal Shards/Synthesis Lines */}
      <path 
        d="M50 15V85 M20 32.5L80 67.5 M80 32.5L20 67.5" 
        stroke="white" 
        strokeWidth="1" 
        strokeOpacity="0.2" 
      />

      {/* Central Prism */}
      <path 
        d="M50 35L63 42.5V57.5L50 65L37 57.5V42.5L50 35Z" 
        fill="white"
        fillOpacity="0.8"
      />
      
      {/* Energy Pulse Center */}
      <circle cx="50" cy="50" r="6" fill="white" className="animate-pulse">
        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
      </circle>

      <defs>
        <linearGradient id="logo-grad-primary" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

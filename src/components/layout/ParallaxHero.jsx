import React, { useState, useEffect } from 'react';

const ParallaxHero = ({ images, children, height = "h-[100svh]" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    // Changed to 100svh for perfect mobile sizing, and added a min-height fallback
    <header className={`relative ${height} min-h-[600px] w-full flex items-center justify-center overflow-hidden`}>
      {images.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[6000ms] ease-in-out transform will-change-transform will-change-opacity ${
            // CRITICAL FIX: Disabled bg-fixed on mobile to stop scroll lag, kept it on desktop
            'bg-scroll md:bg-fixed' 
          } ${
            index === currentIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ backgroundImage: `url('${img}')` }} 
        ></div>
      ))}
      
      {/* Changed to a gradient overlay so the top Navbar stands out more, while the center text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10"></div>
      
      {/* Flex container to perfectly center the content vertically */}
      <div className="relative z-20 w-full px-4 sm:px-6 h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </header>
  );
};

export default ParallaxHero;
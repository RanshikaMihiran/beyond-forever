import React, { useState, useEffect } from 'react';

const ParallaxHero = ({ images, children, height = "h-screen" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className={`relative ${height} w-full flex items-center justify-center overflow-hidden`}>
      {images.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-[6000ms] ease-in-out transform ${
            index === currentIndex ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          }`}
          style={{ backgroundImage: `url('${img}')` }} 
        ></div>
      ))}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="relative z-20 w-full px-6">
        {children}
      </div>
    </header>
  );
};

export default ParallaxHero;
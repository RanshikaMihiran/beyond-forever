import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FALLING_GALLERY } from '../../data/constants';
import { ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const FallingMemories = () => {
  const displayItems = FALLING_GALLERY.slice(0, 5);
  
  // States
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Refs
  const sliderRef = useRef(null);

  // --- ACTIONS ---
  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % displayItems.length);
  }, [displayItems.length]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? displayItems.length - 1 : prev - 1));
  }, [displayItems.length]);

  const handleClose = useCallback((e) => {
    if(e) e.stopPropagation();
    setSelectedIndex(null);
  }, []);

  // --- MOBILE AUTO-PLAY LOGIC ---
  useEffect(() => {
    if (window.innerWidth >= 768) return; // Only run on mobile
    if (isPaused) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const nextIndex = (mobileActiveIndex + 1) % displayItems.length;
        const scrollAmount = nextIndex * sliderRef.current.clientWidth; // Scroll 1 full screen width
        
        sliderRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
        
        setMobileActiveIndex(nextIndex);
      }
    }, 4000); // 4 Seconds per slide

    return () => clearInterval(interval);
  }, [mobileActiveIndex, isPaused, displayItems.length]);

  // --- MOBILE SCROLL LISTENER (Updates Dots on Manual Swipe) ---
  const handleMobileScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const width = sliderRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setMobileActiveIndex(newIndex);
    }
  };

  // --- KEYBOARD & BODY LOCK ---
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'Escape') handleClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedIndex, handleNext, handlePrev, handleClose]);

  const currentItem = selectedIndex !== null ? displayItems[selectedIndex] : null;

  return (
    <section className="relative bg-white py-20 min-h-[80vh] flex flex-col justify-center">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-8 w-full flex flex-col md:flex-row justify-between items-start md:items-end">
        <div className="text-left">
           <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">Gallery</span>
           <h2 className="text-[#B3907A] font-serif text-4xl md:text-5xl mt-2 leading-tight">Captured Moments</h2>
        </div>
        <div className="flex items-center gap-2 text-[#B3907A]/60 mt-4 md:mt-0">
           <span className="md:hidden text-[10px] font-bold uppercase tracking-widest animate-pulse">Swipe &rarr;</span>
           <p className="text-[#B3907A]/40 text-xs hidden md:block">Click to expand.</p>
        </div>
      </div>

      {/* --- GALLERY CONTAINER --- */}
      <div className="w-full max-w-[1400px] mx-auto relative group/slider">
        
        {/* SLIDER / ACCORDION */}
        <div 
          ref={sliderRef}
          onScroll={handleMobileScroll}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="
            flex 
            overflow-x-auto              /* Mobile: Horizontal Scroll */
            snap-x snap-mandatory        /* Mobile: Snap Physics */
            md:overflow-visible          /* Desktop: Normal Layout */
            md:h-[600px] 
            scrollbar-hide
          "
        >
          {displayItems.map((item, index) => {
            const isActive = hoveredIndex === index;

            return (
              <div 
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setSelectedIndex(index)} // <--- CLICK TRIGGER
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group
                  
                  /* MOBILE STYLES */
                  flex-shrink-0           /* Keep Full Size */
                  w-[100vw]               /* 100% Screen Width */
                  h-[500px]               /* Fixed Height */
                  snap-center             /* Lock to Center */
                  px-6                    /* Padding for Card Look */

                  /* DESKTOP STYLES */
                  md:px-0
                  md:flex-shrink
                  md:w-auto 
                  md:h-full
                  md:border-r border-white/10 last:border-0

                  /* Desktop Accordion Logic */
                  ${isActive ? 'md:flex-[3]' : 'md:flex-1'}
                `}
              >
                {/* INNER CARD (Needed for padding on mobile) */}
                <div className="w-full h-full relative rounded-[2rem] md:rounded-none overflow-hidden shadow-lg md:shadow-none border border-black/5 md:border-0">
                  
                  {/* Image */}
                  <img 
                    src={item.src} 
                    alt={item.label} 
                    className={`
                      absolute inset-0 w-full h-full object-cover transition-all duration-700
                      /* Desktop Hover Effect */
                      ${isActive ? 'md:grayscale-0 md:scale-105 md:brightness-100' : 'md:grayscale md:brightness-[0.4] md:group-hover:brightness-75'}
                      /* Mobile: Always Vivid */
                      grayscale-0 brightness-100
                    `} 
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-500 
                      ${isActive ? 'opacity-0' : 'opacity-0 md:group-hover:opacity-100'}`}></div>
                  
                  {/* Mobile Gradient (Always visible for text) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>

                  {/* Maximize Icon */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20
                      ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:scale-75 group-hover:opacity-50'}`}>
                     <div className="w-14 h-14 md:w-12 md:h-12 rounded-full bg-white/20 md:bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                       <Maximize2 className="text-white w-6 h-6 md:w-5 md:h-5" />
                     </div>
                  </div>

                  {/* Content Details */}
                  <div className={`absolute inset-0 p-8 flex flex-col justify-end md:justify-between transition-opacity duration-500 delay-100
                      ${isActive ? 'opacity-100' : 'opacity-100 md:opacity-0 group-hover:opacity-100'}`}>
                    
                    <div className="hidden md:flex justify-between items-start">
                      <span className="text-white/50 font-mono text-xs">0{index + 1}</span>
                      <ArrowUpRight className="text-white w-4 h-4" />
                    </div>
                    
                    <div className={`transform transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-0 md:translate-y-4 group-hover:translate-y-0'}`}>
                      <h3 className="text-white font-serif text-3xl md:text-4xl italic drop-shadow-md">{item.label}</h3>
                      <p className="text-[#B3907A] text-[10px] uppercase tracking-widest mt-2 hidden md:block">Tap to Open</p>
                    </div>
                  </div>

                  {/* Vertical Label (Desktop Only) */}
                  <div className={`hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap transition-opacity duration-300 pointer-events-none z-10 
                      ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                     <span className="text-white/50 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm px-3 py-1 bg-black/40 rounded-full border border-white/5">{item.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- MOBILE BOTTOM NAVIGATION DOTS --- */}
        <div className="flex md:hidden justify-center items-center gap-3 mt-8">
           {displayItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                   if (sliderRef.current) {
                      sliderRef.current.scrollTo({
                         left: idx * sliderRef.current.clientWidth,
                         behavior: 'smooth'
                      });
                      setMobileActiveIndex(idx);
                   }
                }}
                className={`transition-all duration-300 rounded-full ${
                   mobileActiveIndex === idx 
                   ? 'w-8 h-2 bg-[#B3907A]' 
                   : 'w-2 h-2 bg-[#B3907A]/20 hover:bg-[#B3907A]/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
           ))}
        </div>
      </div>

      {/* --- PROFESSIONAL LIGHTBOX --- */}
      {currentItem && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          
          {/* 1. Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl animate-bg-fade"
            onClick={handleClose}
          ></div>

          {/* 2. Professional Close Button (Top Right) */}
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 z-[100000] group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:rotate-90 hover:scale-110 shadow-lg"
            title="Close Gallery"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* 3. Professional Prev Button */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[100000] group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:scale-110 backdrop-blur-md shadow-lg"
          >
            <ChevronLeft size={32} strokeWidth={1} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* 4. Professional Next Button */}
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100000] group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:scale-110 backdrop-blur-md shadow-lg"
          >
            <ChevronRight size={32} strokeWidth={1} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 5. Image Container */}
          <div 
             className="relative z-[99999] w-full h-full p-4 md:p-12 flex flex-col items-center justify-center pointer-events-none"
          >
            <img 
              key={selectedIndex} 
              src={currentItem.src} 
              alt={currentItem.label} 
              className="pointer-events-auto max-w-full max-h-[80vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm animate-scale-in select-none"
              onClick={(e) => e.stopPropagation()} 
            />
            
            {/* Caption & Counter */}
            <div className="mt-8 text-center animate-slide-up pointer-events-auto">
              <h3 className="text-white font-serif text-3xl md:text-5xl italic mb-3 tracking-wide drop-shadow-lg">
                {currentItem.label}
              </h3>
              <div className="flex items-center justify-center gap-4 opacity-70">
                <span className="h-px w-10 bg-white/30"></span>
                <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">
                  {selectedIndex + 1} <span className="mx-1 text-white/40">/</span> {displayItems.length}
                </span>
                <span className="h-px w-10 bg-white/30"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Hide Scrollbar */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Animations */
        @keyframes bg-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .animate-bg-fade { animation: bg-fade 0.4s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
      `}</style>
    </section>
  );
};

export default FallingMemories;
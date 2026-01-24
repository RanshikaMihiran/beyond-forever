import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FALLING_GALLERY } from '../../data/constants';
import { ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

const FallingMemories = () => {
  const displayItems = FALLING_GALLERY.slice(0, 5);
  
  // --- STATE ---
  const [hoveredIndex, setHoveredIndex] = useState(0); // Desktop Hover
  const [selectedIndex, setSelectedIndex] = useState(null); // Lightbox Open
  const [mobileIndex, setMobileIndex] = useState(0); // Current Mobile Slide
  const [isPaused, setIsPaused] = useState(false); // Pause Auto-play on touch

  const sliderRef = useRef(null);

  // --- ACTIONS ---
  
  // 1. Open Lightbox
  const openLightbox = (index) => {
    // We check if the user was dragging/scrolling. If they were, don't open.
    // For simplicity here, we assume a clean click event.
    setSelectedIndex(index);
  };

  const handleClose = useCallback((e) => {
    if(e) e.stopPropagation();
    setSelectedIndex(null);
  }, []);

  // 2. Lightbox Navigation
  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % displayItems.length);
  }, [displayItems.length]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? displayItems.length - 1 : prev - 1));
  }, [displayItems.length]);


  // --- MOBILE AUTO-PLAY ENGINE ---
  useEffect(() => {
    if (window.innerWidth >= 768) return; // Disable on Desktop
    if (isPaused) return; // Don't scroll if user is touching

    const interval = setInterval(() => {
      if (sliderRef.current) {
        // Calculate where we need to go
        const currentScroll = sliderRef.current.scrollLeft;
        const width = sliderRef.current.clientWidth;
        const totalWidth = sliderRef.current.scrollWidth;
        
        // If we are at the end, scroll to start, otherwise scroll one width right
        let nextScroll = currentScroll + width;
        if (nextScroll >= totalWidth - 10) { // buffer
           nextScroll = 0;
        }

        sliderRef.current.scrollTo({
          left: nextScroll,
          behavior: 'smooth'
        });
      }
    }, 3000); // 3 Seconds

    return () => clearInterval(interval);
  }, [isPaused]);


  // --- SCROLL LISTENER (Updates Dots) ---
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const width = sliderRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setMobileIndex(index);
    }
  };

  // --- KEYBOARD LOCK ---
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
          onScroll={handleScroll}
          onTouchStart={() => setIsPaused(true)} // User touches -> Stop AutoPlay
          onTouchEnd={() => setIsPaused(false)}  // User lifts -> Resume AutoPlay
          className="
            flex 
            /* MOBILE SCROLL SETTINGS */
            overflow-x-auto 
            snap-x snap-mandatory 
            scroll-smooth
            touch-pan-x
            
            /* DESKTOP RESET */
            md:overflow-visible
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
                onClick={() => openLightbox(index)} 
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group
                  
                  /* MOBILE: FULL WIDTH CARD */
                  flex-shrink-0           /* FORCE: Do not shrink */
                  w-[100vw]               /* FORCE: Full Screen Width */
                  h-[500px]               /* Fixed Height */
                  snap-center             /* Lock to center */
                  px-6                    /* Padding so it looks like a card */
                  pb-8                    /* Bottom padding for dots space */

                  /* DESKTOP: FLEX ACCORDION */
                  md:px-0 md:pb-0
                  md:flex-shrink
                  md:w-auto 
                  md:h-full
                  md:border-r border-white/10 last:border-0

                  /* Desktop Accordion Expansion */
                  ${isActive ? 'md:flex-[3]' : 'md:flex-1'}
                `}
              >
                {/* INNER CARD WRAPPER */}
                <div className="w-full h-full relative rounded-[2rem] md:rounded-none overflow-hidden shadow-lg md:shadow-none border border-black/5 md:border-0">
                  
                  {/* Image */}
                  <img 
                    src={item.src} 
                    alt={item.label} 
                    className={`
                      absolute inset-0 w-full h-full object-cover transition-all duration-700
                      /* Desktop Logic */
                      ${isActive ? 'md:grayscale-0 md:scale-105 md:brightness-100' : 'md:grayscale md:brightness-[0.4] md:group-hover:brightness-75'}
                      /* Mobile Logic: Always Visible */
                      grayscale-0 brightness-100
                    `} 
                  />

                  {/* Gradient Overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-500 
                      ${isActive ? 'opacity-0' : 'opacity-0 md:group-hover:opacity-100'}`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>

                  {/* Icon */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20
                      ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:scale-75 group-hover:opacity-50'}`}>
                     <div className="w-14 h-14 md:w-12 md:h-12 rounded-full bg-white/20 md:bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                       <Maximize2 className="text-white w-6 h-6 md:w-5 md:h-5" />
                     </div>
                  </div>

                  {/* Text Content */}
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

                  {/* Desktop Vertical Label */}
                  <div className={`hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap transition-opacity duration-300 pointer-events-none z-10 
                      ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                     <span className="text-white/50 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm px-3 py-1 bg-black/40 rounded-full border border-white/5">{item.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- MOBILE NAVIGATION DOTS --- */}
        <div className="flex md:hidden justify-center items-center gap-3 mt-4">
           {displayItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                   if (sliderRef.current) {
                      sliderRef.current.scrollTo({
                         left: idx * sliderRef.current.clientWidth,
                         behavior: 'smooth'
                      });
                   }
                }}
                className={`transition-all duration-500 rounded-full ${
                   mobileIndex === idx 
                   ? 'w-8 h-2 bg-[#B3907A]' 
                   : 'w-2 h-2 bg-[#B3907A]/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
           ))}
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      {currentItem && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          
          <div 
            className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl animate-bg-fade"
            onClick={handleClose}
          ></div>

          {/* Controls */}
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 z-[100000] group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:rotate-90 hover:scale-110 shadow-lg"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[100000] group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:scale-110 backdrop-blur-md shadow-lg"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100000] group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:scale-110 backdrop-blur-md shadow-lg"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>

          {/* Image */}
          <div className="relative z-[99999] w-full h-full p-4 md:p-12 flex flex-col items-center justify-center pointer-events-none">
            <img 
              key={selectedIndex} 
              src={currentItem.src} 
              alt={currentItem.label} 
              className="pointer-events-auto max-w-full max-h-[80vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm animate-scale-in select-none"
              onClick={(e) => e.stopPropagation()} 
            />
            
            <div className="mt-8 text-center animate-slide-up pointer-events-auto">
              <h3 className="text-white font-serif text-3xl md:text-5xl italic mb-3 tracking-wide drop-shadow-lg">
                {currentItem.label}
              </h3>
              <div className="flex items-center justify-center gap-4 opacity-70">
                <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">
                  {selectedIndex + 1} / {displayItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
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
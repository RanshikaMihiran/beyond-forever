import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FALLING_GALLERY } from '../../data/constants';
import { ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

const FallingMemories = () => {
  const displayItems = FALLING_GALLERY.slice(0, 5);
  
  // --- STATE ---
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0); 
  // Note: isPaused state removed as we switched to native scroll for better mobile UX

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

  // --- SCROLL LISTENER (Updates dots on scroll) ---
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const cardWidth = sliderRef.current.children[0].clientWidth; 
      // Add gap roughly to calculation for precision
      const approximateGap = 16; 
      const index = Math.round(scrollLeft / (cardWidth + approximateGap));
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
    <section className="relative bg-white py-12 md:py-20 min-h-[80vh] flex flex-col justify-center overflow-hidden">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-6 md:mb-8 w-full flex flex-col md:flex-row justify-between items-start md:items-end">
        <div className="text-left">
           <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">Gallery</span>
           <h2 className="text-[#B3907A] font-serif text-3xl md:text-5xl mt-2 leading-tight">Captured Moments</h2>
        </div>
        <div className="flex items-center gap-2 text-[#B3907A]/60 mt-2 md:mt-0">
           <p className="text-[#B3907A]/40 text-xs hidden md:block">Click to expand.</p>
           {/* Mobile Swipe Hint */}
           <div className="md:hidden flex items-center gap-1 opacity-60">
             <span className="text-[10px] uppercase tracking-widest">Swipe</span>
             <ChevronRight size={12} />
           </div>
        </div>
      </div>

      {/* --- GALLERY CONTAINER --- */}
      <div className="w-full max-w-[1400px] mx-auto relative group/slider">
        
        {/* SLIDER / ACCORDION */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="
            flex 
            /* MOBILE SCROLL SETTINGS (Professional Native Feel) */
            overflow-x-auto 
            snap-x snap-mandatory 
            scroll-smooth
            touch-pan-x
            gap-4                 /* Tighter gap for mobile */
            px-6                  /* Side padding for peek effect */
            pb-8 
            
            /* DESKTOP RESET */
            md:overflow-visible
            md:gap-0 md:px-0 md:pb-0
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
                onClick={() => setSelectedIndex(index)} // CLICK TO OPEN
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group
                  
                  /* --- MOBILE STYLES --- */
                  flex-none               
                  w-[85vw]                /* Peeking width */
                  h-[65vh]                /* Responsive Height */
                  md:h-full               /* Reset Desktop Height */
                  snap-center             /* Center snap */
                  rounded-2xl             /* Rounded corners on mobile */
                  active:scale-[0.98]     /* Touch Feedback */
                  
                  /* DESKTOP STYLES */
                  md:flex-shrink
                  md:w-auto 
                  md:rounded-none
                  md:active:scale-100
                  md:border-r border-white/10 last:border-0

                  /* Desktop Accordion Logic */
                  ${isActive ? 'md:flex-[3]' : 'md:flex-1'}
                `}
              >
                {/* INNER CARD */}
                <div className="w-full h-full relative overflow-hidden shadow-sm md:shadow-none bg-gray-100">
                  
                  {/* Image */}
                  <img 
                    src={item.src} 
                    alt={item.label} 
                    className={`
                      absolute inset-0 w-full h-full object-cover transition-all duration-700
                      /* Desktop Logic */
                      ${isActive ? 'md:grayscale-0 md:scale-105 md:brightness-100' : 'md:grayscale md:brightness-[0.4] md:group-hover:brightness-75'}
                      /* Mobile Logic: Always nice */
                      grayscale-0 brightness-100
                    `} 
                  />

                  {/* Gradient Overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 
                      ${isActive ? 'opacity-0' : 'opacity-0 md:group-hover:opacity-100'}`}></div>
                  
                  {/* Mobile Specific Gradient for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent md:hidden opacity-80"></div>

                  {/* Icon (Hidden on Mobile until tap, styled for desktop hover) */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20 hidden md:block
                      ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:scale-75 group-hover:opacity-50'}`}>
                     <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                       <Maximize2 className="text-white w-5 h-5" />
                     </div>
                  </div>

                  {/* Mobile Expand Icon Hint */}
                  <div className="absolute top-4 right-4 md:hidden opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
                        <Maximize2 className="text-white w-4 h-4" />
                      </div>
                  </div>

                  {/* Text Content */}
                  <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-end md:justify-between transition-opacity duration-500 delay-100
                      ${isActive ? 'opacity-100' : 'opacity-100 md:opacity-0 group-hover:opacity-100'}`}>
                    
                    <div className="hidden md:flex justify-between items-start">
                      <span className="text-white/50 font-mono text-xs">0{index + 1}</span>
                      <ArrowUpRight className="text-white w-4 h-4" />
                    </div>
                    
                    <div className={`transform transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-0 md:translate-y-4 group-hover:translate-y-0'}`}>
                      {/* Mobile Index Indicator */}
                      <span className="md:hidden text-[#B3907A] font-mono text-[10px] mb-2 block">0{index + 1} — 05</span>
                      
                      <h3 className="text-white font-serif text-2xl md:text-4xl italic drop-shadow-md leading-tight">{item.label}</h3>
                      <p className="text-white/60 text-xs mt-2 line-clamp-2 md:hidden">Tap to view full details.</p>
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
        <div className="flex md:hidden justify-center items-center gap-2 mt-2">
           {displayItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                   if (sliderRef.current) {
                      const cardWidth = sliderRef.current.children[0].clientWidth;
                      const gap = 16;
                      sliderRef.current.scrollTo({
                         left: idx * (cardWidth + gap),
                         behavior: 'smooth'
                      });
                   }
                }}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                   mobileIndex === idx 
                   ? 'w-6 bg-[#B3907A]' 
                   : 'w-1.5 bg-[#B3907A]/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
           ))}
        </div>
      </div>

      {/* --- PROFESSIONAL LIGHTBOX (Responsive) --- */}
      {currentItem && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          
          <div 
            className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl animate-bg-fade"
            onClick={handleClose}
          ></div>

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[100000] group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:rotate-90 shadow-lg"
          >
            <X size={24} className="md:w-7 md:h-7" />
          </button>

          {/* Prev Button (Hidden on tiny screens, visual clutter) */}
          <button 
            onClick={handlePrev}
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-[100000] group items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:scale-110 backdrop-blur-md shadow-lg"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-[100000] group items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:scale-110 backdrop-blur-md shadow-lg"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>

          {/* Image Container */}
          <div className="relative z-[99999] w-full h-full p-4 md:p-12 flex flex-col items-center justify-center pointer-events-none">
            <img 
              key={selectedIndex} 
              src={currentItem.src} 
              alt={currentItem.label} 
              className="pointer-events-auto w-full md:w-auto h-auto md:max-w-full max-h-[60vh] md:max-h-[80vh] object-contain shadow-2xl rounded-lg animate-scale-in select-none"
              onClick={(e) => e.stopPropagation()} 
            />
            
            <div className="mt-6 md:mt-8 text-center animate-slide-up pointer-events-auto px-4">
              <h3 className="text-white font-serif text-2xl md:text-5xl italic mb-2 tracking-wide drop-shadow-lg">
                {currentItem.label}
              </h3>
              <div className="flex items-center justify-center gap-4 opacity-70">
                <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">
                  {selectedIndex + 1} / {displayItems.length}
                </span>
              </div>
              
              {/* Mobile Only Navigation Hints */}
              <div className="flex md:hidden items-center justify-center gap-8 mt-6 text-white/40">
                  <button onClick={(e) => { e.stopPropagation(); handlePrev(e); }} className="p-2">
                    <ChevronLeft />
                  </button>
                  <span className="text-[10px] uppercase tracking-widest">Swipe or Tap</span>
                  <button onClick={(e) => { e.stopPropagation(); handleNext(e); }} className="p-2">
                    <ChevronRight />
                  </button>
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
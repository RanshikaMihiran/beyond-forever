import React, { useState, useEffect, useCallback } from 'react';
import { FALLING_GALLERY } from '../../data/constants';
import { ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

const FallingMemories = () => {
  const displayItems = FALLING_GALLERY.slice(0, 5);
  
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

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

  // --- KEYBOARD & SCROLL LOCK ---
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
    <section className="relative bg-white py-20 px-0 md:px-0 min-h-[80vh] flex flex-col justify-center overflow-hidden">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-8 w-full flex flex-col md:flex-row justify-between items-end">
        <div>
           <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">Gallery</span>
           <h2 className="text-[#B3907A] font-serif text-3xl md:text-5xl mt-2">Captured Moments</h2>
        </div>
        <div className="flex items-center gap-2 text-[#B3907A]/60 mt-2 md:mt-0">
           <span className="md:hidden text-[10px] font-bold uppercase tracking-widest animate-pulse">Swipe to Explore &rarr;</span>
           <p className="text-[#B3907A]/40 text-xs hidden md:block">Click to expand.</p>
        </div>
      </div>

      {/* GALLERY STRIP (Slider on Mobile, Accordion on Desktop) */}
      <div className="
        w-full max-w-[1400px] mx-auto 
        flex 
        md:flex-row flex-row            /* Always Row */
        overflow-x-auto md:overflow-visible /* Scroll on mobile, visible on desktop */
        snap-x snap-mandatory           /* Snap effect on mobile */
        h-[500px] md:h-[600px]          /* Height adjustment */
        gap-4 md:gap-0                  /* Gap on mobile, connected on desktop */
        px-6 md:px-0                    /* Side padding on mobile */
        scrollbar-hide                  /* Custom class to hide scrollbar */
      ">
        {displayItems.map((item, index) => {
          const isActive = hoveredIndex === index;

          return (
          <div 
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => setSelectedIndex(index)}
            className={`
              relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group
              
              /* DESKTOP STYLES */
              md:border-r border-white/10 last:border-0
              md:h-full md:w-auto
              ${isActive ? 'md:flex-[3]' : 'md:flex-1'}

              /* MOBILE SLIDER STYLES */
              flex-shrink-0
              min-w-[85vw]         /* Card takes 85% of screen width */
              h-full
              snap-center          /* Snaps to center */
              rounded-[20px]       /* Round corners on mobile */
              md:rounded-none      /* Square on desktop */
              shadow-lg md:shadow-none
            `}
          >
            {/* Main Image */}
            <img 
              src={item.src} 
              alt={item.label} 
              className={`
                absolute inset-0 w-full h-full object-cover transition-all duration-700
                /* Desktop Hover Effect */
                ${isActive ? 'md:grayscale-0 md:scale-105 md:brightness-100' : 'md:grayscale md:brightness-[0.4] md:group-hover:brightness-75'}
                /* Mobile: Always colorful */
                grayscale-0 brightness-100
              `} 
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-500 
                ${isActive ? 'opacity-0' : 'opacity-0 md:group-hover:opacity-100'}`}></div>
            
            {/* Mobile Gradient (Always visible for text readability) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>

            {/* Maximize Icon */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20
                ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:scale-75 group-hover:opacity-50'}`}>
               <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                 <Maximize2 className="text-white w-5 h-5" />
               </div>
            </div>

            {/* Content Details */}
            <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-end md:justify-between transition-opacity duration-500 delay-100
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
          );
        })}
      </div>

      {/* --- LIGHTBOX (SAME AS BEFORE) --- */}
      {currentItem && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-bg-fade"
            onClick={handleClose}
          ></div>

          {/* CLOSE BUTTON */}
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 z-[100000] w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:rotate-90 hover:scale-105 cursor-pointer group"
          >
            <X size={24} />
          </button>

          {/* PREVIOUS BUTTON */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-[100000] w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:scale-110 cursor-pointer"
          >
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>

          {/* NEXT BUTTON */}
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[100000] w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:border-[#B3907A] hover:scale-110 cursor-pointer"
          >
            <ChevronRight size={28} strokeWidth={1.5} />
          </button>

          <div className="relative z-[99999] p-4 md:p-12 w-full max-w-7xl flex flex-col items-center justify-center pointer-events-none">
            <img 
              key={selectedIndex} 
              src={currentItem.src} 
              alt={currentItem.label} 
              className="pointer-events-auto max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm border border-white/5 animate-scale-in"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="mt-8 text-center animate-slide-up pointer-events-auto">
              <h3 className="text-white font-serif text-3xl md:text-5xl italic mb-3 tracking-wide drop-shadow-lg">
                {currentItem.label}
              </h3>
              <div className="flex items-center justify-center gap-4 opacity-70">
                <span className="h-px w-10 bg-white/30"></span>
                <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">
                  {selectedIndex + 1} / {displayItems.length}
                </span>
                <span className="h-px w-10 bg-white/30"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Hide Scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        @keyframes bg-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-bg-fade { animation: bg-fade 0.3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
      `}</style>
    </section>
  );
};

export default FallingMemories;
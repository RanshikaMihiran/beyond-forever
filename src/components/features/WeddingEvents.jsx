import React, { useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const EVENTS_DATA = [
  {
    id: "01",
    title: "The Welcome",
    subtitle: "Anticipation & Toasts",
    description: "The night before forever. Intimate speeches, laughter, and the gathering of your closest souls.",
    image: "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/Preshoot/SHA05957.webp?updatedAt=1772645055696"
  },
  {
    id: "02",
    title: "The Ceremony",
    subtitle: "Vows & Tears",
    description: "The raw, unscripted moments as you make your promises. We capture every tear and every smile.",
    image: "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/Pre-2/SHA09115.webp?updatedAt=1772638978958"
  },
  {
    id: "03",
    title: "The Portraits",
    subtitle: "Editorial & Timeless",
    description: "Stepping away for quiet, magazine-worthy moments with just the two of you in the golden hour light.",
    image: "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/Night-Wedding%20/5.webp?updatedAt=1772638161356"
  },
  {
    id: "04",
    title: "The Reception",
    subtitle: "Wild & Free",
    description: "Champagne towers, unforgettable first dances, and wild celebrations under the stars.",
    image: "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/Night-Wedding%20/VJP02892.webp?updatedAt=1772638056905"
  }
];

const WeddingEvents = () => {
  const scrollContainerRef = useRef(null);

  // Custom scroll buttons for desktop users who prefer clicking over swiping
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-[#1a1a1a] text-[#F5F5EB] py-24 md:py-32 overflow-hidden relative border-t border-white/5">
      
      {/* --- FLOATING BACKGROUND ELEMENT --- */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-[#B3907A] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="px-6 md:px-12 lg:px-24 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#B3907A]"></span>
              <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">
                The Experience
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] tracking-tight">
              A Journey Through <br className="hidden md:block" /> 
              <span className="italic text-[#B3907A] font-light">Your Day</span>
            </h2>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-transparent border border-white/20 flex items-center justify-center text-white hover:bg-[#B3907A] hover:border-[#B3907A] transition-all duration-300 outline-none"
            >
              <ArrowLeft size={20} color="white" strokeWidth={2} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-transparent border border-white/20 flex items-center justify-center text-white hover:bg-[#B3907A] hover:border-[#B3907A] transition-all duration-300 outline-none"
            >
              <ArrowRight size={20} color="white" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* --- HORIZONTAL FILMSTRIP SCROLL --- */}
        <div className="w-full relative z-10">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory touch-pan-x scrollbar-hide px-6 md:px-12 lg:px-24 gap-6 md:gap-10 pb-12 pt-8"
          >
            {EVENTS_DATA.map((event) => (
              <div 
                key={event.id}
                className="group relative w-[85vw] md:w-[45vw] lg:w-[30vw] h-[500px] md:h-[650px] flex-shrink-0 snap-center rounded-[2rem] overflow-hidden cursor-pointer bg-[#111]"
              >
                
                {/* 1. Background Image with Grayscale-to-Color Hover Effect */}
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 md:grayscale-[80%] group-hover:grayscale-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                />

                {/* 2. Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>

                {/* 3. Massive Transparent Number (Editorial trend) */}
                <div className="absolute top-6 right-8 font-serif text-7xl md:text-8xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] group-hover:[-webkit-text-stroke:1px_rgba(179,144,122,0.8)] transition-all duration-700 transform group-hover:-translate-y-2">
                  {event.id}
                </div>

                {/* 4. Text Content (Slides up smoothly on hover) */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  
                  <h4 className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    {event.subtitle}
                  </h4>
                  
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 drop-shadow-lg">
                    {event.title}
                  </h3>
                  
                  {/* Line separator that expands on hover */}
                  <div className="w-0 h-[1px] bg-white/30 group-hover:w-full transition-all duration-1000 ease-out mb-4"></div>
                  
                  <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 hidden md:block">
                    {event.description}
                  </p>
                  
                  {/* Mobile description (always visible but faded) */}
                  <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm md:hidden">
                    {event.description}
                  </p>
                </div>

              </div>
            ))}
            
            {/* Spacer to allow the last card to scroll completely into view */}
            <div className="w-[6vw] md:w-[12vw] flex-shrink-0"></div>
          </div>

          {/* Mobile Swipe Indicator */}
          <div className="md:hidden flex items-center justify-center gap-3 text-[#B3907A] text-[10px] uppercase tracking-[0.3em] font-bold mt-4">
            <span className="w-8 h-[1px] bg-[#B3907A]/40"></span>
            Swipe to explore
            <span className="w-8 h-[1px] bg-[#B3907A]/40"></span>
          </div>
        </div>

      </div>

      {/* Hide default scrollbars but keep functionality */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default WeddingEvents;
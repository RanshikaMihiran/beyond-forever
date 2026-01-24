import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    names: "Sarah & James",
    location: "Galle Fort",
    text: "It felt less like a photoshoot and more like hanging out with friends. The photos are absolute magic.",
    rating: 5,
    date: "Oct 2025"
  },
  {
    id: 2,
    names: "Elena & Marco",
    location: "Ella Gap",
    text: "We are speechless. They captured moments we didn't even know happened. Pure visual poetry.",
    rating: 5,
    date: "Sep 2025"
  },
  {
    id: 3,
    names: "Priya & Raj",
    location: "Colombo",
    text: "Professional, artistic, and kind. The best investment we made for our wedding day.",
    rating: 5,
    date: "Aug 2025"
  },
  {
    id: 4,
    names: "Chloe & Ben",
    location: "Mirissa Beach",
    text: "The team went above and beyond. We felt so comfortable and the results speak for themselves.",
    rating: 5,
    date: "Jul 2025"
  },
  {
    id: 5,
    names: "Amelia & Oliver",
    location: "Kandy",
    text: "Authentic, raw, and beautiful. They captured the true essence of our relationship.",
    rating: 5,
    date: "Jun 2025"
  }
];

const PRESS_LOGOS = ["VOGUE", "BRIDES", "JUNIBUG", "STYLE ME PRETTY"];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // --- RESPONSIVE LOGIC ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- AUTO PLAY LOGIC ---
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // 4 Seconds per slide
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, itemsPerPage]);

  const maxIndex = Math.ceil(REVIEWS.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // --- TOUCH HANDLERS ---
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
    setIsPaused(false);
  };

  return (
    <section className="bg-[#0a0a0a] text-white py-24 px-6 border-t border-white/5 overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- TRUST BAR --- */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 mb-20 opacity-30 grayscale select-none animate-fade-in">
           {PRESS_LOGOS.map((logo, index) => (
              <span key={index} className="font-serif text-lg md:text-2xl font-bold tracking-widest">{logo}</span>
           ))}
        </div>

        {/* --- HEADER --- */}
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 mb-6 bg-white/5 px-5 py-2 rounded-full border border-white/10">
              <Heart size={12} fill="#B3907A" className="text-[#B3907A]" />
              <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.2em]">
                 Client Love
              </span>
           </div>
           <h2 className="font-serif text-3xl md:text-5xl leading-tight text-white">
              Words from the <br /> 
              <span className="italic text-[#B3907A]">heart.</span>
           </h2>
        </div>

        {/* --- SLIDER CONTAINER --- */}
        <div 
          className="relative group px-0 md:px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
           
           {/* BUTTON: PREV (Matched to Image 2) */}
           <button 
             onClick={prevSlide}
             className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1a1a1a]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-30 shadow-lg border border-white/10 hover:bg-[#B3907A] hover:border-[#B3907A]"
             aria-label="Previous Slide"
           >
             <ChevronLeft size={20} />
           </button>

           {/* BUTTON: NEXT (Matched to Image 2) */}
           <button 
             onClick={nextSlide}
             className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1a1a1a]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-30 shadow-lg border border-white/10 hover:bg-[#B3907A] hover:border-[#B3907A]"
             aria-label="Next Slide"
           >
             <ChevronRight size={20} />
           </button>

           {/* TRACK */}
           <div 
             className="overflow-hidden py-4 px-1" 
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
           >
             <div 
               className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
               style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
             >
                {REVIEWS.map((review) => (
                  <div 
                    key={review.id}
                    className="flex-shrink-0 px-3 md:px-4"
                    style={{ width: `${100 / itemsPerPage}%` }}
                  >
                     {/* --- CARD --- */}
                     <div className="bg-[#151515] h-full min-h-[320px] flex flex-col justify-between rounded-[2rem] p-8 md:p-10 relative group/card transition-all duration-500 hover:-translate-y-1 border border-white/5 hover:border-[#B3907A]/20 shadow-2xl">
                        
                        {/* Header: Date & Avatar */}
                        <div className="flex justify-between items-center mb-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B3907A] to-[#8a6d5a] flex items-center justify-center text-white font-serif italic text-sm shadow-md">
                                 {review.names.charAt(0)}
                              </div>
                              <div>
                                 <h4 className="text-white text-xs font-bold uppercase tracking-widest">
                                    {review.names}
                                 </h4>
                                 <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
                                    {review.location}
                                 </span>
                              </div>
                           </div>
                           <span className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#B3907A]/80">
                              {review.date}
                           </span>
                        </div>

                        {/* Review Text */}
                        <div className="relative z-10 mb-4">
                           <Quote className="text-[#B3907A]/10 w-8 h-8 mb-2 rotate-180" />
                           <p className="text-[#E1DACA]/90 font-light leading-relaxed text-base">
                              "{review.text}"
                           </p>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 pt-6 border-t border-white/5">
                           {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={12} fill="#B3907A" className="text-[#B3907A]" />
                           ))}
                        </div>

                     </div>
                  </div>
                ))}
             </div>
           </div>

           {/* --- PAGINATION DOTS (Matched to Image 3) --- */}
           <div className="flex justify-center items-center gap-2 mt-12">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setCurrentIndex(idx)}
                   className={`h-3 rounded-full transition-all duration-500 ease-out border border-transparent ${
                     idx === currentIndex 
                       ? 'w-10 bg-[#B3907A] shadow-[0_0_15px_rgba(179,144,122,0.6)]' // Active Glow
                       : 'w-6 bg-white/10 hover:bg-white/20' // Inactive Dark Pill
                   }`}
                   aria-label={`Go to slide ${idx + 1}`}
                 />
              ))}
           </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;
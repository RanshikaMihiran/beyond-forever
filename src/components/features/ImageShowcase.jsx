import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  { 
    id: 1, 
    title: "Amelia & James", 
    category: "Coastal Elopement", 
    year: "2025",
    src: "/images/hero/Image 1.jpg" 
  },
  { 
    id: 2, 
    title: "The Golden Hour", 
    category: "Editorial Campaign", 
    year: "2025",
    src: "/images/hero/Image 2.jpg" 
  },
  { 
    id: 3, 
    title: "Midnight in Paris", 
    category: "Destination Wedding", 
    year: "2024",
    src: "/images/hero/Image 3.jpg" 
  },
  { 
    id: 4, 
    title: "Raw & Real", 
    category: "Black & White Series", 
    year: "2024",
    src: "/images/hero/Image 4.jpg" 
  },
];

const ImageShowcase = ({ setCurrentPage }) => {
  const [activeItem, setActiveItem] = useState(PORTFOLIO_ITEMS[0]);

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24 border-t border-[#1a1a1a]/5">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-end mb-16 md:mb-24 border-b border-[#1a1a1a]/10 pb-8">
           <div>
              <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">
                 Selected Works
              </span>
              <h2 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] leading-none">
                 Featured <span className="italic text-[#B3907A]">Stories</span>
              </h2>
           </div>
           
           {/* DESKTOP VIEW ALL BUTTON */}
           <button 
             onClick={() => setCurrentPage('Portfolio')}
             className="hidden md:flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#B3907A] transition-colors group"
           >
             View All
             {/* Removed background fill, now just changes border/text color */}
             <div className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center group-hover:border-[#B3907A] group-hover:text-[#B3907A] transition-all duration-300">
                <ArrowRight size={12} />
             </div>
           </button>
        </div>

        {/* --- INTERACTIVE SPLIT LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
           
           {/* LEFT: THE LIST */}
           <div className="flex-1 flex flex-col justify-center">
              {PORTFOLIO_ITEMS.map((item) => (
                <div 
                  key={item.id}
                  onMouseEnter={() => setActiveItem(item)}
                  onClick={() => setCurrentPage('Portfolio')}
                  className={`
                    group relative py-8 md:py-10 border-b border-[#1a1a1a]/10 cursor-pointer transition-all duration-300
                    ${activeItem.id === item.id ? 'pl-8' : 'pl-0 hover:pl-4'}
                  `}
                >
                   {/* Active Indicator Line (Left) */}
                   <div className={`
                      absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#B3907A] transition-all duration-300
                      ${activeItem.id === item.id ? 'h-[60%]' : 'h-0'}
                   `}></div>

                   <div className="flex justify-between items-center relative z-10">
                      <div>
                         <span className={`
                            text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block transition-colors duration-300
                            ${activeItem.id === item.id ? 'text-[#B3907A]' : 'text-[#1a1a1a]/40'}
                         `}>
                            {item.category}
                         </span>
                         <h3 className={`
                            font-serif text-3xl md:text-5xl transition-colors duration-300
                            ${activeItem.id === item.id ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/20 group-hover:text-[#1a1a1a]/60'}
                         `}>
                            {item.title}
                         </h3>
                      </div>

                      {/* Arrow Icon */}
                      <ArrowUpRight 
                        size={24} 
                        className={`
                          transition-all duration-300
                          ${activeItem.id === item.id ? 'opacity-100 text-[#B3907A] rotate-45' : 'opacity-0 -translate-x-4'}
                        `} 
                      />
                   </div>
                </div>
              ))}
           </div>

           {/* RIGHT: THE PREVIEW (Sticky) */}
           <div className="flex-1 hidden lg:block h-[600px] relative">
              <div 
                className="sticky top-24 w-full h-full overflow-hidden rounded-[4px] cursor-pointer"
                onClick={() => setCurrentPage('Portfolio')}
              >
                 {PORTFOLIO_ITEMS.map((item) => (
                   <img 
                     key={item.id}
                     src={item.src} 
                     alt={item.title}
                     className={`
                       absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform
                       ${activeItem.id === item.id 
                          ? 'opacity-100 scale-100 z-10' 
                          : 'opacity-0 scale-110 z-0'}
                     `}
                   />
                 ))}
                 
                 {/* Overlay Text on Image */}
                 <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-none">
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest block mb-2">
                       Project Year
                    </span>
                    <span className="text-white font-serif text-2xl">
                       {activeItem.year}
                    </span>
                 </div>

                 {/* Dark Overlay for Text Readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none"></div>
              </div>
           </div>

           {/* MOBILE IMAGE (Only shows active item on mobile) */}
           <div 
             className="lg:hidden w-full h-[400px] rounded-[2rem] overflow-hidden relative shadow-xl cursor-pointer"
             onClick={() => setCurrentPage('Portfolio')}
           >
               <img 
                 src={activeItem.src} 
                 alt={activeItem.title} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black/20"></div>
               <div className="absolute bottom-6 left-6">
                 <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest block mb-1">
                   Tap to View Project
                 </span>
               </div>
           </div>

        </div>

        {/* --- MOBILE BOTTOM BUTTON --- */}
        <div className="mt-12 text-center md:hidden">
            <button 
              onClick={() => setCurrentPage('Portfolio')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B3907A] border-b border-[#B3907A]/30 pb-1"
            >
              View Full Portfolio <ArrowRight size={12} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default ImageShowcase;
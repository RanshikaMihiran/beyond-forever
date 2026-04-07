import React, { useEffect, useRef, useState } from 'react';
import { Aperture, Camera, Heart } from 'lucide-react';

// --- DATA ---
const AESTHETIC = [
  {
    id: "01",
    title: "Editorial",
    desc: "Magazine-worthy poses with perfect lighting. We direct you effortlessly to create high-fashion imagery that looks intentional yet natural.",
    icon: <Aperture strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />
  },
  {
    id: "02",
    title: "Candid",
    desc: "Unscripted moments of pure emotion. We become invisible to capture the laughter, tears, and fleeting glances you didn't know happened.",
    icon: <Camera strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />
  },
  {
    id: "03",
    title: "Timeless",
    desc: "Editing that never goes out of style. True-to-life colors with a cinematic touch that ages beautifully over decades.",
    icon: <Heart strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />
  }
];

const AestheticSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // --- SCROLL ANIMATION OBSERVER ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 } // Triggers when 15% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-32 px-5 md:px-8 relative bg-white overflow-hidden"
    >
        <div className="max-w-[1400px] mx-auto">
            
            {/* --- HEADER --- */}
            <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-0 transition-all duration-1000 transform ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="max-w-xl">
                    <span className="text-[#B3907A] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block mb-4 md:mb-5">
                        Our Philosophy
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#3a3a3a] leading-[1.15] md:leading-tight">
                        The Art of <br className="hidden sm:block"/> <span className="italic text-[#B3907A]">Observation</span>
                    </h2>
                </div>
                
                <p className="text-[#3a3a3a]/60 text-sm md:text-base max-w-[280px] md:max-w-sm leading-relaxed md:text-justify delay-200 transition-all duration-1000 transform ease-out">
                    We blend three distinct styles to create a comprehensive gallery that feels both high-end and deeply personal.
                </p>
            </div>

            {/* --- INTERACTIVE GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#3a3a3a]/10">
                
                {AESTHETIC.map((item, idx) => (
                    <div 
                        key={idx} 
                        // Added staggered animation delays based on the index (0ms, 200ms, 400ms)
                        style={{ transitionDelay: `${idx * 150}ms` }}
                        className={`
                            group relative p-8 sm:p-10 md:p-12 lg:p-16 border-r border-b border-[#3a3a3a]/10 
                            hover:bg-[#0a0a0a] active:bg-[#0a0a0a] cursor-pointer md:cursor-default
                            transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                        `}
                    >
                        
                        {/* Number Indicator */}
                        <div className="absolute top-6 right-6 md:top-8 md:right-8 text-[10px] md:text-xs font-mono text-[#3a3a3a]/30 group-hover:text-white/30 group-active:text-white/30 transition-colors duration-500">
                            /{item.id}
                        </div>

                        {/* Icon */}
                        <div className="text-[#B3907A] mb-8 md:mb-12 transform group-hover:scale-110 group-active:scale-110 transition-transform duration-500 origin-left">
                            {item.icon}
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4 text-[#3a3a3a] group-hover:text-white group-active:text-white transition-colors duration-500">
                                {item.title}
                            </h3>
                            <p className="text-[#3a3a3a]/60 text-xs md:text-sm leading-relaxed md:leading-loose group-hover:text-white/70 group-active:text-white/70 transition-colors duration-500 pr-2">
                                {item.desc}
                            </p>
                        </div>

                        {/* Decorative Bottom Line Animation */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#B3907A] group-hover:w-full group-active:w-full transition-all duration-700 ease-out"></div>
                    </div>
                ))}

            </div>
        </div>
    </section>
  );
};

export default AestheticSection;
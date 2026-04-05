import React, { useState, useEffect, useRef } from 'react';
import { Camera, Heart, Globe, Award, Star } from 'lucide-react';

// --- DATA CONFIGURATION ---
const STATS = [
  { 
    label: "Weddings", 
    value: "45+", 
    desc: "Stories Captured",
    icon: <Camera strokeWidth={1.5} /> 
  },
  { 
    label: "Couples", 
    value: "140+", 
    desc: "Trusting Us",
    icon: <Heart strokeWidth={1.5} /> 
  },
  { 
    label: "Destinations", 
    value: "12", 
    desc: "Global Locations",
    icon: <Globe strokeWidth={1.5} /> 
  },
  { 
    label: "Awards", 
    value: "5", 
    desc: "Industry Recognition",
    icon: <Award strokeWidth={1.5} /> 
  }
];

// --- INDIVIDUAL STAT CARD ---
const StatItem = ({ stat, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  const targetNumber = parseInt(stat.value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = stat.value.replace(/[0-9]/g, '');

  // Intersection Observer to trigger animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  // MOBILE FIX: 60fps Buttery Smooth Counter using requestAnimationFrame
  useEffect(() => {
    if (!isVisible || targetNumber === 0) return;
    
    let startTime;
    const duration = 2000; // 2 seconds

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // easeOutQuart equation for a smooth deceleration at the end
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOut * targetNumber);

      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, targetNumber]);

  return (
    <div 
      ref={elementRef}
      className={`
        relative group 
        /* MOBILE OPTIMIZATION: Reduced padding and height to fit 2x2 grid perfectly */
        p-6 sm:p-8 lg:p-12
        min-h-[220px] sm:min-h-[280px] lg:min-h-[350px]
        flex flex-col items-center justify-center text-center
        transition-colors duration-500 hover:bg-white/[0.03]
        border-white/5
        
        /* EXACT WIREFRAME BORDERS: 
           Mobile (2x2): Top row has bottom border, left column has right border.
           Desktop (1x4): No bottom borders, right borders on first 3. */
        border-b [&:nth-child(n+3)]:border-b-0 odd:border-r even:border-r-0
        lg:[&:nth-child(n)]:border-b-0 lg:[&:nth-child(n)]:border-r lg:last:border-r-0
      `}
    >
      {/* Icon - Responsively sized */}
      <div className="mb-4 lg:mb-8 text-white/30 group-hover:text-white group-hover:-translate-y-2 transition-all duration-500 ease-out flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8">
        {stat.icon}
      </div>

      {/* Animated Number - Scaled down slightly for mobile 2x2 grid */}
      <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="font-serif text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-[#B3907A] mb-2 lg:mb-4 tracking-tight leading-none">
          {targetNumber > 0 ? (
            <span>
              {count}
              <span className="text-white/20 text-2xl lg:text-4xl align-top ml-1 font-sans font-light">{suffix}</span>
            </span>
          ) : (
            <span>{stat.value}</span>
          )}
        </div>
      </div>

      {/* Label & Desc */}
      <div className="relative z-10">
        <h4 className="text-white text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] mb-1.5 lg:mb-2">
            {stat.label}
        </h4>
        <p className="text-white/40 text-[8px] lg:text-[10px] uppercase tracking-widest font-light line-clamp-1">
            {stat.desc}
        </p>
      </div>

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#B3907A]/0 via-[#B3907A]/0 to-[#B3907A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const StatsSection = () => {
  return (
    <section className="bg-[#1a1a1a] border-t border-white/5 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] bg-[#B3907A] opacity-[0.05] blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Intro Header - Reduced padding for mobile */}
        <div className="pt-16 pb-10 lg:pt-24 lg:pb-12 text-center px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B3907A]/30 mb-5 lg:mb-6">
                <Star size={10} className="text-[#B3907A] fill-[#B3907A]" />
                <span className="text-[#B3907A] text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em]">Our Milestones</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white">
                A Decade of <span className="italic text-[#B3907A]">Excellence</span>
            </h2>
        </div>

        {/* The Grid - Switched to 2 columns on mobile instead of 1 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-white/5 w-full">
          {STATS.map((stat, idx) => (
            <StatItem key={idx} stat={stat} index={idx} />
          ))}
        </div>
        
        {/* Bottom decorative footer */}
        <div className="py-6 lg:py-8 text-center">
            <p className="text-white/20 text-[8px] lg:text-[10px] uppercase tracking-[0.3em]">Est. 2015 • Colombo, Sri Lanka</p>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
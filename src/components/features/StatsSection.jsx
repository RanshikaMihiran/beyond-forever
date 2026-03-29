import React, { useState, useEffect, useRef } from 'react';
import { Camera, Heart, Globe, Award, Star } from 'lucide-react';

// --- DATA CONFIGURATION ---
const STATS = [
  { 
    label: "Weddings", 
    value: "45+", 
    desc: "Stories Captured",
    icon: <Camera strokeWidth={1} /> 
  },
  { 
    label: "Couples", 
    value: "140+", 
    desc: "Trusting Us",
    icon: <Heart strokeWidth={1} /> 
  },
  { 
    label: "Destinations", 
    value: "12", 
    desc: "Global Locations",
    icon: <Globe strokeWidth={1} /> 
  },
  { 
    label: "Awards", 
    value: "5", 
    desc: "Industry Recognition",
    icon: <Award strokeWidth={1} /> 
  }
];

// --- INDIVIDUAL STAT CARD ---
const StatItem = ({ stat, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  const targetNumber = parseInt(stat.value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = stat.value.replace(/[0-9]/g, '');

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

  useEffect(() => {
    if (!isVisible || targetNumber === 0) return;
    let start = 0;
    const duration = 2000; 
    const incrementTime = (duration / targetNumber); 

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= targetNumber) clearInterval(timer);
    }, Math.max(incrementTime, 10));

    return () => clearInterval(timer);
  }, [isVisible, targetNumber]);

  return (
    <div 
      ref={elementRef}
      className={`
        relative group p-12
        /* BORDERS: Minimalist vertical dividers */
        md:border-r border-white/5
        last:border-r-0
        /* INTERACTION: Smooth fade on hover */
        hover:bg-white/[0.03] transition-colors duration-500
        flex flex-col items-center justify-center text-center
        min-h-[350px]
      `}
    >
      {/* Icon - Floats up on hover */}
      <div className="mb-8 text-white/30 group-hover:text-white group-hover:-translate-y-2 transition-all duration-500 ease-out">
        {React.cloneElement(stat.icon, { size: 32 })}
      </div>

      {/* Animated Number - The Hero Element */}
      <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#B3907A] mb-4 tracking-tight leading-none">
          {targetNumber > 0 ? (
            <span>{count}<span className="text-white/20 text-4xl align-top ml-1 font-sans font-light">{suffix}</span></span>
          ) : (
            <span>{stat.value}</span>
          )}
        </div>
      </div>

      {/* Label & Desc */}
      <div className="relative z-10">
        <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">
            {stat.label}
        </h4>
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-light">
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
    // UPDATED: Dark Background for Cinematic Contrast
    <section className="bg-[#1a1a1a] border-t border-white/5 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#B3907A] opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Intro Header - Centered & Clean */}
        <div className="pt-24 pb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B3907A]/30 mb-6">
                <Star size={10} className="text-[#B3907A] fill-[#B3907A]" />
                <span className="text-[#B3907A] text-[9px] font-bold uppercase tracking-[0.2em]">Our Milestones</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white">
                A Decade of <span className="italic text-[#B3907A]">Excellence</span>
            </h2>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-white/5">
          {STATS.map((stat, idx) => (
            <StatItem key={idx} stat={stat} index={idx} />
          ))}
        </div>
        
        {/* Bottom decorative footer */}
        <div className="py-8 text-center">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">Est. 2015 • Colombo, Sri Lanka</p>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
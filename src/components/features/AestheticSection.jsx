import React from 'react';
import { Aperture, Camera, Heart } from 'lucide-react';

// Define data internally for simplicity, or import if you prefer
const AESTHETIC = [
  {
    id: "01",
    title: "Editorial",
    desc: "Magazine-worthy poses with perfect lighting. We direct you effortlessly to create high-fashion imagery that looks intentional yet natural.",
    icon: <Aperture strokeWidth={1} className="w-10 h-10" />
  },
  {
    id: "02",
    title: "Candid",
    desc: "Unscripted moments of pure emotion. We become invisible to capture the laughter, tears, and fleeting glances you didn't know happened.",
    icon: <Camera strokeWidth={1} className="w-10 h-10" />
  },
  {
    id: "03",
    title: "Timeless",
    desc: "Editing that never goes out of style. True-to-life colors with a cinematic touch that ages beautifully over decades.",
    icon: <Heart strokeWidth={1} className="w-10 h-10" />
  }
];

const AestheticSection = () => {
  return (
    <section className="py-32 px-6 relative bg-white overflow-hidden">
        
        <div className="max-w-7xl mx-auto">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                <div className="max-w-xl">
                    <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Our Philosophy</span>
                    <h2 className="font-serif text-5xl md:text-6xl text-[#3a3a3a] leading-tight">
                        The Art of <br/> <span className="italic text-[#B3907A]">Observation</span>
                    </h2>
                </div>
                <p className="text-[#3a3a3a]/50 text-sm max-w-sm mt-6 md:mt-0 leading-relaxed text-justify hidden md:block">
                    We blend three distinct styles to create a comprehensive gallery that feels both high-end and deeply personal.
                </p>
            </div>

            {/* --- INTERACTIVE GRID --- */}
            {/* We use borders on the parent and children to create a clean grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#3a3a3a]/10">
                
                {AESTHETIC.map((item, idx) => (
                    <div 
                        key={idx} 
                        className="group relative p-12 md:p-16 border-r border-b border-[#3a3a3a]/10 hover:bg-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-default"
                    >
                        
                        {/* Number Indicator */}
                        <div className="absolute top-8 right-8 text-xs font-mono text-[#3a3a3a]/20 group-hover:text-white/20 transition-colors duration-500">
                            /{item.id}
                        </div>

                        {/* Icon - Scales and changes color on hover */}
                        <div className="text-[#B3907A] mb-12 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                            {item.icon}
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="font-serif text-3xl mb-4 text-[#3a3a3a] group-hover:text-white transition-colors duration-500">
                                {item.title}
                            </h3>
                            <p className="text-[#3a3a3a]/60 text-sm leading-loose group-hover:text-white/70 transition-colors duration-500">
                                {item.desc}
                            </p>
                        </div>

                        {/* Decorative Bottom Line Animation */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#B3907A] group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                ))}

            </div>
        </div>
    </section>
  );
};

export default AestheticSection;
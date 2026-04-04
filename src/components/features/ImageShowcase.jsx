import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const PORTFOLIO_ITEMS = [
  { 
    id: 1, 
    title: "Amelia & James", 
    category: "Coastal Elopement", 
    year: "2025",
    src: "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/Night-Wedding%20/SHA02855.webp?updatedAt=1772638178985",
    gallery: [
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/Night-Wedding%20/SHA02855.webp?updatedAt=1772638178985",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583939000571-085e5bbbb2df?q=80&w=2000&auto=format&fit=crop",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/Night-Wedding%20/SHA02855.webp?updatedAt=1772638178985"
    ]
  },
  { 
    id: 2, 
    title: "Naveesha & Hohan", 
    category: "Editorial Campaign", 
    year: "2025",
    src: "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/SHA05664.webp?updatedAt=1774605741741",
    gallery: [
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/6.webp?updatedAt=1774605738110",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/SHA05744.webp?updatedAt=1774605726905",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/SHA05744.webp?updatedAt=1774605726905",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/SHA05883.webp?updatedAt=1774605688417",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/12.webp?updatedAt=1774605683815",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/SHA05827.webp?updatedAt=1774605670183",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/SHA05827.webp?updatedAt=1774605670183",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/SHA05945.webp?updatedAt=1774605651663",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/SHA05904.webp?updatedAt=1774605634712",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/13.webp?updatedAt=1774605605040",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/naveesha-and-yohan/14.webp?updatedAt=1774605600082"
    ]
  },
  { 
    id: 3, 
    title: "A & B", 
    category: "Destination Wedding", 
    year: "2024",
    src: "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/18.webp?updatedAt=1775059537427",
    gallery: [
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/17.jpg.webp?updatedAt=1775059545995",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/16.jpg.webp?updatedAt=1775059545198",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/18.webp?updatedAt=1775059537427",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/E.webp?updatedAt=1775059537144",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/09.jpg.webp?updatedAt=1775059529453",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/02.jpg(1).webp?updatedAt=1775059521372",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/SHA07864.webp?updatedAt=1775059519153",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/25.jpg.webp?updatedAt=1775059515623",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/SHA07886.webp?updatedAt=1775059508884",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/SHA07886.webp?updatedAt=1775059508884",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/SHA08134.webp?updatedAt=1775059500412",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/SHA08134.webp?updatedAt=1775059500412",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/26.jpg.webp?updatedAt=1775059478262",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/SHA07875.webp?updatedAt=1775059450862",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/SHA07931.webp?updatedAt=1775059446003",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/shoot-01/22.webp?updatedAt=1775059444092"
    ]
  },
  { 
    id: 4, 
    title: "Rachel & Praveen", 
    category: "Black & White Series", 
    year: "2024",
    src: "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA05073.webp",
    gallery: [
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04972.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04974.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA05073.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04968.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04691.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04779.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04706.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04851.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04553.jpeg",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04844.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA05091.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04443.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04800.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA05088.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04696.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04826.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04443.jpeg",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04559.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04559.jpeg",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04742.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04479.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04854.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04479.jpeg",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04593.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04476.webp",
      "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/rachel-and-praveen/SHA04476.jpeg",
    ]
  },
];

const ImageShowcase = () => {
  const [activeItem, setActiveItem] = useState(PORTFOLIO_ITEMS[0]);
  const navigate = useNavigate();

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24 border-t border-[#1a1a1a]/5">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-end mb-12 md:mb-24 md:border-b border-[#1a1a1a]/10 md:pb-8">
           <div>
              <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">
                 Selected Works
              </span>
              <h2 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] leading-none">
                 Featured <span className="italic text-[#B3907A]">Stories</span>
              </h2>
           </div>
           
           <button 
             onClick={() => navigate('/portfolio')}
             className="hidden md:flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#B3907A] transition-colors group"
           >
             View All
             <div className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center group-hover:border-[#B3907A] group-hover:text-[#B3907A] transition-all duration-300">
                <ArrowRight size={12} />
             </div>
           </button>
        </div>

        {/* --- MOBILE: EDITORIAL CARDS --- */}
        <div className="flex flex-col gap-6 lg:hidden">
          {PORTFOLIO_ITEMS.map((item) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/portfolio/${item.id}`)}
              className="relative w-full h-[450px] rounded-[2rem] overflow-hidden shadow-lg cursor-pointer group"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-widest mb-2 drop-shadow-md">
                  {item.category} &mdash; {item.year}
                </span>
                <h3 className="font-serif text-4xl text-white mb-4 drop-shadow-lg leading-tight">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-white/90 text-[10px] uppercase tracking-widest font-bold group-hover:text-[#B3907A] transition-colors">
                  View Gallery <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- DESKTOP: INTERACTIVE SPLIT LAYOUT --- */}
        <div className="hidden lg:flex flex-row gap-24">
           {/* LEFT: THE LIST */}
           <div className="flex-1 flex flex-col justify-center">
              {PORTFOLIO_ITEMS.map((item) => (
                <div 
                  key={item.id}
                  onMouseEnter={() => setActiveItem(item)}
                  onClick={() => navigate(`/portfolio/${item.id}`)}
                  className={`
                    group relative py-10 border-b border-[#1a1a1a]/10 cursor-pointer transition-all duration-300
                    ${activeItem.id === item.id ? 'pl-8' : 'pl-0 hover:pl-4'}
                  `}
                >
                   <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#B3907A] transition-all duration-300 ${activeItem.id === item.id ? 'h-[60%]' : 'h-0'}`}></div>

                   <div className="flex justify-between items-center relative z-10">
                      <div>
                         <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block transition-colors duration-300 ${activeItem.id === item.id ? 'text-[#B3907A]' : 'text-[#1a1a1a]/40'}`}>
                            {item.category}
                         </span>
                         <h3 className={`font-serif text-5xl transition-colors duration-300 ${activeItem.id === item.id ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/20 group-hover:text-[#1a1a1a]/60'}`}>
                            {item.title}
                         </h3>
                      </div>

                      <ArrowUpRight 
                        size={24} 
                        className={`transition-all duration-300 ${activeItem.id === item.id ? 'opacity-100 text-[#B3907A] rotate-45' : 'opacity-0 -translate-x-4'}`} 
                      />
                   </div>
                </div>
              ))}
           </div>

           {/* RIGHT: DESKTOP IMAGE PREVIEW */}
           <div className="flex-1 h-[600px] relative">
              <div 
                className="sticky top-24 w-full h-full overflow-hidden rounded-[4px] cursor-pointer group"
                onClick={() => navigate(`/portfolio/${activeItem.id}`)}
              >
                 {PORTFOLIO_ITEMS.map((item) => (
                   <img 
                     key={item.id}
                     src={item.src} 
                     alt={item.title}
                     className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform ${activeItem.id === item.id ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'} group-hover:scale-105`}
                   />
                 ))}
                 
                 <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-none">
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest block mb-2">Project Year</span>
                    <span className="text-white font-serif text-2xl">{activeItem.year}</span>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none"></div>
              </div>
           </div>
        </div>

        {/* MOBILE BOTTOM BUTTON */}
        <div className="mt-12 text-center lg:hidden">
            <button 
              onClick={() => navigate('/portfolio')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B3907A] border-b border-[#B3907A]/30 pb-1 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors"
            >
              View Full Portfolio <ArrowRight size={12} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default ImageShowcase;
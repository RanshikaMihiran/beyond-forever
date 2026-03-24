import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import Button from '../ui/Button';

// Synthesized data from the Beyond & Forever 2026/2027 Price Guide (Prices Removed)
const PRICING_DATA = {
  "One Day Wedding": [
    { 
      title: "Package I", 
      desc: "Essential coverage for your special day.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "Main photo session (Preferred location)", "Ceremony & Reception", "16x24 Enlargements (2)", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"] 
    },
    { 
      title: "Package II", 
      desc: "Upgraded coverage with a Fine Art Album.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "10x24 Fine Art Magazine Album (40 Pgs)", "16x24 (2) & 12x18 (1) Enlargements", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"], 
      popular: true 
    },
    { 
      title: "Package III", 
      desc: "Extensive coverage with premium deliverables.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "12x30 Fine Art Magazine Album (50 Pgs)", "16x24 (2) & 12x18 (1) Framed Enlargements", "Thank You Cards (150 pcs)", "200 Edited Images on digital media"] 
    },
    { 
      title: "Package IV", 
      desc: "Maximum coverage and complete storytelling.",
      features: ["Up to 10 Hours Coverage", "03 Photographers", "16x24 Fine Art Magazine Album (60 Pgs)", "16x24 (2) & 12x18 (1) Framed Enlargements", "Thank You Cards (200 pcs)", "200 Edited Images on digital media"] 
    }
  ],
  "Premium Packages": [
    { 
      title: "Premium I", 
      desc: "Pre-shoot & complete wedding day coverage.",
      features: ["Pre-Shoot (3 Hrs, 50 Images, 8x24 Album)", "Wedding (10 Hrs, 2 Photographers)", "Getting Ready + Main Session + Ceremony", "12x30 Fine Art Album (60 Pgs) & Magazine Album", "16x24 (2) & 12x18 (2) Enlargements", "All Unedited Images Included"] 
    },
    { 
      title: "Premium II", 
      desc: "The ultimate 3-event storytelling collection.",
      features: ["Pre-Shoot (3 Hrs, 80 Images, 10x18 Album)", "Wedding (10 Hrs, 12x30 Album, 8x20 Family Album)", "Homecoming Coverage Included", "16x24 (2) & 12x18 (2) Enlargements", "Thank You Cards (200 pcs)", "All Unedited Images Included"],
      popular: true
    },
    { 
      title: "Premium III", 
      desc: "Uncompromised luxury and deliverables.",
      features: ["Pre-Shoot (3 Hrs, 100 Images, 12x17 Album)", "Wedding (10 Hrs, 12x30 Album, Mini & Family Albums)", "Homecoming Coverage Included", "20x30 (2), 16x24 (2) & 12x18 (2) Enlargements", "Thank You Cards (200 pcs)", "All Unedited Images Included"] 
    }
  ],
  "Pre Session": [
    { 
      title: "Package I", 
      desc: "Simple and intimate casual shoot.",
      features: ["Casual Photo Session", "02 Outfits at Single Location", "Up to 40 Edited Images on digital media"] 
    },
    { 
      title: "Package II", 
      desc: "Casual shoot with framed memories.",
      features: ["Casual Photo Session", "02 Outfits at Single Location", "12x18 Framed Enlargement", "Up to 40 Edited Images on digital media"],
      popular: true
    },
    { 
      title: "Package III", 
      desc: "Complete casual session with an album.",
      features: ["Casual Photo Session", "02 Outfits at Single Location", "12x16 Magazine Album (30 pages)", "12x18 Framed Enlargement", "Up to 40 Edited Images on digital media"] 
    }
  ],
  "Homecoming": [
    { 
      title: "Package I", 
      desc: "Essential homecoming portraits.",
      features: ["Main photo session at preferred location", "Edited images on digital media"] 
    },
    { 
      title: "Package II", 
      desc: "Full coverage homecoming celebration.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "Ceremony & Reception Coverage", "16x24 Wedding Enlargements (2)", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"],
      popular: true
    },
    { 
      title: "Package III", 
      desc: "Premium homecoming coverage with album.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "10x24 Fine Art Magazine Album (40 Pgs)", "16x24 (2) & 12x18 (1) Enlargements", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"] 
    }
  ]
};

const PricingSection = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState("One Day Wedding");

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 bg-[#F5F5EB] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 px-4">
           <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Investment</span>
           <h2 className="font-serif text-4xl md:text-5xl text-[#3a3a3a] mb-6">The Collections</h2>
           <p className="text-[#3a3a3a]/60 font-light leading-relaxed text-sm md:text-base">
             Curated collections designed to preserve your memories beautifully. We offer transparent, comprehensive packages with no hidden fees.
           </p>
        </div>

       {/* --- CATEGORY TABS (Swipeable on Mobile) --- */}
        <div className="relative z-20 w-full mb-12 md:mb-16">
          <div className="flex overflow-x-auto md:flex-wrap md:justify-center gap-4 md:gap-5 pb-4 md:pb-0 px-4 scrollbar-hide snap-x">
            {Object.keys(PRICING_DATA).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                /* INCREASED PADDING: px-8 makes the pills wider and more elegant like your image */
                className={`flex-shrink-0 snap-center px-8 py-3.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 outline-none ${
                  activeTab === category
                    // ACTIVE STATE: Dark charcoal, white text, soft medium shadow
                    ? 'bg-[#3a3a3a] text-white shadow-md border border-[#3a3a3a]' 
                    // INACTIVE STATE: Almost solid white, very faint border, grey text
                    : 'bg-white/90 border border-[#3a3a3a]/10 text-[#3a3a3a]/60 hover:bg-white hover:text-[#3a3a3a] hover:shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Mobile Swipe Indicator */}
          <div className="md:hidden flex justify-center mt-2">
            <span className="text-[#B3907A]/60 text-[8px] uppercase tracking-widest font-bold">Swipe to explore</span>
          </div>
        </div>

        {/* --- PRICING GRID --- */}
        {/* We use key={activeTab} to force React to re-trigger the fade-in animation every time the tab changes */}
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 lg:gap-8 items-stretch">
           {PRICING_DATA[activeTab].map((pkg, idx) => {
             const isDark = pkg.popular;
             
             return (
               <div 
                 key={idx} 
                 className={`
                   relative p-6 sm:p-8 md:p-10 rounded-2xl transition-all duration-500 flex flex-col h-full animate-fade-in
                   ${isDark 
                     ? 'bg-[#3a3a3a] text-white shadow-2xl xl:-translate-y-4 z-10 border border-[#B3907A]/30' 
                     : 'bg-white text-[#3a3a3a] border border-[#3a3a3a]/5 hover:shadow-xl hover:-translate-y-2' 
                   }
                 `}
                 // Staggered animation delay for a cascading load effect
                 style={{ animationDelay: `${idx * 100}ms` }}
               >
                   {/* Popular Badge (Gold Pill) */}
                   {pkg.popular && (
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#B3907A] text-white text-[10px] font-bold uppercase px-5 py-1.5 tracking-[0.2em] rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap z-20">
                       <Star size={12} fill="currentColor" /> Most Loved
                     </div>
                   )}

                   {/* Card Header (Prices removed, emphasis on title & desc) */}
                   <div className={`text-center border-b pb-8 mb-8 ${isDark ? 'border-white/10' : 'border-[#3a3a3a]/10'}`}>
                     <h3 className={`font-serif text-3xl md:text-4xl mb-4 ${isDark ? 'text-white' : 'text-[#3a3a3a]'}`}>{pkg.title}</h3>
                     <p className={`text-sm font-light leading-relaxed min-h-[40px] ${isDark ? 'text-white/70' : 'text-[#3a3a3a]/60'}`}>{pkg.desc}</p>
                   </div>

                   {/* Features List */}
                   <ul className="space-y-4 mb-10 flex-grow">
                      {pkg.features.map((f, i) => (
                         <li key={i} className={`flex items-start gap-4 text-sm font-light ${isDark ? 'text-white/80' : 'text-[#3a3a3a]/80'}`}>
                           <div className={`mt-0.5 min-w-[16px] text-[#B3907A]`}>
                             <Check size={16} strokeWidth={2.5} />
                           </div>
                           <span className="leading-relaxed">{f}</span>
                         </li>
                      ))}
                   </ul>

                   {/* Action Button */}
                   <div className="text-center mt-auto pt-4">
                     <Button 
                       variant={isDark ? 'outline' : 'primary'} 
                       className={`w-full justify-center py-4 text-xs tracking-widest ${isDark ? 'border-white/20 text-white hover:bg-white hover:text-[#3a3a3a]' : 'bg-[#1a1a1a] hover:bg-[#B3907A]'}`}
                       onClick={() => setCurrentPage('Contact')}
                     >
                       Inquire for Details
                     </Button>
                   </div>
               </div>
             );
           })}
        </div>

        {/* Additional Note from PDF */}
        <div className="text-center mt-20 max-w-3xl mx-auto px-4">
          <p className="text-[#3a3a3a]/50 text-xs md:text-sm font-light leading-relaxed">
            *Transportation and Accommodation costs may apply for outstation locations. A booking fee of 20,000 LKR is required to secure your date. For full pricing and customized requirements, please <button onClick={() => setCurrentPage('Contact')} className="text-[#B3907A] font-bold hover:underline transition-all">contact us</button> directly.
          </p>
        </div>

      </div>

      {/* Tailwind Utilities for Scrollbar hiding & Animations */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          opacity: 0; /* Starts hidden */
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
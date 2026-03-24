import React, { useState } from 'react';
import { Check } from 'lucide-react';

// Packages synthesized from the Beyond & Forever 2026/2027 Price Guide
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
      features: ["Up to 10 Hours Coverage", "02 Photographers", "10x24 Fine Art Magazine Album (40 Pgs)", "16x24 (2) & 12x18 (1) Enlargements", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"]
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
      features: ["Pre-Shoot (3 Hrs, 80 Images, 10x18 Album)", "Wedding (10 Hrs, 12x30 Album, 8x20 Family Album)", "Homecoming Coverage Included", "16x24 (2) & 12x18 (2) Enlargements", "Thank You Cards (200 pcs)", "All Unedited Images Included"]
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
      features: ["Casual Photo Session", "02 Outfits at Single Location", "12x18 Framed Enlargement", "Up to 40 Edited Images on digital media"]
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
      features: ["Up to 10 Hours Coverage", "02 Photographers", "Ceremony & Reception Coverage", "16x24 Wedding Enlargements (2)", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"]
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
    <section className="py-20 md:py-32 bg-[#F5F5EB] overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
           <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Investment</span>
           <h2 className="font-serif text-4xl md:text-5xl text-[#3a3a3a] mb-6">The Collections</h2>
           <p className="text-[#3a3a3a]/60 font-light leading-relaxed text-sm md:text-base">
             Curated collections designed to preserve your memories beautifully. We offer transparent, comprehensive packages tailored to your vision [cite: 5-23, 24-57, 58-77, 78-128].
           </p>
        </div>

        {/* --- BULLETPROOF MOBILE TABS --- */}
        <div className="w-full mb-10 md:mb-16">
          <div className="md:hidden flex justify-center mb-4">
            <span className="text-[#B3907A]/80 text-[9px] uppercase tracking-widest font-bold animate-pulse">Swipe to explore packages &rarr;</span>
          </div>
          
          {/* Flattened track: No nested centering on mobile, pure horizontal scrolling */}
          <div 
            className="flex overflow-x-auto md:flex-wrap md:justify-center gap-3 pb-4 scrollbar-hide snap-x" 
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Left invisible spacer to prevent clipping on mobile */}
            <div className="w-1 md:hidden flex-shrink-0"></div>

            {Object.keys(PRICING_DATA).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex-shrink-0 snap-center px-7 md:px-8 py-3.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 outline-none whitespace-nowrap cursor-pointer ${
                  activeTab === category
                    ? 'bg-[#3a3a3a] text-white shadow-md border border-[#3a3a3a]' 
                    : 'bg-white border border-[#3a3a3a]/10 text-[#3a3a3a]/60 hover:text-[#3a3a3a] hover:shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}

            {/* Right invisible spacer to prevent clipping on mobile */}
            <div className="w-1 md:hidden flex-shrink-0"></div>
          </div>
        </div>

        {/* --- CARD GRID LAYOUT --- */}
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 lg:gap-8 animate-fade-in">
           {PRICING_DATA[activeTab].map((pkg, idx) => {
             return (
               <div 
                 key={idx} 
                 className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1"
                 style={{ animationDelay: `${idx * 100}ms` }}
               >
                   {/* Card Header */}
                   <div className="text-center mb-6">
                     <h3 className="font-serif text-3xl md:text-4xl text-[#3a3a3a] mb-4">{pkg.title}</h3>
                     <p className="text-[#3a3a3a]/50 text-sm font-light leading-relaxed min-h-[40px]">{pkg.desc}</p>
                   </div>

                   {/* Divider line */}
                   <hr className="w-full border-t border-[#3a3a3a]/10 mb-8" />

                   {/* Features List */}
                   <ul className="flex flex-col gap-4 mb-10 flex-grow">
                      {pkg.features.map((f, i) => (
                         <li key={i} className="flex items-start gap-3 text-sm font-light text-[#3a3a3a]/70">
                           <Check size={18} strokeWidth={2} className="text-[#B3907A] mt-0.5 flex-shrink-0" />
                           <span className="leading-relaxed">{f}</span>
                         </li>
                      ))}
                   </ul>

                   {/* Action Button */}
                   <button 
                     onClick={() => setCurrentPage('Contact')}
                     className="w-full bg-[#B3907A]/90 hover:bg-[#B3907A] text-white rounded-xl py-4 md:py-5 text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 mt-auto"
                   >
                     Inquire for Details
                   </button>
               </div>
             );
           })}
        </div>

        {/* --- FOOTNOTE --- */}
        <div className="text-center mt-16 max-w-3xl mx-auto px-4">
          <p className="text-[#3a3a3a]/50 text-xs md:text-sm font-light leading-relaxed">
            *Transportation and Accommodation costs may apply for outstation locations. A booking fee of 20,000 LKR is required to secure your date. Please <button onClick={() => setCurrentPage('Contact')} className="text-[#B3907A] font-bold hover:underline transition-all">contact us</button> for full availability.
          </p>
        </div>

      </div>

      {/* Tailwind Utilities for Scrollbar hiding & Animations */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in > div {
          opacity: 0;
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';

// Packages synthesized from the Beyond & Forever Price Guide
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
      features: ["Pre-Shoot (3 Hrs, 100 Images, 12x17 Album)", "Wedding (10 Hrs, 12x30 Album, Family Albums)", "Homecoming Coverage Included", "20x30 (2), 16x24 (2) & 12x18 (2) Enlargements", "Thank You Cards (200 pcs)", "All Unedited Images Included"] 
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
    <section className="py-20 md:py-32 bg-[#F5F5EB] font-sans relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-0 md:px-6">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16 px-6">
           <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-3 md:mb-4">Investment</span>
           <h2 className="font-serif text-4xl md:text-5xl text-[#3a3a3a] mb-4 md:mb-6">The Collections</h2>
           <p className="text-[#3a3a3a]/60 font-light leading-relaxed text-sm md:text-base">
             Curated collections designed to preserve your memories beautifully. We offer transparent, comprehensive packages tailored to your vision.
           </p>
        </div>

        {/* ======================================================= */}
        {/* 1. UNIFIED TABS (Swipeable on Mobile, Centered on Desk) */}
        {/* ======================================================= */}
        {/* MOBILE FIX: Dropped the clunky dropdown for an elegant horizontal scrolling tab bar */}
        <div className="flex overflow-x-auto snap-x touch-pan-x scrollbar-hide gap-3 md:gap-4 md:flex-wrap md:justify-center max-w-none mx-auto mb-10 md:mb-16 px-6 md:px-0">
          {Object.keys(PRICING_DATA).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              /* MOBILE FIX: Added whitespace-nowrap and flex-shrink-0 so tabs scroll smoothly */
              className={`whitespace-nowrap flex-shrink-0 snap-center px-6 md:px-8 py-3.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 outline-none cursor-pointer text-center active:scale-95 ${
                activeTab === category
                  ? 'bg-[#3a3a3a] text-white shadow-md border border-[#3a3a3a]' 
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-[#3a3a3a] hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ======================================================= */}
        {/* 2. CARD LAYOUT (Horizontal Snap on Mobile, Grid Desktop)*/}
        {/* ======================================================= */}
        <div className="relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory touch-pan-x scrollbar-hide gap-4 md:gap-6 lg:gap-8 px-6 md:px-0 pb-8 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] z-10">
             {PRICING_DATA[activeTab].map((pkg, idx) => {
               return (
                 <div 
                   key={`${activeTab}-${idx}`} // Force re-render animation when tab changes
                   /* MOBILE FIX: Switched from a stacked grid to w-[85vw] horizontal scrolling cards */
                   className="w-[85vw] max-w-[340px] md:w-auto flex-shrink-0 snap-center bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5 flex flex-col h-auto transition-all duration-300 hover:shadow-xl animate-fade-in"
                 >
                     {/* Card Header */}
                     <div className="text-center mb-6">
                       <h3 className="font-serif text-3xl md:text-4xl text-[#3a3a3a] mb-3 md:mb-4">{pkg.title}</h3>
                       <p className="text-[#3a3a3a]/50 text-xs md:text-sm font-light leading-relaxed min-h-[40px]">{pkg.desc}</p>
                     </div>

                     {/* Divider line */}
                     <hr className="w-full border-t border-gray-100 mb-6 md:mb-8" />

                     {/* Features List */}
                     <ul className="flex flex-col gap-4 mb-8 flex-grow">
                        {pkg.features.map((f, i) => (
                           <li key={i} className="flex items-start gap-3 text-[13px] md:text-sm font-light text-gray-600">
                             <Check size={16} strokeWidth={2} className="text-[#B3907A] mt-0.5 flex-shrink-0" />
                             <span className="leading-relaxed">{f}</span>
                           </li>
                        ))}
                     </ul>

                     {/* Action Button */}
                     <button 
                       type="button"
                       onClick={() => setCurrentPage('Contact')}
                       className="w-full bg-[#B3907A]/90 hover:bg-[#B3907A] text-white rounded-xl py-4 md:py-5 text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 mt-auto select-none active:scale-95 cursor-pointer shadow-md"
                     >
                       Inquire for Details
                     </button>
                 </div>
               );
             })}
          </div>

          {/* Mobile Swipe Indicator (Only visible on mobile) */}
          <div className="md:hidden flex items-center justify-center gap-2 text-[#B3907A] text-[9px] uppercase tracking-[0.3em] font-bold mt-2 opacity-60">
            Swipe packages
            <ChevronRight size={10} />
          </div>
        </div>

        {/* --- FOOTNOTE --- */}
        <div className="text-center mt-12 md:mt-16 max-w-3xl mx-auto px-6 relative z-10">
          <p className="text-gray-500 text-[10px] md:text-xs font-light leading-relaxed">
            *Transportation and Accommodation costs may apply for outstation locations. A booking fee of 20,000 LKR is required to secure your date. Please <button type="button" onClick={() => setCurrentPage('Contact')} className="text-[#B3907A] font-bold hover:underline transition-all">contact us</button> for full availability.
          </p>
        </div>

      </div>

      {/* Tailwind Utilities for Animations and hiding Scrollbars */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
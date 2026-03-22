import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import Button from '../ui/Button';

// Synthesized data from the Beyond & Forever 2026/2027 Price Guide
const PRICING_DATA = {
  "One Day Wedding": [
    { 
      title: "Package I", 
      price: "90,000 LKR", 
      desc: "Essential coverage for your special day.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "Main photo session (Preferred location)", "Ceremony & Reception", "16x24 Enlargements (2)", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"] 
    },
    { 
      title: "Package II", 
      price: "130,000 LKR", 
      desc: "Upgraded coverage with a Fine Art Album.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "10x24 Fine Art Magazine Album (40 Pgs)", "16x24 (2) & 12x18 (1) Enlargements", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"], 
      popular: true 
    },
    { 
      title: "Package III", 
      price: "160,000 LKR", 
      desc: "Extensive coverage with premium deliverables.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "12x30 Fine Art Magazine Album (50 Pgs)", "16x24 (2) & 12x18 (1) Framed Enlargements", "Thank You Cards (150 pcs)", "200 Edited Images on digital media"] 
    },
    { 
      title: "Package IV", 
      price: "190,000 LKR", 
      desc: "Maximum coverage and complete storytelling.",
      features: ["Up to 10 Hours Coverage", "03 Photographers", "16x24 Fine Art Magazine Album (60 Pgs)", "16x24 (2) & 12x18 (1) Framed Enlargements", "Thank You Cards (200 pcs)", "200 Edited Images on digital media"] 
    }
  ],
  "Premium Packages": [
    { 
      title: "Premium I", 
      price: "250,000 LKR", 
      desc: "Pre-shoot & complete wedding day coverage.",
      features: ["Pre-Shoot (3 Hrs, 50 Images, 8x24 Album)", "Wedding (10 Hrs, 2 Photographers)", "Getting Ready + Main Session + Ceremony", "12x30 Fine Art Album (60 Pgs) & Magazine Album", "16x24 (2) & 12x18 (2) Enlargements", "All Unedited Images Included"] 
    },
    { 
      title: "Premium II", 
      price: "350,000 LKR", 
      desc: "The ultimate 3-event storytelling collection.",
      features: ["Pre-Shoot (3 Hrs, 80 Images, 10x18 Album)", "Wedding (10 Hrs, 12x30 Album, 8x20 Family Album)", "Homecoming Coverage Included", "16x24 (2) & 12x18 (2) Enlargements", "Thank You Cards (200 pcs)", "All Unedited Images Included"],
      popular: true
    },
    { 
      title: "Premium III", 
      price: "450,000 LKR", 
      desc: "Uncompromised luxury and deliverables.",
      features: ["Pre-Shoot (3 Hrs, 100 Images, 12x17 Album)", "Wedding (10 Hrs, 12x30 Album, Mini & Family Albums)", "Homecoming Coverage Included", "20x30 (2), 16x24 (2) & 12x18 (2) Enlargements", "Thank You Cards (200 pcs)", "All Unedited Images Included"] 
    }
  ],
  "Pre Session": [
    { 
      title: "Package I", 
      price: "40,000 LKR", 
      desc: "Simple and intimate casual shoot.",
      features: ["Casual Photo Session", "02 Outfits at Single Location", "Up to 40 Edited Images on digital media"] 
    },
    { 
      title: "Package II", 
      price: "50,000 LKR", 
      desc: "Casual shoot with framed memories.",
      features: ["Casual Photo Session", "02 Outfits at Single Location", "12x18 Framed Enlargement", "Up to 40 Edited Images on digital media"],
      popular: true
    },
    { 
      title: "Package III", 
      price: "70,000 LKR", 
      desc: "Complete casual session with an album.",
      features: ["Casual Photo Session", "02 Outfits at Single Location", "12x16 Magazine Album (30 pages)", "12x18 Framed Enlargement", "Up to 40 Edited Images on digital media"] 
    }
  ],
  "Homecoming": [
    { 
      title: "Package I", 
      price: "40,000 LKR", 
      desc: "Essential homecoming portraits.",
      features: ["Main photo session at preferred location", "Edited images on digital media"] 
    },
    { 
      title: "Package II", 
      price: "75,000 LKR", 
      desc: "Full coverage homecoming celebration.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "Ceremony & Reception Coverage", "16x24 Wedding Enlargements (2)", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"],
      popular: true
    },
    { 
      title: "Package III", 
      price: "110,000 LKR", 
      desc: "Premium homecoming coverage with album.",
      features: ["Up to 10 Hours Coverage", "02 Photographers", "10x24 Fine Art Magazine Album (40 Pgs)", "16x24 (2) & 12x18 (1) Enlargements", "Thank You Cards (100 pcs)", "150 Edited Images on digital media"] 
    }
  ]
};

const PricingSection = ({ setCurrentPage }) => {
  // State to track which tab is currently selected
  const [activeTab, setActiveTab] = useState("One Day Wedding");

  return (
    <section className="py-24 md:py-32 px-6 bg-[#F5F5EB]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
           <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Investment</span>
           <h2 className="font-serif text-4xl md:text-5xl text-[#3a3a3a] mb-6">The Collections</h2>
           <p className="text-[#3a3a3a]/60 font-light leading-relaxed">
             Transparent pricing with no hidden fees. We believe your memories deserve to be preserved beautifully without compromise.
           </p>
        </div>

        {/* --- CATEGORY TABS --- */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
          {Object.keys(PRICING_DATA).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 outline-none ${
                activeTab === category
                  ? 'bg-[#3a3a3a] text-white shadow-lg scale-105'
                  : 'bg-white/50 border border-[#3a3a3a]/10 text-[#3a3a3a]/70 hover:bg-white hover:text-[#3a3a3a] hover:border-[#3a3a3a]/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- PRICING GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 lg:gap-8 items-stretch transition-all duration-500">
           {PRICING_DATA[activeTab].map((pkg, idx) => {
             const isDark = pkg.popular; // Logic for the highlighted card
             
             return (
               <div 
                 key={idx} 
                 className={`
                   relative p-8 md:p-10 rounded-2xl transition-all duration-500 flex flex-col h-full animate-fade-in
                   ${isDark 
                     ? 'bg-[#3a3a3a] text-white shadow-2xl xl:-translate-y-4 z-10 border border-[#B3907A]/30' 
                     : 'bg-white text-[#3a3a3a] border border-[#3a3a3a]/5 hover:shadow-xl hover:-translate-y-2' 
                   }
                 `}
               >
                   {/* Popular Badge (Gold Pill) */}
                   {pkg.popular && (
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#B3907A] text-white text-[10px] font-bold uppercase px-5 py-1.5 tracking-[0.2em] rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap z-20">
                       <Star size={12} fill="currentColor" /> Most Loved
                     </div>
                   )}

                   {/* Card Header */}
                   <div className={`text-center border-b pb-8 mb-8 ${isDark ? 'border-white/10' : 'border-[#3a3a3a]/10'}`}>
                     <h3 className={`font-serif text-3xl mb-3 ${isDark ? 'text-white' : 'text-[#3a3a3a]'}`}>{pkg.title}</h3>
                     <p className={`text-sm mb-6 font-light min-h-[40px] ${isDark ? 'text-white/70' : 'text-[#3a3a3a]/60'}`}>{pkg.desc}</p>
                     <div className="font-serif text-4xl lg:text-5xl text-[#B3907A] tracking-tight">{pkg.price}</div>
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
                   <div className="text-center mt-auto pt-6">
                     <Button 
                       variant={isDark ? 'outline' : 'primary'} 
                       className={`w-full justify-center py-4 ${isDark ? 'border-white/20 text-white hover:bg-white hover:text-[#3a3a3a]' : 'bg-[#1a1a1a] hover:bg-[#B3907A]'}`}
                       onClick={() => setCurrentPage('Contact')}
                     >
                       Inquire Now
                     </Button>
                   </div>
               </div>
             );
           })}
        </div>

        {/* Additional Note from PDF */}
        <div className="text-center mt-20 max-w-3xl mx-auto">
          <p className="text-[#3a3a3a]/50 text-xs md:text-sm font-light leading-relaxed">
            *Transportation and Accommodation costs may apply for outstation locations[cite: 144, 145, 146]. A booking fee of 20,000 LKR is required to secure your date[cite: 132]. For customized requirements, please <button onClick={() => setCurrentPage('Contact')} className="text-[#B3907A] font-bold hover:underline transition-all">contact us</button> directly.
          </p>
        </div>

      </div>

      {/* Tailwind Animation for smooth tab switching */}
      <style>{`
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
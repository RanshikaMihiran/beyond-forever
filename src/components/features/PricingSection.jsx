import React from 'react';
import { Check, Star } from 'lucide-react';
import Button from '../ui/Button';

// Data defined internally
const PACKAGES = [
  { 
    title: "Elopement", 
    price: "$1,500", 
    desc: "Intimate coverage for just the two of you.",
    features: ["4 Hours Coverage", "1 Senior Photographer", "Online Private Gallery", "50+ Retouched Photos", "Print Release"] 
  },
  { 
    title: "Signature", 
    price: "$2,800", 
    desc: "Our most requested collection for full days.",
    features: ["10 Hours Coverage", "2 Lead Photographers", "Online Private Gallery", "Heirloom Printed Album", "Drone Aerial Shots", "Sneak Peeks (24hrs)"], 
    popular: true // This triggers the Dark Mode card
  },
  { 
    title: "Destination", 
    price: "$4,500", 
    desc: "Multi-day storytelling for epic celebrations.",
    features: ["Welcome Dinner + Wedding Day", "Unlimited Hours", "Cinema Film (3-5 mins)", "Luxury Leather Album", "Travel & Stay Included", "Pre-Wedding Session"] 
  }
];

const PricingSection = ({ setCurrentPage }) => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-2xl mx-auto mb-20">
           <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Investment</span>
           <h2 className="font-serif text-4xl md:text-5xl text-[#3a3a3a] mb-6">The Collections</h2>
           <p className="text-[#3a3a3a]/60 font-light leading-relaxed">
             Transparent pricing with no hidden fees. We believe your memories deserve to be preserved without compromise.
           </p>
        </div>

        {/* --- PRICING GRID --- */}
        {/* Using gap-6 lg:gap-10 to ensure cards aren't squashed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-center">
           {PACKAGES.map((pkg, idx) => {
             const isDark = pkg.popular; // Logic for the center card
             
             return (
               <div 
                 key={idx} 
                 className={`
                   relative p-10 rounded-xl transition-all duration-500 group flex flex-col h-full
                   ${isDark 
                     ? 'bg-[#3a3a3a] text-white shadow-2xl scale-105 z-10 border border-[#3a3a3a]' // Dark Card Style
                     : 'bg-white text-[#3a3a3a] border border-[#3a3a3a]/5 hover:shadow-xl hover:-translate-y-2' // Light Card Style
                   }
                 `}
               >
                   {/* Popular Badge (Gold Pill) */}
                   {pkg.popular && (
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#B3907A] text-white text-[10px] font-bold uppercase px-4 py-1.5 tracking-[0.2em] rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
                       <Star size={10} fill="currentColor" /> Most Loved
                     </div>
                   )}

                   {/* Card Header */}
                   <div className={`text-center border-b pb-8 mb-8 ${isDark ? 'border-white/10' : 'border-[#3a3a3a]/5'}`}>
                     <h3 className={`font-serif text-2xl mb-3 ${isDark ? 'text-white' : 'text-[#3a3a3a]'}`}>{pkg.title}</h3>
                     <p className={`text-xs mb-6 font-light ${isDark ? 'text-white/60' : 'text-[#3a3a3a]/50'}`}>{pkg.desc}</p>
                     <div className="font-serif text-5xl text-[#B3907A]">{pkg.price}</div>
                   </div>

                   {/* Features List */}
                   <ul className="space-y-5 mb-10 flex-grow">
                      {pkg.features.map((f, i) => (
                         <li key={i} className={`flex items-start gap-4 text-sm ${isDark ? 'text-white/80' : 'text-[#3a3a3a]/70'}`}>
                           <div className={`mt-0.5 min-w-[16px] text-[#B3907A]`}>
                             <Check size={16} strokeWidth={2.5} />
                           </div>
                           <span className="leading-snug">{f}</span>
                         </li>
                      ))}
                   </ul>

                   {/* Action Button */}
                   <div className="text-center mt-auto">
                     <Button 
                       // Invert button styles based on background
                       variant={isDark ? 'outline' : 'dark'} 
                       className={`w-full ${isDark ? 'border-white/20 text-white hover:bg-white hover:text-[#3a3a3a]' : ''}`}
                       onClick={() => setCurrentPage('Contact')}
                     >
                       Select Collection
                     </Button>
                   </div>
               </div>
             );
           })}
        </div>

        {/* --- BOTTOM NOTE --- */}
        {/* <div className="text-center mt-20">
          <p className="text-[#3a3a3a]/40 text-xs uppercase tracking-widest">
            Custom packages available for multi-day events. <button onClick={() => setCurrentPage('Contact')} className="text-[#B3907A] underline underline-offset-4 hover:text-[#3a3a3a] transition-colors">Contact us</button> for a quote.
          </p>
        </div> */}

      </div>
    </section>
  );
};

export default PricingSection;
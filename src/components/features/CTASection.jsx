import React from 'react';
import { ArrowRight, Instagram, Mail } from 'lucide-react';
import Button from '../ui/Button';

const CTASection = ({ setCurrentPage }) => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* --- MAIN CARD --- */}
        <div className="bg-[#F5F5EB] rounded-[2rem] p-12 md:p-24 relative overflow-hidden">
           
           {/* Decorative Background Element (Subtle) */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#B3907A] opacity-[0.05] rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

           <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-16">
              
              {/* --- LEFT: HEADLINE --- */}
              <div className="max-w-2xl">
                 <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[#3a3a3a]/50 text-[10px] font-bold uppercase tracking-[0.3em]">
                       Now Booking 2026
                    </span>
                 </div>
                 
                 <h2 className="font-serif text-5xl md:text-7xl text-[#3a3a3a] leading-[1.1] mb-8">
                    Ready to create something <br/>
                    <span className="text-[#B3907A] italic">unforgettable?</span>
                 </h2>

                 <p className="text-[#3a3a3a]/60 text-lg font-light max-w-md leading-relaxed">
                    We only take a limited number of weddings each year to ensure your story gets the attention it deserves.
                 </p>
              </div>

              {/* --- RIGHT: ACTIONS --- */}
              <div className="flex flex-col gap-6 w-full md:w-auto">
                 <Button 
                   variant="dark" 
                   onClick={() => setCurrentPage('Contact')}
                   className="!w-full md:!w-auto !py-5 !px-10 text-xs shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3"
                 >
                   Start Your Journey <ArrowRight size={16} />
                 </Button>

                 <div className="flex items-center justify-center md:justify-start gap-8 pt-4 border-t border-[#3a3a3a]/10">
                    <a href="#" className="flex items-center gap-2 text-[#3a3a3a]/40 hover:text-[#B3907A] transition-colors text-[10px] font-bold uppercase tracking-widest">
                       <Instagram size={14} /> Instagram
                    </a>
                    <a href="mailto:hello@beyond.lk" className="flex items-center gap-2 text-[#3a3a3a]/40 hover:text-[#B3907A] transition-colors text-[10px] font-bold uppercase tracking-widest">
                       <Mail size={14} /> Email
                    </a>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
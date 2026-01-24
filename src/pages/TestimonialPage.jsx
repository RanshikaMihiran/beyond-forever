import React, { useEffect } from 'react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import ParallaxHero from '../components/layout/ParallaxHero';
import CTASection from '../components/features/CTASection';

// --- SAMPLE DATA (Replace with real reviews) ---
const TESTIMONIALS = [
  {
    id: 1,
    couple: "Sarah & David",
    location: "Galle Fort, Sri Lanka",
    rating: 5,
    text: "We were absolutely blown away. The team didn't just take photos; they captured the feeling of the day. Every time we look at our album, we are transported back to that sunset.",
    image: "/images/hero/Image 1.jpg", // Use your real paths
    tag: "Wedding"
  },
  {
    id: 2,
    couple: "Amelia & James",
    location: "Ella, Sri Lanka",
    rating: 5,
    text: "Professional, kind, and incredibly talented. They made us feel so comfortable in front of the camera. The editorial shots look like they belong in Vogue!",
    image: "/images/hero/Image 2.jpg",
    tag: "Elopement"
  },
  {
    id: 3,
    couple: "Elena & Marco",
    location: "Mirissa Beach",
    rating: 5,
    text: "We flew in from Italy and were worried about finding the right photographer. Beyond & Forever exceeded all expectations. The communication was flawless.",
    image: "/images/hero/Image 3.jpg",
    tag: "Destination"
  },
  {
    id: 4,
    couple: "Priya & Raj",
    location: "Colombo",
    rating: 5,
    text: "The best investment we made for our wedding. The team captured moments we didn't even know happened. Truly magical work.",
    image: "/images/hero/Image 4.jpg",
    tag: "Wedding"
  },
  {
    id: 5,
    couple: "Chloe & Ben",
    location: "Kandy",
    rating: 5,
    text: "We wanted something candid and unposed, and they delivered exactly that. The photos feel so authentic and raw.",
    image: "/images/hero/Image 5.jpg",
    tag: "Couple Shoot"
  }
];

const PRESS_LOGOS = ["Vogue", "Brides", "Style Me Pretty", "Junebug Weddings"];

const TestimonialPage = ({ setCurrentPage }) => {
  
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white animate-fade-in font-sans selection:bg-[#B3907A] selection:text-white">

      {/* --- 1. HERO SECTION --- */}
      <ParallaxHero images={["/images/hero/Image 2.jpg"]} height="h-[50vh]">
        <div className="relative z-10 text-center px-4 mt-20">
          <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] block mb-4 animate-slide-up">
             Client Love
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-2xl animate-slide-up delay-100">
            Kind Words
          </h1>
          <p className="text-[#E1DACA] max-w-lg mx-auto text-sm md:text-base font-light leading-relaxed drop-shadow-md animate-slide-up delay-200">
            Real stories from couples who trusted us with their most precious memories.
          </p>
        </div>
      </ParallaxHero>

      {/* --- 2. PRESS / TRUST SECTION --- */}
      <div className="border-b border-[#1a1a1a]/5 bg-[#F5F5EB] py-12">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[#1a1a1a]/40 text-[10px] font-bold uppercase tracking-widest mb-8">
               Featured In
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale">
               {PRESS_LOGOS.map((logo, index) => (
                  <span key={index} className="font-serif text-2xl md:text-3xl text-[#1a1a1a]">
                     {logo}
                  </span>
               ))}
            </div>
         </div>
      </div>

      {/* --- 3. FEATURED REVIEW (The "Spotlight") --- */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
         <div className="bg-[#1a1a1a] text-white rounded-[4px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            {/* Image Side */}
            <div className="md:w-1/2 relative min-h-[400px]">
               <img 
                 src="/images/hero/Image 1.jpg" 
                 alt="Featured Couple" 
                 className="absolute inset-0 w-full h-full object-cover opacity-80"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-transparent to-transparent"></div>
            </div>

            {/* Content Side */}
            <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center relative">
               <Quote size={60} className="text-[#B3907A] opacity-20 absolute top-10 left-10" />
               
               <div className="relative z-10">
                  <div className="flex gap-1 mb-6 text-[#B3907A]">
                     {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#B3907A" />)}
                  </div>
                  
                  <blockquote className="font-serif text-2xl md:text-4xl leading-snug mb-8">
                     "It felt less like a photoshoot and more like hanging out with friends who happen to be world-class artists. The results left us speechless."
                  </blockquote>

                  <div>
                     <h4 className="text-[#B3907A] text-sm font-bold uppercase tracking-widest mb-1">
                        Sarah & Michael
                     </h4>
                     <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                        Destination Wedding, Galle
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- 4. MASONRY GRID OF REVIEWS --- */}
      <section className="pb-24 px-6 max-w-[1600px] mx-auto">
         <div className="text-center mb-16">
            <span className="w-12 h-[1px] bg-[#B3907A] inline-block mb-4"></span>
            <h2 className="font-serif text-4xl text-[#1a1a1a]">The Archive</h2>
         </div>

         <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {TESTIMONIALS.map((review) => (
               <div key={review.id} className="break-inside-avoid bg-[#F9F9F9] p-8 md:p-10 rounded-sm hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-[#B3907A]/10">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex gap-1 text-[#B3907A]">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="#B3907A" />)}
                     </div>
                     <span className="text-[#1a1a1a]/20 text-[10px] font-bold uppercase tracking-widest">
                        {review.tag}
                     </span>
                  </div>

                  {/* Text */}
                  <p className="text-[#1a1a1a]/70 font-light leading-relaxed mb-8 italic">
                     "{review.text}"
                  </p>

                  {/* Footer with Image */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[#1a1a1a]/5">
                     <img 
                       src={review.image} 
                       alt={review.couple} 
                       className="w-12 h-12 rounded-full object-cover border border-[#B3907A]/20"
                     />
                     <div>
                        <h4 className="text-[#1a1a1a] text-xs font-bold uppercase tracking-widest">
                           {review.couple}
                        </h4>
                        <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-widest">
                           {review.location}
                        </span>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Load More Button */}
         <div className="text-center mt-16">
            <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#B3907A] border-b border-[#1a1a1a]/20 pb-1 hover:border-[#B3907A] transition-all">
               Load More Stories <ArrowRight size={12} />
            </button>
         </div>
      </section>

      {/* --- 5. CTA SECTION --- */}
      <CTASection setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default TestimonialPage;
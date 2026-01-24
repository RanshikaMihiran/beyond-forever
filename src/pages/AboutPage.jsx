import React, { useEffect } from 'react';
import { Heart, Camera, Coffee, Sun, ArrowRight } from 'lucide-react';

// --- IMPORTS ---
import ParallaxHero from '../components/layout/ParallaxHero';
import CTASection from '../components/features/CTASection';
import TestimonialSection from '../components/features/TestimonialSection';
import { ABOUT_HERO_IMAGES } from '../data/constants';

const AboutPage = ({ setCurrentPage }) => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white animate-fade-in font-sans selection:bg-[#B3907A] selection:text-white">
      
      {/* --- 1. HERO SECTION --- */}
      <ParallaxHero images={ABOUT_HERO_IMAGES} height="h-[60vh]">
        <div className="relative z-10 text-center px-4 mt-20">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20">
             <Heart size={12} fill="#B3907A" className="text-[#B3907A]" />
             <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                Since 2020
             </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-2xl animate-slide-up">
            We are <span className="italic text-[#B3907A]">Storytellers</span>
          </h1>
          <p className="text-[#E1DACA] max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed drop-shadow-md animate-slide-up delay-200">
             Capturing the loud laughs, the quiet tears, and everything in between.
          </p>
        </div>
      </ParallaxHero>

      {/* --- 2. OUR STORY (Split Layout) --- */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
         <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Image Grid (Cute Collage) */}
            <div className="lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="/images/hero/Image 2.jpg" 
                    alt="Behind the scenes" 
                    className="w-full h-64 object-cover rounded-[2rem] rounded-tl-none shadow-lg transform translate-y-8"
                  />
                  <img 
                    src="/images/hero/Image 3.jpg" 
                    alt="Detail shot" 
                    className="w-full h-64 object-cover rounded-[2rem] rounded-br-none shadow-lg"
                  />
               </div>
               {/* Decorative Badge */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-full shadow-xl flex flex-col items-center justify-center w-32 h-32 text-center rotate-12 hover:rotate-0 transition-transform duration-500">
                  <span className="text-[#B3907A] font-serif text-3xl font-bold">5+</span>
                  <span className="text-[#1a1a1a]/60 text-[9px] font-bold uppercase tracking-widest">Years of Magic</span>
               </div>
            </div>

            {/* Text Content */}
            <div className="lg:w-1/2">
               <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
                  Who We Are
               </span>
               <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-8 leading-tight">
                  More than just <br/> photographers.
               </h2>
               <div className="space-y-6 text-[#1a1a1a]/70 font-light leading-loose text-lg">
                  <p>
                     Hi! We are <span className="font-bold text-[#1a1a1a]">Beyond & Forever</span>, a boutique studio based in the heart of Sri Lanka. 
                  </p>
                  <p>
                     We believe that your wedding photos shouldn't look like a stiff checklist. They should look like <i>art</i>. They should feel like a memory. We combine the candid nature of photojournalism with the polished elegance of editorial fashion.
                  </p>
                  <p>
                     Whether it's a barefoot elopement in Mirissa or a grand ballroom affair in Colombo, we are there to catch the moments you might miss.
                  </p>
               </div>
               
               <div className="mt-10">
                  <img 
                    src="/images/signature/sig.avif" 
                    alt="Signature" 
                    className="h-12 opacity-40 mb-4" 
                  />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#B3907A]">
                     Founders & Lead Creatives
                  </p>
               </div>
            </div>

         </div>
      </section>

      {/* --- 3. THE "VIBE" (Values Grid) --- */}
      <section className="bg-white py-24 px-6 border-y border-[#1a1a1a]/5">
         <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-4">
               The Beyond & Forever <span className="italic text-[#B3907A]">Vibe</span>
            </h2>
            <p className="text-[#1a1a1a]/50">What makes us tick?</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
               { icon: <Camera />, title: "Unposed", desc: "We hate stiff smiles. We capture the real you." },
               { icon: <Sun />, title: "Natural Light", desc: "Chasing sunsets and golden hours is our cardio." },
               { icon: <Heart />, title: "Emotion First", desc: "If it doesn't make you feel something, we delete it." },
               { icon: <Coffee />, title: "Coffee Fueled", desc: "Powered by caffeine and pure creative passion." },
            ].map((item, idx) => (
               <div key={idx} className="group p-8 rounded-[2rem] bg-[#F9F9F9] hover:bg-[#F5F5EB] transition-colors duration-500 text-center hover:-translate-y-2">
                  <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center text-[#B3907A] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     {item.icon}
                  </div>
                  <h3 className="font-serif text-xl text-[#1a1a1a] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">
                     {item.desc}
                  </p>
               </div>
            ))}
         </div>
      </section>

      {/* --- 4. TESTIMONIALS --- */}
      <TestimonialSection />

      {/* --- 5. CTA SECTION --- */}
      <CTASection setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default AboutPage;
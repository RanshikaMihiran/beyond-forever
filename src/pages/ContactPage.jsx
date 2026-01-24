import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Heart, Send, Sparkles } from 'lucide-react';
import ParallaxHero from '../components/layout/ParallaxHero';
import { CONTACT_HERO_IMAGES } from '../data/constants';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedService, setSelectedService] = useState('');
  const services = ["Wedding", "Elopement", "Couple", "Portrait", "Editorial"];

  return (
    <div className="min-h-screen bg-white animate-fade-in font-sans selection:bg-[#B3907A] selection:text-white">
      
      {/* --- 1. HERO SECTION --- */}
      <ParallaxHero images={CONTACT_HERO_IMAGES} height="h-[60vh]">
        <div className="relative z-10 text-center px-4 mt-20">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20">
             <Sparkles size={12} fill="#B3907A" className="text-[#B3907A]" />
             <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                Say Hello
             </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-2xl animate-slide-up">
            Let's Make <span className="italic text-[#B3907A]">Magic</span>
          </h1>
          <p className="text-[#E1DACA] max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed drop-shadow-md animate-slide-up delay-200">
             We accept a limited number of commissions per year to ensure every story gets the love it deserves.
          </p>
        </div>
      </ParallaxHero>

      {/* --- 2. MAIN CONTENT WRAPPER --- */}
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        
        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
           
           {/* LEFT: CONTACT INFO (Cute & Clean) */}
           <div className="lg:col-span-4 space-y-12">
              <div>
                 <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
                    The Studio
                 </span>
                 <h2 className="font-serif text-4xl text-[#1a1a1a] mb-6">
                    Get in touch.
                 </h2>
                 <p className="text-[#1a1a1a]/60 font-light leading-loose text-sm">
                    Have a question? Just want to say hi? We'd love to hear from you. Fill out the form or drop us an email directly.
                 </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                 
                 {/* Email Card */}
                 <a href="mailto:hello@beyond.lk" className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 group border border-[#1a1a1a]/5">
                    <div className="w-12 h-12 bg-[#F5F5EB] rounded-full flex items-center justify-center text-[#B3907A] group-hover:bg-[#B3907A] group-hover:text-white transition-colors">
                       <Mail size={20} />
                    </div>
                    <div>
                       <h5 className="font-bold text-[10px] uppercase tracking-widest text-[#B3907A] mb-1">Email Us</h5>
                       <p className="text-[#1a1a1a] font-serif text-lg">hello@beyond.lk</p>
                    </div>
                 </a>

                 {/* Phone Card */}
                 <a href="tel:+94771234567" className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 group border border-[#1a1a1a]/5">
                    <div className="w-12 h-12 bg-[#F5F5EB] rounded-full flex items-center justify-center text-[#B3907A] group-hover:bg-[#B3907A] group-hover:text-white transition-colors">
                       <Phone size={20} />
                    </div>
                    <div>
                       <h5 className="font-bold text-[10px] uppercase tracking-widest text-[#B3907A] mb-1">Call Us</h5>
                       <p className="text-[#1a1a1a] font-serif text-lg">+94 77 123 4567</p>
                    </div>
                 </a>

                 {/* Studio Card */}
                 <div className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-sm border border-[#1a1a1a]/5">
                    <div className="w-12 h-12 bg-[#F5F5EB] rounded-full flex items-center justify-center text-[#B3907A]">
                       <MapPin size={20} />
                    </div>
                    <div>
                       <h5 className="font-bold text-[10px] uppercase tracking-widest text-[#B3907A] mb-1">Visit Us</h5>
                       <p className="text-[#1a1a1a] font-serif text-lg">Colombo 03, Sri Lanka</p>
                    </div>
                 </div>

              </div>
           </div>

           {/* RIGHT: THE FORM (Editorial Style) */}
           <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden border border-[#1a1a1a]/5">
                 
                 {/* Decorative Background Icon */}
                 <Heart className="absolute -top-10 -right-10 text-[#B3907A]/5 w-64 h-64 rotate-12" />

                 <form className="relative z-10 space-y-12" onSubmit={e => e.preventDefault()}>
                    
                    {/* 1. Service Selection (Cute Pills) */}
                    <div>
                       <label className="block text-xs font-bold uppercase tracking-widest text-[#1a1a1a] mb-6">
                          I am interested in...
                       </label>
                       <div className="flex flex-wrap gap-3">
                          {services.map(service => (
                             <button
                                key={service}
                                type="button"
                                onClick={() => setSelectedService(service)}
                                className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full border ${
                                   selectedService === service 
                                   ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white shadow-lg scale-105' 
                                   : 'bg-white border-[#1a1a1a]/10 text-[#1a1a1a]/60 hover:border-[#B3907A] hover:text-[#B3907A]'
                                }`}
                             >
                                {service}
                             </button>
                          ))}
                       </div>
                    </div>

                    {/* 2. Text Inputs (Clean Lines) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="group">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2 group-focus-within:text-[#1a1a1a] transition-colors">Your Name</label>
                          <input type="text" required className="w-full bg-transparent border-b border-[#1a1a1a]/10 py-3 focus:border-[#B3907A] outline-none text-[#1a1a1a] font-serif text-xl placeholder:text-[#1a1a1a]/20 transition-all" placeholder="Jane Doe" />
                       </div>
                       <div className="group">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2 group-focus-within:text-[#1a1a1a] transition-colors">Email Address</label>
                          <input type="email" required className="w-full bg-transparent border-b border-[#1a1a1a]/10 py-3 focus:border-[#B3907A] outline-none text-[#1a1a1a] font-serif text-xl placeholder:text-[#1a1a1a]/20 transition-all" placeholder="jane@example.com" />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="group">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2 group-focus-within:text-[#1a1a1a] transition-colors">Event Date</label>
                          <input type="date" className="w-full bg-transparent border-b border-[#1a1a1a]/10 py-3 focus:border-[#B3907A] outline-none text-[#1a1a1a] font-serif text-lg text-[#1a1a1a]/60 transition-all" />
                       </div>
                       <div className="group">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2 group-focus-within:text-[#1a1a1a] transition-colors">Venue / Location</label>
                          <input type="text" className="w-full bg-transparent border-b border-[#1a1a1a]/10 py-3 focus:border-[#B3907A] outline-none text-[#1a1a1a] font-serif text-xl placeholder:text-[#1a1a1a]/20 transition-all" placeholder="e.g. Galle Fort" />
                       </div>
                    </div>

                    <div className="group">
                       <label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2 group-focus-within:text-[#1a1a1a] transition-colors">Tell us your story</label>
                       <textarea rows="4" className="w-full bg-[#F9F9F9] rounded-2xl border border-transparent p-6 focus:border-[#B3907A] outline-none text-[#1a1a1a] resize-none font-light leading-relaxed placeholder:text-[#1a1a1a]/30 transition-all" placeholder="How did you meet? What's the vibe of your big day? We want to know everything!"></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                       <button className="w-full md:w-auto px-10 py-4 bg-[#1a1a1a] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#B3907A] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1">
                          Send Message <Send size={14} />
                       </button>
                    </div>

                 </form>
              </div>
           </div>

        </div>

        {/* --- 3. FAQ SECTION (New) --- */}
        <div className="mt-32 border-t border-[#1a1a1a]/10 pt-20">
           <div className="text-center mb-16">
              <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-4">Common Questions</h3>
              <p className="text-[#1a1a1a]/50">Things our couples often ask us.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                 { q: "Do you travel?", a: "Absolutely! We love destination weddings. Our passports are ready." },
                 { q: "How many photos do we get?", a: "Typically 50-70 images per hour of coverage. Quality over quantity." },
                 { q: "What is your turnaround time?", a: "You'll get a sneak peek within 48 hours, and the full gallery in 6-8 weeks." },
              ].map((faq, idx) => (
                 <div key={idx} className="bg-white p-8 rounded-[2rem] text-center shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-serif text-xl text-[#1a1a1a] mb-3">{faq.q}</h4>
                    <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">{faq.a}</p>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
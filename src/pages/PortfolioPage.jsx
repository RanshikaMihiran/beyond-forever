import React, { useState, useMemo, useEffect } from 'react';
import { ArrowUpRight, Star, Quote, ArrowRight, X, Heart } from 'lucide-react';

// --- IMPORTS ---
// Ensure these paths match your project structure
import ParallaxHero from '../components/layout/ParallaxHero';
import CTASection from '../components/features/CTASection'; 
import TestimonialSection from '../components/features/TestimonialSection';
import { PORTFOLIO_HERO_IMAGES, PORTFOLIO_PROJECTS } from '../data/constants';

const PortfolioPage = ({ setCurrentPage }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- 1. STATES ---
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null); // Tracks open image

  // --- 2. FILTER LOGIC ---
  // Automatically extract unique categories from your data
  const categories = useMemo(() => {
    if (!PORTFOLIO_PROJECTS) return ['All'];
    const allCats = PORTFOLIO_PROJECTS.map(p => p.category);
    return ['All', ...new Set(allCats)];
  }, []);

  // Filter the projects based on selection
  const visibleProjects = useMemo(() => {
    if (!PORTFOLIO_PROJECTS) return [];
    if (activeFilter === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  // Helper to close modal
  const closeLightbox = () => setSelectedProject(null);

  return (
    <div className="min-h-screen bg-white animate-fade-in font-sans selection:bg-[#B3907A] selection:text-white">
      
      {/* --- 1. HERO SECTION --- */}
      <ParallaxHero images={PORTFOLIO_HERO_IMAGES} height="h-[60vh]">
        <div className="relative z-10 text-center px-4 mt-20">
          <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] block mb-4 animate-slide-up">
             The Collection
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-2xl animate-slide-up delay-100">
            Selected Works
          </h1>
          <p className="text-[#E1DACA] max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed drop-shadow-md animate-slide-up delay-200">
            A curation of love stories captured across the golden coasts and misty hills of Sri Lanka. 
          </p>
        </div>
      </ParallaxHero>

      {/* --- 2. FEATURED STORY (Story of the Month) --- */}
      <section className="py-24 px-6 bg-white border-b border-[#1a1a1a]/5">
        <div className="max-w-[1600px] mx-auto">
           <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3">
                 <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-[1px] bg-[#B3907A]"></span>
                    <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">
                       Story of the Month
                    </span>
                 </div>
                 <h2 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] mb-6 leading-tight">
                    Amelia <br/> <span className="italic text-[#B3907A]">&</span> James
                 </h2>
                 <p className="text-[#1a1a1a]/60 text-sm leading-relaxed mb-8 font-light">
                    An intimate coastal elopement at sunset. We focused on raw emotion, unscripted moments, and the golden light that hits the Galle Fort ramparts.
                 </p>
                 <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#B3907A] transition-colors">
                    View Case Study 
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                 </button>
              </div>

              <div className="lg:w-2/3 relative group cursor-pointer overflow-hidden rounded-sm">
                 <img 
                   src="/images/hero/Image 1.jpg" // Make sure this path exists
                   alt="Featured Wedding" 
                   className="w-full h-[500px] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
           </div>
        </div>
      </section>

      {/* --- 3. MAIN GALLERY CONTENT --- */}
      <main className="max-w-[1800px] mx-auto px-6 py-24">
        
        {/* Sticky Filter Header */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#1a1a1a]/10 pb-6 sticky top-20 z-30 bg-white/95 backdrop-blur-md transition-all pt-4">
          <div>
             <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">
                {activeFilter === 'All' ? 'Complete' : activeFilter} <span className="italic text-[#B3907A]">Archive</span>
             </h2>
             <p className="text-[#1a1a1a]/40 text-xs mt-2 font-bold uppercase tracking-widest">
                Showing {visibleProjects.length} Stories
             </p>
          </div>

          {/* Filter Tabs */}
          <nav className="flex flex-wrap gap-2 mt-6 md:mt-0">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveFilter(cat)}
                 className={`
                   px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border
                   ${activeFilter === cat 
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-lg transform -translate-y-1' 
                      : 'bg-transparent text-[#1a1a1a]/40 border-transparent hover:border-[#1a1a1a]/20 hover:text-[#1a1a1a]'}
                 `}
               >
                 {cat}
               </button>
             ))}
          </nav>
        </header>

        {/* Masonry Grid (Updated with Click Handler) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {visibleProjects.map((project) => (
            <article 
              key={project.id} 
              onClick={() => setSelectedProject(project)} // <--- TRIGGER OPEN LIGHTBOX
              className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              <div className="relative w-full overflow-hidden">
                 <img 
                   src={project.src} 
                   alt={`${project.title} - ${project.category} Photography`} 
                   loading="lazy"
                   width="800"
                   height="1200"
                   className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                 {/* Open Icon Indicator */}
                 <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 border border-white/30">
                    <ArrowUpRight className="text-white" size={20} />
                 </div>

                 <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    <span className="inline-block px-3 py-1 bg-[#B3907A] text-white text-[9px] font-bold uppercase tracking-widest mb-4 rounded-full">
                      {project.category}
                    </span>
                    <h3 className="text-white font-serif text-3xl md:text-4xl leading-none mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      Tap to Expand <Heart size={10} fill="currentColor" />
                    </p>
                 </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {visibleProjects.length === 0 && (
           <div className="text-center py-32 opacity-40">
              <p className="font-serif text-2xl text-[#1a1a1a]">No projects found.</p>
           </div>
        )}

      </main>

      {/* --- 4. LIGHTBOX MODAL --- */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={closeLightbox} // Click background to close
        >
          {/* Close Button - High Visibility */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-16 h-16 bg-white hover:bg-[#B3907A] rounded-full flex items-center justify-center text-black hover:text-white transition-all duration-300 z-50 shadow-2xl hover:scale-110 group border-4 border-white/10"
            aria-label="Close Lightbox"
          >
            <X size={32} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-7xl w-full max-h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Stop propagation
          >
            <img 
              src={selectedProject.src} 
              alt={selectedProject.title}
              className="max-h-[85vh] w-auto object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-scale-in"
            />
            
            {/* Caption Bar */}
            <div className="mt-6 flex items-center gap-6 animate-slide-up bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
               <div className="text-right">
                  <h2 className="font-serif text-2xl md:text-3xl text-white leading-none">
                    {selectedProject.title}
                  </h2>
                  <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">
                    {selectedProject.category}
                  </span>
               </div>
               <div className="w-px h-10 bg-white/20"></div>
               <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#B3907A] hover:bg-[#B3907A] hover:text-white transition-colors">
                  <Heart size={20} fill="currentColor" />
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 5. TESTIMONIALS & CTA --- */}
      <TestimonialSection />
      
      <CTASection setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default PortfolioPage;
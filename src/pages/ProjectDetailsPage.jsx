import React, { useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';

const ProjectDetailsPage = ({ project, setCurrentPage }) => {
  // Always load at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  // Safety fallback
  if (!project) {
    setCurrentPage('Home');
    return null;
  }

  // Use the project's specific gallery, or just show the main image if it's missing
  const imagesToDisplay = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.src];

  return (
    <div className="min-h-screen bg-[#F5F5EB] pt-32 pb-24 animate-fade-in font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* --- 1. TOP NAVIGATION --- */}
        <button 
          onClick={() => setCurrentPage('Home')}
          className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#B3907A] transition-colors mb-12"
        >
          <div className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center group-hover:border-[#B3907A] transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Home
        </button>

        {/* --- 2. EDITORIAL HEADER --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-16">
          <div className="md:col-span-8">
            <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
              {project.category} &mdash; {project.year}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#1a1a1a] leading-tight">
              {project.title}
            </h1>
          </div>
          <div className="md:col-span-4 pb-3">
            <p className="text-[#1a1a1a]/60 font-light leading-relaxed text-sm">
              Every love story is unique, but this one felt like pure magic. 
              From the quiet morning moments to the wild dancing under the stars, 
              here is a glimpse into their unforgettable day.
            </p>
          </div>
        </div>

        {/* --- 3. MAIN HERO IMAGE --- */}
        <div className="w-full h-[50vh] md:h-[80vh] rounded-[2rem] overflow-hidden mb-24 shadow-2xl">
          <img 
            src={project.src} 
            alt={project.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
          />
        </div>

        {/* --- 4. MASONRY GALLERY GRID --- */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <Heart className="mx-auto text-[#B3907A] mb-4 w-6 h-6 opacity-50" />
            <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">The Gallery</h3>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {imagesToDisplay.map((imgSrc, index) => {
              // Creating random heights for the masonry look
              const heights = ['h-[400px]', 'h-[600px]', 'h-[500px]', 'h-[700px]', 'h-[450px]', 'h-[550px]'];
              const randomHeight = heights[index % heights.length];

              return (
                <div key={index} className={`w-full ${randomHeight} rounded-2xl overflow-hidden group break-inside-avoid relative shadow-sm`}>
                  <img 
                    src={imgSrc} 
                    alt={`${project.title} gallery ${index}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- 5. BOTTOM CTA --- */}
        <div className="border-t border-[#1a1a1a]/10 pt-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-6">
            Loved this <span className="italic text-[#B3907A]">story?</span>
          </h2>
          <p className="text-[#1a1a1a]/60 mb-10 max-w-md mx-auto">
            Let's create something beautiful together. We are currently booking for the upcoming season.
          </p>
          <button 
            onClick={() => setCurrentPage('Contact')}
            className="px-10 py-4 bg-[#1a1a1a] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#B3907A] transition-all duration-300 shadow-xl hover:-translate-y-1"
          >
            Inquire Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetailsPage;
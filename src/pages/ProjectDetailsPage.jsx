import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../components/features/ImageShowcase';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const project = PORTFOLIO_ITEMS.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (!project) {
      navigate('/portfolio'); // Redirect if invalid URL
    }
  }, [project, navigate]);

  if (!project) return null;

  const imagesToDisplay = project.gallery?.length > 0 ? project.gallery : [project.src];

  const closeLightbox = useCallback((e) => {
    if (e) e.stopPropagation();
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % imagesToDisplay.length);
  }, [imagesToDisplay.length]);

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? imagesToDisplay.length - 1 : prev - 1));
  }, [imagesToDisplay.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [lightboxIndex, nextImage, prevImage, closeLightbox]);

  return (
    <div className="min-h-screen bg-[#F5F5EB] pt-32 pb-24 animate-fade-in font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* --- TOP NAVIGATION --- */}
        <button 
          onClick={() => navigate(-1)} // Goes back to whatever page they were just on
          className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#B3907A] transition-colors mb-12"
        >
          <div className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center group-hover:border-[#B3907A] transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Back
        </button>

        {/* --- EDITORIAL HEADER --- */}
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

        {/* --- MAIN HERO IMAGE --- */}
        <div className="w-full h-[50vh] md:h-[80vh] rounded-[2rem] overflow-hidden mb-24 shadow-2xl">
          <img 
            src={project.src} 
            alt={project.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
          />
        </div>

        {/* --- MASONRY GALLERY GRID --- */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <Heart className="mx-auto text-[#B3907A] mb-4 w-6 h-6 opacity-50" />
            <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">The Gallery</h3>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {imagesToDisplay.map((imgSrc, index) => {
              const heights = ['h-[400px]', 'h-[600px]', 'h-[500px]', 'h-[700px]', 'h-[450px]', 'h-[550px]'];
              const randomHeight = heights[index % heights.length];

              return (
                <div 
                  key={index} 
                  onClick={() => setLightboxIndex(index)}
                  className={`w-full ${randomHeight} rounded-2xl overflow-hidden group break-inside-avoid relative shadow-sm cursor-pointer`}
                >
                  <img 
                    src={imgSrc} 
                    alt={`${project.title} gallery ${index}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <Maximize2 className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="border-t border-[#1a1a1a]/10 pt-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-6">
            Loved this <span className="italic text-[#B3907A]">story?</span>
          </h2>
          <p className="text-[#1a1a1a]/60 mb-10 max-w-md mx-auto">
            Let's create something beautiful together. We are currently booking for the upcoming season.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-10 py-4 bg-[#1a1a1a] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#B3907A] transition-all duration-300 shadow-xl hover:-translate-y-1"
          >
            Inquire Now
          </button>
        </div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          
          <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl animate-bg-fade" onClick={closeLightbox}></div>

          <button onClick={closeLightbox} className="absolute top-6 right-6 md:top-8 md:right-8 z-[100000] group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:rotate-90 hover:scale-110 shadow-lg">
            <X size={24} strokeWidth={1.5} />
          </button>

          <button onClick={prevImage} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[100000] group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:scale-110 backdrop-blur-md shadow-lg">
            <ChevronLeft size={28} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button onClick={nextImage} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[100000] group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B3907A] hover:scale-110 backdrop-blur-md shadow-lg">
            <ChevronRight size={28} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="relative z-[99999] w-full h-full p-4 md:p-12 flex flex-col items-center justify-center pointer-events-none">
            <img key={lightboxIndex} src={imagesToDisplay[lightboxIndex]} alt={`${project.title} - Image ${lightboxIndex + 1}`} className="pointer-events-auto max-w-full max-h-[80vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm animate-scale-in select-none" onClick={(e) => e.stopPropagation()} />
            
            <div className="mt-6 md:mt-8 text-center animate-slide-up pointer-events-auto">
              <div className="flex items-center justify-center gap-4 opacity-70">
                <span className="h-px w-8 md:w-10 bg-white/30"></span>
                <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em]">
                  {lightboxIndex + 1} <span className="mx-1 text-white/40">/</span> {imagesToDisplay.length}
                </span>
                <span className="h-px w-8 md:w-10 bg-white/30"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bg-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-bg-fade { animation: bg-fade 0.3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
      `}</style>
    </div>
  );
};

export default ProjectDetailsPage;
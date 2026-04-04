import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Aperture, Camera, Heart, Users, MapPin, Coffee } from 'lucide-react';
import ParallaxHero from '../components/layout/ParallaxHero';
import Button from '../components/ui/Button';
import FallingMemories from '../components/features/FallingMemories';
import StatsSection from '../components/features/StatsSection'; 
import AestheticSection from '../components/features/AestheticSection';
import CinematicVideo from '../components/features/CinematicVideo';
import WeddingEvents from '../components/features/WeddingEvents';
import PricingSection from '../components/features/PricingSection';
import CTASection from '../components/features/CTASection';
import ImageShowcase from '../components/features/ImageShowcase';
import { HOME_HERO_IMAGES } from '../data/constants';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in w-full overflow-hidden bg-[#F5F5EB]">
      
     <ParallaxHero images={HOME_HERO_IMAGES}>
  <div className="text-center max-w-5xl mx-auto flex flex-col items-center justify-center w-full">
    
    {/* Badge: Scaled down slightly for mobile to save vertical space */}
    <div className="inline-flex items-center gap-2 md:gap-3 border border-white/20 bg-white/5 backdrop-blur-sm px-4 md:px-6 py-1.5 md:py-2 rounded-full mb-6 md:mb-8 mt-12 md:mt-0">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/90">Now Booking 2026</span>
    </div>
    
    {/* Title: Added responsive sizing and tighter line-height to prevent awkward gaps */}
    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-4 md:mb-8 leading-[1.1] md:leading-none drop-shadow-2xl tracking-tight px-2">
      Beyond <br className="block sm:hidden" /><span className="font-light italic text-[#B3907A]">&</span> Forever
    </h1>
    
    {/* Subtitle: Better padding and mobile-friendly font size */}
    <p className="text-[#E1DACA] text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-8">
      We capture the unscripted poetry of your life. <br className="hidden md:block"/>
      Sri Lanka's premier destination wedding & editorial studio.
    </p>
    
    {/* Buttons: Full width on mobile so they are easy to tap, inline on desktop */}
    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full sm:w-auto px-6 sm:px-0">
      <Button variant="primary" className="w-full sm:w-auto py-3 md:py-4" onClick={() => navigate('/portfolio')}>See The Stories</Button>
      <Button variant="outline" className="w-full sm:w-auto py-3 md:py-4" onClick={() => navigate('/contact')}>Enquire Now</Button>
    </div>
  </div>
  
  {/* Chevron: Hidden on very short mobile screens to avoid overlapping with the buttons */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce hidden sm:block">
      <ChevronDown size={28} />
  </div>
</ParallaxHero>

      <FallingMemories />
      <StatsSection />
      <AestheticSection />
      
      {/* ImageShowcase now handles its own navigation */}
      <ImageShowcase />

      <WeddingEvents />

      <CinematicVideo />

      <PricingSection />
      <CTASection />

    </div>
  );
};

export default HomePage;
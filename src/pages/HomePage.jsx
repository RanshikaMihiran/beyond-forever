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
        <div className="text-center max-w-5xl mx-auto mt-16">
          <div className="inline-flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full mb-8">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/90">Now Booking 2025</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-8 leading-none drop-shadow-2xl tracking-tight">
            Beyond <span className="font-light italic text-[#B3907A]">&</span> Forever
          </h1>
          <p className="text-[#E1DACA] text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md">
            We capture the unscripted poetry of your life. <br className="hidden md:block"/>
            Sri Lanka's premier destination wedding & editorial studio.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="primary" onClick={() => navigate('/portfolio')}>See The Stories</Button>
            <Button variant="outline" onClick={() => navigate('/contact')}>Enquire Now</Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
           <ChevronDown />
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
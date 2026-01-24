import React from 'react';
import { ChevronDown, Aperture, Camera, Heart, Users, MapPin, Coffee, Check } from 'lucide-react';
import ParallaxHero from '../components/layout/ParallaxHero';
import Button from '../components/ui/Button';
import FallingMemories from '../components/features/FallingMemories';
import StatsSection from '../components/features/StatsSection'; 
import AestheticSection from '../components/features/AestheticSection';
import PricingSection from '../components/features/PricingSection';
import CTASection from '../components/features/CTASection';
import ImageShowcase from '../components/features/ImageShowcase';
import { HOME_HERO_IMAGES, DESTINATIONS  } from '../data/constants';

// Data specifically for this page that involves Icons (kept here for easier JSX handling)
const AESTHETIC = [
  { title: "Editorial", desc: "Magazine-worthy poses with perfect lighting.", icon: <Aperture className="w-8 h-8"/> },
  { title: "Candid", desc: "Unscripted moments of pure emotion.", icon: <Camera className="w-8 h-8"/> },
  { title: "Timeless", desc: "Editing that never goes out of style.", icon: <Heart className="w-8 h-8"/> }
];

const STATS = [
  { label: "Weddings Captured", value: "150+", icon: <Camera /> },
  { label: "Happy Couples", value: "300+", icon: <Users /> },
  { label: "Destinations", value: "25+", icon: <MapPin /> },
  { label: "Coffees Consumed", value: "Infinite", icon: <Coffee /> },
];

const PACKAGES = [
  { title: "Elopement", price: "$1,500", features: ["4 Hours Coverage", "1 Photographer", "Online Gallery", "50 Retouched Photos"] },
  { title: "Full Wedding", price: "$2,800", features: ["10 Hours Coverage", "2 Photographers", "Online Gallery", "Printed Album", "Drone Shots"], popular: true },
  { title: "Destination", price: "$4,500", features: ["Multi-Day Coverage", "Pre-Wedding Shoot", "Cinema Film", "Luxury Album", "Travel Included"] }
];

const HomePage = ({ setCurrentPage }) => {
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
            <Button variant="primary" onClick={() => setCurrentPage('Portfolio')}>See The Stories</Button>
            <Button variant="outline" onClick={() => setCurrentPage('Contact')}>Enquire Now</Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
           <ChevronDown />
        </div>


      </ParallaxHero>

    

      <FallingMemories />

      <StatsSection />

      {/* <section className="py-20 bg-[#3a3a3a] text-[#F5F5EB]">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                 <div className="text-[#B3907A] mb-4 opacity-80">{stat.icon}</div>
                 <span className="font-serif text-4xl md:text-5xl mb-2">{stat.value}</span>
                 <span className="text-xs uppercase tracking-widest opacity-50">{stat.label}</span>
              </div>
            ))}
         </div>
      </section> */}

      <AestheticSection />

      <ImageShowcase setCurrentPage={setCurrentPage} />

      

      <PricingSection/>

      
      <CTASection/>

    </div>
  );
};

export default HomePage;
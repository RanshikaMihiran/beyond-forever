import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// --- NAVBAR ---
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ['Home', 'About', 'Portfolio', 'Contact'];

  // Handle Scroll logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  // --- LIQUID GLASS STYLES ---
  
  // Scrolled: High blur, saturation, semi-transparent white, subtle border
  // Top: Completely transparent
  const navGlassStyle = scrolled 
    ? 'bg-[#F5F5EB]/60 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-white/40 py-4' 
    : 'bg-transparent py-8';

  const textColor = scrolled || menuOpen ? 'text-[#3a3a3a]' : 'text-white';
  const logoColor = scrolled || menuOpen ? 'text-[#B3907A]' : 'text-[#EFE7DA]';
  
  // Button morphs from glass outline to solid/dark outline
  const btnBorder = scrolled 
    ? 'border-[#3a3a3a] text-[#3a3a3a] hover:bg-[#3a3a3a] hover:text-white' 
    : 'border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#3a3a3a]';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${navGlassStyle}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="cursor-pointer z-50 group" onClick={() => { setCurrentPage('Home'); setMenuOpen(false); }}>
            <h1 className={`font-serif text-2xl font-bold tracking-wider transition-colors duration-500 ${textColor}`}>
              B&F <span className={`font-sans font-light text-xs tracking-[0.3em] ml-1 transition-colors duration-500 ${logoColor}`}>STUDIO</span>
            </h1>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setCurrentPage(link)}
                className={`relative px-5 py-2 group transition-all duration-500 rounded-full outline-none focus:outline-none`}
              >
                {/* Active/Hover State: Subtle "Wet" Highlight */}
                <span className={`absolute inset-0 rounded-full transition-all duration-500 
                  ${currentPage === link 
                    ? 'bg-[#B3907A]/10 shadow-[inset_0_0_10px_rgba(179,144,122,0.2)]' // Soft inner glow when active
                    : 'bg-transparent group-hover:bg-white/20' // Subtle glass sheen on hover
                  }`}>
                </span>
                
                <span className={`relative z-10 text-xs font-bold uppercase tracking-widest transition-colors duration-300 
                  ${currentPage === link ? 'text-[#B3907A]' : `${textColor} group-hover:text-[#B3907A]`}`}>
                  {link}
                </span>
              </button>
            ))}
            
            <button 
              onClick={() => setCurrentPage('Contact')}
              className={`outline-none focus:outline-none px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-500 hover:shadow-lg ${btnBorder}`}
            >
              Book Now
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className={`md:hidden z-50 bg-transparent outline-none focus:outline-none transition-colors duration-300 ${menuOpen ? 'text-[#3a3a3a]' : textColor}`}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      
      {/* MOBILE MENU (Also Liquid Glass) */}
      <div className={`fixed inset-0 z-40 bg-[#F5F5EB]/80 backdrop-blur-3xl backdrop-saturate-150 flex flex-col justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] 
        ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="flex flex-col space-y-8 text-center">
          {navLinks.map((link) => (
            <button key={link} onClick={() => { setCurrentPage(link); setMenuOpen(false); }} className="bg-transparent outline-none focus:outline-none font-serif text-4xl text-[#3a3a3a] hover:text-[#B3907A] hover:italic transition-all duration-300">
              {link}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
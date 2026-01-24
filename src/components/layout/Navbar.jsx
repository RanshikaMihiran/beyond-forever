import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navLinks = ['Home', 'About', 'Portfolio', 'Testimonials', 'Contact'];

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  // --- DYNAMIC LOGIC ---
  
  // 1. Determine if we need "Dark Mode" styles for the navbar
  // We switch to dark text if:
  // A) The user has scrolled down OR
  // B) The mobile menu is currently OPEN (so we can see it against the beige background)
  const isDarkState = scrolled || menuOpen;

  // 2. Colors based on state
  const textColor = isDarkState ? 'text-[#3a3a3a]' : 'text-white';
  const logoAccent = isDarkState ? 'text-[#B3907A]' : 'text-[#EFE7DA]';
  const hoverColor = isDarkState ? 'group-hover:text-[#B3907A]' : 'group-hover:text-white/80';
  
  // 3. Background Logic
  // IMPORTANT: If menu is open, force background to solid beige immediately
  const navbarBackground = isDarkState 
    ? 'bg-[#F5F5EB]/95 backdrop-blur-md shadow-sm border-b border-[#3a3a3a]/5' 
    : 'bg-transparent';

  // 4. Button Border Logic
  const btnBorder = isDarkState
    ? 'border-[#3a3a3a] text-[#3a3a3a] hover:bg-[#3a3a3a] hover:text-white' 
    : 'border-white/40 text-white hover:bg-white hover:text-[#3a3a3a]';

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out py-4
          ${navbarBackground}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <button 
            className="cursor-pointer z-[100] group focus:outline-none !bg-transparent border-none p-0 relative" 
            onClick={() => { setCurrentPage('Home'); setMenuOpen(false); }}
          >
            <h1 className={`font-serif text-2xl font-bold tracking-wide transition-colors duration-300 ${textColor}`}>
              B&F <span className={`font-sans font-light text-[10px] tracking-[0.3em] ml-1 transition-colors duration-300 ${logoAccent}`}>STUDIO</span>
            </h1>
          </button>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link;
              return (
                <button
                  key={link}
                  onClick={() => setCurrentPage(link)}
                  className="relative px-5 py-2 group focus:outline-none !bg-transparent border-none"
                >
                  <span className={`
                    absolute inset-0 rounded-full transition-all duration-500 ease-out
                    ${isActive 
                      ? 'bg-[#B3907A] opacity-100 scale-100' 
                      : 'bg-white/10 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                    }
                  `}></span>

                  <span className={`
                    relative z-10 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300
                    ${isActive ? 'text-white' : `${textColor} ${hoverColor}`}
                  `}>
                    {link}
                  </span>
                </button>
              );
            })}

            <div className="pl-6">
              <button 
                onClick={() => setCurrentPage('Contact')}
                className={`
                  !bg-transparent px-7 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-500 rounded-sm
                  ${btnBorder}
                `}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          {/* Ensure z-index is highest and text color updates immediately */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className={`
              md:hidden relative z-[100] p-2 focus:outline-none !bg-transparent border-none transition-colors duration-300
              ${textColor} 
            `}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      
      {/* --- MOBILE MENU OVERLAY --- */}
      <div 
        className={`
          fixed inset-0 h-[100vh] bg-[#F5F5EB] z-[90] flex flex-col justify-center items-center 
          transition-all duration-500 ease-in-out
          ${menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-5'}
        `}
      >
        <div className="flex flex-col space-y-8 text-center">
          {navLinks.map((link, idx) => (
            <button 
              key={link} 
              onClick={() => { setCurrentPage(link); setMenuOpen(false); }} 
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`
                !bg-transparent border-none font-serif text-4xl transition-all duration-500 transform
                ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                ${currentPage === link ? 'text-[#B3907A] italic' : 'text-[#3a3a3a] hover:text-[#B3907A]'}
              `}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
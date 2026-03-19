import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // React Router hooks
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Handle scroll effect for a transparent-to-solid navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'bg-[#F5F5EB] py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className={`font-serif text-2xl tracking-widest transition-colors ${isScrolled || mobileMenuOpen ? 'text-[#3a3a3a]' : 'text-white drop-shadow-md'}`}
        >
          BEYOND <span className="italic text-[#B3907A]">&</span> FOREVER
        </Link>

        {/* --- DESKTOP LINKS --- */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2.5 rounded-[2rem] text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive 
                    ? (isScrolled ? 'bg-[#3a3a3a]/5 text-[#B3907A]' : 'bg-white/20 text-white border border-white/20 backdrop-blur-sm') 
                    : (isScrolled ? 'text-[#3a3a3a] hover:bg-[#3a3a3a]/5' : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm')
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          
          {/* INQUIRE BUTTON */}
          <button 
            onClick={() => navigate('/contact')}
            className={`ml-4 px-6 py-2.5 rounded-[2rem] border text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              isScrolled 
                ? 'border-[#3a3a3a] bg-transparent text-[#3a3a3a] hover:bg-[#3a3a3a] hover:text-[#F5F5EB]' 
                : 'border-white bg-white text-[#3a3a3a] hover:bg-white/90 shadow-lg'
            }`}
          >
            Inquire
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className={`md:hidden outline-none transition-colors ${isScrolled || mobileMenuOpen ? 'text-[#3a3a3a]' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#F5F5EB] shadow-2xl transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] py-8 border-t border-[#E1DACA]' : 'max-h-0 py-0'}`}>
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)} // Closes menu when clicked
              className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${
                currentPath === link.path ? 'text-[#B3907A]' : 'text-[#3a3a3a] hover:text-[#B3907A]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 w-full px-8">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
              className="w-full py-4 rounded-full bg-[#3a3a3a] text-[#F5F5EB] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B3907A] transition-colors shadow-md"
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';

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
    { name: 'Testimonials', path: '/testimonials' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'bg-white py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link 
          to="/" 
          className={`font-serif text-2xl tracking-widest transition-colors ${isScrolled || mobileMenuOpen ? 'text-[#1a1a1a]' : 'text-white drop-shadow-md'}`}
        >
          BEYOND <span className="italic text-[#B3907A]">&</span> FOREVER
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#B3907A] ${
                currentPath === link.path 
                  ? 'text-[#B3907A]' 
                  : (isScrolled ? 'text-[#1a1a1a]' : 'text-white drop-shadow-md')
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            variant={isScrolled ? "primary" : "outline"} 
            onClick={() => navigate('/contact')}
          >
            Inquire Now
          </Button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className={`md:hidden ${isScrolled || mobileMenuOpen ? 'text-[#1a1a1a]' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] py-6' : 'max-h-0 py-0'}`}>
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)} // Close menu on click
              className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${
                currentPath === link.path ? 'text-[#B3907A]' : 'text-[#1a1a1a]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 w-full px-6">
            <Button 
              variant="primary" 
              className="w-full justify-center" 
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
            >
              Inquire Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
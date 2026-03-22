import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12 border-t border-[#B3907A]/20 font-sans selection:bg-[#B3907A] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        
        {/* BRAND & SOCIALS */}
        <div className="col-span-1 md:col-span-2 pr-10">
          {/* INCREASED LOGO SIZE: Bumped up to h-28 for mobile and h-40 for desktop */}
          <img 
            src="https://ik.imagekit.io/vaibbbrnqt/beyond-forever/logo/Pi7_beyond-foreve-logo-final-removebg-preview.png" 
            alt="Beyond & Forever Logo" 
            className="h-28 md:h-40 w-auto object-contain mb-8" 
          />
          <p className="text-[#E1DACA] text-sm leading-loose font-light mb-8 max-w-md">
            Sri Lanka's premier destination wedding & editorial studio.
          </p>
          <div className="flex space-x-6 text-white">
            <Instagram className="hover:text-[#B3907A] cursor-pointer transition-colors duration-300" />
            <Facebook className="hover:text-[#B3907A] cursor-pointer transition-colors duration-300" />
            <Mail className="hover:text-[#B3907A] cursor-pointer transition-colors duration-300" />
          </div>
        </div>

        {/* EXPLORE MENU */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#B3907A] mb-8">Explore</h4>
          <ul className="space-y-4 text-sm">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className="block w-fit bg-transparent text-[#E1DACA] hover:text-[#B3907A] transition-all duration-300 hover:translate-x-2 cursor-pointer outline-none ring-0 border-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#B3907A] mb-8">Contact</h4>
          <ul className="space-y-4 text-sm text-[#E1DACA]">
            <li className="flex items-center gap-3"><MapPin size={14}/> Colombo 03, Sri Lanka</li>
            <li className="flex items-center gap-3"><Phone size={14}/> +94 77 123 4567</li>
            <li className="flex items-center gap-3"><Mail size={14}/> hello@beyond.lk</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-10 text-center text-xs uppercase tracking-widest text-white/30">
        <p>© {new Date().getFullYear()} Beyond & Forever.</p> 
      </div>
    </footer>
  );
};

export default Footer;
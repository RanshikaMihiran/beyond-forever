import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, Instagram, Facebook, Mail, Phone, MapPin, X, Menu, 
  ArrowRight, ChevronDown, Check, Play, Aperture, Heart, Users, Coffee, Calendar,
  MessageCircle, Send, ExternalLink, ChevronLeft, ChevronRight, ZoomIn
} from 'lucide-react';

/* ========================================
   DATA: IMAGE COLLECTIONS
   ======================================== */

const HOME_HERO_IMAGES = [
  "/images/hero/Image 1.jpg",
  "/images/hero/Image 2.jpg",
  "/images/hero/Image 3.jpg",
  "/images/hero/Image 4.jpg",
  "/images/hero/Image 5.jpg"
];

const ABOUT_HERO_IMAGES = [
  "/images/hero/Image 1.jpg",
  "/images/hero/Image 2.jpg",
  "/images/hero/Image 3.jpg"
];

const PORTFOLIO_HERO_IMAGES = [
  "/images/hero/Image 1.jpg",
  "/images/hero/Image 2.jpg",
  "/images/hero/Image 3.jpg"
];

const CONTACT_HERO_IMAGES = [
  "/images/hero/Image 1.jpg",
  "/images/hero/Image 2.jpg",
  "/images/hero/Image 3.jpg"
];

// Main Portfolio Grid (Used for Home Page Masonry too)
const PORTFOLIO_PROJECTS = [
  { id: 1, title: "Beach Wedding", category: "Wedding", src: "/images/portfolio/Image 1.jpg" },
  { id: 2, title: "Kandy Portrait", category: "Portrait", src: "/images/portfolio/Image 2.jpg" },
  { id: 3, title: "Fashion Shoot", category: "Fashion", src: "/images/portfolio/Image 3.jpg" },
  { id: 4, title: "Sunset Couple", category: "Wedding", src: "/images/portfolio/Image 4.jpg" },
  { id: 5, title: "Studio Session", category: "Portrait", src: "/images/portfolio/Image 5.jpg" },
  { id: 6, title: "Traditional", category: "Event",    src: "/images/portfolio/Image 6.jpg" },
];

const FALLING_GALLERY = [
  { src: "/images/portfolio/Image 1.jpg", label: "The Beginning" },
  { src: "/images/portfolio/Image 2.jpg", label: "Pure Joy" },
  { src: "/images/portfolio/Image 3.jpg", label: "Details" },
  { src: "/images/portfolio/Image 4.jpg", label: "Forever" },
  { src: "/images/portfolio/Image 5.jpg", label: "Quiet Moments" },
  { src: "/images/portfolio/Image 6.jpg", label: "Celebration" },
  { src: "/images/portfolio/Image 1.jpg", label: "Us" },
  { src: "/images/portfolio/Image 3.jpg", label: "Laughter" },
  { src: "/images/portfolio/Image 2.jpg", label: "Memories" },
  { src: "/images/portfolio/Image 4.jpg", label: "Love" },
];

/* ========================================
   DATA: CONTENT SECTIONS
   ======================================== */

const DESTINATIONS = [
  { id: 1, place: "Galle Fort", desc: "Colonial charm meets ocean sunsets.", img: "/images/destinations/Image 1.jpg" },
  { id: 2, place: "Hill Country", desc: "Misty tea gardens and waterfalls.", img: "/images/destinations/Image 2.jpg" },
  { id: 3, place: "South Coast", desc: "Golden beaches and coconut groves.", img: "/images/destinations/Image 3.jpg" }
];

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

/* ========================================
   UI COMPONENTS
   ======================================== */

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyle = "px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ease-out transform hover:-translate-y-1 shadow-lg backdrop-blur-sm inline-flex items-center justify-center gap-2 border outline-none focus:outline-none";
  const variants = {
    primary: "bg-[#B3907A]/90 text-white border-transparent hover:bg-[#3a3a3a] hover:shadow-xl", 
    outline: "bg-transparent border-white text-white hover:bg-white hover:text-[#3a3a3a]",
    dark: "bg-[#3a3a3a] text-white border-[#3a3a3a] hover:bg-[#B3907A] hover:border-[#B3907A]"
  };
  return <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</button>;
};

// --- LIGHTBOX COMPONENT (For Full Screen Image View) ---
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-fade-in">
      
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-transparent border-none cursor-pointer">
        <X size={40} strokeWidth={1} />
      </button>

      {/* Navigation Left */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-4">
        <ChevronLeft size={60} strokeWidth={0.5} />
      </button>

      {/* Main Image */}
      <div className="relative max-w-[90vw] max-h-[85vh]">
        <img 
          src={images[currentIndex].src} 
          alt={images[currentIndex].title} 
          className="max-w-full max-h-[85vh] object-contain shadow-2xl"
        />
        <div className="absolute bottom-[-50px] left-0 w-full text-center">
          <h3 className="text-white font-serif text-2xl tracking-wide">{images[currentIndex].title}</h3>
          <p className="text-[#B3907A] text-xs uppercase tracking-widest mt-1">{images[currentIndex].category}</p>
        </div>
      </div>

      {/* Navigation Right */}
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-4">
        <ChevronRight size={60} strokeWidth={0.5} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 text-white/30 font-serif italic text-lg">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// --- PARALLAX HERO WITH KEN BURNS ZOOM ---
const ParallaxHero = ({ images, children, height = "h-screen" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className={`relative ${height} w-full flex items-center justify-center overflow-hidden`}>
      {images.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-[6000ms] ease-in-out transform ${
            index === currentIndex ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          }`}
          style={{ backgroundImage: `url('${img}')` }} 
        ></div>
      ))}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="relative z-20 w-full px-6">
        {children}
      </div>
    </header>
  );
};

// --- FALLING MEMORIES ---
const FallingMemories = () => {
  const items = [...FALLING_GALLERY, ...FALLING_GALLERY]; 

  return (
    <section className="relative h-[100vh] bg-[#EFE7DA] overflow-hidden flex items-center justify-center">
      <div className="absolute z-0 text-center pointer-events-none select-none">
        <h2 className="font-serif text-6xl md:text-9xl text-[#3a3a3a] opacity-[0.03] uppercase tracking-[0.5em] leading-tight">
          Captured<br/>In Time
        </h2>
      </div>

      <div className="absolute inset-0 pointer-events-none z-10">
        {items.map((item, index) => {
          const left = Math.floor(Math.random() * 100);
          const duration = 15 + Math.random() * 20; 
          const delay = -(Math.random() * 30); 
          const scale = 0.6 + Math.random() * 0.5;
          const blurClass = scale < 0.8 ? 'blur-[1px] opacity-60' : 'opacity-90';

          return (
            <div 
              key={index}
              className={`absolute top-[-300px] w-48 md:w-64 bg-white p-3 md:p-4 shadow-2xl transform will-change-transform ${blurClass}`}
              style={{
                left: `${left}%`,
                animation: `fall-sway ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
                transform: `scale(${scale})`
              }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 relative">
                <img src={item.src} alt="Memory" className="w-full h-full object-cover grayscale-[30%] contrast-110" />
                <div className="absolute inset-0 bg-[#3a3a3a]/5 mix-blend-multiply"></div> 
              </div>
              <div className="text-center">
                <p className="font-serif text-[#3a3a3a] text-xs md:text-sm italic tracking-widest opacity-70" 
                   style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}>
                   {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fall-sway {
          0% { transform: translateY(-300px) rotate(-5deg) translateX(-20px) scale(var(--tw-scale-x)); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(50vh) rotate(5deg) translateX(20px) scale(var(--tw-scale-x)); }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(-5deg) translateX(-20px) scale(var(--tw-scale-x)); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

// --- NAVBAR ---
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ['Home', 'About', 'Portfolio', 'Contact'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = scrolled ? 'text-[#3a3a3a]' : 'text-white';
  const logoColor = scrolled ? 'text-[#B3907A]' : 'text-[#EFE7DA]';
  const btnBorder = scrolled ? 'border-[#3a3a3a] text-[#3a3a3a]' : 'border-white/50 text-white';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#F5F5EB]/90 backdrop-blur-md shadow-sm py-4 border-b border-[#3a3a3a]/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer z-50 group" onClick={() => setCurrentPage('Home')}>
            <h1 className={`font-serif text-2xl font-bold tracking-wider transition-colors ${textColor}`}>
              B&F <span className={`font-sans font-light text-xs tracking-[0.3em] ml-1 transition-colors ${logoColor}`}>STUDIO</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setCurrentPage(link)}
                className={`bg-transparent outline-none focus:outline-none relative px-5 py-2 group transition-all duration-500 rounded-full`}
              >
                <span className={`absolute inset-0 bg-[#B3907A] transition-all duration-500 rounded-full 
                  ${currentPage === link ? 'opacity-10 scale-100' : 'opacity-0 scale-90 group-hover:opacity-20 group-hover:scale-100'}`}>
                </span>
                <span className={`relative z-10 text-xs font-bold uppercase tracking-widest transition-colors duration-300 
                  ${currentPage === link ? 'text-[#B3907A]' : `${textColor} group-hover:text-[#B3907A]`}`}>
                  {link}
                </span>
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage('Contact')}
              className={`bg-transparent outline-none focus:outline-none px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-500 hover:bg-[#B3907A] hover:border-[#B3907A] hover:text-white hover:shadow-lg ${btnBorder}`}
            >
              Book Now
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden z-50 bg-transparent outline-none focus:outline-none transition-colors ${menuOpen ? 'text-[#3a3a3a]' : textColor}`}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      
      {menuOpen && (
        <div className={`fixed inset-0 bg-[#F5F5EB] z-40 flex flex-col justify-center items-center animate-fade-in`}>
          <div className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <button key={link} onClick={() => { setCurrentPage(link); setMenuOpen(false); }} className="bg-transparent outline-none focus:outline-none font-serif text-4xl text-[#3a3a3a] hover:text-[#B3907A] hover:italic transition-all duration-300">
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const Footer = ({ setCurrentPage }) => (
  <footer className="bg-[#1a1a1a] text-white pt-24 pb-12 border-t border-[#B3907A]/20">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
      <div className="col-span-1 md:col-span-2 pr-10">
        <h2 className="font-serif text-4xl mb-6 text-white">Beyond & Forever</h2>
        <p className="text-[#E1DACA] text-sm leading-loose font-light mb-8 max-w-md">
          Sri Lanka's premier destination wedding & editorial studio.
        </p>
        <div className="flex space-x-6 text-white">
          <Instagram className="hover:text-[#B3907A] cursor-pointer" /><Facebook className="hover:text-[#B3907A] cursor-pointer" /><Mail className="hover:text-[#B3907A] cursor-pointer" />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-xs uppercase tracking-widest text-[#B3907A] mb-8">Explore</h4>
        <ul className="space-y-4 text-sm text-[#E1DACA]">
          {['Home', 'About', 'Portfolio', 'Contact'].map(link => (
            <li key={link}><button onClick={() => setCurrentPage(link)} className="bg-transparent hover:text-[#B3907A] transition-colors">{link}</button></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-xs uppercase tracking-widest text-[#B3907A] mb-8">Contact</h4>
        <ul className="space-y-4 text-sm text-[#E1DACA]">
          <li className="flex items-center gap-3"><MapPin size={14}/> Colombo 03, Sri Lanka</li>
          <li className="flex items-center gap-3"><Phone size={14}/> +94 77 123 4567</li>
          <li className="flex items-center gap-3"><Mail size={14}/> hello@beyond.lk</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/5 pt-10 text-center text-xs uppercase tracking-widest text-white/30"><p>© 2025 Beyond & Forever.</p></div>
  </footer>
);

/* ========================================
   CHATBOT COMPONENT
   ======================================== */
const ChatWidget = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 Welcome to Beyond & Forever. How can we help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessages = [...messages, { text: inputText, sender: 'user' }];
    setMessages(newMessages);
    setInputText("");

    setTimeout(() => {
      let botReply = "Thank you for your message. One of our team members will be with you shortly.";
      let actionButton = null;
      const lowerInput = inputText.toLowerCase();

      if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("package")) {
        botReply = "Our packages start from $1,500. You can view full investment details on our Home page.";
        actionButton = { label: "View Pricing", page: "Home" }; 
      } else if (lowerInput.includes("book") || lowerInput.includes("date") || lowerInput.includes("contact")) {
        botReply = "We'd love to capture your day! Please fill out the form on our Contact page to check availability.";
        actionButton = { label: "Go to Contact", page: "Contact" };
      } else if (lowerInput.includes("photo") || lowerInput.includes("work") || lowerInput.includes("gallery") || lowerInput.includes("portfolio")) {
        botReply = "You can explore our curated galleries and latest projects in our Portfolio.";
        actionButton = { label: "View Portfolio", page: "Portfolio" };
      } else if (lowerInput.includes("service") || lowerInput.includes("offer")) {
        botReply = "We offer Wedding, Elopement, Portrait, Fashion, and Event photography. Check out our Home page for details.";
        actionButton = { label: "View Services", page: "Home" };
      }

      setMessages(prev => [...prev, { text: botReply, sender: 'bot', action: actionButton }]);
    }, 800);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setIsOpen(false); 
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white/90 backdrop-blur-xl border border-[#B3907A]/20 shadow-2xl rounded-lg overflow-hidden flex flex-col animate-fade-in origin-bottom-right transition-all duration-300">
          <div className="bg-[#3a3a3a] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-bold uppercase tracking-widest">Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-transparent outline-none border-none text-white/50 hover:text-white transition-colors cursor-pointer p-1">
              <X size={18}/>
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#F5F5EB]/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] p-3 text-sm rounded-lg shadow-sm ${
                  msg.sender === 'user' ? 'bg-[#B3907A] text-white rounded-br-none' : 'bg-white text-[#3a3a3a] border border-[#3a3a3a]/5 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
                {msg.action && (
                  <button onClick={() => handleNavigate(msg.action.page)} className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#B3907A] hover:underline bg-white px-3 py-1 rounded-full shadow-sm border border-[#B3907A]/20 transition-transform hover:scale-105 cursor-pointer">
                    {msg.action.label} <ExternalLink size={10} />
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white border-t border-[#3a3a3a]/5 flex gap-2 items-center">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Type a message..." className="flex-1 bg-[#F5F5EB] rounded-full px-4 py-2 text-sm text-[#3a3a3a] focus:outline-none focus:ring-1 focus:ring-[#B3907A]" />
            <button onClick={handleSend} className="w-10 h-10 bg-[#3a3a3a] rounded-full flex items-center justify-center hover:bg-[#B3907A] transition-colors shadow-md outline-none border-none cursor-pointer">
              <Send color="white" size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-[#B3907A] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#3a3a3a] transition-all duration-300 hover:scale-110 group outline-none border-none cursor-pointer">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:animate-bounce" />}
      </button>
    </div>
  );
};

/* ========================================
   PAGES
   ======================================== */

const HomePage = ({ setCurrentPage }) => {
  // Lightbox StatePAGES (HOME, ABOUT, PORTFOLIO, CONTACT)
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxIndex(null);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % PORTFOLIO_PROJECTS.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length);
  };

  return (
    <div className="animate-fade-in w-full overflow-hidden bg-[#F5F5EB]">
      
      {/* LIGHTBOX OVERLAY */}
      {isLightboxOpen && (
        <Lightbox 
          images={PORTFOLIO_PROJECTS} 
          currentIndex={lightboxIndex} 
          onClose={closeLightbox} 
          onNext={nextImage} 
          onPrev={prevImage} 
        />
      )}

      <ParallaxHero images={HOME_HERO_IMAGES}>
        <div className="text-center max-w-5xl mx-auto mt-16">
          <div className="inline-flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full mb-8">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
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

      <section className="py-24 px-6 relative">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="font-serif text-4xl text-[#3a3a3a]">Our Signature Aesthetic</h2>
               <div className="w-16 h-0.5 bg-[#B3907A] mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {AESTHETIC.map((item, idx) => (
                  <div key={idx} className="bg-white p-10 text-center shadow-sm hover:shadow-xl transition-all duration-500 border border-[#3a3a3a]/5">
                     <div className="text-[#B3907A] flex justify-center mb-6">{item.icon}</div>
                     <h3 className="font-serif text-2xl mb-3 text-[#3a3a3a]">{item.title}</h3>
                     <p className="text-[#3a3a3a]/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <FallingMemories />

      {/* FEATURED WORK WITH MASONRY + LIGHTBOX */}
      <section className="py-32 bg-[[#F5F5EB] relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[#B3907A] text-xs font-bold uppercase tracking-widest mb-2 block">Curated Galleries</span>
              <h2 className="font-serif text-5xl text-[#3a3a3a]">Love Stories</h2>
            </div>
            <button onClick={() => setCurrentPage('Portfolio')} className="bg-transparent hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3a3a3a] hover:text-[#B3907A] transition-colors border-none cursor-pointer">
              View Full Portfolio <ArrowRight size={14}/>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_PROJECTS.map((item, index) => (
              <div 
                key={item.id} 
                className="group relative h-[500px] overflow-hidden cursor-pointer shadow-2xl rounded-sm"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                
                {/* Zoom Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-50 group-hover:scale-100 transition-transform">
                   <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                      <ZoomIn className="text-white" size={32} />
                   </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6">
                   <div className="bg-white/10 backdrop-blur-xl border border-white/10 text-white p-6 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-[#B3907A]">{item.category}</span>
                      <h3 className="font-serif text-2xl group-hover:text-[#B3907A] transition-colors">{item.title}</h3>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#3a3a3a] text-[#F5F5EB]">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                 <div className="text-[#B3907A] mb-4 opacity-80">{stat.icon}</div>
                 <span className="font-serif text-4xl md:text-5xl mb-2">{stat.value}</span>
                 <span className="text-xs uppercase tracking-widest opacity-50">{stat.label}</span>
              </div>
            ))}
         </div>
      </section>

      <section className="py-24 px-6 bg-[#F5F5EB]">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="font-serif text-4xl text-[#3a3a3a]">Investment</h2>
               <p className="text-[#3a3a3a]/60 mt-4">Transparent pricing for your peace of mind.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
               {PACKAGES.map((pkg, idx) => (
                  <div key={idx} className={`p-8 border transition-all duration-300 ${pkg.popular ? 'bg-white shadow-2xl scale-105 border-[#B3907A]/30 relative' : 'bg-transparent border-[#3a3a3a]/10 hover:bg-white hover:shadow-lg'}`}>
                     {pkg.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#B3907A] text-white text-[10px] font-bold uppercase px-4 py-1 tracking-widest">Most Popular</div>}
                     <h3 className="font-serif text-2xl text-[#3a3a3a] mb-2">{pkg.title}</h3>
                     <div className="text-3xl font-bold text-[#B3907A] mb-6">{pkg.price}</div>
                     <ul className="space-y-4 mb-8">
                        {pkg.features.map((f, i) => (
                           <li key={i} className="flex items-center gap-3 text-sm text-[#3a3a3a]/70"><Check size={14} className="text-[#B3907A]" /> {f}</li>
                        ))}
                     </ul>
                     <Button variant={pkg.popular ? 'dark' : 'outline'} className={!pkg.popular ? '!text-[#3a3a3a] !border-[#3a3a3a]' : ''} onClick={() => setCurrentPage('Contact')}>Select Plan</Button>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-32 bg-[#3a3a3a] text-center px-6">
        <div className="max-w-3xl mx-auto">
           <h2 className="font-serif text-5xl md:text-7xl text-white mb-8">Let's Create Magic</h2>
           <p className="text-[#E1DACA] mb-12 text-lg">Dates for 2025 are filling up fast.</p>
           <Button variant="primary" onClick={() => setCurrentPage('Contact')}>Start Your Journey</Button>
        </div>
      </section>
    </div>
  );
};




const AboutPage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-[#F5F5EB] animate-fade-in">
    <ParallaxHero images={ABOUT_HERO_IMAGES} height="h-[60vh]">
      <div className="text-center max-w-4xl mx-auto mt-20">
         <span className="text-[#B3907A] text-xs font-bold uppercase tracking-widest block mb-4">Since 2020</span>
         <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">We are Storytellers</h1>
      </div>
    </ParallaxHero>

    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-4xl mx-auto mb-20">
         <p className="text-[#3a3a3a]/70 leading-loose text-lg font-light">
            Beyond & Forever is a boutique photography studio based in Sri Lanka. We combine the storytelling nature of photojournalism with the polished look of fashion photography. We believe in real moments, not forced poses.
         </p>
      </div>
      <div className="text-center">
         <Button variant="dark" onClick={() => setCurrentPage('Portfolio')}>See Our Work</Button>
      </div>
    </div>
  </div>
);

const PortfolioPage = () => (
  <div className="min-h-screen bg-[#F5F5EB] animate-fade-in">
    <ParallaxHero images={PORTFOLIO_HERO_IMAGES} height="h-[60vh]">
       <h1 className="font-serif text-5xl md:text-7xl text-white text-center mt-20">Selected Works</h1>
    </ParallaxHero>

    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO_PROJECTS.map((project) => (
          <div key={project.id} className="group relative overflow-hidden aspect-[3/4] cursor-pointer bg-gray-200 shadow-lg">
            <img 
              src={project.src} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                <span className="text-[#B3907A] text-xs font-bold uppercase tracking-widest mb-2">{project.category}</span>
                <span className="text-white font-serif text-2xl">{project.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const [selectedService, setSelectedService] = useState('');
  const services = ["Wedding", "Elopement", "Engagement", "Portrait", "Fashion", "Event"];

  return (
    <div className="min-h-screen bg-[#F5F5EB] animate-fade-in">
      <ParallaxHero images={CONTACT_HERO_IMAGES} height="h-[60vh]">
         <h1 className="font-serif text-5xl md:text-7xl text-white text-center mt-20">Start The Conversation</h1>
      </ParallaxHero>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-5">
          
          {/* Info Column */}
          <div className="lg:col-span-2 bg-[#3a3a3a] text-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="font-serif text-4xl mb-6">Get in Touch</h2>
               <p className="opacity-70 mb-12 leading-relaxed">
                  We take on a limited number of weddings each year to ensure every couple receives our full creative attention.
               </p>
               <div className="space-y-8">
                 <div className="flex items-start gap-4 group">
                   <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#B3907A] transition-colors"><Phone className="text-white w-5 h-5"/></div>
                   <div><h5 className="font-bold text-xs uppercase tracking-widest mb-1 text-[#B3907A]">Phone</h5><p className="text-[#E1DACA] font-light">+94 77 123 4567</p></div>
                 </div>
                 <div className="flex items-start gap-4 group">
                   <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#B3907A] transition-colors"><Mail className="text-white w-5 h-5"/></div>
                   <div><h5 className="font-bold text-xs uppercase tracking-widest mb-1 text-[#B3907A]">Email</h5><p className="text-[#E1DACA] font-light">hello@beyond.lk</p></div>
                 </div>
                 <div className="flex items-start gap-4 group">
                   <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#B3907A] transition-colors"><MapPin className="text-white w-5 h-5"/></div>
                   <div><h5 className="font-bold text-xs uppercase tracking-widest mb-1 text-[#B3907A]">Studio</h5><p className="text-[#E1DACA] font-light">123 Galle Road, Colombo 03</p></div>
                 </div>
               </div>
             </div>
             <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#B3907A] rounded-full opacity-20 blur-3xl"></div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-3 p-12 md:p-16 bg-white">
             <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-4">What are you looking for?</label>
                   <div className="flex flex-wrap gap-3">
                      {services.map(service => (
                         <button
                            key={service}
                            type="button"
                            onClick={() => setSelectedService(service)}
                            className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 rounded-sm ${
                               selectedService === service 
                               ? 'bg-[#3a3a3a] border-[#3a3a3a] text-white shadow-md transform -translate-y-1' 
                               : 'bg-transparent border-[#3a3a3a]/20 text-[#3a3a3a]/70 hover:border-[#B3907A] hover:text-[#B3907A]'
                            }`}
                         >
                            {service}
                         </button>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div><label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2">Full Name</label><input type="text" required className="w-full bg-[#F5F5EB]/30 border-b border-[#3a3a3a]/20 p-3 focus:border-[#B3907A] outline-none text-[#3a3a3a]" placeholder="John Doe" /></div>
                   <div><label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2">Email Address</label><input type="email" required className="w-full bg-[#F5F5EB]/30 border-b border-[#3a3a3a]/20 p-3 focus:border-[#B3907A] outline-none text-[#3a3a3a]" placeholder="hello@example.com" /></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div><label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2">Event Date</label><input type="date" className="w-full bg-[#F5F5EB]/30 border-b border-[#3a3a3a]/20 p-3 focus:border-[#B3907A] outline-none text-[#3a3a3a]" /></div>
                   <div><label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2">Location</label><input type="text" className="w-full bg-[#F5F5EB]/30 border-b border-[#3a3a3a]/20 p-3 focus:border-[#B3907A] outline-none text-[#3a3a3a]" placeholder="City, Venue" /></div>
                </div>

                <div><label className="block text-[10px] font-bold uppercase tracking-widest text-[#B3907A] mb-2">Message</label><textarea rows="4" className="w-full bg-[#F5F5EB]/30 border-b border-[#3a3a3a]/20 p-3 focus:border-[#B3907A] outline-none text-[#3a3a3a] resize-none" placeholder="Tell us your story..."></textarea></div>

                <Button variant="dark" className="w-full md:w-auto mt-4">Send Inquiry</Button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================
   MAIN APP
   ======================================== */

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  return (
    <div className="bg-[#F5F5EB] min-h-screen font-sans text-[#3a3a3a] selection:bg-[#B3907A] selection:text-white">
      <ChatWidget setCurrentPage={setCurrentPage} />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{
        currentPage === 'Home' ? <HomePage setCurrentPage={setCurrentPage} /> :
        currentPage === 'About' ? <AboutPage setCurrentPage={setCurrentPage} /> :
        currentPage === 'Portfolio' ? <PortfolioPage /> :
        <ContactPage />
      }</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
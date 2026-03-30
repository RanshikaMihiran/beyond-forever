import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppWidget from './components/features/WhatsAppWidget'; // <--- Updated Import

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import TestimonialPage from './pages/TestimonialPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

// Helper component to scroll to top when the URL changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#F5F5EB] min-h-screen font-sans text-[#3a3a3a] selection:bg-[#B3907A] selection:text-white">
        
        {/* Floating elements and Layout */}
        <WhatsAppWidget /> {/* <--- Placed globally so it appears on all pages */}
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/testimonials" element={<TestimonialPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Dynamic Route for specific weddings */}
            <Route path="/portfolio/:id" element={<ProjectDetailsPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
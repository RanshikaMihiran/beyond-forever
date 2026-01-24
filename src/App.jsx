// src/App.jsx
import React, { useState, useEffect } from 'react';

// Import Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatWidget from './components/features/ChatWidget';

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';


const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  // Reset scroll position when page changes
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [currentPage]);

  return (
    <div className="bg-[#F5F5EB] min-h-screen font-sans text-[#3a3a3a] selection:bg-[#B3907A] selection:text-white">
      
      {/* Chatbot with Navigation Capability */}
      <ChatWidget setCurrentPage={setCurrentPage} />
      
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {
          currentPage === 'Home' ? <HomePage setCurrentPage={setCurrentPage} /> :
          currentPage === 'About' ? <AboutPage setCurrentPage={setCurrentPage} /> :
          currentPage === 'Testimonials' ? <TestimonialPage setCurrentPage={setCurrentPage} /> :
          currentPage === 'Portfolio' ? <PortfolioPage /> :
          <ContactPage />
        }
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
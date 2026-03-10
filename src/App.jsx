import React, { useState, useEffect } from 'react';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatWidget from './components/features/ChatWidget';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import TestimonialPage from './pages/TestimonialPage'; // Make sure this exists if you are using it
import ProjectDetailsPage from './pages/ProjectDetailsPage'; // IMPORT YOUR NEW PAGE

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [selectedProject, setSelectedProject] = useState(null); // TRACKS THE CLICKED PROJECT

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [currentPage]);

  // THIS FUNCTION HANDLES THE CLICK
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentPage('ProjectDetails');
  };

  return (
    <div className="bg-[#F5F5EB] min-h-screen font-sans text-[#3a3a3a] selection:bg-[#B3907A] selection:text-white">
      
      <ChatWidget setCurrentPage={setCurrentPage} />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'Home' && <HomePage setCurrentPage={setCurrentPage} onProjectClick={handleProjectClick} />}
        {currentPage === 'About' && <AboutPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'Testimonials' && <TestimonialPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'Portfolio' && <PortfolioPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'Contact' && <ContactPage />}
        
        {/* RENDER THE NEW PAGE WHEN SELECTED */}
        {currentPage === 'ProjectDetails' && selectedProject && (
          <ProjectDetailsPage project={selectedProject} setCurrentPage={setCurrentPage} />
        )}
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
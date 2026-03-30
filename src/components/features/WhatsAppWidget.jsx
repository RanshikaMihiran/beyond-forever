import React from 'react';

const WhatsAppWidget = () => {
  // Replace with your actual WhatsApp number (include country code, no + or spaces)
  // Example for Sri Lanka: 94771234567
  const phoneNumber = "94771234567"; 
  const defaultMessage = "Hello! I would like to inquire about your photography collections.";
  
  // Creates the official WhatsApp API link for instant app opening
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    // Removed the scroll-hiding logic. It is now always fixed to the bottom right.
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999999]">
      <div className="relative group flex items-center justify-center">
        
        {/* Sleek Tooltip (Matches your luxury dark theme) */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#3a3a3a] text-[#F5F5EB] text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl translate-x-4 group-hover:translate-x-0 hidden md:block">
          Chat with us
          {/* Tooltip Triangle pointer */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-[#3a3a3a]"></div>
        </div>

        {/* The Button */}
        <a 
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          // Added 'animate-fade-in-up' so it smoothly pops up when the website loads
          className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] focus:outline-none animate-fade-in-up"
          aria-label="Chat on WhatsApp"
        >
          {/* Subtle Ping Animation Ring */}
          <span className="absolute inset-0 w-full h-full rounded-full border-2 border-[#25D366] animate-ping opacity-20"></span>
          
          {/* Official WhatsApp SVG Icon */}
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-7 h-7 md:w-8 md:h-8 relative z-10 ml-[2px] mt-[2px]"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>

      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppWidget;
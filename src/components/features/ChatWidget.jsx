import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, ChevronRight } from 'lucide-react';

const ChatWidget = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! We are currently booking for 2026. How can I assist you today?", sender: 'bot', timestamp: 'Just now' }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // 1. User Message
    const newMessages = [...messages, { text: inputText, sender: 'user', timestamp: 'Now' }];
    setMessages(newMessages);
    setInputText("");
    setIsTyping(true);

    // 2. Bot Response Simulation
    setTimeout(() => {
      let botReply = "Thank you. A team member will be with you shortly.";
      let actionButton = null;
      const lowerInput = inputText.toLowerCase();

      // Simple Keyword Logic
      if (lowerInput.includes("price") || lowerInput.includes("cost")) {
        botReply = "Our wedding collections start from $1,500. Would you like to see the full breakdown?";
        actionButton = { label: "View Pricing", page: "Home" }; 
      } 
      else if (lowerInput.includes("book") || lowerInput.includes("date")) {
        botReply = "We'd love to check our availability for you. Please fill out our inquiry form.";
        actionButton = { label: "Inquire Now", page: "Contact" };
      } 
      else if (lowerInput.includes("portfolio") || lowerInput.includes("photo")) {
        botReply = "You can view our latest love stories in the Portfolio.";
        actionButton = { label: "View Portfolio", page: "Portfolio" };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { text: botReply, sender: 'bot', action: actionButton, timestamp: 'Just now' }]);
    }, 1500);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setIsOpen(false); 
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans flex flex-col items-end">
      
      {/* --- CHAT WINDOW --- */}
      <div 
        className={`
          mb-4 w-[360px] md:w-[400px] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col 
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right border border-[#3a3a3a]/10
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
          }
        `}
      >
        
        {/* 1. HEADER: Minimalist & Clean */}
        <div className="bg-[#3a3a3a] p-5 flex justify-between items-center">
           <div className="flex items-center gap-3">
              {/* Pulsing Green Dot (Status) */}
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-[#3a3a3a]"></span>
              </div>
              
              <h3 className="text-white font-bold text-sm tracking-widest uppercase">Live Support</h3>
           </div>

           {/* Close Button (Transparent BG, Green Hover) */}
           <button 
             onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
             className="bg-transparent border-none text-white/50 hover:text-green-400 transition-colors cursor-pointer p-1"
           >
             <X size={20} />
           </button>
        </div>

        {/* 2. MESSAGES AREA */}
        <div className="h-[400px] overflow-y-auto p-6 bg-[#F9F9F9] space-y-6">
          <div className="flex justify-center">
            <span className="text-[10px] font-bold text-[#3a3a3a]/30 uppercase tracking-widest">Today</span>
          </div>

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
              <div 
                className={`
                  max-w-[85%] p-4 text-sm leading-relaxed shadow-sm
                  ${msg.sender === 'user' 
                    ? 'bg-[#3a3a3a] text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-white text-[#3a3a3a] border border-[#3a3a3a]/5 rounded-2xl rounded-tl-sm'
                  }
                `}
              >
                {msg.text}
              </div>
              
              {/* Action Button */}
              {msg.action && (
                <button 
                  onClick={() => handleNavigate(msg.action.page)}
                  className="mt-3 group flex items-center gap-2 bg-white border border-[#B3907A]/30 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B3907A]">
                    {msg.action.label}
                  </span>
                  <ChevronRight size={12} className="text-[#B3907A] group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {/* Timestamp */}
              <span className="text-[9px] text-[#3a3a3a]/30 mt-2 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex items-center gap-1 bg-white border border-[#3a3a3a]/5 px-4 py-3 rounded-2xl rounded-tl-sm w-fit shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#3a3a3a]/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-[#3a3a3a]/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-[#3a3a3a]/40 rounded-full animate-bounce"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 3. INPUT AREA */}
        <div className="p-4 bg-white border-t border-[#3a3a3a]/5">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..." 
              className="w-full bg-[#F5F5EB] border-none rounded-full pl-5 pr-12 py-3.5 text-sm text-[#3a3a3a] placeholder:text-[#3a3a3a]/30 focus:outline-none focus:ring-1 focus:ring-[#B3907A]/50 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`
                absolute right-2 p-2 rounded-full transition-all duration-300
                ${inputText.trim() 
                  ? 'bg-[#B3907A] text-white shadow-md hover:scale-105 cursor-pointer' 
                  : 'bg-transparent text-[#3a3a3a]/20 cursor-default'
                }
              `}
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-3">
             <p className="text-[9px] text-[#3a3a3a]/20 flex items-center justify-center gap-1">
               <Sparkles size={8} /> Powered by B&F AI
             </p>
          </div>
        </div>
      </div>

      {/* --- MAIN TOGGLE BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-[100] cursor-pointer hover:scale-110 relative
          ${isOpen ? 'bg-[#3a3a3a] rotate-90' : 'bg-[#B3907A] rotate-0'}
        `}
      >
        {isOpen ? (
          <X className="text-white" size={28} />
        ) : (
          <>
            <MessageSquare className="text-white" size={28} />
            
            {/* Red Notification Dot */}
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
          </>
        )}
      </button>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;
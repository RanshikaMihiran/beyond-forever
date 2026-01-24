import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyle = "px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ease-out transform hover:-translate-y-1 shadow-lg backdrop-blur-sm inline-flex items-center justify-center gap-2 border outline-none focus:outline-none";
  const variants = {
    primary: "bg-[#B3907A]/90 text-white border-transparent hover:bg-[#3a3a3a] hover:shadow-xl", 
    outline: "bg-transparent border-white text-white hover:bg-white hover:text-[#3a3a3a]",
    dark: "bg-[#3a3a3a] text-white border-[#3a3a3a] hover:bg-[#B3907A] hover:border-[#B3907A]"
  };
  return <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</button>;
};

export default Button;
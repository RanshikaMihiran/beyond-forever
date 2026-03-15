import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const CinematicVideo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const videoUrl = "https://ik.imagekit.io/vaibbbrnqt/beyond-forever/Cover-Video/WhatsApp%20Video%202026-03-15%20at%207.34.58%20PM.mp4";

  // Toggle Play/Pause
  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle Mute/Unmute
  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="bg-[#F5F5EB] py-24 px-6 md:px-12 lg:px-24 border-t border-[#1a1a1a]/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-16">
          <span className="text-[#B3907A] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
            Cinematic Films
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] leading-none mb-4">
            Moving <span className="italic text-[#B3907A]">Poetry</span>
          </h2>
          <p className="text-[#1a1a1a]/60 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Experience the raw emotion and unscripted beauty of your day, captured in breathtaking motion. Press play to immerse yourself in the story.
          </p>
        </div>

        {/* --- VIDEO CONTAINER --- */}
        <div 
          className="relative w-full aspect-video md:h-[75vh] rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer"
          onClick={togglePlay}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Dark Gradient Overlay for better contrast */}
          <div className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${isPlaying ? 'opacity-20 group-hover:opacity-40' : 'opacity-50'}`}></div>

          {/* --- CENTRAL PLAY/PAUSE BUTTON --- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className={`
              flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-500
              ${isPlaying ? 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100' : 'opacity-100 scale-100 bg-white/10'}
            `}>
              {isPlaying ? (
                <Pause className="text-white w-8 h-8 md:w-10 md:h-10 fill-white/20" strokeWidth={1.5} />
              ) : (
                <Play className="text-white w-8 h-8 md:w-10 md:h-10 translate-x-1 fill-white/20" strokeWidth={1.5} />
              )}
            </div>
          </div>

          {/* --- BOTTOM CONTROLS --- */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex justify-between items-end z-20">
            {/* Sound Toggle Button */}
            <button 
              onClick={toggleMute}
              className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#B3907A] hover:border-[#B3907A] transition-all duration-300"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">
                {isMuted ? 'Unmute Film' : 'Mute Sound'}
              </span>
            </button>

            {/* Decorative Label */}
            <div className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-sm px-4 py-2 bg-black/20 rounded-full border border-white/10">
              Beyond & Forever
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CinematicVideo;
import { useRef } from "react";

const Branding = () => {
  const brandingRef = useRef(null); // Create a ref
  const overlayRef = useRef(null); // Create a ref for the glare spotlight

  const handleMouseMove = (e) => {
    const el = overlayRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(circle 350px at ${x}px ${y}px, rgba(168, 85, 247, 0.12), transparent 80%)`;
  };

  const handleMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={brandingRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col md:flex-row items-center gap-8 w-full mx-auto h-fit p-6 md:p-10 rounded-3xl animate-right-to-left transition-all duration-300 glass-level-3 border border-card-border/40 shadow-xl overflow-hidden`}>
      
      {/* Dynamic Glass Spotlight Overlay */}
      <div 
        ref={overlayRef} 
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 transition-opacity duration-300 ease-out z-10" 
        style={{
          background: 'radial-gradient(circle 350px at 50% 50%, rgba(168, 85, 247, 0.12), transparent 80%)',
          willChange: 'background, opacity'
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full z-10">
        {/* Left Column: Bio & Stats */}
        <div className="md:col-span-8 flex flex-col gap-5 text-left">
          <div className="flex flex-col gap-1.5">
            <span className="text-accent-secondary text-xs uppercase tracking-widest font-bold">
              Hello World, I'm
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight heading-font text-bright-text leading-none">
              Kowshik Baskaran
            </h1>
            <p className="text-lg md:text-xl font-medium text-accent-primary heading-font mt-2">
              B.Tech IT Undergrad & Full Stack Developer
            </p>
          </div>

          <p className="text-gray-text text-sm md:text-base leading-relaxed max-w-2xl font-light">
            I build high-performance backend systems, craft responsive web interfaces, and explore the cutting edge of Artificial Intelligence and Machine Learning.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mt-2">
            {[
              { number: "1100+", label: "Problems Solved", sub: "Leetcode & CP" },
              { number: "20+", label: "Projects Built", sub: "Web & Mobile" },
              { number: "8.29", label: "CGPA", sub: "Academic Record" }
            ].map(({ number, label, sub }) => (
              <div key={label} className="p-3 rounded-xl bg-secondary-bg/30 border border-card-border/30 hover:border-accent-secondary/30 transition-all duration-300">
                <p className="text-xl sm:text-2xl font-bold text-bright-text heading-font">{number}</p>
                <p className="text-[10px] sm:text-xs font-semibold text-accent-secondary uppercase tracking-wider mt-1">{label}</p>
                <p className="text-[8px] sm:text-[10px] text-gray-text opacity-70 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image with fading edge effect */}
        <div className="md:col-span-4 w-full h-full flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[280px] overflow-hidden rounded-2xl">
            <img
              src="./me.jpg"
              alt="Me"
              className="w-full h-full object-cover object-top filter saturate-75 contrast-105"
              style={{
                maskImage: 'radial-gradient(circle at 50% 40%, black 25%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 25%, transparent 85%)'
              }}
            />
            {/* Subtle glow behind image */}
            <div className="absolute top-10 right-10 w-24 h-24 bg-accent-primary/20 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;

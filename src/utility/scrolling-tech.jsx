import { useRef, useState, useEffect } from 'react';

const TechStack = ({ project }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll function for arrow buttons
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 100; // Adjust as needed
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check if content overflows and update scroll states
  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const isOverflowing = container.scrollWidth > container.clientWidth;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      isOverflowing &&
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  // Run checkScroll on mount and when scrolling
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScroll(); // Initial check
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll); // Handle window resize

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [project.tech]); // Re-run if tech array changes

  return (
    <div className="relative flex items-center">
      {/* Left Arrow - Conditionally Rendered */}
      {/* Left Arrow - Conditionally Rendered and Hidden by default */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 z-10 p-1.5 bg-[var(--arrow-bg)] backdrop-blur-sm border border-[var(--card-border)] hover:bg-[var(--arrow-hover-bg)] text-[var(--secondary-text)] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${!canScrollLeft && 'pointer-events-none !opacity-0'}`}
        aria-label="Scroll left"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Scrollable Tech Stack Container */}
      <div
        ref={scrollRef}
        className="flex text-nowrap overflow-x-auto gap-1.5 text-xs scroll-smooth hide-scrollbar py-1"
      >
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className="bg-[var(--secondary-bg)] text-[var(--primary-text)] px-2 py-0.5 rounded-md border border-[var(--card-border)] hover:border-[var(--accent-primary)]/50 hover:bg-[var(--accent-glow)] transition-all duration-300 cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Right Arrow - Conditionally Rendered */}
      {/* Right Arrow - Conditionally Rendered and Hidden by default */}
      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 z-10 p-1.5 bg-[var(--arrow-bg)] backdrop-blur-sm border border-[var(--card-border)] hover:bg-[var(--arrow-hover-bg)] text-[var(--secondary-text)] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${!canScrollRight && 'pointer-events-none !opacity-0'}`}
        aria-label="Scroll right"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default TechStack;
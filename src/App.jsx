import './App.css'
import Branding from "./Branding.jsx";
import AboutMe from "./AboutMe.jsx";
import Resume from "./Resume.jsx";
import Navbar from "./navbar.jsx";
import { useEffect, useRef, useState } from "react";
import Projects from "./projects.jsx";
import Contact from "./Contact.jsx";
import { AnimatedThemeToggler } from "./components/ui/animated-theme-toggler.jsx";

const navTabs = [
  { name: "About", id: "about" },
  { name: "Resume", id: "resume" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleIntersection = (entries) => {
      // If we are currently in a programmatic click-to-scroll, ignore observer events
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = navTabs.findIndex(tab => tab.id === entry.target.id);
          if (index !== -1) {
            setActiveTabIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    });

    navTabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
    isScrollingRef.current = true;

    const targetElement = document.getElementById(navTabs[index].id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      
      // Reset isScrollingRef flag after smooth scroll is expected to finish
      const checkScrollEnd = () => {
        isScrollingRef.current = false;
      };
      
      // Delay reset slightly to let the transition finish
      setTimeout(checkScrollEnd, 800);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen transition-all duration-500 px-6 sm:px-12 md:px-16 lg:px-12 items-center`}>
      {/* Animated Theme Toggler */}
      <AnimatedThemeToggler />

      <div className={"flex flex-col gap-16 w-full py-8 relative items-center max-w-5xl"}>
        {/* Sticky Fixed Navbar */}
        <div className={"flex w-[95%] md:w-3/4 flex-col gap-4 sticky top-8 z-50"}>
          <Navbar navTabs={navTabs} setActiveTabIndex={handleTabClick} selectedIndex={activeTabIndex} />
        </div>

        {/* Stacked Layout Sections */}
        <div className="flex flex-col gap-16 w-full items-center">
          <section id="about" className="w-full scroll-mt-32">
            <AboutMe />
          </section>
          
          <section id="resume" className="w-full scroll-mt-32">
            <Resume />
          </section>
          
          <section id="projects" className="w-full scroll-mt-32">
            <Projects />
          </section>
          
          <section id="contact" className="w-full scroll-mt-32">
            <Contact />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;

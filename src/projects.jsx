import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "./projects.json";
import placeholder from "/placeholder.png";
import TechStack from "./utility/scrolling-tech.jsx";

function Projects() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Dynamic categories extracted from project data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(p => p.category))];
    return ["All", ...uniqueCategories];
  }, []);

  // Filtered projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    let mounted = true;
    // Base URL is needed for GitHub Pages or localized relative paths
    const baseUrl = import.meta.env.BASE_URL || "/";

    const imageUrls = projects.map(project =>
      project.image ? `${baseUrl}${project.image}`.replace(/\/+/g, '/') : placeholder
    );

    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true); // Resolve anyway so we don't block content if an image fails
      });
    };

    Promise.all(imageUrls.map(loadImage)).then(() => {
      if (mounted) {
        // Subtle delay for smoother transition from loader to content
        setTimeout(() => setImagesLoaded(true), 750);
      }
    });

    return () => { mounted = false; };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    }
  };

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
      }
    }
  };

  if (!imagesLoaded) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-6">
        <div className="relative w-16 h-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-4 border-accent-primary/20 border-t-accent-primary rounded-full"
          />
          <motion.div
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 m-auto w-4 h-4 bg-accent-secondary rounded-full"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-bright-text font-semibold tracking-widest text-sm uppercase">Curating Showcase</p>
          <div className="flex gap-1.5 h-1 items-center justify-center">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-accent-primary"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-5 py-2.5 rounded-full text-sm font-semibold
              transition-all duration-300 ease-out
              border backdrop-blur-sm
              ${activeCategory === category
                ? "bg-accent-primary/90 border-accent-primary text-white shadow-lg shadow-accent-primary/25"
                : "bg-[var(--card-bg)]/50 border-white/10 text-gray-text hover:border-accent-primary/50 hover:text-bright-text hover:bg-[var(--card-bg)]/80"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid with AnimatePresence */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                layout
                className="flex flex-col rounded-2xl bg-[var(--card-bg)] glass-card overflow-hidden shadow-lg"
              >
                {/* Image Section */}
                <div className="w-full aspect-video overflow-hidden relative">
                  <img
                    src={project.image ? `${import.meta.env.BASE_URL}${project.image}`.replace(/\/+/g, '/') : placeholder}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--card-bg)] border border-card-border text-bright-text">
                    {project.category}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col grow">
                  <h2 className="text-xl font-bold mb-3 text-bright-text">
                    {project.title}
                  </h2>
                  <p className="text-gray-text mb-6 line-clamp-3 text-[13px] leading-relaxed font-light">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <TechStack project={project} />

                    <div className="mt-6 flex gap-6 items-center">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[13px] font-bold text-accent-secondary hover:text-accent-primary transition-colors duration-300 group/link"
                      >
                        <span className="relative">
                          GitHub
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-primary transition-all duration-300 group-hover/link:w-full" />
                        </span>
                        <svg className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[13px] font-bold text-green-400 hover:text-green-300 transition-colors duration-300 group/link"
                        >
                          <span className="relative">
                            Live Demo
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-400 transition-all duration-300 group-hover/link:w-full" />
                          </span>
                          <svg className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-16 text-gray-text"
          >
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-semibold">No projects found</p>
            <p className="text-sm mt-1">Try selecting a different category</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;

import PropTypes from "prop-types";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = ({ navTabs, selectedIndex, setActiveTabIndex }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="relative z-50 flex flex-col h-fit w-full p-1 md:p-1.5 rounded-2xl glass-level-2 animate-glow-emergence transition-all duration-300">
      <div className="flex items-center justify-center px-1.5 md:px-2 text-bright-text h-9 md:h-10">
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1 md:gap-1.5 relative items-center">
          {navTabs.map(({ name }, index) => (
            <button
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={`relative px-2.5 py-1 cursor-pointer heading-font font-semibold text-xs md:text-sm transition-colors duration-200 z-10 ${
                selectedIndex === index ? "text-bright-text" : "text-gray-text hover:text-bright-text"
              }`}
            >
              {selectedIndex === index && (
                <motion.span
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-accent-primary/15 border border-accent-primary/30 rounded-full z-[-1] shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                />
              )}
              {name}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center justify-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-bright-text text-lg focus:outline-none p-1.5 cursor-pointer"
          >
            <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Centered Mobile Dropdown (Opens Upwards above bottom navbar) */}
      <div className={`md:hidden absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-48 overflow-hidden transition-all duration-300 ease-in-out glass-level-2 rounded-2xl shadow-2xl ${isMenuOpen ? "max-h-64 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-2 pointer-events-none"}`}>
        <div className="flex flex-col gap-1 p-2 items-center relative w-full">
          {navTabs.map(({ name }, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTabIndex(index);
                setIsMenuOpen(false);
              }}
              className={`relative cursor-pointer heading-font font-semibold w-full text-center py-2.5 rounded-xl transition-colors duration-200 z-10 ${
                selectedIndex === index ? "text-bright-text" : "text-gray-text hover:text-bright-text"
              }`}
            >
              {selectedIndex === index && (
                <motion.span
                  layoutId="activeMobileNavTab"
                  className="absolute inset-0 bg-accent-primary/15 border border-accent-primary/30 rounded-xl z-[-1] shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                />
              )}
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

Navbar.propTypes = {
  navTabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })).isRequired,
  setActiveTabIndex: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
}

export default Navbar;
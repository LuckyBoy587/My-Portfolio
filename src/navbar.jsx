import ContextBox from "./utility/context-box.jsx";
import PropTypes from "prop-types";
import TextType from './components/TextType';
import { useState } from "react";
import { motion } from "framer-motion";


const Navbar = ({ navTabs, selectedIndex, setActiveTabIndex }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="relative z-50 flex flex-col h-fit w-full p-1.5 md:p-2 md:px-4 rounded-2xl glass-level-2 animate-glow-emergence transition-all duration-300">
      <div className="flex items-center justify-between px-2 md:px-4 text-bright-text h-10 md:h-12">
        <div className="text-base md:text-lg font-bold heading-font text-secondary-text truncate">
          <TextType
            text={["@LuckyBoy587"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2 relative items-center">
          {navTabs.map(({ name }, index) => (
            <button
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={`relative px-3 py-1.5 cursor-pointer heading-font font-semibold text-xs md:text-sm transition-colors duration-200 z-10 ${
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
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-bright-text text-lg focus:outline-none p-2"
          >
            <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      <div className={`md:hidden absolute top-[calc(100%+0.5rem)] left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out glass-level-2 rounded-2xl shadow-2xl ${isMenuOpen ? "max-h-64 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"}`}>
        <div className="flex flex-col gap-1 p-2 items-center relative w-full">
          {navTabs.map(({ name }, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTabIndex(index);
                setIsMenuOpen(false);
              }}
              className={`relative cursor-pointer heading-font font-semibold w-full text-center py-3 rounded-xl transition-colors duration-200 z-10 ${
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
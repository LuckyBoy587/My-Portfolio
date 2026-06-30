import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Navbar = ({ navTabs, selectedIndex, setActiveTabIndex }) => {
  return (
    <div
      className="relative z-50 flex flex-col h-fit w-full p-1 md:p-1.5 rounded-2xl glass-level-2 animate-glow-emergence transition-all duration-300">
      <div className="flex items-center justify-center px-1.5 md:px-2 text-bright-text h-9 md:h-10">
        {/* Navigation Menu */}
        <div className="flex gap-1 sm:gap-1.5 relative items-center">
          {navTabs.map(({ name }, index) => (
            <button
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={`relative px-2 sm:px-2.5 py-1 cursor-pointer heading-font font-semibold text-[11px] sm:text-xs md:text-sm transition-colors duration-200 z-10 ${
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
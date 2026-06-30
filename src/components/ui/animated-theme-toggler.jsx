import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

export const AnimatedThemeToggler = ({
  className,
  ...props
}) => {
  const [isLight, setIsLight] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const updateTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect();
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    const newLightState = !isLight
    setIsLight(newLightState)
    document.documentElement.classList.toggle("light")
    localStorage.setItem("theme", newLightState ? "light" : "dark")
  }, [isLight])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn("fixed top-3 right-3 z-50 p-3 rounded-full glass-level-3 hover:scale-110 transition-all duration-300", className)}
      {...props}>
      {isLight ? <Moon className="w-6 h-6 text-[#1e1b4b]" /> : <Sun className="w-6 h-6 text-yellow-400" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

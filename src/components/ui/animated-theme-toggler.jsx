import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

export const AnimatedThemeToggler = ({
  className,
  ...props
}) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setIsDark(isDark)
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Also check for saved theme preference
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }

    return () => observer.disconnect();
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    const newDarkState = !isDark
    setIsDark(newDarkState)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", newDarkState ? "dark" : "light")
  }, [isDark])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn("fixed top-3 right-3 z-50 p-3 rounded-full glass-level-3 hover:scale-110 transition-all duration-300", className)}
      {...props}>
      {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-[#1e1b4b]" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

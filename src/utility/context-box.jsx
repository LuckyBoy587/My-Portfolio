import { cn } from "@/lib/utils";

const ContextBox = ({ children, className, level = 1 }) => {
  const glassClass = level === 3 ? "glass-level-3" : level === 2 ? "glass-level-2" : "glass-level-1";
  return (
    <div className={cn("flex flex-col h-fit w-full p-8 pl-12 gap-4 rounded-2xl animate-glow-emergence", glassClass, className)}>
      {children}
    </div>
  )
};

export default ContextBox;
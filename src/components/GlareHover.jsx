import { useRef } from 'react';

const GlareHover = ({
  width = '500px',
  height = '500px',
  background = '#000',
  borderRadius = '10px',
  borderColor = '#333',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareSize = 250,
  transitionDuration = 650,
  className = '',
  style = {}
}) => {
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const overlayRef = useRef(null);

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.opacity = glareOpacity.toString();
  };

  const handleMouseMove = (e) => {
    const el = overlayRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(circle ${glareSize}px at ${x}px ${y}px, ${rgba}, transparent 100%)`;
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.opacity = '0';
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(circle ${glareSize}px at 50% 50%, ${rgba}, transparent 100%)`,
    pointerEvents: 'none',
    opacity: 0,
    transition: `opacity ${transitionDuration}ms ease`,
    willChange: 'background, opacity'
  };

  return (
    <div
      className={`relative grid place-items-center overflow-hidden border cursor-pointer ${className}`}
      style={{
        width,
        height,
        background,
        borderRadius,
        borderColor,
        ...style
      }}
      onMouseEnter={animateIn}
      onMouseMove={handleMouseMove}
      onMouseLeave={animateOut}>
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
};

export default GlareHover;

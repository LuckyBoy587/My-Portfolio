export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  showBorder = false,
  direction = 'horizontal',
}) {
  /* Removed useAnimationFrame and infinite loop for GPU performance */

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  const gradientColors = colors.join(', ');

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium transition-shadow duration-500 overflow-hidden cursor-pointer ${showBorder ? 'py-1 px-2' : ''} ${className}`}>
      {showBorder && (
        <div
          className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
          style={gradientStyle}>
          <div
            className="absolute bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }} />
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-clip-text"
        style={{ ...gradientStyle, WebkitBackgroundClip: 'text' }}>
        {children}
      </div>
    </div>
  );
}

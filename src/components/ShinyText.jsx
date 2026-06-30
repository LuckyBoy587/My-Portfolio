const ShinyText = ({
  text,
  className = '',
  color = '#b5b5b5',
}) => {
  /* Removed useAnimationFrame and infinite loop for GPU performance */
  const textStyle = {
    color: color,
    display: 'inline-block'
  };

  return (
    <span
      className={`${className}`}
      style={textStyle}>
      {text}
    </span>
  );
};

export default ShinyText;

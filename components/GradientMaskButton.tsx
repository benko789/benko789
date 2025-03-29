'use client';

import { useEffect } from 'react';

interface GradientMaskButtonProps {
  isHolding: boolean;
  onHoldChange: (holding: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function GradientMaskButton({ isHolding, onHoldChange, className, style }: GradientMaskButtonProps) {
  const handleMouseDown = () => {
    onHoldChange(true);
  };

  const handleMouseUp = () => {
    onHoldChange(false);
  };
  
  const handleTouchStart = () => {
    onHoldChange(true);
  };

  const handleTouchEnd = () => {
    onHoldChange(false);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Ensure it stops if the mouse leaves the button
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd} // Ensure it stops if the touch is canceled
      className={`p-0 rounded-full bg-blue-500 text-white transition-colors duration-200 gradient-mask-button ${className}`}
      style={style}
      aria-label="Hold to change gradient"
    >
      Hold Me
    </button>
  );
} 
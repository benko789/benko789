'use client';

import { useEffect } from 'react';

interface GradientMaskButtonProps {
  isHolding: boolean;
  onHoldChange: (holding: boolean) => void;
}

export function GradientMaskButton({ isHolding, onHoldChange }: GradientMaskButtonProps) {
  const handleMouseDown = () => {
    onHoldChange(true);
  };

  const handleMouseUp = () => {
    onHoldChange(false);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Ensure it stops if the mouse leaves the button
      className="p-3 rounded-full bg-blue-500 text-white transition-colors duration-200"
      aria-label="Hold to change gradient"
    >
      Hold Me
    </button>
  );
} 
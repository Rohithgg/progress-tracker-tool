import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport is mobile-sized
 * @param breakpoint - The maximum width in pixels to consider as mobile
 * @returns boolean indicating if the screen is mobile-sized
 */
export const useMobileDetect = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [breakpoint]);
  
  return isMobile;
};

/**
 * Truncates text for mobile displays
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if necessary
 */
export const truncateForMobile = (text: string, maxLength = 25): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Formats numbers for mobile display to save space
 * @param value - The number to format
 * @returns Formatted number (e.g. 1.2k instead of 1200)
 */
export const formatNumberForMobile = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

/**
 * Returns appropriate classes based on screen size
 * @param mobileClasses - Classes to apply on mobile screens
 * @param desktopClasses - Classes to apply on desktop screens
 * @returns Combined classes string
 */
export const responsiveClasses = (mobileClasses: string, desktopClasses: string): string => {
  return `${mobileClasses} sm:${desktopClasses}`;
};

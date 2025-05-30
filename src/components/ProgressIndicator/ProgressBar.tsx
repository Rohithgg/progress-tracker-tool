import React from 'react';

interface ProgressBarProps {
  progress: number;
  height?: number;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  height = 8,
  animate = true
}) => {
  const cappedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div 
      className="w-full bg-gray-200 rounded-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <div 
        className={`bg-indigo-600 h-full rounded-full ${animate ? 'transition-all duration-1000 ease-out' : ''}`}
        style={{ width: `${cappedProgress}%` }}
        role="progressbar"
        aria-valuenow={cappedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default ProgressBar;
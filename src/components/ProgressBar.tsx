
import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar = ({ progress, className = "" }: ProgressBarProps) => {
  return (
    <div className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-orange-500 transition-all duration-500 ease-out"
        style={{ 
          width: `${progress}%`,
          "--progress-width": `${progress}%` 
        } as React.CSSProperties}
      />
    </div>
  );
};

export default ProgressBar;

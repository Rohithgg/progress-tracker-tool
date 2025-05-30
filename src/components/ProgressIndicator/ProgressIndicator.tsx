import React from 'react';
import ProgressBar from './ProgressBar';
import { BarChart } from 'lucide-react';

interface ProgressIndicatorProps {
  progress: number;
  totalModules: number;
  completedModules: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  progress, 
  totalModules,
  completedModules
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-5 mb-4 sm:mb-6">
      <div className="flex items-center mb-3 sm:mb-4">
        <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-1.5 sm:mr-2 flex-shrink-0" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Your Progress</h2>
      </div>
      
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-gray-700">
          {completedModules} of {totalModules} modules completed
        </span>
        <span className="text-lg sm:text-xl font-bold text-indigo-700">{progress}%</span>
      </div>
      
      <ProgressBar progress={progress} height={8} animate={true} />
      
      <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
        {progress < 25 && "Just getting started! Keep going."}
        {progress >= 25 && progress < 50 && "Good start! You're making progress."}
        {progress >= 50 && progress < 75 && "Halfway there! Keep up the great work."}
        {progress >= 75 && progress < 100 && "Almost there! You're doing great."}
        {progress === 100 && "Congratulations! You've completed all modules."}
      </div>
      
      <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
          <div className="text-base sm:text-lg font-bold text-indigo-700">{totalModules}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
          <div className="text-base sm:text-lg font-bold text-green-600">{completedModules}</div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
          <div className="text-base sm:text-lg font-bold text-amber-500">
            {totalModules - completedModules}
          </div>
          <div className="text-xs text-gray-500">Remaining</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
          <div className="text-base sm:text-lg font-bold text-indigo-600">{progress}%</div>
          <div className="text-xs text-gray-500">Progress</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
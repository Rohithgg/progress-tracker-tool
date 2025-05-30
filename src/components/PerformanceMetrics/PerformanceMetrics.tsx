import React from 'react';
import { Module } from '../../types';
import { calculateAverageScore } from '../../utils/progressUtils';
import { LineChart, PieChart, Trophy } from 'lucide-react';

interface PerformanceMetricsProps {
  modules: Module[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ modules }) => {
  const averageScore = calculateAverageScore(modules);
  
  const getModulesByStatus = () => {
    const statusCounts = {
      completed: 0,
      'in-progress': 0,
      'not-started': 0,
      failed: 0
    };
    
    modules.forEach(module => {
      statusCounts[module.status] += 1;
    });
    
    return statusCounts;
  };
  
  const statusCounts = getModulesByStatus();
  
  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-teal-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getGradeFromScore = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-5 mb-4 sm:mb-6">
      <div className="flex items-center mb-3 sm:mb-4">
        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-1.5 sm:mr-2 flex-shrink-0" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Performance Metrics</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Average Performance</h3>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center rounded-full border-6 sm:border-8 border-gray-100 mb-4 sm:mb-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl sm:text-3xl font-bold ${getScoreColor(averageScore)}`}>
                  {averageScore}%
                </span>
              </div>
              <div className="absolute bottom-0 w-full text-center -mb-8 sm:-mb-10">
                <span className={`text-xs sm:text-sm font-medium ${getScoreColor(averageScore)}`}>
                  Grade: {getGradeFromScore(averageScore)}
                </span>
              </div>
            </div>
            
            <div className="sm:ml-4 md:ml-6 w-full sm:w-auto">
              <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Score Breakdown</h4>
              <div className="space-y-1.5 sm:space-y-2 max-h-24 overflow-y-auto">
                {modules
                  .filter(module => module.completed && module.score !== undefined)
                  .map(module => (
                    <div key={module.id} className="flex items-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600 mr-1.5 sm:mr-2 flex-shrink-0"></div>
                      <div className="text-xs sm:text-sm text-gray-600 truncate max-w-[100px] sm:max-w-[150px]">{module.title}</div>
                      <div className="ml-auto text-xs sm:text-sm font-medium">{module.score}%</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 mt-3 sm:mt-0">Module Status</h3>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 sm:mr-4 relative mb-4 sm:mb-0">
              <PieChart className="w-full h-full text-gray-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700">{modules.length} Modules</span>
              </div>
            </div>
            
            <div className="space-y-1.5 sm:space-y-3 w-full sm:w-auto">
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1.5 sm:mr-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-700">
                  Completed: {statusCounts.completed}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-500 mr-1.5 sm:mr-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-700">
                  In Progress: {statusCounts['in-progress']}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300 mr-1.5 sm:mr-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-700">
                  Not Started: {statusCounts['not-started']}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 mr-1.5 sm:mr-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-700">
                  Failed: {statusCounts.failed}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 border-t border-gray-200 pt-3 sm:pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Performance Trend</h3>
        <div className="h-24 sm:h-36 flex items-end justify-between px-2 relative">
          <LineChart className="w-full h-full text-gray-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs sm:text-sm text-gray-500 text-center px-2">Detailed trend analysis will be available after more modules are completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
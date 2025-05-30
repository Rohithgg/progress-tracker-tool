import { Module, Course } from '../types';

/**
 * Calculate the completion percentage for a course
 */
export const calculateProgress = (modules: Module[]): number => {
  if (modules.length === 0) return 0;
  
  const completedModules = modules.filter(module => module.completed).length;
  return Math.round((completedModules / modules.length) * 100);
};

/**
 * Calculate the average score for completed modules
 */
export const calculateAverageScore = (modules: Module[]): number => {
  const modulesWithScores = modules.filter(
    module => module.completed && typeof module.score === 'number'
  );
  
  if (modulesWithScores.length === 0) return 0;
  
  const totalScore = modulesWithScores.reduce(
    (sum, module) => sum + (module.score || 0), 
    0
  );
  
  return Math.round(totalScore / modulesWithScores.length);
};

/**
 * Get modules that are due soon (within the next X days)
 */
export const getUpcomingModules = (modules: Module[], days: number = 7): Module[] => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  return modules.filter(module => {
    if (!module.dueDate || module.completed) return false;
    
    const dueDate = new Date(module.dueDate);
    return dueDate >= today && dueDate <= futureDate;
  });
};

/**
 * Generate a simple performance assessment based on progress and scores
 */
export const generatePerformanceAssessment = (course: Course): string => {
  const progress = calculateProgress(course.modules);
  const averageScore = calculateAverageScore(course.modules);
  
  if (progress === 100) {
    if (averageScore >= 90) return 'Excellent work! You\'ve mastered this course.';
    if (averageScore >= 80) return 'Great job completing the course with good scores!';
    if (averageScore >= 70) return 'You\'ve completed the course with satisfactory results.';
    return 'Course completed. Consider reviewing some modules to improve your scores.';
  }
  
  if (progress >= 75) return 'You\'re making great progress! Keep going.';
  if (progress >= 50) return 'You\'re halfway there. Keep up the good work!';
  if (progress >= 25) return 'You\'ve started your journey. Stay consistent!';
  return 'Just getting started. Take it one module at a time!';
};

/**
 * Format a date string for display
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'No due date';
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get the status color class based on module status
 */
export const getStatusColorClass = (status: Module['status']): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-amber-500';
    case 'failed':
      return 'bg-red-500';
    case 'not-started':
    default:
      return 'bg-gray-300';
  }
};
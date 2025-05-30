import React, { useState } from 'react';
import { Course, Module, User } from '../../types';
import ModuleChecklist from '../ModuleChecklist/ModuleChecklist';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';
import PerformanceMetrics from '../PerformanceMetrics/PerformanceMetrics';
import ExportOptions from '../ExportOptions/ExportOptions';
import ReminderSystem from '../ReminderSystem/ReminderSystem';
import CourseSelector from '../CourseSelector/CourseSelector';
import InstructorDashboard from '../InstructorDashboard/InstructorDashboard';
import { calculateProgress } from '../../utils/progressUtils';

interface ProgressTrackerProps {
  courses: Course[];
  users: User[];
  currentUser: User;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  courses,
  users, 
  currentUser 
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState(
    currentUser.enrolledCourses.length > 0 ? currentUser.enrolledCourses[0] : ''
  );
  
  const selectedCourse = courses.find(course => course.id === selectedCourseId);
  
  const [modules, setModules] = useState<Module[]>(
    selectedCourse?.modules || []
  );
  
  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    const course = courses.find(course => course.id === courseId);
    setModules(course?.modules || []);
  };
  
  const handleToggleComplete = (id: string, completed: boolean) => {
    setModules(prevModules => 
      prevModules.map(module => 
        module.id === id 
          ? { 
              ...module, 
              completed,
              status: completed ? 'completed' : 'in-progress'
            } 
          : module
      )
    );
  };
  
  const handleUpdateNotes = (id: string, notes: string) => {
    setModules(prevModules => 
      prevModules.map(module => 
        module.id === id 
          ? { ...module, notes } 
          : module
      )
    );
  };
  
  const progress = calculateProgress(modules);
  const completedModules = modules.filter(module => module.completed).length;
  
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Progress Tracker</h1>
        
        {/* View toggle for mobile - show/hide sidebar */}
        <button 
          className="lg:hidden px-2 py-1 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          onClick={() => {
            // This would toggle a state to show/hide sidebar on mobile
            // For this example, we'll just alert the user
            alert("This would toggle the sidebar visibility on mobile");
          }}
        >
          <span className="sm:hidden">Toggle View</span>
          <span className="hidden sm:inline">Toggle Sidebar</span>
        </button>
      </div>
      
      <CourseSelector 
        courses={courses}
        selectedCourseId={selectedCourseId}
        onCourseSelect={handleCourseSelect}
      />
      
      {/* Main responsive layout - uses mobile-first approach with responsive breakpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main content area - spans full width on mobile, 2/3 on large screens */}
        <div className="lg:col-span-2">
          <ProgressIndicator 
            progress={progress}
            totalModules={modules.length}
            completedModules={completedModules}
          />
          
          <ModuleChecklist 
            modules={modules}
            onToggleComplete={handleToggleComplete}
            onUpdateNotes={handleUpdateNotes}
          />
        </div>
        
        {/* Sidebar - shows full width on mobile, 1/3 on large screens */}
        <div className="space-y-4 sm:space-y-6">
          {/* Performance metrics and export options in a responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
            <PerformanceMetrics modules={modules} />
            
            <ExportOptions 
              course={selectedCourse || courses[0]}
              modules={modules}
            />
          </div>
          
          <ReminderSystem modules={modules} />
        </div>
      </div>
      
      {currentUser.role === 'instructor' && (
        <div className="mt-10">
          <InstructorDashboard 
            users={users}
            courses={courses}
            selectedCourseId={selectedCourseId}
          />
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
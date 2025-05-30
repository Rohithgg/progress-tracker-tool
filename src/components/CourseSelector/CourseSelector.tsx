import React, { useState } from 'react';
import { Course } from '../../types';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface CourseSelectorProps {
  courses: Course[];
  selectedCourseId: string;
  onCourseSelect: (courseId: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({
  courses,
  selectedCourseId,
  onCourseSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCourse = courses.find(course => course.id === selectedCourseId);

  const handleSelectCourse = (courseId: string) => {
    onCourseSelect(courseId);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4 sm:mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white shadow-sm rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <div className="flex items-center">
          <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-1 sm:mr-2 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="block text-xs sm:text-sm text-gray-500">Current Course</span>
            <span className="block text-sm sm:text-base font-medium truncate">
              {selectedCourse?.title || 'Select a course'}
            </span>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 ml-2" />
        ) : (
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 ml-2" />
        )}
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-20 transition-all duration-100 ease-in-out transform origin-top">
          <ul className="max-h-60 rounded-md py-1 text-sm overflow-auto focus:outline-none sm:text-base">
            {courses.map(course => (
              <li
                key={course.id}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                  course.id === selectedCourseId
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => handleSelectCourse(course.id)}
              >
                <div className="flex items-center">
                  <span className="font-medium block truncate">{course.title}</span>
                </div>
                {course.id === selectedCourseId && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// This is needed for the component
const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default CourseSelector;
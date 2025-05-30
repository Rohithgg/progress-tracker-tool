import React, { useState } from 'react';
import { Course, Module } from '../../types';
import { calculateProgress, calculateAverageScore } from '../../utils/progressUtils';
import { FileDown, FileJson, File as FilePdf } from 'lucide-react';

interface ExportOptionsProps {
  course: Course;
  modules: Module[];
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ course, modules }) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExportJSON = () => {
    setIsExporting(true);
    
    try {
      const progress = calculateProgress(modules);
      const averageScore = calculateAverageScore(modules);
      
      const exportData = {
        courseId: course.id,
        courseTitle: course.title,
        exportDate: new Date().toISOString(),
        progress,
        averageScore,
        modules: modules.map(module => ({
          id: module.id,
          title: module.title,
          status: module.status,
          completed: module.completed,
          score: module.score,
          notes: module.notes
        }))
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${course.title.replace(/\s+/g, '-').toLowerCase()}-progress.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
    } catch (error) {
      console.error('Error exporting JSON:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleExportPDF = () => {
    setIsExporting(true);
    
    try {
      // Normally this would use a PDF library
      alert('PDF export would be implemented here with a library like jsPDF');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-5 mb-4 sm:mb-6">
      <div className="flex items-center mb-2 sm:mb-4">
        <FileDown className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-1.5 sm:mr-2 flex-shrink-0" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Export Progress</h2>
      </div>
      
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
        Export your progress report in different formats for your records or to share with your instructor.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <button
          onClick={handleExportJSON}
          disabled={isExporting}
          className="flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileJson className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          Export as JSON
        </button>
        
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FilePdf className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          Export as PDF
        </button>
      </div>
      
      <div className="mt-3 sm:mt-4 text-xs text-gray-500">
        <p>
          Note: JSON exports contain all progress data in a machine-readable format.
          PDF exports generate a formatted report suitable for printing or sharing.
        </p>
      </div>
    </div>
  );
};

export default ExportOptions;
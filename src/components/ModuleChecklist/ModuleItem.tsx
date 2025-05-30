import React, { useState } from 'react';
import { Module } from '../../types';
import { formatDate, getStatusColorClass } from '../../utils/progressUtils';
import { ChevronDown, ChevronUp, Check, Clock, AlertTriangle } from 'lucide-react';

interface ModuleItemProps {
  module: Module;
  onToggleComplete: (id: string, completed: boolean) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ 
  module, 
  onToggleComplete,
  onUpdateNotes
}) => {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(module.notes || '');

  const handleToggle = () => {
    onToggleComplete(module.id, !module.completed);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleNotesSave = () => {
    onUpdateNotes(module.id, notes);
  };

  const renderStatusIcon = () => {
    switch (module.status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-2 sm:mb-3 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex flex-wrap items-center p-3 sm:p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="mr-3 sm:mr-4 flex-shrink-0">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={module.completed}
              onChange={handleToggle}
              className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              onClick={(e) => e.stopPropagation()}
            />
          </label>
        </div>
        
        <div className="flex-grow min-w-0 pr-2">
          <h3 className={`text-sm sm:text-base font-medium truncate ${module.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {module.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 line-clamp-1">{module.description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2 sm:mt-0 w-full sm:w-auto sm:space-x-2 md:space-x-4">
          <div className="flex items-center mr-2 sm:mr-0">
            {renderStatusIcon()}
            <span className="ml-1 text-xs sm:text-sm hidden xs:inline-block">
              {module.status.charAt(0).toUpperCase() + module.status.slice(1).replace('-', ' ')}
            </span>
          </div>
          
          <div className="text-xs sm:text-sm text-gray-500">
            {formatDate(module.dueDate)}
          </div>
          
          <div className="ml-auto sm:ml-0">
            {expanded ? 
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" /> : 
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            }
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-100 transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="mb-2 sm:mb-0">
              <h4 className="font-medium text-xs sm:text-sm text-gray-700 mb-2">Module Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Status:</span>
                  <span className={`text-xs sm:text-sm px-2 py-0.5 sm:py-1 rounded-full ${getStatusColorClass(module.status)} text-white`}>
                    {module.status.replace('-', ' ')}
                  </span>
                </div>
                
                {module.score !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Score:</span>
                    <span className="text-xs sm:text-sm font-medium">{module.score}%</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Due date:</span>
                  <span className="text-xs sm:text-sm">{formatDate(module.dueDate)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-xs sm:text-sm text-gray-700 mb-2">Notes</h4>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                className="w-full p-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Add your notes here..."
              />
              <div className="mt-2 flex justify-end">
                <button 
                  onClick={handleNotesSave}
                  className="px-2 sm:px-3 py-1 bg-indigo-600 text-white text-xs sm:text-sm rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleItem;
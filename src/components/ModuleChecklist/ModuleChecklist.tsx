import React, { useState, useMemo } from 'react';
import { Module } from '../../types';
import ModuleItem from './ModuleItem';
import { CheckSquare, Filter, Search, ArrowUpDown, X } from 'lucide-react';

interface ModuleChecklistProps {
  modules: Module[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

type SortOption = 'title' | 'dueDate' | 'status';
type FilterOption = 'all' | 'completed' | 'in-progress' | 'not-started' | 'failed';

const ModuleChecklist: React.FC<ModuleChecklistProps> = ({ 
  modules, 
  onToggleComplete,
  onUpdateNotes
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedModules = useMemo(() => {
    // First apply filters
    let result = [...modules];
    
    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(module => 
        module.title.toLowerCase().includes(query) || 
        module.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(module => module.status === filterStatus);
    }
    
    // Then sort
    return result.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'dueDate') {
        // Handle cases where dueDate might be undefined
        if (!a.dueDate) return sortOrder === 'asc' ? 1 : -1;
        if (!b.dueDate) return sortOrder === 'asc' ? -1 : 1;
        
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'status') {
        // Define a priority order for statuses
        const statusPriority: Record<string, number> = {
          'completed': 3,
          'in-progress': 2,
          'failed': 1,
          'not-started': 0
        };
        
        comparison = statusPriority[b.status] - statusPriority[a.status];
      }
      
      // Apply sort order
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [modules, sortBy, sortOrder, filterStatus, searchQuery]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center">
          <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-1.5 sm:mr-2 flex-shrink-0" />
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Module Checklist</h2>
        </div>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center text-xs sm:text-sm text-indigo-600 hover:text-indigo-800"
        >
          {showFilters ? (
            <>
              <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Hide</span> Filters
            </>
          ) : (
            <>
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Show</span> Filters
            </>
          )}
        </button>
      </div>
      
      {showFilters && (
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
              <Search className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search modules..."
              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs text-gray-700 mb-1">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as FilterOption)}
                className="w-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Modules</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs text-gray-700 mb-1">Sort by</label>
              <div className="flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value as SortOption)}
                  className="w-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border border-gray-300 rounded-md rounded-r-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="dueDate">Due Date</option>
                  <option value="title">Title</option>
                  <option value="status">Status</option>
                </select>
                <button 
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-2 py-1 sm:py-1.5 hover:bg-gray-200 focus:outline-none"
                >
                  <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="divide-y divide-gray-100">
        {filteredAndSortedModules.length > 0 ? (
          filteredAndSortedModules.map(module => (
            <ModuleItem
              key={module.id}
              module={module}
              onToggleComplete={onToggleComplete}
              onUpdateNotes={onUpdateNotes}
            />
          ))
        ) : (
          <div className="py-6 text-center text-xs sm:text-sm text-gray-500">
            {modules.length > 0 
              ? 'No modules match your current filters.'
              : 'No modules available.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleChecklist;
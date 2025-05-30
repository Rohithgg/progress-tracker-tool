import React, { useState } from 'react';
import { User, Course, Module } from '../../types';
import { calculateProgress, calculateAverageScore } from '../../utils/progressUtils';
import { Users, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface InstructorDashboardProps {
  users: User[];
  courses: Course[];
  selectedCourseId: string;
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  users,
  courses,
  selectedCourseId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'score'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const selectedCourse = courses.find(course => course.id === selectedCourseId);
  
  const enrolledUsers = users.filter(user => 
    user.enrolledCourses.includes(selectedCourseId) && 
    user.role === 'student'
  );
  
  const filteredUsers = enrolledUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') {
      const result = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? result : -result;
    } else if (sortBy === 'progress' || sortBy === 'score') {
      const moduleMap = new Map<string, Module[]>();
      
      // Create a map of user IDs to their modules for the selected course
      users.forEach(user => {
        if (user.enrolledCourses.includes(selectedCourseId)) {
          // In a real app, we'd fetch actual user progress
          // Here we're just using the course modules as a simulation
          moduleMap.set(user.id, selectedCourse?.modules || []);
        }
      });
      
      const aModules = moduleMap.get(a.id) || [];
      const bModules = moduleMap.get(b.id) || [];
      
      let result;
      if (sortBy === 'progress') {
        result = calculateProgress(aModules) - calculateProgress(bModules);
      } else {
        result = calculateAverageScore(aModules) - calculateAverageScore(bModules);
      }
      
      return sortOrder === 'asc' ? result : -result;
    }
    
    return 0;
  });
  
  const handleSort = (column: 'name' | 'progress' | 'score') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  const toggleUserExpand = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };
  
  // This simulates fetching user progress data
  // In a real app, this would come from an API
  const getUserModules = (): Module[] => {
    return selectedCourse?.modules || [];
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-5 mb-4 sm:mb-6">
      <div className="flex items-center mb-3 sm:mb-4">
        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-1.5 sm:mr-2 flex-shrink-0" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Instructor Dashboard</h2>
      </div>
      
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Students Enrolled in: <span className="truncate">{selectedCourse?.title || 'Selected Course'}</span>
        </h3>
        
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-4">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
              <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students..."
              className="block w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="relative w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
              Filter Options
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                  #
                </th>
                <th 
                  scope="col" 
                  className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Student</span>
                    {sortBy === 'name' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? 
                          <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" /> : 
                          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                        }
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('progress')}
                >
                  <div className="flex items-center">
                    <span>Progress</span>
                    {sortBy === 'progress' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? 
                          <ChevronUp className="h-4 w-4" /> : 
                          <ChevronDown className="h-4 w-4" />
                        }
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('score')}
                >
                  <div className="flex items-center">
                    <span>Average Score</span>
                    {sortBy === 'score' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? 
                          <ChevronUp className="h-4 w-4" /> : 
                          <ChevronDown className="h-4 w-4" />
                        }
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user, index) => {
                  const userModules = getUserModules();
                  const progress = calculateProgress(userModules);
                  const averageScore = calculateAverageScore(userModules);
                  const isExpanded = expandedUserId === user.id;
                  
                  return (
                    <React.Fragment key={user.id}>
                      <tr className={`${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-indigo-700 font-medium text-sm">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 mt-1 block">{progress}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {averageScore}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => toggleUserExpand(user.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {isExpanded ? 'Hide Details' : 'Show Details'}
                          </button>
                        </td>
                      </tr>
                      
                      {isExpanded && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 bg-gray-50">
                            <div className="text-sm text-gray-700">
                              <h4 className="font-medium mb-2">Module Progress</h4>
                              <div className="space-y-2">
                                {userModules.map(module => (
                                  <div key={module.id} className="flex items-center">
                                    <div className={`h-3 w-3 rounded-full mr-2 ${
                                      module.status === 'completed' ? 'bg-green-500' :
                                      module.status === 'in-progress' ? 'bg-amber-500' :
                                      module.status === 'failed' ? 'bg-red-500' :
                                      'bg-gray-300'
                                    }`}></div>
                                    <span className="flex-grow">{module.title}</span>
                                    <span className="text-sm text-gray-500 ml-2">
                                      {module.status.replace('-', ' ')}
                                    </span>
                                    {module.score !== undefined && (
                                      <span className="ml-4 font-medium">
                                        {module.score}%
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
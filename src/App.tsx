import ProgressTracker from './components/ProgressTracker/ProgressTracker';
import { sampleCourses, sampleUsers, currentUser } from './data/sampleData';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMobileDetect } from './utils/responsiveUtils';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobileDetect(640); // sm breakpoint is 640px
  
  // Close mobile menu when resizing from mobile to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-bold">EduTrack</h1>
          
          {/* Desktop navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="text-sm">
              <div className="font-medium">{currentUser.name}</div>
              <div className="text-indigo-200">{currentUser.role}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-indigo-700 flex items-center justify-center">
              <span className="text-white font-medium">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="sm:hidden p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-indigo-700 px-4 py-3 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm">
                <div className="font-medium">{currentUser.name}</div>
                <div className="text-indigo-200">{currentUser.role}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-medium">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            
            <div className="space-y-1 pb-1">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                Dashboard
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                Settings
              </a>
            </div>
          </div>
        )}
      </header>
      
      <main className="pb-16">
        <ProgressTracker 
          courses={sampleCourses}
          users={sampleUsers}
          currentUser={currentUser}
        />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4 sm:py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            © 2025 EduTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
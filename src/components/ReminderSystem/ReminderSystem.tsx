import React, { useState } from 'react';
import { Module } from '../../types';
import { getUpcomingModules, formatDate } from '../../utils/progressUtils';
import { BellRing, Check, XCircle } from 'lucide-react';

interface ReminderSystemProps {
  modules: Module[];
  reminderDays?: number;
}

const ReminderSystem: React.FC<ReminderSystemProps> = ({ 
  modules,
  reminderDays = 7
}) => {
  const [settings, setSettings] = useState({
    enabled: true,
    daysBeforeDue: reminderDays,
    emailNotifications: true,
    browserNotifications: false
  });
  
  const [showSettings, setShowSettings] = useState(false);
  
  const upcomingModules = getUpcomingModules(modules, settings.daysBeforeDue);
  
  const handleToggleEnabled = () => {
    setSettings(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
  };
  
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setSettings(prev => ({
        ...prev,
        daysBeforeDue: value
      }));
    }
  };
  
  const handleToggleEmailNotifications = () => {
    setSettings(prev => ({
      ...prev,
      emailNotifications: !prev.emailNotifications
    }));
  };
  
  const handleToggleBrowserNotifications = () => {
    setSettings(prev => ({
      ...prev,
      browserNotifications: !prev.browserNotifications
    }));
  };
  
  const handleDismissReminder = (id: string) => {
    // This would normally update a state or call an API
    console.log(`Dismissed reminder for module ${id}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-5 mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center">
          <BellRing className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-1.5 sm:mr-2 flex-shrink-0" />
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Upcoming Deadlines</h2>
        </div>
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
        >
          {showSettings ? 'Hide Settings' : 'Settings'}
        </button>
      </div>
      
      {showSettings && (
        <div className="mb-3 sm:mb-4 p-2 sm:p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Reminder Settings</h3>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">Enable Reminders</span>
              <button 
                onClick={handleToggleEnabled}
                className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 items-center rounded-full ${settings.enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
              >
                <span 
                  className={`inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white transition ${settings.enabled ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'}`} 
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">Days Before Due Date</span>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.daysBeforeDue}
                onChange={handleDaysChange}
                className="w-12 sm:w-16 p-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">Email Notifications</span>
              <button 
                onClick={handleToggleEmailNotifications}
                className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 items-center rounded-full ${settings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-300'}`}
              >
                <span 
                  className={`inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white transition ${settings.emailNotifications ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'}`} 
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">Browser Notifications</span>
              <button 
                onClick={handleToggleBrowserNotifications}
                className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 items-center rounded-full ${settings.browserNotifications ? 'bg-indigo-600' : 'bg-gray-300'}`}
              >
                <span 
                  className={`inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white transition ${settings.browserNotifications ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'}`} 
                />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {settings.enabled && upcomingModules.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {upcomingModules.map(module => (
            <div 
              key={module.id}
              className="flex items-center justify-between p-2 sm:p-3 bg-amber-50 border border-amber-100 rounded-md"
            >
              <div className="min-w-0 flex-grow mr-2">
                <h3 className="font-medium text-xs sm:text-sm text-gray-800 truncate">{module.title}</h3>
                <p className="text-xs text-gray-600">
                  Due: <span className="font-medium">{formatDate(module.dueDate)}</span>
                </p>
              </div>
              
              <button
                onClick={() => handleDismissReminder(module.id)}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                aria-label="Dismiss reminder"
              >
                <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 sm:py-6">
          {!settings.enabled ? (
            <p className="text-xs sm:text-sm text-gray-500">Reminders are currently disabled.</p>
          ) : (
            <>
              <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-gray-500">No upcoming deadlines in the next {settings.daysBeforeDue} days.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReminderSystem;
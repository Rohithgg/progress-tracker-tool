export interface Module {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  score?: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'failed';
  dueDate?: string;
  notes?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  instructor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor';
  enrolledCourses: string[];
}

export interface ReminderSettings {
  enabled: boolean;
  daysBeforeDue: number;
  emailNotifications: boolean;
  browserNotifications: boolean;
}